<template>
    <div class="menu_manage" style="display: flex;">
        <div style="min-width:200px;">
            <UnitSelect @getOrgId="getOrgId"/>
        </div>
        <div style="width:85%;padding-left:20px;">
            <div style="display: flex;">
                <div style="width:25%;min-width:200px;">
                    <img style="width:80%;margin-left:10%;height:240px;" :src="form.company.orgImg"/>
                </div>
                <div style="width:75%;">
                    <p style="font-weight: 900;font-size:20px;margin-bottom:20px;">{{form.company.orgName}}</p>
                    <div style="display: flex;height:35px;">
                        <p style="width:33%;min-width:200px;">统一社会信用码：{{form.company.orgCode}}</p>
                        <p style="width:33%;min-width:200px;">法人/负责人：{{form.company.legalPerson}}</p>
                        <p style="width:33%;min-width:200px;">设备总数量：{{form.allDeviceSize}}</p>
                    </div>
                    <div style="display: flex;height:35px;">
                        <p style="width:33%;min-width:200px;">法人电话：{{form.company.legalPersonPhone}}</p>
                        <p style="width:33%;min-width:200px;">消防设备数量：{{form.fireDevice}}</p>
                    </div>
                    <div style="display: flex;height:35px;">
                        <p style="width:33%;min-width:200px;">所在地区：{{region}}</p>
                        <p style="width:33%;min-width:200px;">联系人：{{form.company.userName}}</p>
                        <p style="width:33%;min-width:200px;position: relative;">
                            <span style="width:60px;height:60px;border-radius:30px;background:orange;position: absolute;top:10px;left:5px;text-align: center;line-height: 60px;">
                                <i class="icon-baojing" style="font-size: 25px!important;color:#fff;margin-left:8px;"></i>
                            </span>
                            <span style="position: absolute;top:70px;left:0px;color:orange;">未处理警情 {{form.untreated}}</span>
                        </p>
                    </div>
                    <div style="display: flex;height:35px;">
                        <p style="width:33%;min-width:200px;">单位地址：{{form.company.address}}</p>
                        <p style="width:33%;min-width:200px;">联系人电话：{{form.company.phone}}</p>
                    </div>
                    <div style="display: flex;height:35px;">
                        <p style="width:33%;min-width:200px;">视频设备数量：{{form.cameraSize}}</p>
                        <p style="width:33%;min-width:200px;">异常设备数量：{{form.notNomalDevice}}</p>
                    </div>
                </div>
            </div>
            <a-tabs defaultActiveKey="1" @change="onTabChange" style="margin-top:30px;">
                <a-tab-pane tab="警情查看" key="1">
                    <tab1 :tabnum="tabnum" :orgId="orgId" v-if="orgId"></tab1>
                </a-tab-pane>
                <a-tab-pane tab="处理记录" key="2">
                    <tab2 :tabnum="tabnum" :orgId="orgId" v-if="orgId"></tab2>
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>
<script src="./indextab1.js"></script>