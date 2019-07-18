<template>


  <div class="operation-box">

    <div class="left-search">
      <svg-icon icon-class="operation-filter" class="operation-filter"/>
      <el-dropdown trigger="click" placement="bottom-start" class="dropCampainsMenu" >
        <el-button class="changeStatus">广告状态：<span v-if="status == 'ALL'">所有</span> <span v-if="status == 'ENABLED'">所有已启用</span> <span v-if="status == 'RESERVED'">所有未移除</span>
        </el-button>
        <el-dropdown-menu slot="dropdown" split-button class="el-dropdown-menu">
          <div>
            <el-dropdown-item class="campaign-table-menu"><a class="campaign-menu-status" :class="{ 'is-active' : status=='ALL' }" @click="changeAdStatus('ALL')">所有</a></el-dropdown-item>
            <el-dropdown-item class="campaign-table-menu"><a class="campaign-menu-status" :class="{ 'is-active' : status=='ENABLED' }" @click="changeAdStatus('ENABLED')">所有已启用</a></el-dropdown-item>
            <el-dropdown-item class="campaign-table-menu"><a class="campaign-menu-status" :class="{ 'is-active' : status=='RESERVED' }" @click="changeAdStatus('RESERVED')">所有未移除</a></el-dropdown-item>
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

  export default {
    props: ["status"],
    components:{  },
    data(){
      return {
        is_down:true
      }
    },
    methods :{
      changeDownStatus() {
        this.is_down = !this.is_down;
      },
      changeAdStatus(status){
        this.$emit('setAdStatus',status)
        //this.$store.dispatch("menu/changeAdGroupStatus", status)
      }
    }
  }
</script>
