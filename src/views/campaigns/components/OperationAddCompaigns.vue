<template>
  <div>
    <router-link to="/campaigns/add">
      <div class="add">
        <svg-icon icon-class="operation-create" class="operation-create"/>
      </div>
    </router-link>

  </div>

</template>

<script>
  export default {
    data(){
      return {
      }
    },
    methods :{
    }
  }
</script>


<style lang="scss" scoped>
  .add{
    position: absolute;
    top: -18px;
    height: 40px;
    width: 40px;
    text-align: center;

    .operation-create{
      font-size: 36px;
      cursor: pointer;
      transition: box-shadow .28s cubic-bezier(0.4,0,0.2,1);
      &:hover{
        opacity: 0.8;
      }
    }
  }
</style>
