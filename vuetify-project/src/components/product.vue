<template>
    <div class="container my-5">
      <h2 class="text-center mb-4">Product Management</h2>
  
      <!-- Product Form -->
      <div class="card mb-4">
        <div class="card-header">
          <h5>{{ isEditing ? "Edit Product" : "Add New Product" }}</h5>
        </div>
        <div class="card-body">
          <form @submit.prevent="isEditing ? updateProduct() : addProduct()">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="name" class="form-label">Product Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    v-model="currentProduct.name"
                    required
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="description" class="form-label">Description</label>
                  <input
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="currentProduct.description"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="price" class="form-label">Price</label>
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    v-model.number="currentProduct.price"
                    required
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="quantity" class="form-label">Quantity</label>
                  <input
                    type="number"
                    class="form-control"
                    id="quantity"
                    v-model.number="currentProduct.quantity"
                    required
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              class="btn btn-primary"
            >{{ isEditing ? "Update Product" : "Add Product" }}</button>
            <button
              type="button"
              class="btn btn-secondary"
              v-if="isEditing"
              @click="cancelEdit"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
  
      <!-- Search Bar -->
      <div class="mb-4">
        <input
          type="text"
          class="form-control"
          placeholder="Search products..."
          v-model="searchQuery"
        />
      </div>
  
      <!-- Product Table -->
      <div class="card">
        <div class="card-header">
          <h5>Product List</h5>
        </div>
        <div class="card-body p-0">
          <table class="table table-striped">
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
              <tr v-for="(product, index) in filteredProducts" :key="product.id">
                <td>{{ index + 1 }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.description }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.quantity }}</td>
                <td>
                  <button
                    class="btn btn-info btn-sm me-2"
                    @click="editProduct(product)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-danger btn-sm"
                    @click="deleteProduct(product.id)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        products: [],
        currentProduct: {
          id: null,
          name: '',
          description: '',
          price: null,
          quantity: null
        },
        isEditing: false,
        searchQuery: '' // Add searchQuery to data properties
      };
    },
    mounted() {
      this.fetchProducts();
    },
    computed: {
      filteredProducts() {
        // Filter products based on the search query
        return this.products.filter((product) =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
        );
      }
    },
    methods: {
      async fetchProducts() {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/products');
          this.products = response.data;
        } catch (error) {
          console.error('Error fetching products:', error);
          alert('Failed to load products. Please try again later.');
        }
      },
      async addProduct() {
        if (!this.validateProduct(this.currentProduct)) {
          alert('Please fill out all fields correctly.');
          return;
        }
  
        try {
          const response = await axios.post(
            'http://127.0.0.1:8000/api/products',
            this.currentProduct
          );
          this.products.push(response.data);
          this.resetCurrentProduct();
        } catch (error) {
          console.error('Error adding product:', error);
          alert('Failed to add product. Please try again later.');
        }
      },
      editProduct(product) {
        this.isEditing = true;
        this.currentProduct = { ...product };
      },
      async updateProduct() {
        if (!this.validateProduct(this.currentProduct)) {
          alert('Please fill out all fields correctly.');
          return;
        }
  
        try {
          const response = await axios.put(
            `http://127.0.0.1:8000/api/products/${this.currentProduct.id}`,
            this.currentProduct
          );
          const index = this.products.findIndex(
            (p) => p.id === this.currentProduct.id
          );
          this.products.splice(index, 1, response.data);
          this.isEditing = false;
          this.resetCurrentProduct();
        } catch (error) {
          console.error('Error updating product:', error);
          alert('Failed to update product. Please try again later.');
        }
      },
      async deleteProduct(id) {
        if (confirm('Are you sure you want to delete this product?')) {
          try {
            await axios.delete(`http://127.0.0.1:8000/api/products/${id}`);
            this.products = this.products.filter((product) => product.id !== id);
          } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product. Please try again later.');
          }
        }
      },
      resetCurrentProduct() {
        this.currentProduct = {
          id: null,
          name: '',
          description: '',
          price: null,
          quantity: null
        };
      },
      cancelEdit() {
        this.isEditing = false;
        this.resetCurrentProduct();
      },
      validateProduct(product) {
        return (
          product.name &&
          product.description &&
          product.price > 0 &&
          product.quantity > 0
        );
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  
  .card {
    margin-bottom: 20px;
  }
  
  .table th,
  .table td {
    vertical-align: middle;
  }
  
  .mb-4 {
    margin-bottom: 1.5rem;
  }
  
  .btn {
    margin-right: 0.5rem;
  }
  </style>
  