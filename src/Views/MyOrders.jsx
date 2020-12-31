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
    Spinner,
   
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
import { server_url , WS_GRAPHQL_URL } from  "../config/config";
import {  myOrders , getConfiguration , orderStatusChanged , pendingOrders} from "../apollo/server";
import { getCartItems } from '../apollo/client';
import { useQuery  } from "react-apollo";
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';

const authLink = setContext((_, { headers }) => {
    console.log("setContext",headers)
    // get the authentication token from local storage if it exists
    const userData = localStorage.getItem('user-dostava');
    const parsData = JSON.parse(userData);
    if(parsData !== null){
      let token = parsData.token;
      console.log("tokentoken",token)
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

  const wsLink = new WebSocketLink({
    uri: WS_GRAPHQL_URL,
    options: {
        reconnect: true,
    },
});

 


  const terminatingLink = split(
  ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return (
          kind === 'OperationDefinition' && operation === 'subscription'
      );
  },
  wsLink,
  );


  const httpLink = createUploadLink({
    uri: `${server_url}graphql`,
    terminatingLink
  })
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink) ,
    cache,
  });

const MYORDERS = gql`${myOrders}`
const GETCARTITEMS = gql`${getCartItems}`;
const GET_CONFIGURATION = gql`${getConfiguration}`;
const ORDER_STATUS_CHANGED = gql`${orderStatusChanged}`
const ACTIVE_ORDER = gql`${pendingOrders}`


function MyOrders(props){

    const [Order ,setOrder] = useState([])
    const [configuration ,setConfiguration] = useState([])
    const [userId ,setuserId] = useState('')
    const [loading ,setloading] = useState(false)

    const { data: activeOrder, subscribeToMore, loading: OrderLoading, error: errorOrder } = useQuery(ACTIVE_ORDER,{client :client})

    console.log("activeOrderactiveOrder",activeOrder)

    useEffect(() => {
      getOrders()
    },[])

    async function getOrders(){
      setloading(true)
        const userData = localStorage.getItem('user-dostava');
         const parsData = JSON.parse(userData);
         if(parsData !== null){
            if(parsData.token !== undefined){
                const result = await client.query({ query: MYORDERS, fetchPolicy: 'network-only' })
                if(result.data !== undefined){
                  setOrder(result.data.orders)
                  setuserId(parsData.userId)
                  // subscribeToMyOrders()
                }
                const config = await client.query({ query: GET_CONFIGURATION, fetchPolicy: 'network-only' })
                console.log(config)
                setConfiguration(config.data.configuration)

            }
        }
        setloading(false)
    }
 


    //  function subscribeToMyOrders() {
    //   console.log("subscribeToMyOrders k ander")
        
    //   try {
    //     subscribeToMore({
    //       document: ORDER_STATUS_CHANGED,
    //         variables: { userId: userId },
    //         updateQuery: (prev, { subscriptionData }) => {
    //           console.log("undeliveredOrdersundeliveredOrders",subscriptionData)

    //             if (!subscriptionData.data) return prev;
    //             const { _id, order_status } = subscriptionData.data.orderStatusChanged.order

    //             if (subscriptionData.data.orderStatusChanged.origin === 'new') {
    //                 if (prev.undeliveredOrders.findIndex(o => o._id === _id) > -1) return prev
    //                 return {
    //                     undeliveredOrders: [subscriptionData.data.orderStatusChanged.order, ...prev.undeliveredOrders]
    //                 }
    //             }
    //             else {
    //                 let { undeliveredOrders } = prev
    //                 const orderIndex = undeliveredOrders.findIndex(o => o._id === _id)
    //                 if (orderIndex > -1) {
    //                     if (order_status === 'DELIVERED'
    //                         || order_status === 'CANCELLED' ||
    //                         order_status === 'COMPLETED') {
    //                         undeliveredOrders.splice(orderIndex, 1)
    //                     }
    //                     else {
    //                         undeliveredOrders[orderIndex].order_status = subscriptionData.data.orderStatusChanged.order.order_status
    //                     }
    //                 }

    //                 return {
    //                     undeliveredOrders: [...undeliveredOrders]
    //                 }
    //             }
    //         }
    //     })
    // } catch (error) {
    //     console.log("errorerrorerror",error)
    // }
    // }

    return (
        <Container className="wrapper" fluid>
                 <Header  {...props} title="My Orders" />

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
                {loading ?  <Spinner /> : 
                <>
                  <h3>My Orders</h3>
                    
                              <Table responsive>
              <thead>
                  <tr>
                      
                      <th>ORDER ID</th>
                      <th>CREATED DATE</th>
                      {/* <th>Product</th>
                      <th>Price</th> */}
                      <th>PaymentStatus</th>
                      <th>Status</th>
                      <th>Total</th>
                      <th>Details</th>
                  </tr>
              </thead>
              <tbody>
                {
                   Order.length > 0 ?  Order.map((cartItem, idx) => 
                  { 
                    let status_color = cartItem.order_status === "ACCEPTED" ? '#1DB20D' : '#fe0000'
                    if(cartItem.order_status && cartItem.order_status.toLowerCase() == "pending"){
                      status_color = '#1DB20D'
                    }
                    return (
                    
                  <tr key ={idx} >
                  <td>{cartItem.order_id}</td>
                  <td>{cartItem.createdAt}</td>
                  <td>{cartItem.payment_status}</td>
                  <td style={{color : status_color,fontWeight : 700}}>{cartItem.order_status}</td>
                    <td><strong>{configuration !== undefined && configuration.currency_symbol}{cartItem.order_amount}</strong></td>
                  <td>
                        <Button color="primary" onClick={async ()  => {
                        await localStorage.setItem("order_id",`"${cartItem.order_id}"`);
                        props.history.push({
                            pathname : '/orderdetails'
                        })
                      }}>View</Button>
                  </td>
                  </tr>)}) : <tr><td colspan="6" align="center">'No Order added yet!'</td></tr>
                }
                
              </tbody>
            </Table>
                    </>  
                    }
                </Col>
            </Row>
            </Container>
          <Footer />
        </Container>
    )
}


