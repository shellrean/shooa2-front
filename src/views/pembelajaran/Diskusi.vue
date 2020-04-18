<template>
	<div>
		<div class="card card-bg shadow">
			<div class="card-header">
				<router-link :to="{ name: 'pembelajaran', params: { id: $route.params.id } }" class="btn btn-light btn-sm">
					<i class="cil-action-undo"></i> Kembali
				</router-link> 
			</div>
			<div class="card-body">
				<form @submit.prevent="submit">
					<div class="form-group">
						<label>Nama ruang</label>
						<input type="text" class="form-control" name="" placeholder="Tulis nama ruang..." v-model="data.title">
					</div>
					<div class="form-group">
						<button class="btn btn-sm btn-info" type="submit" :disabled="isLoading"><i class="cil-save"></i> {{ isLoading ? 'Loading...' : 'Save' }}</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapState, mapActions, mapGetters } from 'vuex'
	export default {
		name: 'DiskusiPembelajaran',
		data() {
			return {
				data : {
					title: ''
				}
			}
		},
		computed: {
			...mapGetters(['isLoading'])
		},
		methods: {
			...mapActions('diskusi',['postDiscussion']),
			submit() {
				this.postDiscussion({
					title: this.data.title,
					_classroom: this.$route.params.id
				})
				.then((res) => {
					this.$router.push({ name: 'diskusi.while', params: { id: res._id }})
				})
			}
		}
	}
</script>