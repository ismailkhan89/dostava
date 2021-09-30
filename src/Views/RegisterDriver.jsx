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
import { Helmet } from "react-helmet";
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
  } from 'react-places-autocomplete';

import { validateEmail } from '../constraints/emailValidate';
const DRIVER_REGISTER = gql`${createRiderFromWeb}`

const SECTIONS = [
	{
        head: 'What is Dostava?',
        content:'Dostava is a 100% Australian owned online platform based in the heart of Perth, that allows small businesses to deliver directly to customer living in their area through a location based app. It is the ultimate solution to convenient shopping and effective business.'
    },
	{
        head: 'How does it work?',
        content: 'Dostava works through an easy-to-use application available for your android and iOs devices. Through the app or the Dostava website, shopping is as easy as tapping on your mobile screen. Place an order by navigating through a number of stores available near you and get your goods delivered to your doorstep.',
	// 	content2:'When you drive to Rideshare or any other work, you can pass by the Grocery store and pick up your Dostava delivery. Most of the time, you don’t need to go to the store especially, to pick up the order.',
	// 	content3:'With Dostava, work with freedom and plan your next day order pickup and delivery in advance.',
	},
	{
		head : 'How is Dostava different from other driving gigs?',
		content : 'Do you already have multiple driving gigs? If so, Dostava will multiply your gig earnings without any extra efforts and time.',
		content2 : 'You’ll receive a delivery from a store near you and you’ll be dropping it off someplace which is only 5 - 10 mins away.  Earning $9.99 on every short delivery.'
	},
    {
        head: 'How much do I need to pay to register with dostava?',
        content: 'Your friendly Dostava App is free for you to install and you can start using it and start earning.',
	},
    {
      head: 'How much do I get paid for each delivery?',
	  content: 'Your friendly Dostava App will show you exactly what you are making. Your payments start from $9.99 per delivery.',
	},
	{
		head: 'Where do I pick up the the orders from?',
		content: 'Your friendly Dostava app will send you complete details of the pickup and drop off location and what you will earn.',
	  },
	  {
		head: 'When do I deliver the orders?',
		content: 'After you accept the order you can conveniently deliver it to a nearby address within one hour.'
	  },
	  {
		head: 'How often do I get paid for the work?',
		content: 'Dostava provides you with the luxury of getting paid per order. The Dostava mobile application will send complete cash details every time an order is placed or a transaction has been made.',
	  },
	//   {
	// 	head: 'How many hours I have before I can deliver the Groceries?',
	// 	content: 'You have a full day in advance to pick up the order and deliver it on the same day.'
	//   },
	  {
		head: 'Do I need to install the Mobile application to work with Dostava?',
		content: 'Yes, you need to install the Dostava mobile app and start earning instantly.'
	  },
	  {
		head: 'Do I need ABN number to work with Dostava?',
		content: 'Yes, you require an Australian Business Number (ABN) to work with Dostava.',
	  },
	  {
		head: 'Do I have to register for GST?',
		content: 'No drivers do not need to register for GST if they earn under 75k.',
	  },
	  {
		head: 'Do we have to sign up any contract with Dostava?',
		content: 'If you are looking to partner up as a delivery mate, Dostava offers you complete freedom. It is a no-contract, get paid as you go job. All you need is a smartphone and a vehicle and you’re set to go! Register now and start earning extra money.',
	  }
	  
  ];



