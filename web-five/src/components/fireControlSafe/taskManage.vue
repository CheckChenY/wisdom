<template>
<div class="task_config">
    <avue-crud ref="crud" 
        :option="tableOption" 
        :data="data" 
        :page="page" 
        :table-loading="listLoading"
        @row-save="handleSubmit"
        @row-update="updatePoint"
        @search-change="searchChange">
        <template slot="empty">
            <avue-empty :image="timeout?'/img/bg/404.svg':'/img/empty.png'" :desc="timeout?'请求超时,请稍后重试······':'暂无数据'"></avue-empty>
        </template>
        <template slot="menuLeft">
            <el-button @click="handleAdd" size="small" plain icon="el-icon-plus" type="primary">下发任务</el-button>
        </template>
        <template slot-scope="scope" slot="pointListForm">
          <taskManageTable v-if="showpop" :paramdata="scope.row"></taskManageTable>
        </template>
        <template slot-scope="scope" slot="menu">
            <el-button size="small" type="info" plain icon="el-icon-view" @click="handleShow(scope.row,scope.index)" >查看</el-button>
            <el-button type="warning" plain icon="el-icon-edit" size="small" @click="handleEdit(scope.row,scope.index)" >编辑</el-button>
            <el-button type="danger" plain icon="el-icon-delete" size="small" v-if="scope.row.id" @click="handleDel(scope.row)" >删除</el-button>
        </template>
    </avue-crud>
</div>
</template>
<script>
import { mapGetters } from "vuex";
import { tableOption } from '@/const/fireControlSafe/patrolmanage/taskManage'
import { safetaskrecordPage,safepointrecordPage,delSafetaskrecord,safetaskrecord } from '@/api/fireControlSafe/patrolManage/taskManage'
import { safepatroltaskPage } from '@/api/fireControlSafe/patrolManage/taskConfig'
import { findAllUser } from '@/api/public'
import taskManageTable from '@/components/fireControlSafe/taskManageTable'

export default {
name: "taskConfig",
components: {
    taskManageTable,
},
data() {
    return {
        searchParams:{},
        data:[],
        tableOption: tableOption,
        page: {
            currentPage: 1,
            pageSize: 10,
            total: 0,
        },
        timeout:false,
        listLoading: false,
        showpop: false,
    };
},
watch: {
},
created() {
    // safepatroltaskPage().then(res=>{
    //     this.tableOption.column[2].dicData=[]
    //     if(res && res.data && !parseInt(res.data.code)){
    //         res.data.data.forEach(s=>{
    //             var obj={}
    //             obj.label=s.patrolName
    //             obj.value=s.id
    //             this.tableOption.column[2].dicData.push(obj)
    //         })
    //     }
    // })
    safepatroltaskPage().then(res=>{
        this.tableOption.column[2].dicData=[]
        if(res && res.data && res.data.data.length){
            res.data.data.forEach(s=>{
                var obj={}
                obj.label=s.patrolName
                obj.value=s.id
                this.tableOption.column[2].dicData.push(obj)
            })
        }
    })
    this.getAllUser()
},
mounted() {
    this.getList(this.page, this.searchParams)
},
methods: {
    handleSubmit(row, done, loading){
        if(!row.patrolTaskId){
            this.$message({
                type:'error',
                message:'请选择任务名称'
            })
            loading()
            return
        }
        if(new Date(row.startTime)<=new Date()){
            this.$message({
                type:'error',
                message:'开始时间不能晚于当前时间'
            })
            loading()
            return
        }
        if(new Date(row.startTime)>=new Date(row.endTime)){
            this.$message({
                type:'error',
                message:'开始时间不能早于结束时间'
            })
            loading()
            return
        }
        safetaskrecord(row).then(res=>{
            console.log(res)
            if (res && res.data && res.data.code ==='0') {
                this.$message({
                    type:'success',
                    message:"下发成功"
                })
                this.getList(this.page, this.searchParams)
            } else {
                this.$message({
                    type:'error',
                    message: res && res.data && res.data.data ? res.data.data : '失败'
                })
            }
            done()
        }).catch(() => {
            loading()
        })
    },
    // 添加修改重点部位
    updatePoint (row, done, loading) {
        console.log(row)
        if(!row.patrolTaskId){
            this.$message({
                type:'error',
                message:'请选择任务名称'
            })
            loading()
            return
        }
        if(new Date(row.startTime)<=new Date()){
            this.$message({
                type:'error',
                message:'开始时间不能晚于当前时间'
            })
            loading()
            return
        }
        if(new Date(row.startTime)>=new Date(row.endTime)){
            this.$message({
                type:'error',
                message:'开始时间不能早于结束时间'
            })
            loading()
            return
        }
        safetaskrecord(row).then(res=>{
            console.log(res)
            if (res && res.data && res.data.code ==='0') {
                this.$message({
                    type:'success',
                    message:"下发成功"
                })
                this.getList(this.page, this.searchParams)
            } else {
                this.$message({
                    type:'error',
                    message: res && res.data && res.data.data ? res.data.data : '失败'
                })
            }
            done()
        }).catch(() => {
            loading()
        })
    },
    handleEdit(row,index){
        this.showpop = false
        this.$refs.crud.rowEdit(row, index);
    },
    handleDel(row){
        this.$confirm('你确定要删除该项任务吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(res=>{
            delSafetaskrecord(row.id).then(res => {
                if (res && res.data && res.data.code ==='0') {
                    this.$message({
                        type:'success',
                        message:"删除成功"
                    })
                    this.getList(this.page, this.searchParams)
                } else {
                    this.$message({
                        type:'error',
                        message: res && res.data && res.data.data ? res.data.data : '删除失败'
                    })
                }
            })
        })
    },
    handleAdd(){
        this.showpop = false
        this.$refs.crud.rowAdd();
    },
    handleShow(row, index){
        this.showpop = true
        this.$refs.crud.rowView(row, index);
    },
    searchChange(params){
        this.searchParams = params
        this.getList(this.page, params)
    },
    getList(page, params){
        this.listLoading = true;
        safetaskrecordPage(Object.assign({
            page: page.currentPage,
            limit: page.pageSize
        }, params)).then(res=>{
            if (res && res.data && res.data.code === '0') {
                res.data.data.forEach(s=>{
                    s.waitPoint=s.pointCount-s.finish
                })
                this.data = res.data.data;
                this.page.total = res.data.total
            }
            setTimeout(() => {
                this.listLoading = false;
            }, 2500)
        }).catch(error=>{
            this.listLoading = false
            if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
                this.timeout=true
            }
        })
    },
    getAllUser () {
      findAllUser().then(res => {
        if (res && res.data && res.data.code == '0') {
          for (let i = 0, len = res.data.data.length; i < len; i++) {
            let item = {
              label: res.data.data[i].realName,
              value: res.data.data[i].id
            }
            this.tableOption.column[4].dicData.push(item)
          }
        }
      })
    },
}
};
</script>
<style>
.col12{
    display: flex;
    justify-content: center;
    margin-bottom:20px;
}
.label{
    min-width:100px;
    line-height:40px;
    height:40px;
    text-align: right;
    margin-right:10px;
}
.input{
    width:60%;
}
.avatar-uploader{
    width:60%;
    position: relative;
    font-size: 14px;
    display: inline-block;
}
.avatar-uploader .el-upload {
    width:100%;
    height:220px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
</style>
