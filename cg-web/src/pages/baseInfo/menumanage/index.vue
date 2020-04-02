<template>
    <div class="menu_manage">
        <a-row>
            <a-col :span="5" style="min-width:400px;">
                <a-button-group style="min-width:500px;">
                    <a-button :type="showTabText.tab1"
                        @click="handlerAddSys">添加系统</a-button>
                    <a-button :type="showTabText.tab2"
                        @click="handlerAdd">添加菜单</a-button>
                    <a-button :type="showTabText.tab3"
                        @click="handlerEdit">编辑菜单</a-button>
                    <a-button type="danger"
                        @click="handlerDelete">删除</a-button>
                    <!-- <a-popconfirm title="确定删除?" okText="确定" cancelText="取消" @confirm="() => handleDelete()">
                        <a-button type="primary">删除</a-button> -->
                    <!-- </a-popconfirm> -->
                </a-button-group>
                <a-tree :treeData="treeData" showIcon 
                    @select="onSelect"
                    class="tree_menu">
                    <template slot="icon">
                        <i class="icon-systemmenu floder_icon"></i>
                    </template>
                </a-tree>
            </a-col>
            <a-col :span="9">
                <a-form layout="horizontal">
                    <a-form-item
                        label="父级节点"
                        :label-col="formItemLayout.labelCol"
                        :wrapper-col="formItemLayout.wrapperCol"
                        v-if="!isSystemMenu"
                        >
                        <!-- :disabled="true" -->
                        <!-- <a-input
                            placeholder="请输入父级节点" 
                            v-model="parentName"/> -->
                        <a-select @change="handleparentChange">
                            <a-select-option v-for="parent in parentData" :key="parent.id"
                                >{{parent.title}}</a-select-option
                            >
                        </a-select>
                    </a-form-item>
                    <a-form-item
                        label="名称"
                        :label-col="formItemLayout.labelCol"
                        :wrapper-col="formItemLayout.wrapperCol"
                        >
                        <a-input placeholder="请输入名称" 
                            v-model="form.menuName"
                            maxLength="40"/>
                    </a-form-item>
                    <a-form-item
                        label="编码"
                        :label-col="formItemLayout.labelCol"
                        :wrapper-col="formItemLayout.wrapperCol"
                        >
                        <a-input placeholder="请输入编码" 
                            v-model="form.systemCode"
                            maxLength="40"/>
                    </a-form-item>
                    <a-form-item
                        label="图标"
                        :label-col="formItemLayout.labelCol"
                        :wrapper-col="formItemLayout.wrapperCol"
                        v-if="!isSystemMenu"
                        >
                        <a-input placeholder="请输入图标" 
                            v-model="form.icon"
                            maxLength="64"/>
                    </a-form-item>
                    <a-form-item
                        label="类型"
                        :label-col="formItemLayout.labelCol"
                        :wrapper-col="formItemLayout.wrapperCol"
                        v-if="!isSystemMenu"
                        >
                        <a-select v-model="form.menuType" placeholder="请输入资源请求类型" 
                            @select="handleChange">
                            <a-select-option value="0">模块</a-select-option>
                            <a-select-option value="1">菜单</a-select-option>
                            <a-select-option value="2">操作</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item
                        label="路径地址"
                        :label-col="formItemLayout.labelCol"
                        :wrapper-col="formItemLayout.wrapperCol"
                        >
                        <a-input placeholder="请输入路径地址" 
                            v-model="form.menuPath"
                            maxLength="100"/>
                    </a-form-item>
                    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                        <a-button type="primary" @click="submit">
                            <!-- {{type=='addSys'?'添加系统':type=='add'?'添加菜单':'编辑'}} -->
                            提 交
                        </a-button>
                    </a-form-item>
                </a-form>
            </a-col>
        </a-row>
    </div>
</template>

