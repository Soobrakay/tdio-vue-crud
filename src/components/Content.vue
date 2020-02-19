<template>
  <div class="content-container">
    <app-banner :message="message" :status="messageStatus"
      @clear-banner="clearMessage">
    </app-banner>
    <app-list-users :users="users" v-if="showUsers"></app-list-users>
    <app-add-user @create-user="createUser"></app-add-user>
    <button @click="deleteListOfUsers">Delete the List of Users!</button>
  </div>
</template>

<script>
import AddUser from '@/components/AddUser.vue'
import Banner from '@/components/Banner.vue'
import ListUsers from '@/components/ListUsers.vue'
import axios from 'axios'

export default {
  name: 'Content',
  components: {
    'app-add-user': AddUser,
    'app-banner': Banner,
    'app-list-users': ListUsers
  },
  data () {
    return {
      // {id: integer, name: string, username: string, email: string}
      users: [],
      showUsers: true,
      message: '',
      messageStatus: 'Info'
    }
  },
  methods: {
    clearMessage () {
      this.message = ''
      this.messageStatus = 'Info'
    },
    createUser (user) {
      const newUser = {
        id: this.users.length + 1,
        name: user.name,
        username: user.username,
        email: user.email,
        editing: false
      }
      axios.post('https://jsonplaceholder.typicode.com/users', newUser)
        .then((response) => {
          this.message = 'SUCCESS! User data was saved!'
          this.messageStatus = 'Success'
          this.users.push(newUser)
        })
        .catch((error) => {
          this.messageStatus = 'Error'
          this.message = 'ERROR! Unable to save user data!'
          console.log(error.message)
        })
        .finally((response) => {
          console.log('User POST Finished!')
        })
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

        this.users = response.data.map((user) => {
          user.editing = false
          return user
        })
        this.message = 'SUCCESS! Loaded USER data!'
        this.messageStatus = 'Success'
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
