<!--
  User: gaol
  Date: 2020/12/30
  功能：显示组件———— 链接块
-->
<style lang="stylus" rel="stylesheet/stylus" scoped></style>

<template>
  <div>
    显示组件———— 链接块
    <el-tag type="success" @click.native="clickTab">跳转到百度</el-tag>
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
    clickTab() {
      window.open("https://www.baidu.com")
    },
  },
};
</script>


