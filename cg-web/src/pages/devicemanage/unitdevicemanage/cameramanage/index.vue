<template>
    <div class="menu_manage" style="display: flex;">
        <div style="min-width:200px;">
            <UnitSelect @getOrgId="getOrgId"/>
        </div>
        <div style="width:85%;padding-left:20px;">
            <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
                <a-row :gutter="24">
                    <a-col :span="6">
                        <a-form-item label="设备名称">
                            <a-input
                            v-decorator="[
                                'deviceName',
                            ]"
                            maxLength="255"
                            placeholder="设备名称"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="设备类型">
                                <a-select 
                                    placeholder="请选择"
                                    showSearch
                                    optionFilterProp="children"
                                    v-decorator="[
                                        'deviceType',
                                    ]">
                                    <a-select-option v-for="(item,index) in deviceTypeList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                                </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6" style="margin-top: 3px;">
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
                <a-table bordered :dataSource="dataSource" 
                    :columns="columns"
                    :rowClassName="rowClassName">
                    <template slot="operation" slot-scope="text, record">
                        <div class="editable-row-operations" style="display: flex;">
                            <a-button @click="() => onView(record)" type="text" style="margin-right: 10px;">查看</a-button>
                            <a-button @click="() => onEdit(record)" type="primary" style="margin-right: 10px;">编辑</a-button>
                        </div>
                    </template>
                </a-table>
            </div>
        </div>
        <formDialogUnitCamera ref="formDialog" @submit="submit"></formDialogUnitCamera>
    </div>
</template>
<script src="./indextab2.js"></script>