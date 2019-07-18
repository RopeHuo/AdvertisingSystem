<template>
  <div class="">

    <!--导航-->
    <location-header />

    <!--添加地理位置-->
    <add-location
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
    <location-table ref="LocationTable"
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
  import { deleteLocation } from '@/api/location'
  import LocationHeader from './components/LocationHeader'
  import OperationEdit from './components/OperationEdit'
  import OperationTable from './components/OperationTable'
  import AddLocation from './components/AddLocation'
  import LocationTable from './components/LocationTable'


  export default {
    name: 'Adschedules',
    components: { LineChart, LocationHeader, AddLocation, LocationTable, OperationEdit, OperationTable },
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
        this.$refs.LocationTable.post.table.page = 1;
        this.$refs.LocationTable.post.table.googleCampaignId =  this.campaignId
        this.$refs.LocationTable.fetchData()
      },
      campaignStatus: function(newd, old) {
        this.$refs.LocationTable.post.table.page = 1;
        this.$refs.LocationTable.post.table.googleCampaignStatus =  this.campaignStatus
        this.$refs.LocationTable.fetchData()
      },
      adGroupId: function(newd, old) {
        this.$refs.LocationTable.post.table.page = 1;
        this.$refs.LocationTable.post.table.adGroupId =  this.adGroupId
        this.$refs.LocationTable.fetchData()
      },
    },
    methods: {
      setKeywordStatus(){
        this.$refs.LocationTable.post.table.status = status
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
            message: '请选择投放时间',
            type: 'info'
          });
          return
        }
        // 删除接口
        deleteLocation({
          ids: ids
        }).then(response => {
         if(response.success){
           self.$message({
             message: '批量操作成功',
             type: 'success'
           });
           this.$refs.LocationTable.fetchData()
         }
        })
      }
    }
  }
</script>

