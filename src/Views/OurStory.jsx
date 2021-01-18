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





function PrivacyPolicy(props){ 
    return(
      
        <Container className="wrapper" fluid>
			<Helmet>
			<title>Our Story |  Dostava </title>
			<meta name="description" content="At Dostava we strictly follow the privacy policy for customer, vendor, and drivers. Your contact Information is safe with us." />
		</Helmet>
      <Header  {...props} title={"Our Story"} />
      <section id="how-it-works">
        <div class="how-it-works-heading">
                <div class="container">
                    <div class="row"> 
                        <div class="col-md-12">
                            <h2><strong> Our Story </strong></h2>
                                <hr/>
                        </div>
                    </div> 
                </div>
            </div>
            <div class="how-it-work-content terms-condition our-story">
			<div class="container-fluid">
				<div class="row">
                    <div class="col-md-6 our-story-img">
                        <img class="img-fluid" src="../Assets/Img/our-story-2.jpg" alt="how-4"></img>
                    
                    </div>
                    <div class="col-md-6 our-story-text">
                        <h2>Founded, Owned & Made In Australia, for Australians</h2>
						<p>Dostava is 100% Australian made and owned, founded to provide a convenient shopping experience to everyone living in Australia. From a small store owner who’s not doing so great after the pandemic, to the delivery riders wanting to earn some extra bucks while saving time Dostava is adding an extra stream of revenue for all the parties involved.</p>
                    </div>
                    <div class="col-md-6 our-story-text">
                        <h2>Our Mission: No.1 Australian delivery app in the world</h2>
						<p>With an all-Australian brand like Dostava, our mission is to become the number one choice for every local buyer and seller in the online market while representing ourselves under the Australian flag. We are inspired to initiate a chain of mutual support among</p>
                        <p>local business owners and local buyers while initiating numerous convenient driving gig opportunities through our online platform.</p>
                    </div>
                    <div class="col-md-6 our-story-img">
                        <img class="img-fluid" src="../Assets/Img/our-story-3.jpg" alt="how-4"></img>
                    </div>
                    <div class="col-md-6 our-story-img">
                        <img class="img-fluid" src="../Assets/Img/our-story-4.jpg" alt="how-4"></img>
                    </div>
					<div class="col-md-6 our-story-text">
						<h2>Our Vision: To make online buying and selling easier</h2>
                        <p>We believe that in order to thrive in the coming years, all businesses and individuals need to get on track with a quickly changing world. That’s why we have created an online marketplace app that benefits everyone involved in the three-way process. Establishing a hassle free selling, delivering & buying experience which can ultimately revolutionize the shopping & earning opportunities.</p>
					</div>
                    <div class="col-md-6 our-story-text">
                        <h2>Buy, Sell & Drive Safe:</h2>
                        <p>Whether you’re a buyer, seller or a driver for Dostava, we are committed to prioritize your safety above everything else. From our rigid security procedures to innovating new and technologically advanced safety standards, we are fully invested in your utmost protection.</p>
                    </div>
                    <div class="col-md-6 our-story-img">
                        <img class="img-fluid" src="../Assets/Img/our-story-1.jpg" alt="how-4"></img>
                    </div>				
                </div>			
            </div>		
            </div>
            </section>
      <Footer />


    </Container>
     
      
    )


}



  export default PrivacyPolicy;