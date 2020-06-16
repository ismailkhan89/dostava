import React from 'react';
import logo from './logo.svg';
import AuthLayout from './layout/Auth.jsx';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
class App extends React.Component {
  render(){
    console.log('inside app')
      return (
            <BrowserRouter>
            {/* <Switch> */}
              <Route path="/home" component={props => <AuthLayout {...props} ></AuthLayout>}  />
                <Redirect from="/" to="/home"  />
                {/* <Redirect from="/" to="/homepage" /> */}
            {/* </Switch> */}
            </BrowserRouter>
      );
  }
}

export default App;
