<template>
  <div>
    <div class="" @click="add()">
      <svg-icon icon-class="operation-create" class="operation-create"/>
    </div>
  </div>

</template>

<script>
  export default {
    data(){
      return {
        dialogGroup: true
      }
    },
    methods :{
      add(){
        this.$emit('setOperationName','add')
      }
    }
  }
</script>


<style lang="scss" scoped>

</style>
