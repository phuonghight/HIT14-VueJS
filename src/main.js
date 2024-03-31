import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import WeatherApp from './components/WeatherApp.vue';

const app = createApp(WeatherApp);

app.mount('#app');
