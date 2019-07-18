<template>

  <section class="sub-bar">
    <ul>
      <router-link to="/dashboard"><li>概览  <svg-icon icon-class="index_blue" class="svg-index"/></li></router-link>
      <!--<router-link to="/recommendations/index"><li>建议</li></router-link>-->
    </ul>
    <span class="ul-bottom"   v-if="menuType == 'campaign' || menuType=='adgroup'" ></span>
    <ul>
      <router-link to="/campaigns/index" v-if="menuType == 'campaign'"><li>广告系列</li></router-link>
      <router-link to="/adgroup/index"  v-if="menuType == 'campaign' || menuType=='adgroup'"><li>广告组</li></router-link>
    </ul>
    <span class="ul-bottom"></span>
    <ul  >
      <router-link to="/ad/index"><li >广告与附加信息</li></router-link>
      <li @click="develop" class="none">着陆页</li>
    </ul>
    <span class="ul-bottom"></span>
    <ul >
      <router-link to="/keyword/index"><li >关键字</li></router-link>
      <router-link to="/audiences/index"><li>受众群体</li></router-link>
      <!-- <router-link to="/topics/index"> <li  >主题</li></router-link> -->
      <li @click="develop"  class="none">展示位置</li>
    </ul>
    <span class="ul-bottom"></span>
    <ul >
      <li @click="develop" class="none">设置</li>
      <router-link to="/location/index"><li>地理位置</li></router-link>
      <router-link to="/adschedules/index"><li >投放时间</li></router-link>
      <li @click="develop" class="none">设备</li>
      <li @click="develop" class="none">高级出价调整</li>
    </ul>
    <ul class="none">
      <li @click="develop">更改历史记录</li>
    </ul>

    <ul class="none">
      <li @click="develop">草稿和实验</li>
    </ul>
  </section>
</template>

<script>

  import { mapGetters } from 'vuex'

export default {
  name: 'SubBar',
  computed: {
    ...mapGetters([
      'menuType',
    ]),
  },
  methods: {
    develop() {
      this.$message('研发中,敬请期待');
    },
  }
}
</script>

<style lang="scss" scoped>

  .hideSidebar .sub-bar{
    left: 0px;
  }

  .sub-bar{
    position: fixed;
    top: 64px;
    margin-top: 3px;
    left: 210px;
    width: 140px;
    height: 100%;
    background-color: #f5f5f5;
    border-right: 1px solid #d7d7d7;
    z-index: 1002;

    .ul-bottom{
      height: 1px;
      width: 80%;
      display: block;
      margin: 5px auto;
      border-bottom: 1px solid #d7d7d7;
    }

    ul{
      margin: 0;
      padding: 0;
      width: 100%;


      li{
        width: 100%;

        padding-left: 20px;
        font-size: 13px;
        line-height: 40px;
        cursor: pointer;
        font-weight: 500;
        height: 40px;
        list-style:none;
        &:hover{
          color: #4285f4;
          min-height: 40px;
          line-height: 40px;
          list-style:none;

          box-shadow: inset 4px 0 0 0 #3b78e7;

        }
      }

      .svg-index{
        display: inline-block;
        float: right;
        margin-top: 12px;
        font-size: 14px;
      }

      li:active,.router-link-active{
        color: #4285f4;

        list-style:none;
        background-color: #e0e0e0;
        box-shadow: inset 4px 0 0 0 #3b78e7;

      }
    }

  }
</style>
