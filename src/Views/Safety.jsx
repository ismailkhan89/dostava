import React, {Component, useState, useEffect } from "react";
import Footer from '../Views/Footer.jsx';
import Header from '../Views/Header';



import ReactDOM from 'react-dom';



import { server_url } from  "../config/config";
import {
    
    Container,
   
    // Link
} from "reactstrap";
import FontAwesome from 'react-fontawesome';
import { Form, FormControl } from 'react-bootstrap';
import {Link, useRouteMatch, useParams } from 'react-router-dom';




import { Redirect , useHistory  } from "react-router-dom";
import { Helmet } from "react-helmet";





function Safety(props){ 
    return(
      
        <Container className="wrapper" fluid>
			<Helmet>
			<title>Safety |  Dostava </title>
			<meta name="description" content="" />
		</Helmet>
      <Header  {...props} title={"Safety"} />
      <section id="how-it-works">
        <div class="how-it-works-heading">
                <div class="container">
                    <div class="row"> 
                        <div class="col-md-12">
                            <h2><strong> Safety </strong></h2>
                                <hr/>
                        </div>
                    </div> 
                </div>
            </div>
            <div class="how-it-work-content terms-condition">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<h6>Your Safety is Our Pledge</h6>
						<p>We believe in effective buying and selling with complete three-way security ensured. That’s why we have built a team of persistent workers that work tirelessly to innovate and examine relentless safety policies, so you’re delivered with the safest user experience every time you choose us.</p>
                        <h6>Enabling Secure Shopping:</h6>
                        <p>You deserve to have your convenient online grocery shopping done without the thought of being unsafe or exposed to any kinds of external threats. With our strong verification policies, you get to know everything you need to know about who you’re ordering from and who is going to get it to your doorstep.</p>
                        <p>Furthermore, we are committed to keeping a stronghold on customer interactions with our 24/7 customer support to know what you need, what we lack, and what needs improvement. </p>
                        <h6>Enabling Secure Business:</h6>
                        <p>We’re committed to present flawless terms of security for you so the flourish of your online business always remains uninterrupted. Staying true to our pledge, we have constructed a series of vendor friendly policies with our assistance on standby to guide you towards working better and effectively every day. Our designated <strong>Dostava Vendor</strong> application was also designed with advanced technological features just for your convenience so you keep track and adapt to what’s right for your business.</p>
                        <h6>Enabling Secure Driving:</h6>
                        <p>We are moved to prioritize your safety providing you with state of the art safety procedures at every single delivery you take on.</p>
                        <p>We believe driving or riding is a delicate affair and must not be rushed. That’s why we strive to make your delivery easy and convenient without reducing it to limited time frames.</p>
                        <p>We have a dedicated customer support department just for your security enabling you with the option of emergency assistance, so help arrives whenever you require it.</p>
                    </div>				
                </div>			
            </div>		
            </div>
            </section>
      <Footer />


    </Container>
     
      
    )


}



  export default Safety;