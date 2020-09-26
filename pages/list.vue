<template>
  <div class="listContainer">
    <div v-show="!status">
      <h1 style="width: 100% !important; text-align: center !important;">Unable to load table 😭</h1>
      <p style="text-align: center">Because it is rules not to show table if status is false 😒</p>
    </div>
    <div v-show="status">


      <div class="center">
        <vs-table>
          <template #header>
            <vs-input v-model="search" border placeholder="Search"/>
          </template>
          <template #thead>
            <vs-tr :key="i" v-for="(data , i) in headers">
              <vs-th :key="j" v-for="(header , j) in data">
                {{ header.title }}
              </vs-th>

            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr v-for="(rowData,j) in rows">
              <!--              {{ Object.keys(rowData).length }}-->

              <vs-td v-for="(row,rowName,i) in rowData" v-if="inRow(rowName)">
                 {{ row }}

              </vs-td>


            </vs-tr>
          </template>
        </vs-table>
      </div>


      <!--      <vs-table>-->
      <!--        <template #thead>-->
      <!--          <vs-tr :key="i" v-for="(data , i) in headers">-->
      <!--            <vs-td :key="j" v-for="(header , j) in data"> {{ header.title }}</vs-td>-->
      <!--          </vs-tr>-->

      <!--        </template>-->
      <!--        <template #tbody>-->
      <!--          <vs-tr v-for="(rowData,i) in rows">-->
      <!--            <vs-td v-for="(row, j) in rowData"> {{ row }}</vs-td>-->
      <!--          </vs-tr>-->
      <!--        </template>-->
      <!--      </vs-table>-->
    </div>
  </div>
</template>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
                status: false,
                search: '',
                tableData: null,
                headers: null,
                rows: null,
                rowNames: [],
                endPoint: 'https://trino-lab.com/test/api/list.php',
            }
        },

        watch: {
            'tableData': function (newVal) {
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

            addToObject(obj, key, value, index) {

                // Create a temp object and index variable
                var temp = {};
                var i = 0;

                // Loop through the original object
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) {

                        // If the indexes match, add the new item
                        if (i === index && key && value) {
                            temp[key] = value;
                        }

                        // Add the current item in the loop to the temp obj
                        temp[prop] = obj[prop];

                        // Increase the count
                        i++;

                    }
                }

                // If no index, add to the end
                if (!index && key && value) {
                    temp[key] = value;
                }

                return temp;

            },

            inRow(rowName) {

                for (const [key, value] of Object.entries(this.headers)) {
                    for (const [k, v] of Object.entries(value)) {
                        if (rowName == k) {
                            return true;
                        }
                    }
                }
            }

        },
        mounted() {

            const loading = this.$vs.loading();

            axios.get(this.endPoint)
                .then((response) => {
                    if (response.data.status == 'success') {
                        this.tableData = response.data.data;
                        this.headers = response.data.data.headers;
                        this.rows = response.data.data.rows;
                        this.status = true;
                        console.log(this.headers)
                        this.openNotification('bottom-left', 'success', 'Awesome 😍!', 'Received data from server . Let me generate the table for you 😘')
                    } else {
                        this.openNotification('bottom-right', 'danger', 'Ops !', 'Data status is false the reason why I am not going to show the table 😏 ')
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
  .listContainer {
    margin-top: 80px !important;
    padding: 20px !important;
  }
</style>
