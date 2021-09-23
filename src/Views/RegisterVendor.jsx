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
 
import Accord from '../Components/Accord';
import gql from "graphql-tag";
import { createVendorWeb } from "../apollo/server";
import { Helmet } from "react-helmet";
import { validateEmail } from '../constraints/emailValidate'
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
  } from 'react-places-autocomplete';

const VENDOR_REGISTER = gql`${createVendorWeb}`

const SECTIONS = [
	{
        head: 'Why should I choose Dostava?',
		content:'Dostava can provide your business with more exposure in your local area with an easy-to-use online marketplace. Let us take care of all your deliveries so its business as usual even in the unfortunate situation of COVID lockdown.',
    },
	{
        head: 'What is the benefit of signing up with Dostava?',
        content: 'With Dostava, you can increase your sales by selling to customers online. You will receive orders via your mobile App then get them ready for collection from one of our friendly drivers.',
    },
    {
        head: 'Do I have to pay any registration fees or ongoing fees?',
        content: 'Normally, you only need to pay $9.99 per week but for a limited period, we are offering FREE registration for 6 months.'
	},
    {
      head: 'Do we have to be a BIG Business to join Dostava?',
	  content: 'Dostava welcomes all kinds of businesses big, small even home businesses are welcome to join.'
	},
	{
		head: 'Do we need to hire delivery drivers?',
		content: 'Dostava will organize the delivery drivers. All you have to do is get the orders ready for pick up.'
	  },
	  {
		head: 'How do I upload my products online?',
		content: 'Our support team are here to help. Send us your stock lists or book an appointment with one of our account managers to come visit, take photos and upload your products for you.',
	  },
	  {
		head: 'Do I need to download the Mobile application?',
		content: 'Yes, you have to download the Dostava app to start receiving your orders, our App is a multi-user platform so all the team can access it.'
	  },
	  {
		head: 'How do I keep track of my orders?',
		content: 'You can keep track of all your orders from the Dostava portal or App. Dostava invoices daily, some banks may take longer than others for payments to reach your account.',
	  },
	  {
		head: 'What if I have sold out of an ordered item?',
		content: 'You can simply delete the products you no longer have in stock from the App and continue with the other items on the order. The customer will receive a notification that the order has been adjusted and the product is no longer in stock.',
	  },
	  {
		head: 'Can we change the price of any product?',
		content: 'Yes, you can change the price of your product at any time. It’s your store, you control the prices and listed products.'
	  },
	  {
		head: 'Do we have to sign a contract to become a Dostava Vendor?',
		content: 'You can sign up online via our website and read through our terms and conditions.',
	  },
	  {
		head: 'Do we require ABN to work with Dostava?',
		content: 'Yes, you require an ABN to work with Dostava and you will also need to register for GST.',
	  },
	  {
		head: 'Do we need to hire deliver drivers?',
		content: 'Dostava has their own delivery mates, all you have to do is get the orders ready, and a Dostava driver will collect and deliver to your customers doorstep.',
	  }
  ];



