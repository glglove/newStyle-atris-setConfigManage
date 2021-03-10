<!--
    User:
    Date:
    功能: pageSetModule-attribute-column 设置  组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common-set-style.styl';

.pageSetProperty-attribute-column-cmp {
}
</style>
<template>
  <div class="pageSetProperty-attribute-column-cmp">
    <!-- columnRatio： {{ columnRatio }} -->
    <!-- obj: {{obj}} -->
    <!-- columnGrid分栏容器设置组件 -->
    <h2 class="common-cmp-name">{{obj.controlName}}</h2>
    <!-- <h4 class="common-type-tit">样式设置</h4> -->
    <ul class="common-listWrap">
      <el-form-item>
        <li class="common-item u-f-ac">
          <span class="common-label ellipsis1">分栏比例</span>
          <el-input
            v-model="columnRatio"
            placeholder="分栏比例(如:1-2-1-1)"
            class="u-f-s1"
            size="mini"
          >
          </el-input>
          <el-button
            class="marginL5"
            type="primary"
            size="mini"
            @click.native="handlerClickBtn"
            >修改</el-button
          >
        </li>
      </el-form-item>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
import { REQ_OK } from "@/api/config";
import { CommonInterfaceMixin } from "@/utils/CommonInterfaceMixin";
import SearchToolsCmp from "@/base/NewStyle-cmp/common-cmp/searchTool-cmp";
import { mapGetters } from "vuex";
import { getSetComponentUtils } from "@/utils/newStyle-pageset-components-type.js";
import { getGuid2, getGuid } from "@/utils/guid.js";
let flexMap = ["flex-one", "flex-two", "flex-three", "flex-four", "flex-five"];
let flexHash = {
  "flex-one": 1,
  "flex-two": 2,
  "flex-three": 3,
  "flex-four": 4,
  "flex-five": 5,
};
let maxLayoutRote = 5
export default {
  mixins: [CommonInterfaceMixin],
  props: {
    obj: {
      type: Object,
      default: () => {
        return {};
      },
    },
    controlType: {
      type: [String, Number],
      default: () => {
        return "";
      },
    },
    atrisCode: {
      type: [String],
      default: () => {
        return "";
      },
    },
  },
  components: {
    SearchToolsCmp,
  },
  data() {
    return {
      columnRatio: "",
    };
  },
  created() {
    this.initData();
  },
  computed: {
    ...mapGetters(["pageSetTotalData"]),
  },
  watch: {
    // columnRatio: {
    //   handler(newValue, oldValue) {
    //     this.changeColumnRatio(newValue);
    //   }
    // }
    "obj.atrisCode": {
      handler(newValue, oldValue) {
        this.initData();
      },
    },
  },
  methods: {
    //重新刷新获取数据
    _refreshData() {},
    initData() {
      let ratioArr = [];
      this.obj.columnObjMap.forEach((item, key) => {
        ratioArr.push(flexHash[item.layoutClass]);
      });
      this.columnRatio = ratioArr.join("-");
    },
    handlerClickBtn() {
      if(this.columnRatio){
        this.changeColumnRatio(this.columnRatio);
      }
    },
    validateCustomValue(value, callback){
      if (value === '') {
        // callback(new Error('请填写布局比例'));
        return {
          code: 0,
          message: '请填写布局比例'
        }
      }
      let arrValue = value.split("-")
      for (let i = 0; i < arrValue.length; i++) {
          let item = arrValue[i]
          let itemRex = /^[1-5]$/
          if (!itemRex.test(item)){
              // callback(new Error(`布局比例在1-${maxLayoutRote}之间`));
              // return
            return {
              code: 0,
              message: `布局比例在1-${maxLayoutRote}之间`
            }              
          }
      }
      return {
        code: 1,
        message: '验证pass'        
      }
    },
    changeColumnRatio(columnRatio) {
      debugger
      let ratioArr = columnRatio.split("-");
      let name = ratioArr.join(":") + '布局'
      let ratioLength = ratioArr.length;
      let oldColumnLength = this.obj.childrenList.length;
      if(this.validateCustomValue(columnRatio).code){
        if (ratioLength >= oldColumnLength) {
          this.obj.controlName = name
          ratioArr.forEach((toCol, idx) => {
            if (idx < oldColumnLength) {
              this.obj.childrenList[idx].span = (toCol / ratioLength) * 24;
              this.obj.childrenList[idx].controlName = `第${idx+1}列`;
              this.obj.childrenList[idx].controlType = `5001-${idx+1}`;
              this.obj.columnObjMap[idx].layoutClass = `${
                flexMap[ratioArr[idx]-1]
              }`;
            } else {
              this.obj.childrenList.push({
                span: (toCol / ratioLength) * 24,
                controlName: `第${idx}列`,
                atrisCode: getGuid2(),
                atrisGuid: "",
                controlType: `5001-${idx}`,
                childrenList: [],
              });
              this.obj.columnObjMap.push({
                iStyle: {},
                iClass: [],
                layoutClass: `${flexMap[ratioArr[idx]-1]}`,
                itemList: [],
              });
            }
          });
        } else {
          this.$confirm(`此修改将删除此分栏中的"${ratioLength + 1}-${oldColumnLength}"列,删除后这些列用户已填写的数据将一并被删除`, "提示", {
            confirmButtonText: '删除',
            cancelButtonText: '取消'
          }).then(() => {
            this.obj.controlName = name
            this.obj.childrenList = this.obj.childrenList.slice(0, ratioLength);
            this.obj.columnObjMap = this.obj.columnObjMap.slice(0, ratioLength);
            ratioArr.forEach((toCol, idx) => {
              this.obj.childrenList[idx].span = (toCol / ratioLength) * 24;
              this.obj.childrenList[idx].controlName = `第${idx}列`;
              this.obj.childrenList[idx].controlType = `5001-${idx}`;
              this.obj.columnObjMap[idx].layoutClass = flexMap[ratioArr[idx]-1];
            });
          }).catch(() => {

          }) 
        }
      }else {
        this.$message.info(`${this.validateCustomValue(columnRatio).message}`)
      }
    },
  },
};
</script>
