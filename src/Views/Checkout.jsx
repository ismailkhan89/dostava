import React, {Component} from "react";
import Footer from '../Views/Footer.jsx';
import Header from '../Views/Header';
import FontAwesome from 'react-fontawesome'
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import '../Style.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import logo from '../logo.png';

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
import {Link, useRouteMatch, useParams } from 'react-router-dom';

  function Checkout(props) {

console.log("checkout screen",props)
    const { cartItems, totalPriceExcDelivery, totalPriceIncDelivery, currency_symbol, delivery_charges } = props.location.state;
    console.log("cartItems screen",cartItems)
    return(
      
        <Container className="wrapper" fluid>
        
        <Header  {...props} />
        
        <Container className="breadcrumb-area" fluid>
          <Row>
            <Col lg="3">
            </Col>
            <Col lg="4" className="breadcrumb-section">
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
                <Tab disabled> <FontAwesome name="check-circle-o" /> Confirmation</Tab>
                </Row>
              </TabList>
          
              <TabPanel>
                <Row className="grey-bg">
                  <Col lg="12">
                    <Row className="checkout-head">
                      <Col lg="7">
                        <h3>Billing Details</h3>
                      </Col>
                      <Col lg="5">
                        <h3>Your Order</h3>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col lg="7" className="shipping">
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
                      cartItems.map((item, index)=>(
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
                            <FontAwesome name="heart-o" />
                          </Col>
                        </Row>
                      ))
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
                  </Col>
                </Row>
                
              </TabPanel>
              <TabPanel>
                <h2>Any content 2</h2>
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