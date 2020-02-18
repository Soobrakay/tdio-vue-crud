<template>
  <div v-show="message" :style="{ 'background-color': color }">
    <span id="banner-clear-button" @click="clearBannerMessage">Clear</span>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  props: {
    message: String,
    status: String
  },
  methods: {
    clearBannerMessage () {
      this.$emit('clear-banner')
    }
  },
  computed: {
    color () {
      switch (this.status) {
        case 'Error':
          return 'red'
        case 'Success':
          return 'green'
        default:
          return 'blue'
      }
    }
  }
}
</script>

<style scoped>
div {
  display: inline-block;
  margin-bottom: 15px;
  width: 100%;
}

span, p {
  color: white;
  padding: 15px;
  width: auto;
}

#banner-clear-button {
  float: right;
}

#banner-clear-button:hover {
  color: black;
  cursor: pointer;
}
</style>
