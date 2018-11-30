import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

const routes = [
    { path: '/excel', component: require('@/pages/ExcelDataPage').default, name: 'excel' },
    { path: '/query', component: require('@/pages/QueryPage').default, name: '/query' },
    { path: '*', redirect: '/query' }
];

export default new VueRouter({
    routes
})
