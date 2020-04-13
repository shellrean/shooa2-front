<template>
  <section>
        <div class="container">
            <div class="row mt-5">
                <div class="col-md-4">
                    <div class="card shadow card-bg">
                        <div class="card-body">
                            <b-button v-b-toggle.collapse-a block variant="info"><i class="cil-line-weight"></i> Kelas saya</b-button>
                              <b-collapse id="collapse-a" class="mt-2">
                                <b-list-group>
                                  <b-list-group-item><i class="cil-circle text-info"></i> Cras justo odio</b-list-group-item>
                                </b-list-group>
                              </b-collapse>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card shadow card-bg">
                        <div class="card-body">
                            <div class="bigger-title alert alert-info shadow-less rounded">
                                <h3>X-TKJ</h3>
                                Teknik Komputer Jaringan
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="flex">
                                <div>
                                    <i class="cil-user"></i>
                                    &nbsp; <strong class="text-muted">Prof.Shellrean.</strong>
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
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import { BCollapse, BButton, BListGroup, BListGroupItem  } from 'bootstrap-vue'
    export default {
        components: {
            BListGroupItem,
            BListGroup,
            BButton,
            BCollapse
        }
    }
</script>