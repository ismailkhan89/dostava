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






function Contact(props){ 
    return(
      
        <Container className="wrapper" fluid>
            <Header  {...props} title={"Contact"} />
            <section id="how-it-works">
                <div class="how-it-works-heading">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <h2><strong>Contact</strong> Us</h2>
                                <hr/>
                            </div>
                        </div> 
                    </div>
                </div>
            </section>
            <section id="work-with-freedom">
		        <div class="container">
			        <div class="row"> 
				        <div class="col-md-6 first-div contact-infor">
					        <h2><strong>Contact</strong> Information.</h2>
					        <p class="pbold">We welcome you to contact us using the below details or visit our <a href="/faqs">FAQs</a>.</p>
                            <p class="pbold">Email: <a href="#">info@dostava.com.au</a></p>
                            <p class="pbold">Address: Perth, Australia</p>
                            <div class="row">
                                
                                

                            </div>
				        </div>
                        <div class="col-md-6 second-div">
                            <h2><strong>Contact  </strong>Form</h2>
                            <div id="successMessage"></div>
                            <div id="errorMessage"></div>
                            <form id="Reg-form">
                                <div class="form-part1">
                                    <label>Name</label>
                                    <input type="text" id="name" class="form-control" required/>
                                    <label>Email Address</label>
                                    <input type="email" id="email" class="form-control" required/>
                                    <label>Subject</label>
                                    <input type="text" id="subject" class="form-control" required/>
                                    <label>Message</label>
                                    <textarea class="form-control" id="message" required></textarea>
                                    <br/>
                                    <input type="submit" class="btn btn-primary next" value="Submit"/>
                                </div>
                            </form>
                        </div>
			        </div> 
		        </div> 
	        </section>
            <section id="download-app"> 
                <div class="container"> 
                    <div class="row"> 
                        <div class="col-md-3">
                            <img class="img-fluid" src="../Assets/Img/app-screen.png" alt="app-screen"></img>
                        </div>
                        <div class="col-md-7">
                            <h2>Download our <strong>application</strong></h2>
                            <hr/>
                            <p>A location-based online marketplace that connects people with small businesses and neighbourhood stores in their locality. Dostava has its fleet of drivers who will be available for delivery within minutes like every other ride-sharing app. People don’t need to rely only on the few grocery giants as they can now support small business owners near their home or workplace.</p>
                            <div class="become-a">
                                <a href="/register-driver">Become a Driver</a>
                                <a href="/register-vendor">Become a Vendor</a>
                            </div>
                            <a class="download" href="javascript:void(0)">Download App <i class="fa fa-long-arrow-alt-right"></i></a>
                        </div>
                        <div class="col-md-2">
                            
                        </div>
                    </div> 
                </div> 
	        </section>
            <section id="support">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
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
                        <div class="col-md-6">
                            <img class="img-fluid" src="../Assets/Img/support.jpg" alt="support"></img>
                        </div>			
                    </div>
                </div>
	        </section>

            <Footer />
        </Container>
     
      
    )


}



  export default Contact;