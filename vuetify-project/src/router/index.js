import { createRouter, createWebHistory } from 'vue-router';
import MainComponent from '../components/MainComponent.vue';
import CreateProduct from '../components/CreateProduct.vue'; 
import EditProduct from '../components/EditProduct.vue';

const routes = [
  {
    path: '/',
    name: 'products',
    component: MainComponent,
  },
  {
    path: '/create-product',
    name: 'CreateProduct',
    component: CreateProduct,
  },
  
  {
    path: '/edit/:id',
    name: 'EditProduct',
    component: EditProduct,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error');
      localStorage.setItem('vuetify:dynamic-reload', 'true');
      location.assign(to.fullPath);
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload');
});

export default router;
