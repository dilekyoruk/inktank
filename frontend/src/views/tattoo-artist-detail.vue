<script>
import TattooArtistCard from '@/components/tattoo-artist-card.vue';
import { mapActions } from 'vuex';

export default {
  name: 'TattooArtistDetail',
  components: { TattooArtistCard },
  data() {
    return {
      tattooArtist: null,
    };
  },
  async created() {
    this.tattooArtist = await this.fetchTattooArtist(this.$route.params.id);
  },
  methods: {
    ...mapActions(['fetchTattooArtist']),
  },
};
</script>
<template lang="pug">
 .about
    h3 Back to list
    TattooArtistCard(:tattooArtist="tattooArtist" v-if="tattooArtist")
</template>
