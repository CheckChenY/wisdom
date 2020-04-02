<template>
    <div class="menu_header">
        <div style="width:65%;height:100%;display:flex;align-items:center;">
            <span style="font-size: 18px;color:#fff;">智慧云平台</span>
        </div>
        <div style="width:35%;display: flex;justify-content: flex-end;align-items:center;padding:0 10px;">
            <iframe width="230" scrolling="no" height="60" frameborder="0" allowtransparency="true" src="//i.tianqi.com/index.php?c=code&id=12&color=%23FFFFFF&icon=1&num=1&site=12"></iframe>
            <div class="icons-list" @click="toMessage">
                <a-badge :count="UnreadMessage" :numberStyle="{boxShadow: '0 0 0 0 inset'}">
                    <a-icon type="bars" style="font-size:24px;" />
                </a-badge>
            </div>
            <div style="min-width:120px;height:100%;display: flex;align-items:center;justify-content: flex-end;padding-top:10px;">
                <div style="width:34px;height:34px;border-radius:50%;background:#fff;margin:0 10px;">
                    <img src="../../assets/icon/headimg.png"  style="width:34px;height:34px;border-radius:50%;"/>
                </div>
                <a-dropdown>
                    <a class="ant-dropdown-link" href="javascript:;" style="color:#fff;">
                        {{form.realName?form.realName:'暂无'}} <a-icon type="down" style="margin-left:5px;"/>
                    </a>
                    <a-menu slot="overlay" style="margin-top:5px;">
                        <a-menu-item key="0">
                            <router-link tag="a" rel="noopener noreferrer" to="userinfo">个人信息</router-link>
                        </a-menu-item>
                        <a-menu-divider />
                        <a-menu-item key="1" @click="onhandleBack">
                            <span>退出系统</span>
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
import { findOrgByUserId,myUser } from "@/api/public"
import { findCount } from '@/api/pushcenter/pushcenter'
import { mapGetters } from "vuex";
import { findById } from '@/api/platform/platform'
export default {
    name:'MenuHeader',
    created(){
        this.myUser()
        console.log(this.msgCount)
    },
    data () {
        return {
            form: {},
            UnreadMessage: 0,
            alarmSituationCount: 0,
            orgObj: {},
        }
    },
    computed: {
        ...mapGetters([
            "msgCount",
            "orgInfo",
        ]),
    },
    watch: {
        msgCount:function(val, oval) {
            this.UnreadMessage = this.msgCount.UnreadMessage
            this.alarmSituationCount = this.msgCount.alarmSituationCount
            console.log(this.msgCount)
        }
    },
    methods:{
        onhandleBack(){
            this.$store.dispatch('FedLogOut').then(() => {
                this.$router.push({path:'/login'})
            })
        },
        myUser () {
            myUser().then(res => {
                console.log(res)
                if(res && res.data && res.data.success){
                    this.form = res.data.value
                    this.$store.dispatch('GetUserInfo', res.data.value)
                }
            })
            this.findCount()
            findById({orgId:this.orgInfo.id}).then(res => {
                if (res && res.data && res.data.success) {
                    this.orgObj = res.data.value
                    this.orgObj.logo = this.orgObj.logo? this.$imgUrl+this.orgObj.logo:require("../../assets/logo.png")
                }
            })
        },
        findCount () {
            findCount().then(res => {
                console.log(res.data)
                this.UnreadMessage = res.data.value.UnreadMessage
                this.alarmSituationCount = res.data.value.alarmSituationCount
            })
        },
        toMessage () {
            this.$router.push('/message')
        },
    }
    
}
</script>
<style lang="scss">
.menu_header{
    position: fixed;
    top:0;
    left:0;
    right:0;
    height:70px;
    background-image: url('../../assets/top-1.png');
    display: flex;
    justify-content:space-between;
    padding:0 10px;
    .icons-list{
        margin: 0 16px;
        color: #fff;
    }
}
</style>
