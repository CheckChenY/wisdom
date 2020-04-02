<template>
  <el-dialog
    :title="dealdatas.title"
    :visible.sync="dealdatas.dialogshow"
    width="40%"
    @open="openBefore"
    :before-close="handleClose"
    class="dealStyel"
  >
    <basic-container v-if="dealdatas.ids=='1'">
      <el-main>
        <el-row>
          <el-col :span="24">
            <p class="passon">
              <span>*</span>
              <span>转交给:</span>
            </p>
            <el-select v-model="dealRoel" clearable placeholder="请选择处理人">
              <el-option
                v-for="item in dealRoels"
                :key="item.id"
                :label="item.realName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="remark">
          <el-col :span="24">
            <span>备&nbsp;&nbsp;&nbsp;&nbsp;注:</span>
            <textarea name="dealStyle" id="dealStyle" cols="30" rows="10" placeholder="请输入" v-model="textData"></textarea>
          </el-col>
        </el-row>
      </el-main>
    </basic-container>
    <basic-container v-if="dealdatas.ids=='2'" class="dealscene">
      <el-main>
        <el-row>
          <el-col :span="24">
            <p class="passon">
              <span>*</span>
              <span>处理结果图:</span>
            </p>
            <el-upload
              action
              ref="alart_img"
              :limit="1"
              :multiple="true"
              :show-file-list="false"
              :auto-upload="false"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-change="fileChange"
              class="imgDiv"
            >
              <img width="100%" v-if="planFloor!=''" :src="planFloor" alt>
              <span v-else class="noneImg">
                <i class="el-icon-plus"></i>
              </span>
            </el-upload>
            <!-- <el-dialog :visible.sync="dialogImage">
                          <img width="100%" :src="alarminformation.warnLocaleConfirmPhoto" alt>
            </el-dialog>-->
            <div class="format_describe">
              <h3>格式要求:</h3>
              <ul>
                <li>1.要求现场拍摄告警状态图片,或直接视频截图上传图片。</li>
                <li>2.要求jpg、jpeg或png格式。</li>
              </ul>
            </div>
          </el-col>
        </el-row>
        <el-row class="remark">
          <el-col :span="24">
            <p class="passon">
              <span>*</span>
              <span>处理描述:</span>
            </p>
            <textarea
              name="dealStyles"
              id="dealStyles"
              cols="30"
              rows="10"
              placeholder="请输入"
              v-model="textData"
            ></textarea>
          </el-col>
        </el-row>
      </el-main>
    </basic-container>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dealcancel">取 消</el-button>
      <el-button type="primary" @click="alartSure">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { fetchList } from "@/api/unit/user";
import { updatedeal } from "@/api/monitor/industry";
export default {
  name: "dealstyle",
  props: ["dealdatas"],
  data() {
    return {
      dealRoel: "",
      dealRoels: [],
      dealdata: this.dealdatas,
      planFloor: "",
      textData: "",
      reqData: {
        id: "", //
        warnHandler: "", //处理人
        warnDealDes: "", //处理说明
        warnDealResultPhoto: "" //处理结果图
      }
    };
  },
  created() {},
  mounted() {
    this.getRoles();
  },
  methods: {
    // 取消点击
    dealcancel() {
      this.$emit("dealShow", false);
    },
    // 确定处理
    alartSure() {
      console.log(this.dealdatas);
      if(this.dealdatas.ids==1){
        this.reqData.dealState = 1;
        this.reqData.warnState = this.dealdatas.warnState;
        this.reqData.id = this.dealdatas.id;
        this.reqData.warnHandler = this.dealRoel;
        this.reqData.warnDealDes = this.textData;
        this.reqData.warnDealResultPhoto = this.planFloor;
        console.log(this.reqData)
        // updatedeal(this.reqData).then(res=>{
        //   console.log(res)
        // })
        this.$emit("dealShow", false);
      }
      if(this.dealdatas.ids==2){
        console.log('现场')
        this.reqData.dealState = 2;
        this.reqData.warnState = this.dealdatas.warnState;
        this.reqData.warnHandler = this.dealRoel;
        this.reqData.warnDealDes = this.textData;
        this.reqData.warnDealResultPhoto = this.planFloor;
        console.log(this.reqData)
        // updatedeal(this.reqData).then(res=>{
        //   console.log(res)
        // })
        this.$emit("dealShow", false);
      }
      
    },
    // 弹窗取消按钮
    cancel() {
      this.$emit("dealShow", false);
    },
    // 获取角色
    getRoles() {
      var parmdata = {};
      fetchList(parmdata).then(res => {
        // console.log(res);
        this.dealRoels = res.data.data;
      });
    },

    openBefore() {
      this.$emit("dealShow", true);
    },
    handleClose() {
      this.$emit("dealShow", false);
    },
    // 文件列表中已上传的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogImage = true;
    },
    // 文件移除时钩子
    handleRemove(file,fileList) {
      // console.log(file, fileList);
    },
    // 图片数据转换
    imgDataTrans(file) {
      return new Promise((resolve, reject) => {
        const imgType = "image/jpeg;image/png;image/jpg";
        const isTypeOk = imgType.indexOf(file.raw.type);
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (isTypeOk == -1) {
          this.$message.error("上传图片要求JPG、JPEG或PNG格式!");
          return;
        }
        if (!isLt2M) {
          this.$message.error("上传图片大小不能超过 1MB!");
          return;
        }
        this.getBase64(file.raw).then(
          response => {
            resolve(response);
          },
          error => {
            reject(error);
          }
        );
      });
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
    // 点击图片上传
    fileChange(file) {
      this.$refs.alart_img.clearFiles();
      this.imgDataTrans(file).then(
        res => {
          // console.log(res);
          this.planFloor = res;
          // console.log(this.planFloor);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
};
</script>
<style lang="scss">
.dealStyel {
  .el-main {
    height: 437px;
    overflow: auto;
    .remark {
      position: relative;
      top: 40px;
      span {
        display: inline-block;
        vertical-align: top;
        margin-right: 15px;
      }
      textarea {
        width: 72%;
        border: solid 1px #cccccc;
      }
    }
    .passon {
      display: inline-block;
      margin-right: 15px;
      position: relative;
      top: 6px;
      span:first-child {
        color: red;
      }
    }
  }
  // 现场处理
  .dealscene {
    .el-main {
      .imgDiv {
        display: inline-block;
        vertical-align: top;
      }
      img {
        width: 161px;
        height: 118px;
        border: dashed 1px #cccccc;
        padding: 5px;
      }
      .noneImg {
        display: inline-block;
        width: 161px;
        height: 118px;
        border: dashed 1px #cccccc;
        padding: 5px;
        line-height: 110px;
        font-size: 20px;
        font-size: 58px;
        color: #cccccc;
        i {
        }
      }
      .remark {
        span {
          margin: 0;
        }
      }
      .passon {
        vertical-align: top;
      }
    }
  }
}
</style>