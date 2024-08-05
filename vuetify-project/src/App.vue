

<script setup>
/*import Product from './components/product.vue'*/
import MainComponent from './components/MainComponent'
import CreateProduct from './components/CreateProduct.vue';
import ProductTable from './components/ProductTable.vue';
/*import product from'./components/product.vue';*/
import { computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const products = computed(() => store.state.products);
/*import ProductList from './components/ProductList.vue';*/
</script>
<template>
  
  <div id="app">

    <router-view />
 
  </div>
</template>