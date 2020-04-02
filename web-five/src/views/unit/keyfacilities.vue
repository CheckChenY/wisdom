<template>
  <div class="app-container key_facilities">
    <basic-container>
      <div style="display:flex">
        <avue-tree class="facilities_tree" :data="treeData" :option="treeOption" @node-click="nodeClick"></avue-tree>
        <avue-crud ref="crud"
                  :page="page"
                  :data="tableData"
                  :table-loading="tableLoading"
                  :option="tableOption"
                  v-model="facilityForm"
                  @current-change="currentChange"
                  @refresh-change="refreshChange"
                  @size-change="sizeChange"
                  @row-update="handleUpdate"
                  @search-change="searchChange"
                  @row-save="handleSave"
                  @row-del="rowDel">
          <template slot="empty">
              <avue-empty
                :image="timeout?'/img/bg/404.svg':'/img/empty.png'"
                :desc="timeout?'请求超时,请稍后重试······':'暂无数据'"
                >
              </avue-empty>
          </template>
          <template slot="menuLeft">
            <el-button type="primary"
                      plain
                      @click="handleAdd"
                      icon="el-icon-plus"
                      size="small">添加设施</el-button>
          </template>
          <template slot="facilityPhoto" slot-scope="scope">
            <div class="avue-crud-img" @click="showImg(scope.row.facilityPhoto)">
              <el-button type="text" icon="el-icon-view">查看</el-button>
            </div>
          </template>
          <template slot-scope="scope"
                    slot="menu">
            <el-button type="text"
                      icon="el-icon-check"
                      size="small"
                      @click="handleEdit(scope.row,scope.index)">编辑</el-button>
            <el-button type="text"
                      icon="el-icon-delete"
                      size="small"
                      @click="handleDel(scope.row,scope.index)">删除</el-button>
          </template>
          <template slot="facilityPhotoForm" slot-scope="scope">
            <el-upload
                class="avatar-uploader"
                ref="upload"
                action=""
                :limit="1"
                :multiple="true"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="handleFacilityImg">
                <img v-if="facilityForm.facilityPhoto" :src="facilityForm.facilityPhoto" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div slot="tip" class="el-upload__tip">
                  <div class="el-upload__tip0">格式要求：</div>
                  <div class="el-upload__tip1">1.设备图像清晰可见，周边环境明显。</div>
                  <div class="el-upload__tip2">2.要求JPG、JPEG或PNG格式。</div>
                  <div class="el-upload__tip3">3.图片不大于2M。</div>
                </div>
            </el-upload>
          </template>
          <template slot-scope="scope"
                  slot="floorIdForm">
            <el-select v-model="scope.row.floorId" placeholder="请选择">
              <el-option
                v-for="item in floorData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </avue-crud>
      </div>
    </basic-container>
    <image-view v-if="dialogVisible" :facilityPhoto='facilityPhoto' @closeImage="closeImg"></image-view>
  </div>
</template>

