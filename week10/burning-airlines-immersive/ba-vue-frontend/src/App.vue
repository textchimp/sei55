<template>
  <div id="app">
    <header>
    <h1>BUUUUURRRRNNNIIINNNGG AAAAAIIIIRRRRLLLLIIINNNEESSS</h1>
      <nav>
        <router-link to="/">Home</router-link>
        |
        <router-link to="/search">Flight Search</router-link>
      </nav>
    </header>
    <hr/>
    <router-view/>
  </div>
</template>

<script>

// 'SINGLE-FILE COMPONENT' - wtf happened to separation of concerns?

export default {
  name: 'App'
}
</script>

<style scoped>
div{

}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
