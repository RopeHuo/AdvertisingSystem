<template>

  <el-row :gutter="40" class="panel-group">
    <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col">
      <div class="card-panel panel-blue" @click="handleSetLineChartData('clicks')">
        <div class="panel-title">点击次数</div>
        <div class="panel-number">0</div>
      </div>
    </el-col>
    <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col">
      <div class="card-panel panel-red" @click="handleSetLineChartData('impressions')">
        <div class="panel-title">展示次数</div>
        <div class="panel-number">0</div>
      </div>
    </el-col>
    <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col">
      <div class="card-panel panel-orange" @click="handleSetLineChartData('ctr')">
        <div class="panel-title">平均点击费用</div>
        <div class="panel-number">￥0.00</div>
      </div>
    </el-col>
    <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col">
      <div class="card-panel panel-green" @click="handleSetLineChartData('cost')">
        <div class="panel-title">费用</div>
        <div class="panel-number">￥0.00</div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  margin-left: 0px !important;
  margin-right: 0px !important;
  background-color: #fff;
  .card-panel-col {
    max-width: 184px;
    background-color: #000;
    padding-left: 0px !important;
    padding-right: 0px !important;

  }

  .panel-blue{
    background-color: #3b78e7 !important;
  }
  .panel-red{
    background-color: #d23f31 !important;
  }
  .panel-orange{
    background-color: #f2a600 !important;
  }
  .panel-green{
    background-color: #0d904f !important;
  }

  .card-panel {
    height: 83px;
    cursor: pointer;
    padding-left: 10px;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    background: #fff;
    border-color: rgba(0, 0, 0, .05);
    color: #fff;

    .panel-title{
      padding-top: 20px;
      font-size: 13px;
      line-height: 18px;
      overflow: hidden;
      display: inline-block;
      text-overflow: ellipsis;
      align-self: center;
      border-bottom: 1px solid rgba(0,0,0,.12);
      cursor: pointer;
      white-space: nowrap;
    }

    .panel-number{
      flex: 1;
      padding-right: 16px;
      padding-top: 8px;
      line-height: 29px;
      font-size: 24px;
      white-space: nowrap;
    }

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