function MyOrderTable(props){

  useEffect(() => {
    props.subscribeToMyOrders();
  },[])

  return <Table responsive>
  <thead>
      <tr>
          
          <th>ORDER ID</th>
          <th>CREATED DATE</th>
          {/* <th>Product</th>
          <th>Price</th> */}
          <th>PaymentStatus</th>
          <th>Status</th>
          <th>Total</th>
          <th>Details</th>
      </tr>
  </thead>
  <tbody>
    {
      props.Order.length > 0 ?  props.Order.map((cartItem, idx) => 
      { 
        let status_color = cartItem.order_status === "ACCEPTED" ? '#1DB20D' : '#fe0000'
        if(cartItem.order_status && cartItem.order_status.toLowerCase() == "pending"){
          status_color = '#1DB20D'
        }
        return (
        
      <tr key ={idx} >
      <td>{cartItem.order_id}</td>
      <td>{cartItem.createdAt}</td>
      <td>{cartItem.payment_status}</td>
      <td style={{color : status_color,fontWeight : 700}}>{cartItem.order_status}</td>
        <td><strong>{props.configuration !== undefined && props.configuration.currency_symbol}{cartItem.order_amount}</strong></td>
      <td>
            <Button color="primary" onClick={async ()  => {
             await localStorage.setItem("order_id",`"${cartItem.order_id}"`);
             props.history.push({
                 pathname : '/orderdetails'
             })
          }}>View</Button>
       </td>
      </tr>)}) : <tr><td colspan="6" align="center">'No Order added yet!'</td></tr>
    }
     
  </tbody>
</Table>
}

export default MyOrders