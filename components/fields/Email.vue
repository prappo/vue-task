<template>
  <div class="field">
  <vs-row>
    <vs-col w="6">
    <label>{{ fieldData.title }} <b v-if="fieldData.required">*</b></label>
    </vs-col>
    <vs-col w="6">
    <input type="email"
           style="width: 100% !important;"
           :name="name"
           :required="fieldData.required"
           :value="fieldData.value"
           v-bind="fieldData.html_attr"
           v-on:input="validation"
    />
      <p style="color: red;font-size: 8px" v-show="error">{{ errorMessage}}</p>
    </vs-col>
  </vs-row>
  </div>
</template>

<script>
    export default {
        props:['fieldData','name'],
        data() {
            return {
                value: '',
                error: false,
                errorMessage : '',
            }
        },
        methods: {
            validation: function (event) {

                this.value = event.target.value;
                let validate = this.$prappoValidator(this.fieldData.validate,this.value);
                if(validate.validation){
                    this.error = false;
                    this.$root.$emit('validation_status', true)
                }else{
                    this.error = true;
                    this.$root.$emit('validation_status', false)
                    this.errorMessage = validate.message;
                }

                console.log(event.target.value);
            }
        }
    }
</script>

<style>
  .field{
    /*padding:20px;*/
    /*border:1px solid;*/
  }
</style>
