<script setup>
import PrintQueue from '@/components/PrintQueue.vue'
</script>

<template>
  <main>
    <PrintQueue :visitor-id="visitorId" />
  </main>
</template>

<script>
import http from '../http-common'

export default {
  props: ['visitorId'],
  data() {
    return {
    }
  },
  mounted() {
   
  },
  methods: {
      
  }
}
</script>
