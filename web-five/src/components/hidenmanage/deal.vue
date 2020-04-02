<template>
    <div>
        <avue-crud
            :option="dealOption" 
            :data="dealData"
            :page="dealPage"
            :table-loading="listLoading"
            @search-reset="searchReset"
            @size-change="dealSizeChange"
            @current-change="dealCurrentChange"
            @search-change="dealSearchChange">
            <template slot="empty">
                <avue-empty
                    :image="timeout1?'/img/bg/404.svg':'/img/empty.png'"
                    :desc="timeout1?'请求超时,请稍后重试······':'暂无数据'"
                    >
                </avue-empty>
            </template>
            <template slot="scenePhoto" slot-scope="scope">
                <el-button size="small" plain type="info" @click="seePicture(scope.row.scenePhoto)">查看</el-button>
            </template>
            <template slot="menu" slot-scope="scope">
                <el-button size="small" plain type="primary" @click="deal(scope.row)">处理</el-button>
            </template>
        </avue-crud>
        <!-- 处理隐患 -->
        <el-dialog title="隐患详情" :visible.sync="dealDialog">
            <div :style="dealRow.confirm==1?'height:700px':'height:460px'">
                <el-col :span="12" class="col12">
                    <div class="label">上传时间</div>
                    <el-input v-model="dealRow.reportTime" disabled class="input"></el-input>
                </el-col>
                <el-col :span="12" class="col12">
                    <div class="label">上传人员</div>
                    <el-input v-model="realNameDic[dealRow.userId]" disabled class="input"></el-input>
                </el-col>
                <el-col :span="12" class="col12">
                    <div class="label">所在建筑</div>
                    <el-input v-model="buildingDic[dealRow.buildingId]" disabled class="input"></el-input>
                </el-col>
                <el-col :span="12" class="col12">
                    <div class="label">楼层/区域</div>
                    <el-input v-model="floorDic[dealRow.floorId]" disabled class="input"></el-input>
                </el-col>
                <el-col :span="12" class="col12">
                    <div class="label">所在位置</div>
                    <el-input v-model="dealRow.position" disabled class="input"></el-input>
                </el-col>
                <el-col :span="12" class="col12">
                    <div class="label">隐患来源</div>
                    <el-input v-model="dealRow.source==1?'一键上报':'巡查上报'" disabled class="input"></el-input>
                </el-col>
                <el-col :span="12" class="col12">
                    <div class="label">隐患描述</div>
                    <el-input v-model="dealRow.hiddenDesc" type="textarea" disabled class="input" :rows="10" style="height: 219px;"></el-input>
                </el-col>
                <div style="width:50%;display:flex;justify-content: center;margin-bottom:25px;">
                    <div class="label">隐患现场图</div>
                    <div class="avatar-uploader">
                        <img class="avatar-uploader" style="width:100%;height:220px;" :src="dealRow.scenePhoto" alt/>
                    </div>
                </div>
                <div style="width:100%;height:40px;margin-bottom:20px;">
                    <el-col :span="12" class="col12">
                        <div class="label"><span style="color:red;">* </span>审核确认</div>
                        <el-radio-group v-model="dealRow.confirm" style="display: flex;align-items:center;" class="input">
                            <el-radio label="1">通过</el-radio>
                            <el-radio label="2">未通过</el-radio>
                        </el-radio-group>
                    </el-col>
                </div>
                <div style="display: flex;" v-if="dealRow.confirm==1">
                    <el-col :span="12" class="col12">
                        <div class="label"><span style="color:red;">* </span>处理描述</div>
                        <el-input v-model="dealDesc" placeholder="请输入处理描述" type="textarea" class="input" :rows="10"></el-input>
                    </el-col>
                    <div style="width:50%;display:flex;justify-content: center;margin-bottom:25px;">
                        <div class="label"><span style="color:red;">* </span>处理结果图</div>
                        <el-upload
                            class="avatar-uploader"
                            ref="dealResultImg"
                            action=""
                            :limit="1"
                            :multiple="false"
                            :show-file-list="false"
                            :auto-upload="false"
                            :on-change="fileChange"
                        >
                            <img
                            style="width:100%;height:100%;"
                            v-if="dealResultImg"
                            :src="dealResultImg"
                            alt
                            >
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dealDialog = false" style="margin-top:20px;">取 消</el-button>
                <el-button type="primary" @click="toDeal" style="margin-top:20px;">提交</el-button>
            </div>
        </el-dialog>
        <image-view v-if="dialogVisible" :facilityPhoto='facilityPhoto' @closeImage="closeImg"></image-view>
    </div>
