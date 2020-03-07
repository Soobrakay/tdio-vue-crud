<template>
  <nav>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <li><router-link to="/blog">Blog</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style scoped>
nav {
  margin: auto;
}

ul {
  list-style: none;
}

li {
  display: inline-block;
  padding-left: 1em;
  font-size: 1.5em;
}

li a {
  text-decoration: none;
  color: white;
}

#nav a.router-link-exact-active {
  color: purple;
  position: relative;
}

nav a.router-link-exact-active:after {
  position: absolute;
  content: '';
  height: 3px;
  left: 0;
  bottom: -10px;
  background: purple;
  width: 100%;
}

</style>
