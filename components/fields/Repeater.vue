<template>
  <div class="field">
    <fieldset>
      <legend>Repeater Controls</legend>

<!--    {{ fields }}-->
<!--    <div v-for="field in fields">-->
    <vue-cloneya>
      <div>
      <div v-for="(attr , name) in fields">

        <div v-if="attr.type == 'text'">
          <PText :name="name" :fieldData="attr"></PText>
        </div>

        <div v-if="attr.type == 'email'">
          <PEmail :name="name" :fieldData="attr"></PEmail>
        </div>

        <div v-if="attr.type == 'select'">
          <PSelect :name="name" :fieldData="attr"></PSelect>
        </div>

        <div v-if="attr.type == 'hidden'">
          <PHidden :name="name" :fieldData="attr"></PHidden>
        </div>

        <div v-if="attr.type == 'radio'">
          <PRadio :name="name" :fieldData="attr"></PRadio>
        </div>

        <div v-if="attr.type == 'repeater'">
          <PRepeater :name="name" :fieldData="attr"></PRepeater>
        </div>


      </div>
        <span class="input-group-btn">
        <!-- Add the "v-cloneya-add" directive to elements you wish to add the click listener
        that will clone the root element -->
        <button type="button" class="btn btn-success" tabindex="-1" v-cloneya-add>
            Add
        </button>
          <!-- Add the "v-cloneya-remove" directive to elements you wish to add the click listener
          that will remove the element -->
        <button type="button" class="btn btn-danger" tabindex="-1"  v-cloneya-remove>
          Delete
        </button>
      </span>

      </div>
    </vue-cloneya>
    </fieldset>
    </div>


<!--  </div>-->
</template>

<script>
    import PText from './Text';
    import PEmail from './Email';
    import PSelect from './Select';
    import PHidden from './Hidden';
    import PRadio from './Radio';

    export default {
        props:['fieldData','name'],
        components:{
            PText,
            PEmail,
            PSelect,
            PHidden,
            PRadio,

        },
        data(){
            return {
                fields : '',
            }
        },
        mounted() {
            this.fields = this.fieldData.repeater_fields;
        }
    }
</script>

<style>
  .field{
    /*padding:20px;*/
    /*border:1px solid;*/
  }
</style>
