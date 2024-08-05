<template>
    <div class="container my-5">
      <h2>Edit Product</h2>
      <form @submit.prevent="submitUpdatedProduct">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input
            v-model="localProduct.name"
            id="name"
            class="form-control"
            placeholder="Name"
            required
          />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <input
            v-model="localProduct.description"
            id="description"
            class="form-control"
            placeholder="Description"
            required
          />
        </div>
        <div class="mb-3">
          <label for="price" class="form-label">Price</label>
          <input
            v-model.number="localProduct.price"
            id="price"
            class="form-control"
            type="number"
            placeholder="Price"
            required
          />
        </div>
        <div class="mb-3">
          <label for="quantity" class="form-label">Quantity</label>
          <input
            v-model.number="localProduct.quantity"
            id="quantity"
            class="form-control"
            type="number"
            placeholder="Quantity"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Update</button>
        <router-link to="/" class="btn btn-secondary ms-2">Cancel</router-link>
      </form>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        localProduct: { // Renamed from 'product' to 'localProduct'
          id: null,
          name: '',
          description: '',
          price: null,
          quantity: null,
        },
      };
    },
    computed: {
      ...mapGetters(['product']),
    },
    watch: {
      product: {
        immediate: true,
        handler(newProduct) {
          if (newProduct && Object.keys(newProduct).length > 0) {
            this.localProduct = { ...newProduct };
          }
        }
      }
    },
    methods: {
      ...mapActions(['fetchProduct', 'updateProduct']),
      async submitUpdatedProduct() {
        try {
          await this.updateProduct(this.localProduct); // Call the Vuex action
          this.$router.push('/'); // Redirect after successful update
        } catch (error) {
          console.error('Update Product Error:', error);
        }
      },
    },
    created() {
      const id = this.$route.params.id;
      this.fetchProduct(id);
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin-top: 20px;
  }
  
  .mb-3 {
    margin-bottom: 1rem;
  }
  
  .btn {
    margin-right: 0.5rem;
  }
  </style>
  