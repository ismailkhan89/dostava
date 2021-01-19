import React, {Component, useState, useEffect } from "react";
import Footer from '../Views/Footer.jsx';
import Header from '../Views/Header';
import { Query, Mutation } from "react-apollo";


import ReactDOM from 'react-dom';



import { server_url } from  "../config/config";
import {
    Container,
    Row,
    Col,
	Button,Alert,
	Form, FormGroup, Label, Input, FormFeedback, textarea, FormText , Spinner
   
    // Link
} from "reactstrap";
import FontAwesome from 'react-fontawesome';
import {Link, useRouteMatch, useParams } from 'react-router-dom';




import { Redirect , useHistory  } from "react-router-dom";
import { Helmet } from "react-helmet";

import gql from "graphql-tag";

import { sendContactForm } from "../apollo/server";

const CONTACT_FORM = gql`${sendContactForm}`



function Contact(props){ 

    const [firstname , setFirstName] = React.useState('')
	const [email , setEmail] = React.useState('')
	const [subject , setSubject] = React.useState('')
    const [message , setMessage] = React.useState('')
    

    const [firstnameErr , setFirstnameErr] = React.useState(false)
	const [emailErr , setEmailErr] = React.useState(false)
    const [subjectErr , setSubjectErr] = React.useState(false)
    const [messageErr , setMessageFieldErr] = React.useState(false)

    const [succcess , setSuccess] = React.useState('')
    const [Errors , setErrors] = React.useState('')
    
    function clearErrorField(){
		setFirstnameErr(false)
        setEmailErr(false)
        setSubjectErr(false)
		setMessageFieldErr(false)
    }
    
    function  clearFields(){
		setFirstName('')
		setEmail('')
        setSubject('')
        setMessage('')
    }
    
    function validate(){
		clearErrorField();
        let result = true;
        console.log("firstname>>",firstname);
        console.log("email>>",email);
        console.log("subject>>",subject);
        console.log("message>>",message);

		if(firstname === "" || firstname === null){
			setFirstnameErr(true)
			result = false
        }
		if(email === "" || email === null){
			setEmailErr(true)
            result = false
		}if(subject === "" || subject === null){
			setSubjectErr(true)
			result = false
		}if(message === "" || message === null){
			setMessageFieldErr(true)
			result = false
		}
		return result
      }

    function hideAlert(){
		setSuccess('')
        setErrors('')
    }

    function onError({ graphQLErrors, networkError }){
        try {
			setErrors(networkError.result.errors[0].message)
        } catch (error) {
			setErrors(graphQLErrors[0].message)
        }
		setTimeout(hideAlert, 7000)
    }
    
    function onCompleted({ graphQLErrors, networkError }){
		setSuccess('Successfully Submitted Contact Form')
        clearFields()
		setTimeout(hideAlert, 7000)
    }

    
      

    return(
      
        <Container className="wrapper" fluid>
            <Helmet>
			<title>Contact Us | Dostava </title>
			<meta name="description" content="If anything in your mind feel free to contact us. Our customer support representative will get in touch very soon. " />
		</Helmet>
            <Header  {...props} title={"Contact"} />
            <section id="how-it-works">
                <div className="how-it-works-heading">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2><strong>Contact</strong> Us</h2>
                                <hr/>
                            </div>
                        </div> 
                    </div>
                </div>
            </section>
            <section id="work-with-freedom">
		        <div className="container">
			        <div className="row"> 
				        <div className="col-md-6 first-div contact-infor">
					        <h2><strong>Contact</strong> Information.</h2>
					        <p className="pbold">We welcome you to contact us using the below details or visit our <a href="/faqs">FAQs</a>.</p>
                            <p className="pbold">Email: <a href="#">info@dostava.com.au</a></p>
                            <p className="pbold">Address: Perth, Australia</p>
                            <p className="pbold">Phone: +61 3 9028 4573</p>
                            <div className="row">
                                
                                

                            </div>
				        </div>
                        <div className="col-md-6 second-div">
                            <h2><strong>Contact  </strong>Form</h2>
                            <div id="successMessage"></div>
                            <div id="errorMessage"></div>
                            <form id="Reg-form">
                                <div className="form-part1">
                        <FormGroup>
							<Label>Name</Label>
							<Input 
							onChange={(e) => setFirstName(e.target.value)} 
							// valid={true} 
							invalid={firstnameErr}
							value={firstname}
							/>
							<FormFeedback>Name is Required</FormFeedback>
						</FormGroup>
                        <FormGroup>
							<Label>Email Address</Label>
							<Input 
							onChange={(e) => setEmail(e.target.value)} 
							// valid={true} 
							invalid={emailErr}
							value={email}
							/>
							<FormFeedback>Email Address is Required</FormFeedback>
						</FormGroup>
                        <FormGroup>
							<Label>Subject</Label>
							<Input 
							onChange={(e) => setSubject(e.target.value)} 
							// valid={true} 
							invalid={subjectErr}
							value={subject}
							/>
							<FormFeedback>Subject is Required</FormFeedback>
						</FormGroup>
                        <FormGroup>
							<Label>Message</Label>
                            <Input 
                            type="textarea" 
                            onChange={(e) => setMessage(e.target.value)} 
							// valid={true} 
							invalid={messageErr}
							value={message}
                              />
							<FormFeedback>Message is Required</FormFeedback>
						</FormGroup>
                                    <br/>
                                    <FormGroup>
                            <Mutation
						mutation={CONTACT_FORM}
						onCompleted={onCompleted}
						onError={onError}>
                    {(sendContactFormUser, { loading, error }) => {

                      return (
                        <>
                        <Button
                          className="my-4"
                          color="primary"
                          type="button"
                          onClick={() => {
                            if (validate()){
								let UserInputContact = {
									name: firstname,
									email: email,
									subject: subject,
									message: message
								}
								sendContactFormUser({ variables: { userInput : UserInputContact } })
							}
                          }}>
                          
						  {loading ?  <Spinner color="white" /> : 'Submit'} 
                        </Button>
                          <br/>
						{succcess !== "" && <Alert color="primary">
							 {succcess}
						</Alert>}
					
						{Errors !== "" && <Alert color="danger">
							 {Errors}
						</Alert>}
                        </>
                      )
                      
                    }}
                	  </Mutation>
				  </FormGroup>	
                  
                                    {/* <input type="submit" className="btn btn-primary next" value="Submit"/> */}
                                </div>
                            </form>
                        </div>
			        </div> 
		        </div> 
	        </section>
            <section id="download-app"> 
                <div className="container"> 
                    <div className="row"> 
                        <div className="col-md-3">
                            <img className="img-fluid" src="../Assets/Img/app-screen.png" alt="app-screen"></img>
                        </div>
                        <div className="col-md-7">
                            <h2>Download our <strong>application</strong></h2>
                            <hr/>
                            <p>A location-based online marketplace that connects people with small businesses and neighbourhood stores in their locality. Dostava has its fleet of drivers who will be available for delivery within minutes like every other ride-sharing app. People don’t need to rely only on the few grocery giants as they can now support small business owners near their home or workplace.</p>
                            <div className="become-a">
                                <a href="/register-driver">Become a Driver</a>
                                <a href="/register-vendor">Become a Vendor</a>
                            </div>
                            <a className="download" href="javascript;">Download App <i className="fa fa-long-arrow-alt-right"></i></a>
                        </div>
                        <div className="col-md-2">
                            
                        </div>
                    </div> 
                </div> 
	        </section>
            <section id="support">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <ul>
                                <li>
                                    <h6>Flexibility</h6>
                                    <p>Dostava allows its users to order any time of the day from their neighbourhood shops without the need to step out.  It also allows its drivers to work any time of the day.</p>
                                </li>
                                <li>
                                    <h6>24/7 Support</h6>
                                    <p>Have any questions? Need help with an order? Or want to know more about us? We are avalaible 24/7 to facilitate you through any confusion or problem faced while using Dostava.</p>
                                </li>
                                <li>
                                    <h6>Trusted Vendors</h6>
                                    <p>We do not own a warehouse to stock up goods. Each and every order will be fresh and perfect as it comes from the nearest store. This ensures quality and the reason to trust us.</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <img className="img-fluid" src="../Assets/Img/support.jpg" alt="support"></img>
                        </div>			
                    </div>
                </div>
	        </section>

            <Footer />
        </Container>
     
      
    )


}



  export default Contact;