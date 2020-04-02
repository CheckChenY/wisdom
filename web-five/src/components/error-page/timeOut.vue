<template>
<div class="error-page">
    <div class="img"
        style=" background-image: url('/img/bg/404.svg');"></div>
    <div class="content">
    <h1>请求超时</h1>
    <div class="desc">抱歉，服务器长时间未响应，{{second}}秒后返回首页</div>
    <div class="actions">
        <router-link :to="{path:'/'}">
        <el-button type="primary">返回首页</el-button>
        </router-link>
    </div>
    </div>
</div>
</template>

<script>
import router from "@/router/router"
export default {
name: "timeOut",
data(){
    return{
        second:5,
        timer:''
    }
},
created(){
    console.log(this.second)
    this.timer=setInterval(()=>{
        this.second=this.second-1
        console.log(this.second)
        if(this.second==0){
            clearInterval(this.timer)
            router.push('/')
        }
    },1000)
},
// beforeRouteLeave(){
//     clearInterval(this.timer)
// }
};
</script>
<style lang="scss" scoped>
@import "./style.scss";
</style>
