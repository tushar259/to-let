
import './bootstrap';
import $ from 'jquery';
import App from './App.vue';
import {router} from './router.js';
import { createApp } from 'vue';
import Quill from 'quill/dist/quill.min.js';

const app = createApp(App);
app.use(router);
// app.use(moment);
// app.use(Toast);
// app.use(Quill);
app.use($);
app.mount('#app');
