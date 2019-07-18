<template>
  <div class="">

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>定位的受众群体({{ countSelect }})</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="openAudience" v-if="!editShow"><i class="el-icon-edit" style="font-size: 18px; color: #333" /></el-button>
        <el-button style="float: right; padding: 3px 0" type="text" @click="saveAudience" v-if="editShow">完成</el-button>
      </div>


      <div class="box-content"  v-if="!editShow">
        <div class="text item" v-if="select.affinity.length > 0">
          <p> 他们有哪些兴趣和习惯</p>
          <span>“<span v-for="item in select.affinity">{{ item.label }}&nbsp;&nbsp; </span>”共 {{ select.affinity.length  }} 个</span>
        </div>
        <div class="text item" v-if="select.in_market.length > 0">
          <p> 他们正在积极研究或规划什么</p>
          <span>“<span v-for="item in select.in_market">{{ item.label }}&nbsp;&nbsp; </span>”共 {{ select.in_market.length  }} 个</span>
        </div>
        <!--<div class="text item">-->
          <!--<p> 他们通过何种方式与您进行了互动</p>-->
          <!--<span>AdWords optimized list</span>-->
        <!--</div>-->
      </div>
      <div class="audience" v-if="editShow">
        <!---左栏选择项-->
        <select-audience ref="selectAudience" v-bind:selectList="select" />
      </div>

    </el-card>
  </div>
</template>

<script>
  import SelectAudience from './SelectAudience'

  export default {
    components: { SelectAudience },
    data() {
      return {
        editShow: true,
        count: 0,
        select :{
          affinity: [],
          in_market:[],
        }
      };
    },
    computed: {
      // 计算属性的 getter
      countSelect : function () {
        // `this` 指向 vm 实例
        return (this.select.affinity.length + this.select.in_market.length)
      }
    },
    methods: {
      openAudience(){
        this.editShow = !this.editShow
      },
      saveAudience(){
        this.editShow = !this.editShow
        // 获取子组件的值得
        this.select = this.$refs.selectAudience.select

        this.$emit('getAudience',this.select)
        // 传递给父组件的参数
      },
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

  .audience{
    display: flex;
    min-height: 500px;
    flex: 1;
    width: 100%;
    flex-direction: row;
    border: 1px solid #e0e0e0;
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
