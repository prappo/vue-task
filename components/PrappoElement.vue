<template>
  <div>
    <div v-for="field in fields" v-bind="customHtmlAttributes">
      <div v-for="(attr , name) in field">

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

        <div v-if="attr.type == 'textarea'">
          <PTextarea :name="name" :fieldData="attr"></PTextarea>
        </div>


      </div>
    </div>

  </div>
</template>

<script>
import PText from './fields/Text';
import PEmail from './fields/Email';
import PSelect from './fields/Select';
import PHidden from './fields/Hidden';
import PRadio from './fields/Radio';
import PRepeater from './fields/Repeater';
import PTextarea from './fields/TextArea';

  export default {
      name: 'PrappoElement',
      props:['formData'],
      components:{
          PText,
          PEmail,
          PSelect,
          PHidden,
          PRadio,
          PRepeater,
          PTextarea

      },
      data(){
        return {
          text : 'Hi',
            fields : '',

        }
      },
      methods: {

      },

      mounted(){
        this.fields = this.formData.data.fields;
        console.log('Prappo Element here');
        console.log(this.formData.data.fields);
      },

      computed: {
        customHtmlAttributes:  function(){
          return {
            src: 'sdfs',
          }
        }
      }

  }
</script>
