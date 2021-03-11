<!--
  User: gaol
  Date: 2020/12/30
  功能：显示组件———— 文本
-->
<style lang="stylus" rel="stylesheet/stylus" scoped></style>

<template>
  <div>
    obj: {{obj}}
    显示组件———— 文本
    <div class="text" v-html="textData"></div>
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
  computed: {},
  watch: {},
  data() {
    return {
      textData: `
        <p>
          <p style="font-family:&quot;font-size:16px;text-align:justify;background-color:#FFFFFF;">
            秋风用时光的旋律，用桂花的芬芳、苹果的馨香、菊花的灿烂、牵牛花的奔放、一串红的艳丽，把一望无际的田野乡村，演绎得在自然中沉醉，渲染得天地间空旷而又阳刚。
          </p>
          <p style="font-family:&quot;font-size:16px;text-align:justify;background-color:#FFFFFF;">
            &emsp;&emsp;酷热的夏天刚刚过去，秋风吹来，秋牵着一个个节气的手，舞动着长袖，用婀娜多姿的舞姿，用变幻神奇的旋律，动听的音符，把蓝天吹得一会白云飘飘，一会云蒸霞蔚，一会仙女舞袖，一会又涌来千顷碧波。更让那成千上万得雀鸟，不顾辛苦劳顿，路途遥远，赶赴银汉，为牛郎织女架起一座相会的鹊桥，就为这对生离死别的鸳鸯说上一晚悄悄话。
          </p>
          <p style="font-family:&quot;font-size:16px;text-align:justify;background-color:#FFFFFF;">
            &emsp;&emsp;秋天的风，优雅中体现成熟和高雅。砍高粱、掐谷子、掰玉米、刨芋头、割豆子、下苹果、晒柿子、揪石榴、摘花生、耩麦子，一个个音符，无不让秋风演奏得动听、感人。仰望湛蓝的长空，会让你一扫往日沉闷枯燥的苦闷，心情更加舒畅了，一股热爱蓝天热爱大自然钟爱乡村田野的激情，便油然而生。
          </p>
          <p style="font-family:&quot;font-size:16px;text-align:justify;background-color:#FFFFFF;">
            &emsp;&emsp;秋风是多情的。花朵变得更加缤纷多彩，路边山间公园各种小花，一夜之间便把一片片一处处山川河流吹得五颜六色，吹得诗意盎然，吹得舒展酣畅。连多情的小鸟也不愿在花丛打滚，嘴馋的小羊也不忍心张口去啃。特别是那漫山遍野的山丹丹花，把天空的云彩的染得霞光满天。阵阵清香，优雅而芬芳，把那躲在暗处的萤火虫，引得打着灯笼，在山野荒原中游来游去。特别是那一株株菊花，顶住尘土的飞扬，忍得住周边花朵凋谢的寂寞，耐得住干旱的折磨，在秋风中不顾寂寞和冷落暗自开放。
          </p>
        </p>
      `,
    };
  },
  created() {},
  methods: {},
};
</script>


