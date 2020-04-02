<template>
  <div class="app-container calendar-list-container base_info">
    <basic-container>
      <avue-tabs :option="option" @change="handleTabChange"></avue-tabs>
      <span v-if="type.prop==='tab1'">
        <avue-form :option="baseOption" v-model="baseForm" @submit="handleBaseSubmit">
          <template slot="regionId" slot-scope="scope">
            <el-cascader
              expand-trigger="hover"
              :options="regionOption"
              v-model="selectedOptions"
              @change="handleAddrChange">
            </el-cascader>
          </template>
          <template slot="position" slot-scope="scope">
            <div class="grid-content">
              <div class="el-input el-input-group el-input-group--append">
                <input type="text" v-model="baseForm.position" autocomplete="off" placeholder="请输入坐标" class="el-input__inner" disabled="disabled">
                <div class="el-input-group__append" @click="mapShow"><i class="el-input__icon el-icon-location position_icon"></i></div>
              </div>
            </div>
          </template>
          <template slot="logo" slot-scope="scope">
            <el-upload
              class="avatar-uploader"
              ref="upload"
              action=""
              :limit="1"
              :multiple="true"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="handleLogoChange">
              <img v-if="baseForm.logo" :src="baseForm.logo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">
                <div class="el-upload__tip0">格式要求：</div>
                <div class="el-upload__tip1">1. 要求JPG、JPEG或PNG格式。</div>
              </div>
            </el-upload>
          </template>
          <template slot="frontImg" slot-scope="scope">
            <el-upload
              class="avatar-uploader"
              ref="upload"
              action=""
              :limit="1"
              :multiple="true"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="handleFrontChange">
              <img v-if="baseForm.frontImg" :src="baseForm.frontImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">
                <div class="el-upload__tip0">格式要求：</div>
                <div class="el-upload__tip1">1. 要求JPG、JPEG或PNG格式。</div>
              </div>
            </el-upload>
          </template>
          <template slot="orgImg" slot-scope="scope">
            <span>
              <img v-if="baseForm.orgImg" :src="baseForm.orgImg" class="avatar" @click="tipNoChange">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">
                <div class="el-upload__tip0">格式要求：</div>
                <div class="el-upload__tip1">1.企业上传营业执照；非企业上传组织机构代码证。</div>
                <div class="el-upload__tip2">2.证书原件，复印件不可用，证书文字、印章清晰可见。</div>
                <div class="el-upload__tip3">3.要求JPG、JPEG或PNG格式。</div>
                <div class="el-upload__tip4">4.上传电子扫描件</div>
              </div>
            </span>
          </template>
        </avue-form>
      </span>
      <span v-else-if="type.prop==='tab2'">
        <general-info></general-info>
      </span>
      <span v-else-if="type.prop==='tab3'">
        <avue-crud
                  ref="crud"
                  :option="keyOption" 
                  :data="data"
                  :page="page"
                  :table-loading="listLoading"
                  @row-update="putKeyPartObj"
                  @search-change="searchKeyChange"
                  @selection-change="selectionKeyChange">
                  <template slot="empty">
                      <avue-empty
                        :image="timeout?'/img/bg/404.svg':'/img/empty.png'"
                        :desc="timeout?'请求超时,请稍后重试······':'暂无数据'"
                        >
                      </avue-empty>
                    </template>
          <template slot="menuLeft">
            <el-button @click="addRow" size="small" plain icon="el-icon-plus" type="primary">添加重点部位</el-button>
          </template>
          <template slot="menuLeft">
            <el-button @click="delMore" size="small" plain icon="el-icon-delete" type="danger">批量删除</el-button>
          </template>
          <template slot-scope="scope" slot="menu">
            <el-button
              type="text"
              icon="el-icon-edit"
              size="small"
              @click="rowCell(scope.row,scope.index)"
              >{{scope.row.$cellEdit?'保存':'编辑'}}</el-button
            >
            <el-button
              type="text"
              icon="el-icon-delete"
              size="small"
              v-if="scope.row.id"
              @click="delKeyPartObj(scope.row)"
              >删除</el-button
            >
          </template>
        </avue-crud>
      </span>
      <span v-else-if="type.prop==='tab4'">
        <fire-resource></fire-resource>
      </span>
    </basic-container>
    <building-map @getPoint="getPoint" @showMap="mapClose" :pointValue="baseForm.position" v-if="showMap"></building-map>
  </div>
