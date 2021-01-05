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





function ThankYouVendor(props){ 
    return(
      
        <Container className="wrapper" fluid>
        <Helmet>
			<title>How Does Dostava Grocery App Works </title>
			<meta name="description" content="Add your products to your cart and hit purchase, track your order. Your grocery will be at your doorstep." />
		</Helmet>
            <Header  {...props} title={"Thank you Vendor"}/>
            <section id="category">
		        <div class="container"> 
			        <div class="row">
				        <div class="col-md-12 text-center">
					        <h2>Thank you for registering to Dostava</h2>
					        <p>Our team will shortly contact to you</p>
					        <hr/>
				        </div>
			        </div> 
			    </div> 
	        </section>
            <section id="how-it-works">
                <div class="how-it-works-heading">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <h2>How It <strong>Works</strong></h2>
                                <hr/>
                            </div>
                        </div> 
                    </div>
                </div>
                <div class="how-it-work-content">
                    <div class="container"> 
    			        <div class="row"> 
                            <div class="col-md-4">
                                <div class="steps">
                                    <div class="process">
                                        <span class="number">1</span>
                                        <img class="img-fluid" src="../Assets/Img/how-01.png" alt="how-1"></img>
                                    </div>
                                    <p class="how-to-get">Download the Dostava application from google <strong>playstore</strong> or <strong>IOS Appstore.</strong></p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="steps">
                                    <div class="process">
                                        <span class="number">2</span>
                                        <img class="img-fluid" src="../Assets/Img/how-02.png" alt="how-2"></img>
                                    </div>
                                    <p class="how-to-get">Install and register to <strong>create an account</strong> in a few simple steps.</p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="steps">
                                    <div class="process">
                                        <span class="number">3</span>
                                        <img class="img-fluid" src="../Assets/Img/how-03.png" alt="how-3"></img>
                                    </div>
                                    <p class="how-to-get"><strong>Search</strong> for your product or browse through stores near you.</p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="steps">
                                    <div class="process">
                                        <span class="number">4</span>
                                        <img class="img-fluid" src="../Assets/Img/how-04.png" alt="how-4"></img>
                                    </div>
                                    <p class="how-to-get">Add your products to your <strong>cart</strong> and <strong>hit purchase!</strong></p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="steps">
                                    <div class="process">
                                        <span class="number">5</span>
                                        <img class="img-fluid" src="../Assets/Img/how-05.png" alt="how-5"></img>
                                    </div>
                                    <p class="how-to-get">You can <strong>track</strong> your <strong>order</strong> as a driver near the store will be assigned.</p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="steps">
                                    <div class="process">
                                        <span class="number">6</span>
                                        <img class="img-fluid" src="../Assets/Img/how-06.png" alt="how-6"></img>
                                    </div>
                                    <p class="how-to-get"><strong>Get your <span>items delivered</span> at your doorstep!</strong></p>
                                </div>
                            </div>
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



  export default ThankYouVendor;