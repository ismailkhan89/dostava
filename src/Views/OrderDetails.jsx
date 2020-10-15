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
import {  myOrders , getConfiguration } from "../apollo/server";
import { getCartItems  } from '../apollo/client';
import { getItemPrice } from '../utils/pricing'

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
const GET_CONFIGURATION = gql`${getConfiguration}`;

function OrderDetails(props){
 
    const [Order ,setOrder] = useState([])
    const [configuration ,setConfiguration] = useState([])
    const [discountPercent, setDiscountPercent] = useState(null)
    const [deliveryCharges,setDeliveryCharges] = useState(0);
    const [TotalAmount,setTotalAmount] = useState(0)
    useEffect(() => {
        getOrders();
    },[Order])

    async function getOrders(){
        const userData = localStorage.getItem('user-dostava');
         const parsData = JSON.parse(userData);
         if(parsData !== null){
            if(parsData.token !== undefined){
                let order_id = await localStorage.getItem("order_id");
                let _id = JSON.parse(order_id)
                if(_id !== null) {
                    const result = await client.query({ query: MYORDERS, fetchPolicy: 'network-only' })
                    const order = result.data.orders.find(order => order.order_id === _id)
                    await client.writeQuery({ query: GETCARTITEMS, data: { cartItems: 0 } })
                    console.log(order)
    
                    setOrder(order.items)
                    setDeliveryCharges(order.delivery_charges)
                    setTotalAmount(order.order_amount - order.delivery_charges)
    
                    const config = await client.query({ query: GET_CONFIGURATION, fetchPolicy: 'network-only' })
                    console.log(config)
                    setConfiguration(config.data.configuration)
                }
            }
        }
        // else {alert('Please Login')}
    }

    console.log('Order Details of Last Order',Order)
    return (
        <Container className="wrapper" fluid>
            <Header  {...props} />
            <Container className="breadcrumb-area" fluid>
                <Row>
                    <Col lg="3">
                    </Col>
                    <Col lg="9" md="12" sm="12" xs="12" className="breadcrumb-section">
                    <h3>Order Details</h3>
                    <ul>
                        <li><Link to={'/'}>Home</Link></li>

                        <li><Link to={'/orderdetails'}>Order Details</Link></li>
                    </ul>
                    </Col>
                </Row>
            </Container>

            <Container className="content-area cart-page" fluid>
          <Row>
            <Col lg="2">

            </Col>
            <Col lg="8" className="cart-section">
              <h1 className="flashmessage text-center">Order Details</h1>
                <h3>Order Detail</h3>
                <Table responsive>
                    <thead>
                        <tr>
                            
                            <th>Image</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                      {
                        Order.length > 0 ?  Order.map((cartItem, idx) => 
                    {
                        // storeTotalAmout(cartItem.quantity,cartItem.food)
                        return (
                        <tr key ={idx}>
                            {/* ${getItemPrice(category,configuration)} */}
                        <td><img style ={{ width: "100px" }} src={cartItem.food.img_url}></img></td>
                        <td> {cartItem.food.title}</td>
                        <td><strong>
                            {/* {cartItem.food.vendor_pricing} */}
                        ${getItemPrice(cartItem.food,configuration)}
                        </strong></td>
                        <td>{cartItem.quantity}</td>
                    <td><strong> 
                        { parseFloat(cartItem.quantity) * parseFloat(getItemPrice(cartItem.food,configuration)) }</strong></td>
                        <td>
                            </td>
                    </tr>
                    )}
                        
                        ) : 'Not item added yet!'
                      }
                       
                    </tbody>
                    <tfoot>
                        <tr>
                           
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td><strong>Total {parseFloat(TotalAmount).toFixed(2)}</strong></td>
                            <td>&nbsp;</td>
                        </tr>
                    </tfoot>
                </Table>

                <Row>
                    <Col lg="8" md="7" sm="7" xs="12" className="voucher">
                        {/* <h2>VOUCHER</h2>
                        <p>Enter your coupon code if you have one.</p>
                        <input
                        onChangeText={(text) => {
                          setCoupon(text)
                        }}
                        type="text" placeholder="Voucher Code"></input>
                        <input type="submit" value="Apply" 
                        onClick={() => {
                          setValidCoupon(null)
                          setDiscountPercent(null)
                          if (coupon) mutate({ variables: { coupon: coupon } })
                        }}
                        /> */}
                    </Col>
                    <Col lg="4" md="5" sm="5" xs="12" className="subtotal">
                        <div>
                            <h4>Subtotal <span>{configuration.currency_symbol} {TotalAmount.toFixed(2)}</span></h4>
                      <h4>Shipping <span>{configuration.currency_symbol} 
                      {/* {configuration.delivery_charges}  */}
                      {deliveryCharges}
                      </span></h4>
                      <h4 className="blue">Total <span>{configuration.currency_symbol}
                       {/* {calculatePrice(configuration.delivery_charges, false)} */}
                       {TotalAmount + deliveryCharges}

                       </span></h4>
                            {/* <input type="submit" value="Checkout" onClick = {onCLickCheckout} /> */}
                        </div>
                    </Col>
                </Row>

            </Col>
            </Row>
        </Container>
          <Footer />
        </Container>
    )
}

export default OrderDetails