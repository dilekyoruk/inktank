<script>
export default {
  name: 'UserCard',
  props: ['user'],
};
</script>

<template lang="pug">
.box
    h1 {{user.name}} ({{user.location}})
    p Bio: {{ user.bio}}
    h2 Photos ({{ user.savedPhotos.length}})
</template>

<style lang="scss" scoped>
.box {
  padding: 2em;
  border: 1px solid #c80;
  background: #dd0;
  border-radius: 0.3rem;
}
</style>
