<template>
  <div>

    <div class="drawer-contents">
      <div class="subheading">添加关键字adgroup_id: {{ select.adgroup_id }} adGroupId: {{ adGroupId }} campaignId:{{ campaignId }}</div>
      <div class="intro"> 要创建相关关键字列表，请在下方添加参考提示。当用户搜索相关字词时，这些关键字便可触发您的广告进行展示。 详细了解 如何选择有效的关键字</div>

      <div @click="dialogGroup =!dialogGroup" class="select-adgroup-btn">
        <div class="" v-if="(adGroupId =='' && select.adgroup_id != '') "> <span>{{ select.campaign_name  }}</span>  >  <span>{{ select.adgroup_name }}</span>  <i class="el-icon-edit" /> </div>
        <div class="" v-if="adGroupId <=0 && select.adgroup_id == 0 "><span>选择一个广告组 </span> <i class="el-icon-edit" /></div>
      </div>

      <div class="editor-container">
        <el-form>
          <el-form-item  prop="criterions">
            <el-input type="textarea" v-model="form.keywords" placeholder="输入或粘贴您的关键字，每行一个字词或词组"     :autosize="{ minRows: 6, maxRows: 20}" >
            </el-input>
          </el-form-item>
        </el-form>
      </div>

      <p class="tips">匹配类型有助于控制哪些搜索可以触发广告</p>
      <p class="match-types"><strong>关键字</strong> = 广泛匹配 &nbsp; <strong>"关键字"</strong> = 词组匹配 &nbsp;  <strong>[关键字]</strong> = 完全匹配 </p>
    </div>

    <div class="save-btn-box">
      <el-button type="primary" @click="saveKeywords">保存</el-button>  <el-button @click="cancel">取消</el-button>
    </div>

    <el-dialog
        title="选择一个广告组"
        :visible.sync="dialogGroup"
        width="365px"
        class="particle-dialog"
       >
      <div class="google-input-box" >
          <el-input class="google-input" placeholder="按名称或广告组ID搜索" maxlength="50" show-word-limit="true"></el-input>
      </div>
      <span class="particle-header-title">{{ origin.table.total  }}个广告组</span>

      <div class="particle-box">
        <div class="particle-list" v-for="(item,index) in origin.table.data" @click="selectAdgroup(index)">
          <span class="start-status li-status"  v-if="'ENABLED' ==item.status"></span>
          <svg-icon icon-class="pause li-status"  v-if="'PAUSED' == item.status" />
          {{ item.adgroup_name }}
        </div>
      </div>

    </el-dialog>


  </div>

</template>

<script>

  import { adGroupList } from '@/api/adgroup'

  export default {
    props: ["campaignId","adGroupId"],
    data(){
      return {
        dialogGroup: false,
        form: {
          keywords: ''
        },
        origin:{
          table:{
            total: 0,
            data: []
          }
        },
        post:{
          loading: false,
          table: {

          }
        },
        select:{
          adgroup_id : 0
        }
      }
    },
    mounted() {
      this.fetchData()
    },
    methods :{
      fetchData() {
        this.post.loading = true
        let params = this.post.table
        adGroupList(params).then(response => {
          if (response.success) {
            this.origin.table = response.data
          }
          this.post.loading = false
        })
      },
      saveKeywords(){

      },
      cancel(){
        this.$emit('setOperationName','')
      },
      selectAdgroup(index) {
        this.select = this.origin.table.data[index]
        this.dialogGroup = false
      }
    }
  }
</script>


<style lang="scss">

  .drawer-contents{
    padding: 16px;

    .subheading{
      font-size: 15px;
      font-weight: 400;
    }

    .intro{
      font-size: 13px;
      font-weight: 400;
      padding: 16px 0;
    }

    .editor-container{
      margin: 10px 0;

    }
    .tips{
      font-size: 12px;
      font-weight: 700;
    }
    .match-types{
      font-size: 12px;
      font-weight: 400;
      padding-right: 8px;
      white-space: nowrap;
    }

    .select-adgroup-btn{
      color: #3367d6;
      cursor: pointer;
      font-size: 13px;
    }
  }

  .save-btn-box{
    background-color: #fff;
    color: #4285f4;
    border-top: 1px solid rgba(0,0,0,.12);
    padding: 14px 10px;
  }


  .particle-header-title{
    height: 40px;
    font-size: 14px;
    display: flex;
    width: 100%;
    border: 1px solid #ecedef;
    line-height: 40px;
    padding-left: 14px;
  }
  .particle-dialog{
    .el-dialog__body{
      padding: 0 !important;
    }
    .particle-box{
      height: 200px;
      cursor: pointer;
      overflow-y: scroll;
    }
    .particle-list{
      height: 40px;
      padding: 10px 5px;
      display: flex;
      flex: 1;
      .li-status{
        margin-right: 10px;
        margin-left: 11px;
        margin-top: 2px;
      }
      &:hover{
        background-color: #f0f1f3;
      }
      &.active{
        background-color: #e5eefd;
      }
    }
  }
</style>


<style lang="scss" scoped>
  ::-webkit-scrollbar {
    width: 5px;
  } /* 这是针对缺省样式 (必须的) */
  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.2);
  } /* 滚动条的滑轨背景颜色 */

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
  } /* 滑块颜色 */

  ::-webkit-scrollbar-button {
    background-color: rgba(0, 0, 0, 0.2);
  } /* 滑轨两头的监听按钮颜色 */

  ::-webkit-scrollbar-corner {
    background-color: black;
  } /* 横向滚动条和纵向滚动条相交处尖角的颜色 */
</style>

