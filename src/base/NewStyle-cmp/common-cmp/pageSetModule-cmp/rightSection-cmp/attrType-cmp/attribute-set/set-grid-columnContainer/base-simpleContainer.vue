<!--
    User:
    Date:
    功能: pageSetModule-attribute-column 设置  组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.pageSetProperty-attribute-column-cmp {
}
</style>
<template>
    <div class="pageSetProperty-attribute-column-cmp">
        <!-- obj: {{obj}} -->
        columnGrid分栏容器设置组件
        <div class="set-input-wrap u-f-ajc">
            <el-button
                type="text"
                size="small"
            >分栏比例:</el-button>
            <el-input
                size="mini"
                style="width: 60%"
                v-model="columnRatio"
                @blur="inputBlur"
                placeholder="分栏比例(如:1-2-1-1)"
            ></el-input>
        </div>
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
  "flex-five": 5
};
export default {
  mixins: [CommonInterfaceMixin],
  props: {
    obj: {
      type: Object,
      default: () => {
        return {};
      }
    },
    controlType: {
      type: [String, Number],
      default: () => {
        return "";
      }
    },
    atrisCode: {
      type: [String],
      default: () => {
        return "";
      }
    }
  },
  components: {
    SearchToolsCmp
  },
  data() {
    return {
      columnRatio: ""
    };
  },
  created() {
      this.initData()
  },
  computed: {
    ...mapGetters(["pageSetTotalData"])
  },
  watch: {
    // columnRatio: {
    //   handler(newValue, oldValue) {
    //     this.changeColumnRatio(newValue);
    //   }
    // }
    'obj.atrisCode': {
      handler(newValue, oldValue) {
        this.initData();
      }
    }
  },
  methods: {
    //重新刷新获取数据
    _refreshData() {},
    initData(){
        let ratioArr = []
        this.obj.columnObjMap.forEach((item, key) => {
            ratioArr.push(flexHash[item.layoutClass])
        })
        this.columnRatio = ratioArr.join("-")
    },
    inputBlur(){
        this.changeColumnRatio(this.columnRatio)
    },
    changeColumnRatio(columnRatio) {
      let ratioArr = columnRatio.split("-");
      let ratioLength = ratioArr.length;
      let oldColumnLength = this.obj.childrenList.length;
      if (ratioLength > oldColumnLength) {
        ratioArr.forEach((toCol, idx) => {
          if (idx < oldColumnLength) {
            this.obj.childrenList[idx].span = (toCol / ratioLength) * 24;
            this.obj.childrenList[idx].controlName = `第${idx}列`;
            this.obj.childrenList[idx].controlType = `5001-${idx}`;
            this.obj.columnObjMap[idx].layoutClass = `${flexMap[ratioArr[idx]]}`;
          } else {
            this.obj.childrenList.push({
              span: (toCol / ratioLength) * 24,
              controlName: `第${idx}列`,
              atrisCode: getGuid2(),
              atrisGuid: "",
              controlType: `5001-${idx}`,
              childrenList: []
            });
            this.obj.columnObjMap.push({
              iStyle: {},
              iClass: [],
              layoutClass: `${flexMap[ratioArr[idx]]}`,
              itemList: []
            });
          }
        });
      } else {
        this.obj.childrenList = this.obj.childrenList.slice(0, ratioLength);
        this.obj.columnObjMap = this.obj.columnObjMap.slice(0, ratioLength);
        ratioArr.forEach((toCol, idx) => {
          this.obj.childrenList[idx].span = (toCol / ratioLength) * 24;
          this.obj.childrenList[idx].controlName = `第${idx}列`;
          this.obj.childrenList[idx].controlType = `5001-${idx}`;
          this.obj.columnObjMap[idx].layoutClass = flexMap[ratioArr[idx]];
        });
      }
    }
  }
};
</script>
