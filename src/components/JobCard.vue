<script lang="ts">
import {defineComponent} from 'vue'
import {useAppStore} from "@/stores/app";

export default defineComponent({
  name: "JobCard",
  props: {
    job: {
      type: Object,
      required: false,
      default: null
    },
    createMode: {type: Boolean, default: false},
  },
  setup(){
    const appStore = useAppStore();
    return { appStore };
  }
})
</script>

<template>
  <v-card
    class="job-card"
    elevation="3"
  >
    <template v-if="createMode">
      <v-card-text class="new-job">
        <v-icon size="48">
          mdi-plus
        </v-icon>
        <p>Publish New Job</p>
      </v-card-text>
    </template>
    <template v-else>
      <v-card-title class="text-h6">
        {{ job.title }}
      </v-card-title>
      <v-card-subtitle class="text-body-2">
        {{ job.location }}
      </v-card-subtitle>
      <v-card-text>
        <p>{{ job.description }}</p>
        <v-chip
          :color="job.status === 'Open' ? 'green' : 'red'"
          dark
        >
          {{ job.status }}
        </v-chip>
      </v-card-text>
      <v-card-actions>
        <v-btn
          v-if="appStore.isRecruiter"
          color="primary"
        >
          Show Candidates
        </v-btn>
        <v-btn
          v-else
          color="primary"
        >
          Apply
        </v-btn>
      </v-card-actions>
    </template>
  </v-card>
</template>

<style scoped lang="scss">
.job-card {
  max-width: 300px;
  margin: 10px;
}
</style>
