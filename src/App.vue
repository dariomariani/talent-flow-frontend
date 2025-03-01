<template>
  <v-app>
    <div>
      <Login v-if="!appStore.isAuthenticated" />
      <div v-else>
        <NavBar />
        <router-view />
      </div>
    </div>
  </v-app>
</template>

<script lang="ts" setup>
import NavBar from './components/NavBar.vue';
import Login from "@/pages/Login.vue";
import {useAppStore} from "@/stores/app";

const appStore = useAppStore();

</script>
