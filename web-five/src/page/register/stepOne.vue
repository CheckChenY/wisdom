<template>
    <el-row>
        <el-col :span="4"><div class="grid-content bg-purple">&nbsp;</div></el-col>
        <el-col :span="16" class="res_container">
            <el-row>
                <el-col :span="24">
                    <div class="res_company_title">单位信息</div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <div class="res_company_left"><span style="color: red;">* </span>单位名称:</div>
                </el-col>
                <el-col :span="16">
                    <el-input v-model="orgName" placeholder="请输入单位名称"></el-input>
                </el-col>
            </el-row>

            <el-row class="res_company_row">
                <el-col :span="8">
                    <div class="res_company_left"><span style="color: red;">* </span>统一社会信用代码/组织机构代码:</div>
                </el-col>
                <el-col :span="16">
                    <el-input v-model="orgCode" placeholder="请输入统一社会信用代码/组织机构代码"></el-input>
                </el-col>
            </el-row>

            <el-row class="res_company_row">
                <el-col :span="8">
                    <div class="res_company_left"><span style="color: red;">* </span>单位类型:</div>
                </el-col>
                <el-col :span="16">
                    <el-select v-model="orgType" placeholder="请选择单位类型" style="width:100%">
                        <el-option :label="item.label" :value="item.value" v-for="(item,index) in orgTypeList"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            
            <el-row class="res_company_row">
                <el-col :span="8">
                    <div class="res_company_left"><span style="color: red;">* </span>所在地区:</div>
                </el-col>
                <el-col :span="16">
                    <el-cascader
                        placeholder="请选择所在地区"
                        style="width:100%"
                        :options="cascaderOptions"
                        change-on-select
                        @change="selectArea"
                    ></el-cascader>
                </el-col>
            </el-row>

            <el-row class="res_company_row">
                <el-col :span="8">
                    <div class="res_company_left"><span style="color: red;">* </span>单位地址:</div>
                </el-col>
                <el-col :span="16">
                    <el-input v-model="address" placeholder="请输入单位地址"></el-input>
                </el-col>
            </el-row>

            <el-row class="res_company_row">
                <el-col :span="8">
                    <div class="res_company_left"><span style="color: red;">* </span>法定代表人/负责人:</div>
                </el-col>
                <el-col :span="16">
                    <el-input v-model="realName" placeholder="请输入法定代表人/负责人"></el-input>
                </el-col>
            </el-row>

            <el-row class="res_company_row">
                <el-col :span="8">
                    <div class="res_company_left"><span style="color: red;">* </span>法定代表人/负责人联系电话:</div>
                </el-col>
                <el-col :span="16">
                    <el-input v-model="phone" placeholder="请输入法定代表人/负责人"></el-input>
                </el-col>
            </el-row>

            <el-row class="res_company_row">
                <el-col :span="8">
                    <div class="res_company_left">经营范围（选填）:</div>
                </el-col>
                <el-col :span="16">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入经营范围（选填）"
                        v-model="businessScope">
                    </el-input>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <div class="res_divider"></div>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <div class="res_company_title">联系人信息</div>
                </el-col>
            </el-row>

            <el-row class="res_company_row">
                <el-col :span="8">
                    <div class="res_company_left"><span style="color: red;">* </span>联系人姓名:</div>
                </el-col>
                <el-col :span="16">
                    <el-input v-model="userName" placeholder="请输入联系人姓名"></el-input>
                </el-col>
            </el-row>

            <el-row class="res_company_row">
                <el-col :span="8">
                    <div class="res_company_left"><span style="color: red;">* </span>联系手机号（登录名）:</div>
                </el-col>
                <el-col :span="16">
                    <el-input placeholder="请输入联系手机号（登录名）" v-model="phoneUser">
                        <template slot="prepend">+ 86</template>
                    </el-input>
                </el-col>
            </el-row>

            <el-row class="res_company_row">
                <el-col :span="8">
                    <div class="res_company_left"><span style="color: red;">* </span>短信验证码:</div>
                </el-col>
                <el-col :span="12">
                    <el-input placeholder="请输入短信验证码" v-model="input">
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="info" @click="getCode" plain>{{countText}}</el-button>
                </el-col>
            </el-row>

            <el-row class="res_company_row">
                <el-col :span="8">
                    <div class="res_company_left"><span style="color: red;">* </span>密码:</div>
                </el-col>
                <el-col :span="16">
                    <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
                </el-col>
            </el-row>

            <el-row class="res_company_row">
                <el-col :span="8">
                    <div class="res_company_left"><span style="color: red;">* </span>确认密码:</div>
                </el-col>
                <el-col :span="16">
                    <el-input v-model="passwordAgain" type="password" placeholder="请输入确认密码"></el-input>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <div class="res_divider"></div>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <div class="res_company_title">证件上传</div>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <div class="res_company_title">&nbsp;</div>
                </el-col>
                <el-col :span="8">
                        <!-- action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove" -->
                    <el-upload
                        class="upload-demo"
                        action
                        :file-list="fileList"
                        :limit="1"
                        :on-change="handleModelPhotoImg"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                    </el-upload>
                </el-col>
                <el-col :span="8">
                    <div class="res_company_title">&nbsp;</div>
                </el-col>
            </el-row>

            <el-row class="res_company_row">
                <el-col :span="8" :offset="8">
                    <div class="res_company_upload">
                        <p>格式要求：</p>
                        <p>1.企业用户上传营业执照；非企业用户上传组织机构代码证。</p>
                        <p>2.证书原件，复印件不可用，证书文字、印章清晰可见。</p>
                        <p>3.要求JPG、JPEG或PNG格式。大小小于2M</p>
                        <p>4.上传电子扫描件</p>
                    </div>
                </el-col>
            </el-row>

            <el-row class="res_company_row">
                <el-col :span="8" :offset="8">
                    <el-button @click="register" type="primary">注册</el-button>
                </el-col>
                <el-col :span="8">
                    <div>
                        <span @click="login" class="res_company_login">
                            使用已有账号登录
                        </span>
                    </div>
                </el-col>
            </el-row> 

        </el-col>
        <el-col :span="4"><div class="grid-content bg-purple">&nbsp;</div></el-col>
    </el-row>
