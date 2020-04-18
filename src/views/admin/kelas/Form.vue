<template>
	<div>
		<div class="form-group">
			<label>Nama</label>
			<input type="text" class="form-control" placeholder="Nama kelas" v-model="kelas.name">
		</div>
		<div class="form-group">
			<label>Grade</label>
			<select class="form-control" v-model="kelas.grade">
				<option value="X">X</option>
				<option value="XI">XI</option>
				<option value="XII">XII</option>
			</select>
		</div>
		<div class="form-group">
			<label>Jurusan</label>
			<multiselect 
			v-model="kelas._major"
			placeholder="Jurusan" 
			label="name" track-by="_id" 
			:options="jurusans.data"
			v-if="jurusans.data"></multiselect>
		</div>
		<div class="form-group">
			<label>Matpel</label>
			<multiselect 
			v-model="kelas._subjects"
			placeholder="Matpel"
			value="_id" 
			label="name" track-by="_id" 
			:options="matpels"
			:multiple="true"
			:taggable="true"
			v-if="matpels"></multiselect>
		</div>
		<div class="form-group">
			<label>Guru</label>
			<multiselect 
			v-model="kelas._teachers"
			placeholder="Guru"
			value="_id" 
			label="name" track-by="_id" 
			:options="teachers"
			:multiple="true"
			:taggable="true"
			v-if="teachers"></multiselect>
		</div>
	</div>
</template>
<script>
	import { mapState, mapMutations, mapActions } from 'vuex'
	import Multiselect from 'vue-multiselect'
	import 'vue-multiselect/dist/vue-multiselect.min.css'

	export default {
		name: 'FormKelas',
		components: {
	    	Multiselect
	  	},
		computed: {
			...mapState(['errors']),
			...mapState('kelas', {
				kelas : state => state.kelas
			}),
			...mapState('jurusan', {
				jurusans: state => state.jurusans
			}),
			...mapState('matpel', {
				matpels: state => state.matpels
			}),
			...mapState('user', {
				teachers: state => state.users
			})
		},
		methods: {
			...mapActions('jurusan',['getAllJurusan']),
			...mapActions('matpel', ['getAllMatpels']),
			...mapActions('user',['getAllUser'])
		},
		created() {
			this.getAllJurusan()
			this.getAllMatpels()
			this.getAllUser('teacher')
		}
	}
</script>