function RegisterDriver(props){ 

    const [firstname , setFirstName] = React.useState('')
	const [lastname , setLastname] = React.useState('')
	const [contactno , setContactno] = React.useState('')
	const [postalCode , setpostalCode] = React.useState('')

	const [address , setAddress] = React.useState('')

	const [email , setEmail] = React.useState('')
	const [password , setPassword] = React.useState('')

	const [firstnameErr , setFirstnameErr] = React.useState(false)
	const [lastnameErr , setLastnameErr] = React.useState(false)
	const [contactnoErr , setContactnoErr] = React.useState(false)
	const [contactnoFlagErr , setContactnoFlagErr] = React.useState(false)
	const [postalFlagErr , setpostalFlagErr] = React.useState(false)

	const [addressErr , setAddressErr] = React.useState(false)

	const [postalErr , setPostalErr] = React.useState(false)

	// const [contactnoErrNum , setContactnoErrNum] = React.useState('')

	const [emailErr , setEmailErr] = React.useState(false)
	const [emailFlagErr , setemailFlagErr] = React.useState(false)
	const [emailValidErr , setemailValidErr] = React.useState('')
	const [passwordErr , setPasswordErr] = React.useState(false)

	const [succcess , setSuccess] = React.useState('')
	const [Errors , setErrors] = React.useState('')
	const[iconEye,setIconEye] = React.useState('eye-slash')
	const [latLng, setlatLng] = useState('');

	function clearErrorField(){
		setFirstnameErr(false)
		setLastnameErr(false)
		setContactnoErr(false)
		setEmailErr(false)
		setPasswordErr(false)
		// setAddressErr(false)
		setPostalErr(false)

	}

	function  clearFields(){
		setFirstName('')
		setLastname('')
		setContactno('')
		setEmail('')
		setPassword('')
		// setAddress('')
		setpostalCode('')
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
			setContactnoFlagErr(false)
			result = false
		}
		else if(contactno.length <= 8 || contactno.length >= 12 ){
			setContactnoErr(false)
			setContactnoFlagErr(true)
			result = false
		}if(email === "" || email === null){
			setEmailErr(true)
			result = false
		}
		else if(validateEmail(email) !== undefined){
			setemailFlagErr(true)
			setemailValidErr(validateEmail(email))
			result = false
		}
		if(password === "" || password === null){
			setPasswordErr(true)
			result = false
		}
		if(postalCode === "" || postalCode === null){
			setPostalErr(true)
			setpostalFlagErr(false)
			result = false
		}
		else if(postalCode.length <= 3 || postalCode.length > 6){
			setPostalErr(false)
			setpostalFlagErr(true)
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
		//setTimeout(hideAlert, 7000)
		props.history.push({
			pathname: '/thank-you-driver',
		  });
    }
    
	
	function onChangeIcon(){
		if(iconEye === 'eye'){
		  setIconEye('eye-slash')
		} else{
		  setIconEye('eye')
		}
	}

	const searchOptions = {
		componentRestrictions: { country: ['aus'] },
	  }

	function handleSelect(address){
	setAddress(address)
	geocodeByAddress(address)
		.then(results => getLatLng(results[0]))
		.then(latLng => {
		setlatLng(latLng)
		// localStorage.removeItem('location');
		// console.log('Success', latLng)
		})
		.catch(error => console.error('Error', error));
	};

    return(

        <Container className="wrapper" fluid>
		

			<Helmet>
        <title>Deliver with Dostava | Become a Delivery Partner</title>
        <meta name="description" content="Become Dostava delivery partner. Register now to earn money making deliveries with us. Work on your own time and decide how much you make." />
      		</Helmet>
			  <div style={{display:'none'}}>{window.location.hash = "driver-form"}</div>
		    <Header  {...props} title="Register Driver"/>
            <section id="slider" class="driver-page register-driver"> 
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <h1>Keep <strong>Driving.</strong> Keep <strong>Earning</strong></h1>
                            {/* <br/>
                            <br/>
                            <a class="download" href="javascript:void(0)">Download App <FontAwesome name="long-arrow-right" /></a>
                            <a class="download" href="javascript:void(0)">Fill the form <FontAwesome name="long-arrow-right" /></a>
                             */}
                            <div class="download-app">
                                <a href="https://play.google.com/store/apps/details?id=com.dostava.driver"><img class="img-fluid" src="../Assets/Img/google-play.png" alt="google-play"></img></a>
                                <a href="https://apps.apple.com/us/app/dostava-rider/id1542024806"><img class="img-fluid" src="../Assets/Img/app-store.png" alt="app-store"></img></a>
                            </div>
                        </div>
                    </div> 
                </div> 
	        </section>

            <section id="work-with-freedom" className="driver-reg"> 
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
						{/* <span id='jump_to_this_location'></span> */}
                        <div class="col-md-6 second-div" id="driver-form">
                            <h2><strong>REGISTRATION </strong>DRIVER</h2>
                            <div id="successMessage"></div>
                            <div id="errorMessage"></div>
                            <form id="Reg-form">
					            <div class="form-part1">
                        <FormGroup>
							<Label>First Name</Label>
							<Input 
							onBlur={() => firstname === "" && setFirstnameErr(true)}
							onChange={(e) => {
								setFirstName(e.target.value)
								setFirstnameErr(false)
							}} 
							// valid={true} 
							invalid={firstnameErr}
							value={firstname}
							/>
							<FormFeedback>First Name is Required</FormFeedback>
						</FormGroup>

						<FormGroup>
							<Label>Last Name</Label>
							<Input 
							onBlur={() => lastname === "" && setLastnameErr(true)}
							onChange={(e) =>{
								 setLastname(e.target.value)
								 setLastnameErr(false)
								}} 
							// valid={true} 
							invalid={lastnameErr}
							value={lastname}
							/>
							<FormFeedback>Last Name is Required</FormFeedback>
						</FormGroup>

						<FormGroup>
							<Label>Contact No</Label>
							<Input
							className="no-spinner" 
							onBlur={() => // contactno === "" && setContactnoErr(true)
							{
								contactno === "" && setContactnoFlagErr(true) && setContactnoErr(true)
								if(contactno.length <= 8 || contactno.length >= 12 ){
									setContactnoFlagErr(true)
									setContactnoErr(false)
								}
							}}
							onChange={(e) =>{
								if(e.target.value.length <= 11){
									setContactno(e.target.value)
									setContactnoErr(false)
									setContactnoFlagErr(false)
								}
							}}
								//  setContactno(e.target.value)
							// valid={true} 
							invalid={contactnoErr  || contactnoFlagErr}
							value={contactno}
							type={"number"}
							max
							/>
							{contactnoErr &&  <FormFeedback>Contact No is Required</FormFeedback>}
							{/* <FormFeedback>Contact No is Required</FormFeedback> */}
							{contactnoFlagErr && <FormFeedback>Invalid Contact Number</FormFeedback>}
						</FormGroup>

						<FormGroup>
						{/*	<Label>Address</Label>

					 <PlacesAutocomplete
						searchOptions={searchOptions}
						value={address}
						onChange={(e) => {setAddress(e)
							setAddressErr(false)
						}}
						onSelect={handleSelect}
                      >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                          <>
						<Input 
							 onBlur={() => address === "" && setAddressErr(true)}
							 {...getInputProps({
                                // placeholder: 'Search Places ...',
                                // placeholder:"Enter delivery address here...",
                                className: "mr-sm-2 form-control",
                              })}
								//  setContactno(e.target.value)
							// valid={true} 
							invalid={addressErr}
							value={address}
							/>
							<FormFeedback>Address is Required</FormFeedback>

                            <div className="autocomplete-dropdown-container" 	style={{position : 'relative'}}>
                              {loading && <div>Loading...</div>}
                              {suggestions.map((suggestion,index) => {
                                let className = suggestion.active
                                  ? 'suggestion-item--active'
                                  : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
								  : { backgroundColor: '#ffffff', cursor: 'pointer' };
								  
								  className += "test"
                                return (
                                  <div
                                  key={index}
                                    {...getSuggestionItemProps(suggestion, {
                                      className,
                                      style,
                                    })}>
                                    <span>{suggestion.description}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        )}
                      </PlacesAutocomplete> */}

							<Label>Postal Code</Label>
							<Input
							className="no-spinner" 
							onBlur={() => 
							{
								postalCode === "" &&  setpostalFlagErr(true) && setPostalErr(true)
								if(postalCode.length <= 3 || postalCode.length >= 6 ){
									setpostalFlagErr(true) 
									setPostalErr(false)
								}
							}}
							onChange={(e) =>{
								if(e.target.value.length <= 5){
									setpostalCode(e.target.value)
									setPostalErr(false)
									setpostalFlagErr(false)
								}
							}}
							invalid={postalErr  || postalFlagErr}
							value={postalCode}
							type={"number"}
							max
							/>
							{postalErr &&  <FormFeedback>Postal Code is Required</FormFeedback>}
							{postalFlagErr && <FormFeedback>Invalid Postal Code</FormFeedback>}
						</FormGroup>


						<FormGroup>
							<Label>Email Address</Label>
							<Input 
							// onFocus={() => postalCode === "" && setPostalErr(true)}
							onBlur={() => {
								email === "" && setEmailErr(true)
								if(email !== ""){
									if(validateEmail(email) !== undefined){
										setemailFlagErr(true)
										setemailValidErr(validateEmail(email)) 
									}
								}
							}}
							onChange={(e) => {
								setEmail(e.target.value.toLowerCase())
								setEmailErr(false)
								setemailFlagErr(false) 
							    setemailValidErr('')
							}} 
							// valid={true} 
							invalid={emailErr || emailFlagErr}
							value={email}
							/>
							{emailErr && <FormFeedback>Email Address is Required</FormFeedback>}
							{emailFlagErr && <FormFeedback>{emailValidErr}</FormFeedback>}
						</FormGroup>

						<FormGroup className="password-checker">
							<Label>Create Password</Label>
							<Input 
							type={iconEye === 'eye' ? 'text' : 'password' }
							onChange={(e) => {
								setPassword(e.target.value)
								setPasswordErr(false)
							}} 
							// valid={true} 
							invalid={passwordErr}
							value={password}
							onBlur={() => password === "" && setPasswordErr(true)}
							/>
							<FormFeedback>Create Password is Required</FormFeedback>
							<FontAwesome 
								style={{position : 'absolute'}}
								onClick={() => onChangeIcon()}
								name= {iconEye} size={20} />
						</FormGroup>

					 
						
						<br/>
                        <label>By Pressing the submit button you agree to our <a target="_blank" href="/privacy-policy"><strong>Privacy policy</strong></a> and <a target="_blank" href="/terms-of-use"><strong>Terms and conditions</strong></a></label><br/><br/>
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
									password: password,
									postal_code : postalCode
									// temp_address : address,
									// lat : latLng.lat.toString(),
									// long : latLng.lng.toString(),
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
                            <h2><strong>Requirements</strong></h2>
                        </div>
                    </div> 
                    <div class="row"> 
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-6">
                                    <img class="img-fluid" src="../Assets/Img/age-icon.png" alt="icon6"></img>
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
                                {/* <div class="col-md-6">
                                    <img class="img-fluid" src="../Assets/Img/icon8.png" alt="icon8"></img>
                                    <div class="inner-div">
                                        <h4>Vehicle</h4>
                                        <p>Your vehicle will be checked to see if its compliable for our delivery standards.</p>
                                    </div>
                                </div> */}
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