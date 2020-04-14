<template>
	<div> 
   <div class="card shadow card-bg">
      <div class="card-body">
          <div class="bigger-title alert alert-info shadow-less rounded">
              <h3 v-text="kelas.name"></h3>
              {{ kelas._major.name }}
          </div>
      </div>
      <div class="card-footer">
          <div class="flex">
              <div>
                  <i class="cil-user"></i>
                  &nbsp; <strong class="text-muted" v-text="user.name"></strong>
              </div>
              <div class="ml-auto">
                  <router-link to="/" class="text-muted">
                    <i class="cil-globe-alt"></i> Mulai diskusi
                  </router-link>
                  |
                  <router-link to="/" class="text-muted">
                    <i class="cil-notes"></i> Bagikan materi
                  </router-link>
              </div>
          </div>
      </div>
    </div>
    <hr>
    <div class="card shadow">
        <div class="card-body">
            <div class="row justify-content-center">
                <div class="col-md-4 text-center">    
                    <img src="/img/noting.svg" class="card-img-top" style="max-height: 200px">
                    <div class="text-center">
                      Oh tidak.. kelas ini belum memiliki aktifitas
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
	import { mapState, mapActions, mapGetters } from 'vuex'
	export default {
		name: 'DashboardPembelajaran',
		computed: {
			...mapState('kelas', {
				kelas: state => state.kelas
			}),
			...mapState('user', {
				user: state => state.authenticated
			})
		}
	}
</script>