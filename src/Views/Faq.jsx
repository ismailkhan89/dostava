import React, {Component, useState, useEffect } from "react";
import Footer from '../Views/Footer.jsx';
import Header from '../Views/Header';



import ReactDOM from 'react-dom';



import { server_url } from  "../config/config";
import {
    Container,
    Row,
    Col,
	Button
   
    // Link
} from "reactstrap";
import FontAwesome from 'react-fontawesome';
import { Form, FormControl, Accordion, Card } from 'react-bootstrap';
// import Accordion from 'react-bootstrap/Accordion'

import Accord from '../Components/Accord';

import {Link, useRouteMatch, useParams } from 'react-router-dom';






import { Redirect , useHistory  } from "react-router-dom";
import { Helmet } from "react-helmet";


const SECTIONS = [
	{
        head: 'What is Dostava?',
        content: 'Dostava is an 100% Australian owned online platform based in the heart of Perth, that connects the small stores to the customers living in the nearby area through a location based app. It is the ultimate solution to convenient shopping and effective business.',
    },
	{
        head: 'How does it work?',
        content: 'Dostava works through an easy-to-use application available for your android and iOs devices. Through the application or the Dostava website, grocery shopping is as easy as tapping on your mobile screen. Place an order by navigating through a number of stores available near you and get it delivered at your doorstep.',
		content2:'If you’re a vendor looking to increase sales online, register through the Dostava application or through our website. Accept the orders from customers, pack and prepare it for the delivery rider to pick and get paid. It’s that simple.',
    },
    {
        head: 'How much I need to pay to register with dostava?',
        content: 'Your friendly Dostava App is free for you to install and you can start using it and start earning.',
	},
    {
      head: 'How much I get paid for each delivery?',
	  content: 'Your friendly Dostava App will show you your delivery fees. Your delivery fees start from $9.99 for each delivery.',
	},
	{
		head: 'Where do I pick up the groceries from?',
		content: 'Your friendly Dostava application will send you complete details of the pick and drop of the package and the money you will be making for the gig.',
	  },
	  {
		head: 'When do I deliver the orders?',
		content: 'After you accept the order you can conveniently deliver it to a nearby address within one hour.'
	  },
	  {
		head: 'How many hours I have before I can deliver the Groceries?',
		content: 'Because you will get your Grocery Pickup list one day before, you have full day to pick up the order and delivery it on the same day as Pickup.',		
	  },
	  {
		head: 'Do I need to install the Mobile application to work with Dostava?',
		content: 'Yes. Install the Dostava Mobile Application available for your android and iOs devices.',
		
	  },
	  {
		head: 'Do I need ABN number to work with Dostava?',
		content: 'Yes, you require Australian Business Number (ABN) to work with Dostava.',
		
	  },
	  {
		head: 'Do I have to register for GST?',
		content: 'Yes, you have to be GST registered to get paid.',
		
	  },
	  {
		head: 'How often I get paid for the work?',
		content: 'Dostava provides you with the luxury of getting paid per order. The Dostava mobile application will send complete cash details every time an order is placed or a transaction has been made.',
		
	  },
	  {
		head: 'Why should I choose Dostava?',
		content:'Without spending big $$$ on any online platform, you can make Dostava your new online mate and start selling and delivering directly to your local customers.',
		content2:'Dostava charges you only $9.90/week and no other hidden charges we have a no order no fee guarantee with no lock in contracts. We are currently offering a 3 month free trial period.'
	  },
	  {
		head: 'What is my benefit for Choosing Dostava?',
		content: 'With Dostava, you can increase your sales by eceiving online orders, packing them and letting our drivers know when they are ready to collect and deliver. If your doors are closed due to lockdown you are still able to trade.',
		content2:'With Dostava, you don’t need to spend more money on developing online platforms or hiring drivers, let us do that for you.',
	  },
	  {
		head: 'Do I have to pay any registration fees or ongoing fees?',
		content: 'Dostava charges you only $9.90/week we have a no order no fee guarantee with no lock in contracts. We are currently offering stores their first 3 months free',
		
	  },
	  {
		head: 'Do we have to be a BIG Business to join Dostava?',
		content: 'Dostava does not distinguish between any kind of business and is open for all, whether small, big or operating from home.',
	  },
	  {
		head: 'Do we need to hire deliver drivers?',
		content: 'Dostava has their own delivery mates, all you have to do is get the orders ready, and a Dostava driver will collect and deliver to your customers doorstep.',
	  },
	  {
		head: 'How many hours we have before we must keep the order ready?',
		content: 'We will send you your order one day before, you can pack the orders ready whenever you have time during the day or at the end of the day.',
		content2:'Our friendly delivery driver will pick up the order next day.'
	  },
	  {
		head: 'Do we require extra staff for Dostava orders?',
		content: 'No, you don’t need extra manpower when you start working on Dostava.',
		content2:'You can ask your employees to pack the orders in their free time, and our drivers will pick them once they are ready.'
	  },
	  {
		head: 'How do I upload my products online?',
		content: 'Our user-friendly online portal and expert team can guide you on how to upload your products on the Dostava platform.'
	  },
	  {
		head: 'Do I need to download the Mobile application of Dostava?',
		content: 'Yes, you have to download the Dostava app to receive the order details. Your team members can also download the Dostava app.',
	  },
	  {
		head: 'When we will get paid for our product?',
		content: 'Initially, you will get paid every week. Once your online sales go through the roof, we can pay you on a daily basis.',
	  },
	  {
		head: 'What if we do not have all the products available from the order?',
		content: 'You can simply update the order in the Dostava app. Once you update the order, your customer will get the notification. You can also remove the product from your online platform anytime.',
		
	  },
	  {
		head: 'Can we change the price of any product at any time?',
		content: 'Yes, you can change the price of your product any time, you have full control of stock and pricing.',
		
	  },
	  {
		head: 'Do we have to sign a contract with Dostava?',
		content: 'All you have to do is register online, there are no lock in contracts with Dostava',
	  },
	  {
		head: 'Do we require ABN to work with Dostava?',
		content: 'Yes, you require an ABN to work with Dostava, and it also has to be GST registered.',
		
	  },
	  {
		head: 'How GST works if our product is GST Free and we do not charge GST to the Customers?',
		content: 'Your friendly mobile app is designed in such a way, you can select the GST on the product.',
		content2:'Selling your product online will not make any changes to your GST on the Sales.'
	  },
  ];



