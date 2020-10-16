import React, {Component, useState, useEffect } from "react";
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
import FontAwesome from 'react-fontawesome';
import { Form, FormControl } from 'react-bootstrap';
import {Link, useRouteMatch, useParams } from 'react-router-dom';
import { getCategories, getFeaturedProducts, getConfiguration } from "../apollo/server";
import FeaturedProducts from "../../src/Components/FeaturedProducts";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { Redirect , useHistory  } from "react-router-dom";
import Categories from "./Categories.jsx";
const cache = new InMemoryCache()
const httpLink = createUploadLink({
  uri: `${server_url}graphql`,
})

const client = new ApolloClient({
  link: httpLink,
  cache
});
const GET_CATEGORIES = gql`${getCategories}`;
const GET_CONFIGURATION = gql`${getConfiguration}`;
const GET_FEATURED_PRODUCTS = gql`${getFeaturedProducts}`;



function HomePage(props){
  useEffect(() => {
    fetchProducts(props)
  }, [])
  const [count, setCount] = useState(0);
  const [featuredProductsItems, setFeaturedProductsItems] = useState([]);
  const [configuration, setConfiguration] = useState([]);
  const [location, setLocation] = useState('');
  const [latLng, setlatLng] = useState('');

  function fetchProducts(props) {
    client.query({ query: GET_CONFIGURATION, fetchPolicy: 'network-only' }).then(res => {
      console.log("GET_CONFIGURATION fetau", res.data)
      localStorage.setItem("configuration",JSON.stringify(res.data.configuration))
      setConfiguration(res.data.configuration);
    })
    client.query({ query: GET_FEATURED_PRODUCTS, fetchPolicy: 'network-only' }).then(data => {
      console.log("loading fetau", data)
      setFeaturedProductsItems(data.data.getFeaturedProducts);
    })
   
  }

  // const history = useHistory();

  const routeChange = () =>{ 
    // localStorage.clear();
    localStorage.removeItem('cartItems');
    let path = `categories`; 
    props.history.push(path,{ location: latLng });
  }

    var settings = {
      dots: true,
      autoplay:true,
      arrows:true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
  
     function handleSelect(address){
       setLocation(address)
      geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
          setlatLng(latLng)
          localStorage.removeItem('location');
          // console.log('Success', latLng)
        })
        .catch(error => console.error('Error', error));
    };
    return(
      
        <Container className="wrapper" fluid>
        
         <Header  {...props} title="Dostava" />

        {/* <Link to="/cart">Cart</Link>
        <Link to="/checkout">Checkout</Link> */}
        <Container className="slider-area" style={{display:'none'}} fluid>
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
        <Container className="feature-products" style={{display:'none'}} fluid>
          <Row>
            <Col lg="12">
              <h3>Feature Products</h3>
            </Col>

            <Col lg = "12">
           {featuredProductsItems.length > 0 ?  <FeaturedProducts {...props} /> : 'loading...' } 
            </Col>
          </Row>
        </Container>



        <Container className="download-app" style={{display:'none'}} fluid>
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
        <Container className="categories-area" style={{display:'none'}}  fluid>
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
                        <Link to={`/categories/${category._id}`} >
                          <CardImg src= {category.img_menu !== null ? category.img_menu : '../Assets/Img/product-img.png'} ></CardImg>
                        </Link>
                      </Col>
                      <Col lg="8">
                        <CardBody>
                        <Link to={`/product/${category._id}`} >
                          <CardTitle>
                          {category.title} <span>(Featured Category)</span>
                          </CardTitle>
                          <CardText>{category.description} </CardText>                         
                       
                          
                          <Button>View Products</Button>
                          </Link>
                        </CardBody>
                      </Col>
                    </Row>
                  </Card>
                </Col>)
              }}
            </Query>
            </Row>
          <Row className="categories-footer" style={{display:'none'}}>
            <Col lg="12" className="text-center">
              <Button>View More</Button>
            </Col>
          </Row>
        </Container>
        <Container className="home-slider" fluid>
          <Row>
              <Container>
                <Row>
                  <Col lg="7" className="home-slider-text">
                    <h3>Dostava</h3>
                    <h4><strong>Groceries</strong> are just an app away</h4>
                    <Form inline className="text-right search-form">
                      {/* <FormControl type="text" placeholder="Enter Location here..." className="mr-sm-2" /> */}
                      <PlacesAutocomplete
                        value={location}
                        onChange={(e) => setLocation(e)}
                        onSelect={handleSelect}
                      >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                          <>

                            {/* <FormControl
                              {...getInputProps({
                                // placeholder: 'Search Places ...',
                                placeholder:"Enter Location here...",
                                className: "mr-sm-2",
                              })}
                            type="text" 
                            // placeholder="Enter Location here..." className="mr-sm-2"
                            /> */}

                            <input
                              {...getInputProps({
                                // placeholder: 'Search Places ...',
                                placeholder:"Enter Location here...",
                                className: "mr-sm-2 form-control",
                              })}
                            />
                            <div className="autocomplete-dropdown-container">
                              {loading && <div>Loading...</div>}
                              {suggestions.map(suggestion => {
                                const className = suggestion.active
                                  ? 'suggestion-item--active'
                                  : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                  <div
                                    {...getSuggestionItemProps(suggestion, {
                                      className,
                                      style,
                                    })}
                                  >
                                    <span>{suggestion.description}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        )}
                      </PlacesAutocomplete>
                      <Link className="outline-success"  onClick={(e) => {
                        e.preventDefault();
                        localStorage.removeItem('cartItems');
                        if(!!latLng){
                          var newlocation = {
                            lat : latLng.lat.toString(),
                            lng : latLng.lng.toString(),
                            location : location
                          }
                          localStorage.setItem('location',JSON.stringify(newlocation));
                            props.history.push({
                            pathname: '/categories',
                            // state: {...props.history?.state,location: latLng}
                          })
                        }
                      }}><Button variant="outline-success">Show Categories</Button></Link>
                      
                    </Form>
                  </Col>
                </Row>
              </Container>
          </Row>
        </Container>
        <Container className="become-vendor" fluid>
          <Row>
            <Container>
              <Row>
              <Col lg="6" className="vendor-col">
                <Row>
                  <Col lg="3" className="vendor-col-img">
                    <img src='../Assets/Img/vendor-icon.png' ></img>
                  </Col>
                  <Col lg="9" className="vendor-col-text">
                      <h3>INCREASE YOUR SALES, BOOST YOUR AUDIENCE, ENHANCE YOUR PRESENCE</h3>
                      <Link to="/">Become a Vendor</Link>
                  </Col>
                </Row>
              </Col>
              <Col lg="6" className="vendor-col">
                <Row>
                  <Col lg="3" className="vendor-col-img">
                    <img src='../Assets/Img/driver-icon.png' ></img>
                  </Col>
                  <Col lg="9" className="vendor-col-text">
                      <h3>Work with Freedom. Earn with Freedom</h3>
                      <Link to="/">Become a Driver</Link>
                  </Col>
                </Row>
              </Col>
              </Row>
            </Container>
          </Row>
        </Container>
        <Container className="app-area" fluid>
              <Row>
                <Col lg="6" className="app-area-img">
                  <img src='../Assets/Img/Mobile-Mockups.png' ></img>
                </Col>
                <Col lg="6" className="app-area-text">
                  <h3>Dostava is Available for your Android or Apple</h3>
                  <img src='../Assets/Img/playstore.png' ></img>
                  <img src='../Assets/Img/appstore.png' ></img>
                </Col>
              </Row>
        </Container>
        <Footer />

      
      </Container>
     
      
    )


}


