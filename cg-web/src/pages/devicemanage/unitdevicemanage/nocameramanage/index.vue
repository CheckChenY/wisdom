<template>
    <div class="menu_manage" style="display: flex;">
        <div style="min-width:200px;">
            <UnitSelect @getOrgId="getOrgId"/>
        </div>
        <div style="width:85%;padding-left:20px;">
            <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
                <a-row :gutter="24">
                    <a-col :span="6">
                        <a-form-item label="关键字">
                            <a-input
                            v-decorator="['deviceName']"
                            maxLength="255"
                            placeholder="设备名称"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="所属系统">
                            <a-select 
                                @select="systemChange"
                                placeholder="请选择"
                                showSearch
                                optionFilterProp="children"
                                v-decorator="['systemCode']">
                                <a-select-option v-for="(item,index) in systemList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="设备类型">
                                <a-select 
                                    @select="typeChange"
                                    placeholder="请选择"
                                    showSearch
                                    optionFilterProp="children"
                                    v-decorator="['deviceType']">
                                    <a-select-option v-for="(item,index) in deviceTypeList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                                </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="设备型号">
                                <a-select 
                                    placeholder="请选择"
                                    showSearch
                                    optionFilterProp="children"
                                    v-decorator="['deviceModel']">
                                    <a-select-option v-for="(item,index) in deviceModelList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                                </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6" style="margin-top:-15px;">
                        <a-form-item label="到期时间">
                            <a-range-picker @change="onRangeDateChange" :disabledDate="disabledDate" v-model="expireDate"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6" style="margin-top:-12px;">
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
                <a-button @click="batchUnBand" type="danger">批量解绑</a-button>
            </div>
            <div style="width:100%;">
                <a-table :loading="tableLoading" :scroll="{x:1500,y:0}" 
                    :rowSelection="rowSelection" 
                    :pagination="pagination"
                    bordered :dataSource="dataSource" 
                    :rowClassName="rowClassName"
                    :columns="columns">
                    <template slot="status" slot-scope="text, record" style="display: flex;">
                        <a-switch defaultChecked @change="onStatusChange" v-model="record.commStatus"/>
                    </template>
                    <template slot="operation" slot-scope="text, record" style="display: flex;">
                        <div class="editable-row-operations">
                            <a-button @click="() => onView(record)" type="text" style="margin-right: 10px;">查看</a-button>
                            <!-- <a-button @click="() => onRenew(record)" type="primary" style="margin-right: 10px;">续费</a-button> -->
                            <a-button @click="() => onUnband(record)" type="danger">解绑</a-button>
                        </div>
                    </template>
                </a-table>
            </div>
        </div>
        <a-modal
            title="续费设置"
            :visible="visible"
            @ok="handleOk"
            :confirmLoading="confirmLoading"
            @cancel="handleCancel"
        >
            <div style="margin:20px 0;display: flex;justify-content: center;align-items: center;">
                到期时间：<a-date-picker placeholder="请选择到期时间" :disabledDate="disabledDate" v-model="dateValue" @change="onDateChange" />
            </div>
        </a-modal>
        <formDialog ref="formDialog"></formDialog>
    </div>
</template>
<script src="./indextab1.js"></script>