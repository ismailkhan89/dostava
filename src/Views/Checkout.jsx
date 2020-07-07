import React, {Component, useEffect, useState} from "react";
import Footer from '../Views/Footer.jsx';
import Header from '../Views/Header';
import FontAwesome from 'react-fontawesome'
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import '../Style.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import logo from '../logo.png';
import { stripeCurrencies, paypalCurrencies } from '../utils/currencies';
// import Analytics from '../utils/analytics';
import { useQuery, useMutation } from '@apollo/react-hooks'
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
import { server_url } from  "../config/config";
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from "graphql-tag";
import { setContext } from 'apollo-link-context'
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient } from 'apollo-client';
import {Link, useRouteMatch, useParams } from 'react-router-dom';
import { getConfiguration, placeOrder } from "../apollo/server";
// import { authLink } from '../library/authLink'
import { getCartItems } from '../apollo/client';
const authLink = setContext((_, { headers }) => {
  console.log("setContext",headers)
  // get the authentication token from local storage if it exists
  const userData = localStorage.getItem('user-dostava');
  console.log("userData",userData)
  const parsData = JSON.parse(userData);
  console.log("parsData>>",parsData)
  let token = parsData.token;
  console.log("parsDate",parsData)
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});
const cache = new InMemoryCache()
const httpLink = createUploadLink({
  uri: `${server_url}graphql`,
})

