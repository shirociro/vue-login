import { createApp } from "vue";
import App from "@/app/App.vue";
import { createPinia } from "pinia";
import router from "@/app/router";
// import { VueQueryPlugin } from "@tanstack/vue-query";
// import { queryClient } from "@/app/queryclient";
import "@/assets/tailwind.css";
// Flowbite
import * as FlowbiteVue from "flowbite-vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// Vue Query
// app.use(VueQueryPlugin, { queryClient });

// Flowbite (register globally)
// Register Flowbite components globally
Object.entries(FlowbiteVue).forEach(([name, component]) => {
  app.component(name, component);
});

app.mount("#app");
