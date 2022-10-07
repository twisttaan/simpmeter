import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createApp } from 'vue';
import App from './App.vue';
import './style.css';

const Vue = createApp(App);

/**
 * Font Awesome
 */
library.add(faGithub);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.mount('#app');
