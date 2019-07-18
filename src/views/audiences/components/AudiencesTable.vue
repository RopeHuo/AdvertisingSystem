<template>

  <div class="ess-table">

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
          type="selection"
          width="55">
      </el-table-column>

      <el-table-column
          fixed
          label="受众群体"
          width="200">
        <template slot-scope="scope">

          <div class="status inlineBlock">
            <el-dropdown  placement="bottom-start"  trigger="click">
              <a class="el-dropdown-link">
                <span class="start-status"  v-if="'ENABLED' == scope.row.status"></span>
                <svg-icon icon-class="pause"  v-if="'PAUSED' == scope.row.status" />
              </a>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><a><span class="start-status"></span> <span>启用</span></a></el-dropdown-item>
                <el-dropdown-item><a><svg-icon icon-class="pause"   /> <span>停用</span></a></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

          <div class="campaignName inlineBlock">
            {{ scope.row.criterion.category_cn ?  scope.row.criterion.category_cn + ">" : "" }}  {{ scope.row.criterion.name_cn }}
          </div>

        </template>
      </el-table-column>

      <el-table-column
          label="类型"
          width="120">
        <template scope="scope">

        </template>
      </el-table-column>


      <el-table-column
          label="广告系列"
          width="120">
        <template scope="scope">
          {{ scope.row.campaignName }}
        </template>
      </el-table-column>

      <el-table-column
          label="广告组"
          width="120">
        <template scope="scope">
          {{ scope.row.adGroupName }}
        </template>
      </el-table-column>

      <el-table-column
          label="状态"
          width="120">
        <template slot-scope="scope">

        </template>
      </el-table-column>

      <el-table-column
          label="层级"
          width="120">
        <template slot-scope="scope">

        </template>
      </el-table-column>

      <el-table-column
          label="出价"
          width="120">
        <template slot-scope="scope">

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
          :current-page="table.current_page"
          :page-sizes="[10, 30, 50, 200, 500]"
          :page-size="20"
          layout="total, sizes, prev, pager, next, jumper"
          :total=table.total>
      </el-pagination>
    </div>

    <div style="margin-top: 20px; display: none;">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>

</template>

<script>

  import { audiencesList } from '@/api/audiences'

  export default {
    props: ["campaignType","campaignStatus","adGroupStatus","campaignId","adGroupId"],
    data() {
      return {
        origin:{
          table:{}
        },
        post:{
          loading: false,
          table :{
            status:'ALL',
            page: 1,
            per_page: 10
          }
        },

        tableData: [],
        table:{
          total:10,
          current_page:1,
          per_page:0,
          last_page:0
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
        audiencesList(params).then(response => {
          if (response.success) {
            this.origin.table = response.data
          }
          this.post.loading = false
        })
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 1) {
            sums[index] = '总计：关键字';
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

      handleSizeChange(){

      },
      handleCurrentChange(){

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
        this.$emit("setMultipleSelection", val)
      }
    }

  }
</script>


<style lang="scss" scoped>
  .campaignName{
    margin-left: 20px;
  }
</style>
