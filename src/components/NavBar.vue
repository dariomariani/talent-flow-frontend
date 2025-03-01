<script lang="ts">
import {defineComponent} from 'vue'
import {useAppStore} from "@/stores/app";
import httpClient from "@/http/axios";
import type {ApiResponse} from "@/api/model/api-response";
import type {UserDto} from "@/api/model/auth";

export default defineComponent({
  name: "NavBar",
  setup() {
    const appStore = useAppStore();
    const userName = computed(() => appStore.userData?.displayName || "Guest");
    return { appStore, userName};
  },
  data() {
    return {
      drawer: false,
      menuItems: [
        { title: 'Home', route: '/' },
      ],
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    logout() {
      console.log("User logged out");
      this.appStore.clearAuthData();
    },
    fetchUserData () {
      httpClient.get<ApiResponse<UserDto>>("/users/me")
        .then(response => {
          console.log("Authentication successfully");
          if (response.data.payload) {
            this.appStore.setUserData({displayName: response.data.payload?.displayName, role: response.data.payload?.role});
          } else {
            console.log("error fetching user data: ", response.data.message);
          }
        })
        .catch(error => console.log(error.response.data.message));
    },
  },
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

      <div class="d-flex align-center">
        <span class="mr-4">Welcome, {{ userName }}</span>

        <v-app-bar-nav-icon @click="drawer = !drawer" />
      </div>
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
