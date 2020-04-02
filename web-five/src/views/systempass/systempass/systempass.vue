<template>
  <div class="app-container calendar-list-container sys_pass">
    <basic-container>
      <avue-crud
                ref="crud"
                :option="option" 
                :data="dataArr"
                :page="page"
                :table-loading="listLoading"
                @row-update="putKeyPartObj"
                @search-change="searchKeyChange">
                <template slot="empty">
                  <avue-empty
                  :image="timeout?'/img/bg/404.svg':'/img/empty.png'"
                  :desc="timeout?'请求超时,请稍后重试······':'暂无数据'"
                  >
                  </avue-empty>
                </template>
        <template slot="menuLeft">
          <el-button @click="addRow" size="small" icon="el-icon-plus" type="primary" plain>添加参数</el-button>
        </template>
        <template slot="menuLeft">
            <el-button
              size="small"
              type='primary'
              plain>
              <a
                download="批量导入参数设置模板.xlsx"
                href="./static/批量导入参数设置.xlsx"
                style="text-decoration:none;">
                <i class="el-icon-download"></i>
                模板下载
              </a> 
            </el-button>  
        </template>
        <template slot="menuLeft">
            <el-upload
              style="display:inline-block"
              class="upload-demo"
              :before-upload="beforeExcelUpload"
              :show-file-list="false"
              accept="xls"
              @on-success="uploadSuccess"
              @on-error="uploadError"
              action=""
              :limit="1">
              <el-button size="small" type="primary" plain><i class="el-icon-edit-outline"></i> 批量导入系统参数</el-button>
            </el-upload>   
            <span style="font-size:12px;color:#666">提示：请按照模板格式进行填写，并上传文件，仅支持Excel文件</span>
        </template>
        <template slot-scope="scope" slot="menu">
          <el-button
            type="warning"
            plain
            icon="el-icon-edit"
            size="small"
            @click="rowCell(scope.row,scope.index)"
            >{{scope.row.$cellEdit?'保存':'编辑'}}</el-button
          >
          <el-button
            type="danger"
            plain
            icon="el-icon-delete"
            size="small"
            v-if="scope.row.id"
            @click="delKeyPartObj(scope.row)"
            >删除</el-button
          >
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>
<script>
import { option } from '@/const/unit/systempass'
import { getDict } from '@/api/unit/dict'
import { fetchTree, addObj,putObj,delObj,moreAddObj } from '@/api/unit/systempass'
import { mapGetters } from "vuex";

export default {
  name: "systempass",
  data() {
    return {
      dataArr:[],
      option: option,
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 50,
      },
      listLoading: false,
      isAdding:false,
      timeout:false
    }
  },
  created() {
    this.getReasonType()
    this.getPage(this.page)
  },
  computed: {
    ...mapGetters([
      "userInfo",
    ]),
  },
  methods: {
    uploadSuccess(){
      this.$message({
        type:'success',
        message:'上传成功'
      })
    },
    uploadError(){
      this.$message({
        type:'error',
        message:'上传失败'
      })
    },
    beforeExcelUpload(file) {
        let obj = new FormData()
        if (file.size > 1024 * 1024) {
          this.$message.error('上传文件大小不能超过1M!');
          return false
        }
        obj.append('file', file)
        moreAddObj(obj).then(res => {
          if (res && res.data && res.data.code === '0') {
            this.$message.success('上传成功');
          } else {
            this.$message.error(res.data.msg);
          }
        })
        return false
      },
    //添加行
    addRow(){
      if(!this.isAdding){
        this.$refs.crud.rowCellAdd();
        this.isAdding=true
      } else {
        this.$message({
          type:'error',
          message:'请填写当前信息'
        })
      }
    },
    rowCell(row, index) {
      this.$refs.crud.rowCell(row, index)
    },
    // 批量导入
    addMore () {

    },
    // 获取重要部位数据
    getPage (page, params) {
      this.listLoading = true;
      fetchTree(Object.assign({
        page: page.currentPage,
        limit: page.pageSize
      }, params)).then(response => {
        response.data.data.forEach(s=>{
          s.deviceTypeId=s.deviceTypeId.toString()
        })
        this.dataArr = response.data.data;
        this.page.total = response.data.total
        this.listLoading = false;
      }).catch(error=>{
        this.listLoading = false
        if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
          this.timeout=true
        }
      })
    },
    // 单个删除
    delKeyPartObj (param) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delObj(param.id).then(res => {
          if (res && res.data && res.data.code == 0) {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            this.getPage(this.page)
          }else{
            this.$message({
              type: 'error',
              message: '删除失败'
            });
            this.getPage(this.page)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        }); 
      });
    },
    // 添加修改
    putKeyPartObj (param) {
      // 修改
      if(param.id){
        putObj(param).then(res => {
          if (res && res.data && res.data.code == 0) {
            this.$message({
              type:'success',
              message:'修改成功'
            })
            this.getPage(this.page)
            this.isAdding=false
          }else{
            this.$message({
              type:'error',
              message:'修改失败'
            })
            this.getPage(this.page)
            this.isAdding=false
          }
        })
      }else{
        // 添加
        addObj(param).then(res => {
          if (res && res.data && res.data.code == 0) {
            this.$message({
              type:'success',
              message:'添加成功'
            })
            this.getPage(this.page)
            this.isAdding=false
          }else{
            this.$message({
              type:'error',
              message:'添加失败'
            })
            this.getPage(this.page)
            this.isAdding=false
          }
        })
      }
    },
    // 重点部位搜索
    searchKeyChange (params) {
      this.getPage(this.page, params)
    },
    // 获取设置原因
    getReasonType () {
      getDict('device_type').then(res => {
        if (res && res.data) {
          this.option.column[0].dicData = res.data.data
        }
      })
    },
  }
}  
</script>
<style lang="scss">
.sys_pass{
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  
  .avue-group__item{
    margin-bottom: 0px;
    padding: 10px 20px 0px;
  }
}
</style>
