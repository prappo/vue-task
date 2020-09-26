<template>
  <div class="field">
    <vs-row>
      <vs-col w="6">
        <label>{{ fieldData.title }} <b v-if="fieldData.required">*</b></label>
      </vs-col>

      <vs-col w="6">
        <select style="width: 100% !important;" type="text"
                :name="name"
                :required="fieldData.required"
                :value="fieldData.value"
                v-bind="fieldData.html_attr"
        >
          <option :selected="fieldData.default == data.key" v-for="(data) in options" :value="data.key">{{ data.label
            }}
          </option>

        </select>
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
    /*padding:20px;*/
    /*border:1px solid;*/
  }
</style>
