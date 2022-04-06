import { createApp } from 'vue';
import ConfirmationService from 'primevue/confirmationservice';
import App from './Popup.vue';
import '../styles';
import { connectToDevtools } from '~/devtools';

const app = createApp(App);

app.use(ConfirmationService);

if (__DEV__) {
  connectToDevtools(8899);
}

app.mount('#app');
