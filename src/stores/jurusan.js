import $axios from '../api.js'

const state = () => ({
	jurusans: []
})

const mutations = {
	ASSIGN_DATA(state, payload) {
		state.jurusans = payload
	}
}

const actions = {
	getAllJurusan({ commit }) {
		return new Promise((resolve, reject) => {
			$axios.get('major')
			.then((response) => {
				commit('ASSIGN_DATA', response.data);
				resolve(response)
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
	mutations,
	actions
}