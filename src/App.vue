<template>
    <div id="app">
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
