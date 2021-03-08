<template lang="html">
  <div>
    <div
      @click="editMode=true"
      v-if="!editMode"
    >
      <slot/>
    </div>

    <v-text-field
      v-if="editMode && type==='text-field'"
      :label="label"
      v-model="newModel"
      outlined
    >
      <template v-slot:append>
        <v-btn
          class="mr-1"
          style="top: -7px"
          @click="handleSave"
        >
          <v-icon left>
            mdi-check
          </v-icon>
          Spara
        </v-btn>
        <v-btn
          style="top: -7px"
          @click="handleCancel"
        >
          <v-icon left>
            mdi-close
          </v-icon>
          Ångra
        </v-btn>
      </template>
    </v-text-field>

    <v-textarea
      v-if="editMode && type==='textarea'"
      :label="label"
      v-model="newModel"
      outlined
    >
      <template v-slot:append>
        <v-btn
          class="mr-1"
          style="top: -7px"
          @click="handleSave"
        >
          <v-icon left>
            mdi-check
          </v-icon>
          Spara
        </v-btn>
        <v-btn
          style="top: -7px"
          @click="handleCancel"
        >
          <v-icon left>
            mdi-close
          </v-icon>
          Ångra
        </v-btn>
      </template>
    </v-textarea>
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
      default: 'text-field'
    }
  },
  data() {
    return {
      editMode: false,
      newModel: this.model
    }
  },
  watch: {
    model() {
      this.newModel = this.model
    }
  },
  methods: {
    handleSave(){
      this.$emit('save', this.newModel)
      this.editMode = false
    },
    handleCancel() {
      this.$emit('cancel')
      this.newModel = this.model
      this.editMode = false
    }
  }
}
</script>

<style lang="css" scoped>
</style>
