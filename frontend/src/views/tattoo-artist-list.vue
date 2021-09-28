<script>
// @ is an alias to /src
import TatooArtistCard from '@/components/tattoo-artist-card.vue';
import { mapActions } from 'vuex';

export default {
  name: 'TattooArtistList',
  components: {
    TatooArtistCard,
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
    div(v-for="tattooArtist in tattooArtists" :tattooArtist="tattooArtist")
      router-link(:to="`/tattoo-artists/${tattooArtist._id}`") {{ tattooArtist.name }}
</template>
