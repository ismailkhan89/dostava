import React, {useState, useContext} from "react";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { server_url } from  "../config/config";
import { authLink } from '../library/authLink';
import { getCartItems } from '../apollo/client';
import gql from "graphql-tag";

const GETCARTITEMS = gql`${getCartItems}`;

const cache = new InMemoryCache()
const httpLink = createUploadLink({
  uri: `${server_url}graphql`,
})
const client = new ApolloClient({
  link: authLink.concat(httpLink) ,
  cache
});

async function setVendorIdsArray(product){
    const cartItemsStr = await localStorage.getItem('cartItems')
    const cartItems = cartItemsStr ? JSON.parse(cartItemsStr) : []
    let vendorIds = [];
    console.log("productproductproduct",product)

    //   if(vendorIds.length > 0){
    //     var cont = vendorIds.find(a => {
    //       if(a !== food.vendor) vendorIds.push(food.vendor)
    //     })
    //   }
    //   else{
    //     vendorIds.push(food.vendor)
    //   }
    // })
    //  console.log("Vids??>>",vendorIds)
    // setVendorIds(vendorIds);
  } 

  // async function isVendorLimitExceeds (product) {
  //   let ids = await localStorage.getItem("vendorIds");
  //   let vendorIds = ids === null ? [] : JSON.parse(ids);
  //   console.log("isVendorLimitExceeds vendorIds", vendorIds.length)
  //   if(vendorIds.length < config.max_vendor){
  //       console.log("vendorIds.length < configuration.max_vendor", vendorIds.length)
  //       if(product && !vendorIds.includes(product.user._id)){
  //           vendorIds.push(product.user._id)
  //           localStorage.setItem("vendorIds",JSON.stringify(vendorIds));
  //       }
  //       return vendorIds;
  //   }        
  // }

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
        // setMessagecolor('warning');
        // setMessage('Item out of stock!')
        return 'Item out of stock';
        // return
    }
    let vendors = vIds === null ? [] : JSON.parse(vIds);
    // isVendorLimitExceeds(product)

    if( !vendors.includes(product.user._id)){
      if(window.confirm('Your cart already contains items from another shop. would you like to clear the cart and add items from this shop instead?')){
        client.writeQuery({ query: GETCARTITEMS, data: { cartItems: 0 } })
        await localStorage.removeItem('cartItems')
        await localStorage.removeItem('vendorIds')
        onAddToCart(product)
      }
      return
    }

    if (parseInt(product.stock) > 0 && product.variations.length === 1 && product.variations[0].addons.length === 0) {
      setVendorIdsArray(product)
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
        // setMessagecolor('success');
        // setMessage('Added!')
    }
    else {
        // props.navigation.navigate('ItemDetail', { product })
    }

    
  }


  export { onAddToCart }