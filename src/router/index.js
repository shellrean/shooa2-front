import Vue from 'vue'
import Router from 'vue-router'
import store from '../stores'

const Login = () => import('../views/Login.vue')
const Home = () => import('../views/Home.vue')

const AdminIndex = () => import('../views/admin/Index')
const AdminDashboard = () => import('../views/admin/Dashboard')
const MatpelData = () => import('../views/admin/matpel/Matpel')
const MatpelCreate = () => import('../views/admin/matpel/Create')

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '',
			name: 'home',
			component: Home,
			meta: { requiresAuth: true, group: 'home' }
		},
		{
			path: '/admin',
			component: AdminIndex,
			meta: { requiresAuth: true },
			children: [
				{
					path: '',
					name: 'admin',
					component: AdminDashboard
				},
				{
					path: 'matpel',
					name: 'matpel.data',
					component: MatpelData
				},
				{
					path: 'matpel/create',
					name: 'matpel.create',
					component: MatpelCreate
				}
			]
		}
	]
})

router.beforeEach((to, from , next) => {
	store.commit('CLEAR_ERRORS')
	if (to.matched.some(record => record.meta.requiresAuth)) {
		let auth = store.getters.isAuth
		if (!auth) {
			next({ name: 'login' })
		}
		else {
			next()
		}
	}
	else {
		next()
	}
})
export default router