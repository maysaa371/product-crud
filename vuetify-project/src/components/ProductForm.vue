<!-- ProductForm.vue -->
<template>
  <div class="card mb-4">
    <div class="card-header">
      <h5>{{ isEditing ? "Edit Product" : "Add New Product" }}</h5>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitForm">
        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label for="name" class="form-label">Product Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
               v-model="product.name"
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
                v-model="product.description"
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
                v-model.number="product.price"
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
                v-model.number="product.quantity"
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
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    product: {
      type: Object,
      required: true
    },
    isEditing: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    ...mapActions(['addProduct', 'updateProduct']),
    async submitForm() {
      if (!this.validateProduct(this.product)) {
        alert('Please fill out all fields correctly.');
        return;
      }
      
      try {
        if (this.isEditing) {
          await this.updateProduct(this.product);
        } else {
          await this.addProduct(this.product);
        }
        this.$emit('formSubmitted');
      } catch (error) {
        alert('Failed to save product. Please try again later.');
      }
    },
    cancelEdit() {
      this.$emit('cancelEdit');
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
.card {
  margin-bottom: 20px;
}
</style>
