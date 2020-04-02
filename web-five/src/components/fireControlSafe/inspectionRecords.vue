
<template>
    <div class="app-container calendar-list-container base_info">
        <basic-container>
            <!-- <template> -->
            <avue-crud :data="data" 
            :page="page" 
            :option="TableOption"
            :table-loading="listLoading"
            @search-change="searchChange"
            @size-change="sizeChangeTab"
            @current-change="currentChangeTab"
            >
                <template slot="menu" slot-scope="scope">
                    <el-button size="small" type="info" plain icon="el-icon-view" @click="handleShow(scope.row,scope.index)" >查看</el-button>
                    <!-- <inspectionModal :row="scope">1111</inspectionModal> -->
                </template>
            </avue-crud>
        </basic-container>
         <el-dialog title="巡查情况详情" :visible.sync="patrolDetailDialog">
            <avue-form :option="TableOption" v-model="patrolDetail" ref="form1">
                <!-- <template slot="menu" slot-scope="scope">
                    <el-button size="small" type="info" plain icon="el-icon-view" @click="handleSumbit(scope.row,scope.index)" >确定</el-button>
                    
                </template> -->
            </avue-form>
            <div style="padding: 0 30px;">
                <avue-crud :data="dataModal" 
                    :page="page" 
                    :option="TableOptionModal"
                    @search-change="searchChangeModal"
                    @size-change="sizeChangeModal"
                    @current-change="currentChangeTabModal"
                >
                    <template slot="patrolPhotoForm" slot-scope="scope">
                        <img src="https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100" class="app-container-img" />
                    </template>
                </avue-crud>
            </div>
        </el-dialog>

    </div>
</template>
<script>
import { mapGetters } from "vuex";
import { fetchBuildingList } from '@/api/unit/building'
import { fetchFloorList } from '@/api/unit/floor'
import { getDict } from '@/api/unit/dict'
import { getName } from '@/api/fireControlSafe/attendance/attendance'
import { TableOption } from '@/const/fireControlSafe/patrolmanage/inspectionRecords'
import { TableOptionModal } from '@/const/fireControlSafe/patrolmanage/inspectionModal'
import { getTableList,getRecordDetail } from '@/api/fireControlSafe/inspectionRecords/inspectionRecords'
import inspectionModal from './inspectionModal'

export default {
    name: "inspectionRecords",
    components: {
      inspectionModal
    },
    data() {
        return {
            obj:{},
            data: [],
            dataModal:[],
            TableOption:TableOption,
            TableOptionModal:TableOptionModal,
            dialogVisible: false,
            patrolDetailDialog:false,
            patrolDetail:{},
            // 表格页码
            page: {
                total: 1, // 总页数
                currentPage: 1, // 当前页数
                pageSize: 10 // 每页显示多少条
            },
            listQuery: {
                page: 1,
                limit: 10,
            },
            listQueryModal: {
                page: 1,
                limit: 10,
            },
            listLoading: false,
        }
    },
    created(){
        this.getNameList();
        this.getBuildFloor();
        this.getTableData(this.listQuery);
        
        // this.fetchTreeList();
    },
    watch: {

    },
    computed: {
        ...mapGetters([
            "userInfo",
        ]),
    },
    mounted() {
        // setTimeout(() => {
        //     this.filter()
        // })
    },
    methods: {
        //获取巡查人
        getNameList(){
            getName().then(res => {
                if (res && res.data) {
                    // console.log(res.data)
                    // this.TableOption.column[0].dicData = res.data
                    this.TableOption.column[4].dicData = []
                    let data = res.data;
                    for (let i = 0; i < data.length; i++) {
                        let obj = {
                            label: data[i].nname,
                            value: data[i].userId
                        }
                        this.TableOption.column[4].dicData.push(obj)
                    }
                    // console.log(this.TableOption.column[0].dicData)
                }
            })
        },
        //获取巡查记录数据
        getTableData(params){
            this.listLoading = true;
            getTableList(params).then(res => {
                if (res && res.data) {
                    console.log(res.data)
                    this.listLoading = false;
                    // console.log(res)
                    res.data.data.forEach(s=>{
                        s.startTime=s.startTime.replace('T',' ')
                        s.endTime=s.endTime.replace('T',' ')
                    })
                    this.data = res.data.data
                    this.page.total = res.data.total
                }
            })
        },
        getBuildFloor(){
            fetchBuildingList().then(res=>{
                console.log(res)
                if(res && res.data){
                    this.TableOptionModal.column[3].dicData = []
                    res.data.data.forEach(s=>{
                        // this.buildingDic[s.id]=s.buildingCode
                        this.TableOptionModal.column[3].dicData.push({
                            label:s.buildingCode,
                            value:s.id
                        })
                    })
                    console.log(this.TableOptionModal.column[3].dicData)
                }
            }),

            fetchFloorList().then(res=>{
                if(res && res.data){
                    this.TableOptionModal.column[4].dicData = []
                    res.data.data.forEach(s=>{
                        // this.floorDic[s.id]=s.floorCode
                        this.TableOptionModal.column[4].dicData.push({
                            label:s.floorCode,
                            value:s.id
                        })
                    })
                    console.log(this.TableOptionModal.column[4].dicData)
                }
            }),
            // 字典查询 巡查点类型
            getDict('point_type').then(res => {
                if (res && res.data && res.data.code === '0') {
                    this.TableOptionModal.column[1].dicData = res.data.data
                }
            })
        },
        searchChange(params){
            this.listQuery.userId = params.userId;
            this.listQuery.logDateStart = params.logDateStart;
            this.listQuery.logDateEnd = params.logDateEnd;
            
            this.listLoading = true;
            this.getTableData(this.listQuery)

            // this.$message.success(JSON.stringify(params));
        },
        sizeChangeTab(params){
            this.listQuery.limit = params;
            this.getTableData(this.listQuery)
            // this.$message.success(JSON.stringify(params));
        },
        currentChangeTab(params){
            this.listQuery.page = params;
            this.getTableData(this.listQuery)
            // this.$message.success(JSON.stringify(params));
        },

        getTableMOdal(obj){
            
            let patrolTaskId = this.patrolDetail.id
            obj.patrolTaskId = patrolTaskId

            console.log(obj);
            getRecordDetail(obj).then(res => {
                if (res && res.data) {
                    this.listLoading = false;
                    console.log(res)
                    this.dataModal = res.data.data
                    this.page.total = res.data.total
                }
            })
        },
        // 放大显示图片
        handleShow(row) {
            this.patrolDetailDialog=true
            this.patrolDetail=row
            this.listLoading = true;

            this.getTableMOdal(this.listQueryModal)
        },
        searchChangeModal(params){
            
            this.listQueryModal.patrolStatus = params.patrolStatus ? params.patrolStatus : '';
            this.listQueryModal.patrolPointType = params.patrolPointType ? params.patrolPointType : '';

            this.getTableMOdal(this.listQueryModal)
        },
        currentChangeTabModal(index){
            this.listQueryModal.page = index;
            this.getTableMOdal(this.listQueryModal)
        },
        sizeChangeModal(index){
            this.listQueryModal.limit = index;
            this.getTableMOdal(this.listQueryModal)
        }
    }
}
</script>
      
      