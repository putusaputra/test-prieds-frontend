<script setup>
import HomeItemFrame from "./HomeItemFrame.vue";
</script>

<template>
  <HomeItemFrame>
    <template #content>
      <data-table
        :rows="tableData"
        :pagination="pagination"
        :query="query"
        :loading="isLoading"
        top-pagination
        striped
        sn
        filter
        @loadData="loadData"
      >
        <template #thead>
          <table-head>ID</table-head>
          <table-head>Name</table-head>
          <table-head>Address</table-head>
          <table-head>Phone Number</table-head>
          <table-head>Illness</table-head>
          <table-head>Visit Date</table-head>
          <table-head>Queue ID</table-head>
          <table-head>Queue Created Date</table-head>
        </template>

        <template #tbody="{ row }">
          <table-body v-text="row.id" />
          <table-body v-text="row.name" />
          <table-body v-text="row.address" />
          <table-body v-text="row.phoneNumber" />
          <table-body v-text="row.illness" />
          <table-body v-text="row.visitDate" />
          <table-body v-text="row.queueId" />
          <table-body v-text="row.queueCreatedDate" />
          <table-body>
            <div class="table-button">
                 <a :href="'/print-queue/' + row.id + '|' + row.queueId" class="btn btn-primary" target="_blank">Print Queue</a>
            </div>
          </table-body>
           

          <!-- <table-body v-text="row.trips ? row.trips.toLocaleString() : ''"/> -->

          <!-- <table-body>
                <div class="dt-flex dt-items-center">
                    <div class="dt-flex-shrink-0 dt-h-16 dt-w-16 dt-inline-flex dt-items-center">
                        <img class="dt-rounded-full"
                             :src="formatAirline(row.airline).logo"
                             :alt="formatAirline(row.airline).name">
                    </div>
                    <div class="dt-ml-4">
                        <a :href="formatUrl(formatAirline(row.airline).website)">
                            <p class="dt-text-sm dt-font-medium dt-text-gray-900" v-text="formatAirline(row.airline).name"/>
                        </a>
                        <p class="dt-text-sm dt-text-gray-400" v-text="formatAirline(row.airline).slogan"/>
                        <p class="dt-text-sm dt-text-gray-500" v-text="formatAirline(row.airline).head_quaters"/>
                    </div>
                </div>
            </table-body> -->
        </template>
      </data-table>
    </template>
  </HomeItemFrame>
</template>

<script>
import http from "../http-common";
import {
  DataTable,
  TableBody,
  TableHead,
} from "@jobinsjp/vue3-datatable/dist/vue3-datatable.umd";
import { ref } from "vue";

export default {
  components: { TableBody, TableHead, DataTable },
  // props: {
  //   data: { type: Array, required: true },
  // },
  data() {
    return {
      //   name: "",
      //   address: "",
      //   phoneNumber: "",
      //   illness: "",
      visitors: [],
      tableData: [],
      pagination: {},
      query: {
        search: "",
        page: 1,
        per_page: 10,
      },
      isLoading: false,
      loadData: [],
    };
  },
  created() {
    // const tableData = ref([]);
    // const pagination = ref({});
    // const query = ref({
    //   search: "putu",
    //   page: 1,
    //   per_page: 10,
    // });
    // const isLoading = ref(false);
    // const loadData = async (query) => {
    //   isLoading.value = true;
    //   const {
    //     data: { data, totalElements },
    //   } = await axios.get("/visitor/byName", {
    //     params: {
    //       name: query.search,
    //       page: query.page,
    //       size: query.per_page,
    //     },
    //   });
    //   tableData.value = data;
    //   pagination.value = {
    //     ...pagination.value,
    //     page: query.page,
    //     total: totalElements,
    //   };
    //   isLoading.value = false;
    // };
    // const formatAirline = (airline) =>
    //   Array.isArray(airline) ? airline[0] : airline;
    // const formatUrl = (url) => (url.startsWith("http") ? url : `http://${url}`);
    // return {
    //   tableData,
    //   pagination,
    //   query,
    //   isLoading,
    //   loadData,
    //   formatAirline,
    //   formatUrl,
    // };

    this.loadData = async (query) => {
      this.isLoading = true;
      const { data, headers } = await http.get("/visitor/byName", {
        params: {
          name: query.search,
          page: query.page,
          size: query.per_page,
        },
      });
      // console.log(data)
      this.tableData = data;
      this.pagination = {
        ...this.pagination,
        page: query.page,
        total: headers.totalElements,
      };
      this.isLoading = false;
    };
  },
  mounted() {},
  methods: {
    //   saveVisitor(e) {
    //       e.preventDefault()
    //       http
    //       .post('/visitor/save', {
    //           name: this.name,
    //           address: this.address,
    //           phoneNumber: this.phoneNumber,
    //           illness: this.illness
    //       })
    //       .then(response => console.log(response))

    //   },
    listVisitor() {
      http.get("/visitor/all").then((response) => {
        this.visitors = response.data;
      });
    },
    listVisitorByNameOrVisitDate(name, visitDate, page, size) {
      http
        .get("/visitor/byNameOrVisitDate", {
          params: {
            name: name,
            visitDate: visitDate,
            page: page,
            size: size,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.visitors = response.data;
        });
    },
    listVisitorByName(name, page, size) {
      http
        .get("/visitor/byName", {
          params: {
            name: name,
            page: page,
            size: size,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.visitors = response.data;
        });
    },
    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
  },
};
</script>



