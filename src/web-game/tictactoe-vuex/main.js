import {createApp} from 'vue';
import TicTaeToe from './TicTaeToe.vue';
import store from './store';

createApp(TicTaeToe)
    .use(store)
    .mount('#root');