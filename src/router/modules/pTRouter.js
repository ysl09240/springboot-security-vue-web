import layout from '@/views/layout/layout'//首页
import container from '@/views/layout/container'
const pTRouter = {
    path: '/pt',
    name: 'pT',
    component: layout,
    redirect: '/menulist',
    meta: {
        title: '',
        role: 'other'
    },
    children:[
        {
            path: '/identifyManage',
            name: 'identifyManage',
            component: container,
            meta: {
                title: '识别记录管理',
                role: 'other',
                haschildren: true
            },
            redirect: '/recordList',
            children: [
                {
                    path: '/recordList',
                    name: 'recordList',
                    component: () => import('@/views/identifyManage/recordList'),
                    meta: {
                        title: '识别记录',
                        role: 'menu'
                    },
                },
                {
                    path: '/recordDetail/:id',
                    name: 'recordDetail',
                    component: () => import('@/views/identifyManage/recordDetail'),
                    meta: {
                        title: '识别记录详情',
                        role: 'other'
                    },
                },
                {
                    path: '/personIdentify',
                    name: 'personIdentify',
                    component: () => import('@/views/identifyManage/personIdentify'),
                    meta: {
                        title: '人员识别',
                        role: 'menu'
                    },
                },
                {
                    path: '/personDetail/:id',
                    name: 'personDetail',
                    component: () => import('@/views/identifyManage/personDetail'),
                    meta: {
                        title: '识别结果',
                        role: 'menu'
                    },
                },
            ]
        },
        {
            path: '/infoManage',
            name: 'infoManage',
            component: container,
            meta: {
                title: '采集信息管理',
                role: 'other',
                haschildren: true
            },
            redirect: '/infoList',
            children: [
                {
                    path: '/infoList',
                    name: 'infoList',
                    component: () => import('@/views/infoManage/infoList'),
                    meta: {
                        title: '采集记录',
                        role: 'menu'
                    },
                },
                {
                    path: '/infoDetail/:id',
                        name: 'infoDetail',
                    component: () => import('@/views/infoManage/infoDetail'),
                    meta: {
                    title: '采集信息详情',
                        role: 'menu'
                     },
                },
                {
                    path: '/infoEdit/:type/:id',
                    name: 'infoEdit',
                    component: () => import('@/views/infoManage/infoEdit'),
                    meta: {
                        title: '编辑采集信息',
                        role: 'menu'
                    },
                },
                {
                    path: '/personCollect',
                    name: 'personCollect',
                    component: () => import('@/views/infoManage/personCollect'),
                    meta: {
                        title: '信息采集',
                        role: 'menu'
                    },
                },
            ]
        },
        {
            path: '/userManage',
            name:'userManage',
            component: container,
            meta: {
                title: '系统用户管理',
                role: 'other',
                haschildren: true
            },
            redirect: '/userList',
            children: [
                {
                    path: '/userList',
                    name: 'userList',
                    component: () => import('@/views/userManage/userList'),
                    meta: {
                        title: '用户列表',
                        role: 'menu'
                    },
                },
                /*子路由*/
                {
                    path: '/userList',
                    component: container,
                    meta: {
                        title: '用户列表',
                        role: 'menu',
                        haschildren: true
                    },
                    children: [
                        {
                            path: '/userAdd/:type/:id',
                            name: 'userAdd',
                            component: () => import('@/views/userManage/userAdd'),
                            meta: {
                                title: '新增用户',
                                role: 'other'
                            }
                        },
                        {
                            path: '/userEdit/:type/:id',
                            name: 'userEdit',
                            component: () => import('@/views/userManage/userAdd'),
                            meta: {
                                title: '编辑用户',
                                role: 'other'
                            }
                        },
                        {
                            path: '/userDetail/:id',
                            name: 'userDetail',
                            component: () => import('@/views/userManage/userDetail'),
                            meta: {
                                title: '详情',
                                role: 'other'
                            }
                        }
                    ]
                },
            ]
        },
        {
            path: '/systemManage',
            name: 'systemManage',
            component: container,
            meta: {
                title: '系统设置管理',
                role: 'other',
                haschildren: true
            },
            redirect: '/organizationList',
            children: [
                {
                    path: '/dictionaryList',
                    name: 'dictionaryList',
                    component: () => import('@/views/systemManage/dictionaryList'),
                    meta: {
                        title: '数据字典管理',
                        role: 'menu'
                    },
                },
                {
                    path: '/organizationList',
                    name: 'organizationList',
                    component: () => import('@/views/systemManage/organizationList'),
                    meta: {
                        title: '组织架构管理',
                        role: 'menu'
                    },
                },
                /*子路由*/
                {
                    path: '/organizationList',
                    component: container,
                    meta: {
                        title: '组织架构管理',
                        role: 'menu',
                        haschildren: true
                    },
                    children: [
                        {
                            path: '/organizationAdd/:type/:id',
                            name: 'organizationAdd',
                            component: () => import('@/views/systemManage/organizationAdd'),
                            meta: {
                                title: '新增组织架构',
                                role: 'other'
                            }
                        }
                    ]
                },

                {
                    path: '/roleList',
                    name: 'roleList',
                    component: () => import('@/views/roleManager/roleList'),
                    meta: {
                        title: '角色管理',
                        role: 'menu'
                    },
                },

                /*子路由*/
                {
                    path: '/roleList',
                    component: container,
                    meta: {
                        title: '角色管理',
                        role: 'menu',
                        haschildren: true
                    },
                    children: [
                        {
                            path: '/roleAdd',
                            name: 'roleAdd',
                            component: () => import('@/views/roleManager/roleEdit'),
                            meta: {
                                title: '新增',
                                role: 'other'
                            }
                        },
                        {
                            path: '/roleEdit/:id/:type',
                            name: 'roleEdit',
                            component: () => import('@/views/roleManager/roleEdit'),
                            meta: {
                                title: '修改',
                                role: 'other'
                            }
                        },
                        {
                            path: '/roleDetails/:id/:type',
                            name: 'roleDetails',
                            component: () => import('@/views/roleManager/roleEdit'),
                            meta: {
                                title: '详情',
                                role: 'other'
                            }
                        }
                    ]
                },
            ]
        },

    ]
}
export default pTRouter
