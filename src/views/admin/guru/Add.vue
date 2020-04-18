<template>
	<div class="card shadow">
		<div class="card-header">
			<router-link :to="{ name: 'guru.data' }" class="btn btn-light btn-sm">
				<i class="cil-action-undo"></i> Kembali
			</router-link>
		</div>
		<div class="card-body">
			<form-guru />
			<div class="form-group">
				<button class="btn btn-sm btn-info" @click="submit" :disabled="isLoading">
					<i class="cil-save"></i>
					{{ isLoading ? ' Loading...' : ' Simpan' }}
				</button>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapActions, mapState, mapGetters } from 'vuex'
	import FormGuru from './Form'
	export default {
		name: 'AddGuru',
		components: {
			FormGuru
		},
		computed: {
			...mapGetters(['isLoading'])
		},
		methods: {
			...mapActions('user',['postUser']),
			submit() {
				this.postUser()
				.then((res) => {
					this.$router.push({ name: 'guru.data' })
				})
			}
		}
	}
</script>