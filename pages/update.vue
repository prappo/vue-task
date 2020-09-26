<template>
  <div class="container">
    <div class="app">

      <vs-card>
        <template #title>
          <h3 class="title">Auto generated Form</h3>
        </template>
        <template #img>
          <img :src="randomImage(images)" alt="">
        </template>
        <template #text>
          <form @submit="validateDataAndSubmit">

            <PrappoElement v-if="status" :formData="formData"></PrappoElement>
            <hr style="margin-top: 5px;background-color: #F4F7F8">
            <div style="text-align: center;width: 100% !important;">
              <vs-button success :loading="loading" block>Update</vs-button>
            </div>
          </form>
        </template>

      </vs-card>
      <p style="font-size: 15px !important;padding:10px">Made with ♥️ by Prappo</p>
    </div>
  </div>
</template>

<script>
    import axios from 'axios';
    import PrappoElement from '~/components/PrappoElement';


    export default {
        data() {
            return {
                endPoint: 'https://trino-lab.com/test/api/get_form.php?id=111',
                submitEndpoint: 'https://trino-lab.com/test/api/submit_form.php',
                formData: null,
                status: false,
                active: false,
                loading: false,
                time: 6000,
                progress: 0,
                allValidated: true,
                images: [
                    'https://ffwallpaper.com/thumb/cyberpunk/cyberpunk-5.png',
                    'https://c4.wallpaperflare.com/wallpaper/843/56/876/ghost-in-the-shell-ghost-in-the-shell-cyberpunk-futuristic-city-wallpaper-preview.jpg',
                ],
            }
        },
        components: {
            PrappoElement,
        },
        mounted() {
            const loading = this.$vs.loading({
                type: 'default'
            })
            axios.get(this.endPoint).then((response) => {
                this.formData = response.data;
                if (response.data.status == 'success') {
                    loading.close();
                    this.openNotification('top-left', 'success', 'Success', 'Form data loaded successfully')
                }
            }).catch((error) => {
                loading.close()
                this.openNotification('top-left', 'danger', 'Error', 'Unable to load form data from the given URL. Make sure the Endpoint is live')
            });

            this.$root.$on('validation_status', filter => {
                this.allValidated = filter;
                console.log(filter);
            })


        },
        watch: {
            'formData': function (newVal) {
                if (newVal != null) {
                    this.status = true;
                }
            },

        },
        methods: {
            openNotification(position = null, color, title, message) {
                const noti = this.$vs.notification({
                    color,
                    position,
                    title: title,
                    text: message
                })
            },

            validateDataAndSubmit(e) {
                this.loading = true;
                e.preventDefault();
                // console.log(e.target.elements);
                if (!this.allValidated) {
                    this.openNotification('top-left', 'danger', 'Ops !', 'Validation Error. You must input valid data in all fields according to their validation requirements')
                } else {
                    this.openNotification('top-left', 'success', 'Awesome !', 'All data validated');
                    axios.get(this.submitEndpoint)
                        .then((response) => {
                            console.log(response.data);
                            this.loading = false;
                            if (response.data.status == 'success') {
                                this.openNotification('top-left', 'success', 'Yahooo !', 'Form data submitted success fully . <br> And it said' + response.data.messages[0]);
                            }

                        })
                        .catch((error) => {
                            this.loading = false;
                            console.log(error);
                            this.openNotification('', 'danger', 'Error', 'Something went wrong. Can not submit the form ');
                        });
                }
            },

            randomImage(items) {

                return items[Math.floor(Math.random() * items.length)];

            }
        }
    }
</script>

<style>
  .app {
    margin-top: 20px;
    /*padding: 10px;*/
    /*width: 500px;*/
  }

  body {
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
