import React from 'react';
import logo from './logo.svg';
import AuthLayout from './layout/Auth.jsx';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './App.css';

import HomePage from './Views/HomePage';
import Product from './Views/Product.jsx';
import TestView from './Views/TestView.jsx';
import Login from './Views/Login';
import Cart from './Views/Cart';
import Checkout from './Views/Checkout';
class App extends React.Component {
  render(){
    console.log('inside app')
      return (
            <BrowserRouter>
            {/* <Switch> */}
            <Switch>
              
<Route exact path="/" component={props => <HomePage {...props} />} />


<Route  exact  path="/product/:id/"  component={props => <Product {...props} />} />


<Route path="/login" component={props => <Login {...props} />} />

<Route path="/cart" component={props => <Cart {...props} />} />

<Route path="/checkout" component={props => <Checkout {...props} />} />


</Switch>
              {/* <Route path="/home" component={props => <AuthLayout {...props} ></AuthLayout>}  />
                <Redirect from="/" to="/test"  /> */}
                {/* <Redirect from="/" to="/homepage" /> */}
            {/* </Switch> */}
            </BrowserRouter>
      );
  }
}

export default App;
