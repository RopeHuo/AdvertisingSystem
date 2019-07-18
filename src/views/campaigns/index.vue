<template>
  <div class="">
    <el-row>
      <line-chart :chart-data="lineChartData" />
    </el-row>
    <campaigns-table ref="campaignsTable" :campaignStatus="campaignStatus" :campaignType="campaignType" />
  </div>
</template>

<script>
  import CampaignsTable from './components/CampaignsTable'
  import LineChart from './components/LineChart'
  import { campaignsList, campaignsReport } from '@/api/campaigns'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Campaigns',
    components: { LineChart, CampaignsTable },
    data() {
      return {
        lineChartData: {}
      }
    },
    computed: {
      ...mapGetters([
        'campaignType',
        'campaignStatus'
      ])
    },
    watch:{
      campaignStatus: function(newd, old) {
        this.$refs.campaignsTable.post.table.page = 1;
        this.$refs.campaignsTable.post.table.status =  this.campaignStatus


        this.$refs.campaignsTable.fetchData()
        this.getCampaingsReports()
      },
      campaignType: function(newd, old) {
        this.$refs.campaignsTable.post.table.page = 1;
        this.$refs.campaignsTable.post.table.type =  this.campaignType
        this.$refs.campaignsTable.fetchData()
        this.getCampaingsReports()
      }
    },
    mounted(){
      this.getCampaingsReports()
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
      }
    }
  }
</script>

