import $axios from '../api.js'

const state = () => ({
	authenticated: [],
	users: [],
	user: {
		name: '',
		email: '',
		password: '',
		role: '',
		_subjects: []
	}
})

const mutations = {
	ASSIGN_USER_AUTH(state, payload) {
		state.authenticated = payload
	},
	ASSIGN_DATA(state, payload) {
		state.users = payload
	}
}

const actions = {
	getUserLogin({ commit }) {
		return new Promise((resolve, reject) => {
			$axios.get(`user/authenticated`)
			.then((response) => {
				commit('ASSIGN_USER_AUTH', response.data)
				resolve(response.data)
			})
		})
	},
	getAllUser({ commit }, payload) {
		let type = typeof payload  != 'undefined' ? payload : '';
		return new Promise((resolve, reject) => {
			$axios.get(`user?role=${payload}`)
			.then((response) => {
				commit('ASSIGN_DATA', response.data.data)
				resolve(response.data)
			})
		})
	},
	postUser({ commit, state }) {
		return new Promise((resolve, reject) => {
			commit('SET_LOADING', true, { root: true })
			$axios.post(`user`, state.user)
			.then((response) => {
				commit('SET_LOADING', false, { root: true })
				resolve(response.data)
			})
			.catch((err) => {
				commit('SET_LOADING', false, { root: true })
				reject(err)
			})
		})
	},
	removeUser({ commit }, payload) {
		return new Promise( async (resolve, reject) => {
			try	{
				let response = await $axios.delete(`user/${payload}`)
				resolve(response.data)
			} catch( err) {
				reject(err)
			}
		})
	}
}

export default {
	namespaced: true,
	state, 
	actions,
	mutations
}