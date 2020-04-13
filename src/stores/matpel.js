import $axios from '../api.js'

const state = () => ({
	matpels: []
})

const mutations = {
	ASSIGN_DATAS(state, payload) {
		state.matpels = payload
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
	}
}

export default {
	namespaced: true,
	state,
	actions,
	mutations
}