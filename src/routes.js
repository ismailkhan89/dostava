import HomePage from './Views/HomePage';
import Product from './Views/Product.jsx';

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
];
export default routes;