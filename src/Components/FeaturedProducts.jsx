import React, {Component, useState, useEffect} from "react";

import { ApolloClient } from 'apollo-client';
import gql from "graphql-tag";
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Query, Mutation } from "react-apollo";
import 'bootstrap/dist/css/bootstrap.css';
import FontAwesome from 'react-fontawesome'
import '../App.css';
import '../Style.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link, useRouteMatch, useParams } from 'react-router-dom';
import { getFeaturedProducts } from "../apollo/server";
import { server_url } from  "../config/config"
import Slider from "react-slick";
import { getCartItems } from '../apollo/client';
import { useQuery, useMutation } from '@apollo/react-hooks'

const cache = new InMemoryCache()
const httpLink = createUploadLink({
  uri: `${server_url}graphql`,
})

const clients = new ApolloClient({
  link: httpLink,
  cache
});
const GETCARTITEMS = gql`${getCartItems}`;
const GET_FEATURED_PRODUCTS = gql`${getFeaturedProducts}`;
function FeaturedProducts() {
  const { client, data, loading } = useQuery(GETCARTITEMS)
  const [products, setProducts] = useState(null);
  var settingsFeatureProducts = {
    dots: false,
    autoplay:false,
    arrows:true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };
  useEffect(() => {
    clients.query({ query: GET_FEATURED_PRODUCTS, fetchPolicy: 'network-only' }).then(data => {
      console.log("loading fetau", data)
      
      setProducts(data.data.getFeaturedProducts)

    })
    // fetchUser().then(u => setUser(u));
  }, []);
  async function onAddToCart (product)  {

    console.log('onAddToCart>>> ', product);
    if (product.stock < 1) {
        // showMessage({
        //     message: 'Item out of stock',
        //     type: 'warning',
        //     floating: true,
        //     style: styles.alertbox,
        //     titleStyle: { fontSize: scale(14), fontFamily: fontStyles.PoppinsRegular, paddingTop: 6 }
        // })
        return 'Item out of stock';
    }

    if (product.variations.length === 1 && product.variations[0].addons.length === 0) {
        const newItem = {
            // key: uuid.v4(),
            __typename: 'CartItem',
            _id: product._id,
            vendor: product.user._id,
            quantity: 1,
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
        }
        console.log("<<new item entered>>",cartItems)
        client.writeQuery({ query: GETCARTITEMS, data: { cartItems: cartItems.length } })
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        // props.navigation.navigate('Cart')
        return 'Item Added';
    }
    else {
        // props.navigation.navigate('ItemDetail', { product })
    }
  }

  if (products === null) {
    return <p>Loading Products...</p>;
  }
  console.log("products return", products)
  return (
    <>
    <Slider {...settingsFeatureProducts}>
      {products.map((product, index) => (
        <div key = {index}>
        <div className="single-slider-product">
          <img src= {product.img_url}></img>
          <div className="leftIcons">
            <span>New</span>
            <span className="Salebg">Sale</span>
          </div>
          <div className="RightIcons">
          <FontAwesome name="heart-o" />
          <FontAwesome name="share" />
          </div>
        </div>
        <div className="single-slider-product-detail">
          <div className="leftDetails">
            <h3>{product.title}</h3>
            <button  onClick={e => {
                      e.preventDefault()
                      onAddToCart(product)
                      // this.onClickAddToCart(product)
                                                          
            }}>Add to Cart</button>
          </div>
          <div className="rightDetails">
              <strong> {product.variations[0].price}</strong>
            {/* <strong>$199.00</strong> */}
            {/* <a href="#">Buy Now</a> */}
          </div>
        </div>
        </div>
        // <div key={post.id}>{post.title} </div>
      ))}
      </Slider>
    </>
  );
}


export default FeaturedProducts;