import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { server_url } from "./config/config";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
const cache = new InMemoryCache()
const httpLink = createUploadLink({
  uri: `${server_url}graphql`,
})

const client = new ApolloClient({
  link: httpLink,
  cache
});

// document.getElementsByTagName("META")[2].content="Your description about the page or site here to set dynamically",

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider >,
 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
