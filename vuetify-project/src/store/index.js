import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    products: [],
    currentProduct: {},
    searchQuery: '',
    pagination: {
      currentPage: 1,
      lastPage: 1,
      totalItems: 0,
      itemsPerPage: 3,
    },
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_CURRENT_PRODUCT(state, product) {
      state.currentProduct = product;
    },
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query;
    },
    SET_PAGINATION(state, pagination) {
      state.pagination.currentPage = pagination.current_page;
      state.pagination.lastPage = pagination.last_page;
      state.pagination.totalItems = pagination.total;
      state.pagination.itemsPerPage = pagination.per_page;
    },
    SET_CURRENT_PAGE(state, page) {
      state.pagination.currentPage = page;
    },
  },
  actions: {
    async fetchProducts({ commit, state }) {
      try {
        // Fetch products with pagination
        const response = await axios.get(`http://127.0.0.1:8000/api/products?page=${state.pagination.currentPage}&per_page=${state.pagination.itemsPerPage}`);
        commit('SET_PRODUCTS', response.data.data);
        commit('SET_PAGINATION', {
          current_page: response.data.current_page,
          last_page: response.data.last_page,
          total: response.data.total,
          per_page: response.data.per_page,
        });
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async fetchProduct({ commit }, productId) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${productId}`);
        commit('SET_CURRENT_PRODUCT', response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    },
    async createProduct({ dispatch }, product) {
      try {
        await axios.post('http://127.0.0.1:8000/api/products', product);
        dispatch('fetchProducts');
      } catch (error) {
        
        console.error('Create Product Error:', error);
        throw error.response.data; 
      }
    },
    async deleteProduct({ dispatch }, productId) { 
      try {
        await axios.delete(`http://127.0.0.1:8000/api/products/${productId}`);
        dispatch('fetchProducts');
      } catch (error) {
        console.error('Delete Product Error:', error);
      }
    },
    async updateProduct({ dispatch }, product) {
      try {
        await axios.put(`http://127.0.0.1:8000/api/products/${product.id}`, product);
        dispatch('fetchProducts');
      } catch (error) {
        console.error('Update Product Error:', error);
        throw error.response.data;
      }
    },
    changePage({ commit, dispatch }, page) {
      commit('SET_CURRENT_PAGE', page);
      dispatch('fetchProducts');
    },
  },
  getters: {
    filteredProducts(state) {
      if (state.searchQuery) {
        return state.products.filter(product =>
          product.name.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      }
      return state.products;
    },
    product(state) {
      return state.currentProduct;
    },
    pagination(state) {
      return state.pagination;
    },
  },
});
