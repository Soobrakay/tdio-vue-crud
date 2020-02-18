<template>
  <div class="content-container">
    <app-list-users :users="users" v-if="showUsers"></app-list-users>
    <app-add-user @create-user="createUser"></app-add-user>
    <button @click="deleteListOfUsers">Delete the List of Users!</button>
  </div>
</template>

<script>
import AddUser from '@/components/AddUser.vue'
import ListUsers from '@/components/ListUsers.vue'
import axios from 'axios'

export default {
  name: 'Content',
  components: {
    'app-add-user': AddUser,
    'app-list-users': ListUsers
  },
  data () {
    return {
      // {id: integer, name: string, username: string, email: string}
      users: [],
      showUsers: true
    }
  },
  methods: {
    createUser (user) {
      const newUser = {
        id: this.users.length + 1,
        name: user.name,
        username: user.username,
        email: user.email
      }
      this.users.push(newUser)
    },
    deleteListOfUsers () {
      this.showUsers = false
    }
  },
  created () {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        console.log('Received response:')
        console.log(response)

        const mountedUsers = response.data.map((user) => {
          user.editing = false
          return user
        })
        this.users = mountedUsers
      })
      .catch((error) => {
        console.log(error.message)
        this.message = 'ERROR! Unable to load USER data!'
        this.messageStatus = 'Error'
      })
      .finally((response) => {
        console.log('User GET Finished!')
      })
  }
}
</script>

<style scoped>
div {
  margin: auto;
  padding: 4em;
}
</style>
