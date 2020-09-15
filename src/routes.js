import HomePage from './Views/HomePage';
import Product from './Views/Product.jsx';

import TestView from './Views/TestView.jsx';
import Login from './Views/Login';

var routes = [
    {
      path: "/home",
      name: "HomePage",
      component: HomePage,
      layout: "/",
      
    },
    {
        path: "/product",
        name: "Product",
        component: Product,
        layout: "/",
       
      },
      
      {
        path: "/test",
        name: "TestView",
        component: TestView,
        layout: "/",
       
      },
      {
        path: "/login",
        name: "Login",
        component: Login,
        layout: "/",
       
      }
];
export default routes;