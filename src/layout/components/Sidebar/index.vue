<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />


    <el-scrollbar wrap-class="scrollbar-wrapper">

      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >

        <el-menu-item class="flex flex-row space-between" >
          <a @click="changeCampaignType('')">所有广告系列</a>
          <el-dropdown trigger="click" placement="bottom-start" class="dropCampainsMenu" >
            <el-tooltip class="item" effect="dark" content="按状态或类型过滤" >
            <span class="el-dropdown-link">
               <i class="el-icon-more transform-90 color-while" title="按状态或类型过滤"/>
            </span>
            </el-tooltip>
            <el-dropdown-menu slot="dropdown" split-button class="el-dropdown-menu">
              <div class="category">广告系列状态</div>
              <el-dropdown-item class="campaign-menu"><a class="campaign-menu-status" :class="{ 'is-active' : campaignStatus=='ALL' }" @click="changeCampaignStatus('ALL')">所有</a></el-dropdown-item>
              <el-dropdown-item class="campaign-menu"><a class="campaign-menu-status" :class="{ 'is-active' : campaignStatus=='ENABLED' }" @click="changeCampaignStatus('ENABLED')">所有已启用</a></el-dropdown-item>
              <el-dropdown-item class="campaign-menu"><a class="campaign-menu-status" :class="{ 'is-active' : campaignStatus=='RESERVED' }" @click="changeCampaignStatus('RESERVED')">所有未移除</a></el-dropdown-item>
              <div class="category">广告组状态</div>
              <el-dropdown-item class="campaign-menu"><a class="campaign-menu-status" :class="{ 'is-active' : adGroupStatus=='ALL' }"  @click="changeAdGroupStatus('ALL')">所有</a></el-dropdown-item>
              <el-dropdown-item class="campaign-menu"><a class="campaign-menu-status" :class="{ 'is-active' : adGroupStatus=='ENABLED' }" @click="changeAdGroupStatus('ENABLED')">所有已启用</a></el-dropdown-item>
              <el-dropdown-item class="campaign-menu"><a class="campaign-menu-status" :class="{ 'is-active' : adGroupStatus=='RESERVED' }" @click="changeAdGroupStatus('RESERVED')">所有未移除</a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>

        <el-menu-item>
          <div  @click="changeCampaignType('SEARCH')">
            <svg-icon icon-class="searchad" class="svg-middle"/>搜索广告系列
          </div>
        </el-menu-item>
        <el-menu-item class="module-bottom" @click="changeCampaignType('DISPLAY')">
          <svg-icon icon-class="displayad" class="svg-middle"/>展示广告系列
        </el-menu-item>

        <p class="menu-tips">
          <span v-if="campaignStatus == 'ALL'">已启用、已暂停和已移除的</span>
          <span v-if="campaignStatus == 'ENABLED'">已启用</span>
          <span v-if="campaignStatus == 'RESERVED'">已启用的和已暂停的</span>
        </p>

        <div v-for="(menu,index) in menuList" >
          <el-submenu v-if="menu.adGroups.length > 0" :index="index + ''"  class="campaign-menu-item-1" >
            <template slot="title" >
              <div @click="handleCampaign(menu)">
                <svg-icon icon-class="searchad-menu"   class="svg-middle" v-if="menu.advertisingChannelType=='SEARCH'"/>
                <svg-icon icon-class="displayad"   class="svg-middle" v-if="menu.advertisingChannelType=='DISPLAY'"/>
                {{ menu.campaignName }}
              </div>

            </template>
            <el-menu-item  :index="index + '=' + adindex" v-for="(ad,adindex) in menu.adGroups" class="adgroup-menu-li"  @click="handleAdGroup(menu,ad)">
              <template slot="title">
                {{ ad.adGroupName }}
              </template>
            </el-menu-item>
          </el-submenu>
          <div v-if="menu.adGroups.length == 0">
            <el-menu-item  class="campaign-menu-item-2" @click="handleCampaign(menu)">
              <svg-icon icon-class="searchad-menu"   class="svg-middle" v-if="menu.advertisingChannelType=='SEARCH'"/>
              <svg-icon icon-class="displayad"   class="svg-middle" v-if="menu.advertisingChannelType=='DISPLAY'"/>
              {{ menu.campaignName }}
            </el-menu-item>
          </div>
        </div>

      </el-menu>
    </el-scrollbar>

    <sub-bar/>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import Logo from './Logo'
