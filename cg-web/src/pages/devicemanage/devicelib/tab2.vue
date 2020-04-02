<template>
        <div class="menu_manage">
            <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
                <a-row :gutter="24">
                    <a-col :span="5">
                        <a-form-item label="设备名称">
                            <a-input
                            v-decorator="[
                                'deviceName',
                                {
                                    rules: [
                                        {
                                        required: false,
                                        },
                                    ],
                                },
                            ]"
                            maxLength="255"
                            placeholder="设备名称"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-item label="设备类型">
                            <a-select 
                                placeholder="请选择"
                                showSearch
                                optionFilterProp="children"
                                v-decorator="[
                                    'deviceType',
                                    {
                                        rules: [
                                            {
                                            required: false,
                                            },
                                        ],
                                    },
                                ]">
                                <a-select-option v-for="item in deviceTypeList" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
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
                    size="middle"
                    :rowClassName="rowClassName"
                    :loading="tableLoading"
                    :columns="columns">
                    <template slot="status" slot-scope="text, record" style="display: flex;">
                        <a-switch defaultChecked @change="onChange" v-model="record.commStatus"/>
                    </template>
                    <template slot="operation" slot-scope="text, record" style="display: flex;">
                        <div class="editable-row-operations">
                            <a-button @click="() => onEdit(record)" type="primary" style="margin-right: 10px;">编辑</a-button>
                            <a-button @click="() => onDelete(record)" type="danger">删除</a-button>
                        </div>
                    </template>
                </a-table>
            </div>
            <formDialog ref="formDialog" @refresh="refresh"></formDialog>
        </div>
    </template>
    <script src="./tab2index.js"></script>