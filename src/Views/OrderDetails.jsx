import React, { Component, useEffect, useState } from "react";
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
import { Link } from "react-router-dom";
import Footer from "../Views/Footer.jsx";
import Header from "../Views/Header";
import FontAwesome from "react-fontawesome";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";
import { setContext } from "apollo-link-context";
import { createUploadLink } from "apollo-upload-client";
import { ApolloClient } from "apollo-client";
import { server_url } from "../config/config";
import { myOrders, getConfiguration } from "../apollo/server";
import { getCartItems } from "../apollo/client";
import { getItemPriceOrderDetails } from "../utils/pricing";
import Spinner from "reactstrap/lib/Spinner";

const authLink = setContext((_, { headers }) => {
  console.log("setContext", headers);
  // get the authentication token from local storage if it exists
  const userData = localStorage.getItem("user-dostava");
  const parsData = JSON.parse(userData);

  if (parsData !== null) {
    let token = parsData.token;
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  }
  // return the headers to the context so httpLink can read them
});

const cache = new InMemoryCache();
const httpLink = createUploadLink({
  uri: `${server_url}graphql`,
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

const MYORDERS = gql`
  ${myOrders}
`;
const GETCARTITEMS = gql`
  ${getCartItems}
`;
const GET_CONFIGURATION = gql`
  ${getConfiguration}
`;
 
function OrderDetails(props) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [Order, setOrder] = useState([]);
  const [configuration, setConfiguration] = useState([]);
  const [discountPercent, setDiscountPercent] = useState(null);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [serviceCharges, setServiceCharges] = useState(0);
  const [title, setTitle] = useState("");

  const [TotalAmount, setTotalAmount] = useState(0);
  const [SubTotal, setSubTotalAmount] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getOrders();
  }, [Order]);

 
  async function getOrders() {
    
    const userData = localStorage.getItem("user-dostava");
    const parsData = JSON.parse(userData);
    if (parsData !== null) {
      setLoader(true)
      if (parsData.token !== undefined) {
        let order_id = await localStorage.getItem("order_id");
        let _id = JSON.parse(order_id);
        if (_id !== null) {
          const result = await client.query({
            query: MYORDERS,
            fetchPolicy: "network-only",
          });
          const order = result.data.orders.find(
            (order) => order.order_id === _id
          );
          await client.writeQuery({
            query: GETCARTITEMS,
            data: { cartItems: 0 },
          });
          console.log("Full ORder", order);

          if (order !== undefined) {
            setDeliveryAddress(order);
            setOrder(order.items);
            setDeliveryCharges(order.delivery_charges);
            setServiceCharges(order.service_charges)
            setSubTotalAmount(order.order_amount - order.delivery_charges - order.service_charges);
            setTotalAmount(order.order_amount)
            setTitle(order.order_id);
          }

          const config = await client.query({
            query: GET_CONFIGURATION,
            fetchPolicy: "network-only",
          });
          console.log(config);
          setConfiguration(config.data.configuration);
        }
      }
      setLoader(false)
    }
    setLoader(false)
    // else {alert('Please Login')}
  }

  console.log("Order Details of Last Order", Order);
  return (
    <Container className="wrapper" fluid>
      <Header {...props} title="Order Details" />
      <Container className="breadcrumb-area order-details-breadcrumb" fluid>
        <Row>
          <Col lg="3"></Col>
          <Col lg="9" md="12" sm="12" xs="12" className="breadcrumb-section">
            <h3>Order Details</h3>
          </Col>
        </Row>
      </Container>

      <Container className="content-area cart-page" fluid>
        <Row>
          <Col lg="2"></Col>
          <Col lg="8" className="cart-section">
            <h1 className="flashmessage text-center">
              ORDER DETAILS {title !== "" && ": " + title}
            </h1>
            {/* <h3>{title}</h3>    */}
            {!loader ? <>
             <Table responsive>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Vendor</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {Order.length > 0
                  ? Order.map((cartItem, idx) => {
                      // storeTotalAmout(cartItem.quantity,cartItem.food)
                      return (
                        <tr key={idx}>
                          {/* ${getItemPrice(category,configuration)} */}
                          <td>
                            <img
                              style={{ width: "100px" }}
                              src={cartItem.food.img_url}
                            ></img>
                          </td>
                          <td> {cartItem.food.user.business_name}</td>
                          <td> {cartItem.food.title}</td>
                          <td>
                            <strong>
                              ${cartItem.food.vendor_pricing}
                              {/* {getItemPriceOrderDetails(
                                cartItem.food,
                                configuration
                              )} */}
                            </strong>
                          </td>
                          <td>{cartItem.quantity}</td>
                          <td>
                            <strong>
                            ${cartItem.food.vendor_pricing * cartItem.quantity}
                              {/* {parseFloat(cartItem.quantity) *
                                parseFloat(
                                  getItemPriceOrderDetails(
                                    cartItem.food,
                                    configuration
                                  )
                                )} */}
                            </strong>
                          </td>
                          <td></td>
                        </tr>
                      );
                    })
                  : "Not item added yet!"}
              </tbody>
              <tfoot>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>
                    <strong>Total {parseFloat(SubTotal).toFixed(2)}</strong>
                  </td>
                  <td>&nbsp;</td>
                </tr>
              </tfoot>
            </Table>

            <Row>
              <Col lg="8" md="7" sm="7" xs="12" className={deliveryAddress ? 'subtotal' : 'voucher'}>
                <div>
                {deliveryAddress && deliveryAddress.building_name !== "" &&  <h4>
                    Building Name <span>{deliveryAddress?.building_name}</span>
                  </h4>} 

                  {deliveryAddress && deliveryAddress.floor_name !== "" &&    <h4>
                    Floor Name <span>{deliveryAddress?.floor_name} </span>
                  </h4> }

                  {deliveryAddress &&  deliveryAddress.delivery_address !== "" &&  <h4>
                    Delivery Address <span>{deliveryAddress?.delivery_address?.delivery_address} </span>
                  </h4> }

                  {deliveryAddress &&  deliveryAddress.street_name !== "" &&  <h4>
                   Street Name <span>{deliveryAddress.street_name} </span>
                  </h4> }

                  {deliveryAddress &&  deliveryAddress.order_description !== "" &&  <h4>
                  Order Description <span>{deliveryAddress.order_description} </span>
                  </h4> }
                </div>
              </Col>
              {/*  <Col lg="0" md="7" sm="7" xs="12" className="voucher">
                      <h2>VOUCHER</h2>
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
                        /> 
                    </Col> */}
              <Col lg="4" md="5" sm="5" xs="12" className="subtotal">
                <div>
                  <h4>
                    Subtotal{" "}
                    <span>
                      {configuration.currency_symbol} {SubTotal.toFixed(2)}
                    </span>
                  </h4>
                  <h4>
                    Delivery charges{" "}
                    <span>
                      {configuration.currency_symbol}
                      {/* {configuration.delivery_charges}  */}
                      {deliveryCharges}
                    </span>
                  </h4>
                  <h4>
                    Service charges{" "}
                    <span>
                      {configuration.currency_symbol}
                      {/* {configuration.delivery_charges}  */}
                      {serviceCharges}
                    </span>
                  </h4>


                  
                  <h4 className="blue">
                    Total{" "}
                    <span>
                      {configuration.currency_symbol}
                      {/* {calculatePrice(configuration.delivery_charges, false)} */}
                      {TotalAmount.toFixed(2)}
                    </span>
                  </h4>
                  {/* <input type="submit" value="Checkout" onClick = {onCLickCheckout} /> */}
                </div>
              </Col>
            </Row>
             </> : <h1 className="flashmessage text-center">
                <Spinner />
             </h1> }
          </Col>
        </Row>
        <Row className="order-details-bottom">
          <Col lg="2"></Col>
          <Col lg="10">
            <h2>Thank you for shopping with dostava!</h2>
            <p>Your Order Status will be updated by the store</p>
            <a href="#">Give Feedback</a>
            <div className="follow-us">
              <span>Follow us</span>
              <Link to="/about">
                <FontAwesome name="facebook" />
              </Link>
              <Link to="/about">
                <FontAwesome name="instagram" />
              </Link>
              <Link to="/about">
                <FontAwesome name="twitter" />
              </Link>
              <Link to="/about">
                <FontAwesome name="youtube-play" />
              </Link>
              <Link to="#" className="continue-shopping">
                Continue Shopping
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Container>
  );
}

export default OrderDetails;
