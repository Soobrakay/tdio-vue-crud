<template>
  <footer>
    <h1>{{ message }}</h1>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: { message: String }
}
</script>

<style scoped>
footer {
  margin: auto;
}
</style>
