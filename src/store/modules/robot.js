import axios from 'axios';

const BASE_API_URL = process.env.VUE_APP_ROBOT_API_BASE_URL ?? '';
export default {
  namespaced: true,
  state: {
    cart: [],
    parts: null,
  },
  mutations: {
    addRobotToCart(state, robot) {
      state.cart.push(robot);
    },
    updateParts(state, parts) {
      state.parts = parts;
    },
  },
  actions: {
    getParts({ commit }) {
      axios.get(`${BASE_API_URL}api/parts`)
        .then((result) => commit('updateParts', result.data))
        .catch((err) => console.log(err));
    },
    addRobotToCart({ commit, state }, robot) {
      const cart = [...state.cart, robot];
      return axios.post(`${BASE_API_URL}api/cart`, cart)
        .then(() => commit('addRobotToCart', robot))
        .catch((err) => console.log(err));
    },
  },
  getters: {
    cartSaleItems(state) {
      return state.cart.filter((item) => item.head.onSale);
    },
  },
};
