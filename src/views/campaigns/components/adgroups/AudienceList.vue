<template>
<div>
  <el-table
      class="table"
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        width="80px"
        type="selection"
        >
      </el-table-column>
      <el-table-column
        label="受众群体"
        >
        <template scope="scope">
          <div>{{ scope.row.criterionName}}</div>
        </template>
        <!-- <template scope="scope"></template> -->
      </el-table-column>
      <el-table-column
        prop="categoryName"
        label="类型"
        >
      </el-table-column>
      <el-table-column
        prop="adGroupName"
        label="广告组"
        
        >
      </el-table-column>
      <el-table-column
        prop="statusName"
        label="状态"
        >
      </el-table-column>
  </el-table>
  <el-button @click="editGroup">编辑</el-button>
  <!-- 添加受众群体 -->
  <el-dialog
    title="添加受众群体"
    :visible.sync="dialogVisible"
    class="dialog"
    >
    <div class="visible_box">
      <el-tabs class="l" v-model="activeName" @tab-click="tabChange">
        <el-tab-pane label="搜索" name="first">搜索</el-tab-pane>
        <el-tab-pane label="概览" name="second">
          <div v-show="menuShow" class="menu_1">
            <div  class="menu">他们是谁 ></div>
            <div @click="toggleMenu" class="menu">他们正在积极研究规划什么 ></div>
            <div class="menu">他们通过何种方式与您进行了互动 ></div>
          </div>
          <div  v-show="!menuShow" class="menu2">
            <div class="title">
              <el-button type="primary" plain class="btn" @click="toggleMenu" icon="el-icon-arrow-left">返回</el-button>
              <span>他们正在积极研究什么</span>
            </div>
            <div class="content">
              <div @click="showTree" class="title">有具体兴趣的受众群体<i :class="slideTree?'arrows el-icon-arrow-up':'arrows el-icon-arrow-down' "></i></div>
              <el-tree
                  v-show='slideTree'
                  check-strictly
                  ref='tree' 
                  show-checkbox 
                  :data="data" 
                  node-key="criterionId"
                  :default-checked-keys="currentList"
                  :default-expanded-keys='currentList'
                  :props="defaultProps"  
                  @check-change="checkTree">
              </el-tree>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="提示" name="third">提示</el-tab-pane>
      </el-tabs>
      <div class="r">
        <div class="title">已选择{{listData.length}}项</div>
        <div class="content">
          <div class="box">
            <div class="box_title">有具体兴趣的受众群体</div>
            <div class="box_li" v-for="(item,index) in listData" :key="index">
              <div class="li_l">{{item.label}}</div>
              <i @click="delGroup" :data-id='item.criterionId' class="li_r el-icon-circle-close"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible=false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</div>
  
</template>

