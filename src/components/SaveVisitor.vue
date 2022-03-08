<script setup>
import HomeItemFrame from './HomeItemFrame.vue'
</script>

<template>
  <HomeItemFrame>
    <template #content>
      <div class="save-form">
        <form v-on:submit="saveVisitor">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" v-model="name" />
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">Address</label>
            <input type="text" class="form-control" v-model="address" />
          </div>
          <div class="mb-3">
            <label for="phoneNumber" class="form-label">Phone Number</label>
            <input type="text" class="form-control" v-model="phoneNumber" />
          </div>
          <div class="mb-3">
            <label for="illness" class="form-label">Illness</label>
            <input type="text" class="form-control" v-model="illness" />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </template>
  </HomeItemFrame>
</template>

<script>
import http from '../http-common'
export default {
  data() {
    return {
      name: "",
      address: "",
      phoneNumber: "",
      illness: ""
    }
  },
  mounted() {
  },
  methods: {
      saveVisitor(e) {
          e.preventDefault()
          http
          .post('/visitor/save', {
              name: this.name,
              address: this.address,
              phoneNumber: this.phoneNumber,
              illness: this.illness
          })
          .then(response => {
            if (response.data.success) {
              this.$swal('Saved','Visitor Saved!','success')
              this.name = ""
              this.address = ""
              this.phoneNumber = ""
              this.illness = ""
            }
          })

      }
  }
}
</script>
