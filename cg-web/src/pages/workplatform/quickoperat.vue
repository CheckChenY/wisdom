<template>
    <a-layout>
        <a-layout-header>
            <span>快捷操作</span>
            <!-- <a-popover trigger="click"> -->
                <a-icon  @click="showDrawer" type="setting" />
            <!-- </a-popover> -->
        </a-layout-header>
        <a-layout-content>
            <div class="quick_operat">
                <a-row>
                    <a-col :span="6" v-for="item in menuList" :key="item.id">
                        <!-- <span v-if="menuBool" style="position:absolute;right:25px;top:-5px" >
                            <a-icon type="close-circle" style="color:red" />
                        </span> -->
                        <router-link target="_blank" tag="a" rel="noopener noreferrer" :to="item.menuPath" class="quick_operat_unit">
                            <div class="unit_icon">
                                <!-- <a-icon :type="item.icon ? item.icon : 'align-left'" theme="filled"/> -->
                                <a-icon type="align-left" />
                            </div>
                            <span>{{item.menuName.length > 4 ? item.menuName.substring(0,3) + '...' : item.menuName}}</span>
                        </router-link>
                    </a-col>
                </a-row>
            </div>
            <a-drawer
                title="菜单列表"
                placement="right"
                :closable="false"
                @close="onClose"
                :visible="visible"
                destroyOnClose
            >
                <a-form :form="form" @submit="handleSubmit">
                    <a-row :gutter="24">
                        <a-checkbox-group @change="onChange">
                            <a-col :span="24" v-for="item in options" :key="item.value">
                                <a-checkbox :value="item.menuCode">{{item.menuName}}</a-checkbox>
                            </a-col>
                        </a-checkbox-group>
                        <a-col :span="6" style="margin-top: 45px;">
                            <a-button type="primary" size="small" html-type="submit">
                                提交
                            </a-button>
                        </a-col>
                    </a-row>
                </a-form>
            </a-drawer>
        </a-layout-content>
    </a-layout>
</template>
<script>
import { shortcutsMenu,jtlRoleUserRelation,shortcutsInsert } from '@/api/warncenter/warnscan'
export default {
    data() {
        return {
            // menuBool:false,
            visible:false,
            options:[],
            list:[],
            menuList:[],
            form: this.$form.createForm(this, { name: 'advanced_search' }),
        };
    },
    created(){
        this.ShortCutsMenu();
    },
    methods: {
        // ShortCutsMenuLoad(){
        //     this.menuBool = !this.menuBool
        // },
        ShortCutsMenu(){
            shortcutsMenu().then(res=>{
                if(res.data.success){
                    this.menuList = res.data.value;
                }
            })
        },
        showDrawer() {
            this.visible = true;
            this.options = [];
            this.list = [];
            // this.onChange();
            jtlRoleUserRelation().then(res=>{
                if(res.data.success){
                    this.options = res.data.value;
                }
            })
        },
        onClose() {
            this.visible = false;
        },

        onChange(checkedValues) {
            console.log(checkedValues);
            this.list = checkedValues;
            checkedValues=[];
        },

        handleSubmit(e){
            let menuList = [];
            if(this.options){
                this.options.map((show,i)=>{
                    this.list.map((it)=>{
                        if(show.menuCode === it ){
                            delete show.id
                            menuList.push(show)
                        }
                    })
                })
            }

            shortcutsInsert(menuList).then(res=>{
                if(res && res.data && res.data.success){
                    this.ShortCutsMenu();
                    this.$message.success('操作成功')
                    this.visible = false;
                }else{
                    this.visible = false;
                }
            })
            
        }

    },
};
</script>
<style lang="scss" scoped>
.quick_operat{
    padding: 0 80px;
    .quick_operat_unit{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        height: 100px;
        .unit_icon{
            font-size: 22px;
            text-align: center;
            width: 50px;
            height: 50px;
            line-height: 50px;
            // border: 1px solid #999;
            border: 1px solid #999;
            border-radius: 10px;
        }
    }
}
</style>
