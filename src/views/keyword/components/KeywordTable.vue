<template>
  <div class="ess-table">
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
        label="关键字"
        width="200"
      >
        <template slot-scope="scope">
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

          <div class="campaignName inlineBlock">
            {{ scope.row.google ? scope.row.google.keywordText : scope.row.keyword }}
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="广告系列"
        width="120"
      >
        <template scope="scope">
          <svg-icon
v-if=" scope.row.campaign_type=='SEARCH'"
                    icon-class="searchad"
class="svg-middle"
/>
          <svg-icon
v-if=" scope.row.campaign_type=='DISPLAY'"
                    icon-class="displayad"
class="svg-middle"
/>
          {{ scope.row.campaign_name }}
        </template>
      </el-table-column>

      <el-table-column
        label="广告组类型"
        width="120"
      >
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
        width="120"
      >
        <template slot-scope="scope">
          ￥{{ scope.row.amount }}
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.google">
            <span v-if="'ENABLED' == scope.row.google.status">有效</span>
            <span v-if="'PAUSED' == scope.row.google.status">已暂停</span>
            <span v-if="'REMOVED' == scope.row.google.status">已移除</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="展示次数"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.reports">
            {{ scope.row.reports.impressions }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="点击次数"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.reports">
            {{ scope.row.reports.clicks }}
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="page-table">
      <el-pagination
        :current-page="table.current_page"
        :page-sizes="[10, 30, 50, 200, 500]"
        :page-size="20"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        :total="table.total"
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
  import { keywordList } from "@/api/keyword";

  export default {
    props: [
      "campaignType",
      "campaignStatus",
      "adGroupStatus",
      "campaignId",
      "adGroupId"
    ],
    data() {
      return {
        origin: {
          table: {}
        },
        post: {
          loading: false,
          table: {
            status: "ALL",
            page: 1,
            per_page: 10
          }
        },

        tableData: [],
        table: {
          total: 10,
          current_page: 1,
          per_page: 0,
          last_page: 0
        }
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        this.post.loading = true;
        let params = this.post.table;
        keywordList(params).then(response => {
          if (response.success) {
            this.origin.table = response.data;
          }
          this.post.loading = false;
        });
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 1) {
            sums[index] = "总计：关键字";
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
            sums[index] = "￥" + sums[index];
          } else {
            sums[index] = "";
          }
        });

        return sums;
      },

      handleSizeChange() {},
      handleCurrentChange() {},
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
        this.$emit("setMultipleSelection", val);
      }
    }
  };
</script>


<style lang="scss" scoped>
  .campaignName {
    margin-left: 20px;
  }
</style>
