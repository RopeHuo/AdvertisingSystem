<template>
  <div class="ess-table">

    <operation-table :setAdStatus="setAdStatus" :status="post.table.status" />

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
          label=""
          width="300">
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
            <div class="text-left" v-if="scope.row.type=='EXPANDED_TEXT_AD'">
              <a >
                <span>{{ scope.row.headline1 }}{{ scope.row.headline2 }} </span><br/>
                <span>{{ scope.row.description }} </span> <br/>
                <span>{{ scope.row.final_urls }}</span>
              </a>
            </div>
            <div v-if="scope.row.type=='RESPONSIVE_DISPLAY_AD' && scope.row.google " class="responsivead text-left">
              <img v-bind:src="scope.row.google.responsiveAd.marketingImage.url" height="48"/>
              <img v-bind:src="scope.row.google.responsiveAd.logoImage.url" height="48"/>
              <img v-bind:src="scope.row.google.responsiveAd.squareImage.url" height="48"/>
              <div>{{ scope.row.description }}</div>
              <a >查看预览广告</a>
            </div>
            <div v-if="scope.row.type=='IMAGE_AD' && scope.row.google" class="imagead text-left">
              <a >
                <img v-bind:src="scope.row.google.imageAd.images.PREVIEW.url" alt="">
                <div>{{ scope.row.google.headline1 }}</div>
                <div>{{ scope.row.google.imageAd.images.FULL.width}} x {{ scope.row.google.imageAd.images.FULL.height }}
                </div>
              </a>
              <a>查看完整尺寸的图片广告</a>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column
          label="广告系列">
        <template slot-scope="scope">
          {{ scope.row.campaign_name }}
        </template>
      </el-table-column>

      <el-table-column
          label="广告组">
        <template slot-scope="scope">
          {{ scope.row.adgroup_name }}
        </template>
      </el-table-column>

      <el-table-column
          label="广告类型">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 'IMAGE_AD'">图片广告</span>
          <span v-if="scope.row.type == 'EXPANDED_TEXT_AD'">文字广告</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="status"
          label="状态">
        <template slot-scope="scope">
          <span  v-if="'ENABLED' == scope.row.status">有效</span>
          <span  v-if="'PAUSED' == scope.row.status">已暂停</span>
          <span  v-if="'REMOVED' == scope.row.status">已移除</span>
        </template>
      </el-table-column>
      <el-table-column
          label="展示次数">
        <template slot-scope="scope">
          0
        </template>
      </el-table-column>
      <el-table-column
          label="费用">
        <template slot-scope="scope">
          0
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
  import { adList } from '@/api/ad'

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
            status:'ALL',
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
        adList(params).then(response => {
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
      setAdStatus(status){
        // console.log(status)
        this.post.table.status = status
        this.fetchData()
      }
    }

  }
</script>

<style lang="scss" scoped>
  .responsivead {
    padding: 5px 0 5px 0;
  }
  .imagead {
    padding: 5px 0 5px 0;
  }

</style>
