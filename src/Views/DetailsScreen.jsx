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
    Container,
    Row,
    Col
} from "reactstrap";
import {Link, useRouteMatch, useParams } from 'react-router-dom';
import { render } from "@testing-library/react";

function DetailsScreen(props) {
  const [selectedProduct] = useState(props.location.state?.product ?? null)
  const [showIndex, setToggle] = useState(false)
  const [showBullets, setShowBullets] = useState(true)
  const [infinite, setinfinite] = useState(true)
  const [showThumbnails, setshowThumbnails] = useState(true)
  const [showFullscreenButton, setshowFullscreenButton] = useState(false)
  const [showGalleryFullscreenButton, setshowGalleryFullscreenButton] = useState(false)
  const [showPlayButton, setshowPlayButton] = useState(false)
  const [showGalleryPlayButton, setshowGalleryPlayButton] = useState(false)
  const [showNav, setshowNav] = useState(false)
  const [isRTL, setisRTL] = useState(false)
  const [slideDuration, setslideDuration] = useState(450)
  const [slideInterval, setslideInterval] = useState(2000)
  const [slideOnThumbnailOver, setslideOnThumbnailOver] = useState(false)
  const [thumbnailPosition, setthumbnailPosition] = useState(false)
  const [showVideo, setshowVideo] = useState(false)
console.log("props inside details screen", selectedProduct);
let imaages = [{
  original: selectedProduct.img_url,
  thumbnail: selectedProduct.img_url
}]

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
                <li><Link>{selectedProduct.title}</Link></li>
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
                    items={imaages}
                    showFullscreenButton={showFullscreenButton && showGalleryFullscreenButton}
                    showPlayButton={showPlayButton && showGalleryPlayButton}
                    showNav={showNav}
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
    <p>{selectedProduct.description}</p>
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

       
        
        
        <Footer />

      
      </Container>
     
      
    )

  }


  export default DetailsScreen;