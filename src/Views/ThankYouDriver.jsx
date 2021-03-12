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





function ThankYouDriver(props){ 

    useEffect(() => {
        window.scrollTo(0, 0)
    },[])
   
    return(
      
        <Container className="wrapper" fluid>
        <Helmet>
			<title>How Does Dostava Grocery App Works </title>
			<meta name="description" content="Add your products to your cart and hit purchase, track your order. Your grocery will be at your doorstep." />
		</Helmet>
            <Header  {...props} title={"Thank you Driver"}/>
            <section id="category" class="thank-you">
		        <div class="container"> 
			        <div class="row">
				        <div class="col-md-12 text-center">
					        <h2>Thankyou for registering with Dostava</h2>
					        <p>Check your registered Email for login details</p>
					        <hr/>
                            <h3>Download Our App</h3>
                            <a href="https://apps.apple.com/us/app/dostava-rider/id1542024806">
                                <img src="../Assets/Img/footer-appstore.png"></img>
                            </a>
                            <a href="https://play.google.com/store/apps/details?id=com.dostava.driver">
                                <img src="../Assets/Img/footer-googleplay.png"></img>
                            </a>
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
                <div class="how-it-work-content img-setup">
                    <div class="container"> 
    			        <div class="row"> 
                            <div class="col-md-4">
                                <div class="steps">
                                    <div class="process">
                                        <span class="number">1</span>
                                        <img class="img-fluid" src="../Assets/Img/how-01.png" alt="how-1"></img>
                                    </div>
                                    <p class="how-to-get"><strong>Download</strong> the Dostava App
                                     {/* or Login at <a href="https://vendor.dostava.com.au">vendor.dostava.com.au</a> */}
                                     </p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="steps">
                                    <div class="process">
                                        <span class="number">2</span>
                                        <img class="img-fluid" src="../Assets/Img/verify-vehicle.png" alt="how-2"></img>
                                    </div>
                                    <p class="how-to-get">Verify your’s and your vehicle’s information</p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="steps">
                                    <div class="process">
                                        <span class="number">3</span>
                                        <img class="img-fluid" src="../Assets/Img/start-accepting-gigs.png" alt="how-3"></img>
                                    </div>
                                    <p class="how-to-get">Start accepting delivery gigs</p>
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
                        <div className="col-md-7 thank-you-text">
                            <h2>Download our <strong>application</strong></h2>
                            <hr/>
                            <p>A location-based online marketplace that connects people with small businesses and neighbourhood stores in their locality. Dostava has its fleet of drivers who will be available for delivery within minutes like every other ride-sharing app. People don’t need to rely only on the few grocery giants as they can now support small business owners near their home or workplace.</p>
                            <a href="https://apps.apple.com/us/app/dostava/id1543132324">
                                <img src="../Assets/Img/footer-appstore.png"></img>
                            </a>
                            <a href="https://play.google.com/store/apps/details?id=com.dostava">
                                <img src="../Assets/Img/footer-googleplay.png"></img>
                            </a>
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



  export default ThankYouDriver;