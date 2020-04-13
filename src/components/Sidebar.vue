<template>
  <div class="sidebar sidebar"> 
    <div class="sidebar-wrapper scrollbar scrollbar-inner">
      <div class="sidebar-content">
        <div class="user">
          <div class="avatar-sm float-left mr-2">
            <img src="/img/avatars/profile.jpg" alt="..." class="avatar-img rounded-circle">
          </div>
          <div class="info">
            <a href="#collapseExample">
              <span>
                {{ user.firstName+ ' '+ user.lastName }}
                <span class="user-level">{{ user.roles }}</span>
              </span>
            </a>
            <div class="clearfix"></div>
          </div>
        </div>
        <ul class="nav nav-primary">
          <li class="nav-item" :class="{'active' : currentPage.includes('home') }">
            <router-link to="/">
              <i class="cil-home"></i>
              <p>Dashboard</p>
            </router-link>
          </li>
          <li class="nav-section">
            <span class="sidebar-mini-icon">
              <i class="cil-apps"></i>
            </span>
            <h4 class="text-section">Naviga Utama</h4>
          </li>
          <li class="nav-item" v-if="user.roles == 'Admin'">
            <a data-toggle="collapse" href="#base">
              <i class="cil-layers"></i>
              <p>Data master</p>
              <span class="caret"></span>
            </a>
            <div class="collapse" id="base">
              <ul class="nav nav-collapse">
                <li>
                  <router-link :to="{ name: 'matpel.data' }">
                    <span class="sub-item">Matpel</span>
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'kelas.data' }">
                    <span class="sub-item">Kelas</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item" :class="{'active' : currentPage.includes('materi') }">
            <router-link :to="{ name: 'materi.data' }">
              <i class="cil-laptop"></i>
              <p>Materi</p>
            </router-link>
          </li>
          <li class="nav-item">
            <a href="#" @click.prevent="logout">
              <i class="cil-account-logout"></i>
              <p>Logout</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    computed: {
      ...mapState('user', {
        user: state => state.authenticated
      }),
      currentPage() {
        return this.$route.meta.group ? this.$route.meta.group : []
      }
    },
    methods: {
      ...mapActions('auth', ['loggedOut']),
      logout() { 
            return new Promise((resolve, reject) => {
                this.loggedOut()
                localStorage.removeItem('token')
                resolve()
            }).then(() => {
                this.$store.state.token = localStorage.getItem('token')
                this.$router.push('/login')
            })
        }
    }
  }
</script>