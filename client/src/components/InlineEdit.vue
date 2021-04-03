<template lang="html">
  <div>
    <v-tooltip
      right
      nudge-right="-30"
      open-delay="700"
      transition="scroll-x-reverse-transition"
      v-if="!editMode"
    >
      <template v-slot:activator="{ on, attrs }">
        <div
          v-bind="attrs"
          v-on="on"
          @click="editMode = true"
          class="rounded border mb-1"
          v-ripple
          style="border: 1px dashed var(--v-secondary-darken1); cursor: pointer;"
        >
          <div
            class="text-caption text-left px-3 mb-1 secondary--text text--darken-4"
          >
            {{ label }}
          </div>
          <slot />
        </div>
      </template>
      <v-icon dark>mdi-pen</v-icon>
    </v-tooltip>

    <v-text-field
      v-if="editMode && type === 'text-field'"
      :label="label"
      v-model="newModel"
      outlined
      @keydown.enter="handleSave"
      @keydown.esc="handleCancel"
      class="mt-4"
    >
      <template v-slot:append>
        <v-btn class="mr-1" style="top: -7px" @click="handleSave">
          <v-icon left>
            mdi-check
          </v-icon>
          Spara
        </v-btn>
        <v-btn style="top: -7px" @click="handleCancel">
          <v-icon left>
            mdi-close
          </v-icon>
          Ångra
        </v-btn>
      </template>
    </v-text-field>

    <template v-if="editMode && type === 'textarea'">
      <v-textarea
        :label="label"
        v-model="newModel"
        outlined
        @keydown.esc="handleCancel"
        @keydown.ctrl.enter="handleSave"
        @keydown.meta.enter="handleSave"
        class="mt-4"
      >
      </v-textarea>

      <div class="text-right mb-8">
        <v-btn class="mr-1" style="top: -7px" @click="handleSave">
          <v-icon left>
            mdi-check
          </v-icon>
          Spara
        </v-btn>
        <v-btn style="top: -7px" @click="handleCancel">
          <v-icon left>
            mdi-close
          </v-icon>
          Ångra
        </v-btn>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    name: "InlineEdit",
    props: {
      model: String,
      label: String,
      type: {
        type: String,
        default: "text-field",
      },
    },
    data() {
      return {
        editMode: false,
        newModel: this.model,
      };
    },
    watch: {
      model() {
        this.newModel = this.model;
      },
    },
    methods: {
      handleSave() {
        this.$emit("save", this.newModel);
        this.editMode = false;
      },
      handleCancel() {
        this.$emit("cancel");
        this.newModel = this.model;
        this.editMode = false;
      },
    },
  };
</script>

<style lang="css" scoped></style>
