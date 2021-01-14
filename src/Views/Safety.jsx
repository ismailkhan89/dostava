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
						<h6>heading</h6>
						<p>content</p>
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