</template>
<script>
    import stepOne from './stepOne';
    import { registerAdd,registerUser,checkPhone,checkPhoneAndCode } from '@/api/register'
    import { isvalidatemobile } from '@/util/validate'
    import { getAreaDict } from '@/api/unit/dict'
    import { getToken } from '@/util/auth'
    
    export default {
        name: "register",
        components: {
            stepOne
        },
        data () {
            return {
                active: 0,
                input:'',
                passwordAgain:'',
                //单位信息
                orgName:'',
                orgCode:'',
                realName:'',
                phone:'',
                businessScope:'',
                //联系人信息
                userName:'',
                phoneUser:'',
                password:'',
                orgId:'',

                textarea:'',
                fileList: [],
                countdown: 60,
                countText: '获取验证码',
                disable: true,
                orgType:'',
                orgTypeList:[{
                    label:'机关单位',
                    value:'1'
                },{
                    label:'重点单位',
                    value:'3'
                },{
                    label:'公共聚集场所',
                    value:'4'
                },{
                    label:'工矿企业',
                    value:'5'
                },{
                    label:'一般单位',
                    value:'6'
                },],
                cascaderOptions:[],
                address:'',
                regionId:'',
                regionTempArr:[]
            };
        },
        watch: {
        },
        created () { 
            getAreaDict('type=area_type').then(res => {
                if(res && res.data && !parseInt(res.data.code)){
                    function digui(arr){
                        arr.forEach(s=>{
                            if(!s.children.length){
                                delete s.children
                            }else{
                                digui(s.children)
                            }
                        })
                    }
                    digui(res.data.data)
                    this.cascaderOptions=res.data.data
                }
                console.log(res)
            }).catch(error=>{
                console.log(error)
            })
        },
        mounted () {
            console.log('注册单位', require('../../../public/img/front_img.png'))
        },
        computed: {
            // ...mapGetters(["website"])
            
        },
        props: [],
        methods: {
            //选择所在地区
            selectArea(val){
                this.regionTempArr=val
                // this.regionId
            },
            // 获取短信验证码
            getCode () {
                if (!this.disable) {
                    return
                }
                console.log(isvalidatemobile(this.phoneUser))
                if (isvalidatemobile(this.phoneUser)[0]) {
                    this.$message({
                        type:'error',
                        message:isvalidatemobile(this.phoneUser)[1]
                    })
                    return
                }
                this.timer()
                checkPhone({phone: this.phoneUser}).then((res) => {
                    if (res && res.data && res.data.code == 0) {
                        this.$message({
                            message: '发送成功',
                            type: 'success'
                        })
                    }
                })
            },
            // 计时器
            timer () {
                if (this.countdown == 0) {
                    this.disable = true
                    this.countText="重新获取验证码";  
                    this.countdown = 60;  
                    return false;  
                } else {  
                    this.disable = false
                    this.countText="重新发送(" + this.countdown + ")";  
                    this.countdown--;  
                }
                setTimeout(() => {  
                    this.timer();  
                },1000); 
            },
            login(){
                this.$router.push({ path: "/login" });
            },

            //表单必填项验证
            validate(){
                if(!this.orgName){
                    this.$message({
                        type:'error',
                        message:'请输入单位名称'
                    })
                    return false
                }
                if(!this.orgCode){
                    this.$message({
                        type:'error',
                        message:'请输入统一社会信用代码/组织机构代码'
                    })
                    return false
                }
                if(!this.orgType){
                    this.$message({
                        type:'error',
                        message:'请选择单位类型'
                    })
                    return false
                }
                if(!this.regionTempArr.length){
                    this.$message({
                        type:'error',
                        message:'请选择所在地区'
                    })
                    return false
                }
                if(!this.address){
                    this.$message({
                        type:'error',
                        message:'请输入单位地址'
                    })
                    return false
                }
                if(!this.realName){
                    this.$message({
                        type:'error',
                        message:'请输入法定代表人/负责人'
                    })
                    return false
                }
                if(!this.phone){
                    this.$message({
                        type:'error',
                        message:'请输入法定代表人/负责人联系电话'
                    })
                    return false
                }
                if(!this.userName){
                    this.$message({
                        type:'error',
                        message:'请输入联系人姓名'
                    })
                    return false
                }
                if(!this.phoneUser){
                    this.$message({
                        type:'error',
                        message:'请输入联系手机号（登录名）'
                    })
                    return false
                }
                if(!this.input){
                    this.$message({
                        type:'error',
                        message:'请输入短信验证码'
                    })
                    return false
                }
                if(!this.password){
                    this.$message({
                        type:'error',
                        message:'请输入密码'
                    })
                    return false
                }
                if(!this.passwordAgain){
                    this.$message({
                        type:'error',
                        message:'请输入确认密码'
                    })
                    return false
                }
                if(!this.fileList.length){
                    this.$message({
                        type:'error',
                        message:'请上传证件信息'
                    })
                    return false
                }
                return true
            },

            //假注册用户，成功后再注册单位和注册用户
            beforeSubmit(){
                console.log('假注册')
                var paraObj={
                    phone:this.phoneUser,
                    checkCode:this.input
                }
                checkPhoneAndCode(paraObj).then(res=>{
                    console.log(res)
                    if(res && res.data){
                        if(res.data.msg=='true'){
                            this.realSubmit()
                        }else{
                            this.$message({
                                type:'error',
                                message:res.data.msg
                            })
                        }
                    }
                }).catch(error=>{
                    console.log(error)
                })
            },

            //真实注册单位 和 真实注册用户
            realSubmit(){
                //注册单位
                let obj = {
                        orgName:this.orgName,
                        orgCode:this.orgCode,
                        legalPerson:this.realName,
                        legalPersonPhone:this.phone,
                        businessScope:this.businessScope,
                        checkState:0,
                        orgType:this.orgType,
                        address:this.address,
                        regionId:this.regionId,
                        orgImg:this.fileList[0].url,
                        // frontImg: require('../../../public/img/front_img.png'),
                    }
                    
                registerAdd(obj).then(res=>{
                    if(res && res.data && res.data.code === 0){
                        let data = res.data.data;
                        this.orgId = data.id;
                        //注册用户
                        let item = {
                            userName:this.phoneUser,
                            phone:this.phoneUser,
                            password:this.password,
                            orgId:this.orgId,
                            realName:this.userName,
                            checkCode:this.input,
                        }
                        registerUser(item).then(response=>{
                            if(!parseInt(response.data.code)){
                                this.active = 1;
                                this.$emit('changeStep', this.active)
                            }else{
                                this.$message({
                                    type:'error',
                                    message:response.data.msg
                                })
                            }
                        })
                    } else {
                        this.$message({
                            type:'error',
                            message:res.data.msg
                        })
                    }
                })
            },
            register(){
                if(this.validate()){
                    //递归判断所选地区是否为最下级
                    var lastRegionid=this.regionTempArr[this.regionTempArr.length-1]
                    var lastRequired=true
                    function diguiForregionId(arr){
                        arr.forEach(s=>{
                            if(s.value==lastRegionid){
                                lastRequired=s.children?false:true
                            }else{
                                if(s.children){
                                    return diguiForregionId(s.children)
                                }
                            }
                        })
                    }
                    diguiForregionId(this.cascaderOptions)
                    if(!lastRequired){
                        this.$message({
                            type:'error',
                            message:'请选择所在地区至区县或地级市'
                        })
                        return
                    }else{
                        this.regionId=lastRegionid
                    }

                    this.beforeSubmit()
                }
            },
            handleModelPhotoImg(file) {
                this.fileList = []
                this.imgDataTrans(file).then(
                    res => {
                        if(res){
                            let obj = {
                                name:file.name,
                                url:res,
                            }
                            this.fileList.push(obj);
                        }
                        // console.log(res)
                        // this.form.modelPhoto = res;
                    },
                    error => {
                        console.log(error);
                    }
                );
            },

            // 图片数据转换
            imgDataTrans(file) {
                // console.log(file)
                return new Promise((resolve, reject) => {
                    const imgType = "image/jpeg;image/png;image/jpg";
                    const isTypeOk = imgType.indexOf(file.raw.type);
                    const isLt2M = file.size / 1024 / 1024 < 1;
                    // console.log(this.$refs)
                    // this.$refs.upload.clearFiles();
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
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            }
        }
    }
</script>
<style lang="scss">
    .res_container{
        .res_title{
            display: flex;
            justify-content:center;
            align-items:Center;
            .res_title_img{
                width: 80px;
            }
            .res_title_word{
                font-size: 24px;
                font-weight: 700;
                padding-left: 10px;
            }
        }
        .res_tiitle_down{
            font-size: 14px;
            color: #cccccc;
            text-align: center;
        }
        .res_divider{
            margin-top: 100px;
            border-bottom: 1px solid #ccc;
        }
        .res_company_title{
            font-size: 20px;
            font-weight: 700;
        }
        .res_company_row{
            margin-top: 20px;
            .res_company_login{
                display: inline-block;
                font-size: 14px;
                color: #409EFF;
                cursor: pointer;
            }
        }
        .res_company_left{
            text-align: right;
            margin-right: 10px;
        }
        .res_company_upload{
            font-size: 14px;
            color: #ccc;
        }



    }
    .res_footer{
        text-align: center;
        font-size: 14px;
        color: #ccc;
        margin-top: 50px;
    }
</style>


