
<template>
  <div class="app-container calendar-list-container menu_manage">
    <basic-container>
      <div class="filter-container">
        <el-button-group>
          <el-button type="primary"
                     icon="plus"
                     @click="handlerAdd">添加
          </el-button>
          <el-button type="primary"
                     icon="edit"
                     @click="handlerEdit">编辑
          </el-button>
          <el-button type="primary"
                     icon="delete"
                     @click="handleDelete">删除
          </el-button>
        </el-button-group>
      </div>

      <el-row>
        <el-col :span="4"
                class="filter-tree">
          <el-tree 
                   node-key="id"
                   highlight-current
                   default-expand-all
                   :data="treeData"
                   :default-expanded-keys="aExpandedKeys"
                   :filter-node-method="filterNode"
                   :props="defaultProps"
                   @node-click="getNodeData"
                   @node-expand="nodeExpand"
                   @node-collapse="nodeCollapse">
                   <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>
                      <i class="y-icon-systemmenu floder_icon"></i>{{ data.label }}
                    </span> 
                  </span>
          </el-tree>
        </el-col>
        <el-col :span="10"
                style='margin-top:15px;'>
          <el-card class="box-card">
            <el-form :label-position="labelPosition"
                     label-width="80px"
                     :model="form"
                     :rules="rules"
                     ref="form">
              <el-form-item label="父级节点"
                            prop="parentName">
                <el-input v-model="form.parentName"
                          :disabled="true"
                          placeholder="请输入父级节点"></el-input>
              </el-form-item>
              <!-- <el-form-item label="节点ID"
                            prop="id">
                <el-input v-model="form.id"
                          :disabled="formEdit"
                          placeholder="请输入节点ID"></el-input>
              </el-form-item> -->
              <el-form-item label="标题"
                            prop="menuName">
                <el-input v-model="form.menuName"
                          :disabled="formEdit"
                          placeholder="请输入标题"></el-input>
              </el-form-item>
              <el-form-item label="权限标识"
                            prop="permission">
                <el-input v-model="form.permission"
                          :disabled="formEdit"
                          placeholder="请输入权限标识"></el-input>
              </el-form-item>
              <el-form-item label="图标"
                            prop="icon">
                <el-input v-model="form.icon"
                          :disabled="formEdit"
                          placeholder="请输入图标"></el-input>
              </el-form-item>
              <el-form-item label="类型"
                            prop="type">
                <el-select class="filter-item"
                           v-model="form.type"
                           :disabled="formEdit"
                           placeholder="请输入资源请求类型">
                  <el-option v-for="item in  typeOptions"
                             :key="item"
                             :label="item | typeFilter"
                             :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="排序"
                            prop="sort">
                <el-input type="number"
                          v-model="form.sort"
                          :disabled="formEdit"
                          placeholder="请输入排序"></el-input>
              </el-form-item>
              <el-form-item label="前端组件"
                            prop="component">
                <el-input v-model="form.component"
                          :disabled="formEdit"
                          placeholder="请输入组件路径"></el-input>
              </el-form-item>
              <el-form-item label="前端地址"
                            prop="path">
                <el-input v-model="form.path"
                          :disabled="formEdit"
                          placeholder="iframe嵌套地址"></el-input>
              </el-form-item>
              <el-form-item v-if="formStatus == 'update'">
                <el-button type="primary"
                           @click="update" icon="el-icon-edit" :loading="isSave">更新
                </el-button>
                <el-button @click="onCancel" icon="el-icon-delete">取消</el-button>
              </el-form-item>
              <el-form-item v-if="formStatus == 'create'">
                <el-button type="primary"
                           @click="create" icon="el-icon-edit" :loading="isSave">保存
                </el-button>
                <el-button @click="onCancel" icon="el-icon-delete">取消</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
  import {addObj, delObj, fetchTree, getObj, putObj} from '@/api/unit/menu'
  import {mapGetters} from 'vuex'

  export default {
    name: 'menu',
    data() {
      var checkPath = (rule, value, callback) => {
        console.log(value)
        if (this.form.type == 0 && value.length == 0) {
          callback(new Error('请输入路径'));
        } else {
          callback()
        }
      }
      return {
        list: null,
        total: null,
        formEdit: true,
        formAdd: true,
        formStatus: '',
        showElement: false,
        typeOptions: ['0', '1'],
        methodOptions: ['GET', 'POST', 'PUT', 'DELETE'],
        listQuery: {
          name: undefined
        },
        treeData: [],
        oExpandedKey: {
          // key (from tree id) : expandedOrNot boolean
        },
        oTreeNodeChildren: {
          // id1 : [children] (from tree node id1)
          // id2 : [children] (from tree node id2)
        },
        aExpandedKeys: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        labelPosition: 'right',
        form: {
          permission: undefined,
          name: undefined,
          menuName: undefined,
          id: undefined,
          parentId: undefined,
          icon: undefined,
          sort: undefined,
          component: undefined,
          type: undefined,
          path: undefined
        },
        rules: {
          menuName: [
            { required: true, message: '请输入标题', trigger: 'blur'}
          ],
          path: [
            { validator: checkPath, trigger: 'blur'}
          ]
        },
        currentId: -1,
        menuManager_btn_add: false,
        menuManager_btn_edit: false,
        menuManager_btn_del: false,
        isSave: false,
      }
    },
    filters: {
      typeFilter(type) {
        const typeMap = {
          0: '菜单',
          1: '按钮'
        }
        return typeMap[type]
      }
    },
    created() {
      this.getList()
      this.menuManager_btn_add = this.permission['sys_menu_add']
      this.menuManager_btn_edit = this.permission['sys_menu_edit']
      this.menuManager_btn_del = this.permission['sys_menu_del']
    },
    computed: {
      ...mapGetters([
        'elements',
        'permission'
      ])
    },
    methods: {
      getList() {
        // fetchTree(this.listQuery).then(response => {
        //   this.treeData = response.data.data
        // })
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },

      nodeExpand(data) {
        let aChildren = data.children
        if (aChildren.length > 0) {
          this.oExpandedKey[data.id] = true
          this.oTreeNodeChildren[data.id] = aChildren
        }
        this.setExpandedKeys()
      },
      nodeCollapse(data) {
        this.oExpandedKey[data.id] = false
        // 如果有子节点
        this.treeRecursion(this.oTreeNodeChildren[data.id], (oNode) => {
          this.oExpandedKey[oNode.id] = false
        });
        this.setExpandedKeys()
      },
      setExpandedKeys() {
        let oTemp = this.oExpandedKey
        this.aExpandedKeys = []
        for (let sKey in oTemp) {
          if (oTemp[sKey]) {
            this.aExpandedKeys.push(parseInt(sKey));
          }
        }
      },
      treeRecursion(aChildren, fnCallback) {
        if (aChildren) {
          for (let i = 0; i < aChildren.length; ++i) {
            let oNode = aChildren[i]
            fnCallback && fnCallback(oNode)
            this.treeRecursion(oNode.children, fnCallback)
          }
        }
      },

      getNodeData(data, node) {
        if (!this.formEdit) {
          this.formStatus = 'update'
        }
        getObj(data.id).then(response => {
          this.form = response.data.data
          if (data.parentId != -1) this.form.parentName = node.parent.data.name;
        })
        this.currentId = data.id
        this.showElement = true
      },
      handlerEdit() {
        if (this.form.id) {
          this.formEdit = false
          this.formStatus = 'update'
        } else {
          this.$message("请选择需要编辑的菜单")
        }
      },
      handlerAdd() {
        this.resetForm()
        this.formEdit = false
        this.formStatus = 'create'
      },
      handleDelete() {
        if (this.currentId == -1) {
          this.$message("请选择需要编辑的菜单")
          return
        }
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delObj(this.currentId).then(() => {
            this.getList()
            this.resetForm()
            this.onCancel()
            this.$message({
              type:'success',
              message:'删除成功',
            })
          })
        })
      },
      update() {
        this.isSave = true
        putObj(this.form).then(() => {
          this.isSave = false
          this.getList()
          this.$message({
            type:'success',
            message:'更新成功',
          })
        })
      },
      create() {
        this.isSave = true
        addObj(this.form).then(() => {
          this.isSave = false
          this.getList()
          this.$message({
            type:'success',
            message:'创建成功',
          })
        })
      },
      onCancel() {
        this.formEdit = true
        this.formStatus = ''
      },
      resetForm() {
        this.form = {
          permission: undefined,
          name: undefined,
          menuName: undefined,
          id: undefined,
          parentId: this.currentId,
          parentName: this.form.menuName,
          icon: undefined,
          sort: undefined,
          component: undefined,
          type: undefined,
          path: undefined
        }
      }
    }
  }
</script>
<style lang="scss">
.menu_manage{
  .el-row {
    height: 680px;
  }
  .filter-tree{
    margin-top:15px;
    height: 660px;
    overflow: hidden;
    overflow-y: scroll;
  }
}
</style>

