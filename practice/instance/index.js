import Vue from 'vue'

const app = new Vue({
    // el:'#root',
    template: '<div>{{test}}</div>',
    data: {
        test: 0
    }

})

app.$mount('#root')

const interval1 = setInterval(function () {
    app.test += 1;
}, 1000);

setTimeout(function () {
    clearInterval(interval1)
}, 4000)

// console.log(app.$data);
// console.log(app.$props);
console.log(app.$el);



