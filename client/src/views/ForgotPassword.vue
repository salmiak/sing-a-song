<template>
  <form-view title="Glömt lösenord" @submitted="handleSubmit">
    <v-text-field
      v-model="email"
      label="Email"
      outlined
      type="email"
    ></v-text-field>
    <v-btn color="primary" :disabled="submitted" @click="handleSubmit"
      >Skicka nytt lösenord</v-btn
    >
    <v-alert
      v-if="success || error"
      :color="success ? 'success' : 'error'"
      class="mt-4"
      >{{ success || error }}</v-alert
    >
  </form-view>
</template>

<script>
  import FormView from "@/components/FormView";
  export default {
    name: "ForgotPassword",
    title: "Glömt lösenord | Sing a Song",
    components: {
      FormView,
    },
    data() {
      return {
        submitted: false,
        email: "",
        success: false,
        error: false,
      };
    },
    methods: {
      handleSubmit() {
        this.submitted = true;
        const { email } = this;
        const { dispatch } = this.$store;
        if (email) {
          dispatch("authentication/forgotPassword", { email }).then(
            r => {
              this.success = r.message;
              this.email = "";
              this.submitted = false;
            },
            error => {
              this.error = error;
              this.submitted = false;
            }
          );
        }
      },
    },
  };
</script>