// class LocationSearchInput extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { address: '',latlng : null};
//   }
 
//   handleChange = address => {
//     this.setState({ address });
//   };
 
//   handleSelect = address => {
//     geocodeByAddress(address)
//       .then(results => getLatLng(results[0]))
//       .then(latLng => {
//         this.setState({latlng : latLng })
//         console.log('Success', latLng)})
//       .catch(error => console.error('Error', error));
//   };
 
//   render() {
//     return (
//       <PlacesAutocomplete
//         value={this.state.address}
//         onChange={this.handleChange}
//         onSelect={this.handleSelect}
//       >
//         {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//           <div>
//             <input
//               {...getInputProps({
//                 placeholder: 'Search Places ...',
//                 className: 'location-search-input',
//               })}
//             />
//             <div className="autocomplete-dropdown-container">
//               {loading && <div>Loading...</div>}
//               {suggestions.map(suggestion => {
//                 const className = suggestion.active
//                   ? 'suggestion-item--active'
//                   : 'suggestion-item';
//                 // inline style for demonstration purpose
//                 const style = suggestion.active
//                   ? { backgroundColor: '#fafafa', cursor: 'pointer' }
//                   : { backgroundColor: '#ffffff', cursor: 'pointer' };
//                 return (
//                   <div
//                     {...getSuggestionItemProps(suggestion, {
//                       className,
//                       style,
//                     })}
//                   >
//                     <span>{suggestion.description}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </PlacesAutocomplete>
//     );
//   }
// }
  export default HomePage;