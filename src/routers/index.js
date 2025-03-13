import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Category from "../pages/Category";
import ProductDetails from "../pages/ProductDetails";
import Search from "../pages/Search";
import Success from "../pages/Success";
import Cart from "../pages/Cart";
import NotFound from "../pages/NotFound";
import Order from "../pages/Order";
import AuthRequired from "../shared/AuthRequired";
export default [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/Category/:id",
    element: Category,
  },
  {
    path: "/ProductDetails/:id",
    element: ProductDetails,
  },
  {
    path: "/Search",
    element: Search,
  },
  {
    path: "/Success",
    element: AuthRequired.checkNotLogged(Success),
  },
  {
    path: "/Cart",
    element: Cart,
  },
  {
    path: "/Login",
    element: AuthRequired.checkLogged(Login),
  },
  {
    path: "/Register",
    element: AuthRequired.checkLogged(Register),
  },
  {
    path: "/Order",
    element: AuthRequired.checkNotLogged(Order),
  },
  {
    path: "*",
    element: NotFound,
  },
];
