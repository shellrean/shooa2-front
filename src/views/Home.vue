<template>
  <section>
        <div class="container">
            <div class="row mt-4">
                <div class="col-md-4">
                    <div class="card shadow card-bg">
                        <div class="card-body">
                            <b-button v-b-toggle.collapse-a block variant="info"><i class="cil-line-weight"></i> Kelas saya</b-button>
                              <b-collapse id="collapse-a" class="mt-2">
                                <b-list-group>
                                    <template v-if="kelases && typeof kelases.data != 'undefined'">
                                        <b-list-group-item v-for="(kelas, index) in kelases.data" :key="index">
                                            <button class="btn btn-sm">
                                                {{ kelas.grade }}
                                            </button>
                                            <router-link :to="{ name: 'pembelajaran', params: { id: kelas._id }}" class="btn btn-sm">
                                                {{ kelas.name }}
                                            </router-link>
                                        </b-list-group-item>
                                    </template>
                                    <template v-else>
                                        <b-list-group-item>
                                            Loading..
                                        </b-list-group-item>
                                    </template>
                                </b-list-group>
                              </b-collapse>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card shadow mb-3">
                      <div class="row no-gutters">
                        <div class="col-md-3 text-center">
                          <img src="/img/avatars/male.svg" class="card-img pt-3 pb-3 pl-3" style="max-width: 140px">
                        </div>
                        <div class="col-md-9">
                          <div class="card-body">
                            <h5 class="card-title" v-text="user.name"></h5>
                            <p class="card-text">{{ user.role }} <span class="badge badge-success">{{ user.status }}</span></p>
                            <p class="card-text"><small class="text-muted">{{ user.email }}</small></p>
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
    import { BCollapse, BButton, BListGroup, BListGroupItem  } from 'bootstrap-vue'
    import { mapState, mapGetters, mapActions } from 'vuex'
    export default {
        name: 'Home',
        components: {
            BListGroupItem,
            BListGroup,
            BButton,
            BCollapse
        },
        computed: {
            ...mapState('kelas', {
                kelases: state => state.kelases
            }),
            ...mapState('user', {
                user: state => state.authenticated
            })
        },
        methods: {
            ...mapActions('kelas',['getAllKelas'])
        },
        created() {
            this.getAllKelas()
        }
    }
</script>