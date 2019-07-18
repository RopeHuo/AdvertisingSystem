<template>
  <div class="audience-box">
    <div class="left-box">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="left-box-tab">
        <!--<el-tab-pane label="搜索" name="first">-->
          <!--<div class="google-input-box">-->
            <!--<el-input class="google-input" placeholder="根据字、词组或网址进行搜索或过滤"></el-input>-->
          <!--</div>-->
        <!--</el-tab-pane>-->
        <el-tab-pane label="浏览" name="second">
          <!--一级菜单内容-->
          <div v-show="menuShow" class="menu-category">
            <div @click="toggleMenu(0)"  class="child">
              他们是谁 ><br/>
              <span>（兴趣相似的受众群体和自定义的兴趣相似受众群体）</span>
            </div>
            <div @click="toggleMenu(1)"  class="child">
              他们有哪些兴趣和习惯 ><br/>
              <span>（兴趣相似的受众群体和自定义的兴趣相似受众群体）</span>
              <p v-if="select.affinity.length > 0"><span class="select-btn">选择了{{ select.affinity.length }}个</span></p>
            </div>
            <div @click="toggleMenu(2)" class="child">
              他们正在积极研究规划什么 ><br/>
              <span>（有具体兴趣的受众群体和自定义的意向受众群体）</span>
              <p v-if="select.in_market.length > 0"><span class="select-btn">选择了{{ select.in_market.length }}个</span></p>
            </div>
            <div @click="toggleMenu(3)"  class="child">他们通过何种方式与您进行了互动 ><br/>
              <span>（再营销和类似受众群体）</span>

            </div>
          </div>

          <!--二级菜单内容-->
          <div  v-show="!menuShow" class="menu-list">
            <div class="header-title">
              <i class="el-icon-arrow-left" @click="toggleMenu(-1)" /> <span> {{ audienceTitle }}</span>
            </div>
            <div class="content">
              <div v-if="audienceIndex==0" class="tree-box">
                <div class="empty">
                  <p><i class="el-icon-search" /></p>
                  <p class="develop">正在研发中...</p>
                </div>
              </div>
              <div  v-if="audienceIndex==1" class="tree-box">
                <div @click="showTree('affinity')" class="title">兴趣相似的受众群体 <i :class="slideAffinityTree ? 'arrows el-icon-arrow-up' : 'arrows el-icon-arrow-down' "></i></div>
                <el-tree
                    v-show='slideAffinityTree'
                    check-strictly
                    ref='affinitytree'
                    show-checkbox
                    node-key="id"
                    :data="characterList.affinity"
                    :default-checked-keys="select.affinity"
                    :default-expanded-keys='select.affinity'
                    :props="defaultProps"
                    @check-change="checkAffinityTree">
                </el-tree>
              </div>

              <div  v-if="audienceIndex==2" class="tree-box">
                <div @click="showTree('in_market')" class="title">有具体兴趣的受众群体 <i :class="slideMarketTree ? 'arrows el-icon-arrow-up' : 'arrows el-icon-arrow-down' "></i></div>
                <el-tree
                    v-show='slideMarketTree'
                    check-strictly
                    ref='markettree'
                    show-checkbox
                    node-key="id"
                    :data="characterList.in_market"
                    :default-checked-keys="select.in_market"
                    :default-expanded-keys='select.in_market'
                    :props="defaultProps"
                    @check-change="checkMarketTree">
                </el-tree>
              </div>

              <div  v-if="audienceIndex==3" class="tree-box">
                <div class="empty">
                  <p><i class="el-icon-search" /></p>
                  <p class="develop">正在研发中...</p>
                </div>
              </div>
            </div>
          </div>

        </el-tab-pane>
      </el-tabs>
    </div>
    <!---默认选择项--->
    <div class="right-box">
      <div class="title">已选择{{ countSelect }} 项 <span @click="resetChecked">全部清除</span></div>
      <div class="content">
        <div class="padding" v-if="select.affinity.length==0 && select.in_market==0 ">选择一个或多个要观察的受众群体</div>


        <div class="box" v-if="select.affinity.length > 0">
          <div class="box-title">兴趣相似的受众群体</div>
          <ul>
            <li class="flex space-between" v-for="(item,index) in select.affinity" :key="index">
              <div class="p">{{ item.label }}</div>
              <i class="el-icon-circle-close"  @click="deleteAffinity(item.id)" :data-id='item.id' />
            </li>
          </ul>
        </div>

        <div class="box" v-if="select.in_market.length > 0">
          <div class="box-title"> 有具体兴趣的受众群体</div>
          <ul>
            <li class="flex space-between" v-for="(item,index) in select.in_market" :key="index">
              <div class="p">{{ item.label }} </div>
             <i class="el-icon-circle-close"  @click="deleteMarket(item.id)" :data-id='item.id' />
            </li>
            <!--<li class="flex space-between" >-->
              <!--<div class="m flex-column">-->
                <!--<div class="p">付款处理与外购服务</div>-->
                <!--<div class="t">付款处理与外购服务</div>-->
              <!--</div>-->
              <!--<i class="el-icon-circle-close" />-->
            <!--</li>-->
            <!--<li class="flex space-between"><div class="p">付款处理与外购服务</div> <i class="el-icon-circle-close" /></li>-->
          </ul>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import { getCharacteristicArray } from '@/api/criteria'

  export default {
    props:['selectList'],
    created() {
      this.getCharacteristicList()
    },
    data() {
      return {
        activeName: 'second',
        menuShow:true,
        editShow:false,
        audienceIndex:0,
        audienceTitle: '',
        audienceTitleArray:[
          '他们是谁',
          '他们有哪些兴趣和习惯',
          '他们正在积极研究或规划什么',
          '他们通过何种方式与您进行了互动'
        ],
        slideAffinityTree: false,
        slideMarketTree: false,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        characterList:{
          affinity: [],
          in_market : []
        },
        types : ["affinity","in_market"],
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
      getCharacteristicList(){
        let self = this
        getCharacteristicArray( { types : this.types }).then(response => {
          if (response.success) {
            self.characterList = response.data
          }
        })
      },
      checkAffinityTree(data,state){
        if(state){
          this.select.affinity.push(data)
        }else{
          this.select.affinity.map((item,index)=>{
            if(item.id==data.id){
              this.select.affinity.splice(index,1)
            }
          })
        }
      },
      checkMarketTree(data,state){
        if(state){
          this.select.in_market.push(data)
        }else{
          this.select.in_market.map((item,index)=>{
            if(item.id==data.id){
              this.select.in_market.splice(index,1)
            }
          })
        }
      },
      deleteMarket(id){
        this.$refs.markettree.setChecked(id,false)
      },
      deleteAffinity(id){
        this.$refs.affinitytree.setChecked(id,false)
      },
      showTree(treeName){
        switch (treeName){
          case 'affinity':
            this.slideAffinityTree = !this.slideAffinityTree
            break;
          case 'in_market':
            this.slideMarketTree = !this.slideMarketTree
            break;
        }
      },
      resetChecked() {
        this.$refs.markettree.setCheckedKeys([]);
        this.$refs.affinitytree.setCheckedKeys([]);
      },
      handleClick(tab, event) {

      },
      toggleMenu(index){
        if(index >= 0){
          this.menuShow = 0
          this.audienceIndex = index;
          this.audienceTitle = this.audienceTitleArray[index]
        }else
          this.menuShow = 1
      },
      changeEditStatus(){
        this.editShow = !this.editShow
      }
    }
  };
</script>

<style lang="scss">
  .left-box-tab{
    .el-tabs__item{
      width: 100px;
      text-align: center;
    }
  }
  .left-box-tab{
    .el-tabs__header{
      margin-bottom: 0px !important;
    }
  }

</style>

<style lang="scss" scoped>
 .audience-box {
    width: 100%;
    flex: 1;
    display: flex;
  }

.left-box{
  display: flex;
  width: 50%;
  border-right: 1px solid #e0e0e0;
  .left-box-tab{
    width: 100%;
  }
  .menu-list{
    .header-title{
      height: 46px;
      padding: 5px 10px;
      line-height: 40px;
      border-bottom: 1px solid #e0e0e0;
      font-size: 13px;
      font-weight: 400;
      i{
        font-size: 23px;
        vertical-align: sub;
      }
    }
  }

  .tree-box{
    .title{
      height: 42px;
      line-height: 42px;
      padding-left: 15px;
      i{
        padding-left: 20px;
      }
      &:hover{
        background-color: #e0e0e0;
      }
    }
    .empty{
      text-align: center;
      font-size: 33px;
      font-weight: 200;
      .develop{
        font-size: 20px;
      }
    }

  }

  .select-btn{
    background-color: #4285f4;
    border-radius: 4px;
    padding: 2px 8px;
    color: #fff !important;
  }

  .menu-category{
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    .child{
      display: flex;
      flex-direction: column;
      color: rgba(0,0,0,.87);
      cursor: pointer;
      padding: 10px 0 10px 24px;
      width: 100%;
      font-size: 13px;
      min-height: 100px;
      font-weight: 400;
      border: 1px solid transparent;
      span{
        color: #928c8c;
      }
      &:hover{
        background-color: #e0e0e0;
        border: 1px solid #e0e0e0;
      }
    }
  }
}

  .right-box{
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 50%;
    .title{
      padding: 0 10px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
    }
    .content{
    }
    .box{
      .box-title{
        background-color: whitesmoke;
        border: 0 solid #e0e0e0;
        border-width: 1px 0;
        color: rgba(0,0,0,.54);
        font-size: 12px;
        font-weight: 500;
        line-height: 24px;
        margin-top: -1px;
        padding: 12px 16px;
      }
      ul{
        margin: 0;
        li{
          height: 40px;
          padding: 0 10px;
          line-height: 40px;
          .m{
            line-height: 20px;
          }
          .p{
            color: #9e9e9e;
            font-size: 12px;
            font-weight: 400;
          }
          .t{
            font-size: 13px;
            font-weight: 400;
            cursor: pointer;
            display: block;
            padding-bottom: 2px;
          }
          .el-icon-circle-close{
            font-size: 20px;
            line-height: 40px;
            color: #9ea2ab;
          }
          &:hover{
            background-color: #e0e0e0;
          }
        }
      }

    }

  }

 .el-tree{
   padding-left: 20px;
   .el-tree-node-label{
     padding-left: 15px;
   }
 }

</style>
