<template>
    <header class="header-container">
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
          <router-link class="navbar-brand" to="/">
            My Store
          </router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <router-link class="nav-link" to="/">
                  Home
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/create-product">
                  Add Product
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/about">
                  About
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'HeaderComponent',
  };
  </script>
  
  <style scoped>
  .header-container {
    margin-bottom: 20px;
  }
  .nav-link {
    color: white !important;
  }
  </style>
  