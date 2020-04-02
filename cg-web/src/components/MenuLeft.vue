<template>
    <div style="width:256px;height:100vh;background:#001529;overflow-y: scroll;">
        <div style="height:95px;color:#fff;font-size:15px;margin:10px 0;margin-top:80px;">
            <div style="width:60px;height:60px;border-radius:50%;background:#fff;margin:0 auto;text-align:center;line-height:52px;">
                <img :src="orgObj.logo"  style="width:50px;height:30px;"/>
            </div>
            <p style="margin-top:8px;text-align: center;">{{orgObj.orgName}}</p>
        </div>
        <a-menu
            mode="inline"
            theme="dark"
            :openKeys="openKeys"
            v-model="selectedKeys"
            @openChange="onOpenChange"
            style="width: 250px"
            @click="selectMenu"
        >
            <template v-for="(item) in menuList">
                <!-- 返2个首页为超管 -->
                <template v-for="(path) in item.children">
                    <template v-if="item.children.length!=2">
                        <a-menu-item :key="path.menuPath" v-if="path.menuName=='首页'">
                            <i :class="item.icon"></i>
                            <span>{{item.menuName}}</span>
                        </a-menu-item>
                    </template>
                </template >
            </template >
            <template v-for="(item, i) in menuList">
                <a-sub-menu v-if="item.menuName!='首页'" :key="i">
                    <span slot="title"><i :class="item.icon"></i><span>{{item.menuName}}</span></span>
                    <a-menu-item :key="path.menuPath" v-for="path in item.children">{{path.menuName}}</a-menu-item>
                </a-sub-menu>
            </template >
        </a-menu>
    </div>
</template>
<script>
import { findByUserId } from '@/api/role'
import { findById } from '@/api/platform/platform'
import { mapGetters } from "vuex";
export default {
    name:'MenuLeft',
    created(){
        this.getMenu()
    },
    data () {
        return {
            openKeys: [],
            selectedKeys: [],
            menuList: [],
            orgObj: {},
        }
    },
    watch: {
        $route(val) {
            console.log("route",val)
            this.selectedKeys = [val.path]
            if (this.menuList && this.menuList.length > 0) {
                this.menuList.forEach((s,index)=>{
                    if (s.children && s.children.length > 0){
                        s.children.forEach(item => {
                            if (item.menuPath === val.path) {
                                this.openKeys=[index]
                                return
                            }
                        })
                    }
                })
            }
        }
    },
    computed: {
        ...mapGetters([
            "orgInfo",
        ]),
    },
    methods:{
        onOpenChange (openKeys) {
            var len=openKeys.filter(s=>s!=NaN).length
            if(openKeys.filter(s=>s!=NaN)[len-1]==undefined){
                this.openKeys=[]
            }else{
                this.openKeys=[openKeys.filter(s=>s!=NaN)[len-1]]
            }
        },
        selectMenu({ item, key, keyPath }){
            console.log(item)
            console.log(key)
            console.log(keyPath)
            if(window.location.hash.replace('#','')!=key){
                window.localStorage.setItem('keyPath',keyPath)
                this.$router.push(key)
            }
        },
        // 获取用户菜单
        getMenu () {
            findByUserId({sysCodes:"100,102"}).then(res => {
                if (res && res.data && res.data.success) {
                    this.menuList = res.data.value
                    this.setHandlePermis()
                    if(window.location.hash.replace('#/','')=='index_sg'){//社管初始化菜单选择页面
                        this.openKeys=[]
                        this.selectedKeys=['/index_sg']
                    } else if(window.location.hash.replace('#/','')=='baseinfo'){//监管初始化菜单选择页面
                        this.menuList.forEach((s,index)=>{
                            if(s.menuName=='单位管理'){
                                this.openKeys=[index]
                                this.selectedKeys=['/baseinfo']
                                console.log(this.openKeys)
                            }
                        })
                    } else if(window.location.hash.replace('#/','')=='unitmanage'){//超管初始化菜单选择页面
                        this.menuList.forEach((s,index)=>{
                            if(s.menuName=='单位管理'){
                                this.openKeys=[index]
                                this.selectedKeys=['/unitmanage']
                                console.log(this.openKeys)
                            }
                        })
                    } else {
                        this.refreshPage()
                    }
                }
            })
            findById({orgId:this.orgInfo.id}).then(res => {
                if (res && res.data && res.data.success) {
                    this.orgObj = res.data.value
                    this.orgObj.logo = this.orgObj.logo? this.$imgUrl+this.orgObj.logo:require('../assets/logo/logo1.png')
                }
            })
        },
        refreshPage () {
            let keyPath = window.localStorage.getItem('keyPath').split(',')
            this.selectedKeys = [keyPath[0]]
            console.log(this.selectedKeys)
            this.openKeys = [parseInt(keyPath[1])]
        },
        setHandlePermis () {
            let menuFilter = (arr) => {
                arr.forEach(item => {
                    if (item.menuPath != '/') {
                        if (item.children && item.children.length > 0) {
                            this.$store.dispatch('SetPermission', item.children)
                        }
                        return
                    } else {
                        if (item.children && item.children.length > 0) {
                            menuFilter(item.children)
                        }
                    }
                })
            }
            menuFilter(this.menuList)
        }
    }
    
}
</script>
<style>
.ant-menu-item,.ant-menu-submenu-title{
    text-align: left;
}
::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(144, 146, 152, 0.3);
}
::-webkit-scrollbar{
    width: 7px;
    height:0;
    background-color: #001529;
}
</style>