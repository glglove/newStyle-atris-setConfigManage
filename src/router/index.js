import Vue from 'vue'
import Router from 'vue-router'
/* layout */
import Layout from '@/components/layout/Layout'
Vue.use(Router)

/**
* routeIcon : 对应的sidebar icon图标
* routeHidden : 如果 `routeHidden:true` 将不显示在siderbar中
* routeRedirect : 重定向
* noDropdown : 如果 `noDropdown:true` 将没有子菜单
**/
export const consRouterMap = [
  {
    path: '/login',
    component: () => import('@/components/login/index'),
    name: '登录',
    routeHidden: true,
    meta: {
      title: '登录'
    },
    childrenList: []
  }, 
  {
    path: '/forgetWord',
    component: () => import('@/components/login/forgetWord/forgetWord'),
    name: '忘记',
    routeHidden: true,
    meta: {
      title: '忘记密码-找回密码'
    },
    childrenList: []
  },    
  {
    path: '/register',
    component: () => import('@/components/login/register/register'),
    name: '注册',
    routeHidden: true,
    meta: {
      title: '注册'
    },
    childrenList: []
  },    
  {
    path: '/',
    component: Layout,
    name: '首页',
    routeIcon: 'people',
    routeHidden: false,
    childrenList: [
      {
        path: 'index',
        component: () => import('@/base/index/index'),
        name: '简述',
        routeIcon: 'people',
        routeHidden: false,
        meta: {
          title: '首页-简述'
        },
        childrenList: []
      },
      {
        path: 'test',
        component: () => import('@/components/test/test'),
        name: 'test',
        routeIcon: 'people',
        routeHidden: true,
        meta: {
          title: '动态显示测试'
        },
        childrenList: []
      }           
    ]
  },  
]

