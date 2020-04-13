import $axios from '../api.js'

const state = () => ({
	materis: []
})

const mutations = {
	ASSING_DATAS(state, payload) {
		state.materis = payload
	}
}

const actions = {
	getAllMateris({ commit }) {
		return new Promise((resolve, reject) => {
			$axios.get(`/course`)
			.then((response) => {
				commit('ASSING_DATAS', response.data)
				resolve(response.data)
			})
			.catch((err) => {
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