<template>
  <div class="operation-edit-box space-between">
    <div class="flex left">
      <span class="selection">已选择<span class="">全部</span> {{ multipleSelection.length }} 行</span>
      <span class="spacing" />
      <el-dropdown
        trigger="click"
        placement="bottom-start"
        class="edit-selection-menu"
      >
        <span>修改 <i class="el-icon-arrow-down" /></span>
        <el-dropdown-menu
          slot="dropdown"
          split-button
        >
          <div>
            <el-dropdown-item class="selection-menu">
              <a
                class="selection-menu-status"
                @click="handleStatus('ENABLED')"
              > 启用</a>
            </el-dropdown-item>
            <el-dropdown-item class="selection-menu">
              <a
                class="selection-menu-status"
                @click="handleStatus('PAUSED')"
              >暂停</a>
            </el-dropdown-item>
            <el-dropdown-item class="selection-menu">
              <a
                class="selection-menu-status"
                @click="handleStatus('RESERVED')"
              >移除</a>
            </el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div class="right">
      <i
        class="el-icon-close delete"
        @click="cancel" 
      />
    </div>
  </div>
</template>

<script>

  export default {
    props: ["multipleSelection"],
    data(){
      return {
      }
    },
    methods :{
      handleStatus(status) {
        this.$emit('operationStatus',status)
      },
      cancel(){
        this.$emit("setOperationName",'')
      }
    }
  }
</script>

<style lang="scss">
  .edit-selection-menu{

  }
  .selection-menu{
    padding: 0 !important;
    .selection-menu-status{
      padding: 5px 10px;
      width: 243px;
    }
  }
</style>

<style lang="scss" scoped>
  .operation-edit-box{
    background-color: #4285f4;
    color: #fff;
    line-height: 56px;
    padding: 0 20px;
    height: 56px;
    display: flex;

    .selection{
      line-height: 56px;
      cursor: default;
      font-size: 15px;
      padding: 0 8px;
    }

    .spacing{
      border-color:  #fff;
    }

    .edit-selection-menu{
      cursor: pointer;
      color: #fff;
    }

    .delete{
      font-size: 18px;
      color: #fff;
    }
  }

</style>