function Faq(props){ 
    return(
      
        <Container className="wrapper" fluid>
		<Helmet>
			<title>Frequently Ask Questions | FAQs | Dostava </title>
			<meta name="description" content="Frequently ask questions about vendor and driver registration process and other important procedure. " />
		</Helmet>
            <Header  {...props} title={"FAQS"} />
            <section id="slider" class="driver-page faq">
                <div class="container"> 
                    <div class="row"> 
                        <div class="col-md-12 text-center">
                            <h1><strong>FREQUENTLY ASKED QUESTIONS</strong></h1>
                            <br/>
                            <br/>
                            <a class="download" href="javascript:void(0)">Download App <FontAwesome name="long-arrow-right" /></a>
                            <a class="download" href="javascript:void(0)">Fill the form <FontAwesome name="long-arrow-right" /></a>
                            <div class="download-app"> 
								<a href="https://apps.apple.com/us/app/dostava/id1543132324">
									<img class="img-fluid" src="../Assets/Img/app-store.png" alt="app-store"></img>
								</a>
								<a href="https://play.google.com/store/apps/details?id=com.dostava">
									 <img class="img-fluid" src="../Assets/Img/google-play.png" alt="google-play"></img> 
								</a>

                                {/* <a href="javascript:void(0)"><img class="img-fluid" src="../Assets/Img/google-play.png" alt="google-play"></img></a>
                                <a href="javascript:void(0)"><img class="img-fluid" src="../Assets/Img/app-store.png" alt="app-store"></img></a> */}
                            </div>
                        </div>
                    </div> 
                </div> 
	        </section>

			<Container className="faq-sectio">
    			<Row>
					<Col lg="12">
						{SECTIONS.length > 0 && SECTIONS.map((data, i) => <Accord head={data.head} bullentpoints={data.bullentpoints} content={data.content} content2={data.content2} content3={data.content3} content4={data.content4} key={i}/>)}
					</Col>
				</Row>
			</Container>

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





  export default Faq;