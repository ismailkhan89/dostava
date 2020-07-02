import React, {Component} from "react";
import Footer from '../Views/Footer.jsx';
import Header from '../Views/Header';

import { ApolloClient } from 'apollo-client';
import gql from "graphql-tag";
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ReactDOM from 'react-dom';

import { Query, Mutation } from "react-apollo";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { server_url } from  "../config/config";
import { onAddToCart } from '../library/cart'
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
    ListItem
    // Link
} from "reactstrap";
import {Link, useRouteMatch, useParams } from 'react-router-dom';
import { getCategories, getFeaturedProducts } from "../apollo/server";
import FeaturedProducts from "../components/FeaturedProducts";
const cache = new InMemoryCache()
const httpLink = createUploadLink({
  uri: `${server_url}graphql`,
})

const client = new ApolloClient({
  link: httpLink,
  cache
});
const GET_CATEGORIES = gql`${getCategories}`;
const GET_FEATURED_PRODUCTS = gql`${getFeaturedProducts}`;



class HomePage extends React.Component{
  itemsArray = [];
  constructor(props){
    super(props);
    this.state = {
      count: 0,
      featuredProductsItems : []
    }

    this.fetchProducts()
    
  }
  fetchProducts = () => {
    client.query({ query: GET_FEATURED_PRODUCTS, fetchPolicy: 'network-only' }).then(data => {
      console.log("loading fetau", data)
      this.setState({ 
        featuredProductsItems: data.data.getFeaturedProducts
      }) 
    })
  }

  
  render(){

    var settings = {
      dots: true,
      autoplay:true,
      arrows:true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    var settingsFeatureProducts = {
      dots: false,
      autoplay:false,
      arrows:true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 667,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows:true,
            infinite: true,
            dots: true
          }
        }
      ]
    };
  
    return(
      
        <Container className="wrapper" fluid>
        
        <Header  {...this.props} />
        <Link to="/cart">Cart</Link>
        <Link to="/checkout">Checkout</Link>
        <Container className="slider-area" fluid>
          <Row>
            <Col lg="12">
              <Slider {...settings}>
                <div>
                  <img src="../Assets/Img/slider-pic.png"></img>
                </div>
                <div>
                <img src="../Assets/Img/slider-pic.png"></img>
                </div>
                <div>
                <img src="../Assets/Img/slider-pic.png"></img>
                </div>
                <div>
                <img src="../Assets/Img/slider-pic.png"></img>
                </div>
                <div>
                <img src="../Assets/Img/slider-pic.png"></img>
                </div>
                <div>
                <img src="../Assets/Img/slider-pic.png"></img>
                </div>
              </Slider>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row>
            <Col lg="12">
          
            </Col>
          </Row>
        </Container>
        <Container className="feature-products" fluid>
          <Row>
            <Col lg="12">
              <h3>Feature Products</h3>
            </Col>

            <Col lg = "12">
           {this.state.featuredProductsItems.length > 0 ?  <FeaturedProducts /> : 'loading...' } 
            </Col>
          </Row>
        </Container>



        <Container className="download-app" fluid>
          <Row>
            <Col lg="3" md="4" className="download-app-img">
              <img src='../Assets/Img/iphone.png'></img>
            </Col>
            <Col lg="6" md="8" className="download-app-text">
              <h3>Download Our <strong>Application</strong></h3>
              <p>A location-based online marketplace that connects people with 
small businesses and neighborhood stores in their locality. Dostava 
has its fleet of drivers who will be available for delivery within minutes
like every other ride-sharing app.</p>
              <img src="../Assets/Img/googleplay.png"></img>
              <img src="../Assets/Img/ios.png"></img>
            </Col>
          </Row>
        </Container>
        <Container className="categories-area" fluid>
          <Row className="categories-header">
            <Col lg="12">
              <h3>Categories</h3>
              </Col>
          </Row>
          <Row className="product-list">
          <Query query={GET_CATEGORIES}>
            {({ loading, error, data }) => {
             if (loading) return <div>{"Loading"}...</div>;
             if (error) return <div>`${"Error"}! ${error.message}`</div>;
              return data.categories.map((category, index) =>
                <Col lg="6" md="6" sm="6" xs="12" key = {index}>
                  <Card className="single-product">
                    <Row>
                      <Col lg="4">
                        <CardImg src= {category.img_menu !== null ? category.img_menu : '../Assets/Img/product-img.png'} ></CardImg>
                      </Col>
                      <Col lg="8">
                        <CardBody>
                          <CardTitle>
                          {category.title} <span>(Featured Category)</span>
                          </CardTitle>
                          <CardText>{category.description} </CardText>
                          <Link to={`/product/${category._id}`} >
                             SHOW PRODUCTS
                          </Link>
                          
                          <Button>View More</Button>
                        </CardBody>
                      </Col>
                    </Row>
                  </Card>
                </Col>)
              }}
            </Query>
            </Row>
          <Row className="categories-footer">
            <Col lg="12" className="text-center">
              <Button>View More</Button>
            </Col>
          </Row>
        </Container>
        <Footer />

      
      </Container>
     
      
    )
  }

}

  export default HomePage;