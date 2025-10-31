import {createApp} from 'vue';
import MineSweeper from './MineSweeper.vue';
import store from './store';

createApp(MineSweeper)
    .use(store)
    .mount('#root');