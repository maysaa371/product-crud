<template>
   
    <!-- Include Header Component -->
     <!-- <HeaderComponent />-->
  <div class="container my-5">
    <h2 class="text-center mb-4">Product Management</h2>

    <div class="row mb-4">
      <div class="col-md-6">
        <router-link to="/create-product">
          <button class="btn btn-primary">Add Product</button>
        </router-link>
      </div>
      <div class="col-md-6">
        <input
          type="text"
          class="form-control"
          placeholder="Search products..."
          v-model="searchQuery"
          @input="searchProducts"
        />
      </div>
    </div>

    <!-- Product List -->
    <div class="card">
      <div class="card-header">
        <h5>Product List</h5>
      </div>
      <div class="card-body p-0">
        <table class="table table-striped table-responsive" >
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in paginatedProducts" :key="product.id">
              <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.quantity }}</td>
              <td class="flex-wrap">
                <button
                  class="btn btn-info btn-custom btn-sm me-2"
                  @click="navigateToEdit(product)"
                >
                <i class="fas fa-edit"></i>
                </button>
                <button @click="deleteProductById(product.id)" class="btn  btn-custom  btn-danger">
                  <i class="fas fa-trash"></i>
    </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="pagination-controls mt-4">
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="changePage(currentPage - 1)">Previous</button>
          </li>
          <li
            class="page-item"
            :class="{ active: pageNumber === currentPage }"
            v-for="pageNumber in totalPages"
            :key="pageNumber"
          >
            <button class="page-link" @click="changePage(pageNumber)">
              {{ pageNumber }}
            </button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="changePage(currentPage + 1)">Next</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    ...mapGetters(['filteredProducts', 'pagination']),
    totalPages() {
      return this.pagination.lastPage;
    },
    paginatedProducts() {
      return this.filteredProducts.slice(0, this.itemsPerPage);
    },
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    ...mapActions(['fetchProducts', 'deleteProduct']),
    ...mapMutations(['SET_SEARCH_QUERY']),
    navigateToEdit(product) {
      // Navigate to the edit page with the product ID
      this.$router.push({ name: 'EditProduct', params: { id: product.id } });
    },
    searchProducts() {
      this.SET_SEARCH_QUERY(this.searchQuery);
      this.fetchProducts();
    },
    async deleteProductById(productId) {
      try {
        await this.deleteProduct(productId);
        this.fetchProducts(); // Refresh product list after deletion
      } catch (error) {
        console.error('Delete Product Error:', error);
      }
    },
    changePage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
        this.$store.dispatch('changePage', this.currentPage);
      }
    },
  },
};
</script>
<style src="./styles.css"></style>

