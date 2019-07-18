<template>
  <div class="">

    <el-form  :model="form" :rules="rules" ref="ruleForm">
      <el-collapse v-model="activeNames" @change="handleChange">
        <!--广告系列名称-->

        <div class="custom-collapse">
          <div class="header">
            <span class="field">广告系列名称</span>
            <div class="google-input-box">
              <el-form-item  prop="campaignName">
                <el-input v-model="form.campaignName" class="google-input" placeholder="请输入广告系列名称" ></el-input>
              </el-form-item>
            </div>
          </div>
        </div>

        <!--地理位置-->
        <el-collapse-item name="location">
          <template slot="title" class="title">
            <span class="field">地理位置</span>
            <div class="">
              {{ locationTitle }}
            </div>
          </template>
          <div class="collapse-content">
            选择要定位到的地理位置 <i class="header-icon el-icon-info"></i>
            <ul>
              <el-form-item  prop="locationModel">
                <li  v-for="(location,index) in locationArray" >
                  <el-radio :key="location.label" :label="String(location.label)" v-model="form.locationModel" @change="handleLocation" >
                    {{location.value}}
                  </el-radio>
                </li>
              </el-form-item>
            </ul>

            <ul class="select-location" v-if="form.locationModel == 2 ">
              <li>定位到的地理位置 ({{ form.location.length }})</li>
              <li class="li-select"  v-for="(item,index) in selectlocationArray" >{{ item.name }}, {{ item.targetType }} <i class="el-icon-error" @click="handleClose(index)" /></li>
            </ul>

            <div class="google-input-box">
              <el-button  @click="showDialogLocationComponents">高级搜索</el-button>
            </div>

            <el-dialog title="地理位置" :visible.sync="dialogLocationComponents"  width="800px">
              <location ref="location" />
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogLocationComponents = false">取 消</el-button>
                <el-button type="primary" @click="changeLocation">保 存</el-button>
              </div>
            </el-dialog>

          </div>
        </el-collapse-item>

        <!--语言-->
        <el-collapse-item name="language">
          <template slot="title" class="title">
            <span class="field">语言</span>
            <div class="">
              {{ languageTitle }}
            </div>
          </template>
          <div class="collapse-content">
            选择目标用户所使用的语言 <i class="header-icon el-icon-info"></i>
            <ul>
              <el-form-item  prop="languageModel">
                <li  v-for="(lang,index) in languageArray" >
                  <el-radio :key="lang.label" :label="String(lang.label)" v-model="form.languageModel"  @change="handleLanguage(index)"  >
                    {{lang.value}}
                  </el-radio>
                </li>
              </el-form-item>
            </ul>
          </div>
        </el-collapse-item>


        <el-collapse-item name="amount">
          <template slot="title" class="title">
            <span class="field">出价</span>
            <div class="">
              <span v-if="form.amount > 0" >   ￥{{ form.amount }}  <span class="bidding-font">({{ form.biddingStrategyType=='MANUAL_CPC' ? '按点击次数出价' : '按可见展示次数出价' }} )</span></span>
              <span v-else>--</span>
            </div>
          </template>
          <div class="collapse-content">
            <div class="">
              <div class="flex flex-row">
                <div class="flex flex-2 flex-column">

                  <div>输入您希望平均每天花费的金额</div>

                  <el-form-item  prop="amount">
                    <div class="google-input-box">
                      <el-input class="google-input" placeholder="出价" v-model="form.amount"></el-input>
                    </div>

                  </el-form-item>
                  <p></p>
                  <div class="flex-row">
                    <div>投放方式</div>
                    <div>
                      <el-radio v-model="form.biddingStrategyType" label="MANUAL_CPC">按点击次数出价</el-radio>
                      <el-radio v-model="form.biddingStrategyType" label="MANUAL_CPM">按可见展示次数</el-radio>
                    </div>
                    <p> 按什么指标付费：</p>
                    <p>
                      <span v-if="form.biddingStrategyType=='MANUAL_CPC'">点击次数</span>
                      <span v-if="form.biddingStrategyType=='MANUAL_CPM'">可见展示次数</span>
                    </p>
                  </div>
                </div>

                <div class="describe flex flex-1 flex-column">
                  <p>优质流量是指所带来的用户很有可能会在您网站、应用或商店中采取行动的流量。</p>
                  <a>了解详情</a>
                  <p>您需要手动设置您希望为每次点击使用的出价金额，Google Ads 会在此基础上调整您的出价，以提升转化次数。</p>
                  <a>了解详情</a>
                  <p>选择要付费的事件。例如，如果您选择点击次数，那么如果有人点击您的广告，您就需要为广告系列付费</p>
                  <a>了解详情</a>
                </div>
              </div>

            </div>
          </div>
        </el-collapse-item>


        <!--投放时间-->
        <el-collapse-item name="date" style="display: none;">
          <template slot="title" class="title">
            <span class="field">投放时间</span>
            <div class="">
              <div v-if="form.startDate" class="inlineBlock date"> {{ form.startDate }}</div>
              <div v-if="form.endDate" class="inlineBlock date"> - {{ form.endDate }}</div>
            </div>
          </template>
          <div class="collapse-content">
            <ul>
              <li>
                <div class="block">
                  <span class="demonstration">开始时间</span>
                  <el-date-picker
                      v-model="form.startDate"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
                  </el-date-picker>
                </div>
              </li>
              <li>
                <div class="block">
                  <span class="demonstration">结束时间</span>
                  <el-date-picker
                      v-model="form.endDate"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
                  </el-date-picker>
                </div>
              </li>
            </ul>
          </div>
        </el-collapse-item>


        <!--手-->
      </el-collapse>
    </el-form>

  </div>
