<template>
  <section>
        <div class="container">
            <div class="row mt-4">
                <div class="col-md-4">
                    <div class="card shadow card-bg">
                        <div class="card-header">
                            Ruang diskusi
                        </div>
                        <div class="card-body">
                            <ul class="list-group" v-if="diskusis">
                              <li class="list-group-item" v-for="diskusi in diskusis">
                                <router-link :to="{ name: 'diskusi.while', params: { id: diskusi._id }}" >{{ diskusi.title }}  </router-link>
                                <span class="badge" :class="{ 'badge-active' : diskusi.status }"> {{ diskusi.status ? 'Online' : 'Offline' }}</span>
                              </li>
                            </ul>
                            <p v-else>
                                Loading...
                            </p>
                            <template v-if="diskusis && diskusis.length == 0">
                                <img src="/img/nodata.svg" style="max-width: 100px">
                            </template>
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
    import { mapGetters, mapActions, mapState } from 'vuex'
    import { FadeTransition } from "vue2-transitions";
    export default {
        name: 'PembelajaranIndex',
        components: {
            FadeTransition
        },
        computed: {
            ...mapState('kelas', {
                kelas: state => state.kelas
            }),
            ...mapState('materi', {
                materis: state => state.mymateris
            }),
            ...mapState('diskusi', {
                diskusis: state => state.diskusis
            })
        },
        methods: {
            ...mapActions('kelas',['getKelas']),
            ...mapActions('materi', ['getMyMatter']),
            ...mapActions('diskusi',['getKelasDiskusi'])
        },
        async created() {
            try {
                this.getKelas(this.$route.params.id)
                this.getMyMatter(this.$route.params.id);
                this.getKelasDiskusi(this.$route.params.id);
            } catch (err) {

            }
        }
    }
</script>