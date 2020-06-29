import React, {Component, useEffect, useState} from "react";
import Footer from './Footer.jsx';
import Header from './Header';
import FontAwesome from 'react-fontawesome'
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import '../Style.css';
import ReactDOM from 'react-dom';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';



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
    Table,
    // Link
} from "reactstrap";
import {Link, useRouteMatch, useParams } from 'react-router-dom';
import { render } from "@testing-library/react";


  class DetailsScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        showIndex: false,
        showBullets: true,
        infinite: true,
        showThumbnails: true,
        showFullscreenButton: false,
        showGalleryFullscreenButton: false,
        showPlayButton: false,
        showGalleryPlayButton: false,
        showNav: false,
        isRTL: false,
        slideDuration: 450,
        slideInterval: 2000,
        slideOnThumbnailOver: false,
        thumbnailPosition: 'bottom',
        showVideo: {},
      };

    this.images = [
      {
        original: '../Assets/Img/product-detail-img.png',
        thumbnail: '../Assets/Img/product-detail-thumbnail.png',
      },
      {
        original: '../Assets/Img/product-detail-img.png',
        thumbnail: '../Assets/Img/product-detail-thumbnail.png',
      },
      {
        original: '../Assets/Img/product-detail-img.png',
        thumbnail: '../Assets/Img/product-detail-thumbnail.png',
      },
      {
        original: '../Assets/Img/product-detail-img.png',
        thumbnail: '../Assets/Img/product-detail-thumbnail.png',
      },
      {
        original: '../Assets/Img/product-detail-img.png',
        thumbnail: '../Assets/Img/product-detail-thumbnail.png',
      },
      {
        original: '../Assets/Img/product-detail-img.png',
        thumbnail: '../Assets/Img/product-detail-thumbnail.png',
      },
      {
        original: '../Assets/Img/product-detail-img.png',
        thumbnail: '../Assets/Img/product-detail-thumbnail.png',
      },
      {
        original: '../Assets/Img/product-detail-img.png',
        thumbnail: '../Assets/Img/product-detail-thumbnail.png',
      },
      {
        original: '../Assets/Img/product-detail-img.png',
        thumbnail: '../Assets/Img/product-detail-thumbnail.png',
      },
      {
        original: '../Assets/Img/product-detail-img.png',
        thumbnail: '../Assets/Img/product-detail-thumbnail.png',
      }
    ]
  }

  render(props){

    return(
      
        <Container className="wrapper" fluid>
        
        <Header  {...props} />
        
        <Container className="breadcrumb-area" fluid>
          <Row>
            <Col lg="3">
            </Col>
            <Col lg="9" className="breadcrumb-section">
              <h3>Product Details</h3>
              <ul>
                <li><Link>Home</Link></li>

                <li><Link>Product</Link></li>
                <li><Link>Product Name</Link></li>
              </ul>
            </Col>
          </Row>
        </Container>


        <Container className="content-area product-details" fluid>
          <Row>
            <Col lg="2">

            </Col>
            <Col lg="8">
              <Row>
                <Col lg="6">
                  <ImageGallery 
                    items={this.images}
                    showFullscreenButton={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}
                    showPlayButton={this.state.showPlayButton && this.state.showGalleryPlayButton}
                    showNav={this.state.showNav}
                  />
                </Col>
                <Col lg="6">
                    Details
                </Col>
              </Row>
              <Row>
                <Tabs className="product-tabs">
                  <TabList className="product-tabs-head">
                    <Row>
                      <Col lg="12">
                        <Tab> Description</Tab>
                        <Tab> Information</Tab>
                        <Tab> Reviews (0)</Tab>
                      </Col>
                    </Row>
                  </TabList>
                  <TabPanel>
                    <Row>
                      <Col lg="12" className="description-tab">
                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                        <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
                        <p>The standard Lorem Ipsum passage, used since the 1500s</p>
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                      </Col>
                    </Row>
                  </TabPanel>
                </Tabs>
              </Row>
              <Row className="related">
                <Col lg="12" className="related-head">
                  <h2>Related Products</h2>
                </Col>
                <Row>
                  <Col lg="3">
                    <div className="single-slider-product">
                      <img src="../Assets/Img/product-1.jpg"></img>
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
                        <h3> Product name are here</h3>
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
                        <FontAwesome name="heart-o" />
                        <FontAwesome name="share" />
                      </div>
                    </div>
                    <div className="single-slider-product-detail">
                      <div className="leftDetails">
                        <h3> Product name are here</h3>
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
                        <FontAwesome name="heart-o" />
                        <FontAwesome name="share" />
                      </div>
                    </div>
                    <div className="single-slider-product-detail">
                      <div className="leftDetails">
                        <h3> Product name are here</h3>
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
                        <FontAwesome name="heart-o" />
                        <FontAwesome name="share" />
                      </div>
                    </div>
                    <div className="single-slider-product-detail">
                      <div className="leftDetails">
                        <h3> Product name are here</h3>
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
              </Row>
            </Col>
            <Col lg="2">

            </Col>
          </Row>

            
          
        </Container>

        {/* <Container className="content-area product-details" fluid>
          <Row>
            <Col lg="2">

            </Col>
            <Col lg="4">
              <ImageGallery 
                items={this.images}
                showFullscreenButton={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}
                showPlayButton={this.state.showPlayButton && this.state.showGalleryPlayButton}
                showNav={this.state.showNav}
              />
            </Col>
            <Col lg="4">

            </Col>
            <Col lg="2"></Col>
          </Row>
          <Row>
            <Col lg="2"></Col>
            <Col lg="8">
              <Tabs className="product-tabs">
                <TabList className="product-tabs-head">
                  <Row>
                    <Col lg="12">
                      <Tab> Description</Tab>
                      <Tab> Information</Tab>
                      <Tab> Reviews (0)</Tab>
                    </Col>
                  </Row>
                </TabList>
                <TabPanel>
                  <Row>
                    <Col lg="12" className="description-tab">
                      <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                      <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
                      <p>The standard Lorem Ipsum passage, used since the 1500s</p>
                      <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                    </Col>
                  </Row>
                </TabPanel>
              </Tabs>
            </Col>
          </Row>
          <Row className="related">
            <Col lg="12">
              <h2>Related Products</h2>
            </Col>
            <Col lg="12">

            </Col>
          </Row>
          
        </Container> */}
        
        
        <Footer />

      
      </Container>
     
      
    )

  }
}

  export default DetailsScreen;