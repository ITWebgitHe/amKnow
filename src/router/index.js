import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: resolve => require(['@/components/page/Login'], resolve)
        },
        {
            path: '/notFound',
            name: 'NotFound',
            component: resolve => require(['@/components/page/NotFound'], resolve)
        },
        {
            path: '/',
            redirect: '/login',
            name: 'Home',
            component: resolve => require(['@/components/common/Home'], resolve),
            children: [
                {
                    path: 'Index',
                    name: 'Index',
                    component: resolve => require(['@/components/page/Index.vue'], resolve),
                    meta: {
                        keepAlive: true // 需要缓存
                    },
                },
                {
                    path: 'automobileInfMng',
                    name: 'AutomobileInfMng',
                    component: resolve => require(['@/components/page/AutomobileInfMng'], resolve),
                    meta: {
                        keepAlive: true // 需要缓存
                    }
                },
                {
                    path: 'automobileBrandMng',
                    name: 'AutomobileBrandMng',
                    component: resolve => require(['@/components/page/AutomobileBrandMng'], resolve),
                    meta: {
                        keepAlive: true // 需要缓存
                    }
                },
                {
                    path: 'stockManage',
                    name: 'StockMng',
                    component: resolve => require(['@/components/page/StockMng'], resolve),
                    meta: {
                        keepAlive: true // 需要缓存
                    }
                },
                {
                    path: 'Dashboard',
                    name: 'Dashboard',
                    component: resolve => require(['@/components/page/Dashboard'], resolve),
                    meta: {
                        keepAlive: true // 需要缓存
                    }
                },
                {
                    path: 'AnnouncementInformation',
                    name: 'AnnouncementInformation',
                    component: resolve => require(['@/admin-teacher/Announcement-Information.vue'], resolve),
                    meta: {
                        keepAlive: true, // 需要缓存
                        title: '公告信息管理',
                    }
                },
                {
                    path: 'CertificateManagement',
                    name: 'CertificateManagement',
                    component: resolve => require(['@/admin-teacher/Certificate-Management.vue'], resolve),
                    meta: {
                        keepAlive: true, // 需要缓存
                        title: '证书管理',
                    }
                },
                {
                    path: 'HonorManagement',
                    name: 'HonorManagement',
                    component: resolve => require(['@/admin-teacher/Honor-Management.vue'], resolve),
                    meta: {
                        keepAlive: true, // 需要缓存
                        title: '荣誉管理',
                    }
                },{
                    path: 'HonorManagement',
                    name: 'HonorManagement',
                    component: resolve => require(['@/admin-teacher/Honor-Management.vue'], resolve),
                    meta: {
                        keepAlive: true, // 需要缓存
                        title: '荣誉管理',
                    }
                },
                {
                    path: 'InformationManagement',
                    name: 'InformationManagement',
                    component: resolve => require(['@/admin-teacher/Information-Management.vue'], resolve),
                    meta: {
                        keepAlive: true, // 需要缓存
                        title: '用户信息管理',
                    }
                },
                {
                    path: 'UserDestinationManagement',
                    name: 'UserDestinationManagement',
                    component: resolve => require(['@/admin-teacher/User-destination-management.vue'], resolve),
                    meta: {
                        keepAlive: true, // 需要缓存
                        title: '用户去向管理',
                    }
                },
                {
                    path: 'noticeDetail',
                    name: 'noticeDetail',
                    component: resolve => require(['@/components/page/noticeDetail.vue'], resolve),
                    meta: {
                        keepAlive: true // 需要缓存
                    },
                },
            ]
        },
        {
            path: '*',
            redirect: '/notFound'
        }
    ]
})
