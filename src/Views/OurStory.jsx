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
			<title>Privacy Policy |  Dostava </title>
			<meta name="description" content="At Dostava we strictly follow the privacy policy for customer, vendor, and drivers. Your contact Information is safe with us." />
		</Helmet>
      <Header  {...props} title={"Privacy Policy"} />
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
            <div class="how-it-work-content terms-condition">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<h6>Amendments</h6>
						<p>We may, at any time and at our discretion, vary this Privacy Policy by publishing the amended Privacy Policy on our website. We recommend you check our website regularly to ensure you are aware of our current Privacy Policy.
						</p>
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