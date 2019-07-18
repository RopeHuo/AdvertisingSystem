<template>
  <div class="">
    <div class="campaign-flow-construction-view">
      <div class="construction-layout-root">
        <!--选择广告系列类型-->
        <el-collapse >
          <div class="custom-collapse">
            <p>请选择广告系列类型</p>

            <div class="card-box">
              <div class="card-primary" :class="advertisingChannelType=='SEARCH' ?   'active' : '' " @click="changeCampaignType('SEARCH')">
                <div class="show">
                  <span class="channel-header">搜索</span>
                  <div class="channel-card-icon">
                    <img src="../../../../../public/img/search-ad-icon.png" alt="">
                  </div>
                  <div class="channel-description">
                    向对您的产品或服务感兴趣的客户展示文字广告
                  </div>
                </div>

                <div class="hover">
                  <div class="hover-header"><svg-icon icon-class="searchad-blue" class="hover-header-icon"/>搜索</div>
                  通过在 Google.com 搜索结果旁边、Google 搜索网络合作伙伴网站上及其他更多位置展示文字广告或致电广告，来发掘潜在客户
                </div>

              </div>

              <div class="card-primary" :class="advertisingChannelType=='DISPLAY' ?   'active' : '' " @click="changeCampaignType('DISPLAY')">
                <div class="show">
                  <span class="channel-header">展示</span>
                  <div class="channel-card-icon">
                    <img src="../../../../../public/img/display-ad-icon.png" alt="">
                  </div>
                  <div class="channel-description">
                    在整个网络上投放各类广告
                  </div>
                </div>
                <div class="hover">
                  <div class="hover-header"><svg-icon icon-class="displayad-blue" class="hover-header-icon"/>展示</div>
                  通过在整个网络上展示具有视觉冲击力的广告，从目标用户那里收集电子邮件地址及其他相关联系信息
                </div>
              </div>
            </div>
          </div>
        </el-collapse>

        <div class="row-no-background">
          <el-button type="primary" @click="next" :loading="saveLoading">继续</el-button>
          <router-link to="/campaigns/index">
            <el-button >取消</el-button>
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        advertisingChannelType: '',
        saveLoading: false
      }
    },
    methods :{
      changeCampaignType(type){
        this.advertisingChannelType = type
        this.$emit('setAdvertisingChannelType',type)
      },
      next(){
        this.saveLoading = true
        if(!this.advertisingChannelType){
          this.$message({
            message: '请选择广告系列类型',
            type: 'warning'
          });
          this.saveLoading = false
          return
        }
        this.saveLoading = false
        this.$emit('nextStep',2);
      }
    }
  }
</script>


<style lang="scss" scoped>
  .campaign-flow-construction-view{
    padding: 24px;
    .el-collapse{
      margin: 0 auto;
      max-width: 1088px;
      width: 1000px;

      min-width: 776px;
      .custom-collapse{
        padding: 10px 24px;
      }
    }
  }

  .card-box{
    display: flex;
    padding: 10px;

    .card-primary {
      margin-right: 10px;
      background: #fff;
      border: 2px solid #e0e0e0;
      border-radius: 2px;
      box-sizing: border-box;
      height: 172px;
      padding: 8px;
      cursor: pointer;
      width: 236px;
      font-size: 14px;
      display: block;
      .show{
        display: block;
      }
      .hover{
        display: none;
      }
      .channel-header{
        color: #212121;
        font-size: 14px;

        display: block;
        text-align: center;
      }
      .channel-card-icon{
        background: no-repeat center;
        border-radius: 3px;
        display: block;
        height: 80px;
        margin: 8px auto;
        width: 100px;
      }
      .channel-description{
        color: #424242;
        font-size: 14px;
        text-align: center;
      }

      .hover-header{
        color: #4285f4;
        font-size: 15px;
        font-weight: 700;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .hover-header-icon{
          margin-right: 10px;
          font-size: 16px;
        }
      }

      &.active{
        border: 2px solid #4285f4;
      }

      &:hover{
        border: 2px solid #4285f4;
        border-radius: 2px;

        transition-duration: .2s;

        .show{
          display: none;
        }
        .hover{
          display: block;
        }
      }
    }


  }

  .card--secondary {
    background: #fff;


    box-sizing: border-box;
    height: 180px;
    left: -12px;
    opacity: 0;
    padding: 8px;
    position: absolute;
    top: -4px;

    width: 260px;
    display: block;
  }
</style>
