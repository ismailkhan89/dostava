import HomePage from './Views/HomePage';
import Product from './Views/Product.jsx';
import TestView from './Views/TestView.jsx';

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
       
      }
];
export default routes;