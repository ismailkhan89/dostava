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

import Accord from '../components/Accord';

import {Link, useRouteMatch, useParams } from 'react-router-dom';






import { Redirect , useHistory  } from "react-router-dom";



const SECTIONS = [
	{
        head: 'What is Dostava?',
        content: 'Dostava is your new Money Mate, you keep doing your normal work and at the same time you can start earning more.',
    },
	{
        head: 'How does it work?',
        content: 'Your friendly Dostava App will provide you option to pick up your Delivery order one day in advance. Yes, One Day in Advance.',
		content2:'Let’s say it is Monday today, you will get all the order details by Monday night, you need to pick up the Groceries on Tuesday and Deliver it on Tuesday.',
		content3:'When you are driving Rideshare or any other work, you can pass by the Grocery store and pick up your Dostava Delivery. Most of the time you do not need to go to the store specially.',
		content4:'You can plan your Next Day Order Pickup and Delivery in advance.'
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
		content: 'Your friendly Dostava app will send you address details of all your orders.',
		content2:'Your day to day grocery product pickups will be'
	  },
	  {
		head: 'When do I deliver the groceries?',
		content: 'Your order pickup and Delivery both are for next day. you pick up the order and deliver it on the same day.',
		content2:'Plan your day ahead, how easy is that… we are here to look after you.'
	  },
	  {
		head: 'How many hours I have before I can deliver the Groceries?',
		content: 'Because you will get your Grocery Pickup list one day before, you have full day to pick up the order and delivery it on the same day as Pickup.',		
	  },
	  {
		head: 'Do I need to install the Mobile application to work with Dostava?',
		content: 'Yes, your friendly Dostava Mobile application will provide you',
		
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
		content: 'You will get paid every……',
		
	  },
	  {
		head: 'Why should I choose Dostava?',
		bullentpoints : [
            {
                title : "Dostava is your new online platform. Without spending big $$$ on an online platform, simply you make Dostava your new Online Mate and start selling."
            },
            {
                title : "Dostava charges you only $9.90 per week and no other charge.But for a limited time only pay $0 for store registration and product listing worth $300. Register Now!"
            },
            {
                title : "Dostava is not an additional financial burden on you but its ADDITIONAL FINANCIAL Benefit. We are here to help you."
            }
        ]
		
	  },
	  {
		head: 'What is my benefit for Choosing Dostava?',
		content: 'Dostava aims to increase your Sales by not increasing your cost.',
		content2:'You spend money in marketing, your shop running cost, employees and much more… with Dostava - Simply you receive the Order and make them ready for pickup. You can do it in your Free Time.',
		content3:'You can utilize your Employees in their Free time and utilize the available manpower.',
		content4:'Dostava Helps you;',
		bullentpoints : [
            {
                title : "You can utilize your Employees in their Free time and utilize the available manpower."
            },
            {
                title : "You don’t need to spend big money on developing online platform"
            },
            {
                title : "You don’t need to increase your expenses to increase your sales (Marketing spend, shop running cost, employees and etc)"
            },
            {
                title : "We send you list one day in advance, so keep it ready whenever you can"
            },
            {
                title : "Increase your sales but DON’t increase your Expenses"
            },
            {
                title : "And much more…"
            }
        ]
		
	  },
	  {
		head: 'Do I have to pay any registration fees or ongoing fees?',
		content: 'Normally, you only need to pay $9.99 per week platform usage fees BUT for a limited time period, we are offering FREE registration for SIX MONTHS. You will also be getting product listing of worth AUD $300/- absolutely FREE!',
		
	  },
	  {
		head: 'Do we have to be a BIG Business to join Dostava?',
		content: 'Dostava is like you business mate. We do not distinguish but we are here to help everyone.',
	  },
	  {
		head: 'Do we need to hire deliver drivers?',
		content: 'Dostava takes away your headache and that is true, we organize delivery drivers.',
		content2:'Simply all you require to do it Keep the Orders ready and rest leave it to us.'
	  },
	  {
		head: 'How many hours we have before we must keep the order ready?',
		content: 'We will send you your order one day before, you can pack the orders ready whenever you have time during the day or at the end of the day.',
		content2:'Our friendly delivery driver will pick up the order next day.'
	  },
	  {
		head: 'Do we require extra staff for Dostava orders?',
		content: 'Beauty of Dostava is that you do not need extra manpower.',
		content2:'You can ask your team to pack the orders in their free time or at the end of the day because we will be picking them up next day.'
	  },
	  {
		head: 'How do I upload my products online?',
		content: 'Our USER-Friendly online Portal & Our Expert Team can guide you in this process.',
		content2:'We can take away your headache, speak to our team.'
	  },
	  {
		head: 'Do I need to download the Mobile application of Dostava?',
		content: 'Yes, you are correct. You have to download the app and also your team member can download the app. You will receive the order on your MobileApp.',
	  },
	  {
		head: 'When we will get paid for our product?',
		content: 'Initially you will get paid every week and once your online sales goes through the roof, we can pay you on daily basis.',
	  },
	  {
		head: 'What if we do not have all the products available from the order?',
		content: 'You can simply update the order from your friendly mobile app.',
		content2:'Once you update the order, customer will get notification as well.',
		content3:'You can also remove that product from your online platform anytime.'
	  },
	  {
		head: 'Can we change price of any product any time?',
		content: 'Yes, for sure you can change the price of the product any time you prefer.',
		
	  },
	  {
		head: 'Do we have to sign up any contract with Dostava?',
		content: '………',
		
	  },
	  {
		head: 'Do we require ABN to work with Dostava?',
		content: 'Yes you do require ABN to work with Dostava and also it has to be GST registered.',
		
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