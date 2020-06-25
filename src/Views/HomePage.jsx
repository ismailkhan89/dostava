import React, {Component} from "react";
import Footer from '../Views/Footer.jsx';
import Header from '../Views/Header';

import { ApolloClient } from 'apollo-client';
import gql from "graphql-tag";
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ReactDOM from 'react-dom';
import InfiniteCarousel from 'react-leaf-carousel';
import { Query, Mutation } from "react-apollo";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FontAwesome from 'react-fontawesome'
import { server_url } from  "../config/config"
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
import FeaturedProducts from "../Components/FeaturedProducts";
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
  UNSAFE_componentWillMount() {
    console.log('=mount')
      this.setState({count: 1});
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
    console.log("itemsArray",this.state.featuredProductsItems)
var imagesArray = [
  {
    'image': "https://media.gettyimages.com/photos/drone-photo-of-lahore-city-pakistan-picture-id806900368?s=612x612"
  },
  {
    'image': "https://media.gettyimages.com/photos/drone-photo-of-lahore-city-pakistan-picture-id806900368?s=612x612"
  },
  {
    'image': "https://media.gettyimages.com/photos/drone-photo-of-lahore-city-pakistan-picture-id806900368?s=612x612"
  },
  {
    'image': "https://media.gettyimages.com/photos/drone-photo-of-lahore-city-pakistan-picture-id806900368?s=612x612"
  }
]
    var test = this.state.featuredProductsItems;
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
  var imagesAra =  this.state.featuredProductsItems.map((item, idx )=> <div key = {idx}> <p>{item.title}</p> <img src={item.img_url} /></div>) 
  var imagesAr =  imagesArray.map((item, idx )=> <div key = {idx}><img src={item.image} ></img></div>) 

console.log("imagesAra",imagesAra)
console.log('this.state.featuredProductsItems.length',this.state.featuredProductsItems.length)
// if(this.state.featuredProductsItems.length > 0 ){
//   return imagesAra
// }
console.log("imagesAr",imagesAr)
console.log('render twice')
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

            {/* <Col>
            <FeaturedProducts />
            </Col> */}
            <Col lg = "12">
            
            {/* <InfiniteCarousel
              breakpoints={[
                {
                  breakpoint: 500,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                  },
                },
              ]}
              dots={true}
              showSides={true}
              sidesOpacity={.5}
              sideSize={.1}
              slidesToScroll={1}
              slidesToShow={6}
              scrollOnDevice={true}
            >   */}
           {this.state.featuredProductsItems.length > 0 ? <FeaturedProducts /> : 'loading...' } 
            {/* { 
            test.map((item, idx )=>{
              console.log('item ar ', item)
              return(
                // <div key = {idx}> <p>{item.title}</p> <img src={item.img_url} /></div>
                 <div key = {idx}> <p>{"Title"}</p> <img src={item.image} /></div>
              )
            }) 
           } */}
            {/* { 
            imagesArray.map((item, idx )=>{
              console.log('item image ar ', item)
              return(
                <div key = {idx}> <p>{"Title"}</p> <img src={item.image} /></div>
              )
            }) 
           } */}
            {/* {imagesAr} */}
            {/* <Query query={GET_FEATURED_PRODUCTS}>
      {({ loading, error, data }) => {
        console.log('data we have in home', data)
        if (loading) return <div>{"Loading"}...</div>;
        if (error) return <div>`${"Error"}! ${error.message}`</div>;
        if(data === undefined || data === 'undefined' ) return  <div>{"Loading"}...</div>;
        return data.getFeaturedProducts.map((product, index) => 
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
   
    )}}
    
    </Query> */}
    {/* </InfiniteCarousel> */}
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