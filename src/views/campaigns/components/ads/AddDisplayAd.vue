<template>

  <div>
    <div class="add-text-ad-box">


      <div class="edit-ad">
        <el-form  :model="form" :rules="rules" ref="ruleForm">

        <p class="edit-ad-title">新建自适应型展示广告</p>

        <div class="google-input-box">
          <div class="title">广告名称</div>
          <el-form-item  prop="ad_name">
            <el-input
                class="ad-text"
                type="text"
                placeholder="请输入广告名称"
                v-model="form.ad_name"
                maxlength="100"
            >
            </el-input>
          </el-form-item>

        </div>

        <div class="google-input-box">
          <div class="title">最终到达网址</div>
          <el-form-item  prop="final_url">
            <el-input
                class="ad-text"
                type="text"
                placeholder="请输入最终到达网址"
                v-model="form.final_urls"
                maxlength="1000"
            >
            </el-input>
          </el-form-item>

        </div>

        <div class="google-input-box">
          <el-upload
              class="upload-demo"
              :action="post.upload_url"
              :data="post.upload.image"
              :headers="headers"
              :show-file-list="false"
              :on-success="handleImageAdSuccess"
              :before-upload="beforeImageUpload"
              list-type="picture">
            <el-button size="small" type="primary"><i class="el-icon-plus" />图片和徽标</el-button>
            <div slot="tip" class="el-upload__tip"><a @click="openImageRoleDialog">查看更多</a>只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>

        <div class="google-input-box">
          <div class="title">标题</div>

          <el-form-item  prop="headline">
            <el-input
                class="ad-text"
                type="text"
                placeholder="请输入标题"
                v-model="form.headline"
                maxlength="90"
            >
            </el-input>
          </el-form-item>
        </div>

        <div class="google-input-box">
          <div class="title">长标题</div>
          <el-form-item  prop="headline1">
            <el-input
                class="ad-text"
                type="text"
                placeholder="请输入长标题"
                v-model="form.headline1"
                maxlength="90"
            >
            </el-input>
          </el-form-item>

        </div>

        <div class="google-input-box">
          <div class="title">广告内容描述</div>
          <el-form-item  prop="description1">
            <el-input
                class="ad-text"
                type="text"
                placeholder="请输入广告内容描述"
                v-model="form.description1"
                maxlength="90"
            >
            </el-input>
          </el-form-item>
        </div>

        <div class="google-input-box">
          <div class="title">商家名称</div>
          <el-form-item  prop="businessName">
            <el-input
                class="ad-text"
                type="text"
                placeholder="请输入广告内容描述"
                v-model="form.businessName"
                maxlength="90"
            >
            </el-input>
          </el-form-item>
        </div>
        </el-form>



      </div>

      <div class="show-text-ad">
        <show-display-ad/>
      </div>
    </div>


    <image-rule ref="imageRoleDailog"></image-rule>
  </div>


</template>

<script>
  import ShowDisplayAd from './show/ShowDisplayAd'
  import ImageRule from './show/ImageRule'
  import { isUrl } from '@/utils/common'
  import { getToken } from '@/utils/auth'
  import { UploadUrl } from '@/config/default'


  export default {
    name: "add-display-ad",
    data(){
      var checkHttp = (rule, value, callback) => {
        var reg = isUrl(value)
        if (!reg) {
          callback(new Error('请输入正确网址'))
        } else {
          callback()
        }
      };
      return{
        headers: {
          Authorization: "Bearer " + getToken()
        },
        post:{
          upload_url : UploadUrl, // 上传地址
          upload:{
            image:{
              type : 'IMAGE_AD',
              name : 'adImage',
            },
            squareImage:{
              type : 'RESPONSIVE_DISPLAY_AD',
              name : 'squareImage',
            },
            marketingImage:{
              type : 'RESPONSIVE_DISPLAY_AD',
              name : 'marketingImage',
            },
          },
          uploadShow:{
            imageUrl:'', // http://goo.gl/3b9Wfh
            squareImageUrl:'', // http://goo.gl/mtt54n
            marketingImageUrl:'' // http://goo.gl/3b9Wfh
          }
        },
        form:{
          ad_name:'',
          type:"IMAGE_AD", // 图片广告
          headline:"",
          headline1:"",
          description1:"",
          businessName:"", // 商家名称
          final_urls:"https://www.jisale.com", // 最终到达地址
          status:"ENABLE",
          //img_url: 'https://tpc.googlesyndication.com/simgad/2062799269116808092',
          img_url: '/user/28/201906050219374274.png',
        },
        rules:{
          ad_name: [
            {required: true, message: '请输入广告名称', trigger: 'blur'},
            { min: 0, max: 50, message: '广告名称长度在 0 到 50 个字符', trigger: 'blur' }
          ],
          headline: [
            {required: true, message: '请输入标题内容', trigger: 'blur'},
            { min: 0, max: 50, message: '第一个标题长度在 0 到 50 个字符', trigger: 'blur' }
          ],
          headline1: [
            {required: true, message: '请输入长标题内容', trigger: 'blur'},
            { min: 0, max: 80, message: '长标题内容长度在 0 到 80 个字符', trigger: 'blur' }
          ],
          description1: [
            {required: true, message: '请输入描述内容', trigger: 'blur'},
            { min: 0, max: 100, message: '描述长度在 0 到 100 个字符', trigger: 'blur' }
          ],
          final_urls: [
            {required: true, message: '请输入最终到达网址', trigger: 'blur'},
            {validator: checkHttp, trigger: 'blur'}
          ],
        }
      }
    },
    components:{ ShowDisplayAd, ImageRule },
    methods:{
      openImageRoleDialog() {
        this.$refs.imageRoleDailog.type = 'RESPONSIVE_DISPLAY_AD';
        this.$refs.imageRoleDailog.show = true;
      },
      getFormOrigin(){
        let self = this
        var validateResult  = false

        // 校验后
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            validateResult = true
            return true;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        if(validateResult){
          return self.form
        }else{
          return false
        }
      },
      handleImageAdSuccess(res, file) {
        if(!res.success){
          this.$message({type: 'error', message: res.message});
          return
        }
        this.form.img_url = res.data.imgUrl;
        this.post.uploadShow.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeImageUpload(file) {
        this.form.img_url = ''
        this.post.uploadShow.imageUrl = ''
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!(file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif')) {
          this.$message.error('仅仅支持JPG/PNG/GIF格式!');
          return false;
        }
        return true
      },
    }

  }
</script>

<style lang="scss" scoped>
  .add-text-ad-box{
    width: 1000px;
    background-color: #fff;
    display: flex;
    border: 1px solid #d7d7d7;
    .edit-ad{
      padding: 10px;
      flex:2;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      border-right: 1px solid rgba(0,0,0,.12);
      font-size: 13px;
      min-width: 520px;
      width: 520px;
      .edit-ad-title{
        font-size: 16px;
      }

    }
    .show-text-ad{
      flex:3;
      padding: 10px;
      display: flex;
      background-color: #f5f5f5;
      flex-direction: column;
    }
  }


  .google-input-box{
    margin-bottom: 15px;
    width: 100% !important;
    .title{
      color: rgba(0,0,0,.54);
      overflow: hidden;
      display: block;
      max-width: 100%;
      font-size: 12px;
    }
    .ad-text,input{
      font-size: 12px;
      padding-left: 0px !important;
      width: 100% !important;
    }

    .ad-text-path{
      width: 100px;
    }
  }

</style>
