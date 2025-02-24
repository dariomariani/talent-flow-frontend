<script lang="ts">
import {defineComponent} from 'vue'
import {useAppStore} from "@/stores/app";

export default defineComponent({
  name: "NavBar",
  setup() {
    const appStore = useAppStore(); // Use the store
    return { appStore };
  },
  data() {
    return {
      drawer: false,
      menuItems: [
        { title: 'Home', route: '/' },
        { title: 'About', route: '/about' },
        { title: 'Contact', route: '/contact' }
      ]
    };
  },
  methods: {
    logout() {
      console.log("User logged out");
      this.appStore.clearAuthData();
    }
  }
})
</script>

<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <v-container class="d-flex align-center">
      <v-app-bar-title>Talent Flow</v-app-bar-title>

      <v-app-bar-nav-icon @click="drawer = !drawer" />
    </v-container>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    temporary
    right
  >
    <v-list>
      <v-list-item
        v-for="(item, index) in menuItems"
        :key="index"
        :to="item.route"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
      <v-list-item @click="logout">
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped lang="sass">

</style>