const client = new ApolloClient({
  link: authLink.concat(httpLink) ,
  cache
});
const GETCARTITEMS = gql`${getCartItems}`;
const GETCONFIGURATION = gql`${getConfiguration}`
const PLACEORDER = gql`${placeOrder}`
const PAYMENT_METHOD = ['STRIPE', 'PAYPAL', 'COD']
  function Checkout(props) {

    const [address] = useState(props.location.state?.address ?? null)
    const [coupon] = useState(props.location.state?.coupon ?? null)
    const [activeRadio, setActiveRadio] = useState("COD")
// console.log("clients>>", clients)
console.log("client", client)
console.log("clientRef", props)
    const { loading, error, data: dataConfig } = useQuery(GETCONFIGURATION)
    const [mutate, { loading: loadingMutation }] = useMutation(PLACEORDER, { onCompleted, onError, client } )
    function transformOrder(cartItems) {
        return cartItems.map(food => {
            return {
                food: food._id, quantity: food.quantity,
                vendor: food.vendor,
                variation: food.variation._id,
                addons: food.addons ? food.addons.map(({ _id, options }) => ({ _id, options: options.map(({ _id }) => _id) })) : []
            }
        })
    }

    async function onPayment() {
      console.log("on payemnt called")
        //check payment method
        // if (activeRadio === null) {
        //     showMessage({
        //         message: "No payment method selected.",
        //         duration: 3000,
        //         type: 'warning',
        //         floating: true,
        //         style: Styles.alertboxRed,
        //         titleStyle: { fontSize: scale(14), fontFamily: fontStyles.PoppinsRegular, paddingTop: 6 }
        //     })
        //     return
        // }
        const cartItemsStr = await localStorage.getItem('cartItems')
        const cartItems = cartItemsStr ? JSON.parse(cartItemsStr) : []
        if (checkPaymentMethod(dataConfig.configuration.currency)) {
            const items = transformOrder(cartItems)
            mutate({
                variables: {
                    orderInput: items, 
                    paymentMethod: "COD", 
                    couponCode: coupon,
                    address: {
                        label: "home",
                        delivery_address: "del address",
                        details: "del details",
                        longitude: "12319283.9",
                        latitude: "123419283.9"
                        // label: address.label,
                        // delivery_address: address.delivery_address,
                        // details: address.details,
                        // longitude: address.longitude,
                        // latitude: address.latitude
                    }
                }
            })

        }
        else {
            // showMessage({
            //     message: i18n.t('paymentNotSupported'),
            //     duration: 3000,
            //     type: 'warning',
            //     floating: true,
            //     style: Styles.alertboxRed,
            //     titleStyle: { fontSize: scale(14), fontFamily: fontStyles.PoppinsRegular, paddingTop: 6 }
            // })
        }
    }

    function checkPaymentMethod(currency) {
      let index_radio = activeRadio
      if (PAYMENT_METHOD[index_radio] === "STRIPE") {
          return stripeCurrencies.find(val => val.currency === currency)

      }
      if (PAYMENT_METHOD[index_radio] === "PAYPAL") {
          return paypalCurrencies.find(val => val.currency === currency)
      }
      return true
  }

  function onError(error) {
      console.log(error.networkError.result.errors[0].message)
      // showMessage({
      //     message: error.networkError.result.errors[0].message,
      //     duration: 3000,
      //     type: 'warning',
      //     floating: true,
      //     style: Styles.alertboxRed,
      //     titleStyle: { fontSize: scale(14), fontFamily: fontStyles.PoppinsRegular, paddingTop: 6 }
      // })
  }

  async function onCompleted(data) {
    // localStorage.setItem("cartItems",JSON.stringify([]))
    localStorage.removeItem("cartItems");   
    let trackingOpts = {
        id: data.placeOrder.user._id,
        usernameOrEmail: data.placeOrder.user.email,
        orderId: data.placeOrder.order_id
    };
    // Analytics.identify(data.placeOrder.user._id, trackingOpts);
    // Analytics.track(Analytics.events.USER_PLACED_ORDER, trackingOpts);
    if (PAYMENT_METHOD[activeRadio] === "COD") {
        props.navigation.replace('Thankyou', { _id: data.placeOrder._id })
    }
    else if (PAYMENT_METHOD[activeRadio] === "PAYPAL") {
        props.navigation.replace('Paypal', {
            _id: data.placeOrder.order_id,
            currency: dataConfig.configuration.currency
        })
    }
    else if (PAYMENT_METHOD[activeRadio] === "STRIPE") {
        props.navigation.replace('StripeCheckout', {
            _id: data.placeOrder.order_id,
            amount: data.placeOrder.order_amount,
            email: data.placeOrder.user.email,
            currency: dataConfig.configuration.currency
        })
    }
}

console.log("checkout screen",props)
    const { cartItems, totalPriceExcDelivery, totalPriceIncDelivery,
       currency_symbol, delivery_charges } =  props.location.state;
    console.log("cartItems screen",cartItems)
    return(
      
        <Container className="wrapper" fluid>
        
        <Header  {...props} />
        
        <Container className="breadcrumb-area" fluid>
          <Row>
            <Col lg="3">
            </Col>
            <Col lg="9" md="12" sm="12" xs="12" className="breadcrumb-section">
              <h3>My Checkout</h3>
              <ul>
                <li><Link>Home</Link></li>

                <li><Link>My Checkout</Link></li>
              </ul>
            </Col>
          </Row>
        </Container>

        <Container className="content-area checkout-page" fluid>
          <Row>
            <Col lg="2">

            </Col>
            <Col lg="8" className="checkout-section">
            <Tabs>
              <TabList className="cart-tabs-head">
                <Row>
                <Tab> <FontAwesome name="check-circle-o" /> Shipping and Checkout</Tab>
                <Tab> <FontAwesome name="check-circle-o" /> Confirmation</Tab>
                </Row>
              </TabList>
          
              <TabPanel>
                
                <Row>
                  <Col lg="7" md="7" sm="12" xs="12" className="shipping">
                    <Col lg="12" md="12" sm="12" xs="12" className="grey-bg">
                      <h3>Billing Details</h3>
                    </Col>
                    <form>
                      <div className="form-group half">
                        <input type="text" placeholder="First Name"></input>
                      </div>
                      <div className="form-group half">
                        <input type="text" placeholder="Last Name"></input>
                      </div>
                      <div className="form-group full">
                        <input type="text" placeholder="Shipping Address"></input>
                      </div>
                      <div className="form-group full">
                        <input type="text" placeholder="City"></input>
                      </div>
                      <div className="form-group half">
                        <select>
                            <option selected>Country</option>
                            <option>Pakistan</option>
                            <option>Pakistan</option>
                            <option>Pakistan</option>
                            <option>Pakistan</option>
                        </select>
                      </div>
                      <div className="form-group half">
                        <select>
                          <option selected>City</option>
                          <option>Karachi</option>
                          <option>Islamabad</option>
                          <option>Lahore</option>
                          <option>Multan</option>
                        </select>
                      </div>
                      <div className="form-group full">
                        <input type="text" placeholder="Postal Code / ZIP"></input>
                      </div>
                      <div className="form-group full">
                        <input type="text" placeholder="Phone"></input>
                      </div>
                      <div className="form-group full">
                        <input type="text" placeholder="Email Address"></input>
                      </div>
                      <div className="form-group full">
                        <label>
                          <input type="checkbox"></input> 
                            Save this Information
                        </label>
                      </div>
                      <div className="form-group half">
                        <Link to="/">Back to Shopping</Link>
                      </div>
                      <div className="form-group half">
                        <input type="submit" value="Payment"></input>
                      </div>
                    </form>
                  </Col>
                  <Col lg="5" className="cart-items">
                    {
                    cartItems && cartItems.length > 0 ?  cartItems.map((item, index)=>(
                        <Row key={index} >
                          <Col lg="4">
                            <img style = {{width: '200px'}} src= {item.img_url}></img>
                          </Col>
                          <Col lg="6">
                            <h3>{item.title}e</h3>
                            <p>
                            <strong>{item.price}</strong>      
                              {/* <span>$12.49</span> */}
                            </p>
                          </Col>
                          <Col lg="2">
                            <FontAwesome onClick={e => { 
                                      e.preventDefault()
                            }} name="heart-o" />
                          </Col>
                        </Row>
                      )) : "No Items"
                    }
                    <Row>
                      <Col lg="12" className="cart-total">
                        <h6>
                          <strong>Subtotal</strong>
                            <span>{currency_symbol} {totalPriceExcDelivery}</span>
                        </h6>
                        <h6>
                          <strong>Shipping</strong>
                          <span>{currency_symbol} {delivery_charges}</span>
                        </h6>
                        <h2>
                          <strong>Total</strong>
                          <span> {currency_symbol} {totalPriceIncDelivery}</span>
                        </h2>
                      </Col>
                    </Row>
                    <h4>Your Credit Card</h4>
                    <form>
                      <div className="form-group full">
                        <input type="text" placeholder="Card Number"></input>
                      </div>
                      <div className="form-group full">
                        <input type="text" placeholder="Name on Card"></input>
                      </div>
                      <div className="form-group half">
                        <input type="text" placeholder="Expiration (MM / YY)"></input>
                      </div>
                      <div className="form-group half">
                        <input type="text" placeholder="Security code"></input>
                      </div>
                      
                      <div className="form-group half">
                        <Link to="/">Back to Shopping</Link>
                      </div>
                      <div className="form-group half">
                        <Button  onClick={e => {
                                e.preventDefault()
                                onPayment()
                                                          
                                                  }} value="Payment">Payment</Button>
                      </div>
                    </form>
                  </Col>
                  <Col lg="5" className="cart-items">
                    <Col lg="12" className="grey-bg">
                      <h3>Billing Details</h3>
                    </Col>
                    <div class="carts">
                      <Row>
                        <Col lg="4">
                          <img src="../Assets/Img/cart-product.png"></img>
                        </Col>
                        <Col lg="6">
                          <h3>Fresh Packet of Rice</h3>
                          <p>
                            <strong>$10.49</strong>      
                            <span>$12.49</span>
                          </p>
                        </Col>
                        <Col lg="2">
                          <FontAwesome name="heart-o" />
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <img src="../Assets/Img/cart-product.png"></img>
                        </Col>
                        <Col lg="6">
                          <h3>Fresh Packet of Rice</h3>
                          <p>
                            <strong>$10.49</strong>      
                            <span>$12.49</span>
                          </p>
                        </Col>
                        <Col lg="2">
                          <FontAwesome name="heart-o" />
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <img src="../Assets/Img/cart-product.png"></img>
                        </Col>
                        <Col lg="6">
                          <h3>Fresh Packet of Rice</h3>
                          <p>
                            <strong>$10.49</strong>      
                            <span>$12.49</span>
                          </p>
                        </Col>
                        <Col lg="2">
                          <FontAwesome name="heart-o" />
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12" className="cart-total">
                          <h6>
                            <strong>Subtotal</strong>
                            <span>$400.00</span>
                          </h6>
                          <h6>
                            <strong>Shipping</strong>
                            <span>$20.00</span>
                          </h6>
                          <h2>
                            <strong>Total</strong>
                            <span>$420.00</span>
                          </h2>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>

              </TabPanel>
            </Tabs>
            </Col>
            <Col lg="2">

            </Col>
          </Row>
        
          </Container>
        
        
        <Footer />

      
      </Container>
     
      
    )
  }

  export default Checkout;