<template>
  <div class="">

    <el-form  :model="form" :rules="rules" ref="ruleForm">

    <div class="group-title">
      <p>制作搜索广告组</p>
      <div class="font-small"> 一个广告组包含一个或多个广告以及一组相关的关键字。要获得最佳效果，请尽量让一个广告组中的所有广告和关键字均围绕一种产品或服务。</div>
    </div>

     <div class="custom-collapse search-adgroup-box-one">
      <div class="header">
        <span class="field">广告组名称</span>
        <div class="google-input-box" >
          <el-form-item  prop="adGroupName">
            <el-input class="google-input" v-model="form.adGroupName"  placeholder="请输入广告组名称" maxlength="50" show-word-limit="true"></el-input>
          </el-form-item>
        </div>
      </div>
     </div>

      <div class="custom-collapse search-adgroup-box-two">
        <div class="header">

          <div class="google-input-box" style="width: 96%">
            <el-form-item  prop="criterions">
              <el-input
                  type="textarea"
                  placeholder="输入或粘贴您的关键字，每行一个字词或词组"
                  v-model="form.criterions"
                  maxlength="30"
                  show-word-limit
                  :autosize="{ minRows: 6, maxRows: 20}"
              >
              </el-input>
            </el-form-item>

            <p>匹配类型有助于控制哪些搜索可以触发广告</p>
            <p><strong>关键字</strong> = 广泛匹配 &nbsp; <strong>"关键字"</strong> = 词组匹配 &nbsp;  <strong>[关键字]</strong> = 完全匹配 </p>
          </div>
        </div>
      </div>


    </el-form>

  </div>
</template>

<script>

  export default {
    data(){
      return{
        activeName: [],
        form:{
          googleCampaignId: 2037911174,
          adGroupName: '',
          criterions:[],
          status:'ENABLED', // 默认启动
          matchType: '',
          microAmount: '',
        },
        rules: {
          adGroupName: [
            { required: true, message: '请输入广告组名称', trigger: 'blur' },
            { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          ],
          criterions: [
            { required: false, message: '请输入关键字', trigger: 'blur' },
          ]
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-adgroup-box-one{

    margin-bottom: 0;
    box-shadow: initial;
  }

  .search-adgroup-box-two{
    margin-top: 0;
    box-shadow: initial;
  }

</style>
