import Vue from 'vue'
import Router from 'vue-router'
/* layout */
import Layout from '@/components/layout/Layout'
Vue.use(Router)

/**
* routeIcon : 对应的sidebar icon图标
* routeHidden : 如果 `routeHidden:true` 将不显示在siderbar中
* routeRedirect : 重定向
* routeHideChildrenList : 如果 `routeHideChildrenList:true` 将没有子菜单
**/
export let consRouterMap = [
  {
    path: '/login',
    component: () => import('@/components/login/index'),
    name: '登陆',
    routeHideChildrenList: true,
    hidden: true,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/forgetWord',
    component: () => import('@/components/login/forgetWord/forgetWord'),
    name: '忘记密码',
    routeHideChildrenList: true,
    hidden: true,
    meta: {
      title: '忘记密码-找回密码'
    }
  },  
  {
    path: '/register',
    component: () => import('@/components/login/register/register'),
    name: '注册',
    routeHideChildrenList: true,
    hidden: true,
    meta: {
      title: '注册'
    }
  },    
  {
    path: '/authredirect',
    component: () => import('@/components/login/authredirect'),
    name: '权限跳转',
    routeHideChildrenList: true,
    hidden: true    
  },
  {
    path: '/setModule',
    component: () => import('@/components/setModule/index'),
    name: '配置系统',
    routeHideChildrenList: true,
    hidden: true,
    meta: {
      title: '配置系统'
    },    
  },  
  {
    path: '/page_fieldSet',
    component: () => import('@/base/NewStyle-cmp/Page-cmp/Link-page-cmp/page_fieldSet'),
    name: '字段设置页面',
    routeHideChildrenList: true,
    hidden: true,
    meta: {
      title: '字段设置'
    },      
  },
  {
    path: '/',
    component: () => import('@/components/layout/Layout'),
    redirect: '/index',
    name: '首页',
    icon: 'people',
    routeHideChildrenList: true,
    hidden: false,
    children: [
      {
        path: 'index',
        component: () => import('@/base/index/index'),
        name: '简述',
        routeHideChildrenList: true,
        hidden: true,
        meta: {
          title: '首页-简述'
        },
        children: []
      },
      {
        path: 'test',
        component: () => import('@/components/test/test'),
        name: 'test',
        routeHideChildrenList: true,
        hidden: false,
        meta: {
          title: '动态显示测试'
        },
        children: []
      },   
      {
        path: 'testDic',
        component: () => import('@/components/test/testDicTree'),
        name: 'testDic',
        routeHideChildrenList: true,
        hidden: true,
        meta: {
          title: 'testDicTree'
        },
        children: []
      },       
      {
        path: 'dispose',
        component: () => import('@/components/dispose/dispose'),
        // component: 'Layout',
        name: 'dispose',
        routeHideChildrenList: true,
        hidden: true,
        meta: {
          title: '配置系统'
        },
        children: []
      },   
      {
        path: '/P1',
        component: () => import('@/base/NewStyle-cmp/Page-cmp/Link-page-cmp/page-P1'),
        name: 'P1页面',
        routeHideChildrenList: true,
        hidden: true, 
        meta: {
          hidden: true,
          MetaCode: 'PreHire',
          title: 'P1页面'
        },
        children: []  
      },            
      {
        path: '/P2',
        // component: 'base/NewStyle-cmp/Page-cmp/Link-page-cmp/page-P5',
        component: () => import('@/base/NewStyle-cmp/Page-cmp/Link-page-cmp/page-P2'),
        name: '待入职',
        routeHideChildrenList: true,
        hidden: true, 
        meta: {
          hidden: true,
          MetaCode: 'PreHire',
          title: '待入职'
        },
        children: []  
      },  
      {
        path: '/P5',
        component: () => import('@/base/NewStyle-cmp/Page-cmp/Link-page-cmp/page-P5'),
        name: '待入职',
        routeHideChildrenList: true,
        hidden: true , 
        meta: {
          hidden: true,
          MetaCode: 'PreHire',
          title: '待入职'
        },
        children: [] 
      },
      {
        path: '/P6',
        component: () => import('@/base/NewStyle-cmp/Page-cmp/Link-page-cmp/page-P6'),
        name: '重新入职',
        routeHideChildrenList: true,
        hidden: true,
        meta: {
          hidden: true,
          MetaCode: 'Rehire',
          title: '重新入职'   
        },
        children: []     
      },
      {
        path: '/P7',
        component: () => import('@/base/NewStyle-cmp/Page-cmp/Link-page-cmp/page-P7'),
        name: '直接入职',
        routeHideChildrenList: true,
        hidden: true,
        meta: {
          hidden: true,
          MetaCode: 'Directlyonboard',
          title: '直接入职'
        },
        children: []       
      },
      {
        path: '/P8',
        component: () => import('@/base/NewStyle-cmp/Page-cmp/Link-page-cmp/page-P8'),
        name: '新增人事档案机构',
        routeHideChildrenList: true,
        hidden: true,
        meta: {
          hidden: true,
          MetaCode: 'AddPFileLocat2',
          title: '新增人事档案机构'
        },
        children: []     
      },
      {
        path: '/P9',
        component: () => import('@/base/NewStyle-cmp/Page-cmp/Link-page-cmp/page-P9'),
        name: '编辑人事档案机构',
        routeHideChildrenList: true,
        hidden: true,
        meta: {
          hidden: true,
          MetaCode: 'EditPFileLocat2',
          title: '编辑人事档案机构'
        },
        children: []       
      },    
      {
        path: '/P10',
        component: () => import('@/base/NewStyle-cmp/Page-cmp/Link-page-cmp/page-P10'),
        name: '调入',
        routeHideChildrenList: true,
        hidden: true,
        meta: {
          hidden: true,
          MetaCode: 'transferin',
          title: '调入'       
        },
        children: []
      },             
    ]
  },
  // {
  //   path: '/test',
  //   component: () => import('@/components/employee/eventHandler/event/test'),
  //   name: 'test',
  //   routeHideChildrenList: true,
  //   hidden: false,
  //   meta: {
  //     title: '事件处理器-事件',
  //     hidden: false
  //   },
  // children: []
  // },    
  {
    path: '/flow/print',
    component: () => import('@/components/platform/approval-flow/right-fixed/print'),
    name: '流程打印',
    routeHideChildrenList: true,
    hidden: true,
    meta: {
      title: '流程打印'
    },
    children: []
  }
]

export let asyncRouter = [
  {
    routePath: '/employee',
    routeComponent: 'Layout',
    // routeRedirect: '/employee/employeeManage/joinedEmployee',
    routeName: '员工',
    routeIcon: 'employee',
    routeHidden: false,
    routeHideChildrenList: false,
    hidden: false,    
    routeMeta: JSON.stringify({
      title: '员工',
      routeHidden: false
    }),
    childrenList: [
      {
        routePath: '/employee/employeeManage',
        routeComponent: 'components/employee/employeeManage/index',
        routeName: '员工管理',
        routeHidden: false,
        routeHideChildrenList: false,
        hidden: false,          
        routeMeta: JSON.stringify({
          title: '员工-员工管理',
          routeHidden: false
        }),
        childrenList: [
          {
            routePath: 'joinedEmployee',
            routeComponent: 'components/employee/employeeManage/joinedEmployee/index',
            routeName: '在职员工',
            routeHidden: false,
            routeHideChildrenList: true,
            hidden: false,              
            routeMeta: JSON.stringify({
              title: '员工管理-在职员工',
              routeHidden: false
            }),
            childrenList: []
          },
        ]        
      }
    ]
  }
]

