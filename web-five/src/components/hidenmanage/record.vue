<template>
    <div>
        <avue-crud
            :option="recordOption" 
            :data="recordData"
            :page="recordPage"
            :table-loading="listLoading"
            @search-reset="searchReset"
            @size-change="recordSizeChange"
            @current-change="recordCurrentChange"
            @search-change="recordSearchChange">
            <template slot="empty">
                <avue-empty
                    :image="timeout2?'/img/bg/404.svg':'/img/empty.png'"
                    :desc="timeout2?'请求超时,请稍后重试······':'暂无数据'"
                    >
                </avue-empty>
            </template>
            <template slot="menu" slot-scope="scope">
                <el-button size="small" plain type="primary" @click="seeRecord(scope.row)">查看</el-button>
            </template>
        </avue-crud>
        <!-- 处理隐患记录 -->
        <el-dialog title="处理记录详情" :visible.sync="recordDialog">
            <div style="height:750px">
                <el-col :span="12" class="col12">
                    <div class="label">上传时间</div>
                    <el-input v-model="recordRow.reportTime" disabled class="input"></el-input>
                </el-col>
                <el-col :span="12" class="col12">
                    <div class="label">上传人员</div>
                    <el-input v-model="realNameDic[recordRow.userId]" disabled class="input"></el-input>
                </el-col>
                <el-col :span="12" class="col12">
                    <div class="label">所在建筑</div>
                    <el-input v-model="buildingDic[recordRow.buildingId]" disabled class="input"></el-input>
                </el-col>
                <el-col :span="12" class="col12">
                    <div class="label">楼层/区域</div>
                    <el-input v-model="floorDic[recordRow.floorId]" disabled class="input"></el-input>
                </el-col>
                <el-col :span="12" class="col12">
                    <div class="label">所在位置</div>
                    <el-input v-model="recordRow.position" disabled class="input"></el-input>
                </el-col>
                <el-col :span="12" class="col12">
                    <div class="label">隐患来源</div>
                    <el-input v-model="recordRow.source==1?'一键上报':'巡查上报'" disabled class="input"></el-input>
                </el-col>
                <el-col :span="12" class="col12">
                    <div class="label">隐患描述</div>
                    <el-input v-model="recordRow.hiddenDesc" type="textarea" disabled class="input" :rows="10"></el-input>
                </el-col>
                <div style="width:50%;display:flex;justify-content: center;margin-bottom:25px;">
                    <div class="label">隐患现场图</div>
                    <div class="avatar-uploader">
                        <img class="avatar-uploader" style="width:100%;height:220px;" :src="recordRow.scenePhoto" alt/>
                    </div>
                </div>
                <div style="width:100%;height:40px;margin-bottom:20px;">
                    <el-col :span="12" class="col12">
                        <div class="label">审核确认</div>
                        <el-input v-model="recordRow.auditStatus==1?'通过':'未通过'" disabled class="input"></el-input>
                    </el-col>
                </div>
                <el-col :span="12" class="col12">
                    <div class="label">处理时间</div>
                    <el-input v-model="recordRow.handTime" disabled class="input"></el-input>
                </el-col>
                <el-col :span="12" class="col12">
                    <div class="label">处理人员</div>
                    <el-input v-model="realNameDic[recordRow.hander]" disabled class="input"></el-input>
                </el-col>
                <el-col :span="12" class="col12">
                    <div class="label">处理描述</div>
                    <el-input v-model="recordRow.handDesc" disabled type="textarea" class="input" :rows="10"></el-input>
                </el-col>
                <div style="width:50%;display:flex;justify-content: center;margin-bottom:25px;">
                    <div class="label">处理结果图</div>
                    <div class="avatar-uploader">
                        <img class="avatar-uploader" style="width:100%;height:220px;" v-if="recordRow.handPhoto" :src="recordRow.handPhoto" alt/>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="recordDialog = false" style="margin-top:20px;">取 消</el-button>
                <el-button type="primary" @click="recordDialog = false" style="margin-top:20px;">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { recordOption } from '@/const/fireControlSafe/hidenmanage/hidenmanage'
