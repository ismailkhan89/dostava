import React, {Component, useState, useEffect } from "react";
import Footer from '../Views/Footer.jsx';
import Header from '../Views/Header';



import ReactDOM from 'react-dom';



import { server_url } from  "../config/config";
import {
    
    Container,
   Row, Col
    // Link
} from "reactstrap";
import FontAwesome from 'react-fontawesome';
import { Form, FormControl } from 'react-bootstrap';
import {Link, useRouteMatch, useParams } from 'react-router-dom';




import { Redirect , useHistory  } from "react-router-dom";






function BlogsNew(props){ 
    return(
      
        <Container className="wrapper" fluid>
      <Header  {...props} />
      <section id="how-it-works">
        <div class="how-it-works-heading">
            <div class="container">
                <div class="row"> 
                    <div class="col-md-12">
                        <h2><strong> Blogs </strong></h2>
                    </div>
                </div>
            </div> 
        </div>
        </section>
        <Container className="blogs-container">
            <Row>
                <Col lg="6" md="6" sm="12" xs="12">
                    <div class="blog-img">
                        <img src="https://res.cloudinary.com/dostava/image/upload/v1605887648/f1iejj1itlmeix2cdtyb.jpg" alt="Dostava blog"></img>
                    </div>
                    <a href="blogs/dostava-blog">
                        <div class="blog-title"><h2>Dostava blog</h2></div>
                        <div class="blog-content">
                            <p><span><strong>At vero eos et accusamus</strong></span></p>
                        </div>
                    </a>
                </Col>
                <Col lg="6" md="6" sm="12" xs="12">
                    <div class="blog-img">
                        <img src="https://res.cloudinary.com/dostava/image/upload/v1605887648/f1iejj1itlmeix2cdtyb.jpg" alt="Dostava blog"></img>
                    </div>
                    <a href="blogs/dostava-blog">
                        <div class="blog-title"><h2>Dostava blog</h2></div>
                        <div class="blog-content">
                            <p><span><strong>At vero eos et accusamus</strong></span></p>
                        </div>
                    </a>
                </Col>
                <Col lg="6" md="6" sm="12" xs="12">
                    <div class="blog-img">
                        <img src="https://res.cloudinary.com/dostava/image/upload/v1605887648/f1iejj1itlmeix2cdtyb.jpg" alt="Dostava blog"></img>
                    </div>
                    <a href="blogs/dostava-blog">
                        <div class="blog-title"><h2>Dostava blog</h2></div>
                        <div class="blog-content">
                            <p><span><strong>At vero eos et accusamus</strong></span></p>
                        </div>
                    </a>
                </Col>
                <Col lg="6" md="6" sm="12" xs="12">
                    <div class="blog-img">
                        <img src="https://res.cloudinary.com/dostava/image/upload/v1605887648/f1iejj1itlmeix2cdtyb.jpg" alt="Dostava blog"></img>
                    </div>
                    <a href="blogs/dostava-blog">
                        <div class="blog-title"><h2>Dostava blog</h2></div>
                        <div class="blog-content">
                            <p><span><strong>At vero eos et accusamus</strong></span></p>
                        </div>
                    </a>
                </Col>
            </Row>
        </Container>
      <Footer />


    </Container>
     
      
    )


}



  export default BlogsNew;