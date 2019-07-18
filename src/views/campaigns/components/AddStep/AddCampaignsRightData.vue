<template>
  <div class="padding">
    <p>您所指定的定位条件的覆盖面<i class="el-icon-question" /></p>
    <p>展示次数</p>
    <div class="number">100 亿以上</div>

    <br/><br/>
    <div slot="title" class="title" >
      <span class="field">决定覆盖面的因素</span> <i class="el-icon-question"></i>
    </div>
    <div>地理位置</div>
    <div> 语言</div>


  </div>
</template>

<script>

  export default {

    data(){
      return {
      }
    }
  }
</script>

<style lang="scss">
  .padding{
    padding: 10px;
  }
</style>

<style lang="scss" scoped>
 .el-collapse{
   border-top: 0px solid #e6ebf5;
   border-bottom: 0px solid #e6ebf5;
   background-color: #0a76a4;
 }

</style>
