<!--
  User: gaol
  Date: 2020/12/30
  功能：显示组件———— 图片
-->
<style lang="stylus" rel="stylesheet/stylus" scoped></style>

<template>
  <div>
    显示组件———— 图片
    <el-image
      style="width: 100px; height: 100px"
      :src="url"
      :preview-src-list="srcList"
    >
    </el-image>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {},
  components: {},
  computed: {},
  watch: {},
  data() {
    return {
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
      ],
    };
  },
  created() {},
  methods: {},
};
</script>


