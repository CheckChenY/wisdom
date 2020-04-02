<template>
  <div>
    <div class="building_list">
      <avue-crud
          ref="crud"
          v-if="tableShow"
          :option="buildingOption" 
          :data="data"
          :page="page"
          :table-loading="listLoading"
          @on-load="getBuildingList"
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
                    @click="addBuilding" 
                    size="small" 
                    icon="el-icon-plus">添加建筑</el-button>
        </template>
        <template slot="menu"
                  slot-scope="scope">
          <el-button size="mini"
                      type="info"
                      plain
                      icon="el-icon-view"
                      @click="handleShow(scope.row,scope.index)">查看
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
      </avue-crud>
    </div>
    <el-dialog :visible.sync="addDialog" :title="dialogTitle" width='80%'>
      <div class="add_building">
        <!-- <el-row>
          <el-col :span="1"><div @click="close" class="el-icon-close close_add"></div></el-col>
        </el-row> -->
        <el-container>
          <el-header>建筑基础信息</el-header>
          <el-main>
            <el-row>
              <el-col :span="12">
                <div class="grid-content">
                  <span class="xinghao input_label">建筑编码</span>
                  <el-input v-model="form.buildingCode"
                            placeholder="请输入建筑编码"
                            :disabled="isDisabled"
                            clearable></el-input>
                </div>
                <div class="grid-content">
                  <span class="xinghao input_label">建筑高度</span>
                  <el-input v-model="form.height"
                            placeholder="请输入建筑高度，单位：米"
                            type="number"
                            :disabled="isDisabled"
                            clearable></el-input>
                </div>
                <div class="grid-content">
                  <span class="xinghao input_label">占地面积</span>
                  <el-input v-model="form.areaCovered"
                            placeholder="请输入占地面积，单位：平方米"
                            type="number"
                            :disabled="isDisabled"
                            clearable></el-input>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content">
                  <span class="xinghao input_label">建筑结构类型</span>
                  <el-select v-model="form.structure" clearable :disabled="isDisabled" placeholder="请选择">
                    <el-option
                      v-for="item in structureOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="grid-content">
                  <span class="xinghao input_label">使用性质</span>
                  <el-select v-model="form.usageNature" :disabled="isDisabled" clearable placeholder="请选择">
                    <el-option
                      v-for="item in usageNatureOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="grid-content">
                  <span class="xinghao input_label">建筑层数</span>
                  <el-input v-model="form.floor"
                            :disabled="isDisabled"
                            placeholder="请输入建筑层数，单位：层"
                            type="number"
                            clearable></el-input>
                </div>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
        <el-container>
          <el-header>建筑主体责任人</el-header>
          <el-main>
            <el-row>
              <el-col :span="12">
                <div class="grid-content">
                  <span class="xinghao input_label">产权人姓名</span>
                  <el-input v-model="form.owner"
                            placeholder="请输入姓名"
                            :disabled="isDisabled"
                            clearable></el-input>
                </div>
                <div class="grid-content">
                  <span class="input_label">产权人身份证号</span>
                  <el-input v-model="form.ownerId"
                            placeholder="请输入身份证号"
                            :disabled="isDisabled"
                            maxlength="18"
                            minlength="18"
                            clearable></el-input>
                </div>
                <div class="grid-content">
                  <span class="input_label">产权人联系电话</span>
                  <el-input v-model="form.ownerPhone"
                            placeholder="请输入联系电话"
                            :disabled="isDisabled"
                            type="tel"
                            maxlength="11"
                            clearable></el-input>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content">
                  <span class="xinghao input_label">管理人姓名</span>
                  <el-input v-model="form.admin"
                            :disabled="isDisabled"
                            placeholder="请输入姓名"
                            clearable></el-input>
                </div>
                <div class="grid-content">
                  <span class="input_label">管理人身份证号</span>
                  <el-input v-model="form.adminId"
                            :disabled="isDisabled"
                            placeholder="请输入身份证号"
                            maxlength="18"
                            minlength="18"
                            clearable></el-input>
                </div>
                <div class="grid-content">
                  <span class="input_label">管理人联系电话</span>
                  <el-input v-model="form.adminPhone"
                            :disabled="isDisabled"
                            placeholder="请输入联系电话"
                            type="tel"
                            maxlength="11"
                            clearable></el-input>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="grid-content" v-if="isDisabled">
                  <span class="input_label">产权人照片</span>
                  <div class="avatar-uploader" >
                      <img v-if="form.ownerPhoto" :src="form.ownerPhoto" class="avatar">
                  </div>
                </div>
                <div class="grid-content" v-if="!isDisabled">
                  <span class="input_label">产权人照片</span>
                  <el-upload
                    class="avatar-uploader"
                    ref="ownerPhoto"
                    action=""
                    :limit="1"
                    :multiple="true"
                    :show-file-list="false"
                    :auto-upload="false"
                    :on-change="handleOwnerPhoto">
                    <img v-if="form.ownerPhoto" :src="form.ownerPhoto" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div slot="tip">格式要求：</div>
                    <div slot="tip">1.近期1寸正面免冠照片，电子档。</div>
                    <div slot="tip">2.要求.JPG、.JPEG或PNG格式。</div>
                    <div slot="tip">3.大小不大于2M。</div>
                  </el-upload>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content" v-if="isDisabled">
                  <span class="input_label">管理人照片</span>
                  <div class="avatar-uploader" >
                      <img v-if="form.adminPhoto" :src="form.adminPhoto" class="avatar">
                  </div>
                </div>
                <div class="grid-content" v-if="!isDisabled">
                  <span class="input_label">管理人照片</span>
                  <el-upload
                    class="avatar-uploader"
                    ref="adminPhoto"
                    action=""
                    :limit="1"
                    :multiple="true"
                    :show-file-list="false"
                    :auto-upload="false"
                    :on-change="handleAdminPhoto">
                    <img v-if="form.adminPhoto" :src="form.adminPhoto" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div slot="tip">格式要求：</div>
                    <div slot="tip">1.近期1寸正面免冠照片，电子档。</div>
                    <div slot="tip">2.要求.JPG、.JPEG或PNG格式。</div>
                    <div slot="tip">3.大小不大于2M。</div>
                  </el-upload>
                </div>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
        <el-container>
          <el-header>建筑消防资源</el-header>
          <el-main>
            <el-row>
              <el-col :span="12">
                <div class="grid-content">
                  <span class="input_label">消控室位置</span>
                  <el-input v-model="form.controlRoom"
                            placeholder="请输入位置信息"
                            :disabled="isDisabled"
                            clearable></el-input>
                </div>
                <div class="grid-content">
                  <span class="input_label">烟感报警器数量</span>
                  <el-input v-model="form.smokeSensation"
                            :disabled="isDisabled"
                            placeholder="请输入烟感报警器数量"
                            type="number"
                            clearable></el-input>
                </div>
                <div class="grid-content">
                  <span class="input_label">应急照明灯具数量</span>
                  <el-input v-model="form.emergencyLight"
                            :disabled="isDisabled"
                            placeholder="请输入应急照明灯具数量"
                            type="number"
                            clearable></el-input>
                </div>
                <div class="grid-content">
                  <span class="input_label">消防电梯数量</span>
                  <el-input v-model="form.elevator"
                            :disabled="isDisabled"
                            placeholder="请输入消防电梯数量"
                            type="number"
                            clearable></el-input>
                </div>
                <div class="grid-content">
                  <span class="input_label">疏散楼梯数量</span>
                  <el-input v-model="form.stairs"
                            :disabled="isDisabled"
                            placeholder="请输入疏散楼梯数量"
                            type="number"
                            clearable></el-input>
                </div>
                <div class="grid-content">
                  <span class="input_label">排风风机数量</span>
                  <el-input v-model="form.exhaustFan"
                            :disabled="isDisabled"
                            placeholder="请输入排风风机数量"
                            type="number"
                            clearable></el-input>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content">
                  <span class="input_label">消火栓数量</span>
                  <el-input v-model="form.hydrants"
                            :disabled="isDisabled"
                            placeholder="请输入消火栓数量"
                            type="number"
                            clearable></el-input>
                </div>
                <div class="grid-content">
                  <span class="input_label">灭火器数量</span>
                  <el-input v-model="form.fireExtinguisher"
                            :disabled="isDisabled"
                            placeholder="请输入灭火器数量"
                            type="number"
                            clearable></el-input>
                </div>
                <div class="grid-content">
                  <span class="input_label">疏散指示标记数量</span>
                  <el-input v-model="form.evacuationIndicate"
                            :disabled="isDisabled"
                            placeholder="请输入疏散指示标记数量"
                            type="number"
                            clearable></el-input>
                </div>
                <div class="grid-content">
                  <span class="input_label">安全出口数量</span>
                  <el-input v-model="form.exitMount"
                            :disabled="isDisabled"
                            placeholder="请输入安全出口数量"
                            type="number"
                            clearable></el-input>
                </div>
                <div class="grid-content">
                  <span class="input_label">疏散楼梯形式</span>
                  <el-select v-model="form.stairsForm" :disabled="isDisabled" clearable placeholder="请选择">
                    <el-option
                      v-for="item in stairsFormOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="grid-content">
                  <span class="input_label">送风风机数量</span>
                  <el-input v-model="form.airBlower"
                            :disabled="isDisabled"
                            type="number"
                            placeholder="请输入送风风机数量"
                            clearable></el-input>
                </div>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
        <el-row class="button_row">
          <el-col class="button_col">
            <el-button type="primary" icon="el-icon-check" v-if="handleType == 'create'" @click="saveInfo">提交</el-button>
            <el-button type="primary" icon="el-icon-check" v-if="handleType == 'update'" @click="saveInfo">修改</el-button>
            <!-- <el-button icon="el-icon-close" @click="close">取消</el-button> -->
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>  
</template>
<script>

  import { buildingOption } from '@/const/unit/baseinfo'
  import GeneralInfo from '@/components/unit/generalInfo'
  import fireResource from '@/components/unit/fireResource'
  import { delObj, fetchList } from '@/api/unit/building'
  import { getDict } from '@/api/unit/dict'
  import { mapGetters } from "vuex";
  import { addObj, getObj } from '@/api/unit/building'
  // import { getDict } from '@/api/unit/dict'
  export default {
    name: "BuildingList",
    components: {
      "general-info": GeneralInfo,
      'fire-resource': fireResource
    },
    data() {
      return {
        type: {},
        option: {
          column: [{
            // icon:'el-icon-info',
            label: '建筑列表',
            prop: 'tab1',
          }, {
            // icon:'el-icon-warning',
            label: '楼层列表',
            prop: 'tab2',
          }]
        },
        baseForm: {
          orgName: '',
          orgType: '',
          orgCode: '',
          logo: '',
          joinDate: '',
          regionId: '',
          address: '',
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
        buildingOption: buildingOption,
        page: {
          currentPage: 1,
          pageSize: 10,
          total: 50,
        },
        listLoading: false,
        building_btn_add: false,
        building_btn_edit: false,
        building_btn_del: false,
        tableShow: false,
        addDialog:false,
        form: {
          // id: '',
          // orgId: '', // 所属组织机构
          buildingCode: '', // 建筑编码
          position: '', // 地理位置
          usageNature: '', // 使用性质
          structure: '', // 建筑结构类型
          areaCovered: '', // 占地面积
          height: '', // 建筑高度
          floor: '', // 建筑层数
          owner: '', // 产权人
          ownerId: '', // 产权人身份证
          ownerPhone: '', // 产权人电话
          ownerPhoto: '', // 产权人身份证或者图片
          admin: '', // 管理人
          adminId: '', // 管理人身份证号
          adminPhone: '', // 管理人联系电话
          adminPhoto: '', // 管理人照片
          controlRoom: '', // 消控室位置
          hydrants: '', // 消火栓数量
          smokeSensation: '', // 烟感报警器数量
          fireExtinguisher: '', // 灭火器数量 
          emergencyLight: '', // 应急照明灯具数量
          evacuationIndicate: '', // 疏散指示标记数量
          elevator: '', // 消防电梯数量
          exitMount: '', // 安全出口数量
          stairs: '', // 疏散楼梯数量
          stairsForm: '', // 疏散楼梯形式
          airBlower: '', // 送风风机数量
          exhaustFan: '', // 排风风机数量
        },
        handleType:'',
        usageNatureOptions: [], // 使用性质list
        structureOptions: [], // 建筑结构类型list
        stairsFormOptions: [], // 疏散楼梯形式list
        dialogTitle:'',
        timeout:false,
        isDisabled:false,
      }
    },
    created() {
      this.building_btn_add = this.permission['unit_building_save_add']
      this.building_btn_edit = this.permission['unit_building_save_edit']
      this.building_btn_del = this.permission['unit_building_del']
      this.type = this.option.column[0]
      let p = Promise.all([this.getStructureType(), this.getBuildingType()])
      p.then(() => {
        this.tableShow = true
      })
      this.getStairsType()
      this.getStructureType()
      this.getBuildingType()
      if (this.handleType == 'update') {
        this.getInfo()
      }
    },
    watch: {
    },
    computed: {
      ...mapGetters([
        "permission",
      ]),
    },
    mounted() {
    },
    methods: {
      // 获取建筑信息详情
      getInfo () {
        getObj(this.buildId).then(res => {
          if (res && res.data && res.data.data) {
            this.form = res.data.data
          }
        })
      },
      // 关闭添加页面
      // close () {
      //   this.$emit('addClose')
      // },
      // 校验数据
      checkData () {
        if (!this.form.buildingCode) {
          this.$message.error('请填写建筑编码');
          return
        }
        //  else if (!this.form.position) {
        //   this.$message.error('请选择地理位置');
        //   return
        // }
        else if (!this.form.usageNature) {
          this.$message.error('请选择使用性质');
          return
        } else if (!this.form.structure) {
          this.$message.error('请选择建筑结构类型');
          return
        } else if (!this.form.areaCovered) {
          this.$message.error('请填写占地面积');
          return
        } else if (!this.form.height) {
          this.$message.error('请填写建筑高度');
          return
        } else if (!this.form.floor) {
          this.$message.error('请填写建筑层数');
          return
        } else if (!this.form.owner) {
          this.$message.error('请填写产权人');
          return
        } else if (!this.form.admin) {
          this.$message.error('请填写管理人');
          return
        }
        addObj(this.form).then(res => {
          if (res && res.data && res.data.code != 1) {
            this.$message({
              type:'success',
              message:'保存成功'
            })
            this.addDialog=false
            this.getBuildingList(this.page)
          }
        })
      },
      // 提交信息
      saveInfo () {
        this.checkData()
      },
      // 图片数据转换
      imgDataTrans (file) {
        return new Promise((resolve, reject) => {
          const imgType = 'image/jpeg;image/png;image/jpg';
          const isTypeOk = imgType.indexOf(file.raw.type);
          const isLt2M = file.size / 1024 / 1024 < 1;
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
      // 产权人照片 
      handleOwnerPhoto (file) {
        this.$refs.ownerPhoto.clearFiles();
        this.imgDataTrans(file).then(res => {
          this.form.ownerPhoto = res
        }, error => {
          console.log(error)
        })
      },
      // 管理人照片
      handleAdminPhoto (file) {
        this.$refs.adminPhoto.clearFiles();
        this.imgDataTrans(file).then(res => {
          this.form.adminPhoto = res
        }, error => {
          console.log(error)
        })
      },
      // 疏散楼梯形式
      getStairsType () {
        getDict('stairs_type').then(res => {
          if (res && res.data) {
            this.stairsFormOptions = res.data.data
          }
        })
      },
      // 建筑结构类型
      // getStructureType () {
      //   getDict('structure_type').then(res => {
      //     if (res && res.data) {
      //       this.structureOptions = res.data.data
      //     }
      //   })
      // },
      // 使用性质
      // getBuildingType () {
      //   getDict('building_type').then(res => {
      //     debugger
      //     if (res && res.data) {
            
      //     }
      //   })
      // },
      // 添加建筑信息
      addBuilding() {
        this.form={
          // id: '',
          // orgId: '', // 所属组织机构
          buildingCode: '', // 建筑编码
          position: '', // 地理位置
          usageNature: '', // 使用性质
          structure: '', // 建筑结构类型
          areaCovered: '', // 占地面积
          height: '', // 建筑高度
          floor: '', // 建筑层数
          owner: '', // 产权人
          ownerId: '', // 产权人身份证
          ownerPhone: '', // 产权人电话
          ownerPhoto: '', // 产权人身份证或者图片
          admin: '', // 管理人
          adminId: '', // 管理人身份证号
          adminPhone: '', // 管理人联系电话
          adminPhoto: '', // 管理人照片
          controlRoom: '', // 消控室位置
          hydrants: '', // 消火栓数量
          smokeSensation: '', // 烟感报警器数量
          fireExtinguisher: '', // 灭火器数量 
          emergencyLight: '', // 应急照明灯具数量
          evacuationIndicate: '', // 疏散指示标记数量
          elevator: '', // 消防电梯数量
          exitMount: '', // 安全出口数量
          stairs: '', // 疏散楼梯数量
          stairsForm: '', // 疏散楼梯形式
          airBlower: '', // 送风风机数量
          exhaustFan: '', // 排风风机数量
        },
        this.dialogTitle = '新增建筑'
        this.addDialog=true
        this.isDisabled=false
        this.handleType='create'
        // this.$emit('buildingAdd')
      },
      getBuildingList (page, params) {
        this.listLoading = true
        fetchList(Object.assign({
          page: page.currentPage,
          limit: page.pageSize
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
      handleDelete(row, index) {
        delObj(row.id).then((res) => {
          if (res && res.data && res.data.code != 1) {
            this.data.splice(index, 1);
            this.$message({
              type:'success',
              message:'删除成功'
            })
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
      // 搜索功能
      handleSearch (params) {
        this.getBuildingList(this.page, {buildingCode: params.buildingCode})
      },
      handleUpdate(row) {
        this.dialogTitle = '编辑建筑'
        this.handleType = 'update'
        this.buildId=row.id
        this.getInfo()
        this.addDialog=true
        this.isDisabled=false
        // this.$emit('buildingAdd', {buildId: row.id})
      },
      // 查看建筑详情
      handleShow (row) {
        console.log(row)
        this.dialogTitle = '查看建筑'
        this.handleType = ''
        this.buildId=row.id
        this.getInfo()
        this.addDialog=true
        this.isDisabled=true
        // this.$emit('buildingShow', {buildId: row.id})
      },
      // 建筑结构类型
      getStructureType () {
        return new Promise((resolve, reject) => {
          getDict('structure_type').then(res => {
            if (res && res.data) {
              this.structureOptions = res.data.data
              this.buildingOption.column[2].dicData = res.data.data
              resolve()
            } else {
              reject()
            }
          })
        })
      },
      // 使用性质
      getBuildingType () {
        return new Promise((resolve, reject) => {
          getDict('building_type').then(res => {
            if (res && res.data) {
              this.usageNatureOptions = res.data.data
              this.buildingOption.column[1].dicData = res.data.data
              resolve()
            } else {
              reject()
            }
          })
        })
      },
    }
  }
</script>
<style lang="scss">
// .building_list{
// }
</style>
<style lang="scss">
    .add_building{
      overflow-y: scroll;
      height: 700px;
      &::-webkit-scrollbar{
        display: none;
      }
      .close_add{
        border: solid 1px #aaa;
        height: 20px;
        line-height: 20px;
        width: 20px;
        text-align: center;
        border-radius: 50%;
        margin-left: 20px;
      }
      
      .el-header {
        color: #333;
        text-align: left;
        font-weight: 900;
        line-height: 60px;
      }
      .el-main{
        border-bottom: 1px solid #eee;
      }
      .grid-content{
        display: flex;
        margin-bottom: 20px;
        .input_label{
          font-size: 14px;
          color: #606266;
          width: 380px;
          text-align: right;
          padding-right: 10px;
          line-height: 40px;
          margin-right: 0px !important;
        }
        .xinghao:before{
          content: '*';
          color: #f56c6c;
          margin-right: 4px;
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
      .button_col{
        text-align: center;
        margin-top: 20px;
      }
    }
    .position_icon{
      font-size: 20px;
    }
    </style>
    