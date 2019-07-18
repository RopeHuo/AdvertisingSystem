<template>
  <div class="dashboard-editor-container">

    <div
      style="    box-sizing: border-box;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12), 0 1px 5px 0 rgba(0,0,0,.2);"
    >

      <panel-group @handleSetLineChartData="handleSetLineChartData" />

      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <line-chart :chart-data="lineChartData" />
      </el-row>

    </div>

    <el-row :gutter="20">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 12}" :lg="{span: 12}" :xl="{span: 12}" class="">
        <campaigns-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 12}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <keywords-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 12}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <searchad-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 12}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <displayad-table />
      </el-col>
    </el-row>
  </div>
</template>

<script>


import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import TransactionTable from './components/TransactionTable'
import CampaignsTable from './components/CampaignsTable'
import KeywordsTable from './components/KeywordsTable'
import SearchadTable from './components/SearchadTable'
import DisplayadTable from './components/DisplayadTable'
import { campaignsReport } from '@/api/campaigns'

const lineChartData = {
  clicks: [],
  cost: [],
  ctr:[],
  impressions:[],
  title:[]
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    TransactionTable,
    CampaignsTable,
    KeywordsTable,
    SearchadTable,
    DisplayadTable
  },
  mounted(){
    this.getCampaingsReports()
  },
  data() {
    return {
      lineChartData: lineChartData
    }
  },
  methods: {
    getCampaingsReports(){
      Date.prototype.Format = function (fmt) {
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "H+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      }

      let params = {
        type: 'campaign',
        begin_date: new Date().Format("yyyyMMdd"),
        end_date:new Date().Format("yyyyMMdd"),
      }

      campaignsReport(params).then(response => {
        this.lineChartData = response.data
      })
    },
    handleSetLineChartData(type) {
      // 后期调试效果，显隐数组
      this.getCampaingsReports();
      this.lineChartData = lineChartData
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: #f5f5f5;
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
