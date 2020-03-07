<template>
  <div class="content-container">
    <app-banner :message="message" :status="messageStatus"
      @clear-banner="clearMessage">
    </app-banner>
    <app-list-users :users="users" @delete-user="deleteUser"
      @edit-user="editUser" @cancel-edit-user="cancelEditUser"
      @update-user="updateUser">
    </app-list-users>
    <app-add-user @create-user="createUser"></app-add-user>
  </div>
</template>

<script>
import AddUser from ',/AddUser.vue'
import Banner from ',/Banner.vue'
import ListUsers from ',/ListUsers.vue'
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
    deleteUser (user) {
      axios.delete(`https://jsonplaceholder.typicode.com/users/${user.id}`)
        .then((response) => {
          this.messageStatus = 'Success'
          this.message = `SUCCESS! User #${user.id} was deleted!`
          this.users.splice(this.users.indexOf(user), 1)
        })
        .catch((error) => {
          this.messageStatus = 'Error'
          this.message = `ERROR! Unable to delete user #${user.id}!`
          console.log(error.message)
        })
        .finally((response) => {
          console.log('DELETE finished!')
        })
    },
    editUser (user) {
      console.log(`editUser(${user})`)
      console.log('editUser-pre-forEach')
      this.users.forEach(function (arrayUser) { arrayUser.editing = false })
      this.users[this.users.indexOf(user)].editing = true
    },
    cancelEditUser (user) {
      console.log(`cancelEditUser(${user})`)
      this.users[this.users.indexOf(user)].editing = false
    },
    updateUser (user) {
      const putUser = {
        name: user.name,
        username: user.username,
        email: user.email
      }
      axios.put(
        `https://jsonplaceholder.typicode.com/users/${user.id}`, putUser
      ).then((response) => {
        this.messageStatus = 'Success'
        this.message = `SUCCESS! User #${user.id} was updated!`

        this.users[user.index].name = user.name
        this.users[user.index].username = user.username
        this.users[user.index].email = user.email
        this.users[user.index].editing = false
      }).catch((error) => {
        this.messageStatus = 'Error'
        this.message = `ERROR! Unable to update user #${user.id}!`
        console.log(error.message)

        this.users[user.index].editing = false
      }).finally((response) => {
        console.log('PUT finished!')
      })
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
  padding: 4px;
}
</style>
