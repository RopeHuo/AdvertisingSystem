<template>
  <div class="">

    <el-card class="box-card">

      <div slot="header" class="clearfix">
        <span>定位的受众特征</span>

        <el-button style="float: right; padding: 3px 0" type="text" @click="saveCharacteristic" v-if="!editShow"><i class="el-icon-edit" style="font-size: 18px; color: #333" /></el-button>
        <el-button style="float: right; padding: 3px 0" type="text" @click="saveCharacteristic" v-if="editShow">完成</el-button>
      </div>

      <div class="characteristic" v-if="editShow">
        <div class="characteristic-list">
          <select-characteristic  ref="selectCharacteristic" />
        </div>
      </div>

      <div class="" v-if="!editShow">
        <div v-if="select.age_range.length ==0 && select.income_range.length ==0 && select.parent.length ==0 && select.gender.length ==0">暂未选择受众特征</div>
        <div v-else>
          <div class="text item" v-if="select.age_range.length > 0">
            <p>年龄</p>
            <span>“<span v-for="item in select.age_range">{{ item.label }} </span>”共 {{ select.age_range.length  }} 个</span>
          </div>
          <div class="text item" v-if="select.gender.length > 0">
            <p>性别</p>
            <span>“<span v-for="item in select.gender">{{ item.label }} </span>”共 {{ select.gender.length  }} 个</span>
          </div>
          <div class="text item" v-if="select.parent.length > 0">
            <p>生育</p>
            <span>“<span v-for="item in select.parent">{{ item.label }} </span>”共 {{ select.parent.length  }} 个</span>
          </div>
          <div class="text item" v-if="select.income_range.length > 0">
            <p>收入范围</p>
            <span>“<span v-for="item in select.income_range">{{ item.label }}</span>”共 {{ select.income_range.length  }} 个</span>
          </div>

        </div>
      </div>

    </el-card>
  </div>
</template>

<script>

  import SelectCharacteristic from './SelectCharacteristic'

  export default {
    components: { SelectCharacteristic },
    data() {
      return {
        activeName: 'second',
        editShow: true,
        select: {
          age_range: [], // 年龄
          income_range: [], // 收入范围
          parent: [], // 生育
          gender: [] // 性别
        },
        criterions: {
          AGE_RANGE: [], // 年龄
          PARENT: [], // 收入范围
          INCOME_RANGE: [], // 生育
          GENDER: [] // 性别
        }
      };
    },

    methods: {
      handleClick(tab, event) {

      },
      saveCharacteristic(){
        this.editShow = !this.editShow




        this.select = this.$refs.selectCharacteristic.select

        this.$emit('getCharacteristic',this.select)
        // 获取子组成
        // 传递信息给父组件

      }
    }
  };
</script>



<style lang="scss" scoped>

  .box-card{
    .text{
      font-size: 13px;
      p{
        color: rgba(0,0,0,.54);
        margin-bottom: 0;
      }
    }
  }

  .characteristic{
    display: flex;
    min-height: 300px;
    flex: 1;
    width: 100%;
    flex-direction: row;
    padding: 10px 0;

    .header-title{
      width: 100%;
      padding-left: 20px;
      line-height: 40px;
      padding-right: 10px;
      border-bottom: 1px solid #e0e0e0;
      i{
        font-size: 18px;
      }
    }
  }
</style>
