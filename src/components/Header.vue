<template>
	<div>
		<b-navbar toggleable="lg" type="light" variant="white" class="shadow">
			<div class="container">	
				<b-navbar-brand>
					<img src="/img/brand/logo.png" class="d-inline-block" style="max-width: 40px;">
				</b-navbar-brand>

				<b-navbar-toggle target="nav-collapse" class="text-dark"></b-navbar-toggle>

				<b-collapse id="nav-collapse" is-nav v-if="isAuth">
					<b-navbar-nav class="">
						<router-link to="/" class="nav-link">
				          <i class="cil-globe-alt"></i> Dashboard
				        </router-link>
				        <router-link v-if="$role('admin')" :to="{ name: 'admin' }" class="nav-link">
				        	<i class="cil-layers"></i> Administrasi
				        </router-link>
				        <a href="#" class="nav-link" @click.prevent="logout">
				        	<i class="cil-account-logout"></i> Logout
				        </a>
					</b-navbar-nav>
				</b-collapse>
			</div>
		</b-navbar>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import Vue from 'vue'
	import { NavbarPlugin } from 'bootstrap-vue'
	Vue.use(NavbarPlugin)
	export default {
		computed: {
			...mapGetters(['isLoading','isAuth'])
		},
		methods: {
			logout() {
				return new Promise((resolve, reject) => {
		            localStorage.removeItem('token')
		            resolve()
		        }).then(() => {
		            this.$store.state.token = localStorage.getItem('token')
		            this.$router.replace({ name: 'login' })
		        })
			}
		}
	}
</script>