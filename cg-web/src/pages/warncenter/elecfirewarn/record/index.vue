<template>
    <div class="menu_manage" style="display: flex;">
        <div style="width:100%;">
            <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
                <a-row :gutter="24">
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
                                    <a-select-option v-for="(item,index) in deviceTypeList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                                </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-item label="设备状态">
                                <a-select 
                                    placeholder="请选择"
                                    showSearch
                                    optionFilterProp="children"
                                    v-decorator="[
                                        'alarmType',
                                        {
                                            rules: [
                                                {
                                                required: false,
                                                },
                                            ],
                                        },
                                    ]">
                                    <a-select-option v-for="(item,index) in warnTypeList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                                </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-item label="警情程度">
                                <a-select 
                                    placeholder="请选择"
                                    showSearch
                                    optionFilterProp="children"
                                    v-decorator="[
                                        'alarmLevel',
                                        {
                                            rules: [
                                                {
                                                required: false,
                                                },
                                            ],
                                        },
                                    ]">
                                    <a-select-option v-for="(item,index) in warnLevelList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                                </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-item label="报警时间">
                            <a-range-picker @change="onRangeDateChange" v-model="warnDate"/>
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
                <a-table :loading="tableLoading" :pagination="pagination" 
                :scroll="{x:1500,y:0}" bordered :dataSource="dataSource" 
                :rowClassName="rowClassName" 
                :columns="columns">
                    <template slot="status" slot-scope="text, record" style="display: flex;">
                        <a-switch defaultChecked @change="onChange" v-model="record.commStatus"/>
                    </template>
                    <template slot="operation" slot-scope="text, record" style="display: flex;">
                        <div class="editable-row-operations">
                            <a-button @click="() => onView(record)" type="primary" style="margin-right: 10px;">查看</a-button>
                        </div>
                    </template>
                </a-table>
            </div>
        </div>
        <formDialog @cancel="cancel" :dialogShow="dialogShow" :record="record"></formDialog>
    </div>
</template>
<script src="./indextab1.js"></script>