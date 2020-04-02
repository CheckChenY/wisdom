<template>
  <div class="user">
    <basic-container>
      <el-row :span="24">
        <el-col :xs="24" :sm="24" :md="5" class="user__tree">
          <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
          <el-tree
            :data="treeData"
            :option="treeOption"
            default-expand-all
            @node-click="nodeClick"
            :filter-node-method="filterNode"
            ref="tree"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>
                <i class="y-icon-bumenguanli floder_icon"></i>
                {{ data.name }}
              </span>
            </span>
          </el-tree>
        </el-col>
        <el-col :xs="24" :sm="24" :md="19" class="user__main crud_top">
          <avue-crud
            :option="option"
            ref="crud"
            v-model="form"
            :page="page"
            :table-loading="listLoading"
            @current-change="current_Change"
            @search-change="handleFilter"
            @refresh-change="handleRefreshChange"
            @row-update="update"
            @row-save="create"
            :data="list"
          >
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
                plain
                icon="el-icon-plus"
              >添加用户</el-button>
            </template>
            <template slot="userName" slot-scope="scope">
              <span>{{scope.row.userName}}</span>
            </template>
            <template slot="roleId" slot-scope="scope">
              <span v-for="(role,index) in scope.row.roleList" :key="index">
                <el-tag>{{role.roleName}}</el-tag>&nbsp;&nbsp;
              </span>
            </template>
            <template slot="deptId" slot-scope="scope">{{scope.row.deptName}}</template>
            <template slot="delFlag" slot-scope="scope">
              <el-tag>{{scope.row.delFlag == 9? '锁定': '有效'}}</el-tag>
            </template>
            <template
              slot="createTime"
              slot-scope="scope"
            >{{scope.row.createTime.replace('T', ' ')}}</template>
            <template slot="menu" slot-scope="scope">
              <el-button
                size="small"
                type="warning"
                plain
                icon="el-icon-edit"
                @click="handleUpdate(scope.row,scope.index)"
              >编辑</el-button>
              <el-button
                size="small"
                type="danger"
                plain
                icon="el-icon-delete"
                @click="deletes(scope.row,scope.index)"
              >删除</el-button>
            </template>
          </avue-crud>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>
<script>
import { addObj, delObj, fetchList, putObj } from "@/api/unit/user";
import { deptRoleList } from "@/api/unit/role";
import { fetchTree } from "@/api/unit/dept";
import { tableOption } from "@/const/unit/user";
import { mapGetters } from "vuex";