<script>
const treeData = [];
import { findList, findById, 
    insert, update, deleteMenu, permissionValidation,savesystemmenu,deleteSysMenu,sysUpdate } from '@/api/menu'
import { findAllSystem } from '@/api/systemmanage'
export default {
    data() {
        return {
            treeData,
            form: {
                menuName: undefined,
                id: undefined,
                systemCode: undefined,
                parentId: undefined,
                parentName: undefined,
                menuType: undefined,
                menuPath: undefined,
                icon:undefined
            },
            formStatus: '',
            currentId: -1,
            hasChild: 0,
            formItemLayout: {
                labelCol: { span: 4 },
                wrapperCol: { span: 14 },
            },
            isSystemMenu:true,
            selectObj:{},
            type:'addSys',
            parentName:'',
            showTabText:{
                tab1:'primary',
                tab2:'text',
                tab3:'text',
            },
            parentData:[],
            parentCodeNub:0,//0父级是最外层  非0传id
            parentCodeData:0,
        };
    },
    computed: {
    },
    created () {
        this.findAllSystem()
    },
    methods: {
        handleChange(value) {
            console.log(`selected ${value}`);
        },
        handlerEdit() {
            this.showTabText.tab1='text'
            this.showTabText.tab2='text'
            this.showTabText.tab3='primary'
            this.type='edit'
            this.form = {
                menuName: undefined,
                systemCode: undefined,
                id: undefined,
                parentId: undefined,
                parentName: undefined,
                menuType: undefined,
                menuPath: undefined,
                icon:undefined
            }
            if(this.selectObj.title){
                if(this.selectObj.menuName){
                    this.isSystemMenu=false
                    this.form.menuName=this.selectObj.menuName
                    this.form.menuPath=this.selectObj.menuPath
                    this.form.menuType=this.selectObj.menuType
                    this.form.icon=this.selectObj.icon
                }else{
                    this.isSystemMenu=true
                    this.form.menuName=this.selectObj.systemName
                    this.form.menuPath=this.selectObj.systemPath
                }
                
            }else{
                this.$message.warning("请选择需要编辑的菜单")
            }
        },
        handlerAddSys(){
            this.isSystemMenu=true
            this.type='addSys'
            this.form = {
                menuName: undefined,
                systemCode: undefined,
                id: undefined,
                parentId: undefined,
                parentName: undefined,
                menuType: undefined,
                menuPath: undefined,
                icon:undefined
            }
            this.showTabText.tab1='primary'
            this.showTabText.tab2='text'
            this.showTabText.tab3='text'
        },
        handlerAdd() {
            this.showTabText.tab1='text'
            this.showTabText.tab2='primary'
            this.showTabText.tab3='text'
            this.form = {
                menuName: undefined,
                systemCode: undefined,
                id: undefined,
                parentId: undefined,
                parentName: undefined,
                menuType: undefined,
                menuPath: undefined,
                icon:undefined
            }
            this.type='add'
            this.isSystemMenu=false
        },
        handlerDelete() {
            var that=this
            console.log(this.selectObj)
            if (this.selectObj.children && this.selectObj.children.length > 0) {
                this.$message.warning("删除菜单不能有子菜单")
                return
            }
            if(this.selectObj.id){
                this.$confirm({
                    title: '提示?',
                    cancelText:'取消',
                    okText:'确定',
                    content: `确定删除 “${this.selectObj.menuName?this.selectObj.menuName:this.selectObj.systemName}” 菜单吗？`,
                    onOk() {
                        return new Promise((resolve, reject) => {
                            if(that.selectObj.menuName){
                                deleteMenu(that.selectObj.id).then(res=>{
                                    if(res && res.data && res.data.success){
                                        that.selectObj={}
                                        that.success('删除')
                                        resolve()
                                    }
                                })
                            }else{
                                deleteSysMenu(that.selectObj.id).then(res=>{
                                    if(res && res.data && res.data.success){
                                        that.selectObj={}
                                        that.success('删除')
                                        resolve()
                                    }
                                })
                            }
                            resolve()
                        }).catch(() => console.log('Oops errors!'));
                    },
                    onCancel() {},
                });
            }else{
                this.$message.error('请选择需要删除的菜单')
            }
        },
        resetForm() {
            let obj = {
                menuName: undefined,
                systemCode: undefined,
                id: undefined,
                parentId: this.currentId,
                parentName: this.form.menuName,
                menuType: undefined,
                menuPath: undefined,
                icon:undefined
            }
            Object.assign(this.form, obj)
            console.log(this.form)
        },
        onSelect(selectedKeys, info) {
            let that=this,obj;
            console.log(info.node.dataRef.parentId)
            function getObj(arr){
                if(arr.length){
                    arr.forEach(s=>{
                        let ref = info.node.dataRef.parentId;
                        that.parentCodeNub = ref; 
                        if(ref == 0){
                            obj = that.treeData
                        }else{
                            if(s.id === ref){
                                obj = arr
                            }
                        }
                        if(s.id+s.createTime==selectedKeys){
                            that.selectObj=s
                            return
                        }else{
                            if(s.children){
                                return getObj(s.children)
                            }
                        }
                    })
                }
            } 

            getObj(this.treeData)
            
            this.parentData = obj;
            // console.log(that.selectObj)
            console.log(obj)
            this.parentName=that.selectObj.menuName?that.selectObj.menuName:that.selectObj.systemName
            if(this.type=='addSys'){
                this.isSystemMenu=true
            }
            if(this.type=='add'){
                this.isSystemMenu=false

            }
            if(this.type=='edit'){
                if(that.selectObj.menuName){
                    this.isSystemMenu=false
                    this.form.menuName=this.selectObj.menuName
                    this.form.systemCode=this.selectObj.systemCode
                    this.form.menuPath=this.selectObj.menuPath
                    this.form.menuType=this.selectObj.menuType
                    this.form.icon=this.selectObj.icon
                }else{
                    this.isSystemMenu=true
                    this.form.menuName=this.selectObj.systemName
                    this.form.systemCode=this.selectObj.systemCode
                    this.form.menuPath=this.selectObj.systemPath
                }
            }        
        },
        success(text){
            this.form = {
                menuName: undefined,
                systemCode: undefined,
                id: undefined,
                parentId: undefined,
                parentName: undefined,
                menuType: undefined,
                menuPath: undefined,
                icon:undefined
            }
            this.$message.success(text+'成功')
            this.findAllSystem()
        },
        submit () {
            console.log(this.isSystemMenu)
            console.log(this.form)
            if(this.type=='addSys'){ //添加系统
                if(!this.form.menuName){
                    this.$message.error('请输入系统名称')
                    return
                }
                if(!this.form.systemCode){
                    this.$message.error('请输入编码')
                    return
                }
                if(!this.form.menuPath){
                    this.$message.error('请输入系统路径')
                    return
                }
                let obj={
                    systemName:this.form.menuName,
                    systemCode:this.form.systemCode,
                    systemPath:this.form.menuPath,
                }
                savesystemmenu(obj).then(res=>{
                    if(res && res.data && res.data.success){
                        this.success('添加')
                    }else{
                        this.$message.error(res.data.message)
                    }
                })
            }
            if(this.type=='add'){
                console.log('添加菜单')
                if(this.selectObj.systemCode===undefined){
                    this.$message.error('请选择系统')
                    return
                }
                if(!this.form.menuName){
                    this.$message.error('请输入菜单名称')
                    return
                }
                if(this.form.menuType===undefined){
                    this.$message.error('请输入菜单类型')
                    return
                }
                if(!this.form.menuPath){
                    this.$message.error('请输入菜单路径')
                    return
                }
                let obj={
                    systemCode:this.selectObj.systemCode,
                    menuType:this.form.menuType,
                    parentId:this.selectObj.systemName?null:this.selectObj.id,
                    menuPath:this.form.menuPath,
                    menuName:this.form.menuName,
                    icon:this.form.icon,
                }
                insert(obj).then(res=>{
                    if(res && res.data && res.data.success){
                        this.success('添加')
                    }
                })
            }
            if(this.type=='edit'){
                if(this.selectObj.title){
                    if(this.selectObj.menuName){
                        //
                        if(this.selectObj.systemCode===undefined){
                            this.$message.error('请选择父级节点')
                            return
                        }
                        if(!this.form.menuName){
                            this.$message.error('请输入菜单名称')
                            return
                        }
                        if(this.form.menuType===undefined){
                            this.$message.error('请输入菜单类型')
                            return
                        }
                        if(!this.form.menuPath){
                            this.$message.error('请输入菜单路径')
                            return
                        }

                        this.selectObj.menuType=this.form.menuType;
                        this.selectObj.menuPath=this.form.menuPath;
                        this.selectObj.menuName=this.form.menuName;
                        this.selectObj.icon=this.form.icon;
                        this.selectObj.parentCode = this.parentCodeData;
                        console.log(this.parentCodeData)
                        console.log(this.selectObj)
                        return false
                        update(this.selectObj).then(res=>{
                            if(res && res.data && res.data.success){
                                this.success('修改')
                            }
                        })

                    }else{
                        if(!this.form.menuName){
                            this.$message.error('请输入系统名称')
                            return
                        }
                        if(!this.form.menuPath){
                            this.$message.error('请输入系统路径')
                            return
                        }

                        this.selectObj.systemName=this.form.menuName;
                        this.selectObj.systemPath=this.form.menuPath;
                        this.selectObj.parentCode = this.parentCodeData;
                        return false
                        sysUpdate(this.selectObj).then(res=>{
                            if(res && res.data && res.data.success){
                                this.success('修改')
                            }
                        })
                    }
                }else{
                    this.$message.error('请选择需要编辑的菜单')
                }
            }
        },
        findAllSystem () {
            findAllSystem().then(res => {
                if (res && res.data && res.data.success) {
                    console.log(res.data.value)
                    // debugger;
                    res.data.value.forEach(item => {
                        item.title = item.systemName
                        item.key = item.id+item.createTime
                        item.slots = { icon: 'icon' }
                        item.children = []
                    })
                    findList().then(o => {
                        if(o.data.success && o.data.value.length){
                            function setTitle(arr){
                                if(arr.length){
                                    arr.forEach(i=>{
                                        i.title=i.menuName
                                        i.key=i.id+i.createTime
                                        i.slots = { icon: 'icon' }
                                        if(i.children && i.children.length){
                                            return setTitle(i.children)
                                        }
                                    })
                                }
                            }
                            setTitle(o.data.value)
                            res.data.value.forEach(p=>{
                                o.data.value.forEach(q=>{
                                    if(p.systemCode==q.systemCode){
                                        p.children.push(q)
                                    }
                                })
                            })
                        }
                        
                    })
                    this.treeData = res.data.value
                    this.parentData = res.data.value
                }
            })
        },
        handleparentChange(value,option) {
            if(this.parentCodeNub == 0){
                this.parentData.forEach(res=>{
                    if(value == res.id){
                        this.parentCodeData = res.systemCode
                    }
                })
            }else{
                this.parentData.forEach(res=>{
                    if(value == res.id){
                        this.parentCodeData = res.id
                    }
                })
            }
        },
    },
};
</script>
<style lang="scss">
.menu_manage{
    text-align: left;
    padding:10px;
    .tree_menu{
        max-height: 800px;
        margin-top: 20px;
        /* overflow: scroll; */
        .floder_icon{
            color: #409EFF;
            margin-right: 8px;
            font-size: 13px !important;
        }
    }
}
</style>
