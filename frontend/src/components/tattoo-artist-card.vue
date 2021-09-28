<script>
export default {
  name: 'TatooArtistCard',
  props: ['tattooArtist'],
};
</script>

<template lang="pug">
.box
    h1 {{tattooArtist.name}} ({{tattooArtist.location}})
</template>

<style lang="scss" scoped>
.box {
  padding: 2em;
  border: 1px solid #c80;
  background: #dd0;
  border-radius: 0.3rem;
}
</style>
