import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const Canciones = () => import(/* webpackChunkName: "dashboard" */"@/pages/Dashboard.vue");
const Categorias = () => import(/* webpackChunkName: "dashboard" */"@/pages/Categorias.vue");
const Tipos = () => import(/* webpackChunkName: "dashboard" */"@/pages/Tipos.vue");

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/canciones",
    children: [
      {
        path: "canciones",
        name: "canciones",
        component: Canciones
      },
      {
        path: "categoria",
        name: "categoria",
        component: Categorias
      },
      {
        path: "tipo",
        name: "tipo",
        component: Tipos
      },
    ]
  },
  { path: "*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
