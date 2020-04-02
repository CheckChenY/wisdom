<template>
  <div class="role_dialog">
    <a-drawer
        title="分配权限"
        placement="right"
        :closable="false"
        @close="onClose"
        :visible="visible"
        >
        <div style="height:780px;overflow-y:scroll;">
            <a-tree
                checkable
                checkStrictly
                v-model="checkedKeys"
                @check="onCheck"
                defaultExpandAll
                :treeData="treeData"
            />
        </div>
        <div style="position: fixed;bottom: 30px;right: 40px;">
            <a-button type="primary" @click="submit">提 交</a-button>
        </div>
    </a-drawer>
  </div>
</template>
<script>

import {getToken} from '@/util/auth'
import { findByRoleCode, findByUserId } from '@/api/role'
import { update } from '@/api/rolerelation'
import { findAllSystem } from '@/api/systemmanage'
import { debuglog } from 'util';
import { close } from 'fs';
let checkedKeys = []

export default {
    data() {
        return {
            checkedKeys: [],
            treeData:[],
			visible: false,
            record: '',
            menuList: [],
        };
    },
	created () {
        this.findAllSystem()
	},
    methods: {
        showDrawer(record, ids) {
            this.record = record
            this.$store.dispatch("setRowLight",record.id)
            this.checkedKeys = ids
            this.checkedKeys.forEach(key => {
                this.checkedDataFilter(this.treeData, key)
            })
            this.menuList = []
            this.visible = true;
        },
        onClose() {
            this.visible = false;
            this.$store.dispatch("setRowLight",'')
        },
        onCheck(checkedKeys, {checked, node}) {
            this.checkedKeys = checkedKeys.checked;
            if (checked) {
                this.checkAllFilter(node.dataRef.children) // 子菜单全选
                this.checkedDataFilter(this.treeData, node.eventKey) // 父菜单全选
            } else {
                let index = this.checkedKeys.indexOf(node.eventKey)
                if (index != -1) {this.checkedKeys.splice(index, 1)}
                this.uncheckDataFilter(node.dataRef.children) // 子菜单全不选
            }
        },
        checkedDataFilter (children, key) {
            let _this = this
            if (children && children.length > 0){
                for (let i = 0, len = children.length; i < len; i++) {
                    let item = children[i]
                    let child = item.children
                    if (key === item.key && 
                        _this.checkedKeys.indexOf(item.parentKey) === -1) {
                        _this.checkedKeys.push(item.parentKey)
                        _this.checkedDataFilter(_this.treeData, item.parentKey)
                    }
                    if (child && child.length  > 0) {
                        _this.checkedDataFilter(child, key)
                    }
                }
            }
        },
        uncheckDataFilter (children) {
            let _this = this
            if (!children || children.length === 0) return
            children.forEach(item => {
                let index = _this.checkedKeys.indexOf(item.key)
                if (index != -1) { _this.checkedKeys.splice(index, 1) }
                if (item.children && item.children.length > 0) 
                _this.uncheckDataFilter(item.children)
            })
        },
        checkAllFilter (children) {
            let _this = this
            if (!children || children.length === 0) return
            children.forEach(item => {
                let index = _this.checkedKeys.indexOf(item.key)
                if (index == -1) { _this.checkedKeys.push(item.key) }
                if (item.children && item.children.length > 0) 
                _this.checkAllFilter(item.children)
            })
        },
        findAllSystem () {
            findAllSystem().then(res => {
                if (res && res.data && res.data.success) {
                    res.data.value.forEach(item => {
                        item.title = item.systemName
                        item.key = item.id + item.createTime
                        item.slots = { icon: 'icon' }
                        item.children = []
                    })
                    findByUserId().then(o => {
                        if(o.data.success && o.data.value.length){
                            function setTitle(arr, item){
                                if(arr.length){
                                    arr.forEach(i=>{
                                        i.title=i.menuName
                                        i.key=i.id + i.createTime
                                        if (item) i.parentKey = item.key
                                        if(i.children && i.children.length){
                                            return setTitle(i.children, i)
                                        }
                                    })
                                }
                            }
                            setTitle(o.data.value, '')
                            res.data.value.forEach(p=>{
                                o.data.value.forEach(q=>{
                                    if(p.systemCode==q.systemCode){
                                        q.parentKey = p.key
                                        p.children.push(q)
                                    }
                                })
                            })
                            let treeData = []
                            res.data.value.forEach(item => {
                                if (item.children.length > 0) {
                                    treeData.push(item)
                                }
                            })
                            this.treeData = treeData
                        }
                    })
                    
                }
            })
        },
        menuAnalysis () {
            return new Promise((resove, reject) => {
                this.treeData.forEach(item => {
                    this.menuChildAna(item.children, item.systemCode)
                })
                resove(this.menuList)
            })
        },
        menuChildAna (children, systemCode) {
            children.forEach(item => {
                checkedKeys.forEach(key => {
                    if (key === item.key) {
                        let obj = {
                            systemCode: systemCode,
                            expireTime: item.expireTime,
                            isPackage: item.isPackage,
                            menuCode: item.menuCode,
                            roleCode: this.record.roleCode,
                        }
                        this.menuList.push(obj)
                    }
                })
                if (item.children && item.children.length > 0) {
                    this.menuChildAna(item.children, systemCode)
                }
            })
        },
        submit () {
            this.menuList = []
            checkedKeys = [...this.checkedKeys]
            this.delSystem()
            this.menuAnalysis().then(res => {
                update(res).then(s => {
                    if (s && s.data && s.data.success) {
                        this.$message.success('提交成功')
                        this.onClose()
                    } else {
                        this.$message.error(s.data.errorMsg?s.data.errorMsg:'提交失败')
                    }
                })
            })
        },
        delSystem () {
            this.treeData.forEach(item => {
                let index = checkedKeys.indexOf(item.key)
                if (index != -1) { checkedKeys.splice(index, 1) }
            })
        }
    },
};
</script>
<style lang='scss'>
.role_dialog{
    .table-operations {
        text-align: left;
        margin-bottom: 16px;
    }

    .table-operations > button {
        margin-right: 8px;
    }
}
</style>