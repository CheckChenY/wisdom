<template>
        <div class="menu_manage">
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
                                v-decorator="['systemCode']">
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
                                <a-select-option v-for="(item,index) in deviceTypeList" :value="item.value" :key="index">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-item label="设备型号">
                            <a-select 
                                placeholder="请选择"
                                @select="typeChange"
                                showSearch
                                optionFilterProp="children"
                                v-decorator="['deviceModel']">
                                <a-select-option v-for="(item,index) in deviceModelList" :value="item.value" :key="index">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="5" style="margin-top: -15px;">
                        <a-form-item label="启用状态">
                                <a-select 
                                    placeholder="请选择"
                                    showSearch
                                    optionFilterProp="children"
                                    v-decorator="['useState']">
                                    <a-select-option v-for="(item,index) in useStateList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                                </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="5" style="margin-top: -12px;">
                        <a-button type="primary" html-type="submit">
                            查询
                        </a-button>
                        <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                            清空
                        </a-button>
                    </a-col>
                </a-row>
            </a-form>
            <div class="table-operations" style="margin-bottom:20px;">
                <a-button @click="add" type="primary" icon="plus">添加</a-button>
                <a-button type="text" style="margin-left:10px;">
                    <a
                        download="批量导入设备入库模板.xlsx"
                        href="./static/设备入库模板.xlsx"
                        style="text-decoration:none;">
                        模板下载
                    </a>
                </a-button>
                <a-upload
                    style="display:inline-block"
                    class="upload-demo"
                    :before-upload="beforeExcelUpload"
                    :show-file-list="false"
                    accept="xls"
                    :showUploadList="false"
                    @on-success="uploadSuccess"
                    @on-error="uploadError"
                    action=""
                    :limit="1">
                    <a-button type="text" style="margin-left:10px;margin-right:10px;">批量导入</a-button>
                </a-upload>   
                <span style="font-size:12px;color:#666">提示：请按照模板格式进行填写，并上传文件，仅支持Excel文件</span>
            </div>
            <div style="width:100%;">
                <a-table :scroll="{x:1800,y:0}" bordered 
                    :dataSource="dataSource" 
                    :pagination="pagination"
                    size="middle"
                    :rowClassName="rowClassName"
                    :loading="tableLoading"
                    :columns="columns">
                    <template slot="useState" slot-scope="text, record" style="display: flex;">
                        {{useStateObj[record.useState]}}
                    </template>
                    <template slot="status" slot-scope="text, record" style="display: flex;">
                        <a-switch defaultChecked @change="stateChange(record)" v-model="record.commStatus"/>
                    </template>
                    <template slot="operation" slot-scope="text, record" style="display: flex;">
                        <div class="editable-row-operations">
                            <a-button @click="() => onView(record)" type="text" style="margin-right: 10px;">查看注册</a-button>
                            <a-button @click="() => onRegister(record)" type="primary" style="margin-right: 10px;">注册</a-button>
                            <a-button @click="() => onEdit(record)" type="primary" style="margin-right: 10px;">编辑</a-button>
                            <a-button @click="() => onReset(record)" type="primary" style="margin-right: 10px;">恢复默认阈值</a-button>
                            <a-button @click="() => onDelete(record)" type="danger">删除</a-button>
                        </div>
                    </template>
                </a-table>
            </div>
            <formDialog ref="formDialog" @refresh="refresh"></formDialog>
            <loadPop ref="loadPop"></loadPop>
        </div>
    </template>
    <script src="./tab1index.js"></script>