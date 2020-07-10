import React, {Component, useEffect, useState} from "react";
import Footer from '../Views/Footer.jsx';
import Header from '../Views/Header';
import FontAwesome from 'react-fontawesome'
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import '../Style.css';
// import { addQuantityToCartItem, removeQuantityToCartItem } from '../library/cart'
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardHeader,
    Container,
    Row,
    Col,
    Button,
    Table,
    // Link
} from "reactstrap";
import { ApolloClient } from 'apollo-client';
import {Link, useRouteMatch, useParams } from 'react-router-dom';
import { createUploadLink } from 'apollo-upload-client';
import gql from "graphql-tag";
import { getCategories, foodByIds, getCoupon } from "../apollo/server";
import { getCartItems } from '../apollo/client';
import { useQuery, useMutation } from '@apollo/react-hooks'
import { server_url } from  "../config/config";
import { InMemoryCache } from 'apollo-cache-inmemory';
import Checkout from "./Checkout.jsx";
const GETCARTITEMS = gql`${getCartItems}`;
const GET_COUPON = gql`${getCoupon}`
const FOOD_BY_IDS = gql`${foodByIds}`

const cache = new InMemoryCache()
const httpLink = createUploadLink({
  uri: `${server_url}graphql`,
})

const clients = new ApolloClient({
  link: httpLink,
  cache
});

function PastOrders(props) {
  
  



    
    return(
      
        <Container className="wrapper" fluid>
        
        <Header  {...props} />
        
        <Container className="breadcrumb-area" fluid>
          <Row>
              
            <Col lg="3">
            </Col>
            <Col lg="9" md="12" sm="12" xs="12" className="breadcrumb-section">
              <h3>My Cart</h3>
              <ul>
                <li><Link to = "/" >Home</Link></li>

                <li><Link to = "/cart" >Past Orders</Link></li>
              </ul>
            </Col>
            </Row>
            
        </Container>

        <Container className="content-area cart-page past-order" fluid>
          <Row>
              <Col lg="2">

              </Col>
              <Col lg="8">
                <Row>
                    <Col lg="3" className="dashboard text-center">
                        <h3 className="text-center">Dashboard</h3>
                        <img src="../Assets/Img/profile-pic.png"></img>
                        <h4>John Smith</h4>
                        <h6>john_smith24</h6>
                        <ul>
                          <li><Link>Edit Profile</Link></li>
                          <li><Link>My Orders</Link></li>
                          <li><Link>Past Orders</Link></li>
                          <li><Link>My Favorites</Link></li>
                        </ul>
                    </Col>
            <Col lg="9" className="past-orders">
              <h3>Past Orders</h3>
              <div className="orders-list">
                <Table responsive>
                    <thead>
                        <tr>
                            
                            <th>Image</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td width="22%"><img src="../Assets/Img/cart-product.png"></img></td>
                            <td width="30%"><h4>Sample Product Image</h4></td>
                            <td width="10%"><span className="price">$20.00</span></td>
                            <td width="22%"><span className="date">24 Jan, 2020</span></td>
                            <td width="18%"><strong>Delivered</strong></td>
                         </tr>
                         <tr>
                            <td><img src="../Assets/Img/cart-product.png"></img></td>
                            <td><h4>Sample Product Image</h4></td>
                            <td><span className="price">$20.00</span></td>
                            <td><span className="date">24 Jan, 2020</span></td>
                            <td><strong>Delivered</strong></td>
                         </tr>
                         <tr>
                            <td><img src="../Assets/Img/cart-product.png"></img></td>
                            <td><h4>Sample Product Image</h4></td>
                            <td><span className="price">$20.00</span></td>
                            <td><span className="date">24 Jan, 2020</span></td>
                            <td><strong>Delivered</strong></td>
                         </tr>
                    </tbody>
                </Table>
                </div>
            </Col>
            </Row>
            </Col>
            <Col lg="2"></Col>
            
          </Row>
          </Container>
        
        <Footer />

      
      </Container>
     
      
    )

}

  export default PastOrders;