import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import router from "./router";
import "materialize-css";
import "materialize-css/dist/css/materialize.css";
import "./style.css";
import { store } from "./store/store";
Vue.config.productionTip = false;

Vue.use(Vuex);

var filter = function(text, length, clamp) {
  clamp = clamp || "...";
  var node = document.createElement("div");
  node.innerHTML = text;
  var content = node.textContent;
  return content.length > length ? content.slice(0, length) + clamp : content;
};
Vue.filter("truncate", filter);

new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
