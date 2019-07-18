<template>
  <div class="">

    <top-step :step="step"/>

    <div>
      <!--第一步广告系列类型-->
      <add-campaigns-step1 v-if="step==1" v-on:nextStep="nextStep" v-on:setAdvertisingChannelType="setAdvertisingChannelType" />

      <!-- -添加广告系列 获取广告系列ID- -->
      <add-campaigns-step2 v-if="step==2"  v-on:nextStep="nextStep"  :advertisingChannelType="params.advertisingChannelType" v-on:setCampaignId="setCampaignId"  />

      <!---添加广告组 获取广告组ID-->
      <add-campaigns-step3 v-if="step==3"  v-on:nextStep="nextStep" :advertisingChannelType="params.advertisingChannelType" :campaignId="params.campaignId"  v-on:setAdGroupId="setAdGroupId"  />

      <!---添加广告-->
      <add-campaigns-step4 v-if="step==4" v-on:nextStep="nextStep" :advertisingChannelType="params.advertisingChannelType"  :campaignId="params.campaignId"  :adGroupId="params.adGroupId" />

      <!--完成-->
      <add-campaigns-step5 v-if="step==5" :campaignId="params.campaignId" />

    </div>
  </div>
</template>

<script>

  import TopStep from './components/AddStep/TopStep'
  import AddCampaignsStep1 from './components/AddStep/AddCampaignsStep1'
  import AddCampaignsStep2 from './components/AddStep/AddCampaignsStep2'
  import AddCampaignsStep3 from './components/AddStep/AddCampaignsStep3'
  import AddCampaignsStep4 from './components/AddStep/AddCampaignsStep4'
  import AddCampaignsStep5 from './components/AddStep/AddCampaignsStep5'

  export default {
    name: 'Campaigns',
    components: { TopStep, AddCampaignsStep1, AddCampaignsStep2, AddCampaignsStep3, AddCampaignsStep4, AddCampaignsStep5 },
    data() {
      return {
        step: 1,
        params: {
          advertisingChannelType : '',
          campaignId: '',
          adGroupId: '',
        }
        // 展示广告
        // params:{
        //   advertisingChannelType : 'DISPLAY',
        //   campaignId:'2040812613 ',
        //   adGroupId:'73829860924',
        // },
       // 搜索广告
       //  params:{
       //    advertisingChannelType : 'SEARCH',
       //    campaignId:'2040581977',
       //    adGroupId:'73625519993',
       //  }
      }
    },
    methods: {
      nextStep(step,params = []){
        this.step = step;
      },
      setAdvertisingChannelType(val){
        this.params.advertisingChannelType = val
      },
      setCampaignId(val){
        this.params.campaignId = val
      },
      setAdGroupId(val){
        this.params.adGroupId = val
      },
      handleSetLineChartData() {

      }
    }
  }
</script>

<style lang="scss">

  .el-collapse-item__header{
    padding-left: 20px !important;
    font-size: 15px;
    font-weight: 400;
    cursor: pointer;
    .field{
      width: 180px;
    }
  }
  .el-collapse-item__content{
    padding-left: 20px !important;
    font-size: 15px;
    font-weight: 400;
    cursor: pointer;
    .collapse-content{
      margin-right: 20px;
      margin-left: 180px;
    }
  }

  .title-content{
    background-color: #0d904f;
    z-index: 10000000;
  }



  .custom-collapse{
    padding: 10px 0;
    margin-bottom: 20px;
    margin-top: 10px;
    background-color: #fff;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12), 0 1px 5px 0 rgba(0,0,0,.2);

    .header{
      padding-left: 20px !important;
      font-size: 15px;
      font-weight: 400;
      cursor: pointer;
      .field{
        display: inline-block;
        width: 180px;
      }
    }

    &.is-active{
      background-color: #00bb00 !important;
      margin-bottom: 20px;
    }
  }

  .el-collapse-item{
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12), 0 1px 5px 0 rgba(0,0,0,.2);
    &.is-active{
      background-color: #00bb00 !important;
      margin-bottom: 20px;
    }
  }

</style>


<style lang="scss">
  ul{
    margin-left: 0;
    padding: 0;
    list-style: none;
  }
</style>
