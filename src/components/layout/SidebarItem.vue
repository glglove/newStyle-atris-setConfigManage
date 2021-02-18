<!--
  User: xxxxxxx
  Date: 2017/12/15
  功能：home页中 顶部 和 左边的导航—— 菜单项目items的组件，被 horizontalFlagSidebar.vue组件 和 leftSidebarItem组件所 引用
-->
<template>
  <div class='menu-wrapper'>
    <!-- routes: {{routes}} -->
    <template v-for="(item,key) in routes" v-if="!item.routeHidden">
      <!-- horizontalFlag: {{horizontalFlag}} -->
      <!-- {{routes[5].routeHidden}} && {{routes[5].routehidechildrenlist}} && {{routes[5].children.length}} && {{horizontalFlag}}------ -->
      <!--菜单只有主菜单一级的情况-->
      <!-- <router-link v-if="!item.routeHidden&&item.routehidechildrenlist&&item.children.length>0&&!horizontalFlag"
                   :to="item.path + item.children[0].path">
        <el-menu-item :index="item.path + item.children[0].path" class='submenu-title-routehidechildrenlist'>
          <icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg>
          <span>{{item.name}}</span>
        </el-menu-item>
      </router-link> -->

      <!-- <template> -->
        <!--一级菜单名下不需要有子菜单显示的情况-->
        <router-link 
          v-if="!item.routeHidden
          &&item.routehidechildrenlist
          &&item.children.length>0"
          :to="item.path + item.children[0].path"
        >
          <el-menu-item 
            :index="item.path + item.children[0].path" 
            style="display:inline-block" 
            :class="['submenu-title-routehidechildrenlist',!horizontalFlag? 'leftSidebar-submenu-title-routehidechildrenlist': '']"
          >
            <icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg>
            <span>{{item.name}}</span>
          </el-menu-item>
        </router-link>   
      <!-- </template> -->
    



      <!--一级菜单名下需要有子菜单显示的情况-->
       <el-submenu :index="item.path" v-if="!item.routehidechildrenlist&&!item.routeHidden">

        <!-----只有一层子路由------->
        <template slot="title">
          <icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg>
          <span class="parentName">{{item.name}}</span>
        </template>

        <template v-for="itemChild in item.children" v-if='!itemChild.routeHidden'>

          <!--有多层子路由，需要递归调用此 sider-item 的组件-->
          <sidebar-item class='nest-menu' 
            v-if='!itemChild.routehidechildrenlist&&itemChild.children && itemChild.children.length>0' 
            :routes='[itemChild]'>
          </sidebar-item>

          <router-link v-else :to="item.path+'/'+itemChild.path">
            <el-menu-item :index="item.path+'/'+itemChild.path">
              <icon-svg v-if='itemChild.icon' :icon-class="itemChild.icon"></icon-svg>
              <span class="name">{{itemChild.name}}</span>
            </el-menu-item>
          </router-link>

        </template>

      </el-submenu>

    </template>
  </div>
</template>

<script>
  import iconSvg from '@/base/Icon-svg/index'
  export default {
    name: 'SidebarItem',
    props: {
      routes: {
        type: Array
      },
      horizontalFlag: {
        type: Boolean,
        default: false
      }
    },
    created () {
      // debugger
      console.log("导航菜单的routes：",this.routes)
    },
    components: {
      iconSvg
    },
    methods: {

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .menu-wrapper
    .parentName
      margin-right 20px
    .leftSidebar-submenu-title-routehidechildrenlist
      width 190px !important
</style>

