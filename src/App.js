import React, { Component, useState, useEffect } from "react";
import logo from './logo.svg';
import AuthLayout from './layout/Auth.jsx';
import { ApolloLink } from 'apollo-link'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import gql from "graphql-tag";
import { ApolloProvider } from '@apollo/react-hooks'
import HomePage from './Views/HomePage';
import Product from './Views/Product.jsx';
import Categories from './Views/Categories.jsx';
import SingleCategory from './Views/SingleCategory.jsx';
import TestView from './Views/TestView.jsx';
import Login from './Views/Login';
import Cart from './Views/Cart';
import Checkout from './Views/Checkout';
import DetailsScreen from './Views/DetailsScreen';
import PastOrders from './Views/PastOrders';
import Favorites from './Views/Favorites';
import { server_url } from  "./config/config";
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state'
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context'
import { isLoggedIn } from './apollo/client';
import { getConfiguration } from "./apollo/server";
import  routes from './routes'
import MyOrders from "./Views/MyOrders";
import OrderDetails from "./Views/OrderDetails";
import Vendor from "./Views/Vendor";
import VendorCategory from "./Views/VendorCategory";


const httpLink = createUploadLink({
  uri: `${server_url}graphql`,
})
const GETCONFIGURATION = gql`${getConfiguration}`
const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = await AsyncStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  const userData = localStorage.getItem('user-dostava');
  const parsData = JSON.parse(userData);
  console.log("parsData",parsData)
  let token = parsData.token;
  console.log("parsDate",token)
  return {
      headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
      }
  }
})
const cache = new InMemoryCache();
const stateLink = withClientState({
  cache
});

const IS_LOGGED_IN = gql`${isLoggedIn}`
// class App extends React.Component {
  function App(){
    let clientRef = null;

    useEffect(() => {
      setupApollo()
    }, [])


  const setupData = async () => {
    console.log("clientRef",clientRef)
    try {
        const { data } = await clientRef.query({ query: GETCONFIGURATION })
        const token = await localStorage.getItem('token')
        const cartItems = await localStorage.getItem('cartItems')
        //TODO
        //write a method on backend to check if this token is valid or not 
        //if its invalid or expired, remove it from storage and set isLoggedIn as false
        cache.writeData({
            data: {
                configuration: data.configuration,
                notifications: [],
                isLoggedIn: !!token,
                cartItems: cartItems ? JSON.parse(cartItems).length : 0
            }
        })
    } catch (error) {
        console.log('setupData Error', error)
    }
  }
  const setupApollo = async () => {

    const client = new ApolloClient({
        link: ApolloLink.from([stateLink, authLink.concat(httpLink)]),
        cache,
        resolvers: {
            User: {
                isLoggedIn: (profile, _args, { cache }) => {
                    try {
                        const { isLoggedIn } = cache.readQuery({ query: IS_LOGGED_IN })
                        return isLoggedIn
                    }
                    catch (err) {
                        cache.writeQuery({ query: IS_LOGGED_IN, data: { isLoggedIn: false } })
                        return false
                    }
  
                }
            }
        }//removes apollo resolvers warning. read more about it here
        //https://github.com/apollographql/apollo-client/pull/4499
    })
  
    //ref for global use
    clientRef = client;
    await setupData(client)
    console.log("setupApollo",client)
    // this.setState({ client: client })
  
    client.onClearStore(setupData)
    client.onResetStore(setupData)
  
    return client
  }
  // render(){
    console.log('inside app', clientRef)
      return (
        <ApolloProvider client = {clientRef} >
            <BrowserRouter>
            {/* <Switch> */}
            <Switch>
            
<Route exact path="/" component={props => <HomePage {...props} />} />

<Route  exact  path="/product/:id/"  component={props => <Product {...props} />} />


<Route path="/login" component={props => <Login {...props} />} />

<Route path="/cart" component={props => <Cart {...props} />} />

<Route path="/checkout"  client = {clientRef}  component={props => <Checkout {...props} />} />

<Route path="/detailsscreen" component={props => <DetailsScreen {...props} />} />

<Route path="/pastorders" component={props => <PastOrders {...props} />} />

<Route path="/categories/:id/" component={props => <Categories {...props} />} />
<Route path="/categories" component={props => <Categories {...props} />} />

<Route path="/stores" component={props => <Vendor {...props} />} />

<Route path="/storesitem/:id" component={props => <VendorCategory {...props} />} />
<Route path="/storesitem" component={props => <VendorCategory {...props} />} />

<Route path="/single-category/:id" component={props => <SingleCategory {...props} />} />
<Route path="/single-category/" component={props => <SingleCategory {...props} />} />

<Route path="/favorites" component={props => <Favorites {...props} />} />
 <Route path="/orderdetails" component={props => <OrderDetails {...props} />} /> 
<Route path="/myorders" component={props => <MyOrders {...props} />} />


</Switch>
              {/* <Route path="/home" component={props => <AuthLayout {...props} ></AuthLayout>}  />
                <Redirect from="/" to="/test"  /> */}
                {/* <Redirect from="/" to="/homepage" /> */}
            {/* </Switch> */}
            </BrowserRouter>
            </ApolloProvider>
      );
   

  // }
}

export default App;
