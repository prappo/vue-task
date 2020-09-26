<template>
  <div class="field">
    <vs-row>

      <vs-col w="6">
        <label>{{ fieldData.title }} <b v-if="fieldData.required">*</b></label>
      </vs-col>
      <vs-col w="6">
        <label style="display: block !important;" v-for="(data) in options">
          <input type="radio"

                 :name="name"
                 :required="fieldData.required"
                 v-bind="fieldData.html_attr"
                 :checked="fieldData.default == data.key"
                 :value="data.key"
          >
          {{ data.label }}
        </label>
      </vs-col>
    </vs-row>


  </div>
</template>

<script>
    export default {
        props: ['fieldData', 'name'],
        data() {
            return {
                options: ''
            }
        },
        mounted() {
            this.options = this.fieldData.options;
        }

    }
</script>

<style>
  .field {
    padding: 5px;
    /*border:1px solid;*/
  }
</style>
