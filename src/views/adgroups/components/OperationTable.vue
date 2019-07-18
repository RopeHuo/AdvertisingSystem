<template>


  <div class="operation-box">


    <div class="left-search">
      <svg-icon icon-class="operation-filter" class="operation-filter"/>
      <el-dropdown trigger="click" placement="bottom-start" class="dropCampainsMenu" >
        <el-button class="changeStatus">广告组状态：<span v-if="adGroupStatus == 'ALL'">所有</span> <span v-if="adGroupStatus == 'ENABLED'">所有已启用</span> <span v-if="adGroupStatus == 'RESERVED'">所有未移除</span>
        </el-button>
        <el-dropdown-menu slot="dropdown" split-button class="el-dropdown-menu">
          <div>
            <el-dropdown-item class="campaign-table-menu"><a class="campaign-menu-status" :class="{ 'is-active' : adGroupStatus=='ALL' }" @click="changeAdGroupStatus('ALL')">所有</a></el-dropdown-item>
            <el-dropdown-item class="campaign-table-menu"><a class="campaign-menu-status" :class="{ 'is-active' : adGroupStatus=='ENABLED' }" @click="changeAdGroupStatus('ENABLED')">所有已启用</a></el-dropdown-item>
            <el-dropdown-item class="campaign-table-menu"><a class="campaign-menu-status" :class="{ 'is-active' : adGroupStatus=='RESERVED' }" @click="changeAdGroupStatus('RESERVED')">所有未移除</a></el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div class="right-operation">

      <ul>
        <li class="dowandnup" @click="changeDownStatus"><i :class="is_down ?  'el-icon-arrow-down' : 'el-icon-arrow-up'" /></li>
      </ul>

      <span class="spacing" />
      <ul>
        <li><svg-icon icon-class="operation-search"/><span>搜索</span></li>
        <li><svg-icon icon-class="operation-detail"/><span>细分</span></li>
        <li><svg-icon icon-class="operation-column"/><span>列</span></li>
        <li><svg-icon icon-class="operation-report"/><span>报告</span></li>
        <li><svg-icon icon-class="operation-down"/><span>下载</span></li>
        <li><svg-icon icon-class="operation-more"/><span>更多</span></li>
      </ul>
    </div>
  </div>

</template>

<script>
  // import OperationAddCompaigns from './OperationAddCompaigns'
  export default {
    props: ["adGroupStatus"],
    data(){
      return {
        is_down:true
      }
    },
    methods :{
      changeDownStatus() {
        this.is_down = !this.is_down;
      },
      changeAdGroupStatus(status){
        this.$store.dispatch("menu/changeAdGroupStatus", status)
      }
    }
  }
</script>

