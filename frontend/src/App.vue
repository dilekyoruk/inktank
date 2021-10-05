<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  methods: {
    ...mapActions(['logout']),
    async doLogout() {
      await this.logout();
      this.$router.push('/login');
    },
  },
};
</script>

<template lang="pug">
 #app
    #nav
      router-link(to="/") Home &nbsp
      router-link(to="/tattoo-artists") Tattoo Artists &nbsp
      router-link(to="/profile") Profile &nbsp
      router-link(to="/login") Login &nbsp
      router-link(to="/register") Register &nbsp
      a(@click="doLogout" href="#") Logout
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