<script>
  export default {
    data() {
      return {
        myItem:'',
        menuShow:true,
        slideTree:true,//是否下拉树状菜单
        activeName: 'second',//tab栏当前选中
        dialogVisible: false,
        currentList:[],
        tableData: [],
        listData:[],
        checkVal: [],
        data: [],
        criterionIds:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        post: {
					table: {
						type: 'USER_INTEREST'
					},
					checkbox:{},
					// checkAll:false,
					// isIndeterminate:false
				},
      }
    },
    created () {
  
    },
    mounted () {
      
      
    },
    methods: {
      //checkbox值改变的事件
      handleSelectionChange(val) {
        console.log(val);
        this.checkVal = val;
      },
      // 添加受众群体tab栏切换事件
      tabChange(tab, event) {
        console.log(tab, event);
      },
      //跳转树形图
      toggleMenu(){
        this.menuShow=!this.menuShow
        this.listData=this.$refs.tree.getCheckedNodes()
        // console.log(this.$refs.tree.getCheckedNodes());
      },
      //树形图选中状态改变事件
      checkTree(a,state){
        console.log(a);
        // console.log(state);
        if(state){
          this.listData.push(a)
        }else{
          this.listData.map((item,index)=>{
            if(item.criterionId==a.criterionId){
              this.listData.splice(index,1)
            }
          })
        }
      },
      //展开或者收起树形图
      showTree(){
        this.slideTree=!this.slideTree
        // console.log(this.$refs.arrows);
        // console.log(this.$refs.tree.getCheckedNodes());
        
      },
      //编辑按钮
      editGroup(){
        this.dialogVisible = true
        this.showTree()

        let params = Object.assign(this.post.table, {campaign_id: this.$route.params.id})
				this.$http.get('google-criterions/tree/USER_INTEREST').then((res) =>{
          console.log(res);
          if(res.code==200){
            this.data=res.data
          }
        })
      },
      //删除受众群体
      delGroup(e){
        console.log(e);
        let del_id=+e.target.dataset.id
        // console.log(del_id);
        // this.tableDataCopy.splice(this.tableDataCopy.indexOf(del_id),1)

        // this.currentList.splice(this.currentList.indexOf(del_id),1)
        this.$refs.tree.setChecked(del_id,false)
        // console.log(this.currentList);
        // this.tableDataCopy.map(item=>{
        //   if(item.id==del_id){
        //     this.tableDataCopy.splice(this.tableDataCopy.indexOf(item),1)
        //   }
        // })
      },
      submit(){
        this.dialogVisible=false
        // console.log(this.listData);
        this.listData.map(item=>{
          this.criterionIds.push(item.criterionId)
        })
        // console.log(this.criterionIds);
        this.$http.post('adgroups/'+this.$route.params.id+'/audiences',{criterionIds:this.criterionIds}).then(res=>{
          console.log(res);

              // let params = Object.assign(this.post.table, {campaign_id: this.$route.params.id})
              this.$http.get('adgroups/'+this.$route.params.id+'/audiences').then(res=>{
                if(res.code==200){
                  this.tableData=res.data
                  console.log(res);
                        // this.tableDataCopy=JSON.parse(JSON.stringify(this.tableData))
                    this.tableData.map(item=>{
                      this.currentList.push(item.criterionId)
                    })
                }
              })

        })
      }
    }
  }
</script>
<style lang="scss">
.visible_box {
  .el-tabs__header{
    margin: 0!important;
  }
  .btn{
    margin-left: 10px;
    line-height: 1;
  }
  .el-tree{
    border:none;
  }
}
</style>

<style lang="scss" scoped>
.table{
  margin-bottom: 65px;
}
.dialog{
  width: 120%;margin-left: -10%;
  .visible_box{
    height: 450px;border: 1px solid #dbdbdb;overflow: hidden;
    .l{
      float: left;width: 50%;border-right: 1px solid #dbdbdb;height: 100%;
      .menu_1{
        width: 100%;
        height: 100%;
         .menu{
          height:136px;border-bottom: 1px solid #dbdbdb;padding-left: 50px;padding-top: 52px;font-size: 16px
        }
      }
      .menu2{
        .title{
          border-bottom: 1px solid #dbdbdb;
          span{
            line-height: 50px;
            padding-left: 20px;
          }
        }
        .content{
          overflow:scroll;
          height: 356px;
          .title{
            line-height: 40px;
            padding-left: 20px;
            position: relative;
            cursor: pointer;
            .arrows{
              position: absolute;
              right: 15px;
              top: 15px;
            }
          }
          .el-tree{
            padding-left: 30px;
          }
        }
      }
     
    }
    .r{
      float: left;width: 50%;height:100%;
      .title{
        line-height: 41px;
        border-bottom: 1px solid #dbdbdb;
        padding-left: 20px;
        font-size: 14px;
      }
      .content{
        height: 450px;
        overflow: scroll;
        .box{
          .box_title{
            line-height: 48px;
            border-top: 1px solid #dbdbdb;
            border-bottom: 1px solid #dbdbdb;
            background-color: #f5f5f5;
            color:#6e6e6e;
            font-size: 12px;
            padding-left: 20px;
          }
          .box_li{
            padding:10px 20px;
            display: flex;
            align-items:center;
            justify-content: space-between;
            .li_l{
              // float: left;
              border-bottom: 2px dashed #959595;
            }
            .li_r{
              // float: right;
              // margin-top: 10px;
              font-size: 20px;
              color:#959595;
              padding-top: 5px;
              cursor: pointer;
            }
            .li_r:hover{
              color:#20a0ff
            }
          }
        }
      }
    }
  }
}

</style>
