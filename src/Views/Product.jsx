import React, {Component} from "react";

import Footer from '../Views/Footer.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import '../Style.css';
import logo from '../logo.png';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import FontAwesome from 'react-fontawesome'
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
class Products extends React.Component{

  
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
    
    return(
        <Container className="wrapper" fluid>
        <Container className="header-area" fluid>
          <Row className="topBar">
            <Col lg="5">
              <p>
                <span>FREE SHIPPING AND RETURNS </span>ON ALL ORDERS ABOVE $199</p>
                
            </Col>
            <Col lg="3" className="menuitems">
              <ul>{listItems}</ul>
            </Col>
            <Col lg="1" className="login">
              <FontAwesome name="user" size="xl"/>
              <strong>Login</strong>
            </Col>
            <Col lg="1" className="wishlist">
              <FontAwesome name="heart-o" size="xl"/>
                Wishlist
                <span className="favorites">0</span>
            </Col>
            <Col lg="1" className="language">
              EN
            </Col>
            <Col lg="1" className="myprofile">
              <FontAwesome name="user" size="xl"/>
                <strong>My Profile</strong>
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
        <Container className="breadcrumb-area" fluid>
          <Row>
            <Col lg="3">
            </Col>
            <Col lg="3" className="breadcrumb-section">
              <h3>Products</h3>
              <ul>
                <li><Link>Home</Link></li>

                <li><Link>Products</Link></li>
              </ul>
            </Col>
          </Row>
        </Container>
       
        <Container className="content-area" fluid>
          <Row>
            <Col lg="3" className="sidebar-products">
              <div className="single-filter">
                <h3>Filter by Category</h3>
                <ul>
                  <li><Link>Laptop & Computer <span>(439)</span></Link></li>
                  <li>
                    <Link>Meats <span>(2224)</span></Link>
                    <ul>
                      <li><Link>15.5 <span>(24)</span></Link></li>
                      <li><Link>15.5 <span>(24)</span></Link></li>
                      <li><Link>15.5 <span>(24)</span></Link></li>
                      <li><Link>15.5 <span>(24)</span></Link></li>
                      <li><Link>15.5 <span>(24)</span></Link></li>
                    </ul>
                  </li>
                  <li><Link>Greens <span>(439)</span></Link></li>
                  <li><Link>Snacks <span>(439)</span></Link></li>
                  <li><Link>Cleaning <span>(439)</span></Link></li>
                  <li><Link>Bakery <span>(439)</span></Link></li>
                </ul>
              </div>

              <div className="single-filter">
                <h3>Filter by Category</h3>
                <ul>
                  <li><Link>Laptop & Computer <span>(439)</span></Link></li>
                  <li>
                    <Link>Meats <span>(2224)</span></Link>
                    <ul>
                      <li><Link>15.5 <span>(24)</span></Link></li>
                      <li><Link>15.5 <span>(24)</span></Link></li>
                      <li><Link>15.5 <span>(24)</span></Link></li>
                      <li><Link>15.5 <span>(24)</span></Link></li>
                      <li><Link>15.5 <span>(24)</span></Link></li>
                    </ul>
                  </li>
                  <li><Link>Greens <span>(439)</span></Link></li>
                  <li><Link>Snacks <span>(439)</span></Link></li>
                  <li><Link>Cleaning <span>(439)</span></Link></li>
                  <li><Link>Bakery <span>(439)</span></Link></li>
                </ul>
              </div>
            </Col>
            <Col lg="9">
              <Row>
                <Col lg="3">
                <div className="single-slider-product">
                    <img src="../Assets/Img/product-1.jpg"></img>
                    <div className="leftIcons">
                      <span>New</span>
                      <span className="Salebg">Sale</span>
                    </div>
                    <div className="RightIcons">
                      <FontAwesome name="heart-o"/>
                      <FontAwesome name="share" />
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
                </Col>
                <Col lg="3">
                <div className="single-slider-product">
                    <img src="../Assets/Img/product-1.jpg"></img>
                    <div className="leftIcons">
                      <span>New</span>
                      <span className="Salebg">Sale</span>
                    </div>
                    <div className="RightIcons">
                      <FontAwesome name="heart-o"/>
                      <FontAwesome name="share" />
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
                </Col>
                <Col lg="3">
                <div className="single-slider-product">
                    <img src="../Assets/Img/product-1.jpg"></img>
                    <div className="leftIcons">
                      <span>New</span>
                      <span className="Salebg">Sale</span>
                    </div>
                    <div className="RightIcons">
                      <FontAwesome name="heart-o"/>
                      <FontAwesome name="share" />
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
                </Col>
                <Col lg="3">
                <div className="single-slider-product">
                    <img src="../Assets/Img/product-1.jpg"></img>
                    <div className="leftIcons">
                      <span>New</span>
                      <span className="Salebg">Sale</span>
                    </div>
                    <div className="RightIcons">
                      <FontAwesome name="heart-o"/>
                      <FontAwesome name="share" />
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
                </Col>
                
              </Row>
            </Col>
          </Row>
        </Container>
        
        <Footer />

      
      </Container>
     
      
    )
  }

}

  export default Products;