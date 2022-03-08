<script setup>
import HomeItemFrame from './HomeItemFrame.vue'
</script>

<template>
  <div class="barcode-wrapper" style="width:450px">
    <div class="barcode-header">
      <div class="header-title text-center fw-bold">ALMEGATEX</div>
      <hr>
      <div class="text-center mb-2">Nomor Antrian anda</div>
      <div class="text-center fw-bolder fs-1">{{ queueData.queueId }}</div>
      <div class="text-center mt-2">Mohon Menunggu</div>
    </div>
    <div class="barcode-content mt-2">
      <svg id="barcode"></svg>
      <div class="tanggal mt-2 text-center">{{ formatDate(queueData.queueCreatedDate) }}</div>
    </div>
    <hr>
    <div class="barcode-footer">
      <div class="text-center fw-bold">Budayakan antri untuk kenyamanan bersama</div>
      <div class="text-center fw-bold">Terima kasih atas kunjungan anda</div>
    </div>
  </div>
</template>

<script>
import http from '../http-common'
import JsBarcode from 'jsbarcode'
import moment from 'moment'

export default {
  props: ['visitorId'],
  data() {
    return {
      name: "",
      address: "",
      phoneNumber: "",
      illness: "",
      queueData:{},
      paramQueueId: this.visitorId.split('|')[1],
      paramVisitorId: this.visitorId.split('|')[0],
      barcodeValue: null
    }
  },
  created() {
    
    this.barcodeValue = this.paramVisitorId + this.paramQueueId
    this.getQueueByVisitorId(this.paramVisitorId)
  },
  mounted() {
    JsBarcode("#barcode", this.barcodeValue, {
      format: "CODE39",
      width: 4,
      displayValue: false
    });
  },
  methods: {
    getQueueByVisitorId(visId) {
      http
        .get("/visitor/" + visId)
        .then((response) => {
          this.queueData = response.data;
        });
    },
    formatDate(str) {
      return moment(str).format("DD-MM-YYYY HH:mm:ss A")
    }
  }
}
</script>