<template>

  <div class="ess-table">

    <operation-table :adGroupStatus="adGroupStatus"/>

    <el-table
        v-loading="post.loading"
        ref="multipleTable"
        :data="origin.table.data"
        :summary-method="getSummaries"
        show-summary
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
      <el-table-column
          fixed
          label="广告组"
          width="200">
        <template slot-scope="scope">

          <div class="status inlineBlock">
            <el-dropdown  placement="bottom-start"  trigger="click">
              <a class="el-dropdown-link">
                <!--<span class="start-status"  v-if="'ENABLED' == scope.row.google.status"></span>-->
                <!--<svg-icon icon-class="pause"  v-if="'PAUSED' == scope.row.google.status" />-->
              </a>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><a><span class="start-status"></span> <span>启用</span></a></el-dropdown-item>
                <el-dropdown-item><a><svg-icon icon-class="pause"   /> <span>停用</span></a></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

          <div class="campaignName inlineBlock">
            <svg-icon icon-class="searchad"   class="svg-middle" v-if=" scope.row.advertisingChannelType=='SEARCH'"/>
            <svg-icon icon-class="displayad"   class="svg-middle" v-if=" scope.row.advertisingChannelType=='DISPLAY'"/>
            {{ scope.row.adgroup_name }}
          </div>

        </template>
      </el-table-column>

      <el-table-column
          label="广告系列"
          width="120">
        <template scope="scope">
          {{ scope.row.google ? scope.row.google.campaignName : '' }}
          <!--{{ scope.row.google.campaignName }}-->
        </template>
      </el-table-column>

      <el-table-column
          label="广告组类型"
          width="120">
        <template slot-scope="scope">
          <div v-if="scope.row.google">
            <span v-if="scope.row.google.adGroupType == 'SEARCH_STANDARD'"> 搜索广告</span>
            <span v-if="scope.row.google.adGroupType == 'DISPLAY_STANDARD'"> 展示广告</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column
          prop="amount"
          label="预算"
          width="120">
        <template slot-scope="scope">
          ￥{{ scope.row.amount }}
        </template>
      </el-table-column>
      <el-table-column
          label="状态">
        <template slot-scope="scope">
          <div v-if="scope.row.google">
            <span  v-if="'ENABLED' == scope.row.google.status">有效</span>
            <span  v-if="'PAUSED' == scope.row.google.status">已暂停</span>
            <span  v-if="'REMOVED' == scope.row.google.status">已移除</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          label="展示次数">
        <template slot-scope="scope">
          <div v-if="scope.row.reports">
            {{ scope.row.reports.impressions }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
          label="点击次数">
        <template slot-scope="scope">
          <div v-if="scope.row.reports">
            {{ scope.row.reports.clicks }}
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="page-table">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="origin.table.current_page"
          :page-sizes="[10, 30, 50, 200, 500]"
          :page-size="post.table.per_page"
          layout="total, sizes, prev, pager, next, jumper"
          :total=origin.table.total>
      </el-pagination>
    </div>

    <div style="margin-top: 20px; display: none;">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>

</template>

<script>

  import OperationTable from './OperationTable'
  import { adGroupList } from '@/api/adgroup'

  export default {
    props: ["campaignType","campaignStatus","adGroupStatus"],
    components: { OperationTable },
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
        adGroupList(params).then(response => {
          if (response.success) {
            this.origin.table = response.data
          }
          this.post.loading = false
        })
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
            sums[index] = '总计：广告组';
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
      }
    }

  }
</script>

<style lang="scss" scoped>
  .campaignName{
    margin-left: 20px;
  }
</style>
