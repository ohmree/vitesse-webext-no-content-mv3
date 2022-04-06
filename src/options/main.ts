import { createApp } from 'vue';
import ConfirmationService from 'primevue/confirmationservice';
import '../styles';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
  AriaComponent,
  LegendComponent,
  TooltipComponent,
} from 'echarts/components';
import App from './Options.vue';
import { connectToDevtools } from '~/devtools';

use([
  CanvasRenderer,
  PieChart,
  TooltipComponent,
  LegendComponent,
  AriaComponent,
]);

const app = createApp(App);

app.use(ConfirmationService);

if (__DEV__) {
  connectToDevtools(8898);
}

app.mount('#app');
