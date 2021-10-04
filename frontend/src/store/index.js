import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    async fetchUser(store, id) {
      const usersRequest = await axios.get(`/api/users/${id}`);
      return usersRequest.data;
    },
    async fetchUsers() {
      const usersRequest = await axios.get('/api/users');
      return usersRequest.data;
    },
    async fetchTattooArtists() {
      const tattooArtistsRequest = await axios.get('/api/tattoo-artists');
      return tattooArtistsRequest.data;
    },
    async fetchTattooArtist(store, id) {
      const tattooArtistRequest = await axios.get(`/api/tattoo-artists/${id}`);
      return tattooArtistRequest.data;
    },
    async fetchTattooArtistRatings(store, id) {
      const ratingRequest = await axios.get(`/api/tattoo-artists/${id}/ratings`);
      return ratingRequest.data;
    },
  },
  modules: {},
});
