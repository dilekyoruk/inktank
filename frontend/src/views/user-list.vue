<script>
// @ is an alias to /src
import UserCard from '@/components/user-card.vue';
import { mapActions } from 'vuex';

export default {
  name: 'UserList',
  components: {
    UserCard,
  },
  data() {
    return {
      users: [],
    };
  },
  async created() {
    this.users = await this.fetchUsers();
  },
  methods: {
    ...mapActions(['fetchUsers']),
  },
};
</script>

<template lang="pug">
  .home
    h1 Inktank
    h2 Users
    div(v-for="user in users")
      router-link(:to="`/users/${user._id}`") {{ user.name }}
</template>
