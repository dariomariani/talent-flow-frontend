<script lang="ts">
import {defineComponent} from 'vue'
import JobCard from "@/components/JobCard.vue";
import httpClient from "@/http/axios";
import type {ApiResponse} from "@/api/model/api-response";
import type {JobDto} from "@/api/model/job";
import {useAppStore} from "@/stores/app";

export default defineComponent({
  name: "JobList",
  components: {JobCard},
  setup(){
    const appStore = useAppStore();
    return { appStore };
  },
  data() {
    return {
      jobs: [] as JobDto[],
      enableNewJob: false,
      dialogVisible: false,
    }
  },
  mounted() {
    this.fetchJobs();
  },
  methods: {
    fetchJobs () {
      httpClient.get<ApiResponse<JobDto[]>>("/jobs", { params: { isOpen: true,orderBy: "publishDate" } })
          .then(response => {
            if (response.data.payload) {
              this.jobs = response.data.payload;
              this.enableNewJob = this.userIsRecruiter();
            } else {
              console.log("error fetching jobs: ", response.data.message);
            }
          })
          .catch(error => console.log(error.response.data.message));
    },
    userIsRecruiter() {
      return this.appStore.isRecruiter;
    },
    showDialog(){
      this.dialogVisible = true;
    },
    hideDialog(){
      this.dialogVisible = false;
    }
  }
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col
        v-if="enableNewJob"
        cols="8"
        sm="6"
        md="4"
        lg="3"
      >
        <JobCreateDialog />
      </v-col>
      <v-col
        v-for="job in jobs"
        :key="job.id"
        cols="8"
        sm="6"
        md="4"
        lg="3"
      >
        <JobCard :job="job" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
</style>
