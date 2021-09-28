<script>
import TatooArtistCard from '@/components/tattoo-artist-card.vue';
import { mapActions } from 'vuex';

export default {
  name: 'TattooArtistDetail',
  components: { TatooArtistCard },
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
    h1 This is a tattoo artist detail
    TatooArtistCard(:tattooArtist="tattooArtist" v-if="tattooArtist")
</template>
