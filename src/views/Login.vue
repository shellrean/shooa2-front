<template>
    <section>
        <div class="panel-header">
            <div class="page-inner container py-5">
                <div class="d-flex align-items-left align-items-md-center flex-column flex-md-row text-center">
                    
                </div>
            </div>
        </div>
        <div class="container pt-lg-md">
            <div class="row mt--5 justify-content-center">
                <div class="col-lg-6">
                    <div class="card shadow">
                        <div class="card-header">
                        Login page
                    </div>
                    <div class="card-body card-bg">
                        <div class="alert alert-danger shadow" v-if="errors.invalid">
                            {{ errors.invalid }}
                        </div>
                        <form @submit.prevent="postLogin">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">
                                      <i class="cil-mood-good"></i>
                                    </span>
                                </div>
                                <input type="email" class="form-control" 
                                :class="{ 'is-invalid' : errors.email }"placeholder="Email address" v-model="data.email" required="">
                                <div class="invalid-feedback" v-if="errors.email">
                                    {{ errors.email[0] }}
                                </div>
                            </div>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend ">
                                  <span class="input-group-text ">
                                    <i class="cil-lock-locked"></i>
                                  </span>
                                </div>
                                <input type="password" class="form-control" 
                                :class="{ 'is-invalid' : errors.password }"placeholder="Password" v-model="data.password" required="">
                                <div class="invalid-feedback" v-if="errors.password">
                                    {{ errors.password[0] }} 
                                </div>
                            </div>
                            <div class="input-group">
                                <button class="btn btn-primary btn-block" :disabled="isLoading" type="submit">
                                    {{ isLoading ? 'Loading...' : 'Login' }}
                                </button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
    data() {
        return {
            data: {
                email: '',
                password: ''
            }
        }
    },
    created() {
        if (this.isAuth) {
            this.$router.replace({ name: 'home' })
        }
    },
    computed: {
        ...mapGetters(['isLoading','isAuth']),
        ...mapState(['errors'])
    },
    methods: {
        ...mapActions('auth',['submit']),
        ...mapActions('user', ['getUserLogin']),
        postLogin() {
          this.submit(this.data)
          .then( () => {
            if (this.isAuth) {
              this.$router.replace({ name: 'home' })
            }
          })
          .catch(() => {
            this.$notify({
              group: 'foo',
              title: 'Error',
              type: 'error',
              text: 'Terjadi kesalahan.'
            })
          })
        }
    },
    destroyed() {
        this.getUserLogin();
    }
};
</script>
<style>
</style>
