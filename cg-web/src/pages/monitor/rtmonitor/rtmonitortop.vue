<template>
    <div class="form_dialog">
        <a-form layout="inline">
            <a-row :gutter="24">
                <a-col :span="5">
                    <img
                        style="width:240px;height:240px;"
                        alt="example"
                        :src="form.company.orgImg"
                        />
                </a-col>
                <a-col :span="16">
                    <a-row :gutter="24">
                        <a-col :span="24">
                            <a-form-item label="单位名称：" >
                                <span style="font-size:18px;font-weight: 700;">{{form.company.orgName}}</span>
                            </a-form-item>
                        </a-col>
                        <a-col :span="10">
                            <a-form-item label="统一社会信用代码：">
                                {{form.company.orgCode}}
                            </a-form-item>
                        </a-col>
                        <a-col :span="8">
                            <a-form-item label="法人/负责人：">
                                {{form.company.legalPerson}}
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="设备总数量：">
                                {{form.allDeviceSize}}
                            </a-form-item>
                        </a-col>
                        <a-col :span="10">
                            <a-form-item label="所在地区：">
                                {{region}}
                            </a-form-item>
                        </a-col>
                        <a-col :span="8">
                            <a-form-item label="法人电话：">
                                {{form.company.legalPersonPhone}}
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="消防设备数量：">
                                {{form.fireDevice}}
                            </a-form-item>
                        </a-col>
                        <a-col :span="10">
                            <a-form-item label="单位地址：">
                                {{form.company.address}}
                            </a-form-item>
                        </a-col>
                        <a-col :span="8">
                            <a-form-item label="联系人：">
                                {{form.company.userName}}
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="视频设备数量：">
                                {{form.cameraSize}}
                            </a-form-item>
                        </a-col>
                        <a-col :span="18">
                            <a-form-item label="联系人电话：">
                                {{form.company.phone}}
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="离线设备数量：">
                                {{form.offLine}}
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-col>
                <a-col :span="3">
                    <div class="icon_data">
                        <div class="icon_data_icon" style="background: #5cdd00;">
                            <a-icon type="check" style="color: #fff;font-size:18px;" />
                        </div>
                        
                        <div class="icon_data_text">
                            <span>正常设备</span>
                            <span>{{form.nomalDevice}}</span>
                        </div>
                    </div>
                    <div class="icon_data">
                        <div class="icon_data_icon" style="background: #ffbb2a;">
                            <i class="icon-faults-statistics" style="color: #fff;margin-right:0px"></i>
                        </div>
                        <div class="icon_data_text">
                            <span>异常设备</span>
                            <span>{{form.notNomalDevice}}</span>
                        </div>
                    </div>
                </a-col>
            </a-row>
        </a-form>
    </div>
</template>
<script>
import { getOrgDetail, findProvince } from '@/api/public'
export default {
    props: ['orgId'],
    data() {
        return {
            form: {
                company:{}
            },
            region: ''
        };
    },
    created(){
        this.getOrgDetail(this.orgId)
    },
    watch: {
        'orgId':function(val, oval){
            this.getOrgDetail(this.orgId)
        },
    },
    methods: {
        getOrgDetail (id) {
            getOrgDetail({type:1,orgId:id}).then(res => {
                if (res && res.data && res.data.success) {
                    res.data.value.company.orgImg = this.$imgUrl + res.data.value.company.orgImg
                    Object.assign(this.form, res.data.value)
                    this.findProvince(res.data.value.company.regionId)
                }
            })
        },
        findProvince (id) {
            findProvince({regionId:id}).then(res => {
                if (res && res.data && res.data.success) {
                    let place = res.data.value[0]
                    this.region = place.province + ',' + place.city + ',' + place.county
                }
            })
        }
    },
};
</script>
<style lang='scss'>
.form_dialog{
    .icon_data{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;
        text-align: center;
        .icon_data_icon{
            width: 50px;
            height: 50px;
            line-height: 50px;
            border-radius: 50%;
            margin-bottom: 10px;
        }
        .icon_data_text{
            span {
                font-size: 14px !important;
                margin-right: 5px;
            }
        }
    }
}
</style>