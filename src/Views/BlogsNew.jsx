import React, {Component, useState, useEffect } from "react";
import Footer from '../Views/Footer.jsx';
import Header from '../Views/Header';
import { Container,Row, Col } from "reactstrap";
import {Link , useHistory } from 'react-router-dom';
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { getblogsForWeb } from "../apollo/server";

const GET_BLOG_WEB = gql`${getblogsForWeb}`;

function BlogsNew(props){ 


    return(
      
        <Container className="wrapper" fluid>
      <Header  {...props} title="Blogs"/>
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
            <Query query={GET_BLOG_WEB}>
            {({ loading, error, data }) => {
             if (loading) return <div>{"Loading"}...</div>;
             if (error) return <div>`${"Error"}! ${error.message}`</div>;
            return data.getblogsForWeb.map((blog, index) =>{
               return  <BlogComponents blog={blog} key={index}/>
                }
                  
                )
              }}
            </Query>
                {/* <BlogComponents props/>
                <BlogComponents props/> 
                <BlogComponents props/>
                <BlogComponents props/> */}
                {/* <Col lg="6" md="6" sm="12" xs="12">
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
                </Col> */}
            </Row>
        </Container>
      <Footer />


    </Container>
     
      
    )


}

function BlogComponents(props){
    const history = useHistory();
    var stripedHtml = props.blog.content.replace(/<[^>]+>/g, '');
    
    if(stripedHtml.length > 150){
        stripedHtml = stripedHtml.substr(0, 150);
    }
    // var str = stripedHtml;
    // var res = str.substr(0, 100);
    return (
        <Col lg="6" md="6" sm="12" xs="12">
            <div className="blog-img">
                <img src={props.blog.image}alt="Dostava blog"></img>
            </div>
            <Link
            to={`/blogs-single/${props.blog.slug}`}>
           {/* <a href={`/blogs-new-single/${props.blog.slug}`}> */}
                <div className="blog-title"><h2>{props.blog.title}</h2></div>
                <div className="blog-content">
                    <p><span><strong>{stripedHtml}
                    {stripedHtml.length === 150 && 
                    <span>...</span>
                      }
                    </strong></span></p>
                </div>
            {/* </a> */}
            </Link>
     </Col>
    )
}


            {/* </Link> */}

  export default BlogsNew;