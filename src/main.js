import Vue from 'vue'
import App from './App.vue'

import '../assets/css/test.less'
import '../assets/img/1918606_190013_2_lit.jpg'
import '../assets/img/1918606_190049_1_lit.jpg'


var root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    render: (h) => h(App)
}).$mount(root)