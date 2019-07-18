<template>
  <div class="">
    <!--报表-->
    <el-row   v-if="operationName == '' || operationName == 'edit' ">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <!--添加关键字-->
    <add-keywords
        v-if="operationName == 'add'"
        v-on:setOperationName="setOperationName"
        :adGroupId="adGroupId"
        :campaignId="campaignId" />

    <!--编辑栏-->
    <operation-edit
        v-if="operationName == 'edit'"
        :multipleSelection="multipleSelection"
        v-on:setOperationName="setOperationName"
        v-on:operationStatus="operationStatus"
    />

    <!--操作栏-->
    <operation-table
        v-if="operationName ==''"

        :setKeywordStatus="setKeywordStatus"
        v-on:setOperationName="setOperationName"
         />

    <!--表格-->
    <keyword-table ref="keywordTable"
       :campaignStatus="campaignStatus"
       :campaignType="campaignType"
       :adGroupStatus="adGroupStatus"
       :campaignId="campaignId"
       :adGroupId="adGroupId"
       v-on:setMultipleSelection="setMultipleSelection"
    />

  </div>
</template>

<script>

  import { mapGetters } from 'vuex'
  import LineChart from './components/LineChart'
  import { operationKeyword } from '@/api/keyword'
  import OperationEdit from './components/OperationEdit'
  import OperationTable from './components/OperationTable'
  import AddKeywords from './components/AddKeywords'
  import KeywordTable from './components/KeywordTable'


  export default {
    name: 'Keyword',
    components: { LineChart, AddKeywords, KeywordTable, OperationEdit, OperationTable },
    data() {
      return {
        lineChartData: {},
        operationName: '', // 正常 | edit 编辑 | add 添加
        multipleSelection: []
      }
    },
    computed: {
      ...mapGetters([
        'campaignType',
        'campaignStatus',
        'adGroupStatus',
        'campaignId',
        'adGroupId',
      ])
    },
    watch:{
      campaignId: function(newd, old) {
        this.$refs.keywordTable.post.table.page = 1;
        this.$refs.keywordTable.post.table.campaignId =  this.campaignId
        this.$refs.keywordTable.fetchData()
      },
      adGroupId: function(newd, old) {
        this.$refs.keywordTable.post.table.page = 1;
        this.$refs.keywordTable.post.table.adGroupId =  this.adGroupId
        this.$refs.keywordTable.fetchData()
      },
    },
    methods: {
      setKeywordStatus(){
        this.$refs.keywordTable.post.table.status = status
        this.fetchData()
      },
      setMultipleSelection(val){
        if(val.length == 0){
          this.operationName = ''
        }else{
          this.operationName = 'edit'
        }
        this.multipleSelection = val
      },
      setOperationName(name){
        this.operationName = name
      },
      operationStatus(status){
        let self = this
        var ids = [];
        this.multipleSelection.forEach(function(item) {
          ids.push(item.id)
        })

        if(ids.length == 0){
          self.$message({
            message: '请选择关键字',
            type: 'info'
          });
          return
        }

        operationKeyword({
          ids: ids,
          operation: status
        }).then(response => {
         if(response.success){
           self.$message({
             message: '批量操作成功',
             type: 'success'
           });
           this.$refs.keywordTable.fetchData()
         }
        })
      }
    }
  }
</script>

