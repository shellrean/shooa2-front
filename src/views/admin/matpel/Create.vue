<template>
	<div class="card shadow">
		<div class="card-header">
			<router-link :to="{ name: 'matpel.data' }" class="btn btn-light btn-sm">
				<i class="cil-action-undo"></i> Kembali
			</router-link> 
		</div>
		<div class="card-body">
			<form @submit.prevent="submit">
				<div class="form-group">
					<label>Nama matpel</label>
					<input type="text" class="form-control"  placeholder="Nama matpel" v-model="matpel.name">
				</div>
				<div class="form-group">
					<button class="btn btn-info btn-sm" type="submit" :disabled="isLoading">
						<i class="cil-save"></i>
						{{ isLoading ? 'Loading...' : 'Simpan' }} 
					</button>
				</div>
			</form>
		</div>
		<div class="card-footer"></div>
	</div>
</template>
<script>
	import { mapActions, mapState, mapGetters } from 'vuex'
	export default {
		name: 'MatpelCreate',
		data() {
			return {

			}
		},
		computed: {
			...mapGetters(['isLoading']),
			...mapState('matpel', {
				matpel: state => state.matpel
			})
		},
		methods: {
			...mapActions('matpel', ['postMatpel']),
			submit() {
				this.postMatpel()
				.then((res) => {
					this.$router.push({ name: 'matpel.data' })
				})
			}
		}
	}
</script>