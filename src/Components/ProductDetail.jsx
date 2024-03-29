import React, {useState, useContext} from "react";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Form,
  CardBody,
  Col,
  FormGroup,
  Input,
  Button,
  ListGroup,
  ListGroupItem,
  Badge,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownToggle,
  Modal,
} from "reactstrap";

import { onAddToCart } from "../utils/addtoCart";
import { getItemPrice } from "../utils/pricing";
import FontAwesome from 'react-fontawesome'

import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation  } from '@apollo/react-hooks';
import { foods, like,foodbyVendorId ,getCategoriesByLocation , getConfiguration , foodbyVendorId_New} from "../apollo/server";
import { getCartItems } from '../apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { server_url } from  "../config/config";
import { authLink } from '../library/authLink';
import FlashAlert from "../Components/FlashAlert.jsx";
import ConfigurationContext from "../context/Configuration.js";
import { useEffect } from "react";
import { ButtonGroup, ButtonToolbar } from "react-bootstrap";
const cache = new InMemoryCache()
const httpLink = createUploadLink({
  uri: `${server_url}graphql`,
})
const client = new ApolloClient({
  link: authLink.concat(httpLink) ,
  cache
});

const newclient = new ApolloClient({
  link:  httpLink,
  cache
});
const GETCARTITEMS = gql`${getCartItems}`;
export default function ProductDetail({ item, configuration, toggle, close }) {

    const [messagealert , setMessage ] = useState('')
    const [showSuccess , setshowSuccess ] = useState(true)
  const [messagecolor , setMessagecolor ] = useState('')

  const config = useContext(ConfigurationContext)
  async function isVendorLimitExceeds (product) {
    let ids = await localStorage.getItem("vendorIds");
 
    let vendorIds = ids === null ? [] : JSON.parse(ids);
    console.log("isVendorLimitExceeds vendorIds", vendorIds.length)
    if(vendorIds.length < config.max_vendor){
        console.log("vendorIds.length < configuration.max_vendor", vendorIds.length)
        if(product && !vendorIds.includes(product.user._id)){
            vendorIds.push(product.user._id)
            localStorage.setItem("vendorIds",JSON.stringify(vendorIds));
        }
        return vendorIds;
    }        
  }


  async function onAddToCart (product,btn,qty = 1)  {

    let vIds = await localStorage.getItem("vendorIds");
    const cartItemsStr = await localStorage.getItem('cartItems') || '[]'
    const cartItems = JSON.parse(cartItemsStr)
     const selectedItem = cartItems.filter((itm) => itm._id === product._id)
     if(selectedItem && selectedItem.length > 0 ){
      // if(selectedItem[0].quantity === product.stock || selectedItem[0].quantity > product.stock){
      //   // setEditModal(false)
      //   setMessagecolor('warning');
      //   setMessage('We are out stock, we only have '+product.stock+ ' '+ product.title +' in stock')
      //   return null
      // }

      if(selectedItem[0].quantity === product.stock || parseInt(qty) > product.stock){
        // setEditModal(false)
        setMessagecolor('warning');
        setMessage('We are out stock, we only have '+product.stock+ ' '+ product.title +' in stock')
        return null
      }
     }

     if(parseInt(qty) > product.stock) {
      // setEditModal(false)
      setMessagecolor('warning');
      setMessage('We are out stock, we only have '+product.stock+ ' '+ product.title +' in stock')
      return null
   }



    if (parseInt(product.stock) === 0) {
      
        setMessagecolor('warning');
        setMessage('Item out of stock!')
        return
    }
    let vendors = vIds === null ? [] : JSON.parse(vIds);
    isVendorLimitExceeds(product)

    if(vendors.length === config.max_vendor && !vendors.includes(product.user._id)){
      if(window.confirm('Your cart already contains items from another shop. would you like to clear the cart and add items from this shop instead?')){
        client.writeQuery({ query: GETCARTITEMS, data: { cartItems: 0 } })
        await localStorage.removeItem('cartItems')
        await localStorage.removeItem('vendorIds')
        setshowSuccess(false);
        // setEditModal(false)
        onAddToCart(product ,btn)
      }
      
      return 
    }

    if ( parseInt(product.stock) > 0 && product.variations.length === 1 && product.variations[0].addons.length === 0) {
      // setVendorIdsArray(product)
      localStorage.setItem('lastStoreId',JSON.stringify(product.user._id));
        const newItem = {
            // key: uuid.v4(),
            __typename: 'CartItem',
            _id: product._id,
            vendor: product.user._id,
            quantity: parseInt(qty),
            vendor_quantity : parseInt(qty),
            vendor_price : product.vendor_pricing,
            variation: {
                __typename: 'ItemVariation',
                _id: product.variations[0]._id,
            },
            addons: []
        }
        const cartItemsStr = localStorage.getItem('cartItems') || '[]'
        const cartItems = JSON.parse(cartItemsStr)
        console.log("<<cartItems>>",cartItems)
        const index = cartItems.findIndex((product) => product._id === newItem._id)
        if (index < 0)
            cartItems.push(newItem)
        else {
          cartItems[index].quantity = parseInt(cartItems[index].quantity) + parseInt(qty)
          cartItems[index].vendor_quantity = parseInt(cartItems[index].vendor_quantity) + parseInt(qty)

            // cartItems[index].quantity = cartItems[index].quantity + 1
            // cartItems[index].vendor_quantity = cartItems[index].vendor_quantity + 1
        }
        console.log("<<new item entered>>",cartItems)
        client.writeQuery({ query: GETCARTITEMS, data: { cartItems: cartItems.length } })
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        // setEditModal(false)
        // if(showSuccess){
          setMessagecolor('success');
          setMessage('Added!')
        // }
       if(btn){
        setTimeout(() => {
          close()
        }, 500);
       }
       else{
        cartItemFunction()
        totalQty(item)
       }
    }
    else {
        // props.navigation.navigate('ItemDetail', { product })
    }




    
  }

  const [cartItem,setCartItems] = useState([])

  useEffect(() => {
    if(item){
      cartItemFunction()
    }
  },[item])

   async function cartItemFunction(){
    const cartItemsStr = await localStorage.getItem('cartItems') || '[]'
    const cartItems = JSON.parse(cartItemsStr)
    setCartItems(cartItems)
   }

   function totalQty(item){
     let qty = 0
    if(cartItem){
      let findItem = cartItem.find(d => d._id === item._id)
      qty = findItem ? findItem.quantity : 0
    }
    return qty
  }
 
  async function removeQuantityToCartItem (newItem) {
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
    }
    else{
      await localStorage.setItem('cartItems', JSON.stringify(cartItems))
      setCartItems(cartItems);
    }
    totalQty(item)
  }

  const [ inputQty , setInputQty] = useState(0);

  return item ? (
    <Card className="modal-product shadow">
      <div className="close-button-popup" onClick={toggle}>
        <FontAwesome name="close"></FontAwesome>
      </div>
      <FlashAlert message={messagealert} color={messagecolor} />
      <CardBody>
        <Form>
          <Row>
            <Col lg="4" md="6" sm="12" xs="12">
              <div className="product-list store-item">
                {/* <img className="img-fluid" src={item.img_url} alt=""></img> */}
                {item.img_url !== "" && item.img_url !== null ?
                  <img className="img-fluid" src={item.img_url} alt="" ></img>
                : <img className="img-fluid" src="../Assets/Img/placeholder-img.png" alt=""></img>
                }
              </div>
            </Col>{" "}
            <Col lg="8" md="6" sm="12" xs="12">
            <div className="product-list store-item">
                <h2>{item.brand_name}</h2>
                <h3><strong>{item.title}</strong></h3>
                <p><strong>Store Name</strong>: {item.user.business_name}</p>
                <p><strong>Description</strong>: {item.description}</p>
                {/* <p><strong>Stock</strong> : {item.stock}</p> */}
                <p><strong>Package Weight</strong> : {item.package_weight}  {item.packaging_unit}</p>
                {/* <p className="price"> ${getItemPrice(item, configuration)}</p> */}
                <p className="price"> ${item.vendor_pricing}</p>


                <ButtonToolbar aria-label="Toolbar with button groups">
            <ButtonGroup className="me-2" aria-label="First group">
              <Button 
              className={'themeBg'}
              onClick={e => {
                      e.preventDefault()
                      if(inputQty > 0) {
                        setInputQty(inputQty - 1)
                      }
                    }}>  
                  <FontAwesome name="minus"></FontAwesome>
                </Button> 
              <input 
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    style={{
                      width: '37px',
                      textAlign :'center',
                      alignItems :'center'
                    }}
                  maxLength={2}
                  type="text"
                  pattern="[0-9]*"
                  value={inputQty}
                  onChange={(e) => e.target.value > 0 ?
                    setInputQty(parseInt(e.target.value))
                    : setInputQty(0)
                      // setInputQty(0)
                    }
                  />
              <Button   
              className={'themeBg'}
              onClick={e => {
                    e.preventDefault()
                    setInputQty(inputQty + 1)
                    }}>  
                  <FontAwesome name="plus"></FontAwesome>
                </Button> 
            </ButtonGroup>
      </ButtonToolbar>

                <a className="add-to-cart" style={{marginTop : '5px'}} href="#" onClick={(e) => 
                          {onAddToCart(item,true,inputQty)
                            e.preventDefault()
                            setTimeout(() => {
                            setMessage('')
                            setMessagecolor('')}, 3000)
                          }
                          
                          }>
                  Add to cart
                </a>
                {/* <div className="display-flex popup-btns">
                <button   
                  onClick={e => {
                    e.preventDefault()
                    if(totalQty(item) > 0){
                      removeQuantityToCartItem(item)
                    }
                  }} 
                >
                  <FontAwesome name="minus"></FontAwesome>
                </button> 
                <span>
                          {totalQty(item)}
                  </span> 
                <button 
                  onClick={e => {
                    e.preventDefault()
                    onAddToCart(item,false)
                    setTimeout(() => {
                      setMessage('')
                      setMessagecolor('')}, 3000)
                  }}
                  >
                      <FontAwesome name="plus"></FontAwesome>
                  </button>
                </div> */}


               

              </div>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  ) : (
    <div></div>
  );
}
