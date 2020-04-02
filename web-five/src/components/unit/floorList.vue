<template>
  <div class="floor_list">
    <el-row :span="24">
      <el-col :xs="24"
              :sm="24"
              :md="5">
        <el-container>
          <el-header>建筑</el-header>
          <el-main>
            <el-input
              class="build_filter"
              placeholder="输入关键字进行过滤"
              v-model="filterText">
            </el-input>
            <el-tree
              :data="treeData"
              :option="treeOption"
              default-expand-all
              @node-click="nodeClick"
              :filter-node-method="filterNode"
              ref="tree">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>
                  <i class="y-icon-17 floder_icon"></i>{{ data.name }}
                </span> 
              </span>
            </el-tree>
          </el-main>
        </el-container>
      </el-col>
      <el-col :xs="24"
              :sm="24"
              :md="19">
        <el-container>
          <el-header>楼层/区域</el-header>
          <el-main>
            <avue-crud
                ref="crud"
                v-if="floorTableShow"
                :option="floorOption" 
                v-model="floorForm"
                :data="data"
                :page="page"
                :table-loading="listLoading"
                @on-load="getList"
                @row-update="save"
                @row-save="save"
                @search-change="handleSearch">
              <template slot="empty">
                  <avue-empty
                  :image="timeout?'/img/bg/404.svg':'/img/empty.png'"
                  :desc="timeout?'请求超时,请稍后重试······':'暂无数据'"
                  >
                </avue-empty>
              </template>
              <template slot="menuLeft">
                <el-button
                          type="primary"  
                          plain
                          @click="handleCreate" 
                          size="small" 
                          icon="el-icon-plus">添加楼层</el-button>
              </template>
              <template slot="plan" slot-scope="scope">
                <div class="avue-crud-img" @click="showImg(scope.row.plan)">
                  <el-button type="info" plain size="mini" icon="el-icon-view">查看</el-button>
                </div>
              </template>
              <template slot="menu"
                        slot-scope="scope">
                <el-button size="mini"
                            type="info"
                            plain
                            icon="el-icon-view"
                            @click="handleView(scope.row,scope.index)">查看
                </el-button>
                <el-button size="mini"
                            type="warning"
                            plain
                            icon="el-icon-edit"
                            @click="handleUpdate(scope.row,scope.index)">编辑
                </el-button>
                <el-button size="mini"
                            type="danger"
                            plain
                            icon="el-icon-delete"
                            @click="handleDelete(scope.row,scope.index)">删除
                </el-button>
              </template>
              <template slot="planForm" slot-scope="scope">
                <img v-if="isView" :src="floorForm.plan" class="avatar">
                <span v-if="!isView">
                    <el-upload
                      class="avatar-uploader"
                      ref="upload"
                      action=""
                      :limit="1"
                      :multiple="true"
                      :show-file-list="false"
                      :auto-upload="false"
                      :on-change="handlePlanImgChange">
                      <img v-if="floorForm.plan" :src="floorForm.plan" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      <div slot="tip" class="el-upload__tip">
                        <div class="el-upload__tip0">格式要求：</div>
                        <div class="el-upload__tip1">1.图纸原件，复印件不可用，图像清晰可见。</div>
                        <div class="el-upload__tip2">2.要求JPG、JPEG或PNG格式。</div>
                        <div class="el-upload__tip3">3.上传电子扫描件、电子原件。</div>
                      </div>
                  </el-upload>
                </span>
              </template>
            </avue-crud>
          </el-main>
        </el-container>
      </el-col>
    </el-row>
    <div class="el-dialog__wrapper plan_dialog" v-if="dialogVisible" style="z-index: 2054;">
      <div role="dialog" aria-modal="true" aria-label="dialog" class="el-dialog" style="margin-top: 15vh;">
        <div class="el-dialog__header">
          <span class="el-dialog__title"></span>
          <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click="closeImg">
            <i class="el-dialog__close el-icon el-icon-close"></i>
          </button>
        </div>
        <div class="el-dialog__body">
          <div class="avue-dialog">
            <img width="100%" :src="plan" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import { floorOption } from '@/const/unit/baseinfo'
  import { mapGetters } from "vuex";
  import { fetchList, addObj, delObj, fetchTree } from '@/api/unit/floor'
  export default {
    name: "FloorList",
    data() {
      return {
        floorForm: {
          floorCode: '', // 楼层/区域编号
          floorArea: '', // 楼层/区域面积
          purpose: '', // 楼层/区域使用功能(用途)
          select: '', // 所属建筑物
          plan: '', // 楼层/区域平面图
        },
        data:[],
        floorOption: floorOption,
        page: {
          currentPage: 1,
          pageSize: 10,
          total: 50,
        },
        listLoading: false,
        treeOption: {
          nodeKey: 'id',
          addBtn: false,
          menu: false,
          props: {
            label: 'name',
            value: 'id'
          }
        },
        treeData: [],
        filterText: '',
        floor_btn_add: false,
        floor_btn_edit: false,
        floor_btn_del: false,
        floorTableShow: false,
        dialogVisible: false,
        plan: '',
        isView:false,
        timeout:false
      }
    },
    created() {
      this.floor_btn_add = this.permission['unit_building_save_add']
      this.floor_btn_edit = this.permission['unit_building_save_edit']
      this.floor_btn_del = this.permission['unit_building_del']
      this.getBuildingTree()
    },
    watch: {
      filterText (val) {
        this.$refs.tree.filter(val)
      }
    },
    computed: {
      ...mapGetters([
        "permission",
      ]),
    },
    mounted() {
    },
    methods: {
      nodeClick(data) {
        this.page.page = 1;
        if (data.id == -1) {
          this.getList(this.page, {});
        } else {
          this.getList(this.page, {buildingId: data.id});
        }
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      // 消防示意图
      handlePlanImgChange (file) {
        this.imgDataTrans(file).then(res => {
          this.floorForm.plan = res
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
      // 搜索功能
      handleSearch (params) {
        this.getList(this.page, params);
      },
      handleDelete(row, index) {
        delObj(row.id).then((res) => {
          if (res && res.data && res.data.code != 1) {
            this.data.splice(index, 1);
            this.$message({
              type:'success',
              message:"删除成功"
            })
          }
        })
      },
      handleUpdate(row, index) {
        this.$refs.crud.rowEdit(row, index);
        this.isView=false
      },
      handleView (row, index) {
        this.$refs.crud.rowView(row, index)
        this.isView=true
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
            this.floorOption.column[3].dicData=[]
            let data = res.data.data
            parent.id = '-1'
            parent.name = data.orgName
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
                this.floorOption.column[3].dicData.push(dict)
              }
            }
          }
          this.treeData.push(parent)
          this.floorTableShow = true
        })
      },
      // 创建楼层/区域
      handleCreate () {
        this.$refs.crud.rowAdd();
      },
      // 获取楼层/区域列表
      getList (page, params) {
        this.listLoading = true
        fetchList(Object.assign({
          page: page.currentPage,
          limit: page.pageSize,
        }, params)).then(res => {
          if (res && res.data && res.data.code != 1) {
            this.data = res.data.data
            this.page.total = res.data.total
            setTimeout(() => {
              this.listLoading = false
            }, 1000)
          }
        }).catch(error=>{
          this.listLoading = false
          if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
            this.timeout=true
          }
        })
      },
      // 保存楼层/区域信息
      save (row, done, loading) {
        addObj(row).then(res => {
          if (res && res.data && res.data.code != 1) {
            this.getList(this.page)
            this.$message({
              type:'success',
              message:"保存成功"
            })
          }
          done()
        }).catch(() => {
          loading()
        })
      },
      // 放大显示图片
      showImg (url) {
        this.plan = url
        this.dialogVisible = true
      },
      // 关闭图片弹窗
      closeImg () {
        this.dialogVisible = false
      }
    }
  }
</script>
<style lang="scss">
.floor_list{
  .el-main {
    padding: 20px !important;
  }
  .build_filter{
    margin-bottom: 20px;
  }
  .plan_dialog {
    .el-dialog__body{
      height: 100%;
      text-align: center;
    }
    .el-dialog__header{
      background-color: #fff;
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #909399 !important;
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
