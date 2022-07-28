import React, {Component, useState, useEffect, useRef } from "react";
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

	const [AcceptPP, setAcceptPP] = useState(false)
	const [CheckedAccept, setCheckedAccept] = useState(false)

	const formRef = useRef(null)

	useEffect(() => {
		if(formRef.current){
			// console.log('babuji', formRef.current)
			// formRef.current.focus();
			window.location.hash = "driver-form"
		}
	},[formRef])

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
		if(!AcceptPP){
			alert('Please Accept The Privacy Policy')
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

	const listInnerRef = useRef();
	const onScroll = () => {
		console.log('babuji agaye', 'babuji agaye')
	   if (listInnerRef.current) {
		 const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
		 if (scrollTop + clientHeight === scrollHeight) {
			setCheckedAccept(!CheckedAccept)
		 }
	   }
	 };

    return(

        <Container className="wrapper" fluid>
		

			<Helmet>
        <title>Deliver with Dostava | Become a Delivery Partner</title>
        <meta name="description" content="Become Dostava delivery partner. Register now to earn money making deliveries with us. Work on your own time and decide how much you make." />
      		</Helmet>
			  {/* <div style={{display:'none'}}>{window.location.hash = "driver-form"}</div> */}
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
                            <form id="Reg-form" ref={formRef}>
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


	<div className="form-group privacy-check d-none" 
		// onScroll={onScroll}
		// ref={listInnerRef}
	>
		<div class="how-it-work-content terms-condition">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<p>In order to provide our services to you, we collect personal information from you. This includes contact information as well as information about how you use our platform and services.</p>
						<p>We know that protecting your personal information is important. This Privacy Policy sets out our commitment to protecting the privacy of personal information provided to us, or otherwise collected by us, offline or online, including through our services, website and mobile application (<strong>Services</strong>). In this Privacy Policy <strong>we, us</strong> or <strong>our</strong> means Dostava Australia Pty Ltd ABN 52 640 411 098.</p>
						<h6>Personal information</h6>
						<p><strong>Personal information</strong>The types of personal information we may collect about you include:</p>
						<ul class="decimal">
						<li>your name;</li>
						<li>if you are a representative of a business using our Services, your job title, and business contact details including your work email address;</li>
						<li>your contact details, including email address, mailing address, street address and/or telephone number; </li>
						<li>your qualifications;</li>
						<li>if you are a driver using our Services, a copy of your driver’s licence;</li>		
						<li>if you are a driver using our Services, tracked location while you are performing the delivery services; </li>
						<li>your age and/or date of birth;</li>
						<li>your credit card or payment details (through our third party payment processor, Stripe);</li>							
						<li>your preferences and/or opinions;</li>							
						<li>information you provide to us through customer surveys;</li>
						<li>details of products and services we have provided to you and/or that you have enquired about, and our response to you;</li>	
						<li>your browser session and geo-location data, device and network information, statistics on page views and sessions, acquisition sources, search queries and/or browsing behaviour;</li>
						<li>information about your access and use of our Services, including through the use of Internet cookies, your communications with our online Services, the type of browser you are using, the type of operating system you are using and the domain name of your Internet service provider;</li>
						<li>additional personal information that you provide to us, directly or indirectly, through your use of our Services, associated applications, associated social media platforms and/or accounts from which you permit us to collect information; and</li>
						<li>any other personal information requested by us and/or provided by you or a third party.</li>
						</ul>
						<p>We may collect these types of personal information directly from you or from third parties.</p>
						<h6>Collection and use of personal information</h6>
						<p>We may collect, hold, use and disclose personal information for the following purposes:</p>
						<ul>
							<li>to enable you to access and use our Services, associated applications and associated social media platforms;</li>
							<li>to contact and communicate with you;</li>
							<li>for internal record keeping, administrative purposes, invoicing and billing purposes;</li>
							<li>for analytics, market research and business development, including to operate and improve our Services, associated applications and associated social media platforms;</li>
							<li>to run promotions, competitions and/or offer additional benefits to you; </li>
							<li>for advertising and marketing, including to send you promotional information about our products and services and information that we consider may be of interest to you;</li>
							<li>to comply with our legal obligations and resolve any disputes that we may have; and</li>
							<li>if you have applied for employment with us; to consider your employment application.</li>
						</ul>
						<h6>Disclosure of personal information to third parties</h6>
						<p>We may disclose personal information to:</p>
						<ul>
							<li>third party service providers for the purpose of enabling them to provide their services, including (without limitation) IT service providers, data storage, web-hosting and server providers, debt collectors, maintenance or problem-solving providers, marketing or advertising providers, professional advisors and payment systems operators;</li>
							<li>our employees, contractors and/or related entities;</li>
							<li>our existing or potential agents or business partners;</li>
							<li>sponsors or promoters of any promotions or competition we run;</li>
							<li>anyone to whom our business or assets (or any part of them) are, or may (in good faith) be, transferred;</li>
							<li>credit reporting agencies, courts, tribunals and regulatory authorities, in the event you fail to pay for goods or services we have provided to you;</li>
							<li>courts, tribunals, regulatory authorities and law enforcement officers, as required by law, in connection with any actual or prospective legal proceedings, or in order to establish, exercise or defend our legal rights; </li>
							<li>third parties, including agents or sub-contractors, who assist us in providing information, products, services or direct marketing to you. This may include parties located, or that store data, outside of Australia;</li>
							<li>third parties to collect and process data, such as Google Analytics.</li>
						</ul>
						<p>By providing us with personal information, you consent to the disclosure of your information outside of Australia and acknowledge that we are not required to ensure that overseas recipients handle that personal information in compliance with Australian Privacy law. You acknowledge that some overseas third parties may not be regulated by the Privacy Act and the Australian Privacy Principles in the Privacy Act and if any third party engages in any act or practice that contravenes the Australian Privacy Principles, it would not be accountable under the Privacy Act and you will not be able to seek redress under the Privacy Act.</p>
						<h6>How we treat personal information that is also sensitive information</h6>
						<p>Sensitive information is a sub-set of personal information that is given a higher level of protection under the Australian Privacy Principles. <strong>Sensitive information</strong> means information relating to your racial or ethnic origin, political opinions, religion, trade union or other professional associations or memberships, philosophical beliefs, sexual orientation, sexual practices or sex life, criminal records, health information or biometric information.</p>
						<p>We do not currently collect sensitive information and we will not collect sensitive information about you without first obtaining your consent.</p>
						<p>Provided you consent, your sensitive information would only be used and disclosed for purposes relating to the primary purpose for which the sensitive information was collected.</p>
						<p>Sensitive information may also be used or disclosed if required or authorised by law.</p>
						<h6>Your rights and controlling your personal information</h6>
						<p><strong>Your choice</strong>: Please read this Privacy Policy carefully. If you provide personal information to us, you understand we will collect, hold, use and disclose your personal information in accordance with this Privacy Policy. You do not have to provide personal information to us, however, if you do not, it may affect your use of our Services.</p>
						<p><strong>Information from third parties</strong>: If we receive personal information about you from a third party, we will protect it as set out in this Privacy Policy. If you are a third party providing personal information about somebody else, you represent and warrant that you have such person’s consent to provide the personal information to us.</p>
						<p><strong>Restrict and unsubscribe</strong>: To object to processing for direct marketing/unsubscribe from our email database or opt-out of communications (including marketing communications), please contact us using the details below or opt-out using the opt-out facilities provided in the communication.</p>
						<p><strong>Correction</strong>: If you believe that any information we hold about you is inaccurate, out of date, incomplete, irrelevant or misleading, please contact us using the details below. We will take reasonable steps to promptly correct any information found to be inaccurate, incomplete, misleading or out of date.</p>
						<p><strong>Complaints</strong>: If you wish to make a complaint, please contact us using the details below and provide us with full details of the complaint. We will promptly investigate your complaint and respond to you, in writing, setting out the outcome of our investigation and the steps we will take in response to your complaint. You also have the right to contact the relevant authority in the country in which you are based.</p>
						<h6>Storage and security</h6>
						<p>We are committed to ensuring that the personal information we collect is secure. In order to prevent unauthorised access or disclosure, we have put in place suitable physical, electronic and managerial procedures, to safeguard and secure personal information and protect it from misuse, interference, loss and unauthorised access, modification and disclosure.</p>
						<p>We cannot guarantee the security of any information that is transmitted to or by us over the Internet. The transmission and exchange of information is carried out at your own risk. Although we take measures to safeguard against unauthorised disclosures of information, we cannot assure you that the personal information we collect will not be disclosed in a manner that is inconsistent with this Privacy Policy.</p>
						<h6>Cookies and web beacons</h6>
						<p>We may use cookies on our online Services from time to time. Cookies are text files placed in your computer's browser to store your preferences. Cookies, by themselves, do not tell us your email address or other personally identifiable information. However, they do allow third parties, such as Google and Facebook, to cause our advertisements to appear on your social media and online media feeds as part of our retargeting campaigns. If and when you choose to provide our online Services with personal information, this information may be linked to the data stored in the cookie.</p>
						<p>You can block cookies by activating the setting on your browser that allows you to refuse the setting of all or some cookies. However, if you use your browser settings to block all cookies (including essential cookies) you may not be able to access all or parts of our online Services.</p>
						<p>We may use web beacons on our online Services from time to time. Web beacons (also known as Clear GIFs) are small pieces of code placed on a web page to monitor the visitor’s behaviour and collect data about the visitor’s viewing of a web page. For example, web beacons can be used to count the users who visit a web page or to deliver a cookie to the browser of a visitor viewing that page.</p>
						<p>We may use Google Analytics to collect and process data. To find out how Google uses data when you use third party websites or applications, please see www.google.com/policies/privacy/partners/ or any other URL Google may use from time to time.</p>
						<h6>Links to other websites</h6>
						<p>Our Services may contain links to other websites. We do not have any control over those websites and we are not responsible for the protection and privacy of any personal information which you provide whilst visiting those websites. Those websites are not governed by this Privacy Policy.</p>
						<h6>Amendments</h6>
						<p>We may, at any time and at our discretion, vary this Privacy Policy by publishing the amended Privacy Policy on our website. We recommend you check our website regularly to ensure you are aware of our current Privacy Policy.
						</p>
						<p><strong>For any questions or notices, please contact our Privacy Officer at:</strong></p>
						<p>Dostava Australia Pty Ltd ABN 52 640 411 098</p>
						<p>Email: support@dostava.com.au </p>
						<p>Last update: 22 June 2020</p>
						<p>&copy; LegalVision ILP Pty Ltd </p>
					</div>				
                </div>			
            </div>		
        </div>
    </div>

					 
						<div className="form-group privacy-checkbox-new">
							<label>
							<input type="checkbox" onChange={()=> setAcceptPP(!AcceptPP)} 
							// disabled={!CheckedAccept}
							></input>I accept the <a href="/terms-of-use" target="_blank">terms and
							conditions</a>, including the <a href="/privacy-policy" target="_blank">Privacy Policy</a>
							</label>
						</div>

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