function RegisterVendor(props){ 
	const [storeName , setStoreName] = React.useState('')
	const [address , setAddress] = React.useState('')
	const [latLng, setlatLng] = useState('');

	const [firstname , setFirstName] = React.useState('')

	const [lastname , setLastname] = React.useState('')
	const [contactno , setContactno] = React.useState('')
	const [email , setEmail] = React.useState('')
	const [password , setPassword] = React.useState('')

	const [storeNameErr , setStoreNameErr] = React.useState(false)
	const [addressErr , setAddressErr] = React.useState(false)
	const [firstnameErr , setFirstnameErr] = React.useState(false)
	const [lastnameErr , setLastnameErr] = React.useState(false)
	const [contactnoErr , setContactnoErr] = React.useState(false)
	const [contactnoFlagErr , setContactnoFlagErr] = React.useState(false)
	const [emailErr , setEmailErr] = React.useState(false)

	const [emailFlagErr , setemailFlagErr] = React.useState(false)
	const [emailValidErr , setemailValidErr] = React.useState('')

	const [passwordErr , setPasswordErr] = React.useState(false)

	const [succcess , setSuccess] = React.useState('')
	const [Errors , setErrors] = React.useState('')
	const[iconEye,setIconEye] = React.useState('eye-slash')

	function clearErrorField(){
		setStoreNameErr(false)
		setFirstnameErr(false)
		setLastnameErr(false)
		setContactnoErr(false)
		setEmailErr(false)
		setPasswordErr(false)
		setAddressErr(false)
	}

	function  clearFields(){
		setStoreName('')
		setFirstName('')
		setLastname('')
		setContactno('')
		setEmail('')
		setPassword('')
		setAddress('')
	}

	function validate(){
		clearErrorField();
		let result = true;
		if(storeName === "" || storeName === null){
			setStoreNameErr(true)
			result = false
		}
		if(address === "" || address === null){
			setAddressErr(true)
			result = false
		}
		if(firstname === "" || firstname === null){
			setFirstnameErr(true)
			result = false
		}
		if(lastname === "" || lastname === null){
			setLastnameErr(true)
			result = false
		}if(contactno === "" || contactno === null){
			setContactnoErr(true)
			setemailFlagErr(true)
			result = false
		}if(email === "" || email === null){
			setEmailErr(true)
			result = false
		}else if(validateEmail(email) !== undefined){
			setemailFlagErr(true)
			setemailValidErr(validateEmail(email))
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
		setTimeout(hideAlert, 5000)
	}


	function onCompleted({ graphQLErrors, networkError }){
		setSuccess('Successfully Register Vendor')
        clearFields()
		//setTimeout(hideAlert, 7000)
		props.history.push({
			pathname: '/thank-you-vendor',
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
        <title>Dostava Vendor Registration | Signup & Start Selling</title>
        <meta name="description" content="Register your store in a few steps and start selling grocery with Dostava right away! New avenue of earning in Australia." />
      		</Helmet>
			  <div style={{display:'none'}}>{window.location.hash = "vendor-form"}</div>
            <Header  {...props} title="Dostava Vendor Registration | Signup & Start Selling"/>
            <section id="slider" class="driver-page register-vend"> 
                <div class="container">
                    <div class="row"> 
                        <div class="col-md-12 text-center">
                            <h1>A NEW <strong>revenue stream</strong> </h1>
                            {/* <br/>
                            <br/>
                            <a class="download" href="javascript:void(0)">Download App <FontAwesome name="long-arrow-right" /></a>
                            <a class="download" href="javascript:void(0)">Fill the form <FontAwesome name="long-arrow-right" /></a>  */}
                            <div class="download-app">
								<a href="https://play.google.com/store/apps/details?id=com.dostava.vendor"><img class="img-fluid" src="../Assets/Img/google-play.png" alt="google-play"></img></a>
                                <a href="https://apps.apple.com/us/app/dostava-vendor/id1542002438"><img class="img-fluid" src="../Assets/Img/app-store.png" alt="app-store"></img></a>
                            </div>
                        </div>
                    </div>
                </div> 
	        </section>

            <section id="work-with-freedom" className="driver-reg"> 
                <div class="container">
                    <div class="row">
                        <div class="col-md-6 first-div">
                            <h2>Increase your Sales,</h2>
                            <h2>Boost your audience, </h2>
                            <h2>Enhance your Presence</h2>
                            <p class="pbold">Without the need to worry about an online store, 
                                its marketing and all the headache that comes 
                                with it.</p>
                            <div class="row">
                                <div class="col-md-4">
                                    <img class="img-fluid" src="../Assets/Img/icon10.png" alt="icon10"></img>
                                    <h6>Be Discovered</h6>
                                </div>
                                <div class="col-md-4">
                                    <img class="img-fluid" src="../Assets/Img/icon11.png" alt="icon11"></img>
                                    <h6>New avenue
                                        of earning</h6>
                                </div>
                                <div class="col-md-4">
                                    <img class="img-fluid" src="../Assets/Img/icon12.png" alt="icon12"></img>
                                    <h6>No logistic or
                                        Marketing fee</h6>
                                </div>
                                <div class="col-md-4">
                                    <img class="img-fluid" src="../Assets/Img/icon13.png" alt="icon13"></img>
                                    <h6>Grow the list of
                                        loyal customers</h6>
                                </div>
								<div class="col-md-4" style={{paddingRight:0}}>
                                    <img class="img-fluid" src="../Assets/Img/icon14.png" alt="icon13"></img>
                                    <h6>Let us take care of your deliveries</h6>
                                </div>
                            </div>
                        </div>
                        <div id="vendor-form" class="col-md-6 second-div">
					<h2><strong>REGISTRATION </strong>VENDOR</h2>
					<div id="successMessage"></div>
					<div id="errorMessage"></div>
					<form id="Reg-form">
						<div class="form-part1">
						<FormGroup>
							<Label>Store Name</Label>
							<Input 
							onBlur={() => storeName === "" && setStoreNameErr(true)}
							onChange={(e) => {
								setStoreName(e.target.value)
								setStoreNameErr(false)}} 
							// valid={true} 
							invalid={storeNameErr}
							value={storeName}
							/>
							<FormFeedback>Store Name is Required</FormFeedback>
						</FormGroup>
						<FormGroup className="store-address">
							<Label>Store Address</Label>

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
                                // placeholder:"Enter Location here...",
                                className: "mr-sm-2 form-control",
                              })}
								//  setContactno(e.target.value)
							// valid={true} 
							invalid={addressErr}
							value={address}
							/>
							<FormFeedback>Store Address is Required</FormFeedback>

                            <div className="autocomplete-dropdown-container" 	style={{position : 'relative'}}>
                              {loading && <div></div>}
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
                      </PlacesAutocomplete>
						</FormGroup>

					 	<FormGroup>
							<Label>First Name</Label>
							<Input 
							onFocus={() => address === "" && setAddressErr(true)}
							onBlur={() => firstname === "" && setFirstnameErr(true)}
							onChange={(e) => {
								setFirstName(e.target.value)
								setFirstnameErr(false)}} 
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
							onBlur={
								() => {
								contactno === "" && setContactnoFlagErr(true) && setContactnoErr(true)
								if(contactno.length <= 8 || contactno.length >= 12 ){
									setContactnoFlagErr(true)
								}
							}
							}
							onChange={(e) => {
								if(e.target.value.length <= 11){
									setContactno(e.target.value)
									setContactnoErr(false)
									setContactnoFlagErr(false)
								}
							}} 
							// valid={true} 
							invalid={contactnoErr || contactnoFlagErr}
							value={contactno}
							type={"number"}
							/>

							{contactnoErr &&  <FormFeedback>Contact No is Required</FormFeedback>}
							{contactnoFlagErr && <FormFeedback>Invalid Contact Number</FormFeedback>}
						</FormGroup>

						<FormGroup>
							<Label>Email Address</Label>
							<Input 
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
							onBlur={() => password === "" && setPasswordErr(true)}
							// type="password"
							type={iconEye === 'eye' ? 'text' : 'password' }
							onChange={(e) => {
								 setPassword(e.target.value)
								 setPasswordErr(false)}} 
							// valid={true} 
							invalid={passwordErr}
							value={password}
							/>
							<FormFeedback>Create Password is Required</FormFeedback>

							<FontAwesome 
								style={{position : 'absolute'}}
								onClick={() => onChangeIcon()}
								name= {iconEye} size={20} />
						</FormGroup>

					 
						
						<br/>
						<label>By Pressing the submit button you agree to our <a target="_blank" href="/privacy-policy"><strong>Privacy policy</strong></a> and <a target="_blank" href="/terms-of-use"><strong>Terms and conditions</strong></a></label><br/><br/>
					
						<FormGroup><Mutation
						mutation={VENDOR_REGISTER}
						onCompleted={onCompleted}
						onError={onError}>
                    {(createVendorWeb, { loading, error }) => {

                      return (
                        <>
                        <Button
                          className="my-4"
                          color="primary"
                          type="button"
                          onClick={() => {
                            if (validate()){
								let userInput = {
									name: firstname,
									last_name: lastname,
									email: email,
									phone: contactno,
									password: password,
									business_name : storeName,
									physical_address : address,
								    lat : latLng.lat.toString(),
									long : latLng.lng.toString(),
								}
								createVendorWeb({ variables: { userInput : userInput } })
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
						
						{/* <Button color="primary" onClick={async e => {}} >Submit</Button> */}
					    {/* <input type="submit" class="btn btn-primary" value="Submit"/>	 */}
                        </div>
                        </form>
				</div>
                    </div> 
                </div> 
	        </section>

            <section id="reguirment" class="video-sec"> 

			<div class="row"> 
				<div class="col-md-12 text-center">
					<h2>Why choose <strong>Dostava?</strong></h2>
					<p class="shoosep">Unlike the giant super stores out there, your business does not have a vast online infrastructure that can support the lockdowns through ecommerce and online shopping. With social distancing to be maintained for the coming years, you need an alternative revenue stream to support the impact you are facing with walk in customers.</p>
				</div>
			</div>
		<div class="container video-section"> 
			<div class="row"> 
				<div class="col-md-12">
					
					<iframe width="100%" height="500" src="https://www.youtube.com/embed/9g3KZ4xSWWU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
			<img class="img-fluid" src="../Assets/Img/vendor2.jpg" alt="faq"></img>
			</Col>
		</Row>
	</Container>
		

    {/* <section id="download-app" class="regi-vend"> 
		<div class="container">
			<div class="row"> 
				<div class="col-md-4 col-sm-12 col-xs-12 text-center">
					<div class="single-regi">
					 	<h2>Store</h2>
					 	<img class="img-fluid" src="../Assets/Img/store.png" alt="faq"></img>
					</div>
				</div>
				<div class="col-md-4 col-sm-12 col-xs-12 text-center">
					<div class="single-regi">
					 	<h2>Supermarket </h2>
					 	<img class="img-fluid" src="../Assets/Img/supermarket.png" alt="faq"></img>
					</div>
				</div>
				<div class="col-md-4 col-sm-12 col-xs-12 text-center">
					<div class="single-regi">
					 	<h2>Warehouse</h2>
					 	<img class="img-fluid" src="../Assets/Img/warehouse.png" alt="faq"></img>
					</div>
				</div>
			</div> 
		</div> 
	</section> */}

			
           

            
	
            <Footer />
        </Container>
     
      
    )


}





  export default RegisterVendor;