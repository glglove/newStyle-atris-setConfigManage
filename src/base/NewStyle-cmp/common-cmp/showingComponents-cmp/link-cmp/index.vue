<!--
  User: gaol
  Date: 2020/12/30
  功能：显示组件———— 链接
-->
<style lang="stylus" rel="stylesheet/stylus" scoped></style>

<template>
  <div>
    显示组件———— 链接
    <el-button type="text" @click.native="handlerClick">链接到百度</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {},
  components: {},
  computed: {},
  watch: {},
  data() {
    return {};
  },
  created() {},
  methods: {
    handlerClick() {
      window.open("https://www.baidu.com");
    },
  },
};
</script>


