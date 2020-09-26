<template>
  <div class="listContainer">
    
  </div>
</template>

<script>
  import axios from "axios";

  export default {
      data(){
          return {
              status: false,
              search:'',
              tableData : null,
              headers : null,
              rows : null,
              endPoint: 'https://vuejstask.prappo.repl.co/api/list.php',
          }
      },

      // watch: {
      //     'tableData': function (newVal) {
      //         if (newVal != null) {
      //             this.status = true;
      //         }
      //     },
      //
      // },
      mounted() {

          const loading = this.$vs.loading();

          axios.get(this.endPoint)
              .then((response) => {
                  if(response.data.status == 'success'){
                      this.tableData = response.data.data;
                      this.headers = response.data.data.headers;
                      this.rows = response.data.data.rows;
                      this.status = true;
                      console.log(this.headers)
                  }
                  loading.close();
              })
              .catch((error) => {
                  loading.close();
                  console.log('Error')
              })
      }
  }
</script>

<style>
  .listContainer{
    margin-top: 80px !important;
    padding:20px !important;
  }
</style>
