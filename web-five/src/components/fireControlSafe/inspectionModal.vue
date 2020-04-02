<template>
    <div class="app-container calendar-list-container base_info">
        <basic-container>
            <avue-crud :data="data" 
                :page="page" 
                :option="TableOption"
                >
                    <template slot="patrolPhotoForm" slot-scope="scope">
                        <img src="https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100" class="app-container-img" />
                    </template>
                </avue-crud>
        </basic-container>
    </div>
</template>
<script>
import { TableOptionModal } from '@/const/fireControlSafe/patrolmanage/inspectionModal'
// import { getSignRecord } from '@/api/fireControlSafe/inspectionRecords/inspectionRecords'

export default {
    props:["row"],
    data() {
        return {
            obj:{},
            data: [{
                patrolPointName:'王大拿',
                patrolPointType:'温泉度假山庄',
                cardCode:'9527',
                buildingId:'山字一号',
                floorId:'666',
                patrolStatus:'正在推拿',
                result:'王大拿',
            }],
            TableOption:TableOptionModal,
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
        console.log(this)
        // this.getSignRecord();
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
        // handleTabChange(column) {
        //     this.obj = column
        //     if (column.prop == 'tab1') {
        //         // this.getBaseInfo()
        //     }
        // },
        // handleEmpty(){
        //     this.$refs.form.resetForm();
        // },
        // handleSubmit(){
        //     // debugger;
        //     let self = this;
        //     self.$refs.form.validate(vaild=>{
        //         if(vaild){
        //             self.$message.success(JSON.stringify(self.from));
        //         }
        //     })
        // },
        // getNameList(){
        //     getName().then(res => {
        //         if (res && res.data) {
        //             // this.TableOption.column[0].dicData = res.data
        //             this.TableOption.column[0].dicData = []
        //             let data = res.data;
        //             for (let i = 0; i < data.length; i++) {
        //                 let obj = {
        //                     label: data[i].nname,
        //                     value: data[i].userId
        //                 }
        //                 this.TableOption.column[0].dicData.push(obj)
        //             }
        //             // console.log(this.TableOption.column[0].dicData)
        //         }
        //     })
        // },
        //获取部门数据
        // fetchTreeList(){
        //     fetchTree().then(res => {
        //         if (res && res.data) {
        //             this.TableOption.column[1].dicData = []

        //             let data = res.data.data
        //             console.log(data)

        //             for (let i = 0; i < data.length; i++) {
        //                 for (let j = 0; j < data[i].children.length; j++) {
        //                     let obj = {
        //                         label: data[i].children[j].name,
        //                         value: data[i].children[j].id
        //                     }
        //                     this.TableOption.column[1].dicData.push(obj)
        //                 }
        //                 // this.tableOption.column[2].valueDefault = data[0].children.value
        //             }
        //             console.log(this.TableOption.column[1].dicData)
        //         }
        //     })
        // },
        //获取考勤记录数据
        // getTableData(params){
        //     getTableList(params).then(res => {
        //         if (res && res.data) {
        //             // console.log(res)
        //             this.data = res.data.data
        //             this.page.total = res.data.total
        //         }
        //     })
        // },
        // searchChange(params){
        //     this.listQuery.userId = params.userId;
        //     this.listQuery.logDateStart = params.logDateStart;
        //     this.listQuery.logDateEnd = params.logDateEnd;
            
        //     this.getTableData(this.listQuery)

        //     // this.$message.success(JSON.stringify(params));
        // },
    }
}
</script>
<style lang="scss">
    .app-container-img：{
        width: 40px;
        height: 40px;
    }
</style>

      
      