import React, { Component, useState, useEffect } from "react";
import Footer from '../Views/Footer.jsx';
import Header from '../Views/Header';

import FontAwesome from 'react-fontawesome'
import {
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { foods, like } from "../apollo/server";
import { getCartItems } from '../apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { server_url } from  "../config/config";
import { authLink } from '../library/authLink';
import { ApolloClient } from 'apollo-client';
import { Form, FormControl } from 'react-bootstrap';
const cache = new InMemoryCache()
const httpLink = createUploadLink({
  uri: `${server_url}graphql`,
})

const client = new ApolloClient({
  link: authLink.concat(httpLink) ,
  cache
});
const FOODS = gql`${foods}`; 
const LIKE_PRODUCT = gql`${like}`;
const GETCARTITEMS = gql`${getCartItems}`;
function Products(props) {
  const [mutateLike, { loadingLike: loadingLikeMutation }] = useMutation(LIKE_PRODUCT, { onCompletedLike, onErrorLike, client } )
  const { cartloading } = useQuery(GETCARTITEMS)
  const [message, setMessages] = useState('');
  const [_id, setId] = useState(props.match.params?.id ?? null);
  const [filters, setFilter] = useState({ onSale: false, inStock: false, min: 0, max: 1000 });
  const [search, setSearch] = useState('');

const { data, loading } = useQuery(FOODS, { variables:{category: _id}, client: client })
console.log("food data", data);
console.log("foodloading",loading)
console.log("props.match.params?.id", props.match.params?.id)
  async function onLikeProduct(product) {
    mutateLike({
      variables: {
          "foodId": String(product._id)
      }
  })
  }
  async function onCompletedLike(data) {
    console.log("data onCompletedLike", data);
  }

  async function onErrorLike(data) {
    console.log("data onErrorLike", data);
  }
  async function likeProduct(product){
    mutateLike({
      variables: {
          "foodId": String(product._id)
      }
  })
  }
  async function onError(data) { 
    console.log("onError data", data)
  }
  async function onCompleted(data) { 
    console.log("complete data", data)
  }
  async function onAddToCart (product)  {

    console.log('onAddToCart>>> ', product);
    if (product.stock < 1) {
        // showMessage({
        //     message: 'Item out of stock',
        //     type: 'warning',
        //     floating: true,
        //     style: styles.alertbox,
        //     titleStyle: { fontSize: scale(14), fontFamily: fontStyles.PoppinsRegular, paddingTop: 6 }
        // })
        return 'Item out of stock';
    }

    if (product.variations.length === 1 && product.variations[0].addons.length === 0) {
        const newItem = {
            // key: uuid.v4(),
            __typename: 'CartItem',
            _id: product._id,
            vendor: product.user._id,
            quantity: 1,
            variation: {
                __typename: 'ItemVariation',
                _id: product.variations[0]._id,
            },
            addons: []
        }
        const cartItemsStr = localStorage.getItem('cartItems') || '[]'
        const cartItems = JSON.parse(cartItemsStr)
        console.log("<<cartItems>>",cartItems)
        const index = cartItems.findIndex((product) => product._id === newItem._id)
        if (index < 0)
            cartItems.push(newItem)
        else {
            cartItems[index].quantity = cartItems[index].quantity + 1
        }
        console.log("<<new item entered>>",cartItems)
        client.writeQuery({ query: GETCARTITEMS, data: { cartItems: cartItems.length } })
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        // props.navigation.navigate('Cart')
        return 'Item Added';
    }
    else {
        // props.navigation.navigate('ItemDetail', { product })
    }
  }

   async function onCLickProudctDetails(product) {
    props.history.push({
      pathname: '/detailsscreen',
      state: { product: product }
    })
   }  

  const MenuItems = ['About us', 'Contact Us', 'Gallery', 'My Account'];
  const listItems = MenuItems.map((items, keys) =>
    <li key={keys}>{items}</li>
  );
  const MainMenu = ['Meets', 'Greens', 'Snacks', 'Cleaning', 'Bakery', 'and many more..'];
  const MenuList = MainMenu.map((items, keys) =>
    <li key={keys} >{items}</li>
  );
  // const { _id, filters, search } = this.state;
  function onCompleted(data){
    console.log(data)
  }
  function onError(data){
    console.log(data)
  }
  return (
    <Container className="wrapper" fluid>
      <Header  {...props} />
      <Container className="breadcrumb-area" style={{display:'none'}} fluid>
        <Row>
          <Col lg="3">
          </Col>
          <Col lg="3" className="breadcrumb-section">
            <h3>Categories</h3>
            <ul>
              <li><Link to="/" >Home</Link></li>

              <li><Link>Products</Link></li>
            </ul>
          </Col>
        </Row>
      </Container>
      <Container id="subheader" fluid>
        <Row>
          <Col lg="12">
          <h2 class="title text-center">CATEGORIES</h2>
					 <p class="content text-center">The purpose of lorem ipsum is to create a natural looking block of text that doesn't distract from the layout.</p>
          </Col>
        </Row>
      </Container>
      <Container id="search-product">
        <Row>
          
          <Col lg="12">
            <Form inline >
              <select name="select-category">
                <option>Select category</option>
                <option>category 1</option>
                <option>category 2</option>
                <option>category 3</option>
                <option>category 4</option>
                <option>category 5</option>
              </select>
              <FormControl type="search" placeholder="Enter Location here..." />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col lg="12">
            <h4>{message}</h4>
          </Col>
        </Row>
      </Container>
      <Container className="content-area" fluid>
        <Row>
          <Container id="Product-carousel">
            <Row>
                <Col lg="12" >
                  <h2 class="title">New on Dostava</h2>
                </Col>
            </Row>
            <Row>
              <Col lg="3" className="product">
                <div class="product-img">
							    <Link to="/">
                    <img class="img-fluid" src="../Assets/Img/carousel-1.jpg" alt=""></img>
                  </Link>
                </div>
                <div class="product-desc">
								  <h3 class="product-title"><Link to="/">White Rice</Link></h3>
								  <img class="product-rating" src="img/star.png" alt=""></img>
								  <p class="product-content">Fresh picked from farms <br/>1 Kilogram</p>
								  <p class="price">$24.03</p>
						    </div>
						    
              </Col>
            </Row>
          </Container>
          
        </Row>
      </Container>

      <Footer />


    </Container>


  )
}

export default Products;