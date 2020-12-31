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
import { getPopularVendors } from "../apollo/server";
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

const GET_POPULAR_VENDORS = gql`${getPopularVendors}`;


function SliderPopular(props){

    const { client, data, loading } = useQuery(GET_POPULAR_VENDORS)
    const [products, setProducts] = useState(null);
    var settingsFeatureProducts = {
        dots: false,
        autoplay:false,
        arrows:true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              dots: false,
              infinite: true,
              slidesToShow: 3,
              arrows:true,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 768,
            settings: {
              dots: false,
              infinite: true,
              slidesToShow: 1,
              arrows:true,
              slidesToScroll: 1,
            }
          }
          ]
  };

    React.useEffect(() => {
        client.query({ query: GET_POPULAR_VENDORS, fetchPolicy: 'network-only' }).then(data => {
            console.log("getFeaturedVendors fetau", data)
            setProducts(data.data.getPopularVendors);
          })
      }, []);

    return (
        <>
        <Slider {...settingsFeatureProducts}>
        {products !== null && products.length > 0 && products.map((product, index) => (
            <div  key = {index}>
                 {product.picture !== null && product.picture !== "" ? 
                <img src={product.picture}></img> : 
                <img src="../Assets/Img/store.png"></img>
                }
                <h3>{product.business_name}</h3>
            </div>
        ))}
        </Slider>
     </>
    )
}

export default SliderPopular
