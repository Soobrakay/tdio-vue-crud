<template>
  <div class="content-container">
    <h1>List of Users:</h1>
    <br>
    <table id="users-table">
      <tr>
        <th>User ID</th>
        <th class="text-input-column">Name</th>
        <th class="text-input-column">Username</th>
        <th class="text-input-column">Email</th>
        <th class="action-column">Actions</th>
      </tr>
      <tr v-for="(user, index) in users" v-bind:key="user.id">
        <td>{{ user.id }}</td>
        <td>
          <input type="text" v-model="inputName" v-show="user.editing">
          <span v-show="!user.editing">{{ user.name }}</span>
        </td>
        <td>
          <input type="text" v-model="inputUsername" v-show="user.editing">
          <span v-show="!user.editing">{{ user.username }}</span>
        </td>
        <td>
          <input type="email" v-model="inputEmail" v-show="user.editing">
          <span v-show="!user.editing">{{ user.email }}</span>
        </td>
        <td>
          <button class="delete-user" @click="deleteUser(user)">Delete</button>
          <button class="edit-user" @click="editUser(user)"
            v-show="!user.editing">Edit</button>
          <button class="cancel-edit-user" @click="cancelEditUser(user)"
            v-show="user.editing">Cancel</button>
          <button class="update-user" @click="updateUser(index)"
            v-show="user.editing">Update</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ListUsers',
  props: {
    users: Array
  },
  data () {
    return {
      inputId: 0,
      inputName: '',
      inputUsername: '',
      inputEmail: ''
    }
  },
  methods: {
    clearInputs () {
      this.inputId = 0
      this.inputName = ''
      this.inputUsername = ''
      this.inputEmail = ''
    },
    deleteUser (user) {
      this.$emit('delete-user', user)
    },
    editUser (user) {
      this.$emit('edit-user', user)

      this.inputId = user.id
      this.inputName = user.name
      this.inputUsername = user.username
      this.inputEmail = user.email
    },
    cancelEditUser (user) {
      this.$emit('cancel-edit-user', user)
      this.clearInputs()
    },
    updateUser (index) {
      const user = {
        index: index,
        id: this.inputId,
        name: this.inputName,
        username: this.inputUsername,
        email: this.inputEmail
      }

      this.$emit('update-user', user)
      this.clearInputs()
    }
  }
}
</script>

<style scoped>
td, th {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4CAF50;
  color: white;
}

button {
  padding: 4px;
  border-radius: 4px;
  font-size: 0.8em;
  margin: 0 4px;
}

.delete-button:hover, .cancel-edit-button:hover {
  color: red;
  cursor: pointer;
}

.edit-button:hover {
  color: green;
  cursor: pointer;
}

input {
  font-size: 0.8em;
}

.text-input-column {
  padding-right: 2em;
  min-width: 140px;
}

.action-column {
  padding-right: 8em;
}
</style>
