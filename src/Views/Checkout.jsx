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
import { server_url , STRIPE_PUBLIC_KEY , STRIPE_IMAGE_URL , STRIPE_STORE_NAME , shop_url} from  "../config/config";
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from "graphql-tag";
import { setContext } from 'apollo-link-context'
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient } from 'apollo-client';
import {Link, useRouteMatch, useParams } from 'react-router-dom';
import { getConfiguration, placeOrder, like ,getUserStripeCards , myOrders} from "../apollo/server";
// import { authLink } from '../library/authLink'
import { getCartItems } from '../apollo/client';
const authLink = setContext((_, { headers }) => {
  console.log("setContext",headers)
  // get the authentication token from local storage if it exists
  const userData = localStorage.getItem('user-dostava');
  console.log("userData",userData)
  const parsData = JSON.parse(userData);
  console.log("parsData>>",parsData)
  console.log("parsDate",parsData)

  if(parsData !== null){
    let token = parsData.token;
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
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
const LIKE_PRODUCT = gql`${like}`;
const GETCONFIGURATION = gql`${getConfiguration}`
const PLACEORDER = gql`${placeOrder}`
const GETUSERSTRIPECARDS = gql`${getUserStripeCards}`
const MYORDERS = gql`${myOrders}`


const PAYMENT_METHOD = ['STRIPE', 'PAYPAL', 'COD']
  function Checkout(props) {

    React.useEffect(() => {
      window.scrollTo(0, 0)
    },[])
    

    React.useEffect(()=>{
      setStoreIdLocally()
    },[])

    async function setStoreIdLocally() {
      let store_id = await localStorage.getItem('lastStoreId');
      console.log("get store id", store_id)
      setStoreId(JSON.parse(store_id))
    }
    const newcartItemsStr =  localStorage.getItem('cartItems')
    const newcartItems = newcartItemsStr ? JSON.parse(newcartItemsStr) : []
    const [storeId, setStoreId] = useState('')
    const [address] = useState(props.location.state?.address ?? null)
    const [coupon] = useState(props.location.state?.coupon ?? null)
    const [Configuration,setConfiguration] = useState(props.location.state?.coupon ?? null)
    const [getStripe ,setGetStripe] = useState([]);
    const [payment,setPayment] = useState(null)
    const [CardStatus,setCardStatus] = useState(null)
    const [activeRadio, setActiveRadio] = useState(0)

    const [aptSuite, setAptSuite] = useState('')
    const [buildingName, setBuildingName] = useState('')
    const [orderDescription, setOrderDescription] = useState('')
    const [streetName, setStreetName] = useState('')
    const [orderLoading, setOrderLoading] =useState(false)

    const COD_PAYMENT = {
      payment: "STRIPE",
      label:'creditCart',
      index: 0,
    }

    const defaultAddress =  localStorage.getItem('location')
    const Address = defaultAddress ? JSON.parse(defaultAddress) : ''
    console.log(Address.location)
    const { loading, error, data: dataConfig } = useQuery(GETCONFIGURATION)

    // const { loading : loadingStripes, data: dataStripes } =  useQuery(GETUSERSTRIPECARDS, {fetchPolicy: 'cache-and-network'})
    const [vendorIds, setVendorIds] = useState([])
    const [deliveryCharges, setdeliveryCharges] = useState(0)
    const [items,setItems] = useState(props.location.state?.cartItems ?? null)

    
      useEffect(() => {
        const userData = localStorage.getItem('user-dostava');
        const parsData = JSON.parse(userData);
        if(parsData !== null){
          if(parsData.token !== undefined) {
            fetchConfiguration()
            setVendorIdsArray()
            loadStripe()
          }
        }
      }, [])
      
      useEffect(() => {
        const userData = localStorage.getItem('user-dostava');
        const parsData = JSON.parse(userData);
        if(parsData !== null){
          if(parsData.token !== undefined) {
            calculateDeliveryCharges()
          }
        }
        
      },[vendorIds,items,dataConfig])
    

     async function fetchConfiguration() {
         client.query({ query: GETCONFIGURATION, fetchPolicy: 'network-only' }).then(res => {
          localStorage.setItem("configuration",JSON.stringify(res.data.configuration))
          setConfiguration(res.data.configuration);
        })
        try {
         const result = await client.query({ query: GETUSERSTRIPECARDS, fetchPolicy: 'network-only' })
         setGetStripe(result.data.getUserStripeCards);
        //  .then(res => {
        //     console.log("cardDetailscardDetailscardDetails", res.data)
        //     setGetStripe(res.data.getUserStripeCards);
        //   })
        } catch (error) {
        }
      }

      async function setVendorIdsArray(){
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


    const [physicalAddress ,setphysicalAddress] = useState(!!Address ? Address : '')
// console.log("clients>>", clients)

    const { cartLoading, cartError, cartData: cartDataConfig } = useQuery(GETCARTITEMS)
    const [mutate, { loading: loadingMutation }] = useMutation(PLACEORDER, { onCompleted, onError, client  } )
    const [mutateLike, { loadingLike: loadingLikeMutation }] = useMutation(LIKE_PRODUCT, { onCompletedLike, onErrorLike, client } )
    function transformOrder(cartItems) {
      console.log(cartItems)
        return cartItems.map(food => {
            return {
                food: food._id, 
                quantity: food.quantity,
                vendor: food.vendor,
                variation: food.variation._id,
                vendor_price: food.vendor_price,
                vendor_quantity : food.vendor_quantity,
                addons: food.addons ? food.addons.map(({ _id, options }) => ({ _id, options: options.map(({ _id }) => _id) })) : []
            }
        })
    }

    async function onCompletedLike(data) {
      console.log("data onCompletedLike", data);
    }

    async function onErrorLike(data) {
      console.log("data onErrorLike", data);
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

        if(physicalAddress === ''){
          alert('First you need to add item to cart.');
          return;
        }

        if(streetName === ''){
          alert('Please enter street name.');
          return;
        }

        // if(aptSuite===''){
        //   alert('Please enter Appartment / Suite / Floor.');
        //   return;
        // }
        // if(buildingName===''){
        //   alert('Please enter street number.');
        //   return;
        // }
       

          if (checkPaymentMethod(dataConfig.configuration.currency)) {
            setOrderLoading(true)
            const items = transformOrder(cartItems)
            mutate({
                variables: {
                    orderInput: items, 
                    paymentMethod: 'STRIPE',
                    couponCode: '',
                    address: {
                        label: "home",
                        delivery_address: physicalAddress.location,
                        details: "del details",
                        longitude: physicalAddress.lng.toString(),
                        latitude: physicalAddress.lat.toString()
                    },
                    long: physicalAddress.lng.toString(),
                    lat: physicalAddress.lat.toString(),
                    vendor_ids: vendorIds,
                    card_status: CardStatus,
                    building_name : buildingName,
                    floor_name : aptSuite,
                    order_description:orderDescription,
                    street_name:streetName
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
    console.log(error.message)
    setOrderLoading(false)
    alert(error.message)
      // showMessage({
      //     message: error.networkError.result.errors[0].message,
      //     duration: 3000,
      //     type: 'warning',
      //     floating: true,
      //     style: Styles.alertboxRed,
      //     titleStyle: { fontSize: scale(14), fontFamily: fontStyles.PoppinsRegular, paddingTop: 6 }
      // })
  }

  function loadStripe() {
    if(! window.StripeCheckout) {
        const script = document.createElement('script');
        script.onload = function () {
            console.info("Stripe script loaded");
        };
        script.src = 'https://checkout.stripe.com/checkout.js';
        document.head.appendChild(script);
    } else {
    }
}

async function GoBackToStore(){
  console.log("GoBackToStore vendorIds",vendorIds)
  if(vendorIds){
    props.history.push({pathname: "/storesitem/"+vendorIds[0]})
  }else{
    props.history.push({pathname: "/stores"})
  }
}

  async function onCompleted(data) {
    console.log("onCompletedonCompletedonCompleted",data)

    // localStorage.setItem("cartItems",JSON.stringify([]))
    // localStorage.removeItem("cartItems");   
    // client.writeQuery({ query: GETCARTITEMS, data: { cartItems: 0} })
    let trackingOpts = {
        id: data.placeOrder.user._id,
        usernameOrEmail: data.placeOrder.user.email,
        orderId: data.placeOrder.order_id
    };
    // Analytics.identify(data.placeOrder.user._id, trackingOpts);
    // Analytics.track(Analytics.events.USER_PLACED_ORDER, trackingOpts);
    // if (PAYMENT_METHOD[activeRadio] === "COD") {
    //     props.navigation.replace('Thankyou', { _id: data.placeOrder._id })
    // }
    // else if (PAYMENT_METHOD[activeRadio] === "PAYPAL") {
    //     props.navigation.replace('Paypal', {
    //         _id: data.placeOrder.order_id,
    //         currency: dataConfig.configuration.currency
    //     })
    // }
     if (PAYMENT_METHOD[activeRadio] === "STRIPE") {
        localStorage.setItem('order_id', JSON.stringify(data.placeOrder.order_id))
      let body = {
				_id: data.placeOrder.order_id,
				amount: data.placeOrder.order_amount,
				email: data.placeOrder.user.email,
				currency: Configuration.currency,
				card: payment
      }

      var paymentStatus=false;
      const allowRememberMe = false
      
      const multiplier = stripeCurrencies
      .find(({ currency: curr }) => curr === Configuration.currency)
      .multiplier
     
      console.log('serviceCharges',data.placeOrder.order_amount)
      const amout = data.placeOrder.order_amount * multiplier
      const currency = Configuration.currency;


      if(data.placeOrder.card_status === 'NEW_CARD'){
        var handler =  window.StripeCheckout.configure({
          key:`${STRIPE_PUBLIC_KEY}`,
          image:`${STRIPE_IMAGE_URL}`,
          locale: 'auto',
          token: (token) => {
            console.log("tokentokentoken",token)
            paymentStatus = true
              fetch(server_url+`stripe/charge?id=${data.placeOrder.order_id}`, {
                method: 'POST', 
                mode: 'cors',
                cache: 'no-cache', 
                credentials: 'same-origin', 
                headers: {
                  'Content-Type': 'application/json'
                },
                redirect: 'follow',
                
                body: JSON.stringify(token)
                })
                .then(response => response.json())
                .then(result => {
                  if(result.redirect === 'stripe/success'){
                    setOrderLoading(false)
                    alert('Order Submitted')
                    onPaymentSuccess()
                  }
                  console.log("response>><<",result)
                })
                .catch(error => { alert(error) });
          }
        })

        handler.open({
          image: `${STRIPE_IMAGE_URL}`,
          name: `${STRIPE_STORE_NAME}`,
          description: `Grocery delivery`,
          amount: `${amout}`,
          currency: `${currency}`,
          allowRememberMe: `${allowRememberMe}`,
          email: `${data.placeOrder.user.email}`,
          closed: function() {
            if(!paymentStatus)
            window.location=`${shop_url}checkout`
            }
          });
      }
      else  if(data.placeOrder.card_status === 'OLD_CARD'){

        fetch(server_url+'stripe/chargeWithDefault', {
          method: 'POST', 
          mode: 'cors',
          cache: 'no-cache', 
          credentials: 'same-origin', 
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          
          body: JSON.stringify(body)
          })
          .then(response => response.json())
          .then(result => {
            if(result.success === true){
              setOrderLoading(false)
              alert('Order Submitted')
              onPaymentSuccess()
            }
            console.log("response>><<",result)
          //   if(result.redirect)
          // 	window.location='${SERVER_URL}'+result.redirect
          })
          .catch(error => { alert(error) });
      }
     }
  }


    async function onPaymentSuccess() {

      await localStorage.setItem('cartItems', JSON.stringify([]));
      await localStorage.setItem("vendorIds",JSON.stringify([]));
      props.history.push({
        pathname : '/orderdetails',
      })
      // let order_id = await localStorage.getItem("order_id");
      // let _id = JSON.parse(order_id)
      // const result = await client.query({ query: MYORDERS, fetchPolicy: 'network-only' })
      // console.log("result on onPaymentSuccess cart", result)
      // console.log("result on onPaymentSuccess _id", _id)
      // const order = result.data.orders.find(order => order.order_id === _id)
      // await client.writeQuery({ query: GETCARTITEMS, data: { cartItems: 0 } })
      // console.log("arder order",order)
      // props.history.push({
      //   pathname : '/orderdetails',
      //   state: { order }
      // })
      // alert('ORDER SUCCESSFULL !!')
      // let order_id = await AsyncStorage.getItem("order_id");
      // let _id = JSON.parse(order_id)
      //     const result = await client.query({ query: MYORDERS, fetchPolicy: 'network-only' })
      //     console.log("result on onPaymentSuccess cart", result)
      // console.log("result on onPaymentSuccess _id", _id)
      
      //     const order = result.data.orders.find(order => order.order_id === _id)
      //     await   client.writeQuery({ query: GETCARTITEMS, data: { cartItems: 0} })
      //     console.log("arder order",order)
      //     props.navigation.navigate('OrderDetail', { order })    
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

    async function likeProduct(product){
      mutateLike({
        variables: {
            "foodId": String(product._id)
        }
    })
    }
    const [cartItems , setcartItems] = useState(props.location.state?.cartItems ?? [])
    const [totalPriceExcDelivery , settotalPriceExcDelivery] = useState(props.location.state?.totalPriceExcDelivery ?? 0)
    const [currency_symbol , setcurrency_symbol] = useState(props.location.state?.currency_symbol ?? null)
    const [newTotalDeliveryCharges , setnewTotalDeliveryCharges] = useState(props.location.state?.newTotalDeliveryCharges ?? 0)
    const [newTotalPrice , setnewTotalPrice] = useState(props.location.state?.newTotalPrice ?? 0)
    const [serviceCharges , setServiceCharges] = useState(props.location.state?.services_charges ?? 0)
    
    // const { cartItems, totalPriceExcDelivery, totalPriceIncDelivery,
    // currency_symbol, delivery_charges , newTotalDeliveryCharges, newTotalPrice } =  props.location.state;
    console.log("cartItems screen",cartItems)
    console.log("props.location.state",props.location.state)

 
    return(
      
        <Container className="wrapper" fluid>
        
        <Header  {...props} title="Checkout" />
        
        <Container className="breadcrumb-area checkout-breadcrumb" fluid>
          <Row>
            <Col lg="1">
            </Col>
            <Col lg="11" md="12" sm="12" xs="12" className="breadcrumb-section">
              <h3>My Checkout</h3>
              <ul>
                <li><Link to='/'>Home</Link></li>

                <li><Link to='/'>My Checkout</Link></li>
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
                <Tab>  Confirmation</Tab>
                {/* <Tab> <FontAwesome name="check-circle-o" /> Shipping and Checkout</Tab>
                <Tab> <FontAwesome name="check-circle-o" /> Confirmation</Tab> */}
                </Row>
              </TabList>
          
              {/* <TabPanel>
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
                        <input type="text" placeholder="Shipping Address"
                        value={!!Address ? Address.location : ''}
                        ></input>
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
                    <Col lg="12" md="12" sm="12" xs="12" className="grey-bg">
                      <h3>YOur Order</h3>
                    </Col>
                    <div class="carts">
                    {
                    cartItems && cartItems.length > 0 ?  cartItems.map((item, index)=>(
                        <Row key={index} >
                          <Col lg="4">
                            <img src= {item.img_url}></img>
                          </Col>
                          <Col lg="6">
                            <h3>{item.title}e</h3>
                            <p>
                            <strong>{item.price}</strong>      
                            </p>
                          </Col>
                          <Col lg="2">
                            <Button onClick={e => { 
                                      e.preventDefault()
                                      likeProduct(item)
                            }} >Like</Button>
                            <FontAwesome onClick={e => { 
                                      e.preventDefault()
                                      likeProduct(item)
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
                    </div>
                    </Col>

                    </Row>
                  </TabPanel> */}
                  
                  <TabPanel>
                    <Row>
                  <Col lg="7" md="7" sm="12" xs="12" className="shipping credit-card-info">
                    <div className="payment-options ">
                    <Col lg="12" md="12" sm="12" xs="12" className="grey-bg">
                      <h3>Payment Options</h3>
                    </Col>
                    <h4>Your Credit Card</h4>
                      {getStripe ? 
                      getStripe.map((card,index) => {
                       return <label key={index}>
                         <Row>
                            <Col lg="10">
                            <div>
                            <input type="radio" name="credit-card" value={index} 
                            onChange={(e) =>{ 
                              setPayment(getStripe[e.target.value])
                              setCardStatus('OLD_CARD')
                            }}></input>
                            <img src="../Assets/Img/card.png" height="50" style={{paddingRight :5}}></img>
                            {card.brand} {'(xxxx'+card.last4+')'}
                          </div>
                            </Col>
                         </Row>
                        
                        
                      </label>
                       }) : ''}
                      <label>
                        <input type="radio" name="credit-card"  onChange={(e) =>{ 
                            setPayment([])
                            setCardStatus('NEW_CARD')
                          }}></input>
                           <img src="../Assets/Img/card.png" height="50" style={{paddingRight :5}}></img>
                       NEW CARD
                      </label>
                      {/* <label>
                        <input type="radio" name="credit-card"></input>
                        Paypal
                      </label>   */}
                    </div>
                    <form>
                    <div className="form-group full">
                    <label>Address</label>
                        <input type="text" placeholder="Address" disabled value={!!Address ? Address.location : ''}></input>
                      </div>

                      <div className="form-group full">
                      <label>Apt / Floor / Suite</label>
                        <input type="text"
                        placeholder="Apt / Suite / Floor " 
                        value={aptSuite}
                        onChange={(e) => setAptSuite(e.target.value)}
                        ></input>
                      </div>
                      <div className="form-group full">
                      <label>Street Number</label>
                        <input type="text" 
                        placeholder="Street Number" 
                        value={buildingName}
                        onChange={(e) => setBuildingName(e.target.value)}
                       ></input>
                      </div>
                      <div className="form-group full">
                      <label>Street Name</label>
                        <input type="text" 
                        placeholder="Street Name (Optional)" 
                        value={streetName}
                        onChange={(e) => setStreetName(e.target.value)}
                       ></input>
                      </div>
                      <div className="form-group full">
                      <label>Store instruction</label>
                        <input type="text" 
                        placeholder="Store instruction (Optional)" 
                        value={orderDescription}
                        onChange={(e) => setOrderDescription(e.target.value)}
                       ></input>
                      </div>

                      {/* <div className="form-group full">
                        <input type="text" pattern="\d*" maxLength="16" placeholder="Card Number">
                        </input>
                      </div>
                      <div className="form-group full">
                        <input type="text" placeholder="Name on Card"></input>
                      </div>
                      <div className="form-group half">
                        <input type="text" placeholder="Expiration (MM / YY)"></input>
                      </div>
                      <div className="form-group half">
                        <input type="text" placeholder="Security code"></input>
                      </div> */}
                      
                      {/* <div className="form-group half" >
                        <Link to="/">Back to Shopping</Link>
                      </div>
                      <div className="form-group half">
                        <Button  onClick={e => {
                                e.preventDefault()
                                if(payment !== null){
                                  onPayment() 
                                }
                                else{
                                  alert('Please Select Payment Options')
                                }
                                }} value="Payment">Payment</Button>
                      </div> */}
                    </form>
                    </Col>
                  
                  <Col lg="5" className="cart-items">
                  <Col lg="12" md="12" sm="12" xs="12" className="grey-bg">
                      <h3>YOur Order</h3>
                    </Col>
                    <div className="carts">
                    {
                    cartItems && cartItems.length > 0 ?  cartItems.map((item, index)=>(
                        <Row key={index} >
                          <Col lg="4">
                            <img src= {item.img_url}></img>
                          </Col>
                          <Col lg="6">
                            <h3>{item.title}</h3>
                            <p> <strong>{currency_symbol} {item.price}{' X '}{item.quantity}{' = '}{currency_symbol}{parseFloat(item.price*item.quantity).toFixed(2)}  </strong></p>
                            
                            
                          </Col>
                          {/* <Col lg="2">
                            <Button onClick={e => { 
                                      e.preventDefault()
                                      likeProduct(item)
                            }} >Like</Button>
                            <FontAwesome onClick={e => { 
                                      e.preventDefault()
                                      likeProduct(item)
                            }} name="heart-o" />
                          </Col> */}
                        </Row>
                      )) : "No Items"
                    }
                    <Row>
                      <Col lg="12" className="button-form cart-total">
                        <h6>
                          <strong>Subtotal</strong>
                            <span>{currency_symbol} {totalPriceExcDelivery}</span>
                        </h6>
                        <h6>
                          <strong>Delivery Charges</strong>
                          <span>{currency_symbol}
                           {/* {delivery_charges} */}
                           {newTotalDeliveryCharges}
                           </span>
                        </h6>

                        <h6>
                          <strong>Service Charges</strong>
                          <span>{currency_symbol}
                           {/* {delivery_charges} */}
                           {serviceCharges}
                           </span>
                        </h6>

                       
                        <h2>
                          <strong>Total</strong>
                          <span> {currency_symbol} 
                          {/* {totalPriceIncDelivery} */}
                  {newTotalPrice}</span>
                        </h2>
                        {/* <div className="form-group half">
                        <Link to="/">Back to Shopping</Link>
                      </div> */}
                      <div className="form-group full">
                        <Button className="btnbacktostore goback"  onClick={e => {
                                e.preventDefault()
                                GoBackToStore()
                                }} value="Payment">Back to Shopping</Button>
                      </div>
                      {
                        !orderLoading && orderLoading === false ?
                        <div className="form-group payment-button full">
                          <Button  onClick={e => {
                                  e.preventDefault()
                                  if(payment !== null){
                                    onPayment() 
                                  }
                                  else{
                                    alert('Please Select Payment Options')
                                  }
                                  }} value="Payment">Checkout</Button>
                        </div> :
                        <div className="form-group payment-button full dark-grey-bg">
                           <Button  onClick={e => { e.preventDefault()} } value="Payment">Checking out...</Button>
                        </div>
                      }
                      
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