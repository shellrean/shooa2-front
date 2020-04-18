<template>
	<div>
		<div class="form-group">
			<label>Name</label>
			<input type="text" class="form-control" placeholder="Name" v-model="user.name">
		</div>
		<div class="form-group">
			<label>Email</label>
			<input type="email" class="form-control" placeholder="Email" v-model="user.email">
		</div>
		<div class="form-group">
			<label>Password</label>
			<input type="text" class="form-control" placeholder="Password" v-model="user.password">
		</div>
		<div class="form-group">
			<label>Matpel</label>
			<multiselect 
			v-model="user._subjects"
			placeholder="Matpel"
			value="_id" 
			label="name" track-by="_id" 
			:options="matpels"
			:multiple="true"
			:taggable="true"
			v-if="matpels"></multiselect>
		</div>
	</div>
</template>
<script>
	import { mapState, mapMutations, mapActions } from 'vuex'
	import Multiselect from 'vue-multiselect'
	import 'vue-multiselect/dist/vue-multiselect.min.css'
	
	export default {
		name: 'FormGuru',
		components: {
			Multiselect
		},
		computed: {
			...mapState(['errors']),
			...mapState('user', {
				user : state => state.user
			}),
			...mapState('matpel', {
				matpels: state => state.matpels
			}),
		},
		methods: {
			...mapActions('matpel', ['getAllMatpels'])
		},
		created() {
			this.user.role = 'teacher'
			this.getAllMatpels()
		}
	}
</script>