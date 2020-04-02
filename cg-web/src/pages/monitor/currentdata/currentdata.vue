<template>
        <div class="menu_manage">
            <a-row>
                <a-col :span="16">
                    <p class="statetitle_box">
                        各系统设备总览
                    </p>
                    <div class="echarts_class" id="allchannl"></div>
                </a-col>
                <a-col :span="8">
                    <p class="statetitle_box">
                        设备状态饼状图
                    </p>
                   <div class="alert_body" id="pieAlert"></div>
                </a-col>
            </a-row>
            <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
                <a-row :gutter="24">
                    <a-col :span="5">
                        <a-form-item label="设备名称">
                            <a-input
                            v-decorator="['deviceName']"
                            maxLength="255"
                            placeholder="设备名称"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-item label="所属系统">
                            <a-select 
                                placeholder="请选择"
                                @select="systemChange"
                                showSearch
                                optionFilterProp="children"
                                v-decorator="['systemCode']"
                                >
                                <a-select-option v-for="(item,index) in systemList" :value="item.value" :key="index">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-item label="设备类型">
                            <a-select 
                                placeholder="请选择"
                                @select="typeChange"
                                showSearch
                                optionFilterProp="children"
                                v-decorator="['deviceType']">
                                <a-select-option v-for="item in deviceTypeList" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-item label="设备型号">
                            <a-select 
                                placeholder="请选择"
                                showSearch
                                optionFilterProp="children"
                                v-decorator="['deviceModel']">
                                <a-select-option v-for="item in deviceModelList" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-item label="设备状态">
                                <a-select 
                                    placeholder="请选择"
                                    showSearch
                                    optionFilterProp="children"
                                    v-decorator="['warnState']">
                                    <a-select-option v-for="(item,index) in warnStateList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                                </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="4" style="margin-top: 3px;">
                        <a-button type="primary" html-type="submit">
                            查询
                        </a-button>
                        <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                            清空
                        </a-button>
                    </a-col>
                </a-row>
            </a-form>
            <div style="width:100%;">
                <a-table bordered 
                    :dataSource="dataSource" 
                    :pagination="pagination"
                    :rowClassName="rowClassName"
                    :columns="columns">
                    <template slot="status" slot-scope="text, record" style="display: flex;">
                        <a-switch defaultChecked @change="onChange" v-model="record.commStatus"/>
                    </template>
                    <template slot="operation" slot-scope="text, record" style="display: flex;">
                        <div class="editable-row-operations">
                            <a-button @click="() => onView(record)" type="text" style="margin-right: 10px;">查看</a-button>
                            <a-button @click="() => onRemote(record)" type="primary" style="margin-right: 10px;">远程操作</a-button>
                            <a-button @click="() => onThresold(record)" type="primary" style="margin-right: 10px;">修改阈值</a-button>
                        </div>
                    </template>
                </a-table>
            </div>
            <currentdataDialog ref="currentdataDialog" @refresh="refresh"></currentdataDialog>
            <currentdataRemote ref="currentdataRemote" @refresh="refresh"></currentdataRemote>
            <currentdataThresold ref="currentdataThresold" @refresh="refresh"></currentdataThresold>
            <checkmodal ref="checkmodal" @closeModal="closeModal"></checkmodal>
        </div>
    </template>
    <script src="./currentdata.js"></script>
    <style lang="scss" scoped>
    .echarts_class {
      height: 300px;
    }
    .alert_body{
        width:100%;
        height:320px
    }
    </style>
    