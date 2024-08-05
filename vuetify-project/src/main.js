
import { registerPlugins } from '@/plugins'
import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
const app = createApp(App)
.use(store)
registerPlugins(app)

app.mount('#app')
