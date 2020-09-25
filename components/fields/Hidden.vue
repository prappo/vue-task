<template>
  <div class="field">
    <!--    {{ fieldData }}-->
    <label>{{ fieldData.title }} <b v-if="fieldData.required">*</b></label><br>
    <input type="hidden"
           :name="name"
           :required="fieldData.required"
           :value="fieldData.value"
           v-bind="fieldData.html_attr"
    />
  </div>
</template>

<script>
    export default {
        props:['fieldData','name']
    }
</script>

<style>
  .field{
    /*padding:20px;*/
    /*border:1px solid;*/
  }
</style>
