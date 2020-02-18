<template>
<div class="content-container">
  <h1>Add a New User:</h1>
  <br>
  <div class="add-user-input">
    <label for="new-name">Name:</label>
    <input type="text" id="new-name" v-model="user.name"
      placeholder="Enter your name...">
    <label for="new-username">Username:</label>
    <input type="text" id="new-username" v-model="user.username"
      placeholder="Enter your username...">
    <label for="new-email">Email:</label>
    <input type="text" id="new-email" v-model="user.email"
      placeholder="Enter your email...">
    <br>
    <button type="submit" @click="addUser">Add User</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'AddUser',
  data () {
    return {
      user: {
        name: '',
        username: '',
        email: ''
      }
    }
  },
  methods: {
    addUser () {
      // bail if not all the properties are set
      if (!Object.keys(this.user).every((key) => this.user[key])) {
        return null
      }

      // emit the create-user action to the parent
      this.$emit('create-user', this.user)
      // clear the data
      this.user.name = ''
      this.user.username = ''
      this.user.email = ''
    }
  }
}
</script>

<style scoped>
.content-container {
  margin: auto;
}

.add-user-input label {
  float: left;
  width: 25%;
  margin-top: 6px;
  padding: 4px;
}

.add-user-input input,button {
  float: left;
  width: 75%;
  margin-top: 6px;
  padding: 4px;
  font-size: 1em;
}

.add-user-input input[type=text]:focus,button:focus {
  border-color:#333;
}

.add-user-input input[type=submit],button {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
