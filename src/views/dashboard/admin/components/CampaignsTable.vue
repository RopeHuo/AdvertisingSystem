<template>
  <div class="dashboard-panel-box dashboard-panel-box-middle">
    <h1 class="title">广告系列</h1>

    <el-table :data="origin.table.data" max-height="300px" height="300px" class-name="dashboard-panel-box-table">
      <el-table-column>
        <template slot-scope="scope" width="220px">
          <span class="start-status"></span>
          <a >{{ scope.row.campaignName}}</a>
          <!--<a class="a-tips">  {{ scope.row.order_no | orderNoFilter }}</a>-->
        </template>
      </el-table-column>
      <el-table-column label="费用" align="right">
        <template slot-scope="scope">
          ¥{{ scope.row.amount }}
        </template>
      </el-table-column>
      <el-table-column label="点击次数"  align="right">
        <template slot-scope="scope">
          {{ scope.row.reports.clicks }}
        </template>
      </el-table-column>
      <el-table-column label="点击率" align="right">
        <template slot-scope="scope">
          {{ scope.row.reports.ctr }}
        </template>
      </el-table-column>
    </el-table>

    <div class="footer">
      <router-link to="/campaigns/index"><el-button plain >所有广告系列 > </el-button></router-link>

      <div class="page">
        <el-pagination
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :total="origin.table.total">
        </el-pagination>
        <!--<a>第{{ page.total }}页 （共 {{ page.total  }}页）</a>-->
        <!--<a><i class="el-icon-arrow-down" /></a>-->
        <!--<a><i class="el-icon-arrow-up" /></a>-->
      </div>

    </div>

  </div>

</template>

<script>

import { campaignsList } from '@/api/campaigns'

export default {
  data() {
    return {
      origin:{
        table:{}
      },
      post:{
        loading: false,
        table :{
          page: 1,
          per_page: 8
        }
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.post.loading = true
      let params = this.post.table
      campaignsList(params).then(response => {
        if (response.success) {
          this.origin.table = response.data
        }
        this.post.loading = false
      })
    },
    handleCurrentChange(page){
      this.post.table = Object.assign(this.post.table, { page })
      this.fetchData()
    }
  }
}
</script>


<style lang="scss" >
  .el-table--scrollable-y .el-table__body-wrapper{
    overflow-y: hidden !important;
    overflow-x: hidden !important;
  }
  .el-button{
    border: 0 !important;
    &:hover{
      background-color: #e6ecfa !important;
    }
  }
</style>

<style lang="scss" scoped>

</style>

