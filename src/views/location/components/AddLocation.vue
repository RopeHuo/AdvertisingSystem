<template>
  <div>

    <div class="drawer-contents while-bg">
      <div class="subheading">批量处理地理位置: {{ select.adgroup_id }}  campaignId:{{ campaignId }}</div>

      <div @click="dialogGroup =!dialogGroup" class="select-adgroup-btn">
        <div class="" v-if="(campaignId =='' && select.campaignId != '') "> <span>{{ select.campaignName  }}</span>  <i class="el-icon-edit" /> </div>
        <div class="" v-if="campaignId <=0 && select.campaignId == 0 "><span>选择一个广告系列 </span> <i class="el-icon-edit" /></div>
      </div>

      <div class="editor-container form-content">

      </div>


    </div>

    <div class="save-btn-box">
      <el-button type="primary" @click="submitForm('dynamicValidateForm')">保存</el-button>  <el-button @click="cancel">取消</el-button>
    </div>

    <!--选择广告系列-->
    <el-dialog
        title="选择一个广告系列"
        :visible.sync="dialogGroup"
        width="365px"
        class="particle-dialog"
       >
      <div class="google-input-box" >
          <el-input class="google-input" placeholder="按名称或广告系列ID搜索" maxlength="50" show-word-limit="true"></el-input>
      </div>
      <span class="particle-header-title">{{ origin.table.total  }}个广告系列</span>
      <div class="particle-box">
        <div class="particle-list" v-for="(item,index) in origin.table.data" @click="selectCampaign(index)">
          <span class="start-status li-status"  v-if="'ENABLED' ==item.status"></span>
          <svg-icon icon-class="pause li-status"  v-if="'PAUSED' == item.status" />
          {{ item.campaignName }}
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import { batchAdschedules } from '@/api/adschedules'
  import { campaignsList } from '@/api/campaigns'

  export default {
    props: ["campaignId","adGroupId"],
    data(){
      return {
        dialogGroup: false,
        dynamicValidateForm: {
          domains: [{
            value:'',
            dayOfWeek: '',
            startHour: '',
            startMinute: 'ZERO',
            endHour: '',
            endMinute: 'ZERO'
          }]
        },
        origin:{
          options:[
            {
              value: 'MONDAY',
              label: '星期一'
            },
            {
              value: 'TUESDAY',
              label: '星期二'
            },
            {
              value: 'WEDNESDAY',
              label: '星期三'
            },
            {
              value: 'THURSDAY',
              label: '星期四'
            },
            {
              value: 'FRIDAY',
              label: '星期五'
            },
            {
              value: 'SATURDAY',
              label: '星期六'
            },
            {
              value: 'SUNDAY',
              label: '星期日'
            }
          ],
          table:{
            total: 0,
            data: []
          }
        },
        post:{
          loading: false,
          table: {
          }
        },
        select:{
        }
      }
    },
    mounted() {
      this.fetchData()
    },
    methods :{
      fetchData() {
        this.post.loading = true
        let params = this.post.table
        campaignsList(params).then(response => {
          if (response.success) {
            this.origin.table = response.data
          }
          this.post.loading = false
        })
      },
      saveKeywords(){

      },
      cancel(){
        this.$emit('setOperationName','')
      },
      selectCampaign(index) {
        this.select = this.origin.table.data[index]
        this.dialogGroup = false
      },
      cureFormData(){
        var data  = [];
        if(this.dynamicValidateForm.domains.length > 0){
          this.dynamicValidateForm.domains.forEach(function(item) {
            data.push({
              value:'',
              dayOfWeek: item.dayOfWeek,
              startHour: item.startHour.replace(/[0/:]/g, '') == '' ? 0 : item.startHour.replace(/[0/:]/g, ''),
              startMinute: 'ZERO',
              endHour: item.endHour.replace(/[0/:]/g, ''),
              endMinute: 'ZERO'
            })
          })
        }
        return data;
      },
      submitForm(formName) {
        var self = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 数据处理
            var datalist = this.cureFormData();

            var cid =  this.select.campaignId > 0  ? this.select.campaignId : this.campaignId
            if(cid <= 0){
              self.$message({
                message: '请选择广告系列',
                type: 'info'
              });
              this.dialogGroup = true;
              return
            }

            var params = {
              datalist : JSON.stringify(datalist),
              campaignId: this.select.campaignId > 0  ? this.select.campaignId : this.campaignId
            }
            batchAdschedules(params).then(response => {
              if (response.success) {
                self.$message({
                  message: '添加成功',
                  type: 'success'
                });
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value:'',
          dayOfWeek: '',
          startHour: '',
          startMinute: 'ZERO',
          endHour: '',
          endMinute: 'ZERO',
        });
      }
    }
  }
</script>


<style lang="scss">
  .select-adschedules-date{
    width: 600px;
    display: flex;
    flex-direction: column;
    .el-form-item{
      margin-bottom: 0px !important;
    }

    .date{
      width: 100px;
    }
    .time{
      width: 60px;
    }
  }
  .form-content{
    .el-form-item__content{
      margin-left: 0 !important;
    }
    width: 400px;
  }
</style>


<style lang="scss" scoped>

</style>

