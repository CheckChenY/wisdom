
<template>
  <div class="app-container calendar-list-container role">
    <basic-container class="crud_top">
      <avue-crud :option="tableOption"
                 :data="list"
                 ref="crud"
                 :page="page"
                 :table-loading="listLoading"
                 :before-open="handleOpenBefore"
                 @on-load="getList"
                 @search-change="handleFilter"
                 @refresh-change="handleRefreshChange"
                 @row-update="update"
                 @row-save="create">
                 <template slot="empty">
                    <avue-empty
                      :image="timeout?'/img/bg/404.svg':'/img/empty.png'"
                      :desc="timeout?'请求超时,请稍后重试······':'暂无数据'"
                      >
                    </avue-empty>
                  </template>
        <template slot="menuLeft">
          <el-button
                     class="filter-item"
                     @click="handleCreate"
                     size="small"
                     type="primary"
                     icon="el-icon-plus">添加角色
          </el-button>
        </template>
        <template slot="menu"
                  slot-scope="scope">
          <el-button size="mini"
                     type="text"
                     icon="el-icon-edit"
                     @click="handleUpdate(scope.row,scope.index)">编辑
          </el-button>
          <el-button size="mini"
                     type="text"
                     icon="el-icon-delete"
                     @click="handleDelete(scope.row,scope.index)">删除
          </el-button>
          <el-button size="mini"
                     type="text"
                     icon="el-icon-plus"
                     @click="handlePermission(scope.row,scope.index)">权限
          </el-button>
        </template>
      </avue-crud>
    </basic-container>
    <el-dialog title="分配权限"
              width="400px"
              :visible.sync="dialogPermissionVisible">
      <el-tree class="filter-tree"
               :data="treeData"
               :default-checked-keys="checkedKeys"
               :check-strictly="false"
               node-key="id"
               highlight-current
               :props="defaultProps"
               show-checkbox
               ref="menuTree"
               @check-change="handleCheckChange"
               :filter-node-method="filterNode">
      </el-tree>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="updatePermession(roleId, roleCode)" icon="el-icon-edit">更 新
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {addObj, delObj, fetchList, fetchRoleTree, permissionUpd, putObj} from '@/api/unit/role'
  import {fetchTree, fetchTreePlat} from '@/api/unit/menu'
  import {mapGetters} from 'vuex'
  import {tableOption} from '@/const/unit/role'
  let arr = []

  export default {
    name: 'table_role',
    data() {
      return {
        tableOption: tableOption,
        treeData: [],
        checkedKeys: [],
        defaultProps: {
          label: "name",
          value: 'id'
        },
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10 // 每页显示多少条
        },
        menuIds: '',
        list: [],
        listLoading: true,
        roleId: undefined,
        roleCode: undefined,
        rolesOptions: undefined,
        dialogPermissionVisible: false,
        roleManager_btn_add: false,
        roleManager_btn_edit: false,
        roleManager_btn_del: false,
        roleManager_btn_perm: false,
        timeout:false,
        listQuery: {
          name: undefined
        },
        menuIdJson: []
      }
    },
    created() {
      this.roleManager_btn_add = this.permission['sys_role_add']
      this.roleManager_btn_edit = this.permission['sys_role_edit']
      this.roleManager_btn_del = this.permission['sys_role_del']
      this.roleManager_btn_perm = this.permission['sys_role_perm']
      this.analisysMenuId()
    },
    computed: {
      ...mapGetters(['elements', 'permission'])
    },
    methods: {
      getList(page, params) {
        this.listLoading = true
        fetchList(Object.assign({
          page: page.currentPage,
          limit: page.pageSize
        }, params)).then(response => {
          if (response && response.data && response.data.data) {
            this.list = response.data.data
            this.page.total = response.data.total
          }
          setTimeout(() => {
            this.listLoading = false
          })
        }).catch(error=>{
          this.listLoading = false
          if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
            this.timeout=true
          }
        })
      },
      // 解析菜单id
      analisysMenuId () {
        fetchTreePlat(this.listQuery).then(response => {
          // response.data.data
          response.data.data.forEach(m1 => {
            let item = {
              id: m1.id,
              value: []
            }
            if (m1.children && m1.children.length > 0) {
              m1.children.forEach(m2 => {
                item.value.push(m2.id)
              })
            }
            this.menuIdJson.push(item)
          })
        })
      },
      handleRefreshChange() {
        this.getList(this.page)
      },
      handleFilter(param) {
        this.page.page = 1;
        this.getList(this.page, param);
      },
      handleCreate() {
        this.$refs.crud.rowAdd();
      },
      handleOpenBefore(show, type) {
        console.log(type)
        show();
      },
      handleUpdate(row, index) {
        this.$refs.crud.rowEdit(row, index);
      },
      handlePermission(row) {
        fetchRoleTree(row.roleCode)
          .then(response => {
            if (response && response.data && response.data.data) {
              this.checkedKeys = response.data.data
            }
            return fetchTree()
          })
          .then(response => {
            if (response && response.data && response.data.data) {
              this.treeData = response.data.data
              // 解析出所有的太监节点
              this.checkedKeys = this.resolveAllEunuchNodeId(this.treeData, this.checkedKeys, [])
              arr = []
              this.checkedKeys.forEach(res => {
                if (res[0] >= 0) {
                  arr.push(res[0])
                }
              })
              this.dialogStatus = 'permission'
              this.dialogPermissionVisible = true
              this.roleId = row.id
              this.roleCode = row.roleCode
            }
          })
      },
      /**
       * 解析出所有的太监节点id
       * @param json 待解析的json串
       * @param idArr 原始节点数组
       * @param temp 临时存放节点id的数组
       * @return 太监节点id数组
       */
      resolveAllEunuchNodeId(json, idArr, temp) {
        for (let i = 0; i < json.length; i++) {
          const item = json[i]
          // 存在子节点，递归遍历;不存在子节点，将json的id添加到临时数组中
          if (item.children && item.children.length !== 0) {
            this.resolveAllEunuchNodeId(item.children, idArr, temp)
          } else {
            temp.push(idArr.filter(id => id === item.id))
          }
        }
        return temp
      },
      filterNode(value, data) {
        console.log('权限', value)
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      getNodeData(data, done) {
        done();
      },
      handleDelete(row, index) {
        delObj(row.id).then(() => {
          this.list.splice(index, 1);
          this.$message({
            type:'success',
            message:'删除成功',
          })
        })
      },
      create(row, done, loading) {
        if (row.roleName == 'admin') {
          this.$message({
            type:'error',
            message:'角色名称不能为admin',
          })
          return
        }
        addObj(row).then(() => {
          this.getList(this.page)
          done();
          this.$message({
            type:'success',
            message:'创建成功',
          })
        }).catch(() => {
          loading();
        });
      },
      update(row, index, done, loading) {
        if (row.roleName == 'admin') {
          this.$message({
            type:'error',
            message:'角色名称不能为admin',
          })
          return
        }
        putObj(row).then(() => {
          this.getList(this.page)
          done();
          this.$message({
            type:'success',
            message:'修改成功',
          })
        }).catch(() => {
          loading();
        });
      },
      updatePermession(roleId, roleCode) {
        // this.menuIds = ''
        // this.menuIds = this.$refs.menuTree.getCheckedKeys().join(',').concat(',').concat(this.$refs.menuTree.getHalfCheckedKeys().join(','))
        this.menuIdJson.forEach(res => {
          let num = 0
          for (let i = 0, len = res.value.length; i < len; i++) {
            if (arr.indexOf(res.value[i]) > 0) {
              num++
            }
          }
          if (num > 0) {
            let index = arr.indexOf(res.id)
            if (index == -1 || index == undefined) {
              arr.push(res.id)
            }
          } else {
            let index = arr.indexOf(res.id)
            if (index >= 0) {
              arr.splice(index, 1)
            }
          }
        })
        this.menuIds = arr.join(',')
        permissionUpd(roleId, this.menuIds).then(() => {
          this.dialogPermissionVisible = false
          fetchTree().then(() => {
            return fetchRoleTree(roleCode)
          })
          .then(response => {
            if (response && response.data) {
              this.$message({
                type:'success',
                message:'修改成功',
              })
            }
          })
        })
      },
      handleCheckChange(data, checked, indeterminate) {
        if (!indeterminate) {
          this.menuIDPack(data, checked)
        }
      },
      menuIDPack (data, checked) {
        if (data.children && data.children.length === 0) {
          if (checked) {
            let index = arr.indexOf(data.id)
            if (index == -1 || index == undefined) {
              arr.push(data.id)
            }
          } else {
            let index = arr.indexOf(data.id)
            if (index >= 0) {
              arr.splice(index, 1)
            }
          }
        }
        for (let i = 0; i < data.children.length; i++) {
          const item = data.children[i]
          if (item.children && item.children.length !== 0) {
            this.menuIDPack(item, checked)
          } else {
            if (checked) {
              let index = arr.indexOf(item.id)
              if (index == -1 || index == undefined) {
                arr.push(item.id)
              }
            } else {
              let index = arr.indexOf(item.id)
              if (index >= 0) {
                arr.splice(index, 1)
              }
            }
          }
        }
      }
    }
  }
</script>
<style lang="scss">
.avue-group__item{
  margin-bottom: 0px !important;
  padding: 10px 0px 30px ;
}

</style>
