<script>
import { mapActions } from 'vuex';
export default {
  name: 'TattooArtistCard',
  props: ['tattooArtist'],
  data() {
    return {
      tattooArtistRating: null,
    };
  },
  async created() {
    this.tattooArtistRating = await this.fetchTattooArtistRatings(this.$route.params.id);
  },
  methods: {
    ...mapActions(['fetchTattooArtistRatings']),
  },
};
</script>

<template lang="pug">
.box
    h1 {{tattooArtist.name}}
    p Lives in {{tattooArtist.location}}
    h3 Rating: {{tattooArtistRating}} out of 5 ({{tattooArtist.ratings.length}} ratings)
    h3 Followers: {{tattooArtist.followers.length}}
    button Book
    button Follow
    div(v-if = "tattooArtist.photos.length")
      h3 Photos:{{tattooArtist.photos.length}}
      img(:src= "'/api/tattoo-artists/photos/' + tattooArtist.photos[0].filename" width='200px' height='200px')
      p {{tattooArtist.photos[0].description}}
    button like
    button comment
    button share
    button save
</template>

<style lang="scss" scoped>
.box {
  padding: 2em;
  border: 1px solid #212121;
  background: #0f0e0e;
  border-radius: 0.3rem;
}
button {
  cursor: pointer;
  display: inline-block;
  background: #9f9f9f;
  color: 0f0e0e;
  font-size: 12;
  font-weight: bold;
  border-radius: 0.3rem;
  padding: 0.5rem 1.5rem;
  margin: 0.1rem;
}
h3 {
  color: white;
}
h1 {
  color: white;
}
img {
  border: 1px solid white;
  border-radius: 0.8rem;
}
p {
  color: white;
}
</style>
