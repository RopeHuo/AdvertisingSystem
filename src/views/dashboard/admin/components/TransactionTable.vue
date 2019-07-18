<template>
  <div class="dashboard-panel-box dashboard-panel-box-middle">
    <h1 class="title">广告系列</h1>

    <el-table :data="list" max-height="300px" height="300px" class-name="dashboard-panel-box-table">
      <el-table-column>
        <template slot-scope="scope" width="150px">
          <span class="start-status"></span>

          <a class="a-tips">  {{ scope.row.order_no | orderNoFilter }}</a>
        </template>
      </el-table-column>
      <el-table-column label="费用" align="right">
        <template slot-scope="scope">
          ¥{{ scope.row.price | toThousandFilter }}
        </template>
      </el-table-column>
      <el-table-column label="点击次数"  align="right">
        <template slot-scope="{row}">
        0
        </template>
      </el-table-column>
      <el-table-column label="点击率" align="right">
        <template slot-scope="scope">
         0
        </template>
      </el-table-column>
    </el-table>

    <div class="footer">
      所有广告系列
    </div>

  </div>

</template>

<script>
import { transactionList } from '@/api/remote-search'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 10)
    }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {

      transactionList().then(response => {
        this.list = response.data.items.slice(0, 8)
      })
    }
  }
}
</script>


<style lang="scss" >

  .el-table--scrollable-y .el-table__body-wrapper{
    overflow-y: hidden !important;
    overflow-x: hidden !important;
  }



</style>

<style lang="scss" scoped>
  .dashboard-panel-box-middle{
    height: 392px !important;

  }
  .dashboard-panel-box {
    background-color: #fff;
    font-size: 13px;
    .title{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: rgba(0,0,0,.87);
      font-size: 18px;
      font-weight: 400;
      margin: 0;
      padding: 20px 8px 0 16px;
      &:hover{
        color: #3367d6;
        cursor: pointer;
      }
    }

    &:hover{
      font-size: 13px;
      font-weight: 400;
      box-sizing: border-box;
      box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12), 0 1px 5px 0 rgba(0,0,0,.2);
      background: #fff;
      border-radius: 2px;
    }

    .a-tips{
      color: #3367d6;
    }



    .footer{
      box-sizing: border-box;
      box-shadow: inset 0 1px #e0e0e0;
      display: flex;
      justify-content: space-between;
      height: 48px;
      padding: 8px;
    }


  }



  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>

