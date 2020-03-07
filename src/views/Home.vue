<template>
  <app-content class="data-content"></app-content>
</template>

<script>
import Content from '../components/Content.vue'

export default {
  name: 'Home',
  components: { 'app-content': Content }
}
</script>
