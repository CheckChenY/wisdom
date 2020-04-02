<template>
    <div style="padding: 50px;">
        <p style="font-size: 20px;font-weight: 900;">警情推送设置</p>
        <a-form :form="form" @submit="handleSubmit" style="display:flex;min-height: 650px;margin-top:30px;">
            <div style="width:450px;margin-left:15%;">
                <a-row :gutter="12">
                    <a-col :span="24">
                        <span style="display: inline-block;width:150px;text-align: right;"><i style="color: rgb(245, 34, 45);">*&nbsp;&nbsp;</i>报警等级说明：</span>
                        <span>1.一般警情：预警、故障、离线</span>
                    </a-col>
                    <a-col :span="24">
                        <span style="display: inline-block;width:150px;text-align: right;"></span>
                        <span>2.重要警情：报警。</span>
                    </a-col>
                    <a-col :span="24" style="margin-bottom: 30px;">
                        <span style="display: inline-block;width:150px;text-align: right;"></span>
                        <span>3.严重警情：严重报警。</span>
                    </a-col>
                </a-row>
                <a-row :gutter="12">
                    <a-form-item label="一般警情推送方式：" style="display: flex;">
                        <a-col :span="24">
                            <a-select
                                v-decorator="['generalAlert', { rules: [{ required: true, message: '请选择一般推送方式!' }] }]"
                                mode="multiple"
                                placeholder="web端推送，APP推送（多选）"
                                style="width: 300px"
                            >
                                <a-select-option key="1">web端推送</a-select-option>
                                <a-select-option key="2">APP推送</a-select-option>
                            </a-select>
                        </a-col>
                    </a-form-item>
                </a-row>
                <a-row :gutter="12">
                    <a-form-item label="重要警情推送方式：" style="display: flex;">
                        <a-col :span="24">
                            <a-select
                                v-decorator="['importanceAlert', { rules: [{ required: true, message: '请选择重要推送方式!' }] }]"
                                mode="multiple"
                                placeholder="web端推送，APP推送，短信推送（多选）"
                                style="width: 300px"
                            >
                                <a-select-option key="1">web端推送</a-select-option>
                                <a-select-option key="2">APP推送</a-select-option>
                                <a-select-option key="3">短信推送</a-select-option>
                            </a-select>
                        </a-col>
                    </a-form-item>
                </a-row>
                <a-row :gutter="12">
                    <a-form-item label="严重警情推送方式：" style="display: flex;">
                        <a-col :span="24">
                            <a-select
                                v-decorator="['severityAlert', { rules: [{ required: true, message: '请选择严重推送方式!' }] }]"
                                mode="multiple"
                                placeholder="web端推送，APP推送，短信推送，电话推送（多选）"
                                style="width: 300px"
                            >
                                <a-select-option key="1">web端推送</a-select-option>
                                <a-select-option key="2">APP推送</a-select-option>
                                <a-select-option key="3">短信推送</a-select-option>
                                <a-select-option key="4">电话推送</a-select-option>
                            </a-select>
                        </a-col>
                    </a-form-item>
                </a-row>
                <a-row :gutter="12">
                    <a-form-item label="短信推送人员：" style="display: flex;">
                        <a-col :span="24">
                            <a-select
                                v-decorator="['userIds', { rules: [{ required: true, message: '请选择推送人员!' }] }]"
                                mode="multiple"
                                placeholder="添加人员，人员列表从用户列表以及基础信息列表获取"
                                style="width: 300px;margin-left:28px;"
                                showSearch
                                optionFilterProp="children"
                            >
                                <a-select-option v-for="item in userList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-col>
                    </a-form-item>
                </a-row>
                <a-form-item :wrapper-col="{ span: 12, offset: 5 }" style="display: flex;justify-content: center;margin-top:30px;">
                    <a-button type="primary" html-type="submit"> 提交 </a-button>
                </a-form-item>
            </div>
        </a-form>
    </div>
</template>
<script>
import { getPushSet,setPushSet,getAllUserByOrgId } from '@/api/set/set'
export default {
    data(){
        return{
            userList:[],
            form:this.$form.createForm(this, { name: 'advanced_search' }),
            id:null,
            userIds:[]
        }
    },
    created(){
        getAllUserByOrgId().then(res=>{
            if (res && res.data && res.data.success) {
                if(res.data.value.length){
                    res.data.value.forEach(s=>{
                        s.label=s.realName
                        s.value=s.id
                    })
                }
                this.userList = res.data.value
            }
        })
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            getPushSet().then(res=>{
                if(res && res.data && res.data.success){
                    let generalAlert=res.data.value.generalAlert
                    let importanceAlert=res.data.value.importanceAlert
                    let severityAlert=res.data.value.severityAlert
                    this.id=res.data.value.id?res.data.value.id:null
                    this.userIds=[]
                    if(res.data.value.noteUser.length){
                        res.data.value.noteUser.forEach(s=>{
                            this.userIds.push(s.userId)
                        })
                    }
                    this.form.setFieldsValue({
                        generalAlert:generalAlert.split(','),
                        importanceAlert:importanceAlert.split(','),
                        severityAlert:severityAlert.split(','),
                        userIds:this.userIds
                    })
                }
            })
        },
        handleSubmit(e){
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    var params={
                        generalAlert:values.generalAlert.join(','),
                        importanceAlert:values.importanceAlert.join(','),
                        severityAlert:values.severityAlert.join(','),
                        userIds:values.userIds.join(','),
                    }
                    if(this.id){
                        params.id=this.id
                    }
                    setPushSet(params).then(res=>{
                        if(res && res.data && res.data.success){
                            this.$message.success('设置成功')
                        }else{
                            this.$message.error(res.data.errorMsg)
                        }
                    })
                }
            });
        },
    }
}
</script>