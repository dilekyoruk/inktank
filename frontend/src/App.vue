<script>
import axios from 'axios';
export default {
  name: 'App',
  async created() {
    console.log((await axios.get('/api/account/session')).data);
  },
};
</script>

<template lang="pug">
 #app
    #nav
      router-link(to="/") Home &nbsp
      router-link(to="/tattoo-artists") Tattoo Artists
    router-view

</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
