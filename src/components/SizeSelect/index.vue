<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <svg-icon class-name="question" icon-class="question" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item of sizeOptions" :key="item.value" :disabled="size===item.value" :command="item.value">
        {{
          item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  data() {
    return {
      sizeOptions: [
        { label: '快速参考地图', value: 'default' },
        { label: '新功能和公告', value: 'medium' },
        { label: '引导步骤', value: 'small' },
        { label: '留言反馈', value: 'mini' },
        { label: '获得帮助', value: 'mini2' },
        { label: '键盘快捷键', value: 'mini3' },
      ]
    }
  },
  computed: {
    size() {
      return this.$store.getters.size
    }
  },
  methods: {
    handleSetSize(size) {
      // this.$ELEMENT.size = size
      // this.$store.dispatch('app/setSize', size)
      // this.refreshView()
      this.$message({
        message: '敬请期待',
        type: 'success'
      })
    },
    refreshView() {
      // // In order to make the cached page re-rendered
      // this.$store.dispatch('tagsView/delAllCachedViews', this.$route)
      //
      // const { fullPath } = this.$route
      //
      // this.$nextTick(() => {
      //   this.$router.replace({
      //     path: '/redirect' + fullPath
      //   })
      // })
    }
  }

}
</script>
