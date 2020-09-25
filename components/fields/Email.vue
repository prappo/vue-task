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
    />
    </vs-col>
  </vs-row>
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
