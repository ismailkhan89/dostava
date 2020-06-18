import React from 'react';
import logo from './logo.svg';
import AuthLayout from './layout/Auth.jsx';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './App.css';

import HomePage from './Views/HomePage';
import Product from './Views/Product.jsx';
import TestView from './Views/TestView.jsx';
class App extends React.Component {
  render(){
    console.log('inside app')
      return (
            <BrowserRouter>
            {/* <Switch> */}
            <Switch>
<Route exact path="/">
<HomePage />
</Route>
<Route path="/product">
<Product />
</Route>
<Route path="/test">
<TestView />
</Route>
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
