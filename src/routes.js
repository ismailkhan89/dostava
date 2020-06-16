import Homepage from '../Views/Homepage.jsx';
import Product from '../Views/Product.jsx';

var routes = [
    {
      path: "/homepage",
      name: "Homepage",
      component: Homepage,
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