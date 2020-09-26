<template>
  <div class="field">
    <vs-row>
      <vs-col w="6">
        <label>{{ fieldData.title }} <b v-if="fieldData.required">*</b></label>
      </vs-col>
      <vs-col w="6">

        <textarea
          :name="name"
          :required="fieldData.required"
          :value="fieldData.value"
          style="width: 100% !important;"
          type="text"
          v-bind="fieldData.html_attr"
          v-on:input="validation"
        >

        </textarea>

      </vs-col>
    </vs-row>

  </div>
</template>

<script>
    import {ValidationProvider} from 'vee-validate';
    import {extend} from 'vee-validate';

    extend('positive', value => {
        return value;
    });

    export default {
        props: ['fieldData', 'name'],
        components: {
            ValidationProvider
        },
        data() {
            return {
                value: '',
            }
        },
        methods: {
            validation: function (event) {

                this.value = event.target.value;

                if (this.value.length < 4) {
                    this.$root.$emit('validation_status', false)
                }
                console.log(event.target.value);
            }
        }
    };
</script>

<style>
  .field {
    /*padding:20px;*/
    /*border:1px solid;*/
  }
</style>
