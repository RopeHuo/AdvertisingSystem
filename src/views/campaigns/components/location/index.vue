<template>
  <div>
    <div class="native-form inlineBlock">
      <div>
        <el-tag
            v-for="(tag,index) in tags"
            :key="tag.name"
            :value="tag.criteriaID"
            :closable="true"
            :type="tag.type"
            :close-transition="false"
            @close="handleClose(index)"
        >
          {{tag.name}}
        </el-tag>
      </div>

      <div class="row">
        <div class="col-md-12">
          <el-form :model="origin.form" label-width="100px">

            <el-form-item label="区域类型：">
              <el-radio-group v-model="origin.form.targetType">
                <el-radio label="">所有</el-radio>
                <el-radio label="Country">国家/地区</el-radio>
                <el-radio label="State">州</el-radio>
                <el-radio label="Department">部</el-radio>
                <el-radio label="Province">省</el-radio>
                <el-radio label="City">城市</el-radio>
                <!--<el-radio label="Neighborhood">街道</el-radio>-->
                <!--<el-radio label="Postal Code">邮政编码</el-radio>-->
                <!--<el-radio label="District">区</el-radio>-->
              </el-radio-group>
            </el-form-item>

            <el-form-item label="地理位置：">

              <el-dropdown placement="bottom-start">
                <span class="el-dropdown-link">
               <div class="google-input-box">
                  <el-input class="google-input" placeholder="请输入国家/省份/城市" v-model="origin.form.location" @keyup.enter="getCriteriaList"></el-input>
                  <el-button @click="getCriteriaList">搜索</el-button>
                </div>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <div class="search-criteria" v-if="origin.criteriaTable.data.length > 0">
                    <dl v-for="(item,index) in origin.criteriaTable.data" class="">
                      <dt @click="addCriteria(index)"><a class="blue">{{ item.criteriaName ? item.criteriaName:
                        item.name }}</a> {{ item.canonicalName }}&nbsp;-&nbsp; <span>{{ item.targetType}}</span></dt>
                    </dl>
                  </div>
                  <div class="search-criteria" v-else>
                    暂无搜索结果
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </el-form-item>
          </el-form>

          <ul class="select-location" v-if="locationList.length > 0">
            <li>定位到的地理位置 ({{ locationList.length }})</li>
            <li class="li-select" v-for="(item,index) in locationList">{{ item.name }}, {{ item.targetType }} <i
                class="el-icon-error" @click="handleClose(index)"/></li>
          </ul>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import { getCriteria } from '@/api/criteria'

  export default {
    name: 'location',
    data() {
      return {
        origin: {
          loading: false,
          table: {},
          criteriaTable: {
            data: []
          },
          form: {
            location: '',
            targetType: ''
          }
        },
        locationList: [],
        tags: [],
        tagColor: [
          '',
          'gray',
          'primary',
          'success',
          'warning',
          'danger'
        ]
      }
    },
    methods: {
      getCriteriaList() {
        getCriteria(this.origin.form).then(response => {
          if (response.success) {
            this.origin.criteriaTable = response.data
          }
        })
      },
      addCriteria(index) {
        var criteria = this.origin.criteriaTable.data[index]
        var criteriaIds = new Array()
        for (var value of this.tags) {
          criteriaIds.push(value.criteriaID)
        }
        criteria.name = criteria.criteriaName ? criteria.criteriaName : criteria.name
        if (this.contains(criteriaIds, criteria.criteriaID) == false) {
          criteria.type = this.tagColor[parseInt(Math.random() * 6)]
          this.locationList.push(criteria)
          this.tags.push(criteria)
        } else {
          this.$message({ message: criteria.name + '已在地理位置列表中' })
        }
      },
      contains(arr, obj) {
        var i = arr.length
        while (i--) {
          if (arr[i] === obj) {
            return true
          }
        }
        return false
      },
      handleClose(index) {
        this.locationList.splice(index, 1)
        this.tags.splice(index, 1)
      },
      save() {
        this.$emit('getLocationList', this.locationList)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-criteria {

    width: 330px;

    /*border-left: 1px solid #c5c5c5;*/
    /*border-right: 1px solid #c5c5c5;*/
    /*border-bottom: 1px solid #c5c5c5;*/
    dl {
      margin: 0;
      width: 330px;
      background: #fff;
      text-align: left;
      &:hover {
        background: #f4f4f4;
        cursor: pointer;
      }
    }
  }

  .el-tag {
    margin-right: 5px;
  }
</style>
