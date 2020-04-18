import $axios from '../api.js';

const state = () => ({
	diskusis: [],
});

const mutations = {
	ASSIGN_DATA(state, payload) {
		state.diskusis = payload
	}
}

const actions = {
	getKelasDiskusi({ commit }, payload) {
		let kelas = typeof payload != 'undefined' ? payload : '';
		return new Promise((resolve, reject) => {
			$axios.get(`discussion?classroom=${payload}`)
			.then((response) => {
				commit('ASSIGN_DATA', response.data.data);
				resolve(response);
			})
			.catch((err) => {
				reject(err);
			})
		})
	},
	postDiscussion({ commit }, payload) {
		return new Promise((resolve, reject) => {
			commit('SET_LOADING', true, { root: true })
			$axios.post(`discussion`, payload)
			.then((response) => {
				commit('SET_LOADING', false, { root: true })
				resolve(response.data);
			})
			.catch((err) => {
				commit('SET_LOADING', false, { root: true })
				reject(err);
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