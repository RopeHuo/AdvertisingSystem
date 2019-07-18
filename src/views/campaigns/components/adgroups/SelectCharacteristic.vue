<template>
  <div class="characteristic-list">
    <div class="list">
      <div class="header">
        性别
      </div>
      <ul>
        <el-checkbox-group v-model="select.gender">
          <li v-for="income in characterList.gender"><el-checkbox :label="income.id">{{ income.label }}</el-checkbox></li>
        </el-checkbox-group>
      </ul>
    </div>
    <div class="list">
      <div class="header">
        生育
      </div>
      <ul>
        <el-checkbox-group v-model="select.parent">
          <li v-for="income in characterList.parent"><el-checkbox :label="income.id">{{ income.label }}</el-checkbox></li>
        </el-checkbox-group>
      </ul>
    </div>
    <div class="list">
      <div class="header">
        年龄
      </div>
      <ul>
        <el-checkbox-group v-model="select.age_range">
          <li v-for="income in characterList.age_range"><el-checkbox :label="income.id">{{ income.label }}</el-checkbox></li>
        </el-checkbox-group>
      </ul>
    </div>
    <div class="list">
      <div class="header">
        家庭收入
      </div>
      <ul>
        <el-checkbox-group v-model="select.income_range">
          <li v-for="income in characterList.income_range"><el-checkbox :label="income.id">{{ income.label }}</el-checkbox></li>
        </el-checkbox-group>
      </ul>
    </div>

  </div>


</template>

<script>
  import { getCharacteristicArray } from '@/api/criteria'

  export default {
    mounted() {
      this.getCharacteristicList()
    },
    data() {
      return {
        select:{
          age_range: [], // 年龄
          income_range: [], // 收入范围
          parent: [], // 生育
          gender: [] // 性别
        },
        characterList:{
          age_range: [], // 年龄
          income_range: [], // 收入范围
          parent: [], // 生育
          gender: [] // 性别
        },
        types : ["age_range","income_range","parent","gender"],
      };
    },
    methods: {
      getCharacteristicList(){
        let self = this
        getCharacteristicArray( { types : this.types }).then(response => {
          if (response.success) {
            self.characterList = response.data
          }
        })
      }
    }
  };
</script>

<style lang="scss">
  .characteristic-list{
    width: 100%;
    display: flex;
    flex: 1;
    flex-direction: row;
    .list{
      flex-direction: column;
      display: flex;
      width: 25%;
      flex: 1;
      ul{
        list-style: none;
        padding: 0;
      }
    }
  }
</style>