import SubBar from './SubBar'
import variables from '@/styles/variables.scss'
import { getLeftMenu } from '@/api/menu'

export default {
  components: { Logo, SubBar },
  data() {
    return {
      menuList: []
    }
  },
  created() {
    this.getMenuTreeList()
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar',
      'campaignType',
      'campaignStatus',
      'adGroupStatus',
      'campaignId',
      'adGroupId'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  watch: {
    campaignStatus: function(newd, old) {
      this.getMenuTreeList()
    },
    campaignType: function(newd, old) {
      this.getMenuTreeList()
    },
    adGroupStatus: function(newd, old) {
      this.getMenuTreeList()
    }
  },
  methods:{
    changeCampaignType(type){
      this.$store.dispatch('menu/changeMenuType', 'campaign')
      this.$store.dispatch('menu/changeCampaignType', type)
    },
    changeCampaignStatus(status) {
      this.$store.dispatch('menu/changeCampaignStatus', status)
    },
    changeAdGroupStatus(status) {
      this.$store.dispatch('menu/changeAdGroupStatus', status)
      this.getMenuTreeList()
    },
    changeCampaignId(Id) {
      this.$store.dispatch('menu/changeCampaignId', Id)
    },
    changeAdGroupId(Id) {
      this.$store.dispatch('menu/changeAdGroupId', Id)
    },
    handleCampaign(menu) {
      console.log(this.$route.path)
      console.log(menu.campaignId)
      // 需要后续考虑，
      this.$store.dispatch('menu/changeMenuType', 'adgroup')
      this.$store.dispatch('menu/changeCampaignId', menu.campaignId)
      this.$store.dispatch('menu/changeAdGroupId', '')
    },
    handleAdGroup(menu,adgroup) {
      console.log(menu.campaignId)
      console.log(adgroup.adGroupId)
      this.$store.dispatch('menu/changeMenuType', 'ad')
      this.$store.dispatch('menu/changeCampaignId', menu.campaignId)
      this.$store.dispatch('menu/changeAdGroupId', adgroup.adGroupId)
    },
    getMenuTreeList() {
      var params = {
        'campaignType': this.campaignType,
        'campaignStatus': this.campaignStatus,
        'adGroupStatus': this.adGroupStatus,
      }
      getLeftMenu(params).then(response => {
         this.menuList = response.data
      })
    }
  }
}
</script>


<style lang="scss">
  .el-menu-item {
    color: #fff;
    font-size: 13px;
  }
  .el-dropdown-menu{
    border-radius: 0;
    padding: 10px 0;
    margin: 0;
    border:0;
    .category{
      width: 170px;
      padding: 10px 24px;
      white-space: nowrap;
      color: #9e9e9e;
      font-size: 12px;
      font-weight: 400;
    }
    .campaign-menu{
      padding: 0 !important;
    }

    .campaign-menu-status{
      height: 32px;
      line-height: 32px;
      font-size: 15px;
      color: rgba(0,0,0,.87);
      padding: 0px 24px;
      &:hover,&.is-active{
        color: #4285f4;
        list-style:none;
        background-color: #e0e0e0;
        box-shadow: inset 4px 0 0 0 #3b78e7;
      }
    }
  }

  .campaign-menu-item-1{
    .el-submenu__title{
      height: 40px;
      line-height: 40px;
    }
  }

  .campaign-menu-item-2{
    height: 40px;
    line-height: 40px;
  }

</style>

<style lang="scss" scoped>
  .el-menu {
    .el-dropdown-menu{
      width: 200px;
    }
    font-size: 12px;
    li{
      min-height: 50px;
      font-size: 12px !important;
      line-height: 50px;
    }
    .svg-middle{
      font-size: 20px;
      vertical-align: middle;
    }
    .module-bottom{
      border-bottom: 1px solid rgba(255,255,255,.12);
    }
    .adgroup-menu-li{
    }
  }
  .menu-tips{
    font-size: 12px;
    font-weight: 400;
    box-sizing: border-box;
    word-break: keep-all;
    color: rgba(255,255,255,.7);
    padding: 0px 16px 8px 16px;
    background: #424242;
  }
</style>


