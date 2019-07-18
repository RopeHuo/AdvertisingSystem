<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <img src="../../../public/img/nav_logo.png" alt="" class="nav-logo">

    <span class="spacing left" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">


      <template v-if="device!=='mobile'">

        <search id="header-search" class="right-menu-item hover-effect" />

        <error-log class="errLog-container right-menu-item hover-effect" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />


        <span class="spacing vertical-top" />

        <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>



        <span class="right-menu-item hover-effect"> <svg-icon icon-class="notice"/></span>

        <span class="right-menu-item username">899804@qq.com</span>

      </template>


      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
        </div>
        <el-dropdown-menu slot="dropdown" class="nav-dropdown-menu">

          <router-link to="/profile/index">
            <el-dropdown-item class="nav-el-dropdown-item-gcy">
              <img :src="avatar" class="user-avatar ">
              <div class="">
                <div class="title">2851762198@qq.com</div>
                <a class="link">我的帐号</a> - <a class="link">隐私权</a>
              </div>

            </el-dropdown-item>
          </router-link>

          <el-dropdown-item divided class="nav-el-dropdown-item-logout">
            <el-button type="info" class="logout" @click="exit">退出</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>

      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    exit(){
      let self = this
      this.$confirm('您确定要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        // 创建iframe执行退出命令
        var iframe = document.createElement('iframe');

        iframe.src = 'http://api2.jisale.com/home?end=true';
        //iframe.src = "http://api.newsale.dev/home?end=true";
        iframe.id = "apiframe"
        iframe.style.display = 'none'
        document.body.appendChild(iframe);
        // 判断iframe 是否加载完毕
        if (iframe.attachEvent) {
          iframe.attachEvent("onload", function () {
            alert("Local iframe is now loaded.");
          });
        } else {
          let count = 0

          iframe.onload = function () {
            if(count >=1){
              setTimeout(function () {
                //cookie.remove("newsale_token")

                self.$message({type: 'success', message: '退出成功'});
                self.$router.push({path: '/auth'})
              }, 1000)
            }
            count++;
          };
        }
      }).catch(() => {
        this.$message({type: 'info', message: '取消'});
      });
    },
  }
}
</script>

<style lang="scss">
  .el-dropdown-menu{
    &:hover{
      background-color: #fff;
    }
  }
</style>

<style lang="scss" scoped>
.navbar {
  height: 64px;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1003;
  background: #616161;
  color: #fff !important;
  box-shadow: 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12), 0 2px 4px -1px rgba(0,0,0,.2);

  .nav-logo{
    line-height: 64px;
    margin: 12px 4px;
    height: 40px;
    float: left;
  }

  .spacing{
    height:24px;
    display: inline-block;
    color: #fff;
    border-right: 1px solid #9e9e9e;
    margin: 18px 10px 10px 20px;
  }

  .hamburger-container {
    line-height: 64px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;

    &:focus {
      outline: none;
    }



    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      line-height: 64px;
      height: 100%;
      font-size: 18px;
      color: #fff;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .4s;
        &:hover {
          background: rgba(0, 0, 0, .095)
        }
      }
    }

    .username{
      font-size: 12px !important;
      color: #fff;
    }

    .avatar-container {

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          background-color: #9e9e9e;
          border-radius: 16px;
          height: 32px;
          width: 32px;
          margin: 8px 4px 8px 4px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

.nav-el-dropdown-item-gcy{
  padding: 16px 24px !important;
  font-size: 13px;
  line-height: 21px;
  max-height: 568px;
  min-width: 320px;
  outline: none;
  background: #fff;;
  &:hover{
    background: #fff;
  }

  .user-avatar{
    display: inline-block;
    border-radius: 36px;
    height: 72px;
    width: 72px;
  }

  .link{
    display: inline-block;
    color: #3367d6;
    text-decoration: none;
  }
}

.nav-el-dropdown-item-logout{

  &:hover{
    background: #fff;
  }
  background: #fff;;
  border-top: 1px rgba(0,0,0,.12) solid;
  color: rgba(0,0,0,.54);

  .logout{
  }
}

</style>
