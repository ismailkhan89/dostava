import React, {Component, useState, useEffect } from "react";
import Footer from './Footer.jsx';
import Header from './Header';

import { ApolloClient } from 'apollo-client';
import gql from "graphql-tag";
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ReactDOM from 'react-dom';

import { Query, Mutation } from "react-apollo";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import Slider from 'infinite-react-carousel';

import Accord from '../Components/Accord';

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
import Modal from 'react-bootstrap/Modal'
import { Form, FormControl } from 'react-bootstrap';
import {Link, useRouteMatch, useParams } from 'react-router-dom';
import { getCategories, getFeaturedProducts, getConfiguration
  ,getPopularVendors
  ,getFeaturedVendors } from "../apollo/server";
import FeaturedProducts from "../Components/FeaturedProducts";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { Redirect , useHistory  } from "react-router-dom";
import Categories from "./Categories.jsx";
import SliderMain from "../Components/SliderMain.jsx";
import SliderPopular from "../Components/SliderPopular.jsx";
import FlashAlert from "../Components/FlashAlert.jsx";
import { Helmet } from "react-helmet";
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

const GET_POPULAR_VENDORS = gql`${getPopularVendors}`;
const GET_FEATURED_VENDORS = gql`${getFeaturedVendors}`;

const SECTIONS = [
	{
        head: 'What is Dostava?',
        content: 'Dostava is a 100% Australian-owned online shopping & delivery platform based in the heart of Perth. Dostava connects stores to the customers in their local area through a location-based app. It is the ultimate solution to convenient shopping and effective business.',
    },
	{
        head: 'How does it work?',
        content: 'Dostava works through an easy-to-use app available on android and iOs devices. Through the App or the Dostava website, shopping is as easy as tapping on your mobile screen. Place your order by navigating through local stores in your area and let us arrange the delivery to your doorstep.',
		    content2:'If you’re a vendor looking to increase sales online, register through the Dostava application or our website',
    },
    {
        head: 'How do I place an order?',
        content:'You just have to sign up on the Dostava application on your Smartphone, Allow the application to access your location or enter your desired location manually, our Dostava app will show you the stores nearby, select the store you like, or enter the product youre looking for, select the items you want to order, proceed to add a payment method, confirm your order and youre good to go.'
    },
    {
        head: 'How much do I need to pay to register with Dostava?',
        content: 'Your friendly Dostava App is free for you to install.',
	},
    {
      head: 'Why is Dostava not showing in my current location?',
	  content: 'Please download the app and we will send you a notification when we are in your area.',
	},
	{
		head: 'What if I am having trouble downloading or using the App?',
		content: 'Please contact our friendly support team on +61 3 9028 4573 for assistance.',
	  },
	  {
		head: 'Do we have to be a BIG Business to join Dostava?',
		content:'Dostava is here to help every retailer through these uncertain times. Just register above and we will let you know when we are delivering in your area.'
    },
	  {
		head: 'Does dostava deliver 24 hours?',
		content: 'Yes, if a store is open we will deliver',
    },
    {
      head: 'How much does dostava charge for delivery?',
      content: 'Our fees range from $0 -$9.95 depending on promotions and what you order,  the larger the order the smaller the fee. Before you place your order you can see your exact fee on our App.',
    },
	  {
		head: 'Does dostava have a minimum order limit?',
		content: 'No, there is no minimum order.',
	  },
    {
      head:'How long will my order take to be delivered?',
      content:'We will have your delivery to you within 2 hours'
    }
  ];

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block",  }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", }}
      onClick={onClick}
    />
  );
}

