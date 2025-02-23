<script lang="ts">
import {defineComponent} from 'vue'
import httpClient from "@/http/axios";
import type {AuthDto, LoginDto} from "@/api/model/auth";
import type {ApiResponse} from "@/api/model/api-response";
import {useAppStore} from "@/stores/app";

export default defineComponent({
  name: "LoginForm",
  setup() {
    const appStore = useAppStore(); // Use the store
    return { appStore };
  },
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      this.errorMessage = '';
      httpClient.post<LoginDto, { data: ApiResponse<AuthDto> }>("/auth/login", {
        username: this.username,
        password: this.password
      })
        .then(response => {
          console.log("Authentication successfully");
          if (response.data.payload) {
            this.appStore.setAuthData({token: response.data.payload?.token});
          } else {
            this.errorMessage = response.data.message;
          }
        })
        .catch(error => this.errorMessage = error.response.data.message);
    }
  }
})
</script>

<template>
  <v-container
    class="d-flex justify-center align-center"
    style="height: 100vh;"
  >
    <v-card
      class="pa-4"
      width="400"
    >
      <v-card-title class="text-center">
        Login
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="username"
            label="Username"
            required
          />
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
          />
          <v-btn
            type="submit"
            color="primary"
            block
            class="mt-2"
          >
            Login
          </v-btn>
          <v-alert
            v-if="errorMessage"
            type="error"
            class="mt-2"
            dense
          >
            {{ errorMessage }}
          </v-alert>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped lang="sass">

</style>
