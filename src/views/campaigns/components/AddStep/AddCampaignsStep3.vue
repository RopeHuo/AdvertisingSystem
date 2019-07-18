<template>
  <div class="">
    <p class="none">广告系列类型 {{ advertisingChannelType }} <br/>
      广告系列ID {{ campaignId }} <br/></p>
    <div class="campaign-flow-construction-view">
      <div class="construction-layout-root">
        <!---制作展示广告广告组-->
        <add-group ref="addDisplayAdGroup" :advertisingChannelType="advertisingChannelType" />

        <!--搜索广告广告组-->
        <!--<add-search-group ref="addSearchAdGroup" />-->

        <div class="row-no-background margin-top-20">
          <el-button type="primary" @click="saveAdGroup"  :loading="saveLoading">保存并继续</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>

      </div>

      <div class="reach-widget-sidebar">
        <div class="reach-fixed">
          <add-campaigns-right-data/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

  import AddCampaignsRightData from './AddCampaignsRightData'
  import AddGroup from '../adgroups/AddGroup'
  // import AddSearchGroup from '../adgroups/AddSearchGroup'
  import { addAdGroup } from '@/api/adgroup'

  export default {
    props: ["advertisingChannelType","campaignId"],
    components:{ AddCampaignsRightData, AddGroup },
    data(){
      return {
        saveLoading: false
      }
    },
    methods :{
      handleChange(val) {
        console.log(val);
      },
      cancel(){
        this.$confirm('您的广告组将不会保存。要保存更改，请完成广告组制作。?', '提示', {
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
      },
      saveAdGroup(){
        this.saveLoading = true


        let form = this.$refs.addDisplayAdGroup.getFormOrigin();
        if(form == false){
          this.saveLoading = false
          return
        }
        // 广告系列ID
        form.googleCampaignId = this.campaignId
        form.advertisingChannelType = this.advertisingChannelType
        addAdGroup( form ).then(response => {
          var data = response.data
          if(response.code == 200){
            this.$message({
              message: '添加广告组成功',
              type: 'success'
            });
            this.$emit('setAdGroupId',data.adGroupId);
            this.$emit('nextStep',4);
          }else{
            this.$message({
              message: response.msg,
              type: 'warning'
            });
          }
        })
        this.saveLoading = true

      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
