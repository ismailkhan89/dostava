
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


import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { Redirect , useHistory  } from "react-router-dom";




function Modal2(props){

    const [location, setLocation] = useState('');
  const [latLng, setlatLng] = useState('');
  const [message , setMessage ] = useState('')
  const [messagecolor , setMessagecolor ] = useState('')

  const searchOptions = {
    componentRestrictions: { country: ['aus'] },
  }
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
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    return(

<Modal size="lg" show={props.show} onHide={() =>props.handleClose()}>
<Modal.Header closeButton>
  <Modal.Title>Enter Your Location</Modal.Title>
</Modal.Header>
<Modal.Body>
<Form inline className="text-right search-form">
              {/* <FormControl type="text" placeholder="Enter delivery address here..." className="mr-sm-2" /> */}
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
                        placeholder:"Enter delivery address here...",
                        className: "mr-sm-2",
                      })}
                    type="text" 
                    // placeholder="Enter delivery address here..." className="mr-sm-2"
                    /> */}

                    <input
                      {...getInputProps({
                        // placeholder: 'Search Places ...',
                        placeholder:"Enter delivery address here...",
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
              <Link className="outline-success" to={"#"}  onClick={(e) => {
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
                  console.log("props.history", props);
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
  </Modal.Body>

</Modal>
    )
            }
            export default Modal2;