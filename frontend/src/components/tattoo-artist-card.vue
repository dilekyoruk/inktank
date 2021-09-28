<script>
export default {
  name: 'TatooArtistCard',
  props: ['tattooArtist'],
};
</script>

<template lang="pug">
.box
    h1 {{tattooArtist.name}} ({{tattooArtist.location}})
    p Photos: {{tattooArtist.photos[0].description}}
    img(:src= "'/api/tattoo-artists/photos/' + tattooArtist.photos[0].filename" width='130px' height='130px')
    p Ratings: {{tattooArtist.ratings}}
    p Followers: {{tattooArtist.followers}}
    p Available Times: {{tattooArtist.availableTimes}}
</template>

<style lang="scss" scoped>
.box {
  padding: 2em;
  border: 1px solid #c80;
  background: #dd0;
  border-radius: 0.3rem;
}
</style>
