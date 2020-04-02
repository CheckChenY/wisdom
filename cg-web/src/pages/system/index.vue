<template>
    <div class="containered">
        <a-row class="title_list">
            <a-col :span="12">
                <img src="../../assets/logo/logo2.png" alt>
                <span style="color:#0D69C0" class="title_left">金特莱智慧城市消防管理系统</span>
            </a-col>
            <a-col class="title_list_right" :span="12">
                <a-button class="title_right" @click="onhandleBack" type="default">退出</a-button>
            </a-col>
        </a-row>
        <a-row style="background-color:#F5F6F7" class="box">
            <div class="box_show">
                <div class="box_show_title">请选择需要进入的项目</div>
                <a-row>
                    <a-col :span="12">
                        <div class="box_system">
                            <div style="color:#FFFFFF" @click="()=>onhandleEnter()" 
                                 v-bind:class="{box_system_top_left:img1,box_system_lock_top_left:!img1}"></div>
                        </div>
                    </a-col>
                    <a-col :span="12">
                        <div @click="()=>onhandleEnter(item.path)" class="box_system">
                            <div style="color:#FFFFFF" @click="()=>onhandleEnter()" 
                                 v-bind:class="{box_system_top_right:img2,box_system_lock_top_right:!img2}"></div>
                        </div>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="6">
                        <div @click="()=>onhandleEnter(item.path)" class="box_system ">
                            <div style="color:#FFFFFF" @click="()=>onhandleEnter()" 
                                 v-bind:class="{box_system_bot_left:img3,box_system_lock_bot_left:!img3}"></div>
                        </div>
                    </a-col>
                    <a-col :span="6">
                        <div @click="()=>onhandleEnter(item.path)" class="box_system">
                            <div style="color:#FFFFFF" @click="()=>onhandleEnter()" 
                                 v-bind:class="{box_system_bot_right:img4,box_system_lock_bot_right:!img4}"></div>
                        </div>
                    </a-col>
                </a-row>
            </div>
        </a-row>
    </div>
</template>

<script>
import { findAlSystem } from "@/api/sysytem"
export default {
    data () {
        return {
            systemdata:[{id:0,title:'金特莱智慧消防云平台',path:'/workbench'},{id:1,title:'金特莱智慧消防云平台',path:'/workbench'}
            ,{id:1,title:'金特莱智慧消防云平台',path:'/login'}],
            img1:true,
            img2:false,
            img3:false,
            img4:true,
        }
    },
    created(){
        this.getFindAlSystem()
    },
    methods:{
        getFindAlSystem(){
            findAlSystem().then(res=>{
                console.log(res)
            })
        },
        onhandleBack(){
            this.$store.dispatch('FedLogOut').then(() => {
                this.$router.push({path:'/login'})
            })
        },
        onhandleEnter(path){
            this.$router.push({path:path})
        }
    }
    
}
</script>
<style lang='scss'>
    .containered{
        .title_list{
            text-align: left;
            height: 80px;
            border-bottom: 1px #ebeef5 solid;
            line-height:80px;
            .title_left{
                display: inline-block;
                vertical-align: middle;
                font-size: 20px;
                font-weight: 500;
            }
            .title_list_right{
                text-align: right;
                padding-right: 10px;
                .title_right{
                    margin-top:10px
                }
            }
        }
        .box{
            position: absolute;
            top: 80px;
            left: 0;
            right: 0;
            bottom: 0;
            .box_show{
                width: 70%;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                height: 80%;
                margin: auto;
                .box_show_title{
                    text-align: center;
                    font-size: 20px;
                    color: #8d9198;
                    font-weight: 500;
                }
            }
            .box_system{
                margin: 20px;
                text-align: center;
                .box_system_list{
                    display: inline-block;
                    text-align: center;
                }
            }
            .box_system_top_left{
                height: 294px;
                background: url('../../assets/logo/img_1.png') no-repeat;
                background-size: 100% 100%;
                cursor: pointer;
            }
            .box_system_top_right{
                height: 294px;
                background: url('../../assets/logo/img_2.png') no-repeat;
                background-size: 100% 100%;
                cursor: pointer;
            }
            .box_system_bot_left{
                height: 260px;
                background: url('../../assets/logo/img_3.png') no-repeat;
                background-size: 100% 100%;
                cursor: pointer;
            }
            .box_system_bot_right{
                height: 260px;
                background: url('../../assets/logo/img_4.png') no-repeat;
                background-size: 100% 100%;
                cursor: pointer;
            }

            
            .box_system_lock_top_left{
                height: 294px;
                background: url('../../assets/logo/lock_img1.png') no-repeat;
                background-size: 100% 100%;
            }
            .box_system_lock_top_right{
                height: 294px;
                background: url('../../assets/logo/lock_img2.png') no-repeat;
                background-size: 100% 100%;
            }
            .box_system_lock_bot_left{
                height: 260px;
                background: url('../../assets/logo/lock_img3.png') no-repeat;
                background-size: 100% 100%;
            }
            .box_system_lock_bot_right{
                height: 260px;
                background: url('../../assets/logo/lock_img4.png') no-repeat;
                background-size: 100% 100%;
            }
        }
    }
</style>