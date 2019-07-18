<template>
  <div class="operation-box">

    <!--<operation-add-keywords  />-->

    <div>
      <div class="add" @click="add()">
        <svg-icon icon-class="operation-create" class="operation-create"/>
      </div>
    </div>

    <div class="left-search">
      <svg-icon icon-class="operation-filter" class="operation-filter"/>
      <el-dropdown trigger="click" placement="bottom-start" class="dropCampainsMenu" >
        <el-button class="changeStatus">关键字状态：<span v-if="status == 'ALL'">所有</span> <span v-if="status == 'ENABLED'">所有已启用</span> <span v-if="status == 'RESERVED'">所有未移除</span>
        </el-button>
        <el-dropdown-menu slot="dropdown" split-button class="el-dropdown-menu">
          <div>
            <el-dropdown-item class="campaign-table-menu"><a class="campaign-menu-status" :class="{ 'is-active' : status=='ALL' }" @click="changeKeywordStatus('ALL')">所有</a></el-dropdown-item>
            <el-dropdown-item class="campaign-table-menu"><a class="campaign-menu-status" :class="{ 'is-active' : status=='ENABLED' }" @click="changeKeywordStatus('ENABLED')">所有已启用</a></el-dropdown-item>
            <el-dropdown-item class="campaign-table-menu"><a class="campaign-menu-status" :class="{ 'is-active' : status=='RESERVED' }" @click="changeKeywordStatus('RESERVED')">所有未移除</a></el-dropdown-item>
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

  import OperationAddKeywords from './OperationAddKeywords'

  export default {

    components:{ OperationAddKeywords },
    data(){
      return {
        is_down: true,
        status: "ALL"
      }
    },
    methods :{
      add(){
        this.$emit('setOperationName','add')
      },
      changeDownStatus() {
        this.is_down = !this.is_down;
      },
      changeKeywordStatus(status){
        this.$emit('setKeywordStatus',status)
      }
    }
  }
</script>


<style lang="scss" scoped>
  .add{
    position: absolute;
    top: -18px;
    height: 40px;
    width: 40px;
    text-align: center;

    .operation-create{
      font-size: 36px;
      cursor: pointer;
      transition: box-shadow .28s cubic-bezier(0.4,0,0.2,1);
      &:hover{
        opacity: 0.8;
      }
    }
  }
</style>
