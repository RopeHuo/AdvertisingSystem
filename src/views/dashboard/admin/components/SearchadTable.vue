<template>
  <div class="dashboard-panel-box dashboard-panel-box-middle">
    <h1 class="title">展示广告</h1>

    <div class="search-ad-box">


      <div class="search-ad-box-title">
        <span class="start-status"></span>名药汇
      </div>

      <div class="google-windows">
        <img src="https://tpc.googlesyndication.com/simgad/2078496357132848083" alt="">
      </div>

      <div class="search-box-statistics">
        <el-row :gutter="40" >
          <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col">
            <div class="card-panel" >
              <div class="panel-title">广告</div>
              <div class="panel-number"> <span class="start-status"></span> 已启用</div>
            </div>
          </el-col>
          <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col">
            <div class="card-panel" >
              <div class="panel-title">展示次数</div>
              <div class="panel-number">0</div>
            </div>
          </el-col>
          <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col">
            <div class="card-panel">
              <div class="panel-title">点击次数</div>
              <div class="panel-number">0</div>
            </div>
          </el-col>
          <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col">
            <div class="card-panel">
              <div class="panel-title">点击率</div>
              <div class="panel-number">0.00%</div>
            </div>
          </el-col>
        </el-row>
      </div>


    </div>

    <div class="footer">
      <el-button plain >所有搜索广告 > </el-button>
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

  .el-button{
    border: 0 !important;
    &:hover{
      background-color: #e6ecfa !important;
    }
  }

</style>

<style lang="scss" scoped>
  .search-ad-box{
    position: relative;
    height: 300px;

    .search-ad-box-title{
      padding-top: 20px;
      text-align: center;
    }
  }



  .search-box-statistics{
    position: absolute;
    bottom: 0;
    width: 80%;
    left: 50%;
    margin-left: -40%;
    margin-bottom: 10px;
    display: block;
    font-weight: 400;

    .card-panel-col{
      padding-left: 15px !important;
      padding-right: 0px  !important;
    }

    .panel-title{
      color: rgba(0,0,0,.54);
      height: 24px;
      font-size: 13px;
      text-align: left;
    }
    .panel-number{
      font-size: 18px;
    }

  }

  .google-windows {
    margin: 5px;
    outline: 1px solid whitesmoke;
    padding: 8px;
    text-align: center;
    min-height: 100px;
    background-color: #fff;
    img {
      width: 250px;
    }
  }

  .csc-d {
    color: #1a0dab;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 15px;
    line-height: 20px;
  }

  .csc-f {
    color: #006621;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .csc-c {
    font-size: 13px;
    color: #545454;
  }

  .cod-n {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .csc-b {
    border-radius: 2px;
    border: 1px solid #006621;
    color: #006621;
    display: inline-block;
    font-size: 12px;
    line-height: 14px;
    margin-left: 0;
    margin-right: 2px;
    padding: 0 2px;
    vertical-align: baseline;
  }

</style>

