<template>
  <div class="blog-entries">
    <div v-for="entry in blog_entries" :key="entry.index" class="blog-card">
      <div class="blog-title">
        <h2>{{ entry.title }}</h2>
      </div>
      <div class="blog-summary">
        <p>{{ entry.summary }}</p>
      </div>
      <div class="blog-entry-date">
        <p>{{ entry.date }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogEntries',
  data () {
    return {
      blog_entries: [
        {
          index: 1,
          title: 'My Favorite Aspects of Vue',
          summary: 'This blog post describes my favorite aspects of Vue and ' +
            'how I came to pick Vue as my favorite JavaScript framework.',
          date: 'December 11th, 2019'
        },
        {
          index: 2,
          title: 'How to Use Components to Build Complex Web Applications',
          summary: 'This blog post describes the details of how to create ' +
            're-usable Vue components that can be easily integrated together ' +
            'to make complex web applications.',
          date: 'November 27th, 2019'
        },
        {
          index: 3,
          title: 'Unit Testing a Vuex Store',
          summary: 'This blog post describes how to unit test a Vuex Store.',
          date: 'November 16th, 2019'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
