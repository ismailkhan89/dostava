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

const VENDOR_REGISTER = gql`${createVendorWeb}`

const SECTIONS = [
	{
        head: 'Why should I choose Dostava?',
		content:'Without spending big $$$ on any online platform, you can make Dostava your new online mate and start selling.',
		content2:'Dostava charges you only $9.90/week and no other hidden charges. For a limited time, you can register for free and list products worth $300.',
		content3:'Dostava is not an additional financial burden on you, but it’s an additional financial benefit.'
    },
	{
        head: 'What is my benefit for Choosing Dostava?',
        content: 'With Dostava, you can increase your sales by simply receiving the order and making it ready for pick up. You can utilize your employees and the available manpower in their free time.',
		content2:'With Dostava, you don’t need to spend more money on developing online platforms or increase your expenses to boost sales.',
    },
    {
        head: 'Do I have to pay any registration fees or ongoing fees?',
        content: 'Normally, you only need to pay $9.99/week as a platform usage fee but, for a limited time period, we are offering FREE registration for 6 months. You can also avail product listing worth $300/- for FREE.'
	},
    {
      head: 'Do we have to be a BIG Business to join Dostava?',
	  content: 'Dostava does not distinguish between any kind of business and is open for all, whether small or big.'
	},
	{
		head: 'Do we need to hire deliver drivers?',
		content: 'Dostava organizes delivery drivers itself. All you have to do is keep the orders ready, and Dostava delivery drivers will pick them up.'
	  },
	  {
		head: 'How many hours we have before we must keep the order ready?',
		content: 'We will send you your order details one day in advance, and you will have time to pack the order one day beforehand.'
	  },
	  {
		head: 'Do we require extra staff for Dostava orders?',
		content: 'No, you don’t need extra manpower when you start working on Dostava.',
		content2:'You can ask your employees to pack the orders in their free time, and our drivers will pick them up the next day.'
	  },
	  {
		head: 'How do I upload my products online?',
		content: 'Our user-friendly online portal and expert team can guide you on how to upload your products on the Dostava platform.'
	  },
	  {
		head: 'Do I need to download the Mobile application of Dostava?',
		content: 'Yes, you have to download the Dostava app to receive the order details. Your team members can also download the Dostava app.',
	  },
	  {
		head: 'When we will get paid for our product?',
		content: 'Initially, you will get paid every week. Once your online sales go through the roof, we can pay you on a daily basis.',
	  },
	  {
		head: 'What if we do not have all the products available from the order?',
		content: 'You can simply update the order in the Dostava app. Once you update the order, your customer will get the notification too. You can also remove the product from your online platform anytime.'
	  },
	  {
		head: 'Can we change price of any product any time?',
		content: 'Yes, you can change the price of your product any time you prefer.',
	  },
	  {
		head: 'Do we have to sign up any contract with Dostava?',
		content: 'Initially, you have to fill an online form, and then Dostava will contact you and ask you about your basic information.',
	  },
	  {
		head: 'Do we require ABN to work with Dostava?',
		content: 'Yes, you require an ABN to work with Dostava, and it also has to be GST registered.',
	  },
	  {
		head: 'How GST works if our product is GST Free and we do not charge GST to the Customers?',
		content: 'You can select the GST on your product yourself. Selling your product online will not make any changes to your GST on the sales.'
	  }
  ];



function RegisterVendor(props){ 
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
	
    return(
        <Container className="wrapper" fluid>
			 <Helmet>
        <title>Dostava Vendor Registration | Signup & Start Selling</title>
        <meta name="description" content="Register your store in a few steps and start selling grocery with Dostava right away! New avenue of earning in Australia." />
      		</Helmet>

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

            <section id="work-with-freedom"> 
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
                            </div>
                        </div>
                        <div id="vendor-form" class="col-md-6 second-div">
					<h2><strong>REGISTRATION </strong>VENDOR</h2>
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
							onBlur={() => contactno === "" && setContactnoErr(true)}
							onChange={(e) => {
								if(e.target.value.length <= 11){
									setContactno(e.target.value)
									setContactnoErr(false)
								}
							}} 
							// valid={true} 
							invalid={contactnoErr}
							value={contactno}
							type={"number"}
							/>
							<FormFeedback>Contact No is Required</FormFeedback>
						</FormGroup>

						<FormGroup>
							<Label>Email Address</Label>
							<Input 
							onBlur={() => email === "" && setEmailErr(true)}
							onChange={(e) => {
								setEmail(e.target.value)
								setEmailErr(false)}} 
							// valid={true} 
							invalid={emailErr}
							value={email}
							/>
							<FormFeedback>Email Address is Required</FormFeedback>
						</FormGroup>

						<FormGroup>
							<Label>Password</Label>
							<Input 
							onBlur={() => password === "" && setPasswordErr(true)}
							type="password"
							onChange={(e) => {
								 setPassword(e.target.value)
								setPasswordErr(false)}} 
							// valid={true} 
							invalid={passwordErr}
							value={password}
							/>
							<FormFeedback>Password is Required</FormFeedback>
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
									password: password
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
		

    <section id="download-app" class="regi-vend"> 
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
	</section>

			
           

            
	
            <Footer />
        </Container>
     
      
    )


}





  export default RegisterVendor;