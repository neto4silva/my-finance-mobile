import Dashboard from "@/views/Home";
import Compras from "@/views/Compras";
import Receitas from "@/views/Receitas";
import Despesas from "@/views/Despesas";


const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    title: "Dashboard",
  },
  {
    path: "/compras",
    name: "Compras",
    component: Compras,
    title: "Compras",
  },
  {
    path: "/receitas",
    name: "Receitas",
    component: Receitas,
    title: "Receitas",
  },
  {
    path: "/despesas",
    name: "Despesas",
    component: Despesas,
    title: "Despesas",
  },
];

export default routes;