</template>
<script>
import { dealOption } from '@/const/fireControlSafe/hidenmanage/hidenmanage'
import { getDict } from '@/api/unit/dict'
import { safehiddentrouble,safehiddentroubleDeal } from '@/api/fireControlSafe/hidenmanage/hidenmanage'
import { findAllUser } from '@/api/public'
import { fetchBuildingList } from '@/api/unit/building'
import { fetchFloorList } from '@/api/unit/floor'
import ImageView from '@/components/public/image-view'
export default {
    components:{
        'image-view':ImageView,
    },
    data(){
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
        dealParams:{
            limit:10,
            page:1,
            hiddenStatus:0,
        },
        dealPage:{
            currentPage:1,
            pageSize:10,
            total:1,
        },
        dealOption:dealOption,
        dealData:[],
        dealDesc:'',
        dealRow:{},
        listLoading:false,
        dialogVisible:false,
        dealDialog:false,
        dealResultImg:'',
        realNameDic:{},
        buildingDic:{},
        floorDic:{},
        timeout1:false,
        timeout2:false
      }
    },
    created(){
        findAllUser().then(res=>{
            if(res && res.data && res.data.code == '0'){
                res.data.data.forEach(s=>{
                    this.realNameDic[s.id]=s.realName
                    this.dealOption.column[1].dicData.push({
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
                    this.dealOption.column[2].dicData.push({
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
                    this.dealOption.column[3].dicData.push({
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
        this.getDealList()
    },
    methods: {
        searchReset(){
            delete this.dealParams.reportTimeStart
            delete this.dealParams.reportTimeEnd
            delete this.dealParams.source
        },
        dealSizeChange(val){
            this.dealParams.page=1
            this.dealParams.limit=val
            this.getDealList()
        },
        dealCurrentChange(val){
            this.dealParams.page=val
            this.getDealList()
        },
        getDealList(){
            this.listLoading=true
            safehiddentrouble(this.dealParams).then(res=>{
                this.listLoading=false
                if(res && res.data){
                    res.data.data.forEach(s=>{
                        s.reportTime=s.reportTime.replace('T',' ')
                    })
                    this.dealData=res.data.data
                    this.dealPage.total=res.data.total
                }
            }).catch(error=>{
                if(error.message.includes('timeout')){
                    this.timeout1=true
                }
            })
        },
        dealSearchChange(val){
            if(val.source){
                this.dealParams.source=val.source
            }
            if(val.dealReport && val.dealReport.length==2){
                var y1=val.dealReport[0].getFullYear()
                var m1=val.dealReport[0].getMonth()+1
                var d1=val.dealReport[0].getDate()
                var y2=val.dealReport[1].getFullYear()
                var m2=val.dealReport[1].getMonth()+1
                var d2=val.dealReport[1].getDate()
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
                this.dealParams.reportTimeStart=y1+'-'+m1+'-'+d1
                this.dealParams.reportTimeEnd=y2+'-'+m2+'-'+d2
            }else{
                this.dealParams.reportTimeStart=''
                this.dealParams.reportTimeEnd=''
            }
            this.dealParams.page=1
            this.dealPage.currentPage=1
            this.getDealList()
        },
        seePicture(url){
            this.facilityPhoto = url
            this.dialogVisible = true
        },
        closeImg () {
            this.dialogVisible = false
        },
        deal(row){
            console.log(row)
            this.dealDialog=true
            this.dealRow=row
        },
        // 点击图片上传
        fileChange(file) {
        this.$refs.dealResultImg.clearFiles();
            this.imgDataTrans(file).then(
                res => {
                this.dealResultImg = res;
                },
                error => {
                console.log(error);
                }
            );
        },
        // 图片数据转换
        imgDataTrans(file) {
        return new Promise((resolve, reject) => {
            const imgType = "image/jpeg;image/png;image/jpg";
            const isTypeOk = imgType.indexOf(file.raw.type);
            const isLt2M = file.size / 1024 / 1024 < 1;
            if (isTypeOk == -1) {
            this.$message.error("上传图片要求JPG、JPEG或PNG格式!");
            return;
            }
            if (!isLt2M) {
            this.$message.error("上传图片大小不能超过 1MB!");
            return;
            }
            this.getBase64(file.raw).then(
            response => {
                resolve(response);
            },
            error => {
                reject(error);
            }
            );
        });
        },
        getBase64(file) {
        return new Promise((resolve, reject) => {
                let reader = new FileReader();
                let imgResult = "";
                reader.readAsDataURL(file);
                reader.onload = function() {
                imgResult = reader.result;
                };
                reader.onerror = function(error) {
                reject(error);
                };
                reader.onloadend = function() {
                resolve(imgResult);
                };
            });
        },
        toDeal(){
            if(!this.dealRow.confirm){
                this.$message({
                    type:'error',
                    message:'请选择审核确认'
                })
                return
            }
            if(this.dealRow.confirm=='1'){
                if(!this.dealDesc){
                    this.$message({
                        type:'error',
                        message:'请输入处理描述'
                    })
                    return
                }
                if(!this.dealResultImg){
                    this.$message({
                        type:'error',
                        message:'请上传处理结果图'
                    })
                    return
                }
            }
            //处理对接
            var obj={
                id:this.dealRow.id,
                hiddenStatus:1,
                auditStatus:this.dealRow.confirm,
                hiddenDesc:this.dealRow.hiddenDesc,
                handPhoto:this.dealResultImg,
                handDesc:this.dealDesc
            }
            safehiddentroubleDeal(obj).then(res=>{
                console.log(res)
                this.dealDialog=false
                if(res && res.data && !parseInt(res.data.code)){
                    this.$message({
                        type:'success',
                        message:'处理成功'
                    })
                    this.getDealList()
                }else{
                    this.$message({
                        type:'error',
                        message:'处理失败'
                    })
                }
            })
        }
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