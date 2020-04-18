<template>
  	<section v-if="$role('admin')">
        <div class="container">
        	<div class="row mt-4">
				<div class="col-md-4">
					<div class="card shadow">
						<div class="card-body">
							<b-nav vertical>
								<router-link :to="{ name: 'admin' }" class="side-class nav-link">
						          <i class="cil-monitor"></i> Dashboard
						        </router-link>
						        <router-link :to="{ name: 'kelas.data' }" class="side-class nav-link">
						          <i class="cil-home"></i> Kelas
						        </router-link>
						        <router-link :to="{ name: 'matpel.data' }" class="side-class nav-link">
						          <i class="cil-description"></i> Matpel
						        </router-link>
						        <router-link :to="{ name: 'guru.data' }" class="side-class nav-link">
						          <i class="cil-education"></i> Guru
						        </router-link>
							</b-nav>	
						</div>
					</div>	
				</div>
				<div class="col-md-8">
					<fade-transition origin="center" mode="out-in" :duration="250">
        				<router-view />
        			</fade-transition>
				</div>
			</div>
        </div>
    </section>
</template>
<script>
	import { BNav } from 'bootstrap-vue'
	import { FadeTransition } from "vue2-transitions";
	import { mapGetters, mapState, mapActions } from 'vuex'
	export default {
		name: 'AdminIndex',
		components: {
			BNav,
			FadeTransition
		},
		computed: {
			...mapState('user', {
				user: state => state.authenticated
			})
		}
	}
</script>