</template>

<script>

  import Location from './../location/index'

  export default {
    components:{ Location },
    data(){
      return {
        activeNames: ["campaign","location","language","amount"],
        languageTitle: '',
        languageArray: [ { label:1017,value:"中文（简体）"}, { label:1018 ,value:"中文（繁体）"} ],
        locationTitle: '',
        locationArray: [ { label:0,value:"所有国家和地区",location:[]}, { label:1 ,value:"中国",location:[2156]}, { label:2 ,value:"其他地理位置", location :[]} ],
        selectlocationArray : [],
        dialogLocationComponents: false,
        form:{
          campaignName:'',
          locationModel: '' ,
          location:[],
          languageModel: '',
          language:[],
          amount:'',
          advertisingChannelType: '',
          biddingStrategyType: 'MANUAL_CPC',
          biddingStrategyName: '',
          startDate: '',
          endDate: '',
        },
        origin:{
          location_search:'', // 高级搜索
        },
        rules: {
          campaignName: [
            { required: true, message: '请输入广告系列名称', trigger: 'blur' },
            { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          ],
          locationModel: [
            { required: true, message: '请选择地理位置', trigger: 'change' }
          ],
          languageModel: [
            { required: true, message: '请选择语言', trigger: 'change' }
          ],
          biddingStrategyType: [
            { required: true, message: '请选择投放方式', trigger: 'change' }
          ],
          amount: [
            { required: true, message: '请输入出价金额', trigger: 'blur' },
          ]
        }
      }
    },
    methods :{
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

        //
      },
      handleLocation(e){
        console.log(e)
        switch (e) {
          case "2":
            this.locationTitle =  '其他地理位置';
            this.form.location =  this.getSelectLocation(this.selectlocationArray);
            break;
          default:
          case "0":
          case "1":
            this.locationTitle =  this.locationArray[e]['value'];
            this.form.location =  this.locationArray[e]['location'];
            break;
        }
      },
      handleLanguage(e){
        this.languageTitle =  this.languageArray[e]['value'];
        this.form.language =  [this.languageArray[e]['label']];
      },
      handleChange(val) {

      },
      showDialogLocationComponents(){
        var NoneSelectlocationArray =  this.selectlocationArray
        this.dialogLocationComponents = true
      },
      changeLocation(){
        let locationArray = this.$refs.location.locationList ? this.$refs.location.locationList : []
        this.selectlocationArray = locationArray;
        this.form.location = this.getSelectLocation(locationArray);
        this.dialogLocationComponents = false
      },
      getSelectLocation(locationArray){
        var location = [];
        if(locationArray.length > 0){
          locationArray.forEach(function(obj) {
            location.push( obj.criteriaID)
          })
        }
        return location;
      },
      handleClose(index){
        var indexLocation = this.selectlocationArray[index]
        if(indexLocation){
          var criteriaID = indexLocation.criteriaID
          this.selectlocationArray.splice(index,1)
          this.form.location.splice(this.form.location.findIndex(item => item === criteriaID), 1)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.bidding-font{
  margin-left:20px;
  color: rgba(0, 0, 0, 0.54);
  font-size:13px;
}

</style>
