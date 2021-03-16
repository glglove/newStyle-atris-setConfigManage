<!--
  User: gaol
  Date: 2020/12/30
  功能：显示组件———— 文本
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
<template>
  <div :style="cmpStyle">
    <!-- obj: {{obj}} -->
    显示组件———— 文本
    {{obj.pageSetUp.cncontent}}
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    obj: {
      type: Object,
      default: () => {
        return {}
      }
    }    
  },
  components: {},
  computed: {
    cmpStyle(){
      return `width: ${this.obj.pageStyle.widthPx}px;
              height: ${this.obj.pageStyle.heightPx}px; 
              paddingTop: ${this.obj.pageStyle.topPx}px; 
              paddingBottom: ${this.obj.pageStyle.bottom}px;
              paddingLeft: ${this.obj.pageStyle.leftPx}px;
              paddingRight: ${this.obj.pageStyle.rightPx}px;
              fontSize: ${this.obj.pageStyle.fontSize}px;
              color: ${this.obj.pageStyle.fontColor};
              fontWight: ${this.obj.pageStyle.fontIsWeith}? 'bold':'';
              fontStyle: ${this.obj.pageStyle.fontIsItalic}? 'italic': 'normal';
              textDecoration: ${this.obj.pageStyle.fontIsUnderline}? 'underline': '';
              textAlign: ${this.obj.pageStyle.fontSite};
              backgroundColor: ${this.obj.pageStyle.backgroundColor};
              backgroundImage: url(${this.obj.pageStyle.backgroundUrl});
              borderStyle:  ${this.obj.pageStyle.backgroundColor};
              borderWidth:  ${this.obj.pageStyle.borderWidth}px;
              borderColor:  ${this.obj.pageStyle.borderColor}
      `
    },
  },
  watch: {},
  data() {
    return {
    };
  },
  created() {},
  methods: {},
};
</script>


