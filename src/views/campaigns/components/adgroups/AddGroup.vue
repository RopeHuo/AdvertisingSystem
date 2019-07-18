<template>
  <div class="">

    <el-form  :model="form" :rules="rules" ref="ruleForm">

    <div class="group-title">
      <p>制作广告组</p>
      <div>  为了更准确地定位，请根据具体主题或广告内容来整理每个广告组</div>
    </div>

     <div class="custom-collapse">
      <div class="header">
        <span class="field">广告组名称</span>
        <div class="google-input-box" >
          <el-form-item  prop="adGroupName">
            <el-input class="google-input" v-model="form.adGroupName"  placeholder="请输入广告组名称" maxlength="50" show-word-limit="true"></el-input>
          </el-form-item>
        </div>
      </div>
    </div>

    <!--用户：您希望覆盖哪些人在此指定受众群体和/或受众特征-->
    <el-collapse v-model="activeName" >

      <el-collapse-item name="price">
        <template slot="title" class="title">
          <span class="field">广告组出价</span>
          {{ form.microAmount ? "￥" + form.microAmount : "未出价"  }}
        </template>
        <div class="collapse-content">
          <div class="">
            <div class="flex flex-row">

              <div class="">
                <!--<div>为此广告组输入智能点击付费出价</div>-->
                <!--<div>输入此广告组的每千次可见展示费用出价</div>-->
                <div class="google-input-box" >
                  <el-form-item  prop="microAmount">
                    <el-input class="google-input" v-model="form.microAmount"  placeholder="请输入广告组出价" maxlength="50" show-word-limit="true"></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>

          </div>
        </div>
      </el-collapse-item>

      <!--受众群体-->
      <el-collapse-item name="audience" v-if="advertisingChannelType == 'DISPLAY'">
        <template slot="title" class="title">
          <span class="field">受众群体</span>
          <div class="">
            <span v-if="criterionsTitle.audience"> <span class="ell-title">{{ criterionsTitle.audience }}  </span> &nbsp; &nbsp;共({{ criterionsTitle.audienceCount }})</span>
          </div>
        </template>
        <div class="collapse-content">
          <audience v-on:getAudience="getAudience" />
        </div>
      </el-collapse-item>

      <!--受众特征-->
      <el-collapse-item name="characteristic">
        <template slot="title" class="title">
          <span class="field">受众特征</span>
          <div class="">
            <span v-if="criterionsTitle.characteristic">按 {{ criterionsTitle.characteristic }}覆盖用户</span>
            <span v-else>暂未选择</span>
          </div>
        </template>
        <div class="collapse-content">
          <characteristic v-on:getCharacteristic ="getCharacteristic" />
        </div>
      </el-collapse-item>
    </el-collapse>


    <el-collapse v-model="activeName"class="none" >
      <el-collapse-item name="range">
        <template slot="title" class="title">
          <span class="field">扩大定位范围</span>
        </template>
        <div class="collapse-content">
          <div class="">
            <div class="flex flex-row">

              <div class="range-controller">
                <div>根据上面所选的肯定定位和设置扩大您的覆盖面</div>
                <div>增加的覆盖面（估算的每周数据）</div>

                <div class="range-slider">
                  <span class="text">停用</span>
                  <div class="middle">
                    <el-slider
                        :step="20"
                        show-stops>
                    </el-slider>
                  </div>

                  <span class="text">覆盖面更大</span>
                </div>
              </div>

              <div class="range-desc">
                通过让 Google 寻找类似于您的定位的表现出色的受众群体覆盖更多用户。扩大覆盖面可提升展示次数、点击次数和转化次数。
              </div>
            </div>

          </div>
        </div>
      </el-collapse-item>



    </el-collapse>

    </el-form>

  </div>
</template>

<script>
  import Audience from './Audience'
  import Characteristic from './Characteristic'
  import AudienceList from './AudienceList'

  export default {
    props: ["advertisingChannelType"],
    components:{ Audience, Characteristic, AudienceList },
    data(){
      return{
        activeName: ["range","audience","characteristic","price"],
        form:{
          adGroupName: '',
          matchType: '',
          status:'ENABLED', // 默认启动
          microAmount: '',
          criterions: {
            USER_INTEREST_BRAND: [],
            USER_INTEREST_IN_MARKET: [],
            AGE_RANGE: [],
            PARENT: [],
            INCOME_RANGE: [],
            GENDER: []
          },
        },
        criterionsKeyValues:{
          affinity: 'USER_INTEREST_BRAND',
          in_market: 'USER_INTEREST_IN_MARKET',
          age_range: 'AGE_RANGE',
          gender: 'GENDER',
          income_range: 'INCOME_RANGE',
          parent: 'PARENT',
        },
        criterionsKeyName:{
          USER_INTEREST_BRAND: '',
          USER_INTEREST_IN_MARKET: '',
          AGE_RANGE: '年龄',
          PARENT: '生育',
          INCOME_RANGE: '收入',
          GENDER: '性别'
        },
        criterionsTitle:{
          audience: '',
          audienceCount: 0,
          characteristic: '',
          characteristicCount:0,
        },
        rules: {
          adGroupName: [
            { required: true, message: '请输入广告组名称', trigger: 'blur' },
            { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          ],
          microAmount: [
            { required: true, message: '请输入出价金额', trigger: 'blur' },
          ]
        }
      }
    },
    methods:{
      getFormOrigin(){
        let self = this
        var validateResult  = false

        // 校验后
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            validateResult = true
            return true;
          } else {
            console.log('error submit!!');
            return false;
          }
        });

        if(validateResult){
          return self.form
        }else{
          return false
        }
      },
      getAudience(selecObject){
        let self = this
        var title = '';
        var count = 0;
        if(selecObject){
          Object.keys(selecObject).forEach(function(key){
            var criterionsKey = self.criterionsKeyValues[key]
            if(criterionsKey){
              var list = [];
              var data = selecObject[key]
              data.forEach(function (item) {
                title += item.label + ',' ;
                list.push(item.id);
                count ++;
              })
              self.form.criterions[criterionsKey] = list
            }
          });
        }
        this.criterionsTitle.audienceCount = count;
        this.criterionsTitle.audience = title;
      },
      getCharacteristic(selecObject){
        let self = this
        var title = '';
        if(selecObject){
          Object.keys(selecObject).forEach(function(key){
            var criterionsKey = self.criterionsKeyValues[key]
            if(criterionsKey){
              var list = [];
              var data = selecObject[key]
              if(data.length > 0){

                title += self.criterionsKeyName[criterionsKey] + " ,";
                data.forEach(function (item) {
                  list.push(item);
                })
              }
              self.form.criterions[criterionsKey] = list
            }
          });
        }
        this.criterionsTitle.characteristic = title;
      }
    }
  }
</script>

<style lang="scss">

  .range-controller{
    display: flex;
    flex-direction: column;
    flex: 2;
    .range-slider{
      .text{
        float: left;
        display: inline-block;
        line-height: 40px;
        height: 40px;
        font-size: 14px;

      }
      .middle{
        float: left;
        margin: 0 10px;
        width: 300px;
      }

      display: inline-block;
    }
  }
  .range-desc{
    display: flex;
    flex: 1;
  }

  .ell-title{
    max-width: 400px;
    text-overflow:ellipsis;
    overflow:hidden;
    white-space:nowrap;
    display: inline-block;
    vertical-align: bottom;
  }

</style>
