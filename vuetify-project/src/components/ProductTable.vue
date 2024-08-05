<template>
  <div class="card">
    <div class="card-header">
      <h5>Product List</h5>
    </div>
    <div class="card-body p-0">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.price }}</td>
            <td>
              <button class="btn btn-sm btn-primary" @click="$emit('editProduct', product)">
                Edit
              </button>
              <button class="btn btn-sm btn-danger" @click="$emit('deleteProduct', product.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style src="./styles.css"></style>
