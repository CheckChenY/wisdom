<template>
  <div class="dept_manger">
    <el-container>
      <el-main>
        <el-button-group>
          <el-button size="medium" type="primary" @click="add">添加</el-button>
          <el-button size="medium" type="primary" @click="edit">编辑</el-button>
          <el-button size="medium" type="primary" @click="del">删除</el-button>
        </el-button-group>
        <el-row class="row">
          <el-col :span="4" class="col">
            <div>
              <el-tree
                :data="data"
                :props="defaultProps"
                accordion
                default-expand-all
                @node-click="handleNodeClick" v-if="isTreeShow">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>
                    <i class="y-icon-bumenguanli floder_icon"></i>{{ data.name }}
                  </span> 
                </span>
              </el-tree>
            </div>
          </el-col>
          <el-col class="col" :span="8">
            <div class="grid-content">
              <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" ref="formLabelAlign" :rules="rules">
                <el-form-item label="上级部门">
                  <el-input v-model="formLabelAlign.parentName" :disabled='true'></el-input>
                </el-form-item>
                <el-form-item label="部门名称" prop="deptName">
                  <el-input v-model="formLabelAlign.deptName" :disabled="isdisable"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                  <el-input type="number" class="sort" v-model="formLabelAlign.sort" :disabled="isdisable"></el-input>
                </el-form-item>
              </el-form>
              <div class="dep_save" v-if="saveShow">
                <el-button type="primary" icon="el-icon-edit" @click="save" :loading="isSave">{{buttonName}}</el-button>
                <el-button @click="cancel" icon="el-icon-delete">取消</el-button>
              </div>
            </div>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { fetchTree, addObj, delObj, getObj, putObj } from '@/api/unit/dept'
import {mapGetters} from "vuex";
export default {
  name: "depman",
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        id: 'id',
        sort: 'sort',
      },
      labelPosition: 'right',
      formLabelAlign: {
        parentId: '',
        parentName: '',
        id: '',
        deptName: '',
        sort: ''
      },
      rules: {
        dep: [
          {required: true, message: '请输入部门名称', trigger: 'blur'}
        ],
        sort: [
          {required: true, message: '请输入排序编号', trigger: 'blur'}
        ],
      },
      node: '',
      data1: '',
      isdisable: true,
      isdisablef: true,
      buttonName: '',
      saveShow: false,
      isTreeShow: true,
      deptManager_btn_add: false,
      deptManager_btn_edit: false,
      deptManager_btn_del: false,
      isSave: false,
    };
  },
  created () {
    this.getList();
    this.deptManager_btn_add = this.permission['sys_dept_add']
    this.deptManager_btn_edit = this.permission['sys_dept_edit']
    this.deptManager_btn_del = this.permission['sys_dept_del']
  },
  mounted() {
  },
  computed: {
    ...mapGetters([
      'permission'
    ])
  },
  methods: {
    // 选择部门
    handleNodeClick(data, node) {
      console.log(node.expanded)
      this.data1 = data;
      this.node = node;
      this.buttonName = '编辑';
      this.formLabelAlign.parentName = data.parentId == 0 ? '' : this.node.parent.data.name;
      getObj(data.id).then(res => {
        if (res && res.data) {
          this.formLabelAlign.parentId = res.data.data.parentId;
          this.formLabelAlign.id = res.data.data.id;
          this.formLabelAlign.deptName = res.data.data.deptName;
          this.formLabelAlign.sort = res.data.data.sort;
        }
      })
    },
    // 获取部门列表
    getList () {
      console.log('获取部门列表--0');
      fetchTree().then(res => {
        if (res && res.data) {
          this.data = res.data.data;
          this.isTreeShow = false;
          this.traversalList(this.data);
          setTimeout(() => {
            this.isTreeShow = true;
          }, 10)
        }
      })
    },
    // 添加按钮
    add () {
      // if (!this.data1) {
      //   this.$message('请先选择部门');
      //   return;
      // }
      
      if (this.data1) {
        this.buttonUpdate(true, '保存',
                        this.node.data.id,
                        this.node.data.name,
                        '','');
      } else {
        this.buttonUpdate(true, '保存',
                        '',
                        '',
                        '','');
      }
    },
    // 编辑按钮
    edit () {
      if (!this.data1) {
        this.$message('请先选择部门');
        return;
      }
      this.buttonUpdate(true, '编辑',
                        this.node.data.parentId,
                        this.node.parent.data.name,
                        this.node.data.id,
                        this.node.data.name);
    },
    // 按钮选择后样式数据更新
    buttonUpdate (isdisablef, buttonName, parentId, parentName, id, name) {
      this.isdisable = false;
      // this.isdisablef = isdisablef;
      this.saveShow = true;
      this.buttonName = buttonName;
      this.formLabelAlign.parentId = parentId;
      this.formLabelAlign.parentName = parentName;
      this.formLabelAlign.id = id;
      this.formLabelAlign.deptName = name;
    },
    // 删除按钮
    del () {
      if (!this.data1) {
        this.$message('请先选择部门');
        return;
      }
      if (this.data1.children.length) {
        this.$message('本部门有下属部门，不能进行删除操作');
        return;
      }
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delObj(this.data1.id).then(() => {
          this.getList()
          this.cancel();
          this.resetForm()
          this.$message({
            type:'success',
            message:'删除成功'
          })
        })
      })
    },
    // 保存按钮
    save () {

      this.isSave = true
      switch (this.buttonName) {
        case "编辑":
          // this.data1.label = this.formLabelAlign.deptName;
          // this.data1.sort = this.formLabelAlign.sort;
          this.update();
          break;
        case "保存":
          this.create();
          break;
        default:
          break;
      }
    },
    // 排序方法
    sort (arr) {
      if (arr.length <= 0) {
        return;
      }
      arr.sort((a, b) => a.sort - b.sort);
    },
    // 遍历列表
    traversalList (arr) {
      this.sort(arr);
      for (let i = 0, length = arr.length; i < length; i++) {
        if (arr[i].children) this.traversalList(arr[i].children);
      }
    },
    // 取消按钮
    cancel () {
      this.isdisable = true;
      this.isdisablef = true;
      this.buttonName = '';
      this.saveShow = false;
    },
    update() {
      this.$refs.formLabelAlign.validate((valid) => {
        if (!valid){
          this.isSave = false
          return
        }
        putObj(this.formLabelAlign).then(() => {
          this.isSave = false
          this.getList()
          this.$message({
            type:'success',
            message:'更新成功'
          })
        })
      })

    },
    create() {
      this.$refs.formLabelAlign.validate((valid) => {
        if (!valid){
          this.isSave = false
          return
        }
        addObj(this.formLabelAlign).then((res) => {
          this.isSave = false
          this.getList()
          this.$message({
            type:'info',
            message:res.data.data,
          })
        })
      })
    },
    resetForm() {
      this.formLabelAlign = {
        parentId: this.currentId,
      }
    }
  }
}
</script>
<style scoped lang="scss">
.el-button{
  border-radius: 6px;
  border: 1px solid #409EFF;
  padding: 12px 20px;
}
.row{
  margin-top: 10px;
}
.col{
  margin-top: 15px;
}

.grid-content{
  padding: 20px;
}
.dep_save{
  padding-left: 80px;
}
.dept_manger{
    padding: 0px 10px;
    .el-container{
        background: #fff;
        border-radius: 10px;
        padding: 20px;
    }
    .el-tree-node__content{
        height: 28px;
    }
    .sort{
        input{
            padding: 0px 0px 0px 15px;
        }
    } 
}
</style>
