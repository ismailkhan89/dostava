import React, {Component} from "react";

import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import '../Style.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link, useRouteMatch, useParams } from 'react-router-dom';
import { getFeaturedProducts } from "../apollo/server";

const GET_FEATURED_PRODUCTS = gql`${getFeaturedProducts}`;
class FeaturedProducts  extends React.Component{

    render(){
        return(
            <div>
                <Query query={GET_FEATURED_PRODUCTS}>
            {({ loading, error, data }) => {
              console.log('data we have in home', data)
              if (loading) return <div>{"Loading"}...</div>;
              if (error) return <div>`${"Error"}! ${error.message}`</div>;
              return data.getFeaturedProducts.map((product, index) =>

                <div key = {index} >
                  <p>{product.title}</p>
                  {/* <div className="single-slider-product">
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
                      <h3>{product.product}</h3>
                      <button>Add to Cart</button>
                    </div>
                    <div className="rightDetails">
                      <span> $299.00</span>
                      <strong>$199.00</strong>
                      <a href="#">Buy Now</a>
                    </div>
                  </div> */}
                </div>
              )}}
              </Query>
            </div>
        );
    }
    
}

export default FeaturedProducts;