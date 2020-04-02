<template>
  <div class="fire_resource">
    <avue-form :option="fireOption" v-model="fireForm" @submit="handleFireSubmit">
      <template slot="evacuationDiagram" slot-scope="scope">
        <el-upload
            class="avatar-uploader"
            ref="upload"
            action=""
            :limit="1"
            :multiple="true"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleFireImgChange">
            <img v-if="fireForm.evacuationDiagram" :src="fireForm.evacuationDiagram" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              <div class="el-upload__tip0">格式要求：</div>
              <div class="el-upload__tip1">1.图纸原件，复印件不可用，图像清晰可见。</div>
              <div class="el-upload__tip2">2.要求JPG、JPEG或PNG格式。</div>
              <div class="el-upload__tip3">3.上传电子扫描件、电子原件。</div>
            </div>
        </el-upload>
      </template>
    </avue-form>
  </div>
</template>
<script>

  import { fireOption } from '@/const/unit/baseinfo'
  import { getDict } from '@/api/unit/dict'
  import { getFireObj, putFireObj} from '@/api/unit/baseinfo'
  import { mapGetters } from "vuex";
  export default {
    name: "fireResource",
    components: {
    },
    data() {
      return {
        fireOption: fireOption,
        fireForm: {
          id: '',
          orgId: '',
          extinguisherAmount: '',
          hydrantAmount: '',
          exitAmount: '',
          indicatorMark: '',
          stairsAmount: '',
          staircaseForm: '',
          evacuationDiagram: '',
        },
      }
    },
    created() {
      this.getFireObj()
      this.getStairsType()
      this.fireForm.orgId = this.userInfo.orgId
    },
    computed: {
      ...mapGetters([
        "userInfo",
      ]),
    },
    methods: {
      // 消防资源信息保存
      handleFireSubmit () {
        console.log(this.fireForm.evacuationDiagram)
        putFireObj(this.fireForm).then(res => {
          console.log(res)
          this.$message({
            type:'success',
            message:"保存成功"
          })
        })
      },
      // 消防示意图
      handleFireImgChange (file) {
        this.imgDataTrans(file).then(res => {
          this.fireForm.evacuationDiagram = res
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
      // 获取消防资源
      getFireObj () {
        getFireObj().then(res => {
          console.log(res)
          if (res && res.data) {
            this.fireForm = res.data.data
          }
        })
      },
      // 疏散楼梯形式
      getStairsType () {
        getDict('stairs_type').then(res => {
          if (res && res.data) {
            this.fireOption.column[5].dicData=[]
            let data = res.data.data
            this.fireOption.column[5].dicData=data
            // data.forEach(s=>{
            //   s.value=parseInt(s.value)
            //   this.fireOption.column[5].dicData.push(s)
            // })
            // console.log(data)
          }
        })
      },
    }
  }
</script>
<style lang="scss">
.fire_resource{
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
