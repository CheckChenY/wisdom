<template>
    <div class="form_dialog">
        <a-drawer
            :title="title"
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="visible"
            :width="720"
            >
            <a-form :form="form" layout="vertical" @submit="handleSubmit" hideRequiredMark>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="推送方式">
                            <a-select 
                                mode="multiple"
                                placeholder="请选择"
                                showSearch
                                optionFilterProp="children"
                                v-decorator="[
                                    'pushType',
                                    {
                                        rules: [
                                        {
                                            required: true,
                                            message: '推送方式!',
                                            },
                                        ],
                                    },
                                ]">
                                <a-select-option v-for="(item,index) in pushTypeList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" v-if="sendType == 1">
                        <a-form-item label="发送给">
                            <a-select 
                                mode="multiple"
                                placeholder="请选择"
                                showSearch
                                optionFilterProp="children"
                                v-decorator="[
                                    'noticeUser',
                                    {
                                        rules: [
                                            {
                                                required: true,
                                                message: '发送对象!',
                                            },
                                        ],
                                    },
                                ]">
                                <a-select-option v-for="(item,index) in noticeUserList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" v-if="sendType == 2">
                        <a-form-item label="发送给">
                            <a-select 
                                mode="multiple"
                                placeholder="请选择"
                                showSearch
                                optionFilterProp="children"
                                v-decorator="[
                                    'noticeCompany',
                                    {
                                        rules: [
                                        {
                                            required: true,
                                            message: '发送对象!',
                                            },
                                        ],
                                    },
                                ]">
                                <a-select-option v-for="(item,index) in noticeCompanyList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="标题">
                            <a-input 
                                placeholder="标题"
                                v-decorator="[
                                    'noticeTitle',
                                    {
                                        rules: [
                                        {
                                            required: true,
                                            message: '标题!',
                                            },
                                        ],
                                    },
                                ]"
                                maxLength="200">
                            </a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="具体内容">
                            <a-input 
                                placeholder="具体内容"
                                type="textarea"
                                v-decorator="[
                                    'noticeContent',
                                    {
                                        rules: [
                                        {
                                            required: true,
                                            message: '具体内容!',
                                            },
                                        ],
                                    },
                                ]"
                                maxLength="1000">
                            </a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <div
                    :style="{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    borderTop: '1px solid #e9e9e9',
                    padding: '10px 16px',
                    background: '#fff',
                    textAlign: 'right',
                    }"
                >
                    <a-button :style="{marginRight: '8px'}" type="primary" html-type="submit">
                        提 交
                    </a-button>
                </div>
            </a-form>
        </a-drawer>
    </div>
</template>
<script>
import { dict } from '@/const/dict'
import { save, getAllCompanyByOrgId, getAllUserByOrgId } from '@/api/pushcenter/pushcenter'

export default {
    data() {
        return {
            visible: false,
            title: '',
            form: this.$form.createForm(this),
            formEdit: false,
            formData:{},
            pushTypeList: dict.PUSHTYPE,
            noticeUserList: [],
            noticeCompanyList: [],
            sendType:1
        };
    },
    watch: {
    },
    created () {
        this.getDict()
    },
    methods: {
        handleSubmit(e){
            console.log(this.sendType)
            e.preventDefault();
            this.form.validateFields((error, values) => {
                console.log(values)
                if (!error) {
                    values.pushType = values.pushType.join()
                    if (this.title == '编辑') 
                        values.id = this.formData.id
                    if (this.sendType == 1) {
                        values.noticeUserId = values.noticeUser.join()
                        delete values.noticeUser
                        values.noticeType = 31
                    } else if (this.sendType == 2) {
                        values.noticeCompanyId = values.noticeCompany.join()
                        delete values.noticeCompany
                        values.noticeType = 32
                    }
                    save(values).then(res => {
                        console.log(res.data)
                        if (res && res.data && res.data.success) {
                            this.$message.success(this.title + '成功')
                            this.$emit('refrash')
                        } else {
                            this.$message.error(this.title + '失败')
                        }
                    })
                    this.visible = false;
                }
            })
        },
        showDrawer(record, handle) {
            this.visible = true;
            this.$store.dispatch("setRowLight", record.id)
            this.form.resetFields();
            if (handle === 'add') {
                this.formEdit = false
                this.title = '添加'
                if(record=='addcompany'){
                    this.sendType=2
                }else{
                    this.sendType=1
                }
            }else if (handle === 'edit') {
                this.formEdit = false
                this.title = '编辑'
                this.formData=record
                if (record.userType == 0) {
                    this.sendType=1
                } else {
                    this.sendType=2
                }
                this.$nextTick(()=>{
                    this.form.setFieldsValue({
                        'pushType':record.pushType.split(','),
                        'noticeTitle':record.noticeTitle,
                        'noticeContent':record.noticeContent,
                    });
                    if (record.userType == 0) {
                        let noticeUser = []
                        record.noticeUser.forEach(item => {
                            noticeUser.push(item.userId)
                        })
                        this.form.setFieldsValue({
                            'noticeUser':noticeUser,
                        });
                    } else {
                        let noticeCompany = []
                        record.noticeCompany.forEach(item => {
                            noticeCompany.push(item.companyId)
                        })
                        this.form.setFieldsValue({
                            'noticeCompany':noticeCompany,
                        });
                    }
                })
                    
            }
            
        },
        onClose() {
            this.visible = false;
            this.$store.dispatch("setRowLight", '')
        },
        getDict () {
            getAllCompanyByOrgId().then(res => {
                if (res && res.data && res.data.success) {
                    res.data.value.forEach(item => {
                        item.value = item.id
                        item.label = item.orgName
                    })
                    this.noticeCompanyList = res.data.value
                } else {
                    this.noticeCompanyList = []
                }
            })
            getAllUserByOrgId().then(res => {
                if (res && res.data && res.data.success) {
                    res.data.value.forEach(item => {
                        item.value = item.id
                        item.label = item.realName
                    })
                    this.noticeUserList = res.data.value
                } else {
                    this.noticeUserList = []
                }
            })
        }
    },
};
</script>
<style lang='scss'>
.form_dialog{
    .table-operations {
        text-align: left;
        margin-bottom: 16px;
    }

    .table-operations > button {
        margin-right: 8px;
    }
}
</style>