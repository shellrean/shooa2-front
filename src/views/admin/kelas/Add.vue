<template>
	<div class="card shadow">
		<div class="card-header">
			<router-link :to="{ name: 'kelas.data' }" class="btn btn-light btn-sm">
				<i class="cil-action-undo"></i> Kembali
			</router-link> 
		</div>
		<div class="card-body">
			<form-kelas />
			<div class="form-group">
				<button class="btn btn-sm btn-info" @click="submit" :disabled="isLoading">
					<i class="cil-save"></i>
					{{ isLoading ? 'Loading...' : 'Simpan' }}
				</button>
			</div>
		</div>
		<div class="card-footer"></div>
	</div>
</template>
<script>
	import { mapActions, mapState, mapGetters } from 'vuex'
	import FormKelas from './Form'
	export default {
		name: 'AddKelas',
		components: {
			FormKelas
		},
		data() {
			return {

			}
		},
		computed: {
			...mapGetters(['isLoading'])
		},
		methods: {
			...mapActions('kelas', ['postKelas'] ),
			submit() {
				this.postKelas()
				.then((res) => {
					this.$router.push({ name: 'kelas.data' })
				})
			}
		}
	}
</script>