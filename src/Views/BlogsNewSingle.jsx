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
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { getSingleBlogBySlug } from "../apollo/server";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const GET_SINGLE_BLOG_WEB = gql`${getSingleBlogBySlug}`;


function BlogsNewSingle(props){ 

  const [_id, setId] = useState(props.match.params?.slug ?? null);
  const [title, setTitle] = useState('Single Blogs');


    return(
      
        <Container className="wrapper" fluid>
      <Header  {...props} title={title}/>
        <Container>
            <Row>

            <Query query={GET_SINGLE_BLOG_WEB} variables={{slug: _id }}>
            {({ loading, error, data }) => {
             if (loading) return <div>{"Loading"}...</div>;
             if (error) return <div>`${"Error"}! ${error.message}`</div>;
             var stripedHtml = data.getSingleBlogBySlug.content.replace(/<[^>]+>/g, '');
             setTitle(data.getSingleBlogBySlug.title)
              return  data.getSingleBlogBySlug !== undefined && 
                    <Col lg="12">
                    <div class="blog-img">
                        <img src={data.getSingleBlogBySlug.image} alt="Dostava app blog"></img>
                    </div>
                    <div class="blog-title"><h2>{data.getSingleBlogBySlug.title}</h2></div>
                    <div class="blog-content">
                    {ReactHtmlParser(data.getSingleBlogBySlug.content)}
                    </div>
                </Col>
              }}
            </Query>
              
            </Row>
        </Container>

      
      
        
      <Footer />


    </Container>
     
      
    )


}



  export default BlogsNewSingle;

   {/* <p><span>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</span></p>
                        <p><span>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains</span>.</p> */}
    {/* <Col lg="12">
                    <div class="blog-img">
                        <img src="https://res.cloudinary.com/dostava/image/upload/v1605887535/ixltmtypymlw3seiff99.jpg" alt="Dostava app blog"></img>
                    </div>
                    <div class="blog-title"><h2>Dostava app blog</h2></div>
                    <div class="blog-content">
                        <p><span>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</span></p>
                        <p><span>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains</span>.</p>
                    </div>
			    </Col> */}