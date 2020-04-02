
<template>
    <div class="app-container calendar-list-container base_info">
        <basic-container>
            <avue-tabs :option="optionTab" @change="handleTabChange"></avue-tabs>
            <span v-if="obj.prop==='tab1'">

                <avue-form ref="form" 
                    :option="attendanceOption" 
                    v-model="from">
                    <template slot="menuForm">
                        <el-button type="primary" @click="handleSubmit">提 交</el-button>
                        <el-button  @click="handleEmpty">清 空</el-button>
                    </template>
                </avue-form>

            </span>
            <span v-if="obj.prop==='tab2'">
                <!-- <template> -->
                <avue-crud :data="data" 
                :page="page" 
                :option="TableOption"
                @search-change="searchChange"
                @size-change="sizeChangeTab"
                @current-change="currentChangeTab"
                >
                    <!-- <template slot-scope="scope"
                                slot="image">
                        <el-button size="mini"
                            type="info"
                            plain
                            icon="el-icon-view"
                            @click="handleShow(scope.row,scope.index)">查看
                        </el-button>
                    </template> -->
                    <template slot="clockCount" slot-scope="scope">
                        <span>第{{scope.row.clockCount}}次打卡</span>
                    </template>
                    <template slot="clockPhoto" slot-scope="scope">
                        <div class="avue-crud-img" @click="showImg(scope.row.clockPhoto)">
                            <el-button type="text" icon="el-icon-view">查看</el-button>
                        </div>
                    </template>
                </avue-crud>
                <!-- </template> -->
            </span>
        </basic-container>
        <image-view 
            v-if="dialogVisible" 
            :facilityPhoto='clockPhoto' 
            @closeImage="closeImg">
        </image-view>
    </div>
</template>
<script>
 import ImageView from '@/components/public/image-view'
// import { mapGetters } from "vuex";
import { attendanceOption,TableOption } from '@/const/fireControlSafe/attendance/attendance'
import { getTableList,getName,fetchTree,safeattendanceset } from '@/api/fireControlSafe/attendance/attendance'

export default {
    components: {
      'image-view': ImageView
    },
    data() {
        return {
            obj:{},
            optionTab:{
                column: [{
                    label: '考勤设置',
                    prop: 'tab1',
                }, {
                    label: '考勤记录',
                    prop: 'tab2',
                },]
            },
            data: [],
            TableOption:TableOption,
            attendanceOption:attendanceOption,
            dialogVisible: false,
            clockPhoto: '',
            from:{},
            // 表格页码
            page: {
                total: 0, // 总页数
                currentPage: 1, // 当前页数
                pageSize: 10 // 每页显示多少条
            },
            listQuery: {
                page: 1,
                limit: 10,
                userId:'',
                logDateStart:'',
                logDateEnd:''
            },
        }
    },
    created(){
        this.obj = this.optionTab.column[0];
        
        this.getNameList();
        this.fetchTreeList();
    },
    watch: {

    },
    // computed: {
    //     ...mapGetters([
    //         "userInfo",
    //     ]),
    // },
    mounted() {
        // setTimeout(() => {
        //     this.filter()
        // })
    },
    methods: {
        // 选择页签
        handleTabChange(column) {
            this.obj = column
            if (column.prop == 'tab2') {
                this.listQuery.page=1
                this.listQuery.limit=10
                this.listQuery.userId=''
                this.listQuery.logDateStart=''
                this.listQuery.logDateEnd=''
                this.getTableData(this.listQuery)
            }
        },
        handleEmpty(){
            this.$refs.form.resetForm();
        },
        handleSubmit(){
            let that = this;
            console.log(typeof(''))
            if(!that.from.startTime){
                this.$message({
                    type:'error',
                    message:'请选择考勤开始时间'
                })
                return
            }
            if(!that.from.clockCount){
                this.$message({
                    type:'error',
                    message:'请选择一天打卡次数'
                })
                return
            }
            if(typeof(that.from.intervalTime)=='string'){
                this.$message({
                    type:'error',
                    message:'请输入上班打卡后间隔'
                })
                return
            }
            safeattendanceset(that.from).then(res=>{
                if(res && res.data && !parseInt(res.data.code)){
                    that.$message({
                        type:'success',
                        message:'添加成功'
                    })
                    that.handleEmpty()
                }else{
                    that.$message({
                        type:'error',
                        message:'添加失败'
                    })
                    that.handleEmpty()
                }
            })
            // self.$refs.form.validate(vaild=>{
            //     if(vaild){
            //         self.$message.success(JSON.stringify(self.from));
            //     }
            // })
        },
        getNameList(){
            getName().then(res => {
                if (res && res.data) {
                    // this.TableOption.column[0].dicData = res.data
                    this.TableOption.column[0].dicData = []
                    let data = res.data;
                    for (let i = 0; i < data.length; i++) {
                        let obj = {
                            label: data[i].nname,
                            value: data[i].userId
                        }
                        this.TableOption.column[0].dicData.push(obj)
                    }
                    // console.log(this.TableOption.column[0].dicData)
                }
            })
        },
        //获取部门数据
        fetchTreeList(){
            fetchTree().then(res => {
                if (res && res.data) {
                    this.TableOption.column[1].dicData = []

                    let data = res.data.data
                    console.log(data)

                    for (let i = 0; i < data.length; i++) {
                        for (let j = 0; j < data[i].children.length; j++) {
                            let obj = {
                                label: data[i].children[j].name,
                                value: data[i].children[j].id
                            }
                            this.TableOption.column[1].dicData.push(obj)
                        }
                        let obj = {
                            label: data[i].name,
                            value: data[i].id
                        }
                        this.TableOption.column[1].dicData.push(obj)
                    }
                    console.log(this.TableOption.column[1].dicData)
                }
            })
        },
        //获取考勤记录数据
        getTableData(params){
            getTableList(params).then(res => {
                if (res && res.data) {
                    // console.log(res)
                    this.data = res.data.data
                    this.page.total = res.data.total
                }
            })
        },
        searchChange(params){
            this.listQuery.page=1
            this.listQuery.userId = params.userId;
            this.listQuery.logDateStart = params.logDateStart;
            this.listQuery.logDateEnd = params.logDateEnd;
            
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
        // 放大显示图片
        showImg (url) {
            // debugger
            this.clockPhoto = url
            this.dialogVisible = true
        },
        // 关闭弹窗
        closeImg () {
            this.dialogVisible = false
        }
    }
}
</script>
      
      