<template>
  <section>
        <div class="container">
            <div class="row mt-4">
                <div class="col-md-4">
                    <div class="card shadow mb-3">
                        <div class="card-body">
                            <b-nav vertical>
                                <router-link :to="{ name: 'home' }" class="side-class nav-link">
                                  <i class="cil-monitor"></i> Dashboard
                                </router-link>
                            </b-nav>    
                        </div>
                    </div>  
                    <div class="card shadow card-bg">
                        <div class="card-body">
                            <b-nav vertical>
                                <template v-if="kelases && typeof kelases.data != 'undefined'">
                                    <router-link :to="{ name: 'pembelajaran', params: { id: kelas._id }}" class="side-class nav-link" v-for="(kelas, index) in kelases.data" :key="index">
                                      <span class="badge badge-warning"><i class="cil-badge"></i></span> {{ kelas.name }} <br><small class="text-muted"> <em v-text="kelas._major.name"></em> </small>
                                    </router-link>
                                </template>
                                <template v-else>
                                    Loading..
                                </template>
                                <template v-if="kelases && typeof kelases.data != 'undefined' && kelases.data.length == 0">
                                    <img src="/img/nodata.svg" style="max-height: 100px">
                                     <div class="text-center">
                                        Anda tidak mengajar dikelas manapun
                                    </div>
                                </template>
                            </b-nav>    
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card shadow mb-3">
                      <div class="row no-gutters">
                        <div class="col-md-3 text-center">
                          <img src="/img/avatars/male.svg" class="card-img pt-3 pb-3" style="max-width: 100px">
                        </div>
                        <div class="col-md-9">
                          <div class="card-body">
                            <h5 class="card-title" v-text="user.name"></h5>
                            <p class="card-text"><span class="text-capitalize">{{ user.role }}</span> <span class="badge badge-success">{{ user.status }}</span></p>
                            <p class="card-text"><small class="text-muted">{{ user.email }}</small></p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr>
                    <!-- <div class="alert alert-warning shadow">
                        Murid anda menunggu di ruang diskusi saat ini... <a href="">masuk</a>
                    </div> -->
                    <div class="card shadow mb-3" v-if="materis && typeof materis.data != 'undefined' && materis.data.length > 0" v-for="materi in materis.data">
                      <div class="card-header">
                        <div class="flex">
                            <div>
                                
                              <span class="badge badge-secondary"><i class="cil-description"></i></span> <strong>Anda</strong> membagikan materi di kelas <router-link :to="{name: 'pembelajaran', params: { id: materi._classroom._id }}">{{ materi._classroom.name }}</router-link> <br>
                              <small class="text-muted">{{ materi.createdDate | moment("MMMM Do YYYY, h:mm a") }} &nbsp; <i class="cil-clock"></i></small>
                            </div>

                          <b-dropdown variant="light" size="sm" toggle-class="text-decoration-none" no-caret>
                            <template v-slot:button-content>
                              <i class="cil-options"></i>
                            </template>
                            <b-dropdown-item @click="deleteMateri(materi._id)"><i class="cil-trash"></i> Hapus</b-dropdown-item>
                          </b-dropdown>
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
                                        Oh tidak anda tidak memiliki akifitas apapun!
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import { BCollapse, BDropdown, BButton, BListGroup, BListGroupItem  } from 'bootstrap-vue'
    
    import { mapState, mapGetters, mapActions } from 'vuex'
    export default {
        name: 'Home',
        components: {
            BListGroupItem,
            BListGroup,
            BButton,
            BCollapse,
            BDropdown 
        },
        computed: {
            ...mapState('kelas', {
                kelases: state => state.kelases
            }),
            ...mapState('user', {
                user: state => state.authenticated
            }),
            ...mapState('materi', {
                materis: state => state.mymateris
            })
        },
        methods: {
            ...mapActions('kelas',['getTeacherKelas']),
            ...mapActions('materi',['getMyMatter','removeMateri']),
            deleteMateri(id) {
                this.$swal({
                    title: 'Informasi',
                    text: "Tindakan ini akan menghapus secara permanent!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#c7c7c7',
                    confirmButtonText: 'Iya, Lanjutkan!'
                }).then((result) => {
                    if (result.value) {
                        this.removeMateri(id)
                        .then((res) => {
                            this.successMessage('Materi dihapus..');
                        });
                    }
                })
            },
            errormsg(err) {
                this.$notify({
                  group: 'foo',
                  title: 'Error',
                  type: 'error',
                  text: err ? err : 'Ops.. terjadi kesalahan'
                })
            },
            successMessage(success) {
                this.$notify({
                  group: 'foo',
                  title: 'Success',
                  type: 'success',
                  text: success ? success : 'Success'
                })
            }
        },
        created() {
            this.getTeacherKelas()
            this.getMyMatter()
        }
    }
</script>