<script>
  import { fetchList, addObj, delObj } from '@/api/unit/keyfacilities'
  import { tableOption } from '@/const/unit/keyfacilities'
  import { mapGetters } from 'vuex'
  import { fetchTree, fetchFloorList } from '@/api/unit/floor'
  import ImageView from '@/components/public/image-view'
  let indexObj = 0, arrayObj = []
  export default {
    name: 'keyfacilities',
    components: {
      'image-view': ImageView
    },
    data() {
      return {
        tableData: [],
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10 // 每页显示多少条
        },
        listQuery: {
          page: 1,
          limit: 10
        },
        tableLoading: false,
        tableOption: tableOption,
        treeData:[],
        treeOption:{
          nodeKey:'id',
          addBtn: false,
          menu: false,
          props:{
            labelText:'标题',
            label:'name',
            value:'id',
            children:'children'
          }
        },
        facilityForm: {
          facilityNum: '', // 设施编号
          facilityName: '', // 设施名称
          buildingId: '', // 所在建筑
          floorId: '', // 设施楼层
          location: '', // 具体位置
          managerNum: '', // 负责人姓名
          managerPhone: '', // 负责人电话
          facilityPhoto: '', // 设施图片
        },
        floorData: [],
        dialogVisible: false,
        facilityPhoto: '',
        timeout:false
      }
    },
    created() {
      this.getFloorTree()
      this.getList(this.listQuery)
      this.getBuildingTree()
    },
    mounted: function() {
      this.tableOption.column[2].change = ({value}) => {
        this.getFloorTree(value)
      }
    },
    computed: {
      ...mapGetters(['permission'])
    },
    methods: {
      getList (params) {
        console.log(params)
        this.tableLoading = true
        fetchList(params).then(response => {
          console.log(response)
          if (response && response.data) {
            this.tableData = response.data.data
            this.page.total = response.data.total
            setTimeout(() => {
              this.tableLoading = false;
            }, 1000)
          }
        }).catch(error=>{
          this.tableLoading = false
          if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
            this.timeout=true
          }
        })
      },
      currentChange(val) {
        this.page.currentPage = val
        this.listQuery.page = val
        this.getList(this.listQuery)
      },
      sizeChange(val) {
        console.log(123)
        console.log(val)
        this.page.pageSize = val
        this.listQuery.limit = val
        this.getList(this.listQuery)
      },
      /**
       * @title 打开新增窗口
       * @detail 调用crud的handleadd方法即可
       *
       **/
      handleAdd: function() {
        this.floorData.splice(0, this.floorData.length)
        this.$refs.crud.rowAdd()
      },
      handleEdit(row, index) {
        this.getFloorTree(row.buildingId)
        this.facilityForm.facilityPhoto = row.facilityPhoto
        this.$refs.crud.rowEdit(row, index)
      },
      handleDel(row, index) {
        this.$refs.crud.rowDel(row, index)
      },
      rowDel: function(row) {
        var _this = this
        this.$confirm('是否确认删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return delObj(row.id)
        }).then(data => {
          if (data && data.data) {
            _this.getList(this.listQuery)
            _this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            })
            this.getList(this.listQuery)
          }
        }).catch(function(err) {
          console.log(err)
        })
      },
      /**
       * @title 数据更新
       * @param row 为当前的数据
       * @param index 为当前更新数据的行数
       * @param done 为表单关闭函数
       *
       **/
      handleUpdate: function(row, index, done) {
        addObj(row).then(data => {
          if (data && data.data) {
            this.getList(this.listQuery)
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            })
          }
          done()
        })
      },
      /**
       * @title 数据添加
       * @param row 为当前的数据
       * @param done 为表单关闭函数
       *
       **/
      handleSave: function(row, done) {
        addObj(row).then(data => {
          if (data && data.data) {
            this.getList(this.listQuery)
            this.$message({
              showClose: true,
              message: '添加成功',
              type: 'success'
            })
          }
          done()
        })
      },
      /**
       * 刷新回调
       */
      refreshChange() {
        this.getList(this.listQuery)
      },
      nodeClick(data){
        if (data.id == -1) {
          this.getList(Object.assign(this.listQuery, {buildingId: ''}))
        } else {
          this.getList(Object.assign(this.listQuery, {buildingId: data.id}))
        }
      },
      // 消防示意图
      handleFacilityImg (file) {
        this.imgDataTrans(file).then(res => {
          this.facilityForm.facilityPhoto = res
        }, error => {
          console.log(error)
        })
      },
      // 图片数据转换
      imgDataTrans (file) {
        return new Promise((resolve, reject) => {
          const imgType = 'image/jpeg;image/png;image/jpg';
          const isTypeOk = imgType.indexOf(file.raw.type);
          const isLt2M = file.size / 1024 / 1024 < 1;
          this.$refs.upload.clearFiles();
          if (isTypeOk == -1) {
            this.$message.error('上传图片要求JPG、JPEG或PNG格式!');
            return
          }
          if (!isLt2M) {
            this.$message.error('上传图片大小不能超过 1MB!');
            return
          }
          this.getBase64(file.raw).then(response => {
            resolve(response)
          }, error => {
            reject(error)
          })
        })
      },
      getBase64(file) {
        return new Promise((resolve, reject) => {
          let reader = new FileReader();
          let imgResult = "";
          reader.readAsDataURL(file);
          reader.onload = function() {
            imgResult = reader.result;
          };
          reader.onerror = function(error) {
            reject(error);
          };
          reader.onloadend = function() {
            resolve(imgResult);
          };
        });
      },
      // 获取建筑树
      getBuildingTree () {
        fetchTree({
          limit: 100,
        }).then(res => {
          let parent = {
            id: '',
            name: '',
            children: [],
          }
          if (res && res.data && res.data.data) {
            let data = res.data.data
            parent.id = '-1'
            parent.name = data.orgName
            this.$set(this.tableOption.column[2].dicData.splice(0, this.tableOption.column[2].dicData.length))
            if (data.building) {
              for (let i = 0, len = data.building.length; i < len; i++) {
                let child = {
                  id: data.building[i].id,
                  name: data.building[i].buildingCode,
                }
                parent.children.push(child)
                let dict = {
                  value: data.building[i].id,
                  label: data.building[i].buildingCode,
                }
                this.tableOption.column[2].dicData.push(dict)
              }
              this.treeData.push(parent)
              arrayObj = this.tableOption.column[2].dicData.concat()
              this.callSelfFloor()
              this.tableOption.column[2].valueDefault = data.building[0].id
              // this.getFloorTree(data.building[0].id)
            }
          }
        })
      },
      // 递归遍历建筑
      callSelfFloor () {
        if (arrayObj[indexObj]) {
          this.getFloorAllTree(arrayObj[indexObj].value).then(() => {
            indexObj++
            if (indexObj > arrayObj.length) {
              arrayObj = []
              indexObj = 0
              return
            }
            this.callSelfFloor()
          })
        }
      },
      // 获取全部楼层
      getFloorAllTree (id) {
        return new Promise((resolve, reject) => {
          fetchFloorList({
            buildingId: id?id:'',
            limit: 200,
          }).then(res => {
            if (res && res.data && res.data.data) {
              let data = res.data.data
              for (let i = 0, len = data.length; i < len; i++) {
                let dict = {
                  value: data[i].id,
                  label: data[i].floorCode,
                }
                if (this.tableOption.column[3].dicData.indexOf(dict) == -1) {
                  this.tableOption.column[3].dicData.push(dict)
                }
              }
              resolve()
            } else {
              reject()
            }
          })
        })
      },
      // 获取楼层
      getFloorTree (id) {
        fetchFloorList({
          buildingId: id?id:'',
          limit: 200,
        }).then(res => {
          if (res && res.data && res.data.data) {
            let data = res.data.data
            this.$set(this.floorData.splice(0, this.floorData.length))
            for (let i = 0, len = data.length; i < len; i++) {
              let dict = {
                value: data[i].id,
                label: data[i].floorCode,
              }
              this.floorData.push(dict)
              this.tableOption.column[3].dicData.push(dict)
            }
          }
        })
      },
      searchChange (params) {
        this.listQuery.page=1
        this.page.currentPage=1
        this.getList(Object.assign(this.listQuery, {facilityNum: params.facilityNum, facilityName: params.facilityName}))
      },
      // 放大显示图片
      showImg (url) {
        this.facilityPhoto = url
        this.dialogVisible = true
      },
      // 关闭弹窗
      closeImg () {
        this.dialogVisible = false
      }
    }
  }
</script>

<style lang="scss">
.key_facilities{
  .facilities_tree{
    width:200px;
    margin-right:10px;
    padding-top:2px;
    .el-input-group__append{
      display: none;
    }
    .el-input-group--append .el-input__inner, .el-input-group__prepend {
        border-radius: 4px;
    }
  }
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
}
</style>
