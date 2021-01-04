<!--
  User: gaol
  Date: 2019/12/31
  功能： 省市区 三级联动 组件
-->

<template>
  <div :class="wrapper">
    <!--pc端---start-->
    <!-- provinces: {{provinces}} -->
    <!-- cities: {{cities}}
    ----
    areas: {{areas}} -->

    <!-- propCurrentProvince: {{propCurrentProvince}}
    -----
    propCurrentCity: {{propCurrentCity}}
    ------
    propCurrentArea: {{propCurrentArea}}
    ----
    currentProvince: {{currentProvince}}
    ----
    currentCity: {{currentCity}}
    ----
    currentArea: {{currentArea}} -->

    <div v-if="type != 'mobile'" class="u-f-jsb">
      <!--省--->
      <el-form-item prop="propCurrentProvince" :rules="provinceRules"
      >
        <span :class="['selectBox', 'u-f-g1','u-f-s1',showStyle === 'vertical'? 'vertical': '']">
          <span class="tit" v-if="showStyle === 'vertical'">省份</span>
          <el-select 
            class="provinceSelect"
            @change="getCities" 
            filterable
            clearable
            v-model="currentProvince" 
            :placeholder="placeholders.province"
            :disabled="disabled || provinceDisabled"
          >
            <el-option 
              :value="placeholders.province"
            >
            </el-option>
            <el-option v-for="(item, index) in provinces"
              :value="item"
              :key="index"
            >
              {{ item }}
            </el-option>
          </el-select>
        </span>
      </el-form-item>      

      <template v-if="!onlyProvince">
        <!---市--->
        <el-form-item prop="propCurrentCity" :rules="cityRules"
        >
          <span :class="['selectBox','u-f-g1','u-f-s1', showStyle === 'vertical'? 'vertical': '']">
            <span class="tit" v-if="showStyle === 'vertical'">城市</span>
            <el-select    
              class="citySelect"    
              @change="getAreas" 
              filterable
              clearable
              v-model="currentCity" 
              :placeholder="placeholders.city"
              :disabled="disabled || cityDisabled">
              <el-option 
                :value="placeholders.city"
              >
              </el-option>

              <el-option 
                v-for="(item, index) in cities"
                :value="item"
                :key="index">
                {{ item }}
              </el-option>
            </el-select>
          </span>
        </el-form-item>

        <!---区---->
        <el-form-item prop="propCurrentArea" :rules="[
            { required: false, message: '区不能为空'},
          ]"
        >
          <span 
            v-if="!hideArea" 
            :class="['selectBox', 'u-f-g1','u-f-s1', showStyle === 'vertical'? 'vertical': '']">
            <span class="tit" v-if="showStyle === 'vertical'">区/县</span>
            <el-select 
              class="areaSelect"
              v-model="currentArea" 
              filterable
              clearable
              @change="selectChangeArea" 
              :placeholder="placeholders.area"
              :disabled="disabled || areaDisabled">
              <el-option 
                :value="placeholders.area">
              </el-option>
              <el-option 
                v-for="(item, index) in areas "
                :value="item"
                :key="index">
                {{ item }}
              </el-option>
            </el-select>
          </span>
        </el-form-item>
      </template>
    </div>
    <!--pc端---end-->

    <!--mobile端-start--->
    <template v-else>
      <div :class="addressHeader">
        <ul>
          <li :class="{'active': tab === 1}" @click="resetProvince">{{ currentProvince && !staticPlaceholder ? currentProvince : placeholders.province }}</li>
          <template v-if="!onlyProvince">
            <li v-if="showCityTab" :class="{'active': tab === 2}" @click="resetCity">{{  currentCity && !staticPlaceholder ? currentCity : placeholders.city }}</li>
            <li v-if="showAreaTab && !hideArea" :class="{'active': tab === 3}">{{ currentArea && !staticPlaceholder ? currentArea : placeholders.area }}</li>
          </template>
        </ul>
      </div>
      <div :class="addressContainer">
        <ul v-if="tab === 1">
          <li v-for="(item, index) in provinces"
              :class="{'active': item === currentProvince}"
              @click="chooseProvince(item)"
              :key="index">
            {{ item }}
          </li>
        </ul>
        <template v-if="!onlyProvince">
          <ul v-if="tab === 2">
            <li v-for="(item, index) in cities"
                :class="{'active': item === currentCity}"
                @click="chooseCity(item)"
                :key="index">
              {{ item }}
            </li>
          </ul>
          <ul v-if="tab === 3 && !hideArea">
            <li v-for="(item, index) in areas"
                :class="{'active': item === currentArea}"
                @click="chooseArea(item)"
                :key="index">
              {{ item }}
            </li>
          </ul>
        </template>
      </div>
    </template>
    <!--mobile端---end-->
  </div>
</template>

<script>
// 引入 省市区 数据js文件
import DISTRICTS from '@/utils/districts';

const DEFAULT_CODE = 100000;

