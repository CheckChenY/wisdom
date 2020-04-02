<template>
    <div class="monitor_body">
        <a-row :gutter="24">
            <a-col :span="4">
                <buildingtree @selectedKeys="select"></buildingtree>
            </a-col>
            <a-col :span="20">
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
                        <template slot="operation" slot-scope="text, record" style="display: flex;">
                            <div class="editable-row-operations">
                                <a-button @click="() => onView(record)" type="text" style="margin-right: 10px;">查看</a-button>
                            </div>
                        </template>
                    </a-table>
                </div>
            </a-col>
        </a-row>
        <firealarmDialog ref="firealarmDialog"></firealarmDialog>
    </div>
</template>
<script src="./firealarm.js"></script>
<style lang="scss">
</style>

    