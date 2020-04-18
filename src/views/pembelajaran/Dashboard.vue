<template>
	<div> 
   <div class="card shadow mb-3 card-bg">
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
                  <router-link :to="{ name: 'pembelajaran.diskusi', params: { id: $route.params.id }}" class="text-muted">
                    <i class="cil-globe-alt"></i> Mulai diskusi
                  </router-link>
                  |
                  <router-link :to="{ name: 'pembelajaran.materi', params: { id: $route.params.id }}" class="text-muted">
                    <i class="cil-notes"></i> Bagikan materi
                  </router-link>
              </div>
          </div>
      </div>
    </div>
    <hr>
    <div class="card shadow mb-3" v-if="materi && typeof materis.data != 'undefined' && materis.data.length > 0" v-for="materi in materis.data">
      <div class="card-header">
        <div class="flex">
            <div>
              <span class="badge badge-secondary"><i class="cil-description"></i></span> 
              <strong>{{ materi._teacher.name }}</strong> membagikan materi<br>
              <small class="text-muted">{{ materi.createdDate | moment("MMMM Do YYYY, h:mm a") }} &nbsp; <i class="cil-clock"></i></small>
            </div>
      </div>
      </div>
      <div class="card-body">
          <div class="bordered-pad"> 
            <strong>{{ materi.title}}</strong>
            <p>{{ materi.description }}</p>
            <router-link :to="{ name: 'materi.read', params: { id: materi._id }}">Lihat...</router-link>
          </div>
      </div>
    </div>
    <div class="card shadow" v-if="materis && typeof materis.data != 'undefined' && materis.data.length == 0">
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
			}),
      ...mapState('materi', {
        materis: state => state.mymateris
      })
		}
	}
</script>