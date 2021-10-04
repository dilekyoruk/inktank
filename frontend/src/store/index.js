import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const mutations = {
  INCREMENT_COUNT: 'increment count',
  SET_USER: 'set user',
};

const store = new Vuex.Store({
  state: {
    count: 0,
    user: null,
  },
  mutations: {
    [mutations.INCREMENT_COUNT](state) {
      state.count++;
    },
    [mutations.SET_USER](state, user) {
      state.user = user;
    },
  },
  actions: {
    incrementCount({ commit }) {
      commit(mutations.INCREMENT_COUNT);
    },
    async fetchUser(store, id) {
      const usersRequest = await axios.get(`/api/users/${id}`);
      return usersRequest.data;
    },
    async fetchUsers() {
      const usersRequest = await axios.get('/api/users');
      return usersRequest.data;
    },
    async fetchSession({ commit }) {
      const user = await axios.get('/api/account/session');
      commit(mutations.SET_USER, user.data || null);
    },
    async login({ commit }, credentials) {
      try {
        const user = await axios.post('/api/account/session', credentials);
        commit(mutations.SET_USER, user.data);
      } catch (e) {
        throw e;
      }
    },
    async register(store, user) {
      return axios.post('/api/account', user);
    },
    async logout({ commit }) {
      await axios.delete('/api/account/session');
      commit(mutations.SET_USER, null);
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

export default async function init() {
  await store.dispatch('fetchSession');
  return store;
}
