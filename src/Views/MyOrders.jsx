import React, {Component, useEffect, useState} from "react";
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
} from "reactstrap"
import {Link } from 'react-router-dom';
import Footer from '../Views/Footer.jsx';
import Header from '../Views/Header';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from "graphql-tag";
import { setContext } from 'apollo-link-context'
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient } from 'apollo-client';
import { server_url } from  "../config/config";
import {  myOrders } from "../apollo/server";
import { getCartItems } from '../apollo/client';


const authLink = setContext((_, { headers }) => {
    console.log("setContext",headers)
    // get the authentication token from local storage if it exists
    const userData = localStorage.getItem('user-dostava');
    const parsData = JSON.parse(userData);

    if(parsData !== null){
      let token = parsData.token;
        return {
            headers: {
              ...headers,
              authorization: token ? `Bearer ${token}` : "",
            }
          }
    }
    // return the headers to the context so httpLink can read them
  });
  
  const cache = new InMemoryCache()
  const httpLink = createUploadLink({
    uri: `${server_url}graphql`,
  })
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink) ,
    cache
  });

const MYORDERS = gql`${myOrders}`
const GETCARTITEMS = gql`${getCartItems}`;

function MyOrders(props){

    const [Order ,setOrder] = useState([])

    useEffect(() => {
        getOrders();
    },[])

    async function getOrders(){
        const userData = localStorage.getItem('user-dostava');
         const parsData = JSON.parse(userData);
         if(parsData !== null){
            if(parsData.token !== undefined){
                const result = await client.query({ query: MYORDERS, fetchPolicy: 'network-only' })
                setOrder(result.data.orders)
            }
        }
    }

    console.log('AllOrders of users',Order)
    return (
        <Container className="wrapper" fluid>
            <Header  {...props} />
            <Container className="breadcrumb-area" fluid>
                <Row>
                    <Col lg="3">
                    </Col>
                    <Col lg="9" md="12" sm="12" xs="12" className="breadcrumb-section">
                    <h3>My Orders</h3>
                    <ul>
                        <li><Link to={'/'}>Home</Link></li>

                        <li><Link  to={'/myorders'}>My Orders</Link></li>
                    </ul>
                    </Col>
                </Row>
            </Container>

            <Container className="content-area cart-page" fluid>
            <Row>
                <Col lg="2">
                </Col>
                <Col lg="8" className="cart-section">
                <h1 className="flashmessage text-center">My Orders</h1>
                    <h3>My Orders</h3>
                    <Table responsive>
                    <thead>
                        <tr>
                            
                            <th>ORDER ID</th>
                            {/* <th>Product</th>
                            <th>Price</th> */}
                            <th>PaymentStatus</th>
                            <th>Status</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                      {
                        Order.length > 0 ?  Order.map((cartItem, idx) => (
                            <tr key ={idx} onClick={async ()  => {
                               await localStorage.setItem("order_id",`"${cartItem.order_id}"`);
                               props.history.push({
                                   pathname : '/orderdetails'
                               })

                            }}>
                            <td>{cartItem.order_id}</td>
                            {/* <td><img style ={{ width: "100px" }} src={cartItem.img_url}></img></td> */}
                            {/* <td> {cartItem.title}</td>
                            <td><strong>{cartItem.price}</strong></td> */}
                            {/* <td>
                              <button   onClick={e => {
                                        e.preventDefault()
                                        }} >
                              </button> <span>{cartItem.quantity}</span> <button onClick={e => {
                                        e.preventDefault()
                                        }}>
                              </button>
                            </td> */}
                        <td>{cartItem.payment_status}</td>
                        <td>{cartItem.order_status}</td>
                        <td><strong> {cartItem.order_amount}</strong></td>
                        </tr>)) : 'Not item added yet!'
                      }
                       
                    </tbody>
                </Table>

                </Col>
            </Row>
            </Container>
          <Footer />
        </Container>
    )
}

export default MyOrders