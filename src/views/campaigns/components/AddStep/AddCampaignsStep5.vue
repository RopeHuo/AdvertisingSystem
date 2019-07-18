<template>
  <div class="">

    <div class="campaign-flow-construction-view">

      <div class="construction-layout-root">

        <h3 class="h3">即将大功告成</h3>

        <div class="row">
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <p>广告系列名称： {{ campaign.campaignName }}</p>
                <!--<p><i class="el-icon-date" /> 2019年开始-无结束时间</p>-->
                <p><i class="el-icon-location" />  <span v-for="item in campaign.locations "> {{ item }}</span></p>
                <p><svg-icon icon-class="peoples" />   <span v-for="item in campaign.languages "> {{ item }}</span></p>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">
                <div class="grid-detail">
                  <p class="grid-detail-title">系列类型</p>
                  <p>
                    <span v-if="campaign.advertisingChannelType=='DISPLAY'">展示广告</span>
                    <span v-if="campaign.advertisingChannelType=='SEARCH'">搜索广告</span>
                  </p>
                </div>
                <div class="grid-detail">
                  <p class="grid-detail-title">广告系列类型</p>
                  <p>
                    标准
                  </p>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple-light">
                  <div class="grid-detail">
                    <p class="grid-detail-title">广告系列预算</p>
                    <p>￥ {{ campaign.amount }}</p>
                  </div>
                  <div class="grid-detail">
                    <p class="grid-detail-title">出价策略</p>
                    <p>
                      <span v-if="campaign.biddingStrategyType === 'MANUAL_CPC'">按点击次数出价</span>
                      <span v-if="campaign.biddingStrategyType === 'MANUAL_CPM'">按可见展示次数出价</span>
                    </p>
                  </div>
                </div>

              </div>
            </el-col>
          </el-row>
        </div>

        <div class="row-no-background">
          <router-link to="/campaigns/index">
            <el-button type="primary">前往广告系列</el-button>
          </router-link>
        </div>

      </div>

    </div>
  </div>
</template>

<script>

  import { getCampaign } from '@/api/campaigns'

  export default {
    props: ["campaignId"],
    data(){
      return {
        campaign: {

        }
      }
    },
    mounted() {
      this.getCampaignDetail()
    },
    methods :{
      handleChange(val) {


      },
      getCampaignDetail(){
        getCampaign(this.campaignId).then(response => {
          this.campaign = response.data
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .row{
    background-color: #fff;
  }
  .row-no-background{
    margin-top: 20px;
  }
  .h3{
    font-weight: 300;
  }
  .grid-detail{
    font-size: 13px;
    .grid-detail-title{

      font-weight: 400;
      color: rgba(0,0,0,.54);
    }
  }
</style>
