<template>
	<section class="section">
		<div class="">
			<div class="row">
				<div class="col-md-6" v-for="(materi, index) in materis.data">
					<div class="card shadow">
						<div class="card-body">
							<h5 v-text="materi.name"></h5>
							<p v-text="materi.description"></p>
						</div>
						<div class="card-footer">
							<b-dropdown text="Aksi" variant="primary" size="sm">
								<b-dropdown-item-button>Edit</b-dropdown-item-button>
							</b-dropdown>
							<button class="btn btn-info btn-sm ml-1">Masuk chanel</button>
						</div>
					</div>	
				</div>
            </div>
		</div>
	</section>
</template>
<script>
	import Vue from 'vue'
	import { DropdownPlugin } from 'bootstrap-vue' 
	import { mapActions, mapState, mapGetters } from 'vuex'
	Vue.use(DropdownPlugin)
	export default {
		name: 'DataMateri',
		created() {
			this.getAllMateris()
		},
		computed: {
			...mapGetters(['isLoading']),
			...mapState('materi',{
				materis: state => state.materis
			})
		},
		methods: {
			...mapActions('materi', ['getAllMateris']),
			computedClass(index) {
				return index % 2;
			}
		}
	}
</script>