export let constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/components/login/index'),
    name: '登录',
    routeHidden: true,
    routeHideChildrenList: true,    
    routeMeta: {
      title: '登录'
    },
    children:[]
  },
  {
    path: '/forgetWord',
    component: () => import('@/components/login/forgetWord/forgetWord'),
    name: '忘记',
    routeHidden: true,
    routeHideChildrenList: true,
    routeMeta: {
      title: '忘记密码-找回密码'
    },
    children:[]
  },    
  {
    path: '/register',
    component: () => import('@/components/login/register/register'),
    name: '注册',
    routeHidden: true,
    routeHideChildrenList: true,
    routeMeta: {
      title: '注册'
    },
    children:[]
  },    
  {
    path: '/authredirect',
    component: () => import('@/components/login/authredirect'),
    name: '权限',
    routeHidden: true,
    routeHideChildrenList: true,
    routeMeta: {
      title: '权限'
    },
    children:[] 
  },
  {
    path: '/setModule',
    component: () => import('@/components/setModule/index'),
    name: '配置',
    routeHidden: true,
    routeHideChildrenList: true,
    routeMeta: {
      title: '配置系统'
    },  
    children:[]
  },  
  {
    path: '/page_fieldSet',
    component: () => import('@/base/NewStyle-cmp/Page-cmp/Link-page-cmp/page_fieldSet'),
    name: '字段设置',
    routeHidden: true,
    routeHideChildrenList: true,
    routeMeta: {
      title: '字段设置'
    },  
    children:[]    
  },
  {
    path: '/',
    component: () => import('@/components/layout/Layout'),
    redirect: '/index',
    name: '首页',
    routeIcon: 'people',
    routeHideChildrenList: true,
    routeHidden: false,
    children: [
      {
        path: 'index',
        component: () => import('@/base/index/index'),
        name: '简述',
        routeHidden: true,
        routeHideChildrenList: true,
        routeMeta: {
          title: '首页-简述'
        },
        children:[]
      },
      {
        path: 'test',
        component: () => import('@/components/test/test'),
        name: 'test',
        routeHidden: true,
        routeHideChildrenList: true,
        routeMeta: {
          title: '动态显示测试'
        },
        children:[]
      },   
      {
        path: 'testDic',
        component: () => import('@/components/test/testDicTree'),
        name: 'testDic',
        routeHidden: true,
        routeHideChildrenList: true,
        routeMeta: {
          title: 'testDicTree'
        },
        children:[]
      },       
      {
        path: 'dispose',
        component: () => import('@/components/dispose/dispose'),
        name: 'dispose',
        routeHidden: true,
        routeHideChildrenList: true,
        routeMeta: {
          title: '配置系统'
        },
        children:[]
      },   
      {
        path: 'P1',
        component: () => import('@/base/NewStyle-cmp/Page-cmp/Link-page-cmp/page-P1'),
        name: 'P1页面',
        routeHidden: true, 
        routeHideChildrenList: true,
        routeMeta: {
          routeHidden: true,
          MetaCode: 'PreHire',
          title: 'P1页面'
        },
        children:[]   
      },            
      {
        path: 'P2',
        // component: 'base/NewStyle-cmp/Page-cmp/Link-page-cmp/page-P5',
        component: () => import('@/base/NewStyle-cmp/Page-cmp/Link-page-cmp/page-P2'),
        name: '待入职',
        routeHidden: true, 
        routeHideChildrenList: true,
        routeMeta: {
          routeHidden: true,
          MetaCode: 'PreHire',
          title: '待入职'
        },
        children:[] 
      },  
      {
        path: 'P5',
        component: () => import('@/base/NewStyle-cmp/Page-cmp/Link-page-cmp/page-P5'),
        name: '待入职',
        routeHidden: true , 
        routeHideChildrenList: true,
        routeMeta: {
          routeHidden: true,
          MetaCode: 'PreHire',
          title: '待入职'
        },
        children:[]   
      },
      {
        path: 'P6',
        component: () => import('@/base/NewStyle-cmp/Page-cmp/Link-page-cmp/page-P6'),
        name: '重新入职',
        routeHidden: true,
        routeHideChildrenList: true,
        routeMeta: {
          routeHidden: true,
          MetaCode: 'Rehire',
          title: '重新入职'   
        },
        children:[]      
      },
      {
        path: 'P7',
        component: () => import('@/base/NewStyle-cmp/Page-cmp/Link-page-cmp/page-P7'),
        name: '直接入职',
        routeHideChildrenList: true,
        routeHidden: true,
        routeMeta: {
          routeHidden: true,
          MetaCode: 'Directlyonboard',
          title: '直接入职'
        },
        children:[]       
      },
      {
        path: 'P8',
        component: () => import('@/base/NewStyle-cmp/Page-cmp/Link-page-cmp/page-P8'),
        name: '新增人事档案机构',
        routeHidden: true,
        routeHideChildrenList: true,
        routeMeta: {
          routeHidden: true,
          MetaCode: 'AddPFileLocat2',
          title: '新增人事档案机构'
        },
        children:[]     
      },
      {
        path: 'P9',
        component: () => import('@/base/NewStyle-cmp/Page-cmp/Link-page-cmp/page-P9'),
        name: '编辑人事档案机构',
        routeHidden: true,
        routeHideChildrenList: true,
        routeMeta: {
          routeHidden: true,
          MetaCode: 'EditPFileLocat2',
          title: '编辑人事档案机构'
        },
        children:[]       
      },    
      {
        path: 'P10',
        component: () => import('@/base/NewStyle-cmp/Page-cmp/Link-page-cmp/page-P10'),
        name: '调入',
        routeHidden: true,
        routeHideChildrenList: true,
        routeMeta: {
          routeHidden: true,
          MetaCode: 'transferin',
          title: '调入'       
        },
        children:[]
      },             
    ]
  },
  // {
  //   path: 'test',
  //   routeComponent: () => import('@/components/employee/eventHandler/event/test'),
  //   name: 'test',
  //   routeHidden: false,
  // routeHideChildrenList: true,
  //   routeMeta: {
  //     title: '事件处理器-事件',
  //     routeHidden: false
  //   },
  // children:[]
  // },    
  {
    path: '/flow/print',
    component: () => import('@/components/platform/approval-flow/right-fixed/print'),
    name: '流程',
    routeHidden: true,
    routeHideChildrenList: true,
    routeMeta: {
      title: '流程打印'
    },
    children:[]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export let asyncRouterMap = [
  {
    routePath: '/employee',
    routeComponent: 'components/layout/Layout',
    routeRedirect: 'employee/employeeManage/joinedEmployee',
    routeName: '员工',
    routeIcon: 'employee',
    routeHidden: false,
    routeHideChildrenList: false,
    routeMeta: JSON.stringify({
      title: '员工',
      routeHidden: false
    }),
    childrenList: [
      {
        routePath: '/employee/employeeManage',
        routeComponent: 'components/employee/employeeManage/index',
        routeName: '员工管理',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '员工-员工管理',
          routeHidden: false
        }),
        childrenList: [
          {
            routePath: 'joinedEmployee',
            routeComponent: 'components/employee/employeeManage/joinedEmployee/index',
            routeName: '在职员工',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '员工管理-在职员工',
              routeHidden: false
            }),
            childrenList: []
          },
          {
            routePath: 'waitEmployee',
            routeComponent: 'components/employee/employeeManage/waitEmployee/waitEmployee',
            routeName: '待入职员工',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '员工管理-待入职员工',
              routeHidden: false
            }),
            childrenList: []     
          },
          {
            routePath: 'leavedEmployee',
            routeComponent: 'components/employee/employeeManage/leavedEmployee/index',
            routeName: '离职员工',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '员工管理-离职员工',
              routeHidden: false
            }),
            childrenList: []       
          },
          {
            routePath: 'empDetailInfo',
            routeComponent: 'components/employee/employeeManage/empDetailInfo',
            routeName: '员工详情',
            routeHidden: true,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '员工管理-员工详情',
              routeHidden: false
            }),
            childrenList: []
          }          
        ]      
      },    
      {
        routePath: '/employee/pcApprove',
        routeComponent: 'components/employee/pcApprove/pcApprove',
        routeName: '电脑审批',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '员工-电脑审批',
          routeHidden: false
        }),
        childrenList: [
          {
            routePath: 'todoList',
            routeComponent: 'components/employee/pcApprove/todoList/todoCatList',        
            routeName: '待办事宜',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-待办事宜',
              routeHidden: false
            }),
            childrenList: []
          },            
          {
            routePath: 'approveInfo',
            routeComponent: 'components/employee/pcApprove/approveInfo/approveInfo',        
            routeName: '审批信息',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList: []
          },        
          {
            routePath: 'empInfoChange',
            routeComponent: 'components/employee/pcApprove/empInfoChange/empInfoChange',          
            routeName: '员工档案变更',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList: []
          },
          {
            routePath: 'applyQuery',
            routeComponent: 'components/employee/pcApprove/applyQuery/applyQuery',         
            routeName: '员工申请查询',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList: []
          }                   
        ]
      },      
      {
        routePath: '/employee/contractManage',
        routeComponent: 'components/employee/contractManage/contractManage',
        routeName: '合同管理',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList: [
          {
            routePath: 'contract',
            routeComponent: 'components/employee/contractManage/contract/contract',
            routeName: '合同管理',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          },
          {
            routePath: 'contractRemind',
            routeComponent: 'components/employee/contractManage/contractRemind/contractRemind',
            routeName: '合同提醒',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          }          
        ]       
      },
      {
        routePath: '/employee/eventHandler',
        routeComponent: 'components/employee/eventHandler/eventHandler',
        routeName: '事件处理器',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList: [
          {
            routePath: 'event',
            routeComponent: 'components/employee/eventHandler/event/event',
            routeName: '事件',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          },          
          {
            routePath: 'executeEvent',
            routeComponent: 'components/employee/eventHandler/executeEvent/executeEvent',
            routeName: '执行事件',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]          
          },
          {
            routePath: 'setEvent',
            routeComponent: 'components/employee/eventHandler/setEvent/setEvent',
            routeName: '事件管理',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]                
          },
          {
            routePath: 'batchEventsImport',
            routeComponent: 'components/employee/eventHandler/batchEventsImport/batchEventsImport',
            routeName: '批量事件导入',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]              
          }                   
        ]        
      },
      {
        routePath: '/employee/baseSet',
        routeComponent: 'components/employee/baseSet/baseSet',
        routeName: '基础设置',
        routeRedirect: '/employee/baseSet/set',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList: [
          {
            routePath:'set',
            routeComponent: 'components/employee/baseSet/baseSet',
            routeName:'设置',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          },        
          // {
          //   routePath:'personnelFile',
          //   routeComponent: 'components/employee/baseSet/personnelFile/personnelFile',
          //   routeName:'人事档案地点',
          //   routeHidden: false,
          // routeHideChildrenList: false,
          // routeMeta: JSON.stringify({
          //   title: '电脑审批-审批信息',
          //   routeHidden: false
          // }),
          // childrenList:[]
          // },
          // {
          //   routePath:'showGroupSet',
          //   routeComponent: 'components/employee/baseSet/showGroupSet/showGroupSet',
          //   routeName:'显示组表配置',
          //   routeHidden: false,
          // routeHideChildrenList: false,
          // routeMeta: JSON.stringify({
          //   title: '电脑审批-审批信息',
          //   routeHidden: false
          // }),
          // childrenList:[]           
          // },
          // {
          //   routePath:'fieldAuthority',
          //   routeComponent: 'components/employee/baseSet/fieldAuthority/fieldAuthority',
          //   routeName:'组件字段权限',
          //   routeHidden: false,
          // routeHideChildrenList: false,
          // routeMeta: JSON.stringify({
          //   title: '电脑审批-审批信息',
          //   routeHidden: false
          // }),
          // childrenList:[]             
          // },
          // {
          //   routePath:'customerDIC',
          //   routeComponent: 'components/employee/baseSet/customerDIC/customerDICList',
          //   routeName:'自定义字典表',
          //   routeHidden: false,
          // routeHideChildrenList: false,
          // routeMeta: JSON.stringify({
          //   title: '电脑审批-审批信息',
          //   routeHidden: false
          // }),
          // childrenList:[]           
          // },
          // {
          //   routePath:'assignmentRules',
          //   routeComponent: 'components/employee/baseSet/assignmentRules/assignmentRules',
          //   routeName:'工号分配规则',
          //   routeHidden: false,
          // routeHideChildrenList: false,
          // routeMeta: JSON.stringify({
          //   title: '电脑审批-审批信息',
          //   routeHidden: false
          // }),
          // childrenList:[]                
          // }          
        ]      
      }  
    ]
  },
  // {
  //   routePath: '/organization',
  //   routeComponent: 'Layout',
  //   routeName: '组织',
  //   routeIcon: 'socialSecurity',
  //   routeHidden: false,
  // routeHideChildrenList: false,
  // routeMeta: JSON.stringify({
  //   title: '电脑审批-审批信息',
  //   routeHidden: false
  // }),
  //   childrenList: [
  //     {
  //       routePath: 'set',
  //       routeComponent: 'components/organization/set/index',
  //       routeName: '设置',
  //       routeHidden: false,
  // routeHideChildrenList: false,
  // routeMeta: JSON.stringify({
  //   title: '电脑审批-审批信息',
  //   routeHidden: false
  // }),
  // childrenList:[]      
  //     },
  //     {
  //       routePath: 'org',
  //       routeComponent: 'components/organization/org/index',
  //       routeName: '组织',
  //       routeHidden: false,
  // routeHideChildrenList: false,
  // routeMeta: JSON.stringify({
  //   title: '电脑审批-审批信息',
  //   routeHidden: false
  // }),
  // childrenList:[]       
  //     },
  //     {
  //       routePath: 'rankSystem',
  //       routeComponent: 'components/organization/rankSystem/index',
  //       routeName: '职级体系',
  //       routeHidden: false,
  // routeHideChildrenList: false,
  // routeMeta: JSON.stringify({
  //   title: '电脑审批-审批信息',
  //   routeHidden: false
  // }),
  // childrenList:[]       
  //     },
  //     {
  //       routePath: 'duty',
  //       routeComponent: 'components/organization/duty/index',
  //       routeName: '职务',
  //       routeHidden: false,
  // routeHideChildrenList: false,
  // routeMeta: JSON.stringify({
  //   title: '电脑审批-审批信息',
  //   routeHidden: false
  // }),
  // childrenList:[]        
  //     },
  //     {
  //       routePath: 'position',
  //       routeComponent: 'components/organization/position/index',
  //       routeName: '职位',
  //       routeHidden: false,
  // routeHideChildrenList: false,
  // routeMeta: JSON.stringify({
  //   title: '电脑审批-审批信息',
  //   routeHidden: false
  // }),
  // childrenList:[]      
  //     }                       
  //   ]
  // },
  {
    routePath: '/socialSecurity',
    routeRedirect: '/socialSecurity/index',
    routeComponent: 'Layout',
    routeName: '社保',
    routeIcon: 'socialSecuri',
    routeHidden: false,
    routeHideChildrenList: false,
    routeMeta: JSON.stringify({
      title: '电脑审批-审批信息',
      routeHidden: false
    }), 
    childrenList: [
      {
        routePath: 'socialSecurity/index',
        routeComponent: 'components/socialSecurity/homeIndex/index',
        routeName: '社保-首页',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList:[]
      },
      {
        routePath: 'socialThisMonth',
        routeComponent: 'components/socialSecurity/index/thisMonth/thisMonth',
        routeName: '本月变动',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList:[]
      },
      {
        routePath: 'monthlyReport',
        routeComponent: 'components/socialSecurity/index/monthlyReport/monthlyReport',
        routeName: '月报',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList:[]
      },
      {
        routePath: 'payBack',
        routeComponent: 'components/socialSecurity/index/payBack/payBack',
        routeName: '补缴',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList:[]
      },
      {
        routePath: 'insuranceTable',
        routeComponent: 'components/socialSecurity/index/insuranceTable/insuranceTable',
        routeName: '参保报表',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList:[]
      },
      {
        routePath: 'insuranceConfig',
        routeComponent: 'components/socialSecurity/index/insuranceConfig/insuranceConfig',
        routeName: '参保配置',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList:[]
      }
    ]
  },
  {
    routePath: '/salary',
    routeRedirect: '/salary/salaryRule',
    routeComponent: 'Layout',
    routeName: '薪资',
    routeIcon: 'salary',
    routeHidden: false,
    routeHideChildrenList: false,
    routeMeta: JSON.stringify({
      title: '电脑审批-审批信息',
      routeHidden: false
    }),   
    childrenList: [
      {
        routePath: '/salaryRule',
        routeComponent: 'components/salary/salaryRule/index',
        routeName: '薪资规则',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList: [
          {
            routePath: 'addProject',
            routeComponent: 'components/salary/salaryRule/addProject',
            routeName: '新增方案',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          },
          {
            routePath: 'editorProject',
            routeComponent: 'components/salary/salaryRule/addProject',
            routeName: '编辑方案',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          }
        ]
      },
      {
        routePath: '/salaryProject',
        routeComponent: 'components/salary/salaryProject/index',
        routeName: '薪资项目',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList: [
          {
            routePath: 'salaryArchiveInfo',
            routeComponent: 'components/salary/salaryProject/salaryArchiveInfo',
            routeName: '薪资项目-个人信息',
            routeHidden: true,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          }
        ]
      },
      {
        routePath: 'salaryScheme',
        routeComponent: 'components/salary/salaryScheme/index',
        routeName: '薪资档案',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList:[]
      },
      {
        routePath: 'salaryUpdate',
        routeComponent: 'components/salary/salaryUpdate/index',
        routeName: '定薪调薪',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList:[]
      },
      {
        routePath: 'salaryMonthReport',
        routeComponent: 'components/salary/salaryMonthReport/index',
        routeName: '薪资月报',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList:[]
      },
      {
        routePath: '/salaryCommonMonth',
        routeComponent: 'components/salary/salaryCommonMonth/index',
        routeName: '普通月发薪',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList: [
          {
            routePath: 'salaryCMPInfo',
            routeComponent: 'components/salary/salaryCommonMonth/salaryCMPInfo.vue',
            routeName: '普通月发薪-个人信息',
            routeHidden: true,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          }
        ]
      },
      {
        routePath: 'salarySpecial',
        routeComponent: 'components/salary/salarySpecial/index',
        routeName: '特殊发薪',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList:[]
      },
      {
        routePath: 'salaryContrastTable',
        routeComponent: 'components/salary/salaryContrastTable/index',
        routeName: '薪酬对比分析表',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList:[]
      },
      {
        routePath: 'salaryApproval',
        routeComponent: 'components/salary/salaryApproval/index',
        routeName: '薪资审批',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList:[]
      },
      {
        routePath: 'salaryProvision',
        routeComponent: 'components/salary/salaryProvision/index',
        routeName: '薪资计提',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList:[]
      },
      {
        routePath: 'salaryBillSet',
        routeComponent: 'components/salary/salaryBillSet/index',
        routeName: '工资条设定',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList:[]
      },
      {
        routePath: 'salaryAmerceSet',
        routeComponent: 'components/salary/salaryAmerceSet/index',
        routeName: '惩奖设定',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList:[]
      },
      {
        routePath: 'leaveSet',
        routeComponent: 'components/salary/leaveSet/index',
        routeName: '请假款项',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList:[]
      },
      {
        routePath: 'overtimeSet',
        routeComponent: 'components/salary/overtimeSet/index',
        routeName: '加班款项',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList:[]
      }
    ]
  },
  {
    routePath: '/attendance',
    routeRedirect: '/attendance/baseConfig',
    routeComponent: 'Layout',
    routeName: '考勤',
    routeIcon: 'salary',
    routeHidden: false,
    routeHideChildrenList: false,
    routeMeta: JSON.stringify({
      title: '电脑审批-审批信息',
      routeHidden: false
    }),   
    childrenList: [
      {
        routePath: '/attendance/baseConfig',
        routeComponent: 'components/attendance/base-config/index',
        routeName: '基础配置',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),       
        childrenList: [
          {
            routePath: '/daySet',
            routeComponent: 'components/attendance/base-config/day-set/index',
            routeName: '班次设置',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList: [
              {
                routePath: 'addDay',
                routeComponent: 'components/attendance/base-config/day-set/detail',
                routeName: '新增班次',
                routeHidden: false,
                routeHideChildrenList: false,
                routeMeta: JSON.stringify({
                  title: '电脑审批-审批信息',
                  routeHidden: false
                }),
                childrenList:[]
              },
              {
                routePath: 'editDay',
                routeComponent: 'components/attendance/base-config/day-set/detail',
                routeName: '编辑班次',
                routeHidden: false,
                routeHideChildrenList: false,
                routeMeta: JSON.stringify({
                  title: '电脑审批-审批信息',
                  routeHidden: false
                }),
                childrenList:[]
              }
            ]
          },
          {
            routePath: '/attendanceTeam',
            routeComponent: 'components/attendance/base-config/attendance-team/index',
            routeName: '考勤组',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList: [
              {
                routePath: 'addAttendanceTeam',
                routeComponent: 'components/attendance/base-config/attendance-team/detail',
                routeName: '新增考勤组',
                routeHidden: false,
                routeHideChildrenList: false,
                routeMeta: JSON.stringify({
                  title: '电脑审批-审批信息',
                  routeHidden: false
                }),
                childrenList:[]
              },
              {
                routePath: 'editAttendanceTeam',
                routeComponent: 'components/attendance/base-config/attendance-team/detail',
                routeName: '新增考勤组',
                routeHidden: false,
                routeHideChildrenList: false,
                routeMeta: JSON.stringify({
                  title: '电脑审批-审批信息',
                  routeHidden: false
                }),
                childrenList:[]
              }
            ]
          },
          {
            routePath: '/attendanceRule',
            routeComponent: 'components/attendance/base-config/attendance-rule/index',
            routeName: '出勤规则',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList: [
              {
                routePath: '/overtimeRule',
                routeComponent: 'components/attendance/base-config/attendance-rule/overtime-rule-list',
                routeName: '加班规则',
                routeHidden: false,
                routeHideChildrenList: false,
                routeMeta: JSON.stringify({
                  title: '电脑审批-审批信息',
                  routeHidden: false
                }),
                childrenList: [
                  {
                    routePath: 'addOvertimeRule',
                    routeComponent: 'components/attendance/base-config/attendance-rule/overtime-rule-detail',
                    routeName: '新增加班规则',
                    routeHidden: false,
                    routeHideChildrenList: false,
                    routeMeta: JSON.stringify({
                      title: '电脑审批-审批信息',
                      routeHidden: false
                    }),
                  },
                  {
                    routePath: 'editOvertimeRule',
                    routeComponent: 'components/attendance/base-config/attendance-rule/overtime-rule-detail',
                    routeName: '编辑加班规则',
                    routeHidden: false,
                    routeHideChildrenList: false,
                    routeMeta: JSON.stringify({
                      title: '电脑审批-审批信息',
                      routeHidden: false
                    }),
                  }
                ]
              },
              {
                routePath: '/offdayRule',
                routeComponent: 'components/attendance/base-config/attendance-rule/offday-rule-list',
                routeName: '调休规则',
                routeHideChildrenList: false,
                routeHidden: true,
                routeMeta: JSON.stringify({
                  title: '电脑审批-审批信息',
                  routeHidden: false
                }),
                childrenList: [
                  {
                    routePath: 'addOffdayRule',
                    routeComponent: 'components/attendance/base-config/attendance-rule/offday-rule-detail',
                    routeName: '新增调休规则',
                    routeHidden: true,
                    routeHideChildrenList: false,
                    routeMeta: JSON.stringify({
                      title: '电脑审批-审批信息',
                      routeHidden: false
                    }),
                    childrenList:[]
                  },
                  {
                    routePath: 'editOffdayRule',
                    routeComponent: 'components/attendance/base-config/attendance-rule/offday-rule-detail',
                    routeName: '编辑调休规则',
                    routeHideChildrenList: false,
                    routeHidden: true,
                    routeMeta: JSON.stringify({
                      title: '电脑审批-审批信息',
                      routeHidden: false
                    }),
                    childrenList:[]
                  }
                ]
              },
              {
                routePath: '/businessRule',
                routeComponent: 'components/attendance/base-config/attendance-rule/business-rule-list',
                routeName: '出差规则',
                routeHidden: true,
                routeHideChildrenList: false,
                routeMeta: JSON.stringify({
                  title: '电脑审批-审批信息',
                  routeHidden: false
                }),
                childrenList: [
                  {
                    routePath: 'addBusinessRule',
                    routeComponent: 'components/attendance/base-config/attendance-rule/business-rule-detail',
                    routeName: '新增出差规则',
                    routeHidden: true,
                    routeHideChildrenList: false,
                    routeMeta: JSON.stringify({
                      title: '电脑审批-审批信息',
                      routeHidden: false
                    }),
                  },
                  {
                    routePath: 'editBusinessRule',
                    routeComponent: 'components/attendance/base-config/attendance-rule/business-rule-detail',
                    routeName: '编辑出差规则',
                    routeHidden: true,
                    routeHideChildrenList: false,
                    routeMeta: JSON.stringify({
                      title: '电脑审批-审批信息',
                      routeHidden: false
                    }),
                    childrenList:[]
                  }
                ]
              },
              {
                routePath: '/publicRule',
                routeComponent: 'components/attendance/base-config/attendance-rule/public-rule-list',
                routeName: '公出规则',
                routeHidden: true,
                routeHideChildrenList: false,
                routeMeta: JSON.stringify({
                  title: '电脑审批-审批信息',
                  routeHidden: false
                }),
                childrenList: [
                  {
                    routePath: 'addPublicRule',
                    routeComponent: 'components/attendance/base-config/attendance-rule/public-rule-detail',
                    routeName: '新增公出规则',
                    routeHidden: true,
                    routeHideChildrenList: false,
                    routeMeta: JSON.stringify({
                      title: '电脑审批-审批信息',
                      routeHidden: false
                    }),
                    childrenList:[]
                  },
                  {
                    routePath: 'editPublicRule',
                    routeComponent: 'components/attendance/base-config/attendance-rule/public-rule-detail',
                    routeName: '编辑公出规则',
                    routeHidden: true,
                    routeHideChildrenList: false,
                    routeMeta: JSON.stringify({
                      title: '电脑审批-审批信息',
                      routeHidden: false
                    }),
                    childrenList:[]
                  }
                ]
              },
              {
                routePath: '/supplementRule',
                routeComponent: 'components/attendance/base-config/attendance-rule/supplement-rule-list',
                routeName: '补签规则',
                routeHidden: true,
                routeHideChildrenList: false,
                routeMeta: JSON.stringify({
                  title: '电脑审批-审批信息',
                  routeHidden: false
                }),
                childrenList: [
                  {
                    routePath: 'addSupplementRule',
                    routeComponent: 'components/attendance/base-config/attendance-rule/supplement-rule-detail',
                    routeName: '新增补签规则',
                    routeHidden: true,
                    routeHideChildrenList: false,
                    routeMeta: JSON.stringify({
                      title: '电脑审批-审批信息',
                      routeHidden: false
                    }),
                    childrenList:[]
                  },
                  {
                    routePath: 'editSupplementRule',
                    routeComponent: 'components/attendance/base-config/attendance-rule/supplement-rule-detail',
                    routeName: '编辑补签规则',
                    routeHidden: true,
                    routeHideChildrenList: false,
                    routeMeta: JSON.stringify({
                      title: '电脑审批-审批信息',
                      routeHidden: false
                    }),
                    childrenList:[]
                  }
                ]
              },
              {
                routePath: '/appealRule',
                routeComponent: 'components/attendance/base-config/attendance-rule/appeal-rule-list',
                routeName: '申述规则',
                routeHidden: true,
                routeHideChildrenList: false,
                routeMeta: JSON.stringify({
                  title: '电脑审批-审批信息',
                  routeHidden: false
                }),
                childrenList: [
                  {
                    routePath: 'addAppealRule',
                    routeComponent: 'components/attendance/base-config/attendance-rule/appeal-rule-detail',
                    routeName: '新增申述规则',
                    routeHidden: true,
                    routeHideChildrenList: false,
                    routeMeta: JSON.stringify({
                      title: '电脑审批-审批信息',
                      routeHidden: false
                    }),
                    childrenList:[]
                  },
                  {
                    routePath: 'editAppealRule',
                    routeComponent: 'components/attendance/base-config/attendance-rule/appeal-rule-detail',
                    routeName: '编辑申述规则',
                    routeHidden: true,
                    routeHideChildrenList: false,
                    routeMeta: JSON.stringify({
                      title: '电脑审批-审批信息',
                      routeHidden: false
                    }),
                    childrenList:[]
                  }
                ]
              },
              {
                routePath: '/leaveRule',
                routeComponent: 'components/attendance/base-config/attendance-rule/leave-rule-list',
                routeName: '请假规则',
                routeHidden: true,
                routeHideChildrenList: false,
                routeMeta: JSON.stringify({
                  title: '电脑审批-审批信息',
                  routeHidden: false
                }),
                childrenList: [
                  {
                    routePath: 'addLeaveRule',
                    routeComponent: 'components/attendance/base-config/attendance-rule/leave-rule-detail',
                    routeName: '新增请假规则',
                    routeHidden: true,
                    routeHideChildrenList: false,
                    routeMeta: JSON.stringify({
                      title: '电脑审批-审批信息',
                      routeHidden: false
                    }),
                    childrenList:[]
                  },
                  {
                    routePath: 'editLeaveRule',
                    routeComponent: 'components/attendance/base-config/attendance-rule/leave-rule-detail',
                    routeName: '编辑请假规则',
                    routeHidden: true,
                    routeHideChildrenList: false,
                    routeMeta: JSON.stringify({
                      title: '电脑审批-审批信息',
                      routeHidden: false
                    }),
                    childrenList:[]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        routePath: '/attendance/handleService',
        routeRedirect: '/attendance/baseConfig/daySet',
        routeComponent: 'components/attendance/handle-service/index',
        routeName: '业务处理',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),     
        childrenList: [
          {
            routePath: 'attendanceArchives',
            routeComponent: 'components/attendance/handle-service/attendance-archives/index',
            routeName: '考勤档案',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          },
          {
            routePath: '/attendanceTeam',
            routeComponent: 'components/attendance/handle-service/scheduling/index',
            routeName: '排班表',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList: [
              {
                routePath: 'schedulingCount',
                routeComponent: 'components/attendance/handle-service/scheduling/scheduling-count',
                routeName: '排班统计',
                routeHidden: false,
                routeHideChildrenList: false,
                routeMeta: JSON.stringify({
                  title: '电脑审批-审批信息',
                  routeHidden: false
                }),
                childrenList:[]
              },
              {
                routePath: 'schedulingBatch',
                routeComponent: 'components/attendance/handle-service/scheduling/scheduling-batch',
                routeName: '批量排班',
                routeHidden: false,
                routeHideChildrenList: false,
                routeMeta: JSON.stringify({
                  title: '电脑审批-审批信息',
                  routeHidden: false
                }),
                childrenList:[]
              },
              {
                routePath: 'schedulingHighBatch',
                routeComponent: 'components/attendance/handle-service/scheduling/scheduling-high-batch',
                routeName: '高级批量排班',
                routeHidden: false,
                routeHideChildrenList: false,
                routeMeta: JSON.stringify({
                  title: '电脑审批-审批信息',
                  routeHidden: false
                }),
                childrenList:[]
              },
              {
                routePath: 'schedulingImport',
                routeComponent: 'components/attendance/handle-service/scheduling/scheduling-import',
                routeName: '导入排班',
                routeHidden: false,
                routeHideChildrenList: false,
                routeMeta: JSON.stringify({
                  title: '电脑审批-审批信息',
                  routeHidden: false
                }),
                childrenList:[]
              }
            ]
          }
        ]
      },
      {
        routePath: '/attendance/handleData',
        routeRedirect: '/attendance/handleData/clockRecord',
        routeComponent: 'components/attendance/handle-data/index',
        routeName: '数据处理',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),       
        childrenList: [
          {
            routePath: 'clockRecord',
            routeComponent: 'components/attendance/handle-data/clock-record/index',
            routeName: '打卡记录',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          },
          {
            routePath: 'supplementRecord',
            routeComponent: 'components/attendance/handle-data/supplement-record/index',
            routeName: '补签单据',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          },
          {
            routePath: 'attendanceAppeal',
            routeComponent: 'components/attendance/handle-data/attendance-appeal/index',
            routeName: '考勤申诉',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          },
          {
            routePath: 'timeReceipt',
            routeComponent: 'components/attendance/handle-data/time-receipt/index',
            routeName: '时间单据',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          },
          {
            routePath: 'overtimeReceipt',
            routeComponent: 'components/attendance/handle-data/overtime-receipt/index',
            routeName: '加班单据',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          }
        ]
      },
      {
        routePath: '/attendance/attendanceReport',
        routeRedirect: '/attendance/attendanceReport/attendanceDayReport',
        routeComponent: 'components/attendance/attendance-report/index',
        routeName: '考勤报告',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),      
        childrenList: [
          {
            routePath: 'attendanceDayReport',
            routeComponent: 'components/attendance/attendance-report/attendance-day-report/index',
            routeName: '考勤日报',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          },
          {
            routePath: 'attendanceMonthReport',
            routeComponent: 'components/attendance/attendance-report/attendance-month-report/index',
            routeName: '考勤月报',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          },
          {
            routePath: 'overtimeCount',
            routeComponent: 'components/attendance/attendance-report/overtime-count/index',
            routeName: '加班统计',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          },
          {
            routePath: 'workingHoursMonthReport',
            routeComponent: 'components/attendance/attendance-report/working-hours-month-report/index',
            routeName: '工时月报',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          }
        ]
      }
    ]
  },
  {
    routePath: '/platform',
    routeRedirect: '/platform/index',
    routeComponent: 'Layout',
    routeName: '平台',
    routeIcon: 'platform',
    routeHidden: false,
    routeHideChildrenList: false,
    routeMeta: JSON.stringify({
      title: '电脑审批-审批信息',
      routeHidden: false
    }),   
    childrenList: [
      {
        routePath: 'index',
        routeComponent: 'components/platform/socialManage/joinType/joinType',
        routeName: '参保类型',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList:[]
      },
      {
        routePath: 'platformThisMonth',
        routeComponent: 'components/platform/socialManage/thisMonth/thisMonth',
        routeName: '本月变动',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList:[]
      },
      {
        routePath: '/platform/approvalFlow',       // 审批流 一级菜单
        routeRedirect: '/platform/approvalFlow/flowInfo', // 重定向到 二级菜单审批流路由
        routeComponent: 'components/platform/approval-flow/index',
        routeName: '审批流',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),       
        childrenList: [
          {
            routePath: '/tableManage',
            routeComponent: 'components/platform/approval-flow/table-manage/table-manage',
            routeName: '表单管理',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList: [
              {
                routePath: 'showTable',   // 点击 查看按钮  查看表单信息
                routeComponent: 'components/platform/approval-flow/table-manage/table-show',
                routeName: '表单信息',
                routeHidden: true,
                routeHideChildrenList: false,
                routeMeta: JSON.stringify({
                  title: '电脑审批-审批信息',
                  routeHidden: false
                }),
                childrenList:[]
              },
              {
                routePath: 'tableEdit', // 点击 编辑 按钮，进入表单的编辑界面
                routeComponent: 'components/platform/approval-flow/table-manage/table-edit',
                routeName: '表单编辑',
                routeHidden: true,
                routeHideChildrenList: false,
                routeMeta: JSON.stringify({
                  title: '电脑审批-审批信息',
                  routeHidden: false
                }),
                childrenList:[]
              }
            ]
          },
          {
            routePath: 'flowInfo',   // 审批流—— 审批流信息 菜单
            routeComponent: 'components/platform/approval-flow/flow-info/flow-info',
            routeName: '审批流信息',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          },
          {
            routePath: '/flowRule',  // 审批流——审批规则二级菜单路由
            routeComponent: 'components/platform/approval-flow/flow-rule/flow-rule',
            routeName: '审批规则',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList: [
              {
                routePath: '/flowConfig',  //  查看/新增/编辑 流程时 的流程配置页面  
                routeComponent: 'components/platform/approval-flow/flow-config/index',
                routeRedirect: '/platform/approvalFlow/flowRule/flowConfig/processSet',  // 查看、新增和编辑时，重定向到了 processSet子路由页面
                routeName: '审批流配置',
                routeHidden: true,
                routeHideChildrenList: false,
                routeMeta: JSON.stringify({
                  title: '电脑审批-审批信息',
                  routeHidden: false
                }),
                childrenList: [
                  {
                    routePath: 'processSet',   // 流程设置路由页面
                    routeComponent: 'components/platform/approval-flow/flow-config/process-set/process-set',
                    routeName: '流程设置',
                    routeHidden: true,
                    routeHideChildrenList: false,
                    routeMeta: JSON.stringify({
                      title: '电脑审批-审批信息',
                      routeHidden: false
                    }),
                    childrenList:[]
                  },
                  {
                    routePath: 'relationTable',  // 流程表单页面
                    routeComponent: 'components/platform/approval-flow/flow-config/relation-table/relation-table',
                    routeName: '流程表单',
                    routeHidden: true,
                    routeHideChildrenList: false,
                    routeMeta: JSON.stringify({
                      title: '电脑审批-审批信息',
                      routeHidden: false
                    }),
                    childrenList:[]
                  },
                  {
                    routePath: 'processDesign',  // 流程设计页面
                    routeComponent: 'components/platform/approval-flow/flow-config/process-design/process-design',
                    routeName: '流程设计',
                    routeHidden: true,
                    routeHideChildrenList: false,
                    routeMeta: JSON.stringify({
                      title: '电脑审批-审批信息',
                      routeHidden: false
                    }),
                    childrenList:[]
                  },
                  {
                    routePath: 'fieldSet',   // 节点设置页面
                    routeComponent: 'components/platform/approval-flow/flow-config/field-set/field-set',
                    routeName: '节点设置',
                    routeHidden: true,
                    routeHideChildrenList: false,
                    routeMeta: JSON.stringify({
                      title: '电脑审批-审批信息',
                      routeHidden: false
                    }),
                    childrenList:[]
                  }
                ]
              }
            ]
          },
          {
            routePath: 'launch',  // 审批流——发起 二级菜单路由
            routeComponent: 'components/platform/approval-flow/launch/launch',
            routeName: '发起',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          },
          {
            routePath: 'todo',   // 审批流—— 待办  二级菜单路由
            routeComponent: 'components/platform/approval-flow/todo/todo',
            routeName: '待办',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          },
          {
            routePath: 'onTheWay',  // 审批流——在途 二级菜单路由
            routeComponent: 'components/platform/approval-flow/on-the-way/on-the-way',
            routeName: '在途',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          },
          {
            routePath: 'myStart',   // 审批流——我发起的 二级路由页面
            routeComponent: 'components/platform/approval-flow/my-start/my-start',
            routeName: '我发起的',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          },
          {
            routePath: 'myApproval',   // 审批流 —— 我审批的  二级路由页面
            routeComponent: 'components/platform/approval-flow/my-approval/my-approval',
            routeName: '我处理的',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          },
          {
            routePath: 'copyWithMe',   // 审批流—— 抄送我的 二级路由页面
            routeComponent: 'components/platform/approval-flow/copy-with-me/copy-with-me',
            routeName: '抄送我的',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          },
          {
            routePath: 'myFollow',    // 审批流——我关注的  二级路由页面
            routeComponent: 'components/platform/approval-flow/my-follow/my-follow',
            routeName: '我关注的',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          },
          {
            routePath: 'set',  // 审批流——设置   二级路由页面
            routeComponent: 'components/platform/approval-flow/set/set',
            routeName: "设置",
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          }
        ]
      }
    ]
  },
  {
    routePath: '/notice',    //  通知公告 一级菜单路由 页面
    routeRedirect: '/notice/index',
    routeComponent: 'Layout',
    routeName: '公告',
    routeIcon: 'notice',
    routeHidden: false,
    routeHideChildrenList: false,
    routeMeta: JSON.stringify({
      title: '电脑审批-审批信息',
      routeHidden: false
    }),   
    childrenList: [
      {
        routePath: '/index',
        routeComponent: 'components/notice/front/index',
        routeName: '公告首页',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList: [
          {
            routePath: 'noticeDetailFront',
            routeComponent: 'components/notice/front/noticeDetailFront',
            routeName: '员工公告详情',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          }
        ]
      },
      {
        routePath: '/noticeManage',
        routeComponent: 'components/notice/end/index',
        routeName: '公告管理',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList: [
          {
            routePath: 'createNotice',
            routeComponent: 'components/notice/end/createNotice',
            routeName: '新建公告',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          },
          {
            routePath: 'noticeDetailEnd',
            routeComponent: 'components/notice/end/noticeDetailEnd',
            routeName: '公告详情',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          },
          {
            routePath: 'modifyNotice',
            routeComponent: 'components/notice/end/modifyNotice',
            routeName: '编辑公告',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          },
          {
            routePath: 'feedback',
            routeComponent: 'components/notice/end/feedback',
            routeName: '公告反馈',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          },
          {
            routePath: 'historyNotice',
            routeComponent: 'components/notice/end/historyNotice',
            routeName: '公告历史',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          }
        ]
      },
      {
        routePath: 'receipt',
        routeComponent: 'components/notice/end/receipt',
        routeName: '公告回执',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList:[]
      }
    ]
  },
  {
    routePath: '/manage',
    // routeRedirect: 'manage/companyInfo',
    routeComponent: 'Layout',
    routeName: '管理',
    routeIcon: 'manage',
    routeHidden: false,
    routeHideChildrenList: false,
    routeMeta: JSON.stringify({
      title: '电脑审批-审批信息',
      routeHidden: false
    }),   
    childrenList: [
      // 系统
      // {
      //   routePath: '/manage/platformSystemSetting',
      //   routeComponent: 'components/manage/userManage/userManage',
      //   routeName: '平台系统设置',
      //   routeHidden: false,
      // routeHideChildrenList: false,
      //   routeMeta: {
      //     title: '管理-平台系统设置',
      //     routeHidden: false     
      //   },
      //   childrenList: [
      //     {
      //       routePath: '/manage/platformSystemSetting/systemSetting',
      //       // routeRedirect: '/manage/platformSystemSetting/systemSetting/menuManage', // 重定向到 二级菜单 平台系统设置
      //       routeComponent: 'components/manage/userManage/systemSetting/systemSetting',
      //       routeName: '系统配置',
      //       routeHidden: false,
      // routeHideChildrenList: false,
      //       routeMeta: {
      //         title: '平台系统设置-系统配置',
      //         routeHidden: false
      //       },
      //       childrenList: [
      //         {
      //           routePath: 'menuManage',
      //           routeComponent: 'components/manage/userManage/systemSetting/menuManage/menuManage',
      //           routeName: '菜单管理',
      //           routeHidden: false,
      // routeHideChildrenList: false,
      //           routeMeta: {
      //             title: '系统配置-菜单管理',
      //             routeHidden: false
      //           }
      //         },
      //         {
      //           routePath: 'pageManage',
      //           routeComponent: 'components/manage/userManage/systemSetting/pageManage/pageManage',
      //           routeName: '页面管理',
      //           routeHidden: false,
      // routeHideChildrenList: false,
      //           routeMeta: {
      //             title: '系统配置-页面管理',
      //             routeHidden: false
      //           }                
      //         },
      //         {
      //           routePath: 'componentsManage',
      //           routeComponent: 'components/manage/userManage/systemSetting/componentsManage/componentsManage',
      //           routeName: '组件管理',
      //           routeHidden: false,
      // routeHideChildrenList: false,
      //           routeMeta: {
      //             title: '系统配置-组件管理',
      //             routeHidden: false
      //           }                
      //         },  
      //         {
      //           routePath: 'pageComManage',
      //           routeComponent: 'components/manage/userManage/systemSetting/pageComponents/pageComManage',
      //           routeName: '页面组件管理',
      //           routeHidden: false,
      // routeHideChildrenList: false,
      //           routeMeta: {
      //             title: '系统配置-页面组件管理',
      //             routeHidden: false
      //           }                
      //         },                           
      //       ]
      //     },
      //     {
      //       routePath: '/manage/platformSystemSetting/userRole',
      //       routeComponent: 'components/manage/userManage/userRole/userRole',
      //       routeName: '用户角色',
      //       routeHidden: false,
      // routeHideChildrenList: false,
      //       routeMeta: {
      //         title: '平台系统设置-用户角色',
      //         routeHidden: false    
      //       },
      //       childrenList: [
      //         {
      //           routePath: 'account',
      //           routeComponent: 'components/manage/userManage/userRole/account/account',
      //           routeName: '账户',
      //           routeHidden: false,
      // routeHideChildrenList: false,
      //           routeMeta: {
      //             title: '用户角色-账户',
      //             routeHidden: false
      //           }                
      //         },
      //         {
      //           routePath: 'sysManager',
      //           routeComponent: 'components/manage/userManage/userRole/sysManager/sysManager',
      //           routeName: '企业系统管理员',
      //           routeHidden: false,
      // routeHideChildrenList: false,
      //           routeMeta: {
      //             title: '用户角色-系统管理员',
      //             routeHidden: false
      //           }
      //         },
      //         {
      //           routePath: 'userGroup',
      //           routeComponent: 'components/manage/userManage/userRole/userGroup/userGroup', 
      //           routeName: '用户组',
      //           routeHidden: false,
      // routeHideChildrenList: false,
      //           routeMeta: {
      //             title: '用户角色-用户组',
      //             routeHidden: false   
      //           }             
      //         },
      //         {
      //           routePath: 'roleGroup',
      //           routeComponent: 'components/manage/userManage/userRole/roleGroup/roleGroup',
      //           routeName: '角色组',
      //           routeHidden: false,
      // routeHideChildrenList: false,
      //           routeMeta: {
      //             title: '用户角色-角色组',
      //             routeHidden: false 
      //           }               
      //         },
      //         {
      //           routePath: 'authorityList',
      //           routeComponent: 'components/manage/userManage/userRole/authorityList/commonAuthorityList',
      //           routeName: '权限引用列表',
      //           routeHidden: false,
      // routeHideChildrenList: false,
      //           routeMeta: {
      //             title: '用户角色-权限引用列表',
      //             routeHidden: false    
      //           }            
      //         },
      //         {
      //           routePath: 'userManage',
      //           routeComponent: 'components/manage/userManage/userRole/userManage/commonUserManage',
      //           routeName: '用户管理',
      //           routeHidden: false,
      // routeHideChildrenList: false,
      //           routeMeta: {
      //             title: '用户角色-用户管理',
      //             routeHidden: false 
      //           }               
      //         },
      //         {
      //           routePath: 'roleManage',
      //           routeComponent: 'components/manage/userManage/userRole/roleManage/commonRoleManage',
      //           routeName: '角色管理',
      //           routeHidden: false,
      // routeHideChildrenList: false,
      //           routeMeta: {
      //             title: '用户角色-角色管理',
      //             routeHidden: false 
      //           }               
      //         }
      //       ]  
      //     },
      //     {
      //       routePath: '/manage/platformSystemSetting/licensingRights',
      //       routeComponent: 'components/manage/userManage/licensingRights/licensingRights',
      //       routeRedirect: '/manage/platformSystemSetting/licensingRights/permit',
      //       routeName: '许可权',
      //       routeHidden: false,
      // routeHideChildrenList: false,
      //       routeMeta: {
      //         title: '平台系统设置-许可权',
      //         routeHidden: false
      //       },
      //       childrenList: [
      //         {
      //           routePath: 'permit',
      //           routeComponent: 'components/manage/userManage/licensingRights/permit/common-permit',
      //           routeName: '许可权',
      //           routeHidden: false,
      // routeHideChildrenList: false,
      //           routeMeta: {
      //             title: '许可权-许可权',
      //             routeHidden: false
      //           }                
      //         }
      //       ]
      //     },
      //     {
      //       routePath: '/manage/platformSystemSetting/versionPackage',
      //       routeComponent: 'components/manage/userManage/versionPackage/versionPackage',
      //       routeName: '版本套包',
      //       routeHidden: false,
      // routeHideChildrenList: false,
      //       routeMeta: {
      //         title: '平台系统设置-版本套包',
      //         routeHidden: false
      //       },
      //       childrenList: [
      //         {
      //           routePath: 'setting',
      //           routeComponent: 'components/manage/userManage/versionPackage/setting/setting',
      //           routeName: '设置',
      //           routeHidden: false,
      // routeHideChildrenList: false,
      //           routeMeta: {
      //             title: '版本套包-设置',
      //             routeHidden: false
      //           } 
      //         },
      //         {
      //           routePath: 'buyDiscount',
      //           routeComponent: 'components/manage/userManage/versionPackage/buyDiscount/buyDiscount',
      //           routeName: '统一购买折扣',
      //           routeHidden: false,
      // routeHideChildrenList: false,
      //           routeMeta: {
      //             title: '版本套包-统一购买折扣',
      //             routeHidden: false
      //           }                 
      //         },
      //         {
      //           routePath: 'version',
      //           routeComponent: 'components/manage/userManage/versionPackage/version/version',
      //           routeName: '版本',
      //           routeHidden: false,
      // routeHideChildrenList: false,
      //           routeMeta: {
      //             title: '版本套包-版本',
      //             routeHidden: false
      //           }                 
      //         },
      //         {
      //           routePath: 'package',
      //           routeComponent: 'components/manage/userManage/versionPackage/package/package',
      //           routeName: '套包',
      //           routeHidden: false,
      // routeHideChildrenList: false,
      //           routeMeta: {
      //             title: '版本套包-套包',
      //             routeHidden: false
      //           }                 
      //         },
      //         {
      //           routePath: 'customerVersion',
      //           routeComponent: 'components/manage/userManage/versionPackage/customerVersion/customerVersion',
      //           routeName: '客户版本',
      //           routeHidden: false,
      // routeHideChildrenList: false,
      //           routeMeta: {
      //             title: '版本套包-客户版本',
      //             routeHidden: false
      //           }              
      //         }
      //       ]
      //     },
      //     {
      //       routePath: 'companyInfo',
      //       routeComponent: 'components/manage/userManage/companyInfo/companyInfo',
      //       routeName: '企业信息',
      //       routeHidden: false,
      // routeHideChildrenList: false,
      //       routeMeta: {
      //         title: '平台系统设置-企业信息',
      //         routeHidden: false
      //       }
      //     }                      
      //   ]
      // },
      // 企业      
      {
        routePath: 'companyInfo',
        routeComponent: 'components/manage/companySetting/sysRightsSetting/companyInfo/companyInfo',
        routeName: '企业信息',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList:[]
      },           
      {
        routePath: '/manage/companySetting/systemSetting',
        routeComponent: 'components/manage/companySetting/systemSetting/systemSetting',
        routeRedirect: '/manage/companySetting/systemSetting/displayGroup',
        routeName: '系统设置',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList: [
          {
            routePath: 'dataBase',
            routeComponent: 'components/manage/companySetting/systemSetting/dataBase/index',
            routeName: '物理表',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]               
          },          
          {
            routePath: 'showTable',
            routeComponent: 'components/manage/companySetting/systemSetting/showTable/showTable',
            routeName: '显示表',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]               
          },
          {
            routePath: 'displayGroup',
            routeComponent: 'components/manage/companySetting/systemSetting/displayGroup/displayGroup',
            routeName: '显示分组',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]               
          },
          {
            routePath: 'pageManage',
            routeComponent: 'components/manage/companySetting/systemSetting/pageManage/index',
            routeName: '页面管理',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '页面管理',
              routeHidden: false
            })             
          },          
          {
            routePath: 'components',
            routeComponent: 'components/manage/companySetting/systemSetting/components/componentsManage',
            routeName: '显示组件',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]              
          },
          {
            routePath: 'pages',
            routeComponent: 'components/manage/companySetting/systemSetting/pages/pageManage',
            routeName: '显示页面',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]                
          },
          {
            routePath: 'pageComponets',
            routeComponent: 'components/manage/companySetting/systemSetting/pageComponents/pageComManage',
            routeName: '显示页面组件',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]                
          }                             
        ]           
      },   
      {
        routePath: '/manage/platformSystemSetting/userRole',
        routeComponent: 'components/manage/userManage/userRole/userRole',
        routeRedirect: '/manage/platformSystemSetting/userRole/userManage',
        routeName: '用户角色',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList: [
          {
            routePath: 'userManage',
            routeComponent: 'components/manage/userManage/userRole/userManage/commonUserManage',
            routeName: '用户管理',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]              
          },              
          {
            routePath: 'userGroup',
            routeComponent: 'components/manage/userManage/userRole/userGroup/userGroup', 
            routeName: '用户组',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]            
          },
          {
            routePath: 'roleManage',
            routeComponent: 'components/manage/userManage/userRole/roleManage/commonRoleManage',
            routeName: '角色管理',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]             
          },            
          {
            routePath: 'roleGroup',
            routeComponent: 'components/manage/userManage/userRole/roleGroup/roleGroup',
            routeName: '角色组',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]              
          },
          {
            routePath: 'authorityList',
            routeComponent: 'components/manage/userManage/userRole/authorityList/commonAuthorityList',
            routeName: '权限引用列表',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]           
          },
          {
            routePath: 'permit',
            routeComponent: 'components/manage/userManage/licensingRights/permit/common-permit',
            routeName: '许可权配置',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]              
          },
          // {
          //   routePath: 'licensingRights',
          //   routeComponent: 'components/manage/userManage/licensingRights/licensingRights',
          //   routeRedirect: '/manage/platformSystemSetting/licensingRights/permit',
          //   routeName: '许可权配置',
          //   routeHidden: false,
          // routeHideChildrenList: false,
          //   routeMeta: {
          //     title: '用户角色-许可权',
          //     routeHidden: false
          //   },
          //   childrenList: [
          //     {
          //       routePath: 'permit',
          //       routeComponent: 'components/manage/userManage/licensingRights/permit/common-permit',
          //       routeName: '许可权',
          //       routeHidden: false,
          // routeHideChildrenList: false,
          //       routeMeta: {
          //         title: '许可权配置-许可权',
          //         routeHidden: false
          //       }                
          //     }
          //   ]
          // },
          {
            routePath: 'companyRole',
            routeComponent: 'components/manage/userManage/userRole/companyRole/companyRole',
            routeName: '企业角色',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]              
          }                                      
        ]
      },
      {
        routePath: '/manage/buySystem',
        routeComponent: 'components/manage/buySystem/buySystem',
        routeRedirect: '/manage/buySystem/companyBuy',
        routeName: '购买系统',
        routeHidden: false,
        routeHideChildrenList: false,
        routeMeta: JSON.stringify({
          title: '电脑审批-审批信息',
          routeHidden: false
        }),
        childrenList: [
          {
            routePath: 'companyBuy',
            routeComponent: 'components/manage/buySystem/companyBuy/companyBuy',
            routeName: '企业购买',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          },
          {
            routePath: 'orderList',
            routeComponent: 'components/manage/buySystem/orderList/orderList',
            routeName: '订单',
            routeHidden: false,
            routeHideChildrenList: false,
            routeMeta: JSON.stringify({
              title: '电脑审批-审批信息',
              routeHidden: false
            }),
            childrenList:[]
          }           
        ]
      }  
    ]
  },
  {
    routePath: '/guid',
    routeComponent: 'base/NewStyle-cmp/guid-test',
    routeName: '引导',
    routeHidden: true,
    routeHideChildrenList: false,
    routeMeta: JSON.stringify({
      title: '电脑审批-审批信息',
      routeHidden: false
    }),
    childrenList:[]    
  },      
  {
    routePath: '*',
    routeComponent: 'base/errorPage/404',
    routeName: '404',
    routeHidden: true,
    routeHideChildrenList: false,
    routeMeta: JSON.stringify({
      title: '出错了',
      routeHidden: false
    }),
    childrenList:[]
  }
]