function LatestHomePage(props){
  useEffect(() => {
    fetchProducts(props)
  }, [])
  const [count, setCount] = useState(0);
  const [featuredProductsItems, setFeaturedProductsItems] = useState([]);
  const [configuration, setConfiguration] = useState([]);
  const [location, setLocation] = useState('');
  const [latLng, setlatLng] = useState('');
  const [message , setMessage ] = useState('')
  const [messagecolor , setMessagecolor ] = useState('')

  const searchOptions = {
    componentRestrictions: { country: ['aus'] },
  }

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

  

  // 1/12 Burton Street, Cannington WA, Australia

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

    const settings2 = {
      dots: false,
      infinite: true,
      slidesToShow: 3,
      arrows:true,
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

    const settings3 = {
      dots: false,
      infinite: true,
      slidesToShow: 3,
      arrows:true,
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

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return(
      
        <Container className="wrapper" fluid>
        <Helmet>
        <title>Dostava - Online Grocery Delivery – Order Online from Store Near You</title>
        <meta name="description" content="Dostava a location-based online grocery marketplace, currently operating in Perth that connects people with small businesses and neighborhood stores in their locality." />
      		</Helmet>
         <Header  {...props} title="Dostava - Online Grocery Delivery – Order Online from Store Near You" />
         

      
         

        {/* <Link to="/cart">Cart</Link>
        <Link to="/checkout">Checkout</Link> */}
        
        
        
       
              <FlashAlert message={message} color={messagecolor} />
        
        
        <Container className="home-slider home-bg" fluid>
          <Row>
              <Container>
                <Row>
                  <Col lg="6" md="6" sm="12" xs="12" className="home-slider-text">
                    
                    <h4>Stores in your area, now delivering</h4>
                    <Form inline className="text-right search-form">
                      {/* <FormControl type="text" placeholder="Enter Location here..." className="mr-sm-2" /> */}
                      <PlacesAutocomplete
                      searchOptions={searchOptions}
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
                              {suggestions.map((suggestion,index) => {
                                const className = suggestion.active
                                  ? 'suggestion-item--active'
                                  : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                  <div
                                  key={index}
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
                      <Link className="outline-success" to={'javascript:void(0)'}  onClick={(e) => {
                        e.preventDefault();
                        if(location !== ""){

                        localStorage.removeItem('cartItems');
                        if(!!latLng){
                          var newlocation = {
                            lat : latLng.lat.toString(),
                            lng : latLng.lng.toString(),
                            location : location
                          }
                          localStorage.setItem('location',JSON.stringify(newlocation));
                            props.history.push({
                            pathname: '/stores',
                            // state: {...props.history?.state,location: latLng}
                          })
                        }
                      }
                      else{
                        setMessage('Please Choose Location')
                        setMessagecolor('danger');
                        setTimeout(() => {
                        setMessage('')
                        setMessagecolor('')}, 5000)
                        //  alert('Please Choose Location')
                        }
                      }}><Button variant="outline-success">Show Stores</Button></Link>
                      
                    </Form>
                  </Col>
                  <Col lg="6" md="6" sm="12" xs="12" className="home-slider-img ">
                  <img src='../Assets/Img/slider-img-new.png' ></img>
                  </Col>
                </Row>
              </Container>
          </Row>
        </Container>
        <Container className="categories-section" fluid>
          <Row>
            <Container>
              <Row>
                  <Col lg="12" className="section-head">
                    <h3>Categories</h3>
                  </Col>
                  <Col lg="4" md="4" sm="6" className="single-category-sec">
                      <img src='../Assets/Img/gifts.jpg'></img>
                      <h4>Gifts</h4>
                  </Col>
                  <Col lg="4" md="4" sm="6" className="single-category-sec">
                      <img src='../Assets/Img/groceries_new.jpg'></img>
                      <h4>Groceries</h4>
                  </Col>
                  <Col lg="4" md="4" sm="6" className="single-category-sec">
                      <img src='../Assets/Img/vegetables.jpg'></img>
                      <h4>Fruits & Vegetables</h4>
                  </Col>
                  <Col lg="4" md="4" sm="6" className="single-category-sec">
                      <img src='../Assets/Img/foodsupplements.jpg'></img>
                      <h4>Food Supplement</h4>
                  </Col>
                  <Col lg="4" md="4" sm="6" className="single-category-sec">
                      <img src='../Assets/Img/internationalfood.jpg'></img>
                      <h4>International Food</h4>
                  </Col>
                  <Col lg="4" md="4" sm="6" className="single-category-sec">
                      <img src='../Assets/Img/newsagent.jpg'></img>
                      <h4>Newsagent</h4>
                  </Col>
              </Row>
            </Container>
          </Row>
        </Container>
        
        <Container className="coming-soon-section" fluid>
            <Row>
              <Container>
                <Row>
                  <Col lg="5" md="7" sm="8" className="coming-text">
                    <h4>delivering Now</h4>
                    <p>In specific neighborhoods around Perth</p>
                    <a href="/register-vendor/#vendor-form" >Add your store</a>
                  </Col>
                </Row>
              </Container>
            </Row>
        </Container>

        <Container className="why-section" fluid>
          <Row>
            <Container>
              <Row>
              <Col lg="12" className="section-head">
                    <h3>Why Dostava</h3>
                  </Col>
              </Row>
            </Container>
          </Row>
        </Container>

        <Container className="video-section" fluid>
          <Row>
            <Container>
              <Row>
                <Col lg="6" className="video-col">
                <iframe width="100%" height="315" src="https://www.youtube.com/embed/SfML_tjNIsY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </Col>
              </Row>
            </Container>
          </Row>
        </Container>

        <Container className="become-vendor" fluid>
          <Row>
            <Container>
              <Row>
              <Col lg="12" className="section-head">
                <h3>Become a partner</h3>
              </Col>
              <Col lg="6" md="6" sm="12" xs="12" className="vendor-col">
                <Row>
                  <Col lg="3" md="12" xs="12" className="vendor-col-img">
                    <img src='../Assets/Img/vendor-icon.png' ></img>
                  </Col>
                  <Col lg="9" md="12" xs="12" className="vendor-col-text">
                      <h3>INCREASE YOUR SALES, BOOST YOUR AUDIENCE, ENHANCE YOUR PRESENCE</h3>
                      {/* <a href="/register-vendor" >Become a Vendor</a> */}
                      <a href="/register-vendor/#vendor-form" >Add your store</a>
                  </Col>
                </Row>
              </Col>
              <Col lg="6" md="6" sm="12" xs="12" className="vendor-col">
                <Row>
                  <Col lg="3" md="12" xs="12" className="vendor-col-img">
                    <img src='../Assets/Img/driver-icon.png' ></img>
                  </Col>
                  <Col lg="9" md="12" xs="12" className="vendor-col-text">
                      <h3>Work with Freedom. Earn with Freedom</h3>
                      <a href="/register-driver/#driver-form">Become a Driver</a>
                  </Col>
                </Row>
              </Col>
              </Row>
            </Container>
          </Row>
        </Container>

        <Container className="app-area new-apparea" fluid>
              <Row>
                <Container>
                  <Row>
                    <Col lg="6" md="7" sm="12" xs="12" className="app-area-text">
                  <h3>Make things easier, download the app</h3>
                  <a href="https://apps.apple.com/us/app/dostava/id1543132324">
                    
                    <img src="../Assets/Img/app-store-icon.png"></img>
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=com.dostava">
                    <img src="../Assets/Img/google-play-icon.png"></img>
                  </a>
                </Col>
                <Col lg="6" md="5" sm="12" xs="12" className="app-area-img">
                  <img src='../Assets/Img/hand.png' ></img>
                </Col>
                </Row>
                </Container>
              </Row>
        </Container>

        

        <Container className="faq-sectio faq-home">
    			<Row>
          <Col lg="12" className="section-head">
                <h3>FAQs</h3>
              </Col>
					<Col lg="12">
						{SECTIONS.length > 0 && SECTIONS.map((data, i) => <Accord head={data.head} bullentpoints={data.bullentpoints} content={data.content} content2={data.content2} content3={data.content3} content4={data.content4} key={i}/>)}
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
  export default LatestHomePage;