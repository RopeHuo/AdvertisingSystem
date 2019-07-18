<template>
  <div class="ess-header flex">
    <div class="link">
      <div class="head-link active">已定位</div>
      <!--<div class="head-link">已排除</div>-->
      <!--<div class="head-link">地理位置报告</div>-->
      <!--<div class="head-link">时段</div>-->
    </div>

    <div class="date">

    </div>
  </div>
</template>

<script>

  export default {

  }
</script>


<style lang="scss" scoped>
.ess-header{
  display: flex;
  flex-shrink: 0;
  background: #fff;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12), 0 1px 5px 0 rgba(0,0,0,.2);
  z-index: 101;
  margin-bottom: 5px;
  height: 50px;
  .head-link{
    margin: 0;
    cursor: pointer;
    font-size: 12px;
    text-align: center;
    line-height: 50px;
    padding: 0 16px;
    min-width: 160px;
    width: auto;
    &.active{
      color: #4285f4;
      background-color: #e8f0fd;
      border-bottom: 2px solid #4285f4;
    }
    &:hover{
      background-color: #ebebeb;

    }
  }
}

</style>

