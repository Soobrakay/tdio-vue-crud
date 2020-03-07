<template>
  <app-blog />
</template>

<script>
import BlogEntries from '../components/BlogEntries.vue'

export default {
  name: 'Blog',
  components: { 'app-blog': BlogEntries }
}
</script>
