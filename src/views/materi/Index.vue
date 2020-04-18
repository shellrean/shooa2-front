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
                            <ul class="list-group">
                              <li class="list-group-item">Trigonometri K91 <span class="badge badge-success">Online</span></li>
                              <li class="list-group-item">PKN Warganegara <span class="badge badge-light">Offline</span></li>
                              <li class="list-group-item">Puisi dan Prosa <span class="badge badge-light">Offline</span></li>
                            </ul>
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
        name: 'MateriIndex',
    }
</script>