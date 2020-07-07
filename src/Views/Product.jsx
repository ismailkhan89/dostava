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
const cache = new InMemoryCache()
const httpLink = createUploadLink({
  uri: `${server_url}graphql`,
})

const clients = new ApolloClient({
  link: authLink.concat(httpLink) ,
  cache
});
const FOODS = gql`${foods}`;
const LIKE_PRODUCT = gql`${like}`;
const GETCARTITEMS = gql`${getCartItems}`;
function Products(props) {
  const [mutate, { loading: loadingMutation }] = useMutation(LIKE_PRODUCT, { onCompleted, onError, clients } )
  const { client, data, loading } = useQuery(GETCARTITEMS)

  async function onLikeProduct(product) {
    mutate({
      variables: {
        LikeFood: {
          foodId: String(product._id)
        }
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
        const index = cartItems && cartItems.length > 0 ? cartItems.findIndex((product) => product._id === newItem._id) : 0
          if (index < 0)
              cartItems.push(newItem)
          else {
              cartItems[index].quantity = cartItems[index].quantity + 1
          }
        client.writeQuery({ query: GETCARTITEMS, data: { cartItems: cartItems.length } })
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        // props.navigation.navigate('Cart')
        return 'Item Added';
    }
    else {
        // props.navigation.navigate('ItemDetail', { product })
    }
  }

  const [message, setMessages] = useState('');
  const [_id, setId] = useState(props.match.params?.id ?? null);
  const [filters, setFilter] = useState({ onSale: false, inStock: false, min: 0, max: 1000 });
  const [search, setSearch] = useState('');


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
      <Container className="breadcrumb-area" fluid>
        <Row>
          <Col lg="3">
          </Col>
          <Col lg="3" className="breadcrumb-section">
            <h3>Products</h3>
            <ul>
              <li><Link>Home</Link></li>

              <li><Link>Products</Link></li>
            </ul>
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
          <Col lg="3" className="sidebar-products">
            <div className="single-filter">
              <h3>Filter by Category</h3>
              <ul>
                <li><Link>Laptop & Computer <span>(439)</span></Link></li>
                <li>
                  <Link>Meats <span>(2224)</span></Link>
                  <ul>
                    <li><Link>15.5 <span>(24)</span></Link></li>
                    <li><Link>15.5 <span>(24)</span></Link></li>
                    <li><Link>15.5 <span>(24)</span></Link></li>
                    <li><Link>15.5 <span>(24)</span></Link></li>
                    <li><Link>15.5 <span>(24)</span></Link></li>
                  </ul>
                </li>
                <li><Link>Greens <span>(439)</span></Link></li>
                <li><Link>Snacks <span>(439)</span></Link></li>
                <li><Link>Cleaning <span>(439)</span></Link></li>
                <li><Link>Bakery <span>(439)</span></Link></li>
              </ul>
            </div>

            <div className="single-filter">
              <h3>Filter by Category</h3>
              <ul>
                <li><Link>Laptop & Computer <span>(439)</span></Link></li>
                <li>
                  <Link>Meats <span>(2224)</span></Link>
                  <ul>
                    <li><Link>15.5 <span>(24)</span></Link></li>
                    <li><Link>15.5 <span>(24)</span></Link></li>
                    <li><Link>15.5 <span>(24)</span></Link></li>
                    <li><Link>15.5 <span>(24)</span></Link></li>
                    <li><Link>15.5 <span>(24)</span></Link></li>
                  </ul>
                </li>
                <li><Link>Greens <span>(439)</span></Link></li>
                <li><Link>Snacks <span>(439)</span></Link></li>
                <li><Link>Cleaning <span>(439)</span></Link></li>
                <li><Link>Bakery <span>(439)</span></Link></li>
              </ul>
            </div>
          </Col>
          <Col lg="9">
            <Row>
              <Query query={FOODS}
                variables={{ category: _id, ...filters, search: search }}
              >
                {({ loading, error, data }) => {
                  if (loading) return <tr><td>{"Loading"}...</td></tr>;
                  if (error) return <tr><td>`${"Error"}! ${error.message}`</td></tr>;
                  return data.foodByCategory.map((product, index) =>
                    <Col lg="3" key={index}>
                      <div className="single-slider-product">
                        <img src={product.img_url}></img>
                        <div className="leftIcons">
                          <span>New</span>
                          <span className="Salebg">Sale</span>
                          <Button
                                                    className="btn-block mb-2"
                                                    type="button"
                                                    color="primary"
                                                    onClick={e => {
                                                       onLikeProduct(product)
                                                    }}
                                                    size="lg"
                                                >
                                                    {"Favorate"}</Button>
                        </div>
                        <div className="RightIcons">
                          <FontAwesome name="heart-o" />
                          <FontAwesome name="share" />
                        </div>
                      </div>
                      <div className="single-slider-product-detail">
                        <div className="leftDetails">
                          <h3> {product.title}</h3>
                          <button onClick={e => {
                                                      e.preventDefault()
                                        onAddToCart(product)
                                        // this.onClickAddToCart(product)
                                                          
                                                  }} >Add to Cart</button>
                        </div>
                        <div className="rightDetails">
                          {/* <span> $ {product.variations[0].price}</span> */}
                          <strong>{product.variations[0].price}</strong>
                          <a href="#">Buy Now</a>
                        </div>
                      </div>
                    </Col>
                  )
                }}
              </Query>
            </Row>
          </Col>
        </Row>
      </Container>

      <Footer />


    </Container>


  )
}

export default Products;