<!--
  User: gaol
  Date: 2020/12/30
  功能：布局组件——搜索枚举区组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

<template>
  <div>
    布局组件——搜索枚举区组件
    <common-drag-cmp
      :obj.sync="obj"
      :groupOption="{
        name: 'component',
        pull: true,
        put: true,
      }"
    ></common-drag-cmp>
  </div>
</template>

<script type="text/ecmascript-6">
import CommonDragCmp from "@/base/NewStyle-cmp/common-cmp/grid-common-drag-cmp/index.vue";
import { getGuid, getGuid2 } from '@/utils/guid.js'
export default {
  props: {
    obj: {
      type: Object,
      default: () => {
        return {}
      }
    }      
  },
  components: {
    CommonDragCmp,
  },
  computed: {},
  watch: {},
  data() {
    return {

    };
  },
  created() {},
  methods: {},
};
</script>