</template>
<script>
import { baseOption, keyOption } from '@/const/unit/baseinfo'
import { getDict } from '@/api/unit/dict'
import { getObj, putObj, getKeyPartObj, putKeyPartObj, delKeyPartObj, delBatchUnitKeyPartObj } from '@/api/unit/baseinfo'
import GeneralInfo from '@/components/unit/generalInfo'
import fireResource from '@/components/unit/fireResource'
import buildingMap from '@/components/unit/mapCom/buildingMap'
import { mapGetters } from "vuex";
export default {
  name: "baseinfo",
  components: {
    "general-info": GeneralInfo,
    'fire-resource': fireResource,
    'building-map': buildingMap
  },
  data() {
    return {
      type: {},
      option: {
        column: [{
          // icon:'el-icon-info',
          label: '基础信息',
          prop: 'tab1',
        }, {
          // icon:'el-icon-warning',
          label: '综合信息',
          prop: 'tab2',
        }, {
          // icon:'el-icon-warning',
          label: '重点部位',
          prop: 'tab3',
        }, {
          // icon:'el-icon-warning',
          label: '消防资源',
          prop: 'tab4',
        }]
      },
      baseOption: baseOption,
      baseForm: {
        orgName: '',
        orgType: '',
        orgCode: '',
        logo: '',
        joinDate: '',
        regionId: '',
        address: '',
        position: '',
        phone: '',
        email: '',
        legalPerson: '',
        legalPersonPhone: '',
        businessScope: '',
        orgImg: '',
      },
      generalOption: '',
      regionOption: [],
      selectedOptions: [],
      logo: '',
      data:[],
      keyOption: keyOption,
      page: {
        currentPage: 1,
        pageSize: 5,
        total: 50,
      },
      listLoading: false,
      delMoreList: '',
      showMap: false,
      isAdding:false,
      timeout:false,
      editRegionId:''
    }
  },
  created() {
    this.type = this.option.column[0]
    this.getOrgType()
    this.getAreaType()
    this.getReasonType()
    this.getKeyPartObj(this.page)
  },
  watch: {
  },
  computed: {
    ...mapGetters([
      "userInfo",
    ]),
  },
  mounted() {
    setTimeout(() => {
      this.filter()
    })
  },
  methods: {
    //添加行
    addRow(){
      if(!this.isAdding){
        this.$refs.crud.rowCellAdd();
        this.isAdding=true
      }else{
        this.$message({
          type:'error',
          message:'请填写当前信息'
        })
      }
    },
    //不可修改提示
    tipNoChange(){
      console.log(1234)
      this.$message({
        type:'info',
        message:'信息已注册审核，不可修改'
      })
    },
    // 选择页签
    handleTabChange(column) {
      this.type = column
      if (column.prop == 'tab1') {
        this.getBaseInfo()
      }
    },
    rowCell(row, index) {
      this.$refs.crud.rowCell(row, index)
    },
    // 基础信息保存
    handleBaseSubmit () {
      console.log(this.baseForm)
      if(!this.baseForm.orgType){
        this.$message({
          type:'error',
          message:'请选择单位类型'
        })
      }else if(!this.baseForm.orgCode){
        this.$message({
          type:'error',
          message:'请填写统一社会信用代码/组织机构代码'
        })
      }else if(!this.editRegionId){
        this.$message({
          type:'error',
          message:'请填写所在地区'
        })
      }else if(!this.baseForm.address){
        this.$message({
          type:'error',
          message:'请填写单位地址'
        })
      }else if(!this.baseForm.position){
        this.$message({
          type:'error',
          message:'请填写地理位置坐标'
        })
      }else{
        this.baseForm.regionId=this.editRegionId
        putObj(this.baseForm).then(res => {
          console.log(res)
          if(!parseInt(res.data.code)){
            this.$message({
              type:'success',
              message:'保存成功'
            })
            this.getBaseInfo()
          }else{
            this.$message({
              type:'error',
              message:'保存失败'
            })
          }
        })
      }
    },
    // 获取基础信息详情
    getBaseInfo () {
      getObj().then(res => {
        if (res && res.data) {
          this.editRegionId=res.data.data.regionId
          var sonId=''
          var sonLabel=''
          var parentId=''
          var parentLabel=''
          var grandId=''
          var grandLabel=''
          //获取最低级辖区
          function getSon(arr){
            if(arr.length){
              arr.forEach(s=>{
                if(s.value==res.data.data.regionId){
                  sonLabel=s.label
                  sonId=s.parentId
                }else{
                  if(s.children){
                    return getSon(s.children)
                  }
                }
              })
            }
          }
          getSon(this.regionOption)

          //获取次级辖区
          if(sonId){
            function getParent(arr){
              if(arr.length){
                arr.forEach(s=>{
                  if(s.value==sonId){
                    parentLabel=s.label
                    parentId=s.parentId
                  }else{
                    if(s.children){
                      return getParent(s.children)
                    }
                  }
                })
              }
            }
            getParent(this.regionOption)
          }

          //获取最高级辖区
          if(parentId){
            function getParent(arr){
              if(arr.length){
                arr.forEach(s=>{
                  if(s.value==parentId){
                    grandLabel=s.label
                    grandId=s.parentId
                  }else{
                    if(s.children){
                      return getParent(s.children)
                    }
                  }
                })
              }
            }
            getParent(this.regionOption)
          }
          res.data.data.regionId=(grandLabel?(grandLabel+'/'):'')+(parentLabel?(parentLabel+'/'):'')+sonLabel
          this.baseForm = res.data.data
          // this.areaAnalysis(this.baseForm.regionId)
        }
      })
    },
    // 解析area
    areaAnalysis (regionId) {
      for (let i = 0, len = regionId.length; i < len; i += 2) {
        let str = regionId.slice(0, i + 2)
        if (str.length == 2) {
          this.selectedOptions.push(str + '0000')
        } else if (str.length == 4) {
          this.selectedOptions.push(str + '00')
        } else {
          this.selectedOptions.push(str)
        }
      }
    },
    // 获取单位类型
    getOrgType () {
      getDict('org_type').then(res => {
        if (res && res.data) {
          let list = res.data.data
          this.baseOption.column[1].dicData=res.data.data
          for (let i = 0;i<list.length; i++) {
            if(list[i].label == '监管单位'){
              console.log(i)
              this.baseOption.column[1].dicData.splice(i,1)
              console.log(this.baseOption.column[1].dicData)
            }
          }
        }
      })
    },
    // 获取单位地址
    getAreaType () {
      getDict('area_type').then(res => {
        if (res && res.data) {
          let parent = {
            children: res.data.data
          }
          this.traverseTree(parent)
          this.regionOption = parent.children
          console.log(this.regionOption)
          this.getBaseInfo()
        }
      })
    },
    traverseTree (node){
        if (!node) {
            return;
        }
        if (node.children && node.children.length > 0) {
            var i = 0;
            for (i = 0; i < node.children.length; i++) {
                this.traverseTree(node.children[i]);
            }
        } else {
          delete node.children
        }
    },
    // 获取地址信息
    handleAddrChange () {
      this.baseForm.regionId = this.selectedOptions[this.selectedOptions.length - 1]
    },
    handleFrontChange(file){
      this.imgDataTrans(file).then(res => {
        this.baseForm.frontImg = res
        
      }, error => {
        console.log(error)
      })
    },
    handleLogoChange (file) {
      this.imgDataTrans(file).then(res => {
        this.baseForm.logo = res
        
      }, error => {
        console.log(error)
      })
    },
    handleOrgImgChange (file) {
      this.imgDataTrans(file).then(res => {
        this.baseForm.orgImg = res
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
    // 获取重要部位数据
    getKeyPartObj (page, params) {
      this.listLoading = true;
      getKeyPartObj(Object.assign({
        page: page.currentPage,
        limit: page.pageSize
      }, params)).then(response => {
        this.data = response.data.data;
        this.page.total = response.data.total
        setTimeout(() => {
          this.listLoading = false;
        }, 2500)
      }).catch(error=>{
        this.listLoading = false
        if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
          this.timeout=true
        }
      })
    },
    // 批量删除
    delMore() {
      let ids = []
      for (let i = 0, len = this.delMoreList.length; i < len; i++) {
        ids.push(this.delMoreList[i].id)
      }
      if(ids.length){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delBatchUnitKeyPartObj({"ids": ids.join(',')}).then(res => {
            if (res && res.data && res.data.code == 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getKeyPartObj(this.page)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }else{
        this.$message({
          type: 'info',
          message: '请选择重点部位'
        });    
      }
    },
    // 单个删除
    delKeyPartObj (param) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delKeyPartObj(param.id).then(res => {
          if (res && res.data && res.data.code == 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getKeyPartObj(this.page)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        }); 
      });
    },
    // 添加修改重点部位
    putKeyPartObj (param) {
      param.orgId = this.userInfo.orgId
      putKeyPartObj(param).then(res => {
        if (res && res.data && res.data.code == 0) {
          this.getKeyPartObj(this.page)
          this.isAdding=false
        }
      })
    },
    // 重点部位搜索
    searchKeyChange (params) {
      this.getKeyPartObj(this.page, params)
    },
    // 多选数据
    selectionKeyChange (list) {
      this.delMoreList = list
    },
    // 获取设置原因
    getReasonType () {
      getDict('reason_type').then(res => {
        if (res && res.data) {
          this.keyOption.column[6].dicData = res.data.data
        }
      })
    },
    // 去除h5中 &nbsp;
    filter () {
      let tab0 = document.getElementById('tab-0')
      tab0.innerHTML = tab0.innerHTML.replace(/<i><\/i>&nbsp;/ig, "")
      let tab1 = document.getElementById('tab-1')
      tab1.innerHTML = tab1.innerHTML.replace(/<i><\/i>&nbsp;/ig, "")
    },
    // 显示地图
    mapShow () {
      this.showMap = true
    },
    // 显示地图
    mapClose () {
      this.showMap = false
    },
    // 获取坐标
    getPoint (p) {
      this.showMap = false
      this.baseForm.position = p.lng + ',' + p.lat
    },
  }
}  
</script>
<style lang="scss">
.base_info{
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
  .avue-form .el-button{
    position: relative;
    right: 160px;
  }
  .grid-content{
    display: flex;
    margin-bottom: 20px;
    .el-input-group__append{
      height: 29px;
      line-height: 29px;
    }
    .el-input__icon{
      line-height: 29px;
    }
    .el-select, .el-radio-group, .avatar-uploader{
      position: relative;
      font-size: 14px;
      display: inline-block;
      width: 100%;
    }
    .el-date-editor, .el-cascader{
      position: relative;
      font-size: 14px;
      width: 100%;
    }
    .el-radio-group{
      line-height: 42px;
    }
  }
}
</style>
