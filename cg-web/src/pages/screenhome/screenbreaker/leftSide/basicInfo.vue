<template>
    <div class="basic_info">
        <div class="basic_title">
            <span class="title_text">基本概况</span>
            <div class="basic_body">
                <div>已安全用电护航：{{form.escortTime}}</div>
                <div class="basic_content">
                    <div class="content_unit basic_img1">
                        <i class="y-icon-riyongdianliangchaxun"></i>
                        <span>
                            <span class="content_unit1">今日用电总量</span>
                            <span class="content_unit2">{{form.todayTotalElec}}kw·h</span>
                        </span>
                    </div>
                    <div class="content_unit basic_img2">
                        <i class="y-icon-yueyongdianliangchaxun"></i>
                        <span>
                            <span class="content_unit1">当月用电总量</span>
                            <span class="content_unit2">{{form.weekTotalElec}}kw·h</span>
                        </span>
                    </div>
                </div>
                <div class="basic_content">
                    <div class="content_unit basic_img3">
                        <i class="y-icon-p"></i>
                        <span>
                            <span class="content_unit1">当前总功率</span>
                            <span class="content_unit2">{{form.totalPower}}W</span>
                        </span>
                    </div>
                    <div class="content_unit basic_img4">
                        <i class="y-icon-paihang"></i>
                        <span>
                            <span class="content_unit1">总功率峰值</span>
                            <span class="content_unit2">{{form.maxPower?form.maxPower:0}}W</span>
                        </span>
                    </div>
                </div>
                <div class="top_time">峰值时间：{{form.maxPowerDate=="null"?'--:--:--':form.maxPowerDate}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import { getBasicInfo } from "@/api/screen/screen";
export default {
    name: 'basicInfo',
    data(){
        return{
            form: {}
        }
    },
    created(){
        this.getBasicInfo()
    },
    mounted(){
    },
    methods:{
        getBasicInfo () {
            getBasicInfo().then(res => {
                if (res && res.data && res.data.status === 0) {
                    this.form = res.data.data
                }
            })
        }
    }
}
</script>

<style lang="scss">
.basic_info{
    border: #2d7cfb 1px solid;
    background-color: rgba(16,29,78,0.5);
    .basic_title{
        text-align: center;
        .title_text{
            color: #00fcfe;
            font-size: 15px;
            background: url('/img/screen/titlemini.png') no-repeat;
            background-size:100% 55px;
            display: inline-block;
            width: 255px;
            text-align: center;
        }
    }
    .basic_body{
        text-align: left;
        color: #00fafd;
        font-size: 17px;
        margin: 0 25px;
        .basic_content{
            display: flex;
            justify-content: space-between;
            margin: 10px 0px;
            .content_unit{
                height: 75px;
                width: 260px;
                background-size:260px 75px;
                opacity: 0.8;
                display: flex;
                justify-content: space-around;
                align-items: center;
                i{
                    font-size: 30px !important;
                }
                span{
                    display: block;
                }
                .content_unit1{
                    font-size: 15px;
                    height: 15px;
                    width: 145px;
                }
                .content_unit2{
                    font-size: 25px;
                    height: 35px;
                    width: 145px;
                }
            }
            .basic_img1{
                background: url('/img/screen/basic1.png') no-repeat;
            }
            .basic_img2{
                background: url('/img/screen/basic2.png') no-repeat;
            }
            .basic_img3{
                background: url('/img/screen/basic3.png') no-repeat;
            }
            .basic_img4{
                background: url('/img/screen/basic4.png') no-repeat;
            }
        }
        .top_time{
            text-align: right;
        }
    }
}
</style>
        