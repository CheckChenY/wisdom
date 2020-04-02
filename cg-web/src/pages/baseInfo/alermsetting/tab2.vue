<template>
    <div style="padding: 50px;">
        <p style="font-size: 20px;font-weight: 900;">警情扩散设置</p>
        <a-form :form="form" @submit="handleSubmit" style="display:flex;min-height: 650px;margin-top:30px;">
            <div style="width:450px;margin-left:15%;">
                <a-row :gutter="12">
                    <a-col :span="24">
                        <span style="display: inline-block;width:150px;text-align: right;">
                            <i style="color: rgb(245, 34, 45);">*&nbsp;&nbsp;</i>警情扩散说明：
                        </span>
                        <span>警情超出限制时间未处理时，警情等级升级，扩</span>
                    </a-col>
                    <a-col :span="24" style="margin-bottom: 30px;">
                        <span style="display: inline-block;width:150px;">
                        </span>
                        <span>散推送给其他人员，督促人员及时处理。</span>
                    </a-col>
                </a-row>
                <a-row :gutter="12">
                    <a-form-item label="一级警情推送角色：" style="display: flex;">
                        <a-col :span="24">
                            <a-select
                                v-decorator="['alertRole1', { rules: [{ required: true, message: '从本单位用户角色列表获取信息!' }] }]"
                                mode="multiple"
                                placeholder="从本单位用户角色列表获取信息"
                                style="width: 300px"
                            >
                                <a-select-option v-for="item in roleList" :key="item.id" :value="item.id">{{item.roleName}}</a-select-option>
                            </a-select>
                        </a-col>
                    </a-form-item>
                </a-row>
                <a-row :gutter="12">
                    <a-form-item label="二级警情推送时间：" style="display: flex;">
                        <a-col :span="24">
                            <a-input
                                v-decorator="['alertTime2', { rules: [{ required: true, message: '请输入处理限制时间!' }] }]"
                                placeholder="请输入处理限制时间，单位：分钟"
                                style="width: 300px"
                                maxLength="20"
                            >
                            </a-input>
                        </a-col>
                    </a-form-item>
                </a-row>
                <a-row :gutter="12">
                    <a-form-item label="二级警情推送角色：" style="display: flex;">
                        <a-col :span="24">
                            <a-select
                                v-decorator="['alertRole2', { rules: [{ required: true, message: '从本单位用户角色列表获取信息!' }] }]"
                                mode="multiple"
                                placeholder="从本单位用户角色列表获取信息"
                                style="width: 300px"
                            >
                                <a-select-option v-for="item in roleList" :key="item.id" :value="item.id">{{item.roleName}}</a-select-option>
                            </a-select>
                        </a-col>
                    </a-form-item>
                </a-row>
                <a-row :gutter="12">
                    <a-form-item label="三级警情推送时间：" style="display: flex;">
                        <a-col :span="24">
                            <a-input
                                v-decorator="['alertTime3', { rules: [{ required: true, message: '请输入处理限制时间!' }] }]"
                                placeholder="请输入处理限制时间，单位：分钟"
                                style="width: 300px"
                                maxLength="20"
                            >
                            </a-input>
                        </a-col>
                    </a-form-item>
                </a-row>
                <a-row :gutter="12">
                    <a-form-item label="三级警情推送角色：" style="display: flex;">
                        <a-col :span="24">
                            <a-select
                                v-decorator="['alertRole3', { rules: [{ required: true, message: '从本单位用户角色列表获取信息!' }] }]"
                                mode="multiple"
                                placeholder="从本单位用户角色列表获取信息"
                                style="width: 300px"
                            >
                                <a-select-option v-for="item in roleList" :key="item.id" :value="item.id">{{item.roleName}}</a-select-option>
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
import { findSet,save } from '@/api/set/set'
import { findPageListAndIsAdmin } from '@/api/role'
export default {
    data(){
        return{
            roleList:[],
            form:this.$form.createForm(this, { name: 'advanced_search' }),
            id:null,
            userIds:[]
        }
    },
    created(){
        this.getData()
    },
    mounted(){
    },
    methods:{
        getData(){
            findSet().then(res=>{
                if(res && res.data && res.data.success){
                    res.data.value.forEach(item => {
                        if (item.alarmLevel == '1') {
                            let roleArr = []
                            item.roles.forEach(i => {
                                roleArr.push(i.roleId)
                            })
                            this.form.setFieldsValue({
                                alertRole1: roleArr
                            })
                        } else if (item.alarmLevel == '2') {
                            let roleArr = []
                            item.roles.forEach(i => {
                                roleArr.push(i.roleId)
                            })
                            this.form.setFieldsValue({
                                alertRole2: roleArr,
                                alertTime2: item.alarmTime,
                            })
                        } else if (item.alarmLevel == '3') {
                            let roleArr = []
                            item.roles.forEach(i => {
                                roleArr.push(i.roleId)
                            })
                            this.form.setFieldsValue({
                                alertRole3: roleArr,
                                alertTime3: item.alarmTime,
                            })
                        }
                    })
                }
            })
            findPageListAndIsAdmin({
                page:0,
                size:300,
            }).then(res => {
                if (res && res.data && res.data.success) {
                    if(res.data.value.roles.content.length){
                        res.data.value.roles.content.forEach(s=>{
                            s.key=s.id
                        })
                    }
                    this.roleList = res.data.value.roles.content;
                }
            })
        },
        handleSubmit(e){
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    if (parseInt(values.alertTime2) > parseInt(values.alertTime3)) {
                        this.$message.error('二级警情处理时间不能大于三级警情处理时间！')
                        return
                    }
                    let params = [{
                        alarmLevel: '1',
                        alarmTime: '5256000',
                        roleIds: values.alertRole1,
                    },{
                        alarmLevel: '2',
                        alarmTime: values.alertTime2,
                        roleIds: values.alertRole2,
                    },{
                        alarmLevel: '3',
                        alarmTime: values.alertTime3,
                        roleIds: values.alertRole3,
                    }]
                    save(params).then(res=>{
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