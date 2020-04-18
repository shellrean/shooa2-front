import Vue from 'vue'
import Router from 'vue-router'
import store from '../stores'

const Login = () => import('../views/Login.vue')
const Home = () => import('../views/Home.vue')

const AdminIndex = () => import('../views/admin/Index')
const AdminDashboard = () => import('../views/admin/Dashboard')
const MatpelData = () => import('../views/admin/matpel/Matpel')
const MatpelCreate = () => import('../views/admin/matpel/Create')
const KelasData = () => import('../views/admin/kelas/Kelas')
const KelasCreate = () => import('../views/admin/kelas/Add')
const KelasEdit = () => import('../views/admin/kelas/Edit')
const GuruData = () => import('../views/admin/guru/Guru')
const GuruCreate = () => import('../views/admin/guru/Add')

const PembelajaranIndex = () => import('../views/pembelajaran/Index')
const PembelajaranDashboard = () => import('../views/pembelajaran/Dashboard')
const PembelajaranMateri = () => import('../views/pembelajaran/Materi')
const PembelajaranMateriEdit = () => import('../views/pembelajaran/MateriEdit')
const PembelajaranDiskusi = () => import('../views/pembelajaran/Diskusi')

const MateriRead = () => import('../views/materi/Read')
const DisksiWhile = () => import('../views/diskusi/While');

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
				},
				{
					path: 'kelas',
					name: 'kelas.data',
					component: KelasData
				},
				{
					path: 'kelas/create',
					name: 'kelas.create',
					component: KelasCreate
				},
				{
					path: 'kelas/:id/edit',
					name: 'kelas.edit',
					component: KelasEdit
				},
				{
					path: 'guru',
					name: 'guru.data',
					component: GuruData
				},
				{
					path: 'guru/create',
					name: 'guru.create',
					component: GuruCreate
				}
			]
		},
		{
			path: '/pembelajaran',
			component: PembelajaranIndex,
			meta: { requiresAuth: true },
			children: [
				{
					path: ':id',
					name: 'pembelajaran',
					component: PembelajaranDashboard
				},
				{
					path: ':id/materi',
					name: 'pembelajaran.materi',
					component: PembelajaranMateri
				},
				{
					path: ':id/materi/edit',
					name: 'pembelajaran.materi_edit',
					component: PembelajaranMateriEdit
				},
				{
					path: ':id/diskusi',
					name: 'pembelajaran.diskusi',
					component: PembelajaranDiskusi
				}
			]
		},
		{
			path: '/materi/:id',
			name: 'materi.read',
			component: MateriRead,
			meta: { requiresAuth: true }
		},
		{
			path: '/diskusi/:id',
			name: 'diskusi.while',
			component: DisksiWhile,
			meta: { requiresAuth: true }
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