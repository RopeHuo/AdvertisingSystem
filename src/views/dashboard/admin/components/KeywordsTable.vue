<template>
  <div class="dashboard-panel-box dashboard-panel-box-middle">
    <h1 class="title">搜索关键字</h1>

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
      <el-button plain >所有关键字 > </el-button>
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
        this.list = response.data.items.slice(0, 3)
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
  .el-button{
    border: 0 !important;
    &:hover{
      background-color: #e6ecfa !important;
    }
  }
</style>

<style lang="scss" scoped>

</style>

