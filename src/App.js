import React from 'react';
import logo from './logo.svg';

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './App.css';

function App() {
  return (
    

<BrowserRouter>
<Switch>
    <Route path="/homepage" />
    {/* <Redirect from="/" to="/homepage" /> */}
</Switch>
</BrowserRouter>
  );
}

export default App;
