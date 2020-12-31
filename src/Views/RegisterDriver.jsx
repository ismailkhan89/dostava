import React, {Component, useState, useEffect } from "react";
import Footer from '../Views/Footer.jsx';
import Header from '../Views/Header';
import { Query, Mutation } from "react-apollo";
 
import {
    Container,
    Row,
    Col,
	Button,Alert,
	Form, FormGroup, Label, Input, FormFeedback, FormText , Spinner
   
    // Link
} from "reactstrap";
import FontAwesome from 'react-fontawesome';
 
import gql from "graphql-tag";
import { createRiderFromWeb } from "../apollo/server";
import Accord from '../Components/Accord';

const DRIVER_REGISTER = gql`${createRiderFromWeb}`

const SECTIONS = [
	{
        head: 'What is Dostava?',
        content:'Dostava is your new Money Mate, you keep doing your normal work and at the same time you can start earning more.'
    },
	{
        head: 'How does it work?',
        content: 'Your friendly Dostava App will provide you option to pick up your Delivery order one day in advance. Yes, One Day in Advance.',
		content2:'Let’s say it is Monday today, you will get all the order details by Monday night, you need to pick up the Groceries on Tuesday and Deliver it on Tuesday.',
		content3:'When you are driving Rideshare or any other work, you can pass by the Grocery store and pick up your Dostava Delivery. Most of the time you do not need to go to the store specially.',
		content4:'You can plan your Next Day Order Pickup and Delivery in advance.',
    },
    {
        head: 'How much I need to pay to register with dostava?',
        content: 'Your friendly Dostava App is free for you to install and you can start using it and start earning.',
	},
    {
      head: 'How much I get paid for each delivery?',
	  content: 'Your friendly Dostava App will show you your delivery fees. Your delivery fees start from $9.99 for each delivery.',
	},
	{
		head: 'Where do I pick up the groceries from?',
		content: 'Your friendly Dostava app will send you address details of all your orders.',
		content2:'Your day to day grocery product pickups will be',
	  },
	  {
		head: 'When do I deliver the groceries?',
		content: 'Your order pickup and Delivery both are for next day. you pick up the order and deliver it on the same day. Plan your day ahead, how easy is that… we are here to look after you.'
	  },
	  {
		head: 'How many hours I have before I can deliver the Groceries?',
		content: 'Because you will get your Grocery Pickup list one day before, you have full day to pick up the order and delivery it on the same day as Pickup.'
	  },
	  {
		head: 'Do I need to install the Mobile application to work with Dostava?',
		content: 'Yes, your friendly Dostava Mobile application will provide you'
	  },
	  {
		head: 'Do I need ABN number to work with Dostava?',
		content: 'Yes, you require Australian Business Number (ABN) to work with Dostava.',
	  },
	  {
		head: 'Do I have to register for GST?',
		content: 'Yes, you have to be GST registered to get paid.',
	  },
	  {
		head: 'How often I get paid for the work?',
		content: 'You will get paid every……',
	  }
  ];



