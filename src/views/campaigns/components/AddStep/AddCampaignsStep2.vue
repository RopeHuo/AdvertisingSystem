<template>
  <div class="">
    <p class="none">广告系列类型</p>
    <div class="campaign-flow-construction-view">

      <div class="construction-layout-root">
        <!--制作广告系列-->
        <div class="custom-collapse">
          <div class="header">
            <span class="field">类型</span>
            <div class="google-input-box">
              <span v-if=" advertisingChannelType== 'DISPLAY'">展示广告系列</span>
              <span v-if=" advertisingChannelType== 'SEARCH'">搜索广告系列</span>
            </div>
          </div>
        </div>


        <add-campaign ref="addCampaign"/>

        <div class="row-no-background margin-top-20">
          <el-button type="primary" @click="saveCampaigns"  :loading="saveLoading">保存并继续</el-button>
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
  import AddCampaign from '../campaigns/AddCampaign'
  import AddGroup from '../adgroups/AddGroup'
  import { addCampaigns } from '@/api/campaigns'

  export default {
    props: {
      advertisingChannelType: {
        type: String,
        default: ''
      }
    },
    components:{ AddCampaignsRightData, AddCampaign, AddGroup },
    data(){
      return {
        saveLoading: false
      }
    },
    methods :{
      handleChange(val) {
        console.log(val);
      },
      saveCampaigns(){
        this.saveLoading = true
        let form = this.$refs.addCampaign.getFormOrigin();
        if(form == false){
          this.saveLoading = true
          return
        }

        form.advertisingChannelType = this.advertisingChannelType
        addCampaigns( form ).then(response => {
          var data = response.data
          if(response.code == 200){
            this.$message({
              message: '添加广告系列成功，请继续完善广告组信息',
              type: 'success'
            });
            // 传送广告系列ID
            this.$emit('setCampaignId',data.campaignId)
            this.$emit('nextStep',3);
          }else{
            this.$message({
              message: response.msg,
              type: 'warning'
            });
          }
          this.saveLoading = false
        })


      },
      cancel(){
        this.$confirm('广告系列未保存, 如果您离开，就会丢失对广告系列所做的更改。要保存更改，请完成广告系列制作过程?', '提示', {
          confirmButtonText: '退出',
          cancelButtonText: '留下',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '正在退出!'
          });
        }).catch(() => {
          // 提交表单 完成后传送Campaigns 或设置全局
          this.$message({
            type: 'info',
            message: '继续设置广告系列'
          });
        });


      }
    }
  }
</script>


<style lang="scss">
  .select-location{
      border: 1px rgba(0,0,0,.12) solid;
      padding: 10px 20px;
      margin:16px 0;
    li{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
    }
  }
</style>

<style lang="scss" scoped>

  .el-collapse{
    margin-top: 20px;
    background-color: transparent;
    margin-bottom: 20px;
  }

  .margin-top-20{
    margin-top: 20px;
  }


</style>
