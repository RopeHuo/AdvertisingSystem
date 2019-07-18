<template>

  <div >


    <!--<div>-->

      <!--<el-submenu index="1-4">-->
        <!--<template slot="title">选项4</template>-->
        <!--<el-menu-item index="1-4-1">选项1</el-menu-item>-->
      <!--</el-submenu>-->
    <!--</div>-->

    <div class="menu-wrapper">
      {{ item.adGroupName }}

      <template v-if="item.adGroups.length == 0 || item.adGroupName">

          <el-menu-item>

              1级 {{ item.campaignName }} - {{ item.adGroups.length}}

          </el-menu-item>
      </template>
      <el-submenu v-else >
        <template slot="title">
         2级 {{ item.campaignName }} - {{ item.adGroups.length}}
        </template>
        <sidebar-new-item v-for="ad in item.adGroups" :item="ad" class="nest-menu" />
      </el-submenu>
    </div>


  </div>


</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