export default {
  name: "usermanage",
  data() {
    return {
      treeOption: {
        nodeKey: "id",
        addBtn: false,
        menu: false,
        props: {
          label: "name",
          value: "id"
        }
      },
      treeData: [],
      option: tableOption,
      treeDeptData: [],
      checkedKeys: [],
      roleProps: {
        label: "roleName",
        value: "id"
      },
      defaultProps: {
        label: "name",
        value: "id"
      },
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        limit: 10, // 每页显示多少条,
        isAsc: false // 是否倒序
      },
      list: [],
      listLoading: false,
      form: {},
      filterText: "",
      deptIndex: "",
      timeout:false,
      roleDic: {}
    };
  },
  computed: {
    ...mapGetters(["permission"])
  },
  watch: {
    filterText(val) {
      console.log(val);
      this.$refs.tree.filter(val);
    }
  },
  created() {
    this.sys_user_add = this.permission["sys_user_add"];
    this.sys_user_edit = this.permission["sys_user_edit"];
    this.sys_user_del = this.permission["sys_user_del"];
    this.init();
    this.getNodeData(1);
    this.deptIndex = tableOption.column.findIndex(d => d.prop == "deptId");
    this.getList(this.page)
  },
  methods: {
    current_Change(value){
      this.page.currentPage=value
      console.log(value)
      this.getList(this.page)
    },
    init() {
      fetchTree().then(response => {
        this.treeData = response.data.data;
        for (let i = 0, len = this.treeData.length; i < len; i++) {
          this.$set(
            this.option.column[this.deptIndex].dicData,
            i,
            this.treeData[i]
          );
        }
      });
    },
    filterNode(value, data) {
      console.log(data)
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    nodeClick(data) {
      console.log(data)
      this.page.page = 1;
      // this.filterText=data.name
      this.getList(this.page, { deptId: data.id });
    },
    getList(page, params) {
      this.listLoading = true;
      fetchList(
        Object.assign(
          {
            page: page.currentPage,
            limit: page.limit
          },
          params
        )
      ).then(response => {
        console.log(response)
        this.list = response.data.data;
        this.page.total = response.data.total;
        setTimeout(() => {
          this.listLoading = false;
        }, 1000)
      }).catch(error=>{
        this.listLoading = false
        if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
          this.timeout=true
        }
      })
    },
    getNodeData(page) {
      deptRoleList(
        Object.assign({
          page: page,
          limit: 100
        })
      ).then(response => {
        console.log(response.data)
        response.data.data.forEach(s=>{
          s.value=s.id
          s.label=s.roleName
          this.roleDic[s.id] = s.roleName
        })
        this.roleDic[19940912] = '超级管理员'
        this.option.column[6].dicData = response.data.data;
      });
    },
    // 用户搜索
    handleFilter (param) {
      this.page.page = 1;
      this.page.currentPage=1
      this.getList(this.page, param);
    },
    handleRefreshChange () {
      this.getList(this.page);
    },
    handleCreate () {
      this.$refs.crud.rowAdd();
    },
    handleUpdate(row, index) {
      console.log(row.roleList.length)
      if(row.roleList.length){
        row.role = row.roleList[0].id
        this.$refs.crud.rowEdit(row, index);
      }
    },
    create(row, done, loading) {
      if(this.form.password){
        delete this.form["createTime"];
        console.log(this.form);
        this.form.role = [this.form.roleId]
        delete this.form["roleId"];
        addObj(this.form)
          .then((res) => {
            if (res && res.data && res.data.code === '0') {
              this.getList(this.page);
              this.$message({
                showClose: true,
                message: '添加成功',
                type: 'success'
              })
            } else {
              this.$message({
                showClose: true,
                message: res.data.data? res.data.data: '添加失败',
                type: 'error'
              })
            }
            done();
          })
          .catch(() => {
            loading();
          });
      }else{
        this.$message({
          type:'error',
          message:'请输入密码'
        })
      }
    },
    update(row, index, done, loading) {
      delete this.form["createTime"];
      this.form.role = [this.form.roleId]
      delete this.form["roleId"];
      if(!this.form.password){
        delete this.form['password']
      }
      putObj(this.form)
        .then(() => {
          this.getList(this.page);
          done();
          this.$message({
            type:'success',
            message:'修改成功',
          })
        })
        .catch(() => {
          loading();
        });
    },
    deletes(row, index) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delObj(row.id)
          .then(() => {
            this.list.splice(index, 1);
            this.$message({
              type:'success',
              message:'删除成功',
            })
          })
          .catch(() => {
            this.$message({
              type:'error',
              message:'删除失败',
            })
          });
      });
    },
    // 角色弹窗下一页
    currentChange(val) {
      this.getNodeData(val);
    },
    // 选择角色
    selectRole(roles) {
      this.role = roles;
    }
  }
};
</script>
<style lang="scss">
.user {
  height: 100%;

  &__tree {
    padding-top: 3px;
    padding-right: 20px;
    .el-input {
      margin-top: 2px;
      margin-bottom: 15px;
    }
    .el-input__inner {
      height: 32px;
      line-height: 32px;
    }
  }

  &__main {
    .el-card__body {
      padding-top: 0;
    }
    .el-form-item {
      margin-bottom: 22px;
    }

    .el-tag {
      background-color: rgba(64, 158, 255, 0.1);
      padding: 0 10px;
      height: 32px;
      line-height: 30px;
      font-size: 12px;
      color: #409eff;
      border-radius: 4px;
      box-sizing: border-box;
      border: 1px solid rgba(64, 158, 255, 0.2);
      white-space: nowrap;
    }
    .el-table--medium th {
      padding: 10px 0;
    }
  }
}
</style>

