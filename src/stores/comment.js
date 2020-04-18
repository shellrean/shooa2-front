import $axios from '../api.js'

const state = () => ({
	comments: []
})

const mutations = {
	ASSIGN_DATA(state, payload) {
		state.comments =  payload
	},
	SLICE_COMMENT(state, payload) {
		let index = state.comments.map(x => {
			return x._id;
		}).indexOf(payload);
		state.comments.splice(index, 1);
	}
}

const actions = {

	getAllComment( { commit }, payload) {
		return new Promise((resolve, reject) => {
			$axios.get(`comment/${payload}`)
			.then((response) => {
				commit('ASSIGN_DATA', response.data.data);
				resolve(response.data);
			})
			.catch((err) => {
				reject(err);
			})
		})
	},
	postComment( {commit }, payload) {
		return new Promise((resolve, reject) => {
			$axios.post(`comment`, payload)
			.then((response) => {
				resolve(response.data);
			})
			.catch((err) => {
				reject(err);
			})
		})
	},
	removeComment({ commit }, payload) {
		return new Promise((resolve, reject) => {
			$axios.delete(`comment/${payload}`)
			.then((response) => {
				commit('SLICE_COMMENT', payload);
				resolve(response.data);
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
	mutations,
	actions
}