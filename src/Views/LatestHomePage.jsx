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
        content: 'Dostava is a 100% Australian owned online platform based in the heart of Perth, that connects small stores to the customers living in the nearby area through a location based app. It is the ultimate solution to convenient shopping and effective business.',
    },
	{
        head: 'How does it work?',
        content: 'Dostava works through an easy-to-use application available for your android and iOs devices. Through the application or the Dostava website, grocery shopping is as easy as tapping on your mobile screen. Place an order by navigating through a number of stores available near you and get it delivered at your doorstep.',
		content2:'If you’re a vendor looking to increase sales online, register through the Dostava application or through our website. Accept the orders from customers, pack and prepare it for the delivery rider to pick and get paid. It’s that simple.',
    },
    {
        head: 'How much do I need to pay to register with dostava?',
        content: 'Your friendly Dostava App is free for you to install and you can start using it and start earning.',
	},
    {
      head: 'How much do I get paid for each delivery?',
	  content: 'Your friendly Dostava App will show you your delivery fees. Your delivery fees starts from $9.99 for each delivery.',
	},
	{
		head: 'Where do I pick up the groceries from?',
		content: 'Your friendly Dostava application will send you complete details of the pick and drop of the package and the money you will be making for the gig.',
	  },
	  {
		head: 'When do I deliver the groceries?',
		content: 'Your order pickup and Delivery both are for next day .You pick up the order and deliver it on the same day.',
		content2:'Plan your day ahead. How easy is that?… we are here to look after you.'
    },
	  {
		head: 'How often do I get paid for the work?',
		content: 'Dostava provides you with the luxury of getting paid per order. The Dostava mobile application will send complete cash details every time an order is placed or a transaction has been made.',
    },
    {
      head: 'Do we have to be a BIG Business to join Dostava?',
      content: 'Dostava appreciates all kinds of businesses. You may not be a big business yet, but we’ll surely help you get there.',
    },
	  {
		head: 'Do we have to sign up any contract with Dostava?',
		content: 'If you are looking to partner up as a delivery mate, Dostava offers you complete freedom. It is a no-contract, get paid as you go job. All you need is a smartphone and a vehicle and you’re set to go! Register now and start earning extra money.',
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
                  <Col lg="6" md="8" sm="12" xs="12" className="home-slider-text">
                    
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
                      <Link className="outline-success" to={'javascript:;'}  onClick={(e) => {
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
                  <Col lg="6" md="5" sm="12" xs="12" className="home-slider-img ">
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
                  <Col lg="4" className="single-category-sec">
                      <img src='../Assets/Img/single-category1.png'></img>
                      <h4>Pharmacy</h4>
                  </Col>
                  <Col lg="4" className="single-category-sec">
                      <img src='../Assets/Img/single-category2.png'></img>
                      <h4>Liquor/Wine Store</h4>
                  </Col>
                  <Col lg="4" className="single-category-sec">
                      <img src='../Assets/Img/single-category3.png'></img>
                      <h4>Grocery Store</h4>
                  </Col>
                  <Col lg="4" className="single-category-sec">
                      <img src='../Assets/Img/single-category4.png'></img>
                      <h4>Vegetable Shop</h4>
                  </Col>
                  <Col lg="4" className="single-category-sec">
                      <img src='../Assets/Img/single-category5.png'></img>
                      <h4>Flower Shop</h4>
                  </Col>
                  <Col lg="4" className="single-category-sec">
                      <img src='../Assets/Img/single-category6.png'></img>
                      <h4>Meat Shop</h4>
                  </Col>
              </Row>
            </Container>
          </Row>
        </Container>
        
        <Container className="coming-soon-section" fluid>
            <Row>
              <Container>
                <Row>
                  <Col lg="5" className="coming-text">
                    <h4>delivering from</h4>
                    <h2>15<sup>TH</sup> MARCH, 2021</h2>
                    <p>In specific neighborhoods around Perth</p>
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