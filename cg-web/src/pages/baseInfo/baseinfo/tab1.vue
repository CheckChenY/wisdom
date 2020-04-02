<template>
    <a-form :form="form1" @submit="handleSubmit" class="register_index">
        <div style="height:40px;line-height:40px;font-size:20px;color:#000;font-weight:900;display:flex;margin-top:20px;padding-left:50px;">单位信息</div>
        <div style="width:1200px;margin:0 auto;">
            <div style="display: flex;justify-content: space-between;padding-right:150px;">
                <a-form-item
                    style="display:flex;"
                    label="单位名称"
                >
                    <a-input
                        v-model="data.orgName"
                        maxLength="50"
                    />
                </a-form-item>
                <a-form-item
                    style="display:flex;"
                    label="统一社会信用代码/组织机构代码"
                >
                    <a-input
                        v-model="data.orgCode"
                        maxLength="50"
                    placeholder="统一社会信用代码/组织机构代码"
                    />
                </a-form-item>
            </div>
            <div style="display: flex;justify-content: space-between;padding-right:150px;">
                    <a-form-item
                    style="display:flex;"
                    label="单位类型"
                >
                    <a-select
                    v-model="data.orgType"
                    @select="orgTypeSelectChange"
                    showSearch
                    optionFilterProp="children"
                    placeholder="单位类型"
                    >
                        <a-select-option value="1">
                            社会单位
                        </a-select-option>
                        <a-select-option value="2">
                            监管单位
                        </a-select-option>
                        <a-select-option value="3">
                            总公司
                        </a-select-option>
                        <a-select-option value="4">
                            代理商
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item
                    style="display:flex;"
                    label="所在地区"
                >
                    <a-cascader 
                        v-model="regionIdValue"
                        :options="options" 
                        @change="onChange" 
                        :placeholder="province" />
                </a-form-item>
            </div>
            <div style="display: flex;justify-content: space-between;padding-right:150px;">
                    <a-form-item
                    style="display:flex;"
                    label="单位地址"
                >
                    <a-input
                    v-model="data.address"
                    placeholder="单位地址"
                    maxLength="100"
                    />
                </a-form-item>
                <a-form-item
                    style="display:flex;"
                    label="法定代表人/负责人"
                >
                    <a-input
                    v-model="data.legalPerson"
                    placeholder="法定代表人/负责人"
                    maxLength="45"
                    />
                </a-form-item>
            </div>
            <div style="display: flex;justify-content: space-between;padding-right:150px;">
                <a-form-item
                    style="display:flex;"
                    label="法定代表人/负责人联系电话"
                >
                    <a-input
                    v-model="data.legalPersonPhone"
                    maxLength="11"
                    placeholder="法定代表人/负责人联系电话"
                    />
                </a-form-item>
                <a-form-item
                    style="display:flex;"
                    label="地理位置"
                >
                    <div @click="getPoint" style="padding-left:11px;text-align: left;line-height:32px;width:250px;height:32px;background:#f5f5f5;border:1px solid #d9d9d9;border-radius: 4px;cursor: pointer;">
                        {{ position ? position:'点击选取地理位置'}}
                    </div>
                </a-form-item>
            </div>
            <div style="display: flex;justify-content: space-between;padding-right:150px;">
                <a-form-item
                    style="display:flex;"
                    label="经营范围（选填）"
                >
                    <a-textarea
                    v-model="data.businessScope"
                    style="width: 830px;"
                    placeholder="经营范围"
                    maxLength="500"
                    />
                </a-form-item>
            </div>
        </div>
        <a-divider />
        <div style="height:40px;line-height:40px;font-size:20px;color:#000;font-weight:900;display:flex;margin-top:20px;padding-left:50px;">联系人信息</div>
        <div style="width:1200px;margin:0 auto;">
            <div style="display: flex;justify-content: space-between;padding-right:150px;">
                    <a-form-item
                    style="display:flex;"
                    label="联系人姓名"
                >
                    <a-input
                        v-model="data.userName"
                        placeholder="联系人姓名"
                        maxLength="50"
                    />
                </a-form-item>
                <a-form-item
                    style="display:flex;"
                    label="联系手机号（登录名）"
                >
                    <a-input
                        :disabled="true"
                        v-model="data.phone"
                        placeholder="联系手机号（登录名）"
                        type="number"
                        maxLength="11"
                    />
                </a-form-item>
            </div>
        </div>
        <a-divider />
        <div style="height:40px;line-height:40px;font-size:20px;color:#000;font-weight:900;display:flex;margin-top:20px;padding-left:50px;">证件上传</div>
        <div style="width:1200px;margin:0 auto;">
            <div style="padding-left:150px;">
                <a-upload
                    accept=".jpg,.png,.jpeg"
                    name="avatar"
                    ref="upload"
                    listType="picture-card"
                    class="avatar-uploader"
                    :showUploadList="false"
                    action
                    :beforeUpload="beforeUpload"
                    :disabled="data.checkState != 2"
                    >
                    <img v-if="fileName" :src="fileName" alt="avatar" style="width:200px;height:200px;"/>
                    <div v-else style="padding-top:25px;">
                        <a-icon :type="loading ? 'loading' : 'plus'" />
                        <div class="ant-upload-text">Upload</div>
                    </div>
                </a-upload>
                <div style="margin-top:20px;">
                    <p style="color:#ccc;font-size:14px;text-align:left;">格式要求：</p>
                    <p style="color:#ccc;font-size:14px;text-align:left;">1.企业用户上传营业执照；非企业用户上传组织机构代码证。</p>
                    <p style="color:#ccc;font-size:14px;text-align:left;">2.证书原件，复印件不可用，证书文字、印章清晰可见。</p>
                    <p style="color:#ccc;font-size:14px;text-align:left;">3.要求JPG、JPEG或PNG格式。大小小于2M</p>
                    <p style="color:#ccc;font-size:14px;text-align:left;">4.上传电子扫描件</p>
                </div>
            </div>
            <div style="width:400px;margin:0 auto;margin-top:40px;display: flex;justify-content: space-between;">
                <a-form-item>
                    <a-button type="primary" :disabled="data.checkState != 2" html-type="submit">修 改</a-button>
                </a-form-item>
            </div>
        </div>
        <!-- <div style="color:#ccc;font-size:14px;margin-top:50px;">
            copyright 2018 金特莱研发部出品
        </div> -->
        <MapGetPoint :visible="mapvisible" @dialogcancel="cancel" @getPosition="getPosition" :position="position"/>
    </a-form>
</template>
<script src="./index.js"></script>
<style lang="scss">
.register_index{
    .ant-steps-item{
        width:400px;
        flex: none;
    }
    .ant-form-item-label{
        width:220px;
    }
    .ant-input,
    .ant-select-selection{
        width:250px;
    }
    .code_input{
        width:250px;
        input{
            width: inherit;
        }
    }
}
</style>