import { getDict } from '@/api/unit/dict'
import { safehiddentrouble } from '@/api/fireControlSafe/hidenmanage/hidenmanage'
import { findAllUser } from '@/api/public'
import { fetchBuildingList } from '@/api/unit/building'
import { fetchFloorList } from '@/api/unit/floor'
export default {
    components:{
        
    },
    data() {
      return {
        option: {
          column: [{
            // icon:'el-icon-info',
            label: '隐患处理',
            prop: 'tab1',
          }, {
            // icon:'el-icon-warning',
            label: '隐患处理记录',
            prop: 'tab2',
          }]
        },
        recordParams:{
            limit:10,
            page:1,
            hiddenStatus:1,
            hander:'',
            reportTimeStart:'',
            reportTimeEnd:''
        },
        recordPage:{
            currentPage:1,
            pageSize:10,
            total:1,
        },
        recordOption:recordOption,
        recordData:[{
            time:'2019-7-16',
            updateId:1,
            buildingId:12,
            floorId:13,
            localtion:'楼梯',
            source:1,
            handle:2,
            img:'https://element.eleme.cn/2.0/static/hamburger.50e4091.png',
            desc:'消防水泵旁边堆积有杂物，及时泵旁边堆积有杂物，及时泵旁边堆积有杂物，及时泵旁边堆积有杂物，及时清理',
            confirm:false,
            dealDesc:'已处理',
            dealTime:'2019-7-16',
            dealHandle:12,
            dealResultImg:'https://element.eleme.cn/2.0/static/hamburger.50e4091.png'
        }],
        recordRow:{},
        listLoading:false,
        dialogVisible:false,
        recordDialog:false,
        realNameDic:{},
        buildingDic:{},
        floorDic:{},
        timeout1:false,
        timeout2:false
      }
    },
    created() {
        findAllUser().then(res=>{
            if(res && res.data && res.data.code == '0'){
                res.data.data.forEach(s=>{
                    this.realNameDic[s.id]=s.realName
                    this.recordOption.column[1].dicData.push({
                        label:s.realName,
                        value:s.id
                    })
                    this.recordOption.column[6].dicData.push({
                        label:s.realName,
                        value:s.id
                    })
                })
            }
        })
        fetchBuildingList().then(res=>{
            console.log(res)
            if(res && res.data){
                res.data.data.forEach(s=>{
                    this.buildingDic[s.id]=s.buildingCode
                    this.recordOption.column[2].dicData.push({
                        label:s.buildingCode,
                        value:s.id.toString()
                    })
                })
            }
        })
        fetchFloorList().then(res=>{
            if(res && res.data){
                res.data.data.forEach(s=>{
                    this.floorDic[s.id]=s.floorCode
                    this.recordOption.column[3].dicData.push({
                        label:s.floorCode,
                        value:s.id.toString()
                    })
                })
            }
        })
    },
    watch: {
    },
    computed: {
      
    },
    mounted() {
        this.getRecordList()
    },
    methods: {
        searchReset(){
            this.recordParams.reportTimeStart=''
            this.recordParams.reportTimeEnd=''
            this.recordParams.hander=''
        },
        recordSizeChange(val){
            this.recordParams.page=1
            this.recordParams.limit=val
            this.getRecordList()
        },
        recordCurrentChange(val){
            this.recordParams.page=val
            this.getRecordList()
        },
        getRecordList(){
            this.listLoading=true
            safehiddentrouble(this.recordParams).then(res=>{
                this.listLoading=false
                if(res && res.data){
                    res.data.data.forEach(s=>{
                        s.reportTime=s.reportTime.replace('T',' ')
                        s.handTime=s.handTime.replace('T',' ')
                    })
                    this.recordData=res.data.data
                    this.recordPage.total=res.data.total
                }
            }).catch(error=>{
                if(error.message.includes('timeout')){
                    this.timeout2=true
                }
            })
        },
        recordSearchChange(val){
            console.log(val)
            if(val.hander){
                this.recordParams.hander=val.hander
            }
            if(val.recordReport && val.recordReport.length==2){
                var y1=val.recordReport[0].getFullYear()
                var m1=val.recordReport[0].getMonth()+1
                var d1=val.recordReport[0].getDate()
                var y2=val.recordReport[1].getFullYear()
                var m2=val.recordReport[1].getMonth()+1
                var d2=val.recordReport[1].getDate()
                function jia0(n){
                    if(n<10){
                        return '0'+n
                    }else{
                        return n
                    }
                }
                m1=jia0(m1)
                d1=jia0(d1)
                m2=jia0(m2)
                d2=jia0(d2)
                this.recordParams.reportTimeStart=y1+'-'+m1+'-'+d1
                this.recordParams.reportTimeEnd=y2+'-'+m2+'-'+d2
            }else{
                this.recordParams.reportTimeStart=''
                this.recordParams.reportTimeEnd=''
            }
            this.recordParams.page=1
            this.recordPage.currentPage=1
            this.getRecordList()
        },
        seePicture(url){
            this.facilityPhoto = url
            this.dialogVisible = true
        },
        closeImg () {
            this.dialogVisible = false
        },
        seeRecord(data){
            this.recordDialog=true
            this.recordRow=data
        },
    }
}  
</script>
<style>
.col12{
    display: flex;
    justify-content: center;
    margin-bottom:20px;
}
.label{
    min-width:120px;
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