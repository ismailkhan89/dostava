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
export default function ProductDetail({ item, configuration }) {

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

  async function onAddToCart (product)  {

    let vIds = await localStorage.getItem("vendorIds");

    if (parseInt(product.stock) === 0) {
        // showMessage({
        //     message: 'Item out of stock',
        //     type: 'warning',
        //     floating: true,
        //     style: styles.alertbox,
        //     titleStyle: { fontSize: scale(14), fontFamily: fontStyles.PoppinsRegular, paddingTop: 6 }
        // })
        // alert('Item out of stock')
        // setEditModal(false)
        setMessagecolor('warning');
        setMessage('Item out of stock!')
        // return 'Item out of stock';
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
        onAddToCart(product)
      }
      return 
    }

    if ( parseInt(product.stock) > 0 && product.variations.length === 1 && product.variations[0].addons.length === 0) {
      // setVendorIdsArray(product)
        const newItem = {
            // key: uuid.v4(),
            __typename: 'CartItem',
            _id: product._id,
            vendor: product.user._id,
            quantity: 1,
            vendor_quantity : 1,
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
            cartItems[index].quantity = cartItems[index].quantity + 1
            cartItems[index].vendor_quantity = cartItems[index].vendor_quantity + 1
        }
        console.log("<<new item entered>>",cartItems)
        client.writeQuery({ query: GETCARTITEMS, data: { cartItems: cartItems.length } })
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        // setEditModal(false)
        // if(showSuccess){
          setMessagecolor('success');
          setMessage('Added!')
        // }
       
    }
    else {
        // props.navigation.navigate('ItemDetail', { product })
    }

    
  }
  console.log('itemitem>',item)

  return item ? (
    <Card className="modal-product shadow">
      <FlashAlert message={messagealert} color={messagecolor} />
      <CardBody>
        <Form>
          <Row>
            <Col lg="4" md="6" sm="12" xs="12">
              <div className="product-list store-item">
                <img className="img-fluid" src={item.img_url} alt=""></img>
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


                <a className="add-to-cart" href="#" onClick={(e) => 
                          {onAddToCart(item)
                            e.preventDefault()
                            setTimeout(() => {
                            setMessage('')
                            setMessagecolor('')}, 3000)
                          }
                          
                          }>
                  Add to cart
                </a>
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