export const asyncRouter = [
  {
    routePath: '/employee',
    routeComponent: Layout,
    // routeRedirect: '/employee/employeeManage/joinedEmployee',
    name: '员工',
    routeIcon: 'employee',
    routeHidden: false,
    routeMeta: JSON.stringify({
      title: '员工',
      routeHidden: false
    }),
    childrenList: [
      {
        routePath: '/employee/employeeManage',
        routeComponent: 'components/employee/employeeManage/employeeManage',
        name: '员工管理',
        routeHidden: false,
        routeMeta: JSON.stringify({
          title: '员工-员工管理',
          routeHidden: false
        }),
        childrenList: [
          {
            routePath: 'joinedEmployee',
            routeComponent: 'components/employee/employeeManage/joinedEmployee/joinedEmployee',
            name: '在职员工',
            routeHidden: false,
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
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/components/login/index'),
    name: '登录',
    routeHidden: true,
    routeMeta: {
      title: '登录'
    },
    childrenList:[]
  },
  {
    path: '/forgetWord',
    component: () => import('@/components/login/forgetWord/forgetWord'),
    name: '忘记',
    routeHidden: true,
    routeMeta: {
      title: '忘记密码-找回密码'
    },
    childrenList:[]
  },    
  {
    path: '/register',
    component: () => import('@/components/login/register/register'),
    name: '注册',
    routeHidden: true,
    routeMeta: {
      title: '注册'
    },
    childrenList:[]
  },    
  {
    path: '/authredirect',
    component: () => import('@/components/login/authredirect'),
    name: '权限',
    routeHidden: true,
    routeMeta: {
      title: '权限'
    },
    childrenList:[] 
  },
  {
    path: '/setModule',
    component: () => import('@/components/setModule/index'),
    name: '配置',
    routeHidden: true,
    routeMeta: {
      title: '配置系统'
    },  
    childrenList:[]
  },  
  {
    path: '/page_fieldSet',
    component: () => import('@/base/NewStyle-cmp/Page-cmp/Link-page-cmp/page_fieldSet'),
    name: '字段设置',
    routeHidden: true,
    routeMeta: {
      title: '字段设置'
    },  
    childrenList:[]    
  },
  {
    path: '/',
    component: () => import('@/components/layout/Layout'),
    name: '首页',
    routeIcon: 'people',
    routeHidden: false,
    childrenList: [
      {
        path: 'index',
        name: '简述',
        routeHidden: true,
        routeMeta: {
          title: '首页-简述'
        },
        component: () => import('@/base/index/index'),
        childrenList:[]
      },
      {
        path: 'test',
        component: () => import('@/components/test/test'),
        name: 'test',
        routeHidden: true,
        routeMeta: {
          title: '动态显示测试'
        },
        childrenList:[]
      },   
      {
        path: 'testDic',
        component: () => import('@/components/test/testDicTree'),
        name: 'testDic',
        routeHidden: true,
        routeMeta: {
          title: 'testDicTree'
        },
        childrenList:[]
      },       
      {
        path: 'dispose',
        component: () => import('@/components/dispose/dispose'),
        name: 'dispose',
        routeHidden: false,
        routeMeta: {
          title: '配置系统'
        },
        childrenList:[]
      },   
      {
        path: 'P1',
        component: () => import('@/base/NewStyle-cmp/Page-cmp/Link-page-cmp/page-P1'),
        name: 'P1页面',
        routeHidden: true, 
        routeMeta: {
          routeHidden: true,
          MetaCode: 'PreHire',
          title: 'P1页面'
        },
        childrenList:[]   
      },            
      {
        path: 'P2',
        // component: () => import('@/base/NewStyle-cmp/Page-cmp/Link-page-cmp/page-P5'),
        component: () => import('@/base/NewStyle-cmp/Page-cmp/Link-page-cmp/page-P2'),
        name: '待入职',
        routeHidden: true, 
        routeMeta: {
          routeHidden: true,
          MetaCode: 'PreHire',
          title: '待入职'
        },
        childrenList:[] 
      },  
      {
        path: 'P5',
        component: () => import('@/base/NewStyle-cmp/Page-cmp/Link-page-cmp/page-P5'),
        name: '待入职',
        routeHidden: true , 
        routeMeta: {
          routeHidden: true,
          MetaCode: 'PreHire',
          title: '待入职'
        },
        childrenList:[]   
      },
      {
        path: 'P6',
        component: () => import('@/base/NewStyle-cmp/Page-cmp/Link-page-cmp/page-P6'),
        name: '重新入职',
        routeHidden: true,
        routeMeta: {
          routeHidden: true,
          MetaCode: 'Rehire',
          title: '重新入职'   
        },
        childrenList:[]      
      },
      {
        path: 'P7',
        component: () => import('@/base/NewStyle-cmp/Page-cmp/Link-page-cmp/page-P7'),
        name: '直接入职',
        routeHidden: true,
        routeMeta: {
          routeHidden: true,
          MetaCode: 'Directlyonboard',
          title: '直接入职'
        },
        childrenList:[]       
      },
      {
        path: 'P8',
        component: () => import('@/base/NewStyle-cmp/Page-cmp/Link-page-cmp/page-P8'),
        name: '新增人事档案机构',
        routeHidden: true,
        routeMeta: {
          routeHidden: true,
          MetaCode: 'AddPFileLocat2',
          title: '新增人事档案机构'
        },
        childrenList:[]     
      },
      {
        path: 'P9',
        component: () => import('@/base/NewStyle-cmp/Page-cmp/Link-page-cmp/page-P9'),
        name: '编辑人事档案机构',
        routeHidden: true,
        routeMeta: {
          routeHidden: true,
          MetaCode: 'EditPFileLocat2',
          title: '编辑人事档案机构'
        },
        childrenList:[]       
      },    
      {
        path: 'P10',
        component: () => import('@/base/NewStyle-cmp/Page-cmp/Link-page-cmp/page-P10'),
        name: '调入',
        routeHidden: true,
        routeMeta: {
          routeHidden: true,
          MetaCode: 'transferin',
          title: '调入'       
        },
        childrenList:[]
      },             
    ]
  },
  // {
  //   path: 'test',
  //   routeComponent: () => import('@/components/employee/eventHandler/event/test'),
  //   name: 'test',
  //   routeHidden: false,
  //   routeMeta: {
  //     title: '事件处理器-事件',
  //     routeHidden: false
  //   },
  // childrenList:[]
  // },    
  {
    path: '/flow/print',
    component: () => import('@/components/platform/approval-flow/right-fixed/print'),
    name: '流程',
    routeHidden: true,
    routeMeta: {
      title: '流程打印'
    },
    childrenList:[]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/employee',
    routeComponent: '@/components/layout/Layout',
    routeRedirect: '@/employee/employeeManage/joinedEmployee',
    routeName: '员工',
    routeIcon: 'employee',
    routeHidden: false,
    routeMeta: {
      title: '员工',
      routeHidden: false
    },
    childrenList: [
      {
        path: '/employee/employeeManage',
        routeComponent: '@/components/employee/employeeManage/employeeManage',
        routeName: '员工管理',
        routeHidden: false,
        routeMeta: JSON.stringify({
          title: '员工-员工管理',
          routeHidden: false
        }),
        childrenList: [
          {
            path: 'joinedEmployee',
            routeComponent: () => import('@/components/employee/employeeManage/joinedEmployee/joinedEmployee'),
            routeName: '在职员工',
            routeHidden: false,
            routeMeta: {
              title: '员工管理-在职员工',
              routeHidden: false
            }
          },
          {
            path: '/waitEmployee',
            routeComponent: () => import('@/components/employee/employeeManage/waitEmployee/waitEmployee'),
            routeName: '待入职员工',
            routeHidden: false,
            routeMeta: {
              title: '员工管理-待入职员工',
              routeHidden: false
            }        
          },
          {
            path: '/leavedEmployee',
            routeComponent: () => import('@/components/employee/employeeManage/leavedEmployee/leavedEmployee'),
            routeName: '离职员工',
            routeHidden: false,
            routeMeta: {
              title: '员工管理-离职员工',
              routeHidden: false
            }        
          },
          {
            path: '/empDetailInfo',
            routeComponent: () => import('@/components/employee/employeeManage/empDetailInfo'),
            routeName: '员工详情',
            routeHidden: true,
            routeMeta: {
              title: '员工管理-员工详情',
              routeHidden: false
            }        
          }          
        ]      
      },    
      {
        path: '/employee/pcApprove',
        routeComponent: () => import('@/components/employee/pcApprove/pcApprove'),
        routeName: '电脑审批',
  
        routeHidden: false,
        routeMeta: {
          title: '员工-电脑审批',
          routeHidden: false
        },
        childrenList: [
          {
            path: 'todoList',
            routeComponent: () => import('@/components/employee/pcApprove/todoList/todoCatList'),        
            routeName: '待办事宜',
            routeHidden: false,
            routeMeta: {
              title: '电脑审批-待办事宜',
              routeHidden: false
            }
          },            
          {
            path: 'approveInfo',
            routeComponent: () => import('@/components/employee/pcApprove/approveInfo/approveInfo'),        
            routeName: '审批信息',
            routeHidden: false,
            routeMeta: {
              title: '电脑审批-审批信息',
              routeHidden: false
            }
          },        
          {
            path: 'empInfoChange',
            routeComponent: () => import('@/components/employee/pcApprove/empInfoChange/empInfoChange'),          
            routeName: '员工档案变更',
            routeHidden: false,
            routeMeta: {
              title: '电脑审批-员工档案变更',
              routeHidden: false
            }
          },
          {
            path: 'applyQuery',
            routeComponent: () => import('@/components/employee/pcApprove/applyQuery/applyQuery'),         
            routeName: '员工申请查询',
            routeHidden: false,
            routeMeta: {
              title: '电脑审批-员工申请查询',
              routeHidden: false
            }
          }                   
        ]
      },      
      {
        path: '/employee/contractManage',
        routeComponent: () => import('@/components/employee/contractManage/contractManage'),
        routeName: '合同管理',
  
        routeHidden: false,
        routeMeta: {
          title: '员工-合同管理',
          routeHidden: false
        }, 
        childrenList: [
          {
            path: 'contract',
            routeComponent: () => import('@/components/employee/contractManage/contract/contract'),
            routeName: '合同管理',
            routeHidden: false,
            routeMeta: {
              title: '合同管理-合同管理',
              routeHidden: false
            }
          },
          {
            path: 'contractRemind',
            routeComponent: () => import('@/components/employee/contractManage/contractRemind/contractRemind'),
            routeName: '合同提醒',
            routeHidden: false,
            routeMeta: {
              title: '合同管理-合同提醒',
              routeHidden: false
            }
          }          
        ]       
      },
      {
        path: '/employee/eventHandler',
        routeComponent: () => import('@/components/employee/eventHandler/eventHandler'),
        routeName: '事件处理器',
        routeHidden: false,
        routeMeta: {
          title: '员工-事件处理器',
          routeHidden: false
        }, 
        childrenList: [
          {
            path: 'event',
            routeComponent: () => import('@/components/employee/eventHandler/event/event'),
            routeName: '事件',
            routeHidden: false,
            routeMeta: {
              title: '事件处理器-事件',
              routeHidden: false
            }
          },          
          {
            path: 'executeEvent',
            routeComponent: () => import('@/components/employee/eventHandler/executeEvent/executeEvent'),
            routeName: '执行事件',
            routeHidden: false,
            routeMeta: {
              title: '事件处理器-执行事件',
              routeHidden: false
            }            
          },
          {
            path: 'setEvent',
            routeComponent: () => import('@/components/employee/eventHandler/setEvent/setEvent'),
            routeName: '事件管理',
            routeHidden: false,
            routeMeta: {
              title: '事件处理器-事件管理',
              routeHidden: false
            }                
          },
          {
            path: 'batchEventsImport',
            routeComponent: () => import('@/components/employee/eventHandler/batchEventsImport/batchEventsImport'),
            routeName: '批量事件导入',
            routeHidden: false,
            routeMeta: {
              title: '事件处理器-批量事件导入',
              routeHidden: false
            }                
          }                   
        ]        
      },
      {
        path: '/employee/baseSet',
        routeComponent: () => import('@/components/employee/baseSet/baseSet'),
        routeName: '基础设置',
  
        routeRedirect: '/employee/baseSet/set',
        routeHidden: false,
        routeMeta: {
          title: '员工-基础设置',
          routeHidden: false
        },   
        childrenList: [
          {
            path:'set',
            routeComponent: () => import('@/components/employee/baseSet/baseSet'),
            routeName:'设置',
            routeHidden: false,
            routeMeta: {
              title: '基础设置-设置',
              routeHidden: false
            }
          },        
          // {
          //   path:'personnelFile',
          //   routeComponent: () => import('@/components/employee/baseSet/personnelFile/personnelFile'),
          //   routeName:'人事档案地点',
      
          //   routeHidden: false,
          //   routeMeta: {
          //     title: '基础设置-人事档案地点',
          //     routeHidden: false
          //   }
          // },
          // {
          //   path:'showGroupSet',
          //   routeComponent: () => import('@/components/employee/baseSet/showGroupSet/showGroupSet'),
          //   routeName:'显示组表配置',
      
          //   routeHidden: false,
          //   routeMeta: {
          //     title: '基础设置-显示组表配置',
          //     routeHidden: false
          //   }            
          // },
          // {
          //   path:'fieldAuthority',
          //   routeComponent: () => import('@/components/employee/baseSet/fieldAuthority/fieldAuthority'),
          //   routeName:'组件字段权限',
      
          //   routeHidden: false,
          //   routeMeta: {
          //     title: '基础设置-组件字段权限',
          //     routeHidden: false
          //   }              
          // },
          // {
          //   path:'customerDIC',
          //   routeComponent: () => import('@/components/employee/baseSet/customerDIC/customerDICList'),
          //   routeName:'自定义字典表',
      
          //   routeHidden: false,
          //   routeMeta: {
          //     title: '基础设置-自定义字典表',
          //     routeHidden: false
          //   }              
          // },
          // {
          //   path:'assignmentRules',
          //   routeComponent: () => import('@/components/employee/baseSet/assignmentRules/assignmentRules'),
          //   routeName:'工号分配规则',
      
          //   routeHidden: false,
          //   routeMeta: {
          //     title: '基础设置-员工号自动分配规则',
          //     routeHidden: false
          //   }                 
          // }          
        ]      
      }  
    ]
  },
  // {
  //   path: '/organization',
  //   routeComponent: Layout,
  //   routeName: '组织',
  //   routeIcon: 'socialSecurity',
  //
  //   routeHidden: false,
  //   childrenList: [
  //     {
  //       path: 'set',
  //       routeComponent: () => import('@/components/organization/set/index'),
  //       routeName: '设置',
  //
  //       routeHidden: false,
  //       routeMeta: {
  //         title: '组织-设置',
  //         routeHidden: false
  //       }        
  //     },
  //     {
  //       path: 'org',
  //       routeComponent: () => import('@/components/organization/org/index'),
  //       routeName: '组织',
  //
  //       routeHidden: false,
  //       routeMeta: {
  //         title: '组织-组织',
  //         routeHidden: false
  //       }        
  //     },
  //     {
  //       path: 'rankSystem',
  //       routeComponent: () => import('@/components/organization/rankSystem/index'),
  //       routeName: '职级体系',
  //
  //       routeHidden: false,
  //       routeMeta: {
  //         title: '组织-职级体系',
  //         routeHidden: false
  //       }        
  //     },
  //     {
  //       path: 'duty',
  //       routeComponent: () => import('@/components/organization/duty/index'),
  //       routeName: '职务',
  //
  //       routeHidden: false,
  //       routeMeta: {
  //         title: '组织-职务',
  //         routeHidden: false
  //       }        
  //     },
  //     {
  //       path: 'position',
  //       routeComponent: () => import('@/components/organization/position/index'),
  //       routeName: '职位',
  //
  //       routeHidden: false,
  //       routeMeta: {
  //         title: '组织-职位',
  //         routeHidden: false
  //       }        
  //     }                       
  //   ]
  // },
  {
    path: '/socialSecurity',
    routeRedirect: '/socialSecurity/index',
    routeComponent: Layout,
    routeName: '社保',
    routeIcon: 'socialSecuri',
    routeHidden: false,
    childrenList: [
      {
        path: '/socialSecurity/index',
        routeComponent: () => import('@/components/socialSecurity/homeIndex/index'),
        routeName: '社保-首页',
        routeHidden: false,
        routeMeta: {
          title: '社保-首页',
          routeHidden: false
        }
      },
      {
        path: 'socialThisMonth',
        routeComponent: () => import('@/components/socialSecurity/index/thisMonth/thisMonth'),
        routeName: '本月变动',
        routeHidden: false,
        routeMeta: {
          title: '社保-本月变动',
          routeHidden: false
        }
      },
      {
        path: 'monthlyReport',
        routeComponent: () => import('@/components/socialSecurity/index/monthlyReport/monthlyReport'),
        routeName: '月报',
        routeHidden: false,
        routeMeta: {
          title: '社保-月报',
          routeHidden: false
        }
      },
      {
        path: 'payBack',
        routeComponent: () => import('@/components/socialSecurity/index/payBack/payBack'),
        routeName: '补缴',
        routeHidden: false,
        routeMeta: {
          title: '社保-补缴',
          routeHidden: false
        }
      },
      {
        path: 'insuranceTable',
        routeComponent: () => import('@/components/socialSecurity/index/insuranceTable/insuranceTable'),
        routeName: '参保报表',
        routeHidden: false,
        routeMeta: {
          title: '社保-参保报表',
          routeHidden: false
        }
      },
      {
        path: 'insuranceConfig',
        routeComponent: () => import('@/components/socialSecurity/index/insuranceConfig/insuranceConfig'),
        routeName: '参保配置',
        routeHidden: false,
        routeMeta: {
          title: '社保-参保配置',
          routeHidden: false
        }
      }
    ]
  },
  {
    path: '/salary',
    routeRedirect: '/salary/salaryRule',
    routeComponent: Layout,
    routeName: '薪资',
    routeIcon: 'salary',
    routeHidden: false,
    childrenList: [
      {
        path: 'salaryRule',
        routeComponent: () => import('@/components/salary/salaryRule/index'),
        routeName: '薪资规则',
        routeHidden: false,
        routeMeta: {
          title: '薪资-薪资规则',
          routeHidden: false
        },
        childrenList: [
          {
            path: 'addProject',
            routeComponent: () => import('@/components/salary/salaryRule/addProject'),
            routeName: '新增方案',
            routeHidden: false,
            routeMeta: {
              title: '薪资-新增方案',
              routeHidden: false
            }
          },
          {
            path: 'editorProject',
            routeComponent: () => import('@/components/salary/salaryRule/addProject'),
            routeName: '编辑方案',
            routeHidden: false,
            routeMeta: {
              title: '薪资-编辑方案',
              routeHidden: true
            }
          }
        ]
      },
      {
        path: 'salaryProject',
        routeComponent: () => import('@/components/salary/salaryProject/index'),
        routeName: '薪资项目',
        routeHidden: false,
        routeMeta: {
          title: '薪资-薪资项目',
          routeHidden: false
        },
        childrenList: [
          {
            path: 'salaryArchiveInfo',
            routeComponent: () => import('@/components/salary/salaryProject/salaryArchiveInfo'),
            routeName: '薪资项目-个人信息',
            routeHidden: true,
            routeMeta: {
              title: '薪资-薪资项目-个人信息',
              routeHidden: true
            }
          }
        ]
      },
      {
        path: 'salaryScheme',
        routeComponent: () => import('@/components/salary/salaryScheme/index'),
        routeName: '薪资档案',
        routeHidden: false,
        routeMeta: {
          title: '薪资-薪资档案',
          routeHidden: false
        }
      },
      {
        path: 'salaryUpdate',
        routeComponent: () => import('@/components/salary/salaryUpdate/index'),
        routeName: '定薪调薪',
        routeHidden: false,
        routeMeta: {
          title: '薪资-定薪调薪',
          routeHidden: false
        }
      },
      {
        path: 'salaryMonthReport',
        routeComponent: () => import('@/components/salary/salaryMonthReport/index'),
        routeName: '薪资月报',
        routeHidden: false,
        routeMeta: {
          title: '薪资-薪资月报',
          routeHidden: false
        }
      },
      {
        path: 'salaryCommonMonth',
        routeComponent: () => import('@/components/salary/salaryCommonMonth/index'),
        routeName: '普通月发薪',
        routeHidden: false,
        routeMeta: {
          title: '薪资-普通月发薪',
          routeHidden: false
        },
        childrenList: [
          {
            path: 'salaryCMPInfo',
            routeComponent: () => import('@/components/salary/salaryCommonMonth/salaryCMPInfo.vue'),
            routeName: '普通月发薪-个人信息',
            routeHidden: true,
            routeMeta: {
              title: '薪资-普通月发薪-个人信息',
              routeHidden: true
            }
          }
        ]
      },
      {
        path: 'salarySpecial',
        routeComponent: () => import('@/components/salary/salarySpecial/index'),
        routeName: '特殊发薪',
        routeHidden: false,
        routeMeta: {
          title: '薪资-特殊发薪',
          routeHidden: false
        }
      },
      {
        path: 'salaryContrastTable',
        routeComponent: () => import('@/components/salary/salaryContrastTable/index'),
        routeName: '薪酬对比分析表',
        routeHidden: false,
        routeMeta: {
          title: '薪资-薪酬对比分析表',
          routeHidden: false
        }
      },
      {
        path: 'salaryApproval',
        routeComponent: () => import('@/components/salary/salaryApproval/index'),
        routeName: '薪资审批',
        routeHidden: false,
        routeMeta: {
          title: '薪资-薪资审批',
          routeHidden: false
        }
      },
      {
        path: 'salaryProvision',
        routeComponent: () => import('@/components/salary/salaryProvision/index'),
        routeName: '薪资计提',
        routeHidden: false,
        routeMeta: {
          title: '薪资-薪资计提',
          routeHidden: false
        }
      },
      {
        path: 'salaryBillSet',
        routeComponent: () => import('@/components/salary/salaryBillSet/index'),
        routeName: '工资条设定',
        routeHidden: false,
        routeMeta: {
          title: '薪资-工资条设定',
          routeHidden: false
        }
      },
      {
        path: 'salaryAmerceSet',
        routeComponent: () => import('@/components/salary/salaryAmerceSet/index'),
        routeName: '惩奖设定',
        routeHidden: false,
        routeMeta: {
          title: '薪资-惩奖设定',
          routeHidden: false
        }
      },
      {
        path: 'leaveSet',
        routeComponent: () => import('@/components/salary/leaveSet/index'),
        routeName: '请假款项',
        routeHidden: false,
        routeMeta: {
          title: '薪资-请假款项',
          routeHidden: false
        }
      },
      {
        path: 'overtimeSet',
        routeComponent: () => import('@/components/salary/overtimeSet/index'),
        routeName: '加班款项',
        routeHidden: false,
        routeMeta: {
          title: '薪资-加班款项',
          routeHidden: false
        }
      }
    ]
  },
  {
    path: '/attendance',
    routeRedirect: '/attendance/baseConfig',
    routeComponent: Layout,
    routeName: '考勤',
    routeIcon: 'salary',
    routeHidden: false,
    childrenList: [
      {
        path: '/attendance/baseConfig',
        routeComponent: () => import('@/components/attendance/base-config/index'),
        routeName: '基础配置',
        routeHidden: false,
        childrenList: [
          {
            path: 'daySet',
            routeComponent: () => import('@/components/attendance/base-config/day-set/index'),
            routeName: '班次设置',
            routeHidden: false,
            routeMeta: {
              title: '考勤-班次设置',
              routeHidden: false
            },
            childrenList: [
              {
                path: 'addDay',
                routeComponent: () => import('@/components/attendance/base-config/day-set/detail'),
                routeName: '新增班次',
                routeHidden: false,
                routeMeta: {
                  title: '考勤-新增班次',
                  routeHidden: false
                }
              },
              {
                path: 'editDay',
                routeComponent: () => import('@/components/attendance/base-config/day-set/detail'),
                routeName: '编辑班次',
                routeHidden: false,
                routeMeta: {
                  title: '考勤-编辑班次',
                  routeHidden: true
                }
              }
            ]
          },
          {
            path: 'attendanceTeam',
            routeComponent: () => import('@/components/attendance/base-config/attendance-team/index'),
            routeName: '考勤组',
            routeHidden: false,
            routeMeta: {
              title: '考勤-考勤组',
              routeHidden: false
            },
            childrenList: [
              {
                path: 'addAttendanceTeam',
                routeComponent: () => import('@/components/attendance/base-config/attendance-team/detail'),
                routeName: '新增考勤组',
                routeHidden: false,
                routeMeta: {
                  title: '考勤-新增考勤组',
                  routeHidden: false
                }
              },
              {
                path: 'editAttendanceTeam',
                routeComponent: () => import('@/components/attendance/base-config/attendance-team/detail'),
                routeName: '新增考勤组',
                routeHidden: false,
                routeMeta: {
                  title: '考勤-编辑考勤组',
                  routeHidden: true
                }
              }
            ]
          },
          {
            path: 'attendanceRule',
            routeComponent: () => import('@/components/attendance/base-config/attendance-rule/index'),
            routeName: '出勤规则',
            routeHidden: false,
            routeMeta: {
              title: '考勤-出勤规则',
              routeHidden: false
            },
            childrenList: [
              {
                path: 'overtimeRule',
                routeComponent: () => import('@/components/attendance/base-config/attendance-rule/overtime-rule-list'),
                routeName: '加班规则',
                routeHidden: false,
                routeMeta: {
                  title: '加班规则',
                  routeHidden: false
                },
                childrenList: [
                  {
                    path: 'addOvertimeRule',
                    routeComponent: () => import('@/components/attendance/base-config/attendance-rule/overtime-rule-detail'),
                    routeName: '新增加班规则',
                    routeHidden: false,
                    routeMeta: {
                      title: '新增加班规则',
                      routeHidden: false
                    }
                  },
                  {
                    path: 'editOvertimeRule',
                    routeComponent: () => import('@/components/attendance/base-config/attendance-rule/overtime-rule-detail'),
                    routeName: '编辑加班规则',
                    routeHidden: false,
                    routeMeta: {
                      title: '编辑加班规则',
                      routeHidden: false
                    }
                  }
                ]
              },
              {
                path: 'offdayRule',
                routeComponent: () => import('@/components/attendance/base-config/attendance-rule/offday-rule-list'),
                routeName: '调休规则',
                routeHidden: true,
                routeMeta: {
                  title: '调休规则',
                  routeHidden: true
                },
                childrenList: [
                  {
                    path: 'addOffdayRule',
                    routeComponent: () => import('@/components/attendance/base-config/attendance-rule/offday-rule-detail'),
                    routeName: '新增调休规则',
                    routeHidden: true,
                    routeMeta: {
                      title: '新增调休规则',
                      routeHidden: true
                    }
                  },
                  {
                    path: 'editOffdayRule',
                    routeComponent: () => import('@/components/attendance/base-config/attendance-rule/offday-rule-detail'),
                    routeName: '编辑调休规则',
                    routeHidden: true,
                    routeMeta: {
                      title: '编辑调休规则',
                      routeHidden: true
                    }
                  }
                ]
              },
              {
                path: 'businessRule',
                routeComponent: () => import('@/components/attendance/base-config/attendance-rule/business-rule-list'),
                routeName: '出差规则',
                routeHidden: true,
                routeMeta: {
                  title: '出差规则',
                  routeHidden: true
                },
                childrenList: [
                  {
                    path: 'addBusinessRule',
                    routeComponent: () => import('@/components/attendance/base-config/attendance-rule/business-rule-detail'),
                    routeName: '新增出差规则',
                    routeHidden: true,
                    routeMeta: {
                      title: '新增出差规则',
                      routeHidden: true
                    }
                  },
                  {
                    path: 'editBusinessRule',
                    routeComponent: () => import('@/components/attendance/base-config/attendance-rule/business-rule-detail'),
                    routeName: '编辑出差规则',
                    routeHidden: true,
                    routeMeta: {
                      title: '编辑出差规则',
                      routeHidden: true
                    }
                  }
                ]
              },
              {
                path: 'publicRule',
                routeComponent: () => import('@/components/attendance/base-config/attendance-rule/public-rule-list'),
                routeName: '公出规则',
                routeHidden: true,
                routeMeta: {
                  title: '公出规则',
                  routeHidden: true
                },
                childrenList: [
                  {
                    path: 'addPublicRule',
                    routeComponent: () => import('@/components/attendance/base-config/attendance-rule/public-rule-detail'),
                    routeName: '新增公出规则',
                    routeHidden: true,
                    routeMeta: {
                      title: '新增公出规则',
                      routeHidden: true
                    }
                  },
                  {
                    path: 'editPublicRule',
                    routeComponent: () => import('@/components/attendance/base-config/attendance-rule/public-rule-detail'),
                    routeName: '编辑公出规则',
                    routeHidden: true,
                    routeMeta: {
                      title: '编辑公出规则',
                      routeHidden: true
                    }
                  }
                ]
              },
              {
                path: 'supplementRule',
                routeComponent: () => import('@/components/attendance/base-config/attendance-rule/supplement-rule-list'),
                routeName: '补签规则',
                routeHidden: true,
                routeMeta: {
                  title: '补签规则',
                  routeHidden: true
                },
                childrenList: [
                  {
                    path: 'addSupplementRule',
                    routeComponent: () => import('@/components/attendance/base-config/attendance-rule/supplement-rule-detail'),
                    routeName: '新增补签规则',
                    routeHidden: true,
                    routeMeta: {
                      title: '新增补签规则',
                      routeHidden: true
                    }
                  },
                  {
                    path: 'editSupplementRule',
                    routeComponent: () => import('@/components/attendance/base-config/attendance-rule/supplement-rule-detail'),
                    routeName: '编辑补签规则',
                    routeHidden: true,
                    routeMeta: {
                      title: '编辑补签规则',
                      routeHidden: true
                    }
                  }
                ]
              },
              {
                path: 'appealRule',
                routeComponent: () => import('@/components/attendance/base-config/attendance-rule/appeal-rule-list'),
                routeName: '申述规则',
  
                routeHidden: true,
                routeMeta: {
                  title: '申述规则',
                  routeHidden: true
                },
                childrenList: [
                  {
                    path: 'addAppealRule',
                    routeComponent: () => import('@/components/attendance/base-config/attendance-rule/appeal-rule-detail'),
                    routeName: '新增申述规则',
                    routeHidden: true,
                    routeMeta: {
                      title: '新增申述规则',
                      routeHidden: true
                    }
                  },
                  {
                    path: 'editAppealRule',
                    routeComponent: () => import('@/components/attendance/base-config/attendance-rule/appeal-rule-detail'),
                    routeName: '编辑申述规则',
      
                    routeHidden: true,
                    routeMeta: {
                      title: '编辑申述规则',
                      routeHidden: true
                    }
                  }
                ]
              },
              {
                path: 'leaveRule',
                routeComponent: () => import('@/components/attendance/base-config/attendance-rule/leave-rule-list'),
                routeName: '请假规则',
                routeHidden: true,
                routeMeta: {
                  title: '请假规则',
                  routeHidden: true
                },
                childrenList: [
                  {
                    path: 'addLeaveRule',
                    routeComponent: () => import('@/components/attendance/base-config/attendance-rule/leave-rule-detail'),
                    routeName: '新增请假规则',
      
                    routeHidden: true,
                    routeMeta: {
                      title: '新增请假规则',
                      routeHidden: true
                    }
                  },
                  {
                    path: 'editLeaveRule',
                    routeComponent: () => import('@/components/attendance/base-config/attendance-rule/leave-rule-detail'),
                    routeName: '编辑请假规则',
      
                    routeHidden: true,
                    routeMeta: {
                      title: '编辑请假规则',
                      routeHidden: true
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: '/attendance/handleService',
        routeRedirect: '/attendance/baseConfig/daySet',
        routeComponent: () => import('@/components/attendance/handle-service/index'),
        routeName: '业务处理',
  
        routeHidden: false,
        childrenList: [
          {
            path: 'attendanceArchives',
            routeComponent: () => import('@/components/attendance/handle-service/attendance-archives/index'),
            routeName: '考勤档案',
            routeHidden: false,
            routeMeta: {
              title: '考勤-考勤档案',
              routeHidden: false
            }
          },
          {
            path: 'attendanceTeam',
            routeComponent: () => import('@/components/attendance/handle-service/scheduling/index'),
            routeName: '排班表',
            routeHidden: false,
            routeMeta: {
              title: '考勤-排班表',
              routeHidden: false
            },
            childrenList: [
              {
                path: 'schedulingCount',
                routeComponent: () => import('@/components/attendance/handle-service/scheduling/scheduling-count'),
                routeName: '排班统计',
  
                routeHidden: false,
                routeMeta: {
                  title: '考勤-排班统计',
                  routeHidden: false
                }
              },
              {
                path: 'schedulingBatch',
                routeComponent: () => import('@/components/attendance/handle-service/scheduling/scheduling-batch'),
                routeName: '批量排班',
  
                routeHidden: false,
                routeMeta: {
                  title: '考勤-批量排班',
                  routeHidden: true
                }
              },
              {
                path: 'schedulingHighBatch',
                routeComponent: () => import('@/components/attendance/handle-service/scheduling/scheduling-high-batch'),
                routeName: '高级批量排班',
  
                routeHidden: false,
                routeMeta: {
                  title: '考勤-高级批量排班',
                  routeHidden: true
                }
              },
              {
                path: 'schedulingImport',
                routeComponent: () => import('@/components/attendance/handle-service/scheduling/scheduling-import'),
                routeName: '导入排班',
  
                routeHidden: false,
                routeMeta: {
                  title: '考勤-导入排班',
                  routeHidden: true
                }
              }
            ]
          }
        ]
      },
      {
        path: '/attendance/handleData',
        routeRedirect: '/attendance/handleData/clockRecord',
        routeComponent: () => import('@/components/attendance/handle-data/index'),
        routeName: '数据处理',
  
        routeHidden: false,
        childrenList: [
          {
            path: 'clockRecord',
            routeComponent: () => import('@/components/attendance/handle-data/clock-record/index'),
            routeName: '打卡记录',
            routeHidden: false,
            routeMeta: {
              title: '考勤-打卡记录',
              routeHidden: false
            }
          },
          {
            path: 'supplementRecord',
            routeComponent: () => import('@/components/attendance/handle-data/supplement-record/index'),
            routeName: '补签单据',
            routeHidden: false,
            routeMeta: {
              title: '考勤-补签单据',
              routeHidden: false
            }
          },
          {
            path: 'attendanceAppeal',
            routeComponent: () => import('@/components/attendance/handle-data/attendance-appeal/index'),
            routeName: '考勤申诉',
            routeHidden: false,
            routeMeta: {
              title: '考勤-考勤申诉',
              routeHidden: false
            }
          },
          {
            path: 'timeReceipt',
            routeComponent: () => import('@/components/attendance/handle-data/time-receipt/index'),
            routeName: '时间单据',
            routeHidden: false,
            routeMeta: {
              title: '考勤-时间单据',
              routeHidden: false
            }
          },
          {
            path: 'overtimeReceipt',
            routeComponent: () => import('@/components/attendance/handle-data/overtime-receipt/index'),
            routeName: '加班单据',
            routeHidden: false,
            routeMeta: {
              title: '考勤-加班单据',
              routeHidden: false
            }
          }
        ]
      },
      {
        path: '/attendance/attendanceReport',
        routeRedirect: '/attendance/attendanceReport/attendanceDayReport',
        routeComponent: () => import('@/components/attendance/attendance-report/index'),
        routeName: '考勤报告',
        routeHidden: false,
        childrenList: [
          {
            path: 'attendanceDayReport',
            routeComponent: () => import('@/components/attendance/attendance-report/attendance-day-report/index'),
            routeName: '考勤日报',
            routeHidden: false,
            routeMeta: {
              title: '考勤-考勤日报',
              routeHidden: false
            }
          },
          {
            path: 'attendanceMonthReport',
            routeComponent: () => import('@/components/attendance/attendance-report/attendance-month-report/index'),
            routeName: '考勤月报',
            routeHidden: false,
            routeMeta: {
              title: '考勤-考勤月报',
              routeHidden: false
            }
          },
          {
            path: 'overtimeCount',
            routeComponent: () => import('@/components/attendance/attendance-report/overtime-count/index'),
            routeName: '加班统计',
            routeHidden: false,
            routeMeta: {
              title: '考勤-加班统计',
              routeHidden: false
            }
          },
          {
            path: 'workingHoursMonthReport',
            routeComponent: () => import('@/components/attendance/attendance-report/working-hours-month-report/index'),
            routeName: '工时月报',
            routeHidden: false,
            routeMeta: {
              title: '考勤-工时月报',
              routeHidden: false
            }
          }
        ]
      }
    ]
  },
  {
    path: '/platform',
    routeRedirect: '/platform/index',
    routeComponent: Layout,
    routeName: '平台',
    routeIcon: 'platform',
    routeHidden: false,
    childrenList: [
      {
        path: 'index',
        routeComponent: () => import('@/components/platform/socialManage/joinType/joinType'),
        routeName: '参保类型',
        routeHidden: false,
        routeMeta: {
          title: '平台-参保类型',
          routeHidden: false
        }
      },
      {
        path: 'platformThisMonth',
        routeComponent: () => import('@/components/platform/socialManage/thisMonth/thisMonth'),
        routeName: '本月变动',
        routeHidden: false,
        routeMeta: {
          title: '平台-本月变动',
          routeHidden: false
        }
      },
      {
        path: '/platform/approvalFlow',       // 审批流 一级菜单
        routeRedirect: '/platform/approvalFlow/flowInfo', // 重定向到 二级菜单审批流路由
        routeComponent: () => import('@/components/platform/approval-flow/index'),
        routeName: '审批流',
        routeHidden: false,
        childrenList: [
          {
            path: 'tableManage',
            routeComponent: () => import('@/components/platform/approval-flow/table-manage/table-manage'),
            routeName: '表单管理',
            routeHidden: false,
            routeMeta: {
              title: '表单管理',
              routeHidden: false
            },
            childrenList: [
              {
                path: 'showTable',   // 点击 查看按钮  查看表单信息
                routeComponent: () => import('@/components/platform/approval-flow/table-manage/table-show'),
                routeName: '表单信息',
                routeHidden: true,
                routeMeta: {
                  title: '表单信息',
                  routeHidden: false
                }
              },
              {
                path: 'tableEdit', // 点击 编辑 按钮，进入表单的编辑界面
                routeComponent: () => import('@/components/platform/approval-flow/table-manage/table-edit'),
                routeName: '表单编辑',
                routeHidden: true,
                routeMeta: {
                  title: '表单编辑',
                  routeHidden: true
                }
              }
            ]
          },
          {
            path: 'flowInfo',   // 审批流—— 审批流信息 菜单
            routeComponent: () => import('@/components/platform/approval-flow/flow-info/flow-info'),
            routeName: '审批流信息',
            routeHidden: false,
            routeMeta: {
              title: '审批流信息',
              routeHidden: false
            }
          },
          {
            path: 'flowRule',  // 审批流——审批规则二级菜单路由
            routeComponent: () => import('@/components/platform/approval-flow/flow-rule/flow-rule'),
            routeName: '审批规则',
            routeHidden: false,
            routeMeta: {
              title: '审批规则',
              routeHidden: false
            },
            childrenList: [
              {
                path: 'flowConfig',  //  查看/新增/编辑 流程时 的流程配置页面  
                routeComponent: () => import('@/components/platform/approval-flow/flow-config/index'),
                routeRedirect: '/platform/approvalFlow/flowRule/flowConfig/processSet',  // 查看、新增和编辑时，重定向到了 processSet子路由页面
                routeName: '审批流配置',
                routeHidden: true,
                routeMeta: {
                  title: '审批流配置',
                  routeHidden: true
                },
                childrenList: [
                  {
                    path: 'processSet',   // 流程设置路由页面
                    routeComponent: () => import('@/components/platform/approval-flow/flow-config/process-set/process-set'),
                    routeName: '流程设置',
                    routeHidden: true,
                    routeMeta: {
                      title: '流程设置',
                      routeHidden: true
                    }
                  },
                  {
                    path: 'relationTable',  // 流程表单页面
                    routeComponent: () => import('@/components/platform/approval-flow/flow-config/relation-table/relation-table'),
                    routeName: '流程表单',
                    routeHidden: true,
                    routeMeta: {
                      title: '流程表单',
                      routeHidden: true
                    }
                  },
                  {
                    path: 'processDesign',  // 流程设计页面
                    routeComponent: () => import('@/components/platform/approval-flow/flow-config/process-design/process-design'),
                    routeName: '流程设计',
                    routeHidden: true,
                    routeMeta: {
                      title: '流程设计',
                      routeHidden: true
                    }
                  },
                  {
                    path: 'fieldSet',   // 节点设置页面
                    routeComponent: () => import('@/components/platform/approval-flow/flow-config/field-set/field-set'),
                    routeName: '节点设置',
                    routeHidden: true,
                    routeMeta: {
                      title: '节点设置',
                      routeHidden: true
                    }
                  }
                ]
              }
            ]
          },
          {
            path: 'launch',  // 审批流——发起 二级菜单路由
            routeComponent: () => import('@/components/platform/approval-flow/launch/launch'),
            routeName: '发起',
            routeHidden: false,
            routeMeta: {
              title: '平台-发起',
              routeHidden: false
            }
          },
          {
            path: 'todo',   // 审批流—— 待办  二级菜单路由
            routeComponent: () => import('@/components/platform/approval-flow/todo/todo'),
            routeName: '待办',
            routeHidden: false,
            routeMeta: {
              title: '平台-待办',
              routeHidden: false
            }
          },
          {
            path: 'onTheWay',  // 审批流——在途 二级菜单路由
            routeComponent: () => import('@/components/platform/approval-flow/on-the-way/on-the-way'),
            routeName: '在途',
            routeHidden: false,
            routeMeta: {
              title: '平台-在途',
              routeHidden: false
            }
          },
          {
            path: 'myStart',   // 审批流——我发起的 二级路由页面
            routeComponent: () => import('@/components/platform/approval-flow/my-start/my-start'),
            routeName: '我发起的',
            routeHidden: false,
            routeMeta: {
              title: '平台-我发起的',
              routeHidden: false
            }
          },
          {
            path: 'myApproval',   // 审批流 —— 我审批的  二级路由页面
            routeComponent: () => import('@/components/platform/approval-flow/my-approval/my-approval'),
            routeName: '我处理的',
            routeHidden: false,
            routeMeta: {
              title: '平台-我处理的',
              routeHidden: false
            }
          },
          {
            path: 'copyWithMe',   // 审批流—— 抄送我的 二级路由页面
            routeComponent: () => import('@/components/platform/approval-flow/copy-with-me/copy-with-me'),
            routeName: '抄送我的',
            routeHidden: false,
            routeMeta: {
              title: '平台-抄送我的',
              routeHidden: false
            }
          },
          {
            path: 'myFollow',    // 审批流——我关注的  二级路由页面
            routeComponent: () => import('@/components/platform/approval-flow/my-follow/my-follow'),
            routeName: '我关注的',
            routeHidden: false,
            routeMeta: {
              title: '平台-我关注的',
              routeHidden: false
            }
          },
          {
            path: 'set',  // 审批流——设置   二级路由页面
            routeComponent: () => import('@/components/platform/approval-flow/set/set'),
            routeName: "设置",
            routeHidden: false,
            routeMeta: {
              title: "设置",
              routeHidden: false
            }
          }
        ]
      }
    ]
  },
  {
    path: '/notice',    //  通知公告 一级菜单路由 页面
    routeRedirect: '/notice/index',
    routeComponent: Layout,
    routeName: '公告',
    routeIcon: 'notice',
    routeHidden: false,
    childrenList: [
      {
        path: 'index',
        routeComponent: () => import('@/components/notice/front/index'),
        routeName: '公告首页',
        routeHidden: false,
        routeMeta: {
          title: '公告管理',
          routeHidden: false
        },
        childrenList: [
          {
            path: 'noticeDetailFront',
            routeComponent: () => import('@/components/notice/front/noticeDetailFront'),
            routeName: '员工公告详情',
            routeHidden: false,
            routeMeta: {
              title: '公告管理-员工公告详情',
              routeHidden: true
            }
          }
        ]
      },
      {
        path: 'noticeManage',
        routeComponent: () => import('@/components/notice/end/index'),
        routeName: '公告管理',
        routeHidden: false,
        routeMeta: {
          title: '公告管理'
        },
        childrenList: [
          {
            path: 'createNotice',
            routeComponent: () => import('@/components/notice/end/createNotice'),
            routeName: '新建公告',
            routeHidden: false,
            routeMeta: {
              title: '公告管理-新建公告',
              routeHidden: false
            }
          },
          {
            path: 'noticeDetailEnd',
            routeComponent: () => import('@/components/notice/end/noticeDetailEnd'),
            routeName: '公告详情',
            routeHidden: false,
            routeMeta: {
              title: '公告管理-公告详情',
              routeHidden: true
            }
          },
          {
            path: 'modifyNotice',
            routeComponent: () => import('@/components/notice/end/modifyNotice'),
            routeName: '编辑公告',
            routeHidden: false,
            routeMeta: {
              title: '公告管理-编辑公告',
              routeHidden: true
            }
          },
          {
            path: 'feedback',
            routeComponent: () => import('@/components/notice/end/feedback'),
            routeName: '公告反馈',
            routeHidden: false,
            routeMeta: {
              title: '公告管理-公告反馈',
              routeHidden: true
            }
          },
          {
            path: 'historyNotice',
            routeComponent: () => import('@/components/notice/end/historyNotice'),
            routeName: '公告历史',
            routeHidden: false,
            routeMeta: {
              title: '公告管理-公告历史',
              routeHidden: true
            }
          }
        ]
      },
      {
        path: 'receipt',
        routeComponent: () => import('@/components/notice/end/receipt'),
        routeName: '公告回执',
        routeHidden: false,
        routeMeta: {
          title: '公告回执',
          routeHidden: false
        }
      }
    ]
  },
  {
    path: '/manage',
    // routeRedirect: '/manage/companyInfo',
    routeComponent: Layout,
    routeName: '管理',
    routeIcon: 'manage',
    routeHidden: false,
    childrenList: [
      // 系统
      // {
      //   path: '/manage/platformSystemSetting',
      //   routeComponent: () => import('@/components/manage/userManage/userManage'),
      //   routeName: '平台系统设置',
      //   routeHidden: false,
      //   routeMeta: {
      //     title: '管理-平台系统设置',
      //     routeHidden: false     
      //   },
      //   childrenList: [
      //     {
      //       path: '/manage/platformSystemSetting/systemSetting',
      //       // routeRedirect: '/manage/platformSystemSetting/systemSetting/menuManage', // 重定向到 二级菜单 平台系统设置
      //       routeComponent: () => import('@/components/manage/userManage/systemSetting/systemSetting'),
      //       routeName: '系统配置',
      //       routeHidden: false,
      //       routeMeta: {
      //         title: '平台系统设置-系统配置',
      //         routeHidden: false
      //       },
      //       childrenList: [
      //         {
      //           path: 'menuManage',
      //           routeComponent: () => import('@/components/manage/userManage/systemSetting/menuManage/menuManage'),
      //           routeName: '菜单管理',
      //           routeHidden: false,
      //           routeMeta: {
      //             title: '系统配置-菜单管理',
      //             routeHidden: false
      //           }
      //         },
      //         {
      //           path: 'pageManage',
      //           routeComponent: () => import('@/components/manage/userManage/systemSetting/pageManage/pageManage'),
      //           routeName: '页面管理',
      //           routeHidden: false,
      //           routeMeta: {
      //             title: '系统配置-页面管理',
      //             routeHidden: false
      //           }                
      //         },
      //         {
      //           path: 'componentsManage',
      //           routeComponent: () => import('@/components/manage/userManage/systemSetting/componentsManage/componentsManage'),
      //           routeName: '组件管理',
      //           routeHidden: false,
      //           routeMeta: {
      //             title: '系统配置-组件管理',
      //             routeHidden: false
      //           }                
      //         },  
      //         {
      //           path: 'pageComManage',
      //           routeComponent: () => import('@/components/manage/userManage/systemSetting/pageComponents/pageComManage'),
      //           routeName: '页面组件管理',
      //           routeHidden: false,
      //           routeMeta: {
      //             title: '系统配置-页面组件管理',
      //             routeHidden: false
      //           }                
      //         },                           
      //       ]
      //     },
      //     {
      //       path: '/manage/platformSystemSetting/userRole',
      //       routeComponent: () => import('@/components/manage/userManage/userRole/userRole'),
      //       routeName: '用户角色',
      //       routeHidden: false,
      //       routeMeta: {
      //         title: '平台系统设置-用户角色',
      //         routeHidden: false    
      //       },
      //       childrenList: [
      //         {
      //           path: 'account',
      //           routeComponent: () => import('@/components/manage/userManage/userRole/account/account'),
      //           routeName: '账户',
      //           routeHidden: false,
      //           routeMeta: {
      //             title: '用户角色-账户',
      //             routeHidden: false
      //           }                
      //         },
      //         {
      //           path: 'sysManager',
      //           routeComponent: () => import('@/components/manage/userManage/userRole/sysManager/sysManager'),
      //           routeName: '企业系统管理员',
      //           routeHidden: false,
      //           routeMeta: {
      //             title: '用户角色-系统管理员',
      //             routeHidden: false
      //           }
      //         },
      //         {
      //           path: 'userGroup',
      //           routeComponent: () => import('@/components/manage/userManage/userRole/userGroup/userGroup'), 
      //           routeName: '用户组',
      //           routeHidden: false,
      //           routeMeta: {
      //             title: '用户角色-用户组',
      //             routeHidden: false   
      //           }             
      //         },
      //         {
      //           path: 'roleGroup',
      //           routeComponent: () => import('@/components/manage/userManage/userRole/roleGroup/roleGroup'),
      //           routeName: '角色组',
      //           routeHidden: false,
      //           routeMeta: {
      //             title: '用户角色-角色组',
      //             routeHidden: false 
      //           }               
      //         },
      //         {
      //           path: 'authorityList',
      //           routeComponent: () => import('@/components/manage/userManage/userRole/authorityList/commonAuthorityList'),
      //           routeName: '权限引用列表',
      //           routeHidden: false,
      //           routeMeta: {
      //             title: '用户角色-权限引用列表',
      //             routeHidden: false    
      //           }            
      //         },
      //         {
      //           path: 'userManage',
      //           routeComponent: () => import('@/components/manage/userManage/userRole/userManage/commonUserManage'),
      //           routeName: '用户管理',
      //           routeHidden: false,
      //           routeMeta: {
      //             title: '用户角色-用户管理',
      //             routeHidden: false 
      //           }               
      //         },
      //         {
      //           path: 'roleManage',
      //           routeComponent: () => import('@/components/manage/userManage/userRole/roleManage/commonRoleManage'),
      //           routeName: '角色管理',
      //           routeHidden: false,
      //           routeMeta: {
      //             title: '用户角色-角色管理',
      //             routeHidden: false 
      //           }               
      //         }
      //       ]  
      //     },
      //     {
      //       path: '/manage/platformSystemSetting/licensingRights',
      //       routeComponent: () => import('@/components/manage/userManage/licensingRights/licensingRights'),
      //       routeRedirect: '/manage/platformSystemSetting/licensingRights/permit',
      //       routeName: '许可权',
      //       routeHidden: false,
      //       routeMeta: {
      //         title: '平台系统设置-许可权',
      //         routeHidden: false
      //       },
      //       childrenList: [
      //         {
      //           path: 'permit',
      //           routeComponent: () => import('@/components/manage/userManage/licensingRights/permit/common-permit'),
      //           routeName: '许可权',
      //           routeHidden: false,
      //           routeMeta: {
      //             title: '许可权-许可权',
      //             routeHidden: false
      //           }                
      //         }
      //       ]
      //     },
      //     {
      //       path: '/manage/platformSystemSetting/versionPackage',
      //       routeComponent: () => import('@/components/manage/userManage/versionPackage/versionPackage'),
      //       routeName: '版本套包',
      //       routeHidden: false,
      //       routeMeta: {
      //         title: '平台系统设置-版本套包',
      //         routeHidden: false
      //       },
      //       childrenList: [
      //         {
      //           path: 'setting',
      //           routeComponent: () => import('@/components/manage/userManage/versionPackage/setting/setting'),
      //           routeName: '设置',
      //           routeHidden: false,
      //           routeMeta: {
      //             title: '版本套包-设置',
      //             routeHidden: false
      //           } 
      //         },
      //         {
      //           path: 'buyDiscount',
      //           routeComponent: () => import('@/components/manage/userManage/versionPackage/buyDiscount/buyDiscount'),
      //           routeName: '统一购买折扣',
      //           routeHidden: false,
      //           routeMeta: {
      //             title: '版本套包-统一购买折扣',
      //             routeHidden: false
      //           }                 
      //         },
      //         {
      //           path: 'version',
      //           routeComponent: () => import('@/components/manage/userManage/versionPackage/version/version'),
      //           routeName: '版本',
      //           routeHidden: false,
      //           routeMeta: {
      //             title: '版本套包-版本',
      //             routeHidden: false
      //           }                 
      //         },
      //         {
      //           path: 'package',
      //           routeComponent: () => import('@/components/manage/userManage/versionPackage/package/package'),
      //           routeName: '套包',
      //           routeHidden: false,
      //           routeMeta: {
      //             title: '版本套包-套包',
      //             routeHidden: false
      //           }                 
      //         },
      //         {
      //           path: 'customerVersion',
      //           routeComponent: () => import('@/components/manage/userManage/versionPackage/customerVersion/customerVersion'),
      //           routeName: '客户版本',
      //           routeHidden: false,
      //           routeMeta: {
      //             title: '版本套包-客户版本',
      //             routeHidden: false
      //           }              
      //         }
      //       ]
      //     },
      //     {
      //       path: 'companyInfo',
      //       routeComponent: () => import('@/components/manage/userManage/companyInfo/companyInfo'),
      //       routeName: '企业信息',
      //       routeHidden: false,
      //       routeMeta: {
      //         title: '平台系统设置-企业信息',
      //         routeHidden: false
      //       }
      //     }                      
      //   ]
      // },
      // 企业      
      {
        path: 'companyInfo',
        routeComponent: () => import('@/components/manage/companySetting/sysRightsSetting/companyInfo/companyInfo'),
        routeName: '企业信息',
        routeHidden: false,
        routeMeta: {
          title: '管理-企业信息',
          routeHidden: false    
        }
      },           
      {
        path: '/manage/companySetting/systemSetting',
        routeComponent: () => import('@/components/manage/companySetting/systemSetting/systemSetting'),
        routeRedirect: '/manage/companySetting/systemSetting/displayGroup',
        routeName: '系统设置',
        routeHidden: false,
        routeMeta: {
          title: '企业-系统设置',
          routeHidden: false
        },
        childrenList: [
          {
            path: 'dataBase',
            routeComponent: () => import('@/components/manage/companySetting/systemSetting/dataBase/index'),
            routeName: '物理表',
            routeHidden: false,
            routeMeta: {
              title: '物理表',
              routeHidden: false
            }                
          },          
          {
            path: 'showTable',
            routeComponent: () => import('@/components/manage/companySetting/systemSetting/showTable/showTable'),
            routeName: '显示表',
            routeHidden: false,
            routeMeta: {
              title: '显示表-表配置',
              routeHidden: false
            }                
          },
          {
            path: 'displayGroup',
            routeComponent: () => import('@/components/manage/companySetting/systemSetting/displayGroup/displayGroup'),
            routeName: '显示分组',
            routeHidden: false,
            routeMeta: {
              title: '显示分组-表配置',
              routeHidden: false
            }                 
          },
          {
            path: 'components',
            routeComponent: () => import('@/components/manage/companySetting/systemSetting/components/componentsManage'),
            routeName: '显示组件',
            routeHidden: false,
            routeMeta: {
              title: '显示组件-组件配置',
              routeHidden: false
            }                 
          },
          {
            path: 'pages',
            routeComponent: () => import('@/components/manage/companySetting/systemSetting/pages/pageManage'),
            routeName: '显示页面',
            routeHidden: false,
            routeMeta: {
              title: '显示页面-页面配置',
              routeHidden: false
            }                 
          },
          {
            path: 'pageComponets',
            routeComponent: () => import('@/components/manage/companySetting/systemSetting/pageComponents/pageComManage'),
            routeName: '显示页面组件',
            routeHidden: false,
            routeMeta: {
              title: '页面组件-页面组件配置',
              routeHidden: false
            }                 
          }                             
        ]           
      },   
      {
        path: '/manage/platformSystemSetting/userRole',
        routeComponent: () => import('@/components/manage/userManage/userRole/userRole'),
        routeRedirect: '/manage/platformSystemSetting/userRole/userManage',
        routeName: '用户角色',
        routeHidden: false,
        routeMeta: {
          title: '管理-用户角色',
          routeHidden: false    
        },
        childrenList: [
          {
            path: 'userManage',
            routeComponent: () => import('@/components/manage/userManage/userRole/userManage/commonUserManage'),
            routeName: '用户管理',
            routeHidden: false,
            routeMeta: {
              title: '用户角色-用户管理',
              routeHidden: false 
            }               
          },              
          {
            path: 'userGroup',
            routeComponent: () => import('@/components/manage/userManage/userRole/userGroup/userGroup'), 
            routeName: '用户组',
            routeHidden: false,
            routeMeta: {
              title: '用户角色-用户组',
              routeHidden: false   
            }             
          },
          {
            path: 'roleManage',
            routeComponent: () => import('@/components/manage/userManage/userRole/roleManage/commonRoleManage'),
            routeName: '角色管理',
            routeHidden: false,
            routeMeta: {
              title: '用户角色-角色管理',
              routeHidden: false 
            }               
          },            
          {
            path: 'roleGroup',
            routeComponent: () => import('@/components/manage/userManage/userRole/roleGroup/roleGroup'),
            routeName: '角色组',
            routeHidden: false,
            routeMeta: {
              title: '用户角色-角色组',
              routeHidden: false 
            }               
          },
          {
            path: 'authorityList',
            routeComponent: () => import('@/components/manage/userManage/userRole/authorityList/commonAuthorityList'),
            routeName: '权限引用列表',
            routeHidden: false,
            routeMeta: {
              title: '用户角色-权限引用列表',
              routeHidden: false    
            }            
          },
          {
            path: 'permit',
            routeComponent: () => import('@/components/manage/userManage/licensingRights/permit/common-permit'),
            routeName: '许可权配置',
            routeHidden: false,
            routeMeta: {
              title: '许可权配置-许可权',
              routeHidden: false
            }               
          },
          // {
          //   path: 'licensingRights',
          //   routeComponent: () => import('@/components/manage/userManage/licensingRights/licensingRights'),
          //   routeRedirect: '/manage/platformSystemSetting/licensingRights/permit',
          //   routeName: '许可权配置',
          //   routeHidden: false,
          //   routeMeta: {
          //     title: '用户角色-许可权',
          //     routeHidden: false
          //   },
          //   childrenList: [
          //     {
          //       path: 'permit',
          //       routeComponent: () => import('@/components/manage/userManage/licensingRights/permit/common-permit'),
          //       routeName: '许可权',
          //       routeHidden: false,
          //       routeMeta: {
          //         title: '许可权配置-许可权',
          //         routeHidden: false
          //       }                
          //     }
          //   ]
          // },
          {
            path: 'companyRole',
            routeComponent: () => import('@/components/manage/userManage/userRole/companyRole/companyRole'),
            routeName: '企业角色',
            routeHidden: false,
            routeMeta: {
              title: '系统权限-企业角色',
              routeHidden: false
            }                
          }                                      
        ]
      },
      {
        path: '/manage/buySystem',
        routeComponent: () => import('@/components/manage/buySystem/buySystem'),
        routeRedirect: '/manage/buySystem/companyBuy',
        routeName: '购买系统',
        routeHidden: false,
        routeMeta: {
          title: '购买系统',
          routeHidden: false
        },
        childrenList: [
          {
            path: 'companyBuy',
            routeComponent: () => import('@/components/manage/buySystem/companyBuy/companyBuy'),
            routeName: '企业购买',
            routeHidden: false,
            routeMeta: {
              titile: '购买系统-企业购买',
              routeHidden: false
            }
          },
          {
            path: 'orderList',
            routeComponent: () => import('@/components/manage/buySystem/orderList/orderList'),
            routeName: '订单',
            routeHidden: false,
            routeMeta: {
              titile: '购买系统-订单',
              routeHidden: false
            }
          }           
        ]
      }  
    ]
  },
  {
    path: '/guid',
    routeComponent: () => import('@/base/NewStyle-cmp/guid-test'),
    routeName: '引导',
    routeHidden: true
  },      
  {
    path: '*',
    // routeRedirect: '/404',
    routeComponent: () => import('@/base/errorPage/404'),
    routeName: '404',
    routeHidden: true,
    routeMeta: {
      routeHidden: true,
      title: '出错啦'
    }
  }
]
