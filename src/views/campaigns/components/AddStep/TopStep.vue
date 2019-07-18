<template>

  <div class="top-step">
    <div class="step" :class="step >=2 ? 'active' : ''"><span class="step-num">1</span><span>制作广告系列</span> <span class="step-line"></span></div>
    <div class="step" :class="step >=3 ? 'active' : ''"><span class="step-num">2</span><span>设置广告组</span> <span class="step-line"></span></div>
    <div class="step" :class="step >=4 ? 'active' : ''"><span class="step-num">3</span><span>制作广告</span> <span class="step-line"></span></div>
    <div class="step" :class="step >=5 ? 'active' : ''"><span class="step-num">4</span><span>确认</span></div>
  </div>

</template>

<script>
  export default {
    props: {
      step: {
        type: Number,
        default: 1
      }
    },
    name: "top-step"
  }
</script>

<style lang="scss" scoped>

</style>