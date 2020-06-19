import React, {Component} from "react";

import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import '../Style.css';
import logo from '../logo.png';
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
import {Link } from 'react-router-dom';
import { getCategories } from "../apollo/server";

const GET_CATEGORIES = gql`${getCategories}`;

class HomePage extends React.Component{

  
  render(){

    
    console.log('inside HomePage')
    const MenuItems = ['About us', 'Contact Us', 'Gallery', 'My Account'];
    const listItems = MenuItems.map((items, keys) =>
      <li key = {keys}>{items}</li>
    );
    const MainMenu = ['Meets', 'Greens', 'Snacks', 'Cleaning', 'Bakery', 'and many more..'];
    const MenuList = MainMenu.map((items, keys) =>
      <li key = {keys} >{items}</li>
    );
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
        
        <Container className="header-area" fluid>
          <Row className="topBar">
            <Col lg="6">
              <p>
                <span>FREE SHIPPING AND RETURNS </span>ON ALL ORDERS ABOVE $199</p>
                
            </Col>
            <Col lg="3" className="menuitems">
              <ul>{listItems}</ul>
            </Col>
            <Col lg="3" className="menuitems rightmenu">
              <ul>
                <li><strong>Login</strong></li>
                <li>Wishlist</li>
                <li>EN</li>
                <li><strong>My Profile</strong></li>
              </ul>
            </Col>
          </Row>
          <Row className="mainHeader">
            <Col lg="3" className="logo">
              <img src={logo} alt="Logo" />;
            </Col>
            <Col lg="6" className="menuitems">
              <ul>{MenuList}</ul>
            </Col>
            <Col lg="3">

            </Col>
          </Row>
        </Container>
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
            <Col lg="12">
              <Slider {...settingsFeatureProducts}>
                <div>
                  <div className="single-slider-product">
                    <img src="../Assets/Img/product-1.jpg"></img>
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
                      <h3>Product Name are Here</h3>
                      <button>Add to Cart</button>
                    </div>
                    <div className="rightDetails">
                      <span> $299.00</span>
                      <strong>$199.00</strong>
                      <a href="#">Buy Now</a>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="single-slider-product">
                    <img src="../Assets/Img/product-1.jpg"></img>
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
                      <h3>Product Name are Here</h3>
                      <button>Add to Cart</button>
                    </div>
                    <div className="rightDetails">
                      <span> $299.00</span>
                      <strong>$199.00</strong>
                      <a href="#">Buy Now</a>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="single-slider-product">
                    <img src="../Assets/Img/product-1.jpg"></img>
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
                      <h3>Product Name are Here</h3>
                      <button>Add to Cart</button>
                    </div>
                    <div className="rightDetails">
                      <span> $299.00</span>
                      <strong>$199.00</strong>
                      <a href="#">Buy Now</a>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="single-slider-product">
                    <img src="../Assets/Img/product-1.jpg"></img>
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
                      <h3>Product Name are Here</h3>
                      <button>Add to Cart</button>
                    </div>
                    <div className="rightDetails">
                      <span> $299.00</span>
                      <strong>$199.00</strong>
                      <a href="#">Buy Now</a>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="single-slider-product">
                    <img src="../Assets/Img/product-1.jpg"></img>
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
                      <h3>Product Name are Here</h3>
                      <button>Add to Cart</button>
                    </div>
                    <div className="rightDetails">
                      <span> $299.00</span>
                      <strong>$199.00</strong>
                      <a href="#">Buy Now</a>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="single-slider-product">
                    <img src="../Assets/Img/product-1.jpg"></img>
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
                      <h3>Product Name are Here</h3>
                      <button>Add to Cart</button>
                    </div>
                    <div className="rightDetails">
                      <span> $299.00</span>
                      <strong>$199.00</strong>
                      <a href="#">Buy Now</a>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="single-slider-product">
                    <img src="../Assets/Img/product-1.jpg"></img>
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
                      <h3>Product Name are Here</h3>
                      <button>Add to Cart</button>
                    </div>
                    <div className="rightDetails">
                      <span> $299.00</span>
                      <strong>$199.00</strong>
                      <a href="#">Buy Now</a>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="single-slider-product">
                    <img src="../Assets/Img/product-1.jpg"></img>
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
                      <h3>Product Name are Here</h3>
                      <button>Add to Cart</button>
                    </div>
                    <div className="rightDetails">
                      <span> $299.00</span>
                      <strong>$199.00</strong>
                      <a href="#">Buy Now</a>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="single-slider-product">
                    <img src="../Assets/Img/product-1.jpg"></img>
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
                      <h3>Product Name are Here</h3>
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
              if (loading) return <tr><td>{"Loading"}...</td></tr>;
              if (error) return <tr><td>`${"Error"}! ${error.message}`</td></tr>;
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
        <Container className="footer-area" fluid>
          <Row className="widget-area">
            <Col lg="3" className="footer-logo">
                <div>
                  <img src="../Assets/Img/logo.png"></img>
                </div>
                <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">Shop</a></li>
                  <li><a href="#">Blog</a></li>
                  <li><a href="#">Contact Us</a></li>
                  <li><a href="#">About Us</a></li>
                </ul>
            </Col>
            <Col lg="2" className="quickmenu">
              <h3>Help/Support</h3>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">How it works</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">FAQs</a></li>
              </ul>
            </Col>
            <Col lg="3" className="quickmenu half">
              <h3>Category</h3>
                <ul>
                  <li><a href="#">Meets</a></li>
                  <li><a href="#">Greens</a></li>
                  <li><a href="#">Snacks</a></li>
                  <li><a href="#">Cleaning</a></li>
                </ul>
                <ul>
                  <li><a href="#">Meets</a></li>
                  <li><a href="#">Greens</a></li>
                  <li><a href="#">Snacks</a></li>
                  <li><a href="#">Cleaning</a></li>
                </ul>
            </Col>
            <Col lg="2" className="quickmenu footer-app half">
              <h3>Download Our App</h3>
              <img src="../Assets/Img/footer-appstore.png"></img>
              <img src="../Assets/Img/footer-googleplay.png"></img>
            </Col>
            <Col lg="2" className="quickmenu social">
              <h3>Address</h3>
              <p>208 Columbus St, Hicksville, OH, 4352</p>
              <h3>Social Media links</h3>
            </Col>
          </Row>
        </Container>

      
      </Container>
     
      
    )
  }

}

  export default HomePage;