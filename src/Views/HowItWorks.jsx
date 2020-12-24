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






function HowItWorks(props){ 
    return(
      
        <Container className="wrapper" fluid>
            <Header  {...props} />
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
            <Footer />
        </Container>
     
      
    )


}



  export default HowItWorks;