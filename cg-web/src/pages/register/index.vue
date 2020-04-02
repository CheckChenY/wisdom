<template>
    <a-form :form="form1" @submit="handleSubmit" class="register_index">
        <div style="padding-top:20px;display: flex;align-items: center;justify-content: center;">
            <img style="width:80px;" src="../../assets/logo.png"/>
            <span style="padding-left:10px;font-size:24px;font-weight:900;">金特莱智慧消防云平台</span>
        </div>
        <div style="display:flex;justify-content:center;align-items:center;font-size:14px;color:#ccc;height:28px;">守护您的消防安全</div>
        <a-steps :current="0" size="small" style="display: flex;justify-content: center;margin-top:20px;">
            <a-step title="注册信息"  description="填写单位注册信息。"/>
            <a-step title="审核校验"  description="监管部门审核校验。"/>
            <a-step title="审核通过" description="账号即可成功登录。" />
        </a-steps>
        <div style="width:1200px;margin:0 auto;position: relative;">
            <span style="color: red;position: absolute;top:115px;right:475px;">*</span>
            <span style="color: red;position: absolute;top:243px;right:475px;">*</span>
            <div style="height:40px;line-height:40px;font-size:20px;color:#000;font-weight:900;display:flex;margin-top:20px;">单位信息</div>
                <div style="display: flex;justify-content: space-between;padding-right:150px;">
                    <a-form-item
                        style="display:flex;"
                        label="单位名称"
                    >
                        <a-input
                        v-decorator="[
                            'orgName',
                            {
                                rules: [{ required: true, message: '请输入单位名称!', whitespace: true }],
                            },
                        ]"
                        maxLength="50"
                        placeholder="单位名称"
                        />
                    </a-form-item>
                    <a-form-item
                        style="display:flex;"
                        label="统一社会信用代码/组织机构代码"
                    >
                        <a-input
                        v-decorator="[
                            'orgCode',
                            {
                                rules: [{ required: true, message: '请输入组织机构代码!', whitespace: true }],
                            },
                        ]"
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
                        v-decorator="[
                            'orgType',
                            {
                                rules: [{ required: true, message: '请输入单位类型!', whitespace: true }],
                            },
                        ]"
                        @select="orgTypeSelectChange"
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
                            placeholder="请选择所在地区" />
                    </a-form-item>
                </div>
                <div style="display: flex;justify-content: space-between;padding-right:150px;">
                        <a-form-item
                        style="display:flex;"
                        label="单位地址"
                    >
                        <a-input
                        v-decorator="[
                            'address',
                            {
                                rules: [{ required: true, message: '请输入单位地址!', whitespace: true }],
                            },
                        ]"
                        maxLength="100"
                        placeholder="单位地址"
                        />
                    </a-form-item>
                    <a-form-item
                        style="display:flex;"
                        label="法定代表人/负责人"
                    >
                        <a-input
                        v-decorator="[
                            'legalPerson',
                            {
                                rules: [{ required: false, message: '请输入法定代表人/负责人!', whitespace: true }],
                            },
                        ]"
                        maxLength="45"
                        placeholder="法定代表人/负责人"
                        />
                    </a-form-item>
                </div>
                <div style="display: flex;justify-content: space-between;padding-right:150px;">
                    <a-form-item
                        style="display:flex;"
                        label="法定代表人/负责人联系电话"
                    >
                        <a-input
                        v-decorator="[
                            'legalPersonPhone',
                            {
                                rules: [{ required: false, message: '请输入法定代表人电话!', whitespace: true }],
                            },
                        ]"
                        maxLength="11"
                        type="number"
                        placeholder="法定代表人/负责人联系电话"
                        />
                    </a-form-item>
                    <a-form-item
                        style="display:flex;"
                        label="地理位置"
                    >
                        <div @click="getPoint" style="padding-left:11px;text-align: left;line-height:32px;width:250px;height:32px;background:#f5f5f5;border:1px solid #d9d9d9;border-radius: 4px;cursor: pointer;">
                            {{position?position:'点击选取地理位置'}}
                        </div>
                        <!-- <a-input
                        
                        disabled
                        v-decorator="[
                            'position',
                            {
                                rules: [{ required: false, message: '请点击选取地理位置!', whitespace: true }],
                            },
                        ]"
                        placeholder="点击选取地理位置"
                        /> -->
                    </a-form-item>
                </div>
                <div style="display: flex;justify-content: space-between;padding-right:150px;">
                    <a-form-item
                        style="display:flex;"
                        label="经营范围（选填）"
                    >
                        <a-textarea
                        v-decorator="[
                            'businessScope',
                            {
                                rules: [{ required: false, message: '请输入经营范围!', whitespace: true }],
                            },
                        ]"
                        maxLength="500"
                        placeholder="经营范围"
                        />
                    </a-form-item>
                </div>
            <a-divider />
            <div style="height:40px;line-height:40px;font-size:20px;color:#000;font-weight:900;display:flex;margin-top:20px;">联系人信息</div>
                <div style="display: flex;justify-content: space-between;padding-right:150px;">
                    <a-form-item
                        style="display:flex;"
                        label="联系人姓名"
                    >
                        <a-input
                        v-decorator="[
                            'userName',
                            {
                                rules: [{ required: true, message: '请输入联系人姓名!', whitespace: true }],
                            },
                        ]"
                        maxLength="50"
                        placeholder="联系人姓名"
                        />
                    </a-form-item>
                    <a-form-item
                        style="display:flex;"
                        label="联系手机号（登录名）"
                    >
                        <a-input
                        v-decorator="[
                            'phone',
                            {
                                rules: [{ required: true, message: '请输入联系手机号!', whitespace: true }],
                            },
                        ]"
                        maxLength="11"
                        type="number"
                        placeholder="联系手机号（登录名）"
                        />
                    </a-form-item>
                </div>
                <div style="display: flex;justify-content: space-between;padding-right:150px;">
                    <a-form-item
                        style="display:flex;"
                        label="短信验证码"
                    >
                        <a-input
                        v-decorator="[
                            'code',
                            {
                                rules: [{ required: true, message: '请输入短信验证码!', whitespace: true }],
                            },
                        ]"
                        maxLength="6"
                        class="code_input"
                        placeholder="短信验证码"
                        >
                            <span slot="addonAfter" style="cursor: pointer;" @click="getCode">{{tipText}}</span>
                        </a-input>
                    </a-form-item>
                    <a-form-item
                        style="display:flex;"
                        label="密码"
                    >
                        <a-input
                        v-decorator="[
                            'password',
                            {
                                rules: [{ required: true, message: '请输入密码!', whitespace: true }],
                            },
                        ]"
                        maxLength="255"
                        type="password"
                        placeholder="密码"
                        />
                    </a-form-item>
                </div>
                <div style="display: flex;justify-content: space-between;padding-right:150px;">
                        <a-form-item
                        style="display:flex;"
                        label="确认密码"
                    >
                        <a-input
                        v-decorator="[
                            'passwordAgain',
                            {
                                rules: [{ required: true, message: '请确认密码!', whitespace: true }],
                            },
                        ]"
                        maxLength="255"
                        type="password"
                        placeholder="确认密码"
                        />
                    </a-form-item>
                </div>
                <a-divider />
                <div style="height:40px;line-height:40px;font-size:20px;color:#000;font-weight:900;display:flex;margin-top:20px;">证件上传</div>
                <div style="padding-left:150px;position: relative;">
                    <span style="color: red;position: absolute;top:48px;left:135px;">*</span>
                    <a-upload
                        accept=".jpg,.png,.jpeg"
                        name="avatar"
                        ref="upload"
                        listType="picture-card"
                        class="avatar-uploader"
                        :showUploadList="false"
                        action
                        :beforeUpload="beforeUpload"
                        >
                        <img v-if="fileName" :src="orgImg" alt="avatar" style="width:200px;height:200px;"/>
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
                        <a-button type="primary" html-type="submit" :disabled="disabled">注册</a-button>
                    </a-form-item>
                    <span style="color:#409EFF;cursor: pointer;margin-left:100px;" @click="login">使用已有账号登录</span>
                </div>
            </div>
        <div style="color:#ccc;font-size:14px;margin-top:50px;">
            copyright 2018 金特莱研发部出品
        </div>
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
        width:220px!important;
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
