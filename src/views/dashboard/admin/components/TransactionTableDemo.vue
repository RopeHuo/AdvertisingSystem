<template>
  <div class="dashboard-panel-box dashboard-panel-box-middle">
    <h1 class="title">广告系列</h1>
    <el-table :data="list" style="">
      <el-table-column label="广告系列">
        <template slot-scope="scope">

          {{ scope.row.order_no | orderNoFilter }}
        </template>
      </el-table-column>
      <el-table-column label="费用" align="center">
        <template slot-scope="scope">
          ¥{{ scope.row.price | toThousandFilter }}
        </template>
      </el-table-column>
      <el-table-column label="点击次数"  align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="点击率" align="center">
        <template slot-scope="scope">
          ¥{{ scope.row.price | toThousandFilter }}
        </template>
      </el-table-column>
    </el-table>

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


<style lang="scss" scoped>
  .dashboard-panel-box-middle{
    height: 392px !important;
    margin-bottom: 20px;
    border: 1px solid #000;
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
  }

  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>

