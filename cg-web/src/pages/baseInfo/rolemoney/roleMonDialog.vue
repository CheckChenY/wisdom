<template>
  <div class="role_dialog">
    <a-drawer
        title="配置菜单"
        placement="right"
        :closable="false"
        @close="onClose"
        :visible="visible"
        >
        <a-tree
            checkable
            @expand="onExpand"
            :expandedKeys="expandedKeys"
            defaultExpandAll
            v-model="checkedKeys"
            @select="onSelect"
            :selectedKeys="selectedKeys"
            :treeData="treeData"
        />
        <!-- <a-tree
            checkable
            checkStrictly
            defaultExpandAll
            v-model="checkedKeys"
			@check="onCheck"
            :treeData="treeData"
		/> -->
		<div :style="{
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
        <a-button :style="{marginRight: '8px'}" @click="onClose">
          取 消
        </a-button>
        <a-button @click="onSubmit" type="primary">提 交</a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import { findByRoleCode } from '@/api/role'
import { findList } from '@/api/menu'
import { findAllSystem } from '@/api/systemmanage'
import { packagemenuinsert,packagemenufindById,packagemenuupdate } from '@/api/rolemoney'
export default {
    data() {
        return {
            treeData:[],
			visible: false,
			record: '',
			params:[],
			checkedKeys:[],
            haveMenu:false,
            expandedKeys:[],
            selectedKeys:[]
        };
	},
	props:['packageName','packageCode'],
    watch: {
		visible(){
			if(this.visible){
				packagemenufindById({packageCode:this.packageCode}).then(res=>{
                    this.checkedKeys=[]
                    console.log(res)
					if(res && res.data && res.data.success){
						this.haveMenu=true
						res.data.value.forEach(s=>{
							this.checkedKeys.push(s.menuCode)
                        })
                        // this.checkedKeys.forEach(key => {
                        //     this.checkedDataFilter(this.treeData, key)
                        // })
					}else{
						this.haveMenu=false
					}
				})
			}
		},
	},
	created () {
		this.findAllSystem()
	},
    methods: {
        onSelect(selectedKeys, info){
            console.log(selectedKeys)
        },
        onExpand(expandedKeys) {
            this.expandedKeys = expandedKeys;
        },
		onClose(){
            this.visible = false;
            this.$store.dispatch("setRowLight",'')
		},
		onSubmit(){
            this.packParams()
			if(this.haveMenu){
				if(!this.params.length){
					var obj={
						packageCode:this.packageCode
					}
					this.params=[obj]
				}
				packagemenuupdate(this.params).then(res=>{
					if(res && res.data && res.data.success){
						this.$message.success('修改成功')
						this.visible = false;
					}
				})
			}else{
				packagemenuinsert(this.params).then(res=>{
					if(res && res.data && res.data.success){
						this.$message.success('添加成功')
						this.visible = false;
					}
				})
			}
        },
        // checkDataFilter (children) {
        //     children.forEach(item => {
        //         let child = item.children
        //         if (!child || (child && child.length < 0)) {
        //             return
        //         }
        //         let itemKey = item.menuCode
        //         for(let i = 0, len = child.length; i<len; i++) {
        //             let sKey =  child[i].menuCode
        //             if (this.checkedKeys.indexOf(sKey) === -1) {
        //                 let index = this.checkedKeys.indexOf(itemKey)
        //                 if (index != -1) {
        //                     this.checkedKeys.splice(index, 1)
        //                     break
        //                 }
        //             }
        //         }
        //         this.checkDataFilter(child)
        //     })
        // },
        // checkedDataFilter (children, key) {
        //     let _this = this
        //     if (children && children.length > 0){
        //         for (let i = 0, len = children.length; i < len; i++) {
        //             let item = children[i]
        //             let child = item.children
        //             if (key === item.key && 
        //                 _this.checkedKeys.indexOf(item.parentKey) === -1) {
        //                 _this.checkedKeys.push(item.parentKey)
        //                 _this.checkedDataFilter(_this.treeData, item.parentKey)
        //             }
        //             if (child && child.length  > 0) {
        //                 _this.checkedDataFilter(child, key)
        //             }
        //         }
        //     }
        // },
		findAllSystem () {
            findAllSystem().then(res => {
                if (res && res.data && res.data.success) {
                    res.data.value.forEach(item => {
                        item.title = item.systemName
                        item.key = item.id
                        item.slots = { icon: 'icon' }
                        item.children = []
                    })
                    findList().then(o => {
                        if(o.data.success && o.data.value.length){
                            function setTitle(arr, item){
                                if(arr.length){
                                    arr.forEach(i=>{
                                        i.title=i.menuName
                                        i.key=i.menuCode
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
                            console.log(treeData)
                            this.treeData = treeData
                        }
                    })
                }
            })
        },
        showDrawer(record) {
            this.record = record
            this.$store.dispatch("setRowLight",record.id)
            this.visible = true;
        },
        // onCheck(checkedKeys, {checked, node}) {
		// 	this.checkedKeys = checkedKeys.checked;
        //     if (checked) {
        //         this.checkAllFilter(node.dataRef.children) // 子菜单全选
        //         this.checkedDataFilter(this.treeData, node.eventKey) // 父菜单全选
        //     } else {
        //         let index = this.checkedKeys.indexOf(node.eventKey)
        //         if (index != -1) {this.checkedKeys.splice(index, 1)}
        //         this.uncheckDataFilter(node.dataRef.children) // 子菜单全不选
        //     }
        // },
        // uncheckDataFilter (children) {
        //     let _this = this
        //     if (!children || children.length === 0) return
        //     children.forEach(item => {
        //         let index = _this.checkedKeys.indexOf(item.key)
        //         if (index != -1) { _this.checkedKeys.splice(index, 1) }
        //         if (item.children && item.children.length > 0) 
        //         _this.uncheckDataFilter(item.children)
        //     })
        // },
        // checkAllFilter (children) {
        //     let _this = this
        //     if (!children || children.length === 0) return
        //     children.forEach(item => {
        //         let index = _this.checkedKeys.indexOf(item.key)
        //         if (index == -1) { _this.checkedKeys.push(item.key) }
        //         if (item.children && item.children.length > 0) 
        //         _this.checkAllFilter(item.children)
        //     })
        // },
        packParams () {
            var that=this
            that.params=[]
			if(this.checkedKeys.length){
				this.checkedKeys.forEach(o=>{
					function getObj(arr){
						if(arr.length){
							arr.forEach(s=>{
								if(s.menuName && s.menuCode==o){
									var obj={}
									obj.packageCode=that.packageCode
									obj.systemCode=s.systemCode
									obj.menuCode=s.menuCode
									obj.menuName=s.menuName 
									that.params.push(obj)
									return
								}else{
									if(s.children && s.children.length){
										return getObj(s.children)
									}
								}
							})
						}
					}
                    getObj(this.treeData)
                })
			}
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