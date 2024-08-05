<template>
  <div class="container my-5">
    <div class="card mb-4">
      <div class="card-header">
        <h5>{{ isEditing ? "Edit Product" : "Add New Product" }}</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleCreateProduct">
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="name" class="form-label">Product Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="currentProduct.name"
                />
                <div v-if="errors.name" class="text-danger">{{ errors.name[0] }}</div>
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
                />
                <div v-if="errors.description" class="text-danger">{{ errors.description[0] }}</div>
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
                />
                <div v-if="errors.price" class="text-danger">{{ errors.price[0] }}</div>
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
                />
                <div v-if="errors.quantity" class="text-danger">{{ errors.quantity[0] }}</div>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <button
              type="submit"
              class="btn btn-primary"
            >{{ isEditing ? "Update Product" : "Add Product" }}</button>
            <router-link to="/" class="btn btn-secondary ms-2">Cancel</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      currentProduct: {
        name: '',
        description: '',
        price: 0,
        quantity: 0,
      },
      isEditing: false,
      errors: {}, // To store validation errors
    };
  },
  methods: {
    ...mapActions(['createProduct', 'updateProduct']),
    async handleCreateProduct() {
      this.errors = {}; // Clear previous errors
      try {
        if (this.isEditing) {
          await this.updateProduct(this.currentProduct);
        } else {
          await this.createProduct(this.currentProduct);
        }
        this.$router.push('/');
      } catch (error) {
        this.errors = error.errors || {}; // Set validation errors
      }
    },
    cancelEdit() {
      this.$router.push('/');
    },
    async fetchProduct(id) {
      // Fetch the product details for editing
      // Implement this method to set the currentProduct data
    }
  },
  created() {
    const id = this.$route.params.id;
    if (id) {
      this.isEditing = true;
      this.fetchProduct(id);
    }
  },
  watch: {
    $route(to) {
      const id = to.params.id;
      if (id) {
        this.isEditing = true;
        this.fetchProduct(id);
      } else {
        this.isEditing = false;
        this.currentProduct = {
          name: '',
          description: '',
          price: 0,
          quantity: 0,
        };
      }
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

.text-danger {
  color: #dc3545;
}
</style>
