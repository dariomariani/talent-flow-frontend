<script lang="ts">
import {defineComponent} from 'vue'
import httpClient from "@/http/axios";
import type {NewJobDto} from "@/api/model/job";

export default defineComponent({
  name: "JobCreateDialog",
  emits: ['onClose'],
  data() {
    return {
      dialog: false,
      jobForm: {
        title: "",
        description: "",
        location: "",
      },
    };
  },
  methods: {
    publishJob(newJobDto: NewJobDto) {
      httpClient.post("/jobs", newJobDto);
    },
    resetForm() {
      this.jobForm = {
        title: "",
        description: "",
        location: "",
      };
    },
    onClose() {
      this.$emit("onClose");
    }
  }
})
</script>

<template>
  <div class="pa-4 text-center">
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <template #activator="{ props: activatorProps }">
        <JobCard
          :create-mode="true"
          v-bind="activatorProps"
        />
      </template>

      <v-card
        title="Publish New Job"
      >
        <v-card-text>
          <v-row dense>
            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                label="First name*"
                required
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                hint="example of helper text only on focus"
                label="Middle name"
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                label="Last name*"
                persistent-hint
                required
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                label="Email*"
                required
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                label="Password*"
                type="password"
                required
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                label="Confirm Password*"
                type="password"
                required
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />

          <v-btn
            text="Cancel"
            variant="plain"
            @click="dialog = false"
          />

          <v-btn
            color="primary"
            text="Publish"
            variant="tonal"
            @click="dialog = false"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<style scoped lang="sass">

</style>
