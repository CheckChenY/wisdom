<template>
    <el-row>
        <el-col :span="4"><div class="grid-content bg-purple">&nbsp;</div></el-col>
        <el-col :span="16" class="res_container">
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="4" class="res_title_left"></el-col> 
                <el-col :span="16">
                    <div class="res_title">
                        <img class="res_title_img" src="../../../public/img/logo.png" alt>
                        <span class="res_title_word">金特莱智慧消防云平台</span>
                    </div>
                </el-col>
                <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <p class="res_tiitle_down">
                        守护您的消防安全
                    </p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-steps :active="active" finish-status="success" align-center>
                        <el-step title="注册信息" description="请如实填写注册信息，信息将由监管部门审核校验。">
                        </el-step>
                        <el-step title="审核校验" description="注册信息审核校验通过后，账号即可成功登录。"></el-step>
                        <!-- <el-step title="登录成功" description="拥有准入许可的账号，可以登录进行消防安全管理。"></el-step> -->
                    </el-steps>
                </el-col>
            </el-row>
            <!-- <el-row v-if="active==0">
                <el-col :span="24">
                    <div class="res_divider"></div>
                </el-col>
            </el-row> -->
            <stepOne v-if="active===0" @changeStep='changeStep'></stepOne>
            <el-row v-if="active===1">
                <el-col :span="24">
                    <div class="register_back"></div>
                    <div style="display: flex;justify-content:center;align-items:center;height:100px;">
                        <el-button type="primary" @click="login">返 回</el-button>
                    </div>
                </el-col>
            </el-row>
            <!-- <el-row v-if="active===0">
                <el-col :span="24" style="display: flex;justify-content:center;align-items:center;height:100px;">
                    <el-button>返回</el-button>
                </el-col>
            </el-row> -->
        </el-col>
        <el-col :span="4"><div class="grid-content bg-purple">&nbsp;</div></el-col>

        <el-col :span="24" v-if="active==0">
            <el-row class="res_company_row">
                <el-col :span="24">
                    <div class="res_footer">
                        copyright 2018 金特莱研发部出品
                    </div>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>
<script>
    import stepOne from './stepOne';
    import { registerAdd,registerUser } from '@/api/register'

    export default {
        name: "register",
        components: {
            stepOne
        },
        data () {
            return {
                active: 0,
            };
        },
        watch: {
        },
        created () { 
        },
        mounted () { },
        computed: {
            // ...mapGetters(["website"])
        },
        props: [],
        methods: {
            changeStep(a){
                this.active=a
            },
            login(){
                this.$router.push({ path: "/login" });
            },
            register(){
                console.log(this.orgName)
                let obj = {
                        orgName:'张三',
                        orgCode:'2234357856856734A',
                        realName:'战三',
                        phone:'13512345678',
                        businessScope:'笔艳子摸',
                        checkState:0,
                        regionId:'132140',
                        orgType:'1'
                    }
                registerAdd(obj).then(res=>{
                    console.log(res)
                })
            },
        }
    }
</script>
<style lang="scss">
    .res_container{
        padding-top: 20px;
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
            margin-top: 40px;
            border-bottom: 1px solid #ccc;
        }
        .register_back{
            background-image: url("../../../public/img/bg/register_bg.jpg");
            background-size: 100%;
            background-repeat: no-repeat;
            height: 750px;
        }
        .res_company_title{
            font-size: 20px;
            font-weight: 700;
            margin-top: 20px;
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


