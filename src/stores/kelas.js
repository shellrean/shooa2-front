import $axios from '../api.js'

const state = () => ({
	kelases: [],
	kelas: {
		name: '',
		grade: '',
		_major: [],
		_subjects: [],
		_teachers: []
	}
})

const mutations = {
	ASSIGN_DATAS(state, payload) {
		state.kelases = payload
	},
	ASSIGN_FORM(state, payload) {
		state.kelas = {
			name: payload.name,
			grade: payload.grade,
			_major: payload._major,
			_subjects: payload._subjects,
			_teachers: payload._teachers
		}
	},
	CLEAR_FORM(state) {
		state.kelas = {
			name: '',
			grade: '',
			_major: [],
			_subjects: [],
			_teachers: []
		}
	}
}

const actions = {
	getAllKelas({ commit }) {
		return new Promise((resolve, reject) => {
			commit('SET_LOADING', true, { root: true })
			$axios.get('classroom')
			.then((response) => {
				commit('ASSIGN_DATAS', response.data)
				commit('SET_LOADING', false, { root: true })
				resolve(response)
			})
			.catch((err) => {
				commit('SET_LOADING', false, { root: true })
				reject(err)
			})
		})
	},
	getTeacherKelas({ commit }) {
		return new Promise((resolve, reject) => {
			$axios.get('classroom/teacher')
			.then((response) => {
				commit('ASSIGN_DATAS', response.data)
				resolve(response)
			})
			.catch((err) => {
				reject(err);
			})
		})
	},
	postKelas({ commit, state }) {
		return new Promise(( resolve, reject ) => {
			commit('SET_LOADING', true, { root: true })
			$axios.post('classroom', state.kelas)
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
	updateKelas({ commit, state }, payload) {
		return new Promise(( resolve, reject ) => {
			commit('SET_LOADING', true, { root: true })
			$axios.patch(`classroom/${payload}`, state.kelas)
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
	getKelas({ commit }, payload) {
		return new Promise((resolve, reject) => {
			commit('SET_LOADING', true, { root: true })
			$axios.get(`classroom/${payload}`)
			.then((response) => {
				commit('SET_LOADING', false, { root: true })
				commit('ASSIGN_FORM', response.data.data)
				resolve(response)
			})
			.catch((err) => {
				commit('SET_LOADING', false, { root: true })
				reject(err)
			})
		})
	},
	removeKelas({ commit }, payload) {
		return new Promise(( resolve, reject ) => {
			commit('SET_LOADING', true, { root: true })
			$axios.delete(`classroom/${payload}`)
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
	mutations,
	actions
}