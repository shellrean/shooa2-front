import $axios from '../api.js'

const state = () => ({
	matpels: [],
	matpel: {
		name: ''
	}
})

const mutations = {
	ASSIGN_DATAS(state, payload) {
		state.matpels = payload
	},
	CLEAR_FORM(state) {
		state.matpel = {
			name: ''
		}
	}
}

const actions = {
	getAllMatpels({ commit }) {
		return new Promise((resolve, reject) => {
			$axios.get('subject')
			.then((response) => {
				commit('ASSIGN_DATAS', response.data.data);
				resolve(response)
			})
			.catch((error) => {
				reject(error)
			})
		})
	},
	postMatpel({ commit, state }) {
		return new Promise((resolve, reject) => {
			commit('SET_LOADING', true, { root: true })
			$axios.post('subject', state.matpel)
			.then((response) => {
				commit('SET_LOADING', false, { root: true })
				commit('CLEAR_FORM')
				resolve(response)
			})
			.catch((err) => {
				commit('SET_LOADING', false, { root: true })
				reject(err)
			})
		})
	},
	removeMatpel({ commit }, payload) {
		return new Promise((resolve, reject) => {
			commit('SET_LOADING', true, { root: true })
			$axios.delete(`subject/${payload}`)
			.then((response) => {
				commit('SET_LOADING', false, { root: true })
				resolve(response)
			})
			.catch((err) => {
				commit('SET_LOADING', false, { root: true })
				reject(err)
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