<template>
    <div style="min-width:200px;max-height:800px;overflow:scroll;">
        <!-- <a-input-search style="margin-bottom: 8px" placeholder="请输入" @change="onChange" /> -->
        <p v-if="loading" style="display: flex;justify-content: center;margin-top: 30px;">
            <a-icon type="loading" style="font-size: 20px;"/>
        </p>
        <p v-if="!gData.length" style="display: flex;justify-content: center;margin-top: 30px;">
            没有建筑信息
        </p>
        <a-tree
            v-if="gData.length"
            @select="onSelect"
            :autoExpandParent="autoExpandParent"
            :treeData="gData"
            defaultExpandAll
            >
            <template slot="title" slot-scope="{title}">
                <span v-if="title.indexOf(searchValue) > -1">
                    {{title.substr(0, title.indexOf(searchValue))}}
                    <span style="color: #f50">{{searchValue}}</span>
                    {{title.substr(title.indexOf(searchValue) + searchValue.length)}}
                </span>
                <span v-else>{{title}}</span>
            </template>
        </a-tree>
    </div>
</template>
<script>
import { findAllFloor } from "@/api/floor"
import { findList } from "@/api/building"
export default {
    data () {
        return {
            expandedKeys: [],
            autoExpandParent: true,
            gData:[],
            loading: false,
        }
    },
    created(){
        this.findList()
    },
    methods:{
        // 获取所有建筑
        findList () {
            this.loading = true
            findList().then(res => {
                this.loading = false
                if(res && res.data && res.data.success && res.data.value && res.data.value.length){
                    res.data.value.forEach(s=>{
                        s.title=s.buildingCode
                        s.key=s.id
                        s.disabled=true
                    })
                    this.floorToBuilding(res.data.value)
                }
            })
        },
        floorToBuilding(buildingList){
            findAllFloor({}).then(r=>{
                if(r && r.data && r.data.success && r.data.value && r.data.value.length){
                    buildingList.forEach(s=>{
                        s.children=[]
                        r.data.value.forEach(t=>{
                            if(t.buildingCode==s.buildingCode){
                                t.title=t.floorCode
                                t.key=t.id
                                s.children.push(t)
                            }
                        })
                    })
                }
                this.gData=buildingList
            })
        },
        onSelect(selectedKeys, info){
            this.$emit('selectedKeys',selectedKeys)
        },
        onChange(e) {
            const dataList = [];
            const generateList = data => {
                for (let i = 0; i < data.length; i++) {
                    const node = data[i];
                    const key = node.key;
                    dataList.push({ key, title: node.title });
                    if (node.children) {
                        generateList(node.children);
                    }
                }
            };
            generateList(this.gData);
            const getParentKey = (key, tree) => {
                let parentKey;
                for (let i = 0; i < tree.length; i++) {
                    const node = tree[i];
                    if (node.children) {
                        if (node.children.some(item => item.key === key)) {
                            parentKey = node.key;
                        } else if (getParentKey(key, node.children)) {
                            parentKey = getParentKey(key, node.children);
                        }
                    }
                }
                return parentKey;
            };

            const value = e.target.value;
            const expandedKeys = dataList
                .map(item => {
                    if (item.title.indexOf(value) != -1) {
                        return getParentKey(item.key, this.gData);
                    }
                    return null;
                })
                .filter((item, i, self) => item && self.indexOf(item) === i);
                Object.assign(this, {
                    expandedKeys,
                    searchValue: value,
                    autoExpandParent: true,
                });
        },
    }
}
</script>
<style>
.ant-tree-title{
    color: rgba(0,0,0,0.65)!important;
}
</style>