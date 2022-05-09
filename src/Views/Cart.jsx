import React, {Component, useContext, useEffect, useState} from "react";
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
import { ApolloClient } from 'apollo-client';
import {Link, useRouteMatch, useParams } from 'react-router-dom';
import { createUploadLink } from 'apollo-upload-client';
import gql from "graphql-tag";
import { getCategories, foodByIds, getCoupon , getConfiguration  } from "../apollo/server";
import { getCartItems } from '../apollo/client';
import { useQuery, useMutation } from '@apollo/react-hooks'
import { server_url } from  "../config/config";
import { InMemoryCache } from 'apollo-cache-inmemory';
import Checkout from "./Checkout.jsx";
import { getItemPrice } from '../utils/pricing'
import { parse } from "graphql";
import Spinner from "reactstrap/lib/Spinner";
import ConfigurationContext from "../context/Configuration.js";
 
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

const GET_CONFIGURATION = gql`${getConfiguration}`;

function Cart(props) {

  React.useEffect(()=>{
    setStoreIdLocally()
  },[])

  async function setStoreIdLocally() {
    let store_id = await localStorage.getItem('lastStoreId');
    console.log("get store id", store_id)
    setStoreId(JSON.parse(store_id))
  }
  
  const config = useContext(ConfigurationContext)
  const [storeId, setStoreId] = useState('')
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
  const [vendorIds, setVendorIds] = useState([])
  const [deliveryCharges, setdeliveryCharges] = useState(0)
  
  const [loader,setLoader] = useState(false)
	// const addressObj = props.route.params?.AddressObject ?? null

  const [newconfiguration ,setnewConfiguration] = useState('');

  const {loading :loadingConfig,error : errorConfig,data : dataConfig} = useQuery(GET_CONFIGURATION, { fetchPolicy: 'cache-and-network'  })

   useEffect(() => {
    const onCompleted = async (dataConfig) => {
      didFocus()
    }
      if(!loadingConfig && !errorConfig && !!dataConfig){
        onCompleted(dataConfig)
       
      }
   },[dataConfig])

    useEffect(() => {
      setConfiguratoins()
    }, [])

    useEffect(() => {
      calculateDeliveryCharges()
    },[vendorIds,cartItems,dataConfig])
    
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
    async function GoBackToStore(){
      if(vendorIds){
        props.history.push({pathname: "/storesitem/"+vendorIds[0]})
      }else{
        props.history.push({pathname: "/stores"})
      }
    }

     async function onCLickCheckout(){
      const getLogin = await localStorage.getItem('user-dostava');
      const loginData = getLogin ? JSON.parse(getLogin) : null

      if(loginData !== null){
        const totalPriceExcDelivery = calculatePrice(0, false);
        const totalPriceIncDelivery = calculatePrice(configuration.delivery_charges, false) ;
        const newTotalPrice = calculatePrice(deliveryCharges, false) ;

        props.history.push({
          pathname: '/checkout',
          state: { cartItems: cartItems, 
            totalPriceExcDelivery: totalPriceExcDelivery, 
            totalPriceIncDelivery: totalPriceIncDelivery,
            newTotalPrice : (parseFloat(newTotalPrice) + parseFloat(ServiceCharges())).toFixed(2),
            newTotalDeliveryCharges: deliveryCharges,
            currency_symbol: configuration.currency_symbol,
            delivery_charges:configuration.delivery_charges,
            cartItemCount: cartItems.length,
            services_charges : ServiceCharges()
           }
        })
      }
      else if(loginData === null){
        props.history.push({
          pathname : '/login',
          state : {from : 'cart'} 
        })
      }
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
          console.log("<<cartItems>>>ids",ids)
          const { data: { foodByIds } } = await client.query({ query: FOOD_BY_IDS, variables: { ids }, fetchPolicy: 'network-only' })
          const transformCart = cartItems.map(cartItem => {
            console.log(foodByIds)
            const food = foodByIds.find(food => food._id === cartItem._id)
            console.log(" ",food)
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

            // let title = `${food.title}${variation.title ? '('+variation.title+')' : ''}`
            let title = `${food.title}`
            let price =  parseFloat(food.vendor_pricing)
         
            // price = parseFloat(getItemPrice(food,dataConfig))
            if (cartItem.addons)
              cartItem.addons.forEach(addon => {
                const cartAddon = variation.addons.find(add => add._id === addon._id)
                addon.options.forEach(option => {
                  const optionfound = cartAddon.options.find(opt => opt._id === option._id)
                  price += optionfound.price
                })
              })
              console.log("<<cartItems>>>ready to push",cartItem)
            
              validatedItems.push(cartItem)

            console.log("<<validatedItems pushed>>>",validatedItems)
            return {
              ...cartItem,
              img_url: food.img_url,
              title: title,
              price: price.toFixed(2)
            }
          })
          console.log("<<updating client cart items>>>",validatedItems)
          client.writeQuery({ query: GETCARTITEMS, data: { cartItems: validatedItems.length } })
          await localStorage.setItem('cartItems', JSON.stringify(validatedItems))
  
          // if (props.navigation.isFocused()) {
            setCartItems(transformCart.filter(item => item))
            setLoadingData(false)
            setFoods(foodByIds)
            setVendorIdsArray(transformCart.filter(item => item))
            setLoader(false)
          // }
        }
        else {
          if (props.navigation.isFocused()) {
            setLoadingData(false)
            setLoader(false)
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
      console.log("deliveryChargesdeliveryCharges",deliveryCharges)
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
          console.log('items count', items)
          client.writeQuery({ query: GETCARTITEMS, data: { cartItems: items.length } })
          setCartItems(items);

          if(items.length === 0){
            localStorage.removeItem('vendorIds')
          }
   } 

    async function addQuantityToCartItem (newItem) {
   
           setLoader(true)
          const cartItemsStr = localStorage.getItem('cartItems') || '[]'
          const cartItems = JSON.parse(cartItemsStr)

          const index = cartItems.findIndex((product) => product._id === newItem._id)
          if (index < 0)
              cartItems.push(newItem)
          else {
              cartItems[index].quantity = cartItems[index].quantity + 1
              cartItems[index].vendor_quantity = cartItems[index].vendor_quantity + 1
          }
          await localStorage.setItem('cartItems', JSON.stringify(cartItems))
          setCartItems(cartItems);
          didFocus()
          
        
      }
      
      async function removeQuantityToCartItem (newItem) {
          setLoader(true)
          let vIds = await localStorage.getItem("vendorIds");
	        const vendorIds = vIds === null ? [] : JSON.parse(vIds);
          console.log('vendorIds>>',vendorIds)
          const cartItemsStr = await localStorage.getItem('cartItems') || '[]'
          const cartItems = JSON.parse(cartItemsStr)
          console.log('cartItems>>',cartItems)
          const index = cartItems.findIndex((product) => product._id === newItem._id)
          const filteredItem = cartItems.filter((product) => product._id === newItem._id)
          
          console.log('index>>',index)
          // const selectedItemVendorId = index[0].vendor;
          // console.log('selectedItemVendorId',selectedItemVendorId)
          if(filteredItem && filteredItem[0].quantity === 1 ){
            const isMoreItemsExistWithSelectedVendor = cartItems.filter(res => res.vendor === filteredItem[0].vendor && res.quantity < 2);
            console.log('isMoreItemsExistWithSelectedVendor',isMoreItemsExistWithSelectedVendor)
            if(isMoreItemsExistWithSelectedVendor && isMoreItemsExistWithSelectedVendor.length > 0 ){
              const indexs = vendorIds.indexOf(filteredItem[0].vendor);
              if (indexs > -1) {
                vendorIds.splice(indexs,1)
              }
              localStorage.setItem("vendorIds", JSON.stringify(vendorIds))
              // setVendorIds(vendorIds)
            }
          }
         
         
         
          if (index < 0)
              cartItems.push(newItem)
          else {
              if(cartItems[index].quantity > 0){
                cartItems[index].quantity = cartItems[index].quantity - 1
                cartItems[index].vendor_quantity = cartItems[index].vendor_quantity - 1
              }
          }

          if(cartItems[index].quantity <= 0){
            const items = cartItems.filter((product) => product._id !== newItem._id)
            await localStorage.setItem('cartItems', JSON.stringify(items))
            client.writeQuery({ query: GETCARTITEMS, data: { cartItems: items.length } })
            setCartItems(items);
            didFocus()
          }
          else{
            await localStorage.setItem('cartItems', JSON.stringify(cartItems))
            setCartItems(cartItems);
            didFocus()
          }
          setLoader(false)
         
          
         
       }
    console.log("get config", configuration)
    console.log("get props", props)

    

    async function setVendorIdsArray(cart){
      const cartItemsStr = await localStorage.getItem('cartItems')
      const cartItems = cartItemsStr ? JSON.parse(cartItemsStr) : []
      let vendorIds = [];
      cartItems.map(food => {  
        if(vendorIds.length > 0){
          var cont = vendorIds.find(a => {
            if(a !== food.vendor) vendorIds.push(food.vendor)
          })
        }
        else{
          vendorIds.push(food.vendor)
        }
      })
       console.log("Vids??>>",vendorIds)
      setVendorIds(vendorIds);
     
    } 

   async function calculateDeliveryCharges(){
      let del_charges = 0
      let itemTotal = 0
      cartItems.forEach(cartItem => {
        itemTotal += cartItem.price * cartItem.quantity
      })
      if(!!dataConfig){
        console.log("dataConfigggg",dataConfig.configuration)
        if(parseFloat(itemTotal) >= parseFloat(dataConfig.configuration.free_delivery) ){
          del_charges = 0;
        }else if(parseFloat(itemTotal) >= parseFloat(dataConfig.configuration.step_one_delivery) && vendorIds && vendorIds.length === 1 ){
          del_charges = dataConfig.configuration.one_vendor_above_hundred;
        }else if(parseFloat(itemTotal) >= parseFloat(dataConfig.configuration.step_one_delivery) && vendorIds && vendorIds.length === 2 ){
          del_charges =  dataConfig.configuration.one_vendor_above_hundred + dataConfig.configuration.two_vendor_above_hundred
        }else if(parseFloat(itemTotal) >= parseFloat(dataConfig.configuration.step_one_delivery)  && vendorIds && vendorIds.length === 3 ){
          del_charges =  dataConfig.configuration.one_vendor_above_hundred + dataConfig.configuration.two_vendor_above_hundred + dataConfig.configuration.three_vendor_above_hundred;
        }else if(vendorIds && vendorIds.length === 1 ){
          del_charges = dataConfig.configuration.one_vendor
        }else if( vendorIds && vendorIds.length === 2){
          del_charges = dataConfig.configuration.one_vendor + dataConfig.configuration.two_vendor
        }else if(vendorIds && vendorIds.length === 3){
          del_charges = dataConfig.configuration.one_vendor + dataConfig.configuration.two_vendor + dataConfig.configuration.three_vendor
        }
        console.log("del charges calculateDeliveryCharges", del_charges)
        setdeliveryCharges(del_charges)
        
        return (del_charges).toFixed(2)
      }
      
    }

    function ServiceCharges(){
      let newPrice = 0
      let itemTotal = 0
      cartItems.forEach(cartItem => {
        itemTotal += parseFloat(cartItem.price) * parseInt(cartItem.quantity)
      })
      if(itemTotal < config.service_charges_c1){
        newPrice = config.service_charges_one
      }
      else if(itemTotal >= config.service_charges_c1 && itemTotal <= config.service_charges_c2){
        newPrice = (itemTotal * config.service_charges_two) / 100
      }
      else{
        newPrice = config.service_charges_three
      }
      return (parseFloat(newPrice)).toFixed(2)
    }
    function goBack(){
     props.history.goBack();
    }

    return(
      
        <Container className="wrapper" fluid>
        
        <Header  {...props} title="Cart" />
        
        <Container className="breadcrumb-area cart-breadcrumb" fluid>
          <Row>
            <Col lg="3">
            </Col>
            <Col lg="9" md="12" sm="12" xs="12" className="breadcrumb-section">
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
              <h1 className="flashmessage text-center"> My Cart {data ? ': items '+data.cartItems : ': '+ 0}</h1>
                <h3>My Cart</h3>
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
                    { !loader ? <>
                     <tbody>
                      {
                     cartItems.length > 0 ?  cartItems.map((cartItem, idx) => (
                     
                            <tr key ={idx}>
                             {cartItem.img_url !== "" && cartItem.img_url !== null ? 
                               <td><img style ={{ width: "100px" }} src={cartItem.img_url}></img></td>
                            :  <td><img style ={{ width: "100px" }} src="../Assets/Img/product-detail-img.png" alt=""></img></td>
                            }
                            <td> {cartItem.title}</td>
                            <td><strong>{config.currency_symbol}  {cartItem.price}</strong></td>
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
                        <td><strong> {config.currency_symbol}  { (parseFloat(cartItem.quantity) * parseFloat(cartItem.price)).toFixed(2) }</strong></td>
                            <td><FontAwesome 
                            onClick={(e) => { const r = window.confirm("Do you really want to remove this product?"); if(r == true){ 
                              e.preventDefault()
                            removeCartItem(cartItem)
                             }
                            } 
                          }
                            name="trash" /></td>
                        </tr>)) : <tr><td colSpan="6" align="center">'No Item added yet!'</td></tr>
                        
                      }
                       
                    </tbody>
                    <tfoot>
                        <tr>
                           
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td><strong>Total {config.currency_symbol} {(calculatePrice(0, false))}</strong></td>
                            <td>&nbsp;</td>
                        </tr>
                    </tfoot>
                    </> : <Spinner /> }
                </Table>
                <Row>
                    <Col lg="7" md="7" sm="7" xs="12" className="voucher">
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
                    <Col lg="5" md="5" sm="5" xs="12" className="subtotal">
                        <div>
                            <h4>Subtotal <span>{configuration.currency_symbol} {calculatePrice(0, false)}</span></h4>
                      <h4>Delivery Charges <span>{configuration.currency_symbol} 
                      {/* {configuration.delivery_charges}  */}
                      {deliveryCharges}
                      </span></h4>
                      <h4>Service Charges <span>{configuration.currency_symbol} 
                      {/* {configuration.delivery_charges}  */}
                      {(parseFloat(ServiceCharges()) + parseFloat(deliveryCharges)).toFixed(2)}
                      </span></h4>

                      <h4 className="blue">Total <span>{configuration.currency_symbol}
                       {/* {calculatePrice(configuration.delivery_charges, false)} */}
                       {(parseFloat(calculatePrice(deliveryCharges, false)) + parseFloat(ServiceCharges())).toFixed(2)}

                       </span></h4>

                     

                            <input type="submit" value="Checkout" onClick = {onCLickCheckout} />
                            <input type="submit" value="Back to Shopping" onClick = {GoBackToStore} className="goback" />
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