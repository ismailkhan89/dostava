import React, {Component, useState, useEffect} from "react";

import { ApolloClient } from 'apollo-client';
import gql from "graphql-tag";
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Query, Mutation } from "react-apollo";
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import '../Style.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link, useRouteMatch, useParams } from 'react-router-dom';
import { getFeaturedProducts } from "../apollo/server";
import { server_url } from  "../config/config"
import Slider from "react-slick";
const cache = new InMemoryCache()
const httpLink = createUploadLink({
  uri: `${server_url}graphql`,
})

const client = new ApolloClient({
  link: httpLink,
  cache
});
const GET_FEATURED_PRODUCTS = gql`${getFeaturedProducts}`;
function FeaturedProducts() {
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
    client.query({ query: GET_FEATURED_PRODUCTS, fetchPolicy: 'network-only' }).then(data => {
      console.log("loading fetau", data)
      
      setProducts(data.data.getFeaturedProducts)

    })
    // fetchUser().then(u => setUser(u));
  }, []);

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
            <span>Heart</span>
            <span>Share</span>
          </div>
        </div>
        <div className="single-slider-product-detail">
          <div className="leftDetails">
            <h3>{product.title}</h3>
            <button>Add to Cart</button>
          </div>
          <div className="rightDetails">
            <span> $299.00</span>
            <strong>$199.00</strong>
            <a href="#">Buy Now</a>
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