export default {
  name: 'v-distpicker',
  props: {
    showStyle:{ type:[String], default:'' },  // 三级是横排显示 还是 竖排显示，默认横排显示
    type: { type: String, default: '' },  // pc 还是移动端 mobile
    hideArea: { type: Boolean, default: false }, // 是否隐藏 区级
    onlyProvince: { type: Boolean, default: false }, // 是否仅仅只有省级
    staticPlaceholder: { type: Boolean, default: false },
    placeholders: {
      type: Object,
      default() {
        return {
          province: '-省-',
          city: '-市-',
          area: '-区-',
        }
      }
    },
    // 初始的
    propObj: {
      type: Object, 
      default: () => {
        return {}
      }      
    },
    propCurrentProvince: {
      type: [String, Number], 
      default: ''
    },
    propCurrentCity: {
      type: [String, Number], 
      default: ''
    },
    propCurrentArea: {
      type: [String, Number], 
      default: ''
    },        
    disabled: { type: Boolean, default: false },
    provinceDisabled: { type: Boolean, default: false },
    cityDisabled: { type: Boolean, default: false },
    areaDisabled: { type: Boolean, default: false },
    addressHeader: { type: String, default: 'address-header' },
    addressContainer: { type: String, default: 'address-container' },
    wrapper: { type: String, default: 'distpicker-address-wrapper' },
  },
  data() {
    return {
      tab: 1,
      showCityTab: false,
      showAreaTab: false,
      provinces: [], 
      cities: [],
      areas: [],
      currentProvince: {},
      currentCity: {},
      currentArea: {},
      provinceRules: { 
        required: true, 
        trigger: ['change','blur'], 
        validator: (rule, value, callback) => {
          if(this.currentProvince){
            callback()
          }else {
            callback(new Error('省为空'))
          }
        }
      },
      cityRules: { 
        required: true, 
        trigger: ['change', 'blur'], 
        validator: (rule, value, callback) => {
          if(this.currentCity){
            callback()
          }else {
            callback(new Error('市不能为空'))
          }
        }
      },      
    }
  },
  created() {
    debugger
    console.log(typeof(DISTRICTS))
    console.log(DISTRICTS)
    if (this.type != 'mobile') {
      this.currentProvince = this.placeholders.province
      this.provinces = this.getDistricts()
      this.cities = this.province ? this.getDistricts(this.getAreaCode(this.determineType(this.province))) : []
      this.areas = this.city ? this.getDistricts(this.getAreaCode(this.determineType(this.city), this.area)) : []
    } else {
      // mobile 端
      if (this.area && !this.hideArea && !this.onlyProvince) {
        this.tab = 3
        this.showCityTab = true
        this.showAreaTab = true
        this.areas = this.getDistricts(this.getAreaCode(this.determineType(this.city), this.area))
      } else if (this.city && this.hideArea && !this.onlyProvince) {
        this.tab = 2
        this.showCityTab = true
        this.cities = this.getDistricts(this.getAreaCode(this.determineType(this.province)))
      } else {
        this.provinces = this.getDistricts()
      }
    }
  },
  computed: {
    
  },
  watch: {
    currentProvince:{
      handler(newValue, oldValue){
        if(!newValue){
          // 清空省时 需要 清空 市的list 和 区的list
          this.cleanList("cities")
          this.currentCity = ''
          this.cleanList("areas")
          this.currentArea = ''
        }
      }
    },    
    currentCity:{
      handler(newValue, oldValue){
        if(!newValue){
          // 清空市时 需要 清空  区的list
          this.cleanList("areas")
          this.currentArea = ''
        }
      }
    },      
  },
  methods: {
    setData(value, check = '', isArea = false) {
      debugger
      let code
      if (isArea) {
        code = this.getCodeByArea(value)
      } else {
        code = this.getAreaCode(value, check)
      }

      return {
        code: code,
        value: value,
      }
    },
    getCodeByArea(value) {
      let code
      Object.values(this.areas).forEach((item, key) => {
        if (item === value) {
          code = Object.keys(this.areas)[key]
        }
      })
      return code
    },
    emit(name) {
      let data = {
        province: this.setData(this.propCurrentProvince)
      }

      if (!this.onlyProvince) {
        this.$set(data, 'city', this.setData(this.propCurrentCity))
      }

      if (!this.onlyProvince || this.hideArea) {
        this.$set(data, 'area', this.setData(this.propCurrentArea, this.propCurrentCity))
      }

      this.$emit(name, data)
    },
    // 选择省变化后
    getCities() {
      debugger
      this.currentCity = this.placeholders.city
      this.currentArea = this.placeholders.area
      this.cities = this.determineValue(this.currentProvince, this.placeholders.province)       
      // 清除区list
      this.cleanList('areas')
      if (this.cities.length === 0) {
        this.emit('selected')
        this.tab = 1
        this.showCityTab = false
      }

      console.log(this.setData(this.currentProvince))  
      // 将选择的省的对象{code:'', value:''}抛出去
      this.$emit("selectprovince", this.setData(this.currentProvince))        
    },
    // 选择市变化后
    getAreas() {
      debugger
      this.currentArea = this.placeholders.area
      this.areas = this.determineValue(this.currentCity, this.placeholders.city, this.currentProvince)
      if (this.areas.length === 0) {
        this.emit('selected')
        this.tab = 2
        this.showAreaTab = false
      }
      console.log(this.setData(this.currentCity)) 
      // 将选择的市 的对象 {code:'',value:''}抛出去       
      this.$emit("selectcity",  this.setData(this.currentCity))

    },
    // 选择区变化后
    selectChangeArea(value){
      debugger
      console.log(this.setData(value))
      // 将选择的区 的对象 {code:'',value:''}抛出去       
      this.$emit("selectarea",  this.setData(value))
    },
    resetProvince() {
      this.tab = 1
      this.provinces = this.getDistricts()
      this.showCityTab = false
      this.showAreaTab = false
    },
    resetCity() {
      this.tab = 2
      this.showCityTab = true
      this.showAreaTab = false
      this.getCities()
    },
    chooseProvince(name) {
      this.currentProvince = name
      if (this.onlyProvince) return
      this.tab = 2
      this.showCityTab = true
      this.showAreaTab = false
      this.getCities()
    },
    chooseCity(name) {
      this.currentCity = name
      if (this.hideArea) return
      this.tab = 3
      this.showCityTab = true
      this.showAreaTab = true
      this.getAreas()
    },
    chooseArea(name) {
      this.currentArea = name
    },
    // 根据上级获取 下级的codes集合
    getAreaCodeByPreCode(name, preCode) {
      debugger
      let codes = []

      for(let x in DISTRICTS) {
        for(let y in DISTRICTS[x]) {
          if(name === DISTRICTS[x][y]) {
            codes.push(y)
          }
        }
      }

      if (codes.length > 1) {
        let index
        codes.forEach((item, i) => {
          if (item.slice(0, 2) == preCode) {
            index = i
          }
        })

        return codes[index]
      } else {
        return codes[0]
      }
    },
    getAreaCode(name, check = '') {
      for(let x in DISTRICTS) {
        for(let y in DISTRICTS[x]) {
          if(name === DISTRICTS[x][y]) {
            if (check.length > 0) {
              let code = this.getAreaCodeByPreCode(check, y.slice(0, 2))

              if (!code || y.slice(0, 2) !== code.slice(0, 2)) {
                continue
              } else {
                return y
              }
            } else {
              return y
            }
          }
        }
      }
    },
    getCodeValue(code) {
      for(let x in DISTRICTS) {
        for(let y in DISTRICTS[x]) {
          if(code === parseInt(y)) {
            return DISTRICTS[x][y]
          }
        }
      }
    },
    getDistricts(code = DEFAULT_CODE) {
      return DISTRICTS[code] || []
    },
    determineValue(currentValue, placeholderValue, check = '') {
      debugger
      if(currentValue === placeholderValue) {
        return []
      } else {
        return this.getDistricts(this.getAreaCode(currentValue, check))
      }
    },
    determineType(value) {
      if(typeof value === 'number') {
        return this.getCodeValue(value)
      }

      return value
    },
    cleanList(name) {
      debugger
      this[name] = []
    },
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.distpicker-address-wrapper {
  color: #9caebf;
  .selectBox {
    &.vertical {
      display block
      margin 4px 0
      .tit {
        font-size 14px
        padding 0 12px 0 0
        color #606266
        box-sizing border-box
      }
      .provinceSelect, .citySelect, .areaSelect {
        width 250px
        // color #CDD0D6
        color rgba(96,98,102,.8)
        font-size 14px
      }
      .citySelect {
        margin-top 15px
      }
    }
    .provinceSelect,.citySelect,.areaSelect {
      width: 100%;
    }
    select {
      padding: .5rem .75rem;
      height: 40px;
      font-size: 1rem;
      line-height: 1.25;
      color: #606266;
      background-color: #fff;
      background-image: none;
      -webkit-background-clip: padding-box;
      background-clip: padding-box;
      border: 1px solid rgba(0,0,0,.15);
      border-radius: .25rem;
      -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
      transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
      -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
      transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
      transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
      // &.vertical {
      //   display block
      //   margin 10px
      // }

      option {
        font-weight: normal;
        display: block;
        white-space: pre;
        min-height: 1.2em;
        padding: 0px 2px 1px;
      }
    }    
  }


  // 移动端
  ul {
    margin: 0;
    padding: 0;

    li {
      list-style: none;
    }
  }
  .address-header {
    background-color: #fff;

    ul {
      display: flex;
      justify-content: space-around;
      align-items: stretch;

      li {
        display: inline-block;
        padding: 10px 10px 7px;

        &.active {
          border-bottom: #52697f solid 3px;
          color: #52697f;
        }
      }
    }
  }
  .address-container {
    background-color: #fff;

    ul {
      height: 100%;
      overflow: auto;

      li {
        padding: 8px 10px;
        border-top: 1px solid #f6f6f6;

        &.active {
          color: #52697f;
        }
      }
    }
  }
}
.disabled-color{
  background: #f8f8f8;
}

</style>
