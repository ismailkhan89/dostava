import React, {Component} from "react";
import Footer from '../Views/Footer.jsx';
import Header from '../Views/Header';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import logo from './logo.svg';
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
    // Link
} from "reactstrap";
import {Link, useRouteMatch, useParams } from 'react-router-dom';
import { getCategories, getFeaturedProducts } from "../apollo/server";
import FeaturedProducts from "../Components/FeaturedProducts";

const GET_CATEGORIES = gql`${getCategories}`;
const GET_FEATURED_PRODUCTS = gql`${getFeaturedProducts}`;

class HomePage extends React.Component{

  constructor(props){
    super(props);
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
      slidesToShow: 6,
      slidesToScroll: 1
    };
    return(
      
        <Container className="wrapper" fluid>
        
        <Header  {...this.props} />
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
        <Container className="feature-products" fluid>
          <Row>
            <Col lg="12">
              <h3>Feature Products</h3>
            </Col>
            {/* <Col>
            <FeaturedProducts />
            </Col> */}
            <Col lg="12">
              {/* <Slider {...settingsFeatureProducts}> */}

                  <FeaturedProducts />
            {/* <Query query={GET_FEATURED_PRODUCTS}>
            {({ loading, error, data }) => {
              console.log('data we have in home', data)
              if (loading) return <div>{"Loading"}...</div>;
              if (error) return <div>`${"Error"}! ${error.message}`</div>;
              return data.getFeaturedProducts.map((product, index) =>
<Slider {...settingsFeatureProducts}>
                <div key = {index} >
                  <p>{product.title}</p>
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
                      <h3>{product.product}</h3>
                      <button>Add to Cart</button>
                    </div>
                    <div className="rightDetails">
                      <span> $299.00</span>
                      <strong>$199.00</strong>
                      <a href="#">Buy Now</a>
                    </div>
                  </div>
                </div>
                </Slider>
              )}}
              </Query> */}
            </Col>
          </Row>
        </Container>
        <Container className="download-app" fluid>
          <Row>
            <Col lg="3" className="download-app-img">
              <img src='../Assets/Img/iphone.png'></img>
            </Col>
            <Col lg="4" className="download-app-text">
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
                <Col lg="6" key = {index}>
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