function RegisterDriver(props){ 

    const [firstname , setFirstName] = React.useState('')
	const [lastname , setLastname] = React.useState('')
	const [contactno , setContactno] = React.useState('')
	const [email , setEmail] = React.useState('')
	const [password , setPassword] = React.useState('')

	const [firstnameErr , setFirstnameErr] = React.useState(false)
	const [lastnameErr , setLastnameErr] = React.useState(false)
	const [contactnoErr , setContactnoErr] = React.useState(false)
	const [emailErr , setEmailErr] = React.useState(false)
	const [passwordErr , setPasswordErr] = React.useState(false)

	const [succcess , setSuccess] = React.useState('')
	const [Errors , setErrors] = React.useState('')

	
	function clearErrorField(){
		setFirstnameErr(false)
		setLastnameErr(false)
		setContactnoErr(false)
		setEmailErr(false)
		setPasswordErr(false)
	}

	function  clearFields(){
		setFirstName('')
		setLastname('')
		setContactno('')
		setEmail('')
		setPassword('')
	}

	function validate(){
		clearErrorField();
		let result = true;
		if(firstname === "" || firstname === null){
			setFirstnameErr(true)
			result = false
		}
		if(lastname === "" || lastname === null){
			setLastnameErr(true)
			result = false
		}if(contactno === "" || contactno === null){
			setContactnoErr(true)
			result = false
		}if(email === "" || email === null){
			setEmailErr(true)
			result = false
		}if(password === "" || password === null){
			setPasswordErr(true)
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
		setSuccess('Successfully Register Driver')
        clearFields()
		setTimeout(hideAlert, 7000)
    }
    
    
    return(
      
        <Container className="wrapper" fluid>
            <Header  {...props} title="Register Driver"/>
            <section id="slider" class="driver-page register-driver"> 
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <h1>Keep <strong>Driving.</strong> Keep <strong>Earning</strong></h1>
                            <br/>
                            <br/>
                            <a class="download" href="javascript:void(0)">Download App <FontAwesome name="long-arrow-right" /></a>
                            <a class="download" href="javascript:void(0)">Fill the form <FontAwesome name="long-arrow-right" /></a>
                            
                            <div class="download-app">
                                <a href="https://play.google.com/store/apps/details?id=com.dostava.driver"><img class="img-fluid" src="../Assets/Img/google-play.png" alt="google-play"></img></a>
                                <a href="https://apps.apple.com/us/app/dostava-rider/id1542024806"><img class="img-fluid" src="../Assets/Img/app-store.png" alt="app-store"></img></a>
                            </div>
                        </div>
                    </div> 
                </div> 
	        </section>

            <section id="work-with-freedom"> 
                <div class="container"> 
                    <div class="row">
                        <div class="col-md-6 first-div">
                            <h2><strong>Work</strong> With Freedom.</h2>
                            <h2><strong>Earn</strong> With Freedom.</h2>
                            <p class="pbold">Work on your own time and decide how much you make.</p>
                            <div class="row">
                                <div class="col-md-4">
                                    <img class="img-fluid" src="../Assets/Img/icon1.png" alt="icon1"></img>
                                    
                                    <h6>Get paid per
                                        delivery</h6>
                                </div>
                                <div class="col-md-4">
                                    <img class="img-fluid" src="../Assets/Img/icon2.png" alt="icon2"></img>
                                    
                                    <h6>Easy to use
                                        application</h6>
                                </div>
                                <div class="col-md-4">
                                    <img class="img-fluid" src="../Assets/Img/icon3.png" alt="icon3"></img>
                                    
                                    <h6>No 
                                        contracts</h6>
                                </div>
                                <div class="col-md-4">
                                    <img class="img-fluid" src="../Assets/Img/icon4.png" alt="icon4"></img>
                                    
                                    <h6>Your hours.
                                        Your Life</h6>
                                </div>
                                <div class="col-md-4">
                                    <img class="img-fluid" src="../Assets/Img/icon5.png" alt="icon5"></img>
                                    
                                    <h6>24/7 support
                                        for drivers</h6>
                                </div>

                            </div>
                        </div>
                        <div class="col-md-6 second-div">
                            <h2><strong>REGISTRATION </strong>DRIVER</h2>
                            <div id="successMessage"></div>
                            <div id="errorMessage"></div>
                            <form id="Reg-form">
					            <div class="form-part1">
                        <FormGroup>
							<Label>First Name</Label>
							<Input 
							onChange={(e) => setFirstName(e.target.value)} 
							// valid={true} 
							invalid={firstnameErr}
							value={firstname}
							/>
							<FormFeedback>First Name is Required</FormFeedback>
						</FormGroup>

						<FormGroup>
							<Label>Last Name</Label>
							<Input 
							onChange={(e) => setLastname(e.target.value)} 
							// valid={true} 
							invalid={lastnameErr}
							value={lastname}
							/>
							<FormFeedback>Last Name is Required</FormFeedback>
						</FormGroup>

						<FormGroup>
							<Label>Contact No</Label>
							<Input 
							onChange={(e) => setContactno(e.target.value)} 
							// valid={true} 
							invalid={contactnoErr}
							value={contactno}
							/>
							<FormFeedback>Contact No is Required</FormFeedback>
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
							<Label>Password</Label>
							<Input 
							type="password"
							onChange={(e) => setPassword(e.target.value)} 
							// valid={true} 
							invalid={passwordErr}
							value={password}
							/>
							<FormFeedback>Password is Required</FormFeedback>
						</FormGroup>

					 
						
						<br/>
                        <label>By Pressing the submit button you agree to our <a target="_blank" href="#" onClick="window.open('/privacy-policy','privacy-policy','resizable,height=260,width=370'); return false;"><strong>Privacy policy</strong></a> and <a target="_blank" href="#" onClick="window.open('/terms-condition','terms-condition','resizable,height=260,width=370'); return false;"><strong>Terms and conditions</strong></a></label><br/><br/>
						<FormGroup>
                            <Mutation
						mutation={DRIVER_REGISTER}
						onCompleted={onCompleted}
						onError={onError}>
                    {(createRiderFromWeb, { loading, error }) => {

                      return (
                        <>
                        <Button
                          className="my-4"
                          color="primary"
                          type="button"
                          onClick={() => {
                            if (validate()){
								let riderInput = {
									name: firstname,
									last_name: lastname,
									email: email,
									phone: contactno,
									password: password
								}
								createRiderFromWeb({ variables: { riderInput : riderInput } })
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
						            {/* <label>First Name</label>
                                    <input type="text" id="first-name" class="form-control"/>
                                    <label>Last Name</label>
                                    <input type="text" id="last-name" class="form-control"/>
                                    <label>Contact No</label>
                                    <input type="text" id="contact-no" class="form-control"/>
                                    <label>Email Address</label>
                                    <input type="email" id="email-address" class="form-control"/>
                                    <label>Password</label>
                                    <input type="password" id="password" class="form-control"/>
                                    <label>By Pressing the submit button you agree to our <a target="_blank" href="#" onClick="window.open('/privacy-policy','privacy-policy','resizable,height=260,width=370'); return false;"><strong>Privacy policy</strong></a> and <a target="_blank" href="#" onClick="window.open('/terms-condition','terms-condition','resizable,height=260,width=370'); return false;"><strong>Terms and conditions</strong></a></label><br/><br/>
							        <input type="submit" class="btn btn-primary" value="Submit"/> */}
                                </div>
                             </form>
				        </div>
                    </div>
                </div>
            </section>


            <section id="category"> 
                <div class="container"> 
                    <div class="row">
                        <div class="col-md-12">
                            <iframe width="100%" height="500" src="https://www.youtube.com/embed/dvNLDPyP2DU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
	        </section>

            <section id="reguirment"> 
		        <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h2><strong>Requirement</strong></h2>
                        </div>
                    </div> 
                    <div class="row"> 
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-6">
                                    <img class="img-fluid" src="../Assets/Img/icon6.png" alt="icon6"></img>
                                    <div class="inner-div">
                                        <h4>Age</h4>
                                        <p>Being a registered adult with a driver’s license is a must for working with us.</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <img class="img-fluid" src="../Assets/Img/icon7.png" alt="icon7"></img>
                                    <div class="inner-div">
                                        <h4>Smartphone</h4>
                                        <p>The smartphone must be an android or IOS which supports and functions the app.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <img class="img-fluid" src="../Assets/Img/icon8.png" alt="icon8"></img>
                                    <div class="inner-div">
                                        <h4>Vehicle</h4>
                                        <p>Your vehicle will be checked to see if its compliable for our delivery standards.</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <img class="img-fluid" src="../Assets/Img/icon9.png" alt="icon9"></img>
                                    <div class="inner-div">
                                        <h4>Screening</h4>
                                        <p>There will be a screening process for each driver in order to meet our policies and standards.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
		        </div>
	        </section>

            

           

	<Container className="faq-sectio" id="faq">
    	<Row>
			<Col lg="6" md="6">
				<h2>FREQUENTLY ASKED QUESTIONS</h2>
				{SECTIONS.length > 0 && SECTIONS.map((data, i) => <Accord head={data.head} bullentpoints={data.bullentpoints} content={data.content} content2={data.content2} content3={data.content3} content4={data.content4} key={i}/>)}
			</Col>
			<Col lg="6" md="6">
			<img class="img-fluid" src="../Assets/Img/faq.jpg" alt="faq"></img>
			</Col>
		</Row>
	</Container>
		

    <section id="download-app" class="regi-vend">
		<div class="container"> 
			<div class="row"> 
				<div class="col-md-4 col-sm-12 col-xs-12 text-center">
					<div class="single-regi">
					 	<h2>Delivering by Bicycle</h2>
					 	<img class="img-fluid" src="../Assets/Img/bicycle.png" alt="faq"></img>
					</div>
				</div>
				<div class="col-md-4 col-sm-12 col-xs-12 text-center">
					<div class="single-regi">
					 	<h2>Delivering by MotorCycle </h2>
					 	<img class="img-fluid" src="../Assets/Img/bike.png" alt="faq"></img>
					</div>
				</div>
				<div class="col-md-4 col-sm-12 col-xs-12 text-center">
					<div class="single-regi">
					 	<h2>Delivering by Car</h2>
					 	<img class="img-fluid" src="../Assets/Img/car.png" alt="faq"></img>
					</div>
				</div>
				
			</div> 
		</div> 
	</section>

			
           

            
	
            <Footer />
        </Container>
     
      
    )


}





  export default RegisterDriver;