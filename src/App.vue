<template>
    <div id="app">
        <notifications group="foo" position="bottom right"/>
        <app-header></app-header>
        <main>
            <fade-transition origin="center" mode="out-in" :duration="250">
                <router-view/>
            </fade-transition>
        </main>
        <app-footer></app-footer>
    </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";
import AppHeader from '@/components/Header';
import AppFooter from '@/components/Footer';

export default {
  components: {
    FadeTransition,
    AppHeader,
    AppFooter
  }
};
</script>
<style lang="scss">
.vue-notification {
  padding: 10px;
  margin: 0 5px 5px;
 
  font-size: 12px;
 
  color: #ffffff;
  border-left: 5px solid #187FE7;
  box-shadow: 0.3px 0.4px #ccc;
        border-radius: 5px;
 
  &.warn {
    // background: #ffb648;
    background: #fff !important;
    color: #f48a06;
    border-left-color: #f48a06;
  }
 
  &.error {
    background: #fff !important;
    color: #B82E24;
    border-left-color: #B82E24;
  }
 
  &.success {
    background: #fff !important;
    color: #42A85F;
    border-left-color: #42A85F;
  }
}
</style>
<style type="text/css">
  .side-class.router-link-exact-active {
    background: #f1f1f1;
    border-radius: 20px;
  }
</style>