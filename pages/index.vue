<template>
  <div class="container">
    <div class="app">

      <vs-card>
        <template #title>
          <h3 class="title">Auto generated Form</h3>
        </template>
        <template #img>
          <img src="https://i.pinimg.com/originals/44/f4/36/44f436521184885231ff158e27638eb7.jpg" alt="">
        </template>
        <template #text>
      <form>

      <PrappoElement v-if="status" :formData="formData"></PrappoElement>

        <vs-button>Submit</vs-button>
      </form>
        </template>

        <template #interactions>

          <vs-button  class="btn-chat" shadow primary>
            <i class='bx bx-chat' ></i>
            <span class="span">
              <marquee> <b>All Submissions ( List ) </b></marquee>
        </span>
          </vs-button>
        </template>
      </vs-card>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import PrappoElement from '~/components/PrappoElement';


  export default {
    data() {
      return {
        endPoint: 'https://vuejstask.prappo.repl.co/api/get_form.php',
        formData: null,
        status: false,
          active: false,
          time: 6000,
          progress: 0
      }
    },
    components: {
      PrappoElement,
    },
    mounted() {
        const loading = this.$vs.loading({
            text: 'Loading Form ...'
        })
      axios.get(this.endPoint).then((response) => {
        this.formData = response.data;
        if(response.data.status == 'success'){
          loading.close();
          this.openNotification('top-center','success','Success','Form data loaded successfully')
        }
      }).catch((error) => {
          loading.close()
          this.openNotification('top-center','danger','Error','Unable to load form data from the given URL. Make sure the Endpoint is live')
      });

        this.$root.$on('validation_status', filter => {
            console.log(filter);
        })


    },
    watch: {
      'formData' : function(newVal){
        if(newVal != null ){
          this.status = true;
        }
      },

    },
      methods:{
          openNotification(position = null, color,title,message) {
              const noti = this.$vs.notification({
                  color,
                  position,
                  title: title,
                  text: message
              })
          }
      }
  }
</script>

<style>
  .app {
    /*padding: 10px;*/
    /*width: 500px;*/
  }

  body{
    background-color: #F4F7F8;
    font-family: 'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
    display: block;
    font-weight: 300;
    font-size: 55px;
    color: #35495e;
    letter-spacing: 1px;
    text-transform: capitalize;
    margin: 25px 0;
  }

  .container {
    margin: 0 auto;
    min-height: 100vh;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family: 'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
    display: block;
    font-weight: 300;
    font-size: 55px;
    color: #35495e;
    letter-spacing: 1px;
    text-transform: capitalize;
    margin: 25px 0;
  }

  .subtitle {
    font-weight: 300;
    font-size: 1.1rem;
    color: #526488;
    word-spacing: 2px;
    padding-bottom: 15px;
    max-width: 600px;
  }

  .subtitle a {
    font-weight: 500;
    color: inherit;
  }

  .links {
    padding-top: 15px;
    margin-bottom: 20px;
  }

  .content-logos {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 500px;
  }

  .plus {
    font-size: 2.5rem;
    margin: 15px;
    color: #35495e;
  }

  .h3 {
    font-family: 'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
    font-weight: 400;
    margin: 10px;
  }
</style>
