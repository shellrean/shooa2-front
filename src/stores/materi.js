import $axios from '../api.js'

const state = () => ({
	materis: [],
	mymateris: [],
	materi: ''
})

const mutations = {
	ASSING_DATAS(state, payload) {
		state.materis = payload
	},
	ASSIGN_MY_COURSE(state, payload) {
		state.mymateris = payload
	},
	ASSIGN_MATERI(state, payload) {
		state.materi = payload
	},
	SLICE_MATER(state, payload) {
		let index = state.mymateris.data.map(x => {
			return x._id;
		}).indexOf(payload);
		state.mymateris.data.splice(index, 1);
	}
}

const actions = {
	getAllMateris({ commit }) {
		return new Promise((resolve, reject) => {
			$axios.get(`/matter`)
			.then((response) => {
				commit('ASSING_DATAS', response.data)
				resolve(response.data)
			})
			.catch((err) => {
				reject(err)
			})
		})
	},
	getMyMatter({ commit }, payload) {
		let kelas = typeof payload != 'undefined' ? payload : ''
		return new Promise((resolve, reject) => {
			$axios.get(`/matter/me?kelas=${kelas}`)
			.then((response) => {
				commit('ASSIGN_MY_COURSE', response.data)
				resolve(response.data)
			})
			.catch((err) => {
				reject(err)
			})
		})
	},
	getMateri({ commit }, payload) {
		return new Promise((resolve, reject) => {
			$axios.get(`/matter/${payload}`)
			.then((response) => {
				commit('ASSIGN_MATERI', response.data.data)
				resolve(response)
			})
			.catch((err) => {
				reject(err)
			})
		})
	},
	postMatter({ commit }, payload) {
		return new Promise((resolve, reject) => {
			commit('SET_LOADING', true, { root: true })
			$axios.post(`/matter`, payload)
			.then((response) => {
				commit('SET_LOADING', false, { root: true })
				resolve(response)
			})
			.catch((err) => {
				commit('SET_LOADING', false, { root: true })
				reject(err)
			})
		})
	},
	removeMateri({ commit }, payload) {
		return new Promise((resolve, reject) => {
			$axios.delete(`/matter/${payload}`)
			.then((response) => {
				commit('SLICE_MATER', payload);
				resolve(response);
			})
			.catch((err) => {
				reject(err);
			})
		})
	}
}

export default {
	namespaced: true,
	state,
	actions,
	mutations
}