<template>
  <div class="">

    <ad-table ref="adTable" :campaignStatus="campaignStatus" :campaignType="campaignType" :adGroupStatus="adGroupStatus" :campaignId="campaignId" :adGroupId="adGroupId"/>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import AdTable from './components/AdTable'

  export default {
    name: 'Adgroup',
    components: { AdTable },
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
        this.$refs.adTable.post.table.page = 1;
        this.$refs.adTable.post.table.campaignId =  this.campaignId
        this.$refs.adTable.fetchData()
      },
      adGroupId: function(newd, old) {
        this.$refs.adTable.post.table.page = 1;
        this.$refs.adTable.post.table.adGroupId =  this.adGroupId
        this.$refs.adTable.fetchData()
      },
    },
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>

