<template>
  <div class="">
    <div class="none">
      广告系列类型 {{ advertisingChannelType }} <br/>
      广告系列ID {{ campaignId }} <br/>
      广告组ID {{ adGroupId }} <br/>
    </div>


    <div class="campaign-flow-construction-view">
      <div class="construction-layout-root">
        <div v-if="advertisingChannelType == 'DISPLAY'">
          <add-display-ad ref="addDisplayAd"  />
        </div>

        <div v-if="advertisingChannelType == 'SEARCH'">
          <add-text-ad ref="addTextAd"/>
        </div>

        <div class="row-no-background margin-top-20">
          <el-button type="primary" @click="saveAd" :loading="saveLoading">保存并继续</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import { addAd } from '@/api/ad'
  import AddDisplayAd from '../ads/AddDisplayAd'
  import AddTextAd from '../ads/AddTextAd'

  export default {
    props: ["advertisingChannelType","campaignId","adGroupId"],
    components:{ AddDisplayAd, AddTextAd },
    data(){
      return {
        saveLoading: false,
        cancel(){
          this.$confirm('您的广告将不会保存。要保存更改，请完成广告制作。?', '提示', {
            confirmButtonText: '退出',
            cancelButtonText: '留下',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '正在退出!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '继续设置广告组'
            });
          });
        }
      }
    },
    methods :{
      saveAd(){
        this.saveLoading = true
        var form = {};
        if(this.advertisingChannelType ==  'SEARCH'){
          form = this.$refs.addTextAd.getFormOrigin();
          console.log("SEARCHFORM")
        }else{
          form = this.$refs.addDisplayAd.getFormOrigin();
          console.log("DISPLAYFORM")
        }

        if(form == false){
          this.saveLoading = false
          return
        }

        form.googleAdGroupId = this.adGroupId

        addAd( form ).then(response => {
          var data = response.data
          if(response.code == 200){
            this.$message({
              message: '添加广告',
              type: 'success'
            });
            this.$emit('nextStep',5);
          }else{
            this.$message({
              message: response.msg,
              type: 'warning'
            });
          }
          this.saveLoading = false
        })
        this.saveLoading = false

      }
    }
  }
</script>

<style lang="scss">


</style>

<style lang="scss" scoped>

</style>
