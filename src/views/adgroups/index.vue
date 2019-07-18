<template>
  <div class="">

    <el-row>
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <adgroups-table ref="adgroupTable" :campaignStatus="campaignStatus" :campaignType="campaignType" :adGroupStatus="adGroupStatus"/>

  </div>
</template>

<script>

  import { mapGetters } from 'vuex'
  import AdgroupsTable from './components/AdgroupsTable'
  import LineChart from './components/LineChart'
  import { campaignsReport } from '@/api/campaigns'

  export default {
    name: 'Adgroup',
    components: { AdgroupsTable,LineChart },
    data() {
      return {
        lineChartData:{
        }
      }
    },
    computed: {
      ...mapGetters([
        'campaignType',
        'campaignStatus',
        'adGroupStatus',
        'campaignId',
      ])
    },
    watch:{
      campaignId: function(newd, old) {
        this.$refs.adgroupTable.post.table.page = 1;
        this.$refs.adgroupTable.post.table.googleCampaignId =  this.campaignId
        this.$refs.adgroupTable.fetchData()
        this.getAdgroupReports()
      },
      campaignType: function(newd, old) {
        this.$refs.adgroupTable.post.table.page = 1;
        this.$refs.adgroupTable.post.table.googleCampaignId =  ''
        this.$refs.adgroupTable.fetchData()
        this.getAdgroupReports()
      },
      adGroupStatus: function(newd, old) {
        this.$refs.adgroupTable.post.table.page = 1;
        this.$refs.adgroupTable.post.table.status =  this.adGroupStatus
        this.$refs.adgroupTable.fetchData()
        this.getAdgroupReports()
      }
    },
    mounted(){
      this.getAdgroupReports()
    },
    methods: {
      getAdgroupReports(){
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
          type: 'adgroup',
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

