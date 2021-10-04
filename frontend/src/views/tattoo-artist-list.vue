<script>
// @ is an alias to /src
import TattooArtistCard from '@/components/tattoo-artist-card.vue';
import { mapActions } from 'vuex';

export default {
  name: 'TattooArtistList',
  components: {
    TattooArtistCard,
  },
  data() {
    return {
      tattooArtists: [],
    };
  },
  async created() {
    this.tattooArtists = await this.fetchTattooArtists();
  },
  methods: {
    ...mapActions(['fetchTattooArtists']),
  },
};
</script>

<template lang="pug">
  .home
    h1 Inktank
    h2 Tattoo Artists
    div(v-for="tattooArtist in tattooArtists")
      router-link(:to="`/tattoo-artists/${tattooArtist._id}`") {{ tattooArtist.name }}
</template>
