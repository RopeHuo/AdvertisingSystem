<template>

  <div>
    <div class="add-text-ad-box">

      <div class="edit-ad">
        <el-form  :model="form" :rules="rules" ref="ruleForm">

          <p class="edit-ad-title">新文字广告</p>

          <div class="google-input-box">
            <div class="title">最终到达网址</div>
            <el-form-item  prop="final_urls">
              <el-input
                  class="ad-text"
                  type="text"
                  placeholder="请输入内容"
                  v-model="form.final_urls"
                  maxlength="1000"
              >
              </el-input>
            </el-form-item>


          </div>

          <div class="google-input-box">
            <div class="title">标题1</div>
            <el-form-item  prop="headline">
              <el-input
                  class="ad-text"
                  type="text"
                  placeholder="请输入标题1"
                  v-model="form.headline"
                  maxlength="30"
              >
              </el-input>
            </el-form-item>
          </div>

          <div class="google-input-box">
            <div class="title">标题2</div>
            <el-form-item  prop="headline1">
              <el-input
                  class="ad-text"
                  type="text"
                  placeholder="请输入标题2"
                  v-model="form.headline1"
                  maxlength="30"
              >
              </el-input>
            </el-form-item>
          </div>

          <div class="google-input-box">
            <div class="title">标题3</div>
            <el-form-item  prop="headline2">
              <el-input
                  class="ad-text"
                  type="text"
                  placeholder="请输入标题3"
                  v-model="form.headline2"
                  maxlength="30"
              >
              </el-input>
            </el-form-item>
          </div>

          <div class="google-input-box">
            <div class="title">显示路径</div>
            {{ form.finalUrl }} /
            <el-form-item  class="inlineBlock">
              <el-input class="ad-text-path"
                        type="text"
                        placeholder="请输入显示路径"
                        v-model="form.path1"
                        maxlength="15"
              >
              </el-input>
            </el-form-item>
            /
            <el-form-item  class="inlineBlock">
              <el-input
                  class="ad-text-path"
                  type="text"
                  placeholder="请输入显示路径"
                  v-model="form.path2"
                  maxlength="15"
              >
              </el-input>
            </el-form-item>
          </div>

          <div class="google-input-box">
            <div class="title">广告内容描述第一行</div>
            <el-form-item  prop="description1">
              <el-input
                  class="ad-text"
                  type="text"
                  placeholder="请输入广告内容描述第一行"
                  v-model="form.description1"
                  maxlength="90"
              >
              </el-input>
            </el-form-item>
          </div>

          <div class="google-input-box">
            <div class="title">广告内容描述第二行</div>
            <el-form-item  prop="description2">
              <el-input
                  class="ad-text"
                  type="text"
                  placeholder="请输入广告内容描述第二行"
                  v-model="form.description2"
                  maxlength="90"
              >
              </el-input>
            </el-form-item>
          </div>
        </el-form>

      </div>

      <div class="show-text-ad">
        <show-text-ad :form="form"/>
      </div>
    </div>
  </div>


</template>

<script>

  import ShowTextAd from './show/ShowTextAd'
  import { isUrl } from '@/utils/common'


  export default {
    name: "add-display-ad",
    components:{ ShowTextAd },
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
        form:{
          type:"EXPANDED_TEXT_AD",
          headline:"",
          headline1:"",
          headline2: "",
          description1:"",
          description2:"",
          displayUrl:"",
          final_url:"",
          status:"ENABLE",
          path1:'',
          path2:'',
        },
        rules:{
          description: [
            {required: true, message: '请输入广告内容描述', trigger: 'blur'},
            { min: 0, max: 80, message: '广告内容描述长度在 0 到 80 个字符', trigger: 'blur' }
          ],
          headline: [
            {required: true, message: '请输入第一个标题内容', trigger: 'blur'},
            { min: 0, max: 30, message: '第一个标题长度在 0 到 30 个字符', trigger: 'blur' }
          ],
          description1: [
            {required: true, message: '请输入第一个描述内容', trigger: 'blur'},
            { min: 0, max: 30, message: '第一个描述长度在 0 到 30 个字符', trigger: 'blur' }
          ],
          description2: [
            {required: true, message: '请输入第二个描述内容', trigger: 'blur'},
            { min: 0, max: 30, message: '第二个描述长度在 0 到 30 个字符', trigger: 'blur' }
          ],
          displayUrl: [
            {required: true, message: '请输入显示网址', trigger: 'blur'},
            {validator: checkHttp, trigger: 'blur'}
          ],
          final_urls: [
            {required: true, message: '请输入最终到达网址', trigger: 'blur'},
            {validator: checkHttp, trigger: 'blur'}
          ],
        }
      }
    },
    methods:{
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
