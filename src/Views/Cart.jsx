import React, {Component, useEffect, useState} from "react";
import Footer from '../Views/Footer.jsx';
import Header from '../Views/Header';
import FontAwesome from 'react-fontawesome'
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import '../Style.css';
import logo from '../logo.png';
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
import {Link, useRouteMatch, useParams } from 'react-router-dom';
import { createUploadLink } from 'apollo-upload-client';
import gql from "graphql-tag";
import { getCategories, foodByIds, getCoupon } from "../apollo/server";
import { getCartItems } from '../apollo/client';
import { useQuery, useMutation } from '@apollo/react-hooks'
import Checkout from "./Checkout.jsx";
const GETCARTITEMS = gql`${getCartItems}`;
const GET_COUPON = gql`${getCoupon}`
const FOOD_BY_IDS = gql`${foodByIds}`

function Cart(props) {
  
  const { client, data, loading } = useQuery(GETCARTITEMS)
  const [cartItems, setCartItems] = useState([])
  const [configuration, setConfiguration] = useState([])
	const [foods, setFoods] = useState([])
	const [coupon, setCoupon] = useState('')
	const [discountPercent, setDiscountPercent] = useState(null)
	const [validCoupon, setValidCoupon] = useState(null)
	const [selectedAddress, setSelectedAddress] = useState(null)
	const [loadingData, setLoadingData] = useState(true)
	const [mutate, { loading: loadingMutation }] = useMutation(GET_COUPON, {onCompleted, onError})
	// const addressObj = props.route.params?.AddressObject ?? null


    useEffect(() => {
      didFocus()
    }, [])
    useEffect(() => {
      setConfiguratoins()
    }, [])

    async function setConfiguratoins(){
      let config = await localStorage.getItem("configuration");
      console.log("config ", config);
      setConfiguration(JSON.parse(config))
    }
    function onCompleted({ coupon }) {
      console.log("coupon>>",coupon)
      if (coupon) {
        if (coupon.enabled) {
          setDiscountPercent(coupon.discount)
          setValidCoupon(coupon.code)
  
          // showMessage({
          //   message: 'Coupon discount applied',
          //   type: 'success',
          //   floating: true,
          //   style: styles.alertboxGreen,
          //   titleStyle: { fontSize: scale(14), fontFamily: fontStyles.PoppinsRegular, paddingTop: 6 }
          // })
        }
        else {
          // showMessage({
          //   message: 'Coupon Unavailable',
          //   type: 'warning',
          //   floating: true,
          //   style: styles.alertboxRed,
          //   titleStyle: { fontSize: scale(14), fontFamily: fontStyles.PoppinsRegular, paddingTop: 6 }
          // })
        }
      }
    }

    function onError(error) {
      console.log("error>>",error)
      // showMessage({
      //   message: 'Invalid Coupon',
      //   type: 'warning',
      //   floating: true,
      //   style: styles.alertboxRed,
      //   titleStyle: { fontSize: scale(14), fontFamily: fontStyles.PoppinsRegular, paddingTop: 6 }
      // })
    }
    function onCLickCheckout(){
      const totalPriceExcDelivery = calculatePrice(0, false);
      const totalPriceIncDelivery = calculatePrice(configuration.delivery_charges, false) ;
      props.history.push({
        pathname: '/checkout',
        state: { cartItems: cartItems, 
          totalPriceExcDelivery: totalPriceExcDelivery, 
          totalPriceIncDelivery: totalPriceIncDelivery,
          currency_symbol: configuration.currency_symbol,
          delivery_charges:configuration.delivery_charges,
          cartItemCount: cartItems.length
         }
      })
    }

    async function didFocus() {
      try {
        const cartItemsStr = await localStorage.getItem('cartItems')
        console.log("cartItemsStr>>>",cartItemsStr)
        const cartItems = JSON.parse(cartItemsStr)
        console.log("<<cartItems>>>",cartItems)
        const validatedItems = []
        if (cartItems && cartItems.length) {
          const ids = cartItems.map(({ _id }) => _id)
          const { data: { foodByIds } } = await client.query({ query: FOOD_BY_IDS, variables: { ids }, fetchPolicy: 'network-only' })
          const transformCart = cartItems.map(cartItem => {
            const food = foodByIds.find(food => food._id === cartItem._id)
            if (!food)
              return null
            const variation = food.variations.find(variation => variation._id === cartItem.variation._id)
            if (!variation)
              return null
            if (!food.stock)
              return null
            if (food.stock < cartItem.quantity) {
              cartItem.quantity = food.stock
            }
            let title = `${food.title}(${variation.title})`
            let price = variation.price
            if (cartItem.addons)
              cartItem.addons.forEach(addon => {
                const cartAddon = variation.addons.find(add => add._id === addon._id)
                addon.options.forEach(option => {
                  const optionfound = cartAddon.options.find(opt => opt._id === option._id)
                  price += optionfound.price
                })
              })
            validatedItems.push(cartItem)
            return {
              ...cartItem,
              img_url: food.img_url,
              title: title,
              price: price.toFixed(2)
            }
          })
          client.writeQuery({ query: GETCARTITEMS, data: { cartItems: validatedItems.length } })
          await localStorage.setItem('cartItems', JSON.stringify(validatedItems))
  
          // if (props.navigation.isFocused()) {
            setCartItems(transformCart.filter(item => item))
            setLoadingData(false)
            setFoods(foodByIds)
          // }
        }
        else {
          if (props.navigation.isFocused()) {
            setLoadingData(false)
          }
        }
      } catch (e) {
        // showMessage({
        //   message: 'Error occured',
        //   duration: 3000,
        //   type: 'warning',
        //   floating: true,
        //   style: styles.alertboxRed,
        //   titleStyle: { fontSize: scale(14), fontFamily: fontStyles.MuseoSans500 }
        // })
      }
    }
    function calculatePrice(deliveryCharges = 0, withDiscount) {
      let itemTotal = 0
      cartItems.forEach(cartItem => {
        itemTotal += cartItem.price * cartItem.quantity
      })
      if (withDiscount && discountPercent) {
        itemTotal = itemTotal - ((discountPercent / 100) * itemTotal)
      }
      return (itemTotal + deliveryCharges).toFixed(2)
    }

    async function removeCartItem (newItem){
          const items = cartItems.filter((product) => product._id !== newItem._id)
          await localStorage.setItem('cartItems', JSON.stringify(items))
          setCartItems(items);
    } 

    async function addQuantityToCartItem (newItem) {
      console.log("item quantity", newItem)
          const cartItemsStr = localStorage.getItem('cartItems') || '[]'
          const cartItems = JSON.parse(cartItemsStr)
          const index = cartItems.findIndex((product) => product._id === newItem._id)
          if (index < 0)
              cartItems.push(newItem)
          else {
              cartItems[index].quantity = cartItems[index].quantity + 1
          }
          await localStorage.setItem('cartItems', JSON.stringify(cartItems))
          setCartItems(cartItems);
          client.writeQuery({ query: GETCARTITEMS, data: { cartItems: cartItems.length } })
      }
      
      async function removeQuantityToCartItem (newItem) {
          const cartItemsStr = localStorage.getItem('cartItems') || '[]'
          const cartItems = JSON.parse(cartItemsStr)
          const index = cartItems.findIndex((product) => product._id === newItem._id)
          if (index < 0)
              cartItems.push(newItem)
          else {
              cartItems[index].quantity = cartItems[index].quantity - 1
          }
          await localStorage.setItem('cartItems', JSON.stringify(cartItems))
          setCartItems(cartItems);
          client.writeQuery({ query: GETCARTITEMS, data: { cartItems: cartItems.length } })
      }
    console.log("get config", configuration)
    console.log("get props", props)
    return(
      
        <Container className="wrapper" fluid>
        
        <Header  {...props} />
        
        <Container className="breadcrumb-area" fluid>
          <Row>
            <Col lg="3">
            </Col>
            <Col lg="3" className="breadcrumb-section">
              <h3>My Cart</h3>
              <ul>
                <li><Link to = "/" >Home</Link></li>

                <li><Link to = "/cart" >My Cart</Link></li>
              </ul>
            </Col>
          </Row>
        </Container>

        <Container className="content-area cart-page" fluid>
          <Row>
            <Col lg="2">

            </Col>
            <Col lg="8" className="cart-section">
              <h1 className="flashmessage text-center"> Flash Message Here</h1>
                <h3>My Cart</h3>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>&nbsp;</th>
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
                        cartItems.length > 0 ?  cartItems.map((cartItem, idx) => (
                            <tr key ={idx}>
                            <td><input type="checkbox"></input></td>
                            <td><img style ={{ width: "100px" }} src={cartItem.img_url}></img></td>
                            <td> {cartItem.title}</td>
                            <td><strong>{cartItem.price}</strong></td>
                            <td>
                              <button   onClick={e => {
                                        e.preventDefault()
                                        removeQuantityToCartItem(cartItem)
                                        }} >
                                <FontAwesome name="minus"></FontAwesome>
                              </button> <span>{cartItem.quantity}</span> <button onClick={e => {
                                        e.preventDefault()
                                        addQuantityToCartItem(cartItem)
                                        }}>
                                <FontAwesome name="plus"></FontAwesome>
                              </button>
                            </td>
                        <td><strong> { parseInt(cartItem.quantity)*parseInt(cartItem.price) }</strong></td>
                            <td><FontAwesome 
                             onClick={e => {
                              e.preventDefault()
                              removeCartItem(cartItem)
                                  
                          }}
                            name="trash" /></td>
                        </tr>)) : 'laoding...'
                      }
                       
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td><strong>Total {(calculatePrice(0, false))}</strong></td>
                            <td>&nbsp;</td>
                        </tr>
                    </tfoot>
                </Table>
                <Row>
                    <Col lg="8" className="voucher">
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
                    </Col>
                    <Col lg="4" className="subtotal">
                        <div>
                            <h4>Subtotal <span>{configuration.currency_symbol} {calculatePrice(0, false)}</span></h4>
                      <h4>Shipping <span>{configuration.currency_symbol} {configuration.delivery_charges} </span></h4>
                      <h4 className="blue">Total <span>{configuration.currency_symbol} {calculatePrice(configuration.delivery_charges, false)}</span></h4>
                            <input type="submit" value="Checkout" onClick = {onCLickCheckout} />
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col lg="2">

            </Col>
          </Row>
          </Container>
        
        <Footer />

      
      </Container>
     
      
    )

}

  export default Cart;