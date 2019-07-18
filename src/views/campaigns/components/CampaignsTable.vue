<template>
  <div class="ess-table">
    <operation-table :campaign-status="campaignStatus" />
    

    <el-table
      ref="multipleTable"
      v-loading="post.loading"
      :data="origin.table.data"
      :summary-method="getSummaries"
      show-summary
      border
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        fixed
        label="广告系列名称"
        width="200"
      >
        <template slot-scope="scope" >
          <div class="status inlineBlock">
            <el-dropdown
              placement="bottom-start"
              trigger="click"
            >
              <a class="el-dropdown-link">
                <span
                  v-if="'ENABLED' == scope.row.status"
                  class="start-status"
                />
                <svg-icon
                  v-if="'PAUSED' == scope.row.status"
                  icon-class="pause"
                />
              </a>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><a><span class="start-status" /> <span>启用</span></a></el-dropdown-item>
                <el-dropdown-item><a><svg-icon icon-class="pause" /> <span>停用</span></a></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="campaignName inlineBlock" >
            <svg-icon
              v-if=" scope.row.advertisingChannelType=='SEARCH'"
              icon-class="searchad"
              class="svg-middle"
              
            />
            <svg-icon
              v-if=" scope.row.advertisingChannelType=='DISPLAY'"
              icon-class="displayad"
              class="svg-middle"
            />
            {{ scope.row.campaignName }}
               <svg-icon
              icon-class="edit"
              class="svg-middle"
              @click="change"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="amount"
        label="预111算"
        width="120"
       
      >
        <template slot-scope="scope" >
          ￥{{ scope.row.amount }}
          <svg-icon
              icon-class="edit"
              class="svg-middle"
              @click="change"
              
            />
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
      >
        <template slot-scope="scope">
          <span v-if="'ENABLED' == scope.row.status">有效</span>
          <span v-if="'PAUSED' == scope.row.status">已暂停</span>
          <span v-if="'REMOVED' == scope.row.status">已移除</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="advertisingChannelType"
        label="广告系列类型"
      >
        <template slot-scope="scope">
          <span v-if="'DISPLAY' == scope.row.advertisingChannelType">展示</span>
          <span v-if="'SEARCH' == scope.row.advertisingChannelType">搜索</span>
        </template>
      </el-table-column>
      <el-table-column
        label="展示次数"
      >
        <template slot-scope="scope">
          {{ scope.row.reports.impressions }}
        </template>
      </el-table-column>
      <el-table-column
        prop="biddingStrategyType"
        label="出价策略类型"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-if="'MANUAL_CPC' == scope.row.biddingStrategyType">每次点击费用</span>
          <span v-if="'MANUAL_CPM' == scope.row.biddingStrategyType">按展示次数</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="page-table">
      <el-pagination
        :current-page="origin.table.current_page"
        :page-sizes="[10, 30, 50, 200, 500]"
        :page-size="post.table.per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="origin.table.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <div style="margin-top: 20px; display: none;">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">
        切换第二、第三行的选中状态
      </el-button>
      <el-button @click="toggleSelection()">
        取消选择
      </el-button>
    </div>
  </div>
</template>

<script>

  // import { mapGetters } from 'vuex'
  import OperationTable from './OperationTable'
  import { campaignsList } from '@/api/campaigns'
  // import { campaignsEdit } from '@/api/campaigns'
 
  export default {
    components: { OperationTable },
    props: ["campaignType","campaignStatus"],
    data() {
      return {
        origin:{
          table:{}
        },
        post:{
          loading: false,
          table :{
            page: 1,
            per_page: 10
          }
        },
        
        multipleSelection: []
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
            console.log(response.data)
            this.origin.table = response.data
          }
        
           this.post.loading = false
          
            })}
            ,
      

         
        
      change(val){
        alert("1")
        console.log(val)
      },
       
      handleCurrentChange(page){
        this.post.table = Object.assign(this.post.table, { page })
        this.fetchData()
      },
      handleSizeChange(per_page){
        this.post.table = Object.assign(this.post.table, { per_page })
        this.fetchData()
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 1) {
            sums[index] = '总计：广告系列';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] = '￥' + sums[index] ;
          } else {
            sums[index] = '';
          }
        });

        return sums;
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    
    }
  }
</script>

<style lang="scss" scoped>
.campaignName {
  margin-left: 20px;
}
</style>
