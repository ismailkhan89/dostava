import React, {Component, useState, useEffect } from "react";
import Footer from '../Views/Footer.jsx';
import Header from '../Views/Header';



import ReactDOM from 'react-dom';



import { server_url } from  "../config/config";
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardHeader,
    Container,
    Row,
    Col,
    Button
   
    // Link
} from "reactstrap";
import FontAwesome from 'react-fontawesome';
import { Form, FormControl } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion'
import {Link, useRouteMatch, useParams } from 'react-router-dom';




import { Redirect , useHistory  } from "react-router-dom";






function Faq(props){ 
    return(
      
        <Container className="wrapper" fluid>
            <Header  {...props} />
            <section id="slider" class="driver-page faq">
                <div class="container"> 
                    <div class="row"> 
                        <div class="col-md-12 text-center">
                            <h1><strong>FREQUENTLY ASKED QUESTIONS</strong></h1>
                            <br/>
                            <br/>
                            <a class="download" href="javascript:void(0)">Download App <i class="fa fa-long-arrow-alt-right"></i></a>
                            <a class="download" href="javascript:void(0)">Fill the form <i class="fa fa-long-arrow-alt-right"></i></a>
                            <div class="download-app">
                                <a href="javascript:void(0)"><img class="img-fluid" src="../Assets/Img/google-play.png" alt="google-play"></img></a>
                                <a href="javascript:void(0)"><img class="img-fluid" src="../Assets/Img/app-store.png" alt="app-store"></img></a>
                            </div>
                        </div>
                    </div> 
                </div> 
	        </section>
<Container>
    <Row>
        <Col lg="12">
        <Accordion defaultActiveKey="0">
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="0">
        Click me!
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>Hello! I'm the body</Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="1">
        Click me!
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="1">
      <Card.Body>Hello! I'm another body</Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>

        </Col>
    </Row>
</Container>
           

            <section id="faq">
		<div class="container">
			
			<div class="row">
				<div class="col-md-12">
				
					<div id="accordionExample" class="accordion">

						
						<div class="card">
							<div id="headingOne" class="card-header bg-white shadow-sm border-0">
								<h6 class="mb-0 font-weight-bold">
									<a href="#" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" class="d-block position-relative text-dark text-uppercase collapsible-link py-2">What is Dostava?</a>
								</h6>
							</div>
							<div id="collapseOne" aria-labelledby="headingOne" data-parent="#accordionExample" class="collapse show">
								<div class="card-body p-5">
									<p class="font-weight-light m-0">Dostava is your new Money Mate, you keep doing your normal work and at the same time you can start earning more.</p>
								</div>
							</div>
						</div>

						
						<div class="card">
							<div id="headingTwo" class="card-header bg-white shadow-sm border-0">
								<h6 class="mb-0 font-weight-bold">
									<a href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" class="d-block position-relative collapsed text-dark text-uppercase collapsible-link py-2">How does it work?</a>
								</h6>
							</div>
							<div id="collapseTwo" aria-labelledby="headingTwo" data-parent="#accordionExample" class="collapse">
								<div class="card-body p-5">
									<p>Your friendly Dostava App will provide you option to pick up your Delivery order one day in advance. Yes, One Day in Advance.</p>
									<p>Let’s say it is Monday today, you will get all the order details by Monday night, you need to pick up the Groceries on Tuesday and Deliver it on Tuesday.</p>
									<p>When you are driving Rideshare or any other work, you can pass by the Grocery store and pick up your Dostava Delivery. Most of the time you do not need to go to the store specially.</p>
									<p>You can plan your Next Day Order Pickup and Delivery in advance.</p>
								</div>
							</div>
						</div>

						
						<div class="card">
							<div id="headingThree" class="card-header bg-white shadow-sm border-0">
								<h6 class="mb-0 font-weight-bold">
									<a href="#" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" class="d-block position-relative collapsed text-dark text-uppercase collapsible-link py-2">How much I need to pay to register with dostava?</a>
								</h6>
							</div>
							<div id="collapseThree" aria-labelledby="headingThree" data-parent="#accordionExample" class="collapse">
								<div class="card-body p-5">
									<p class="font-weight-light m-0">Your friendly Dostava App is free for you to install and you can start using it and start earning.</p>
								</div>
							</div>
						</div>
						<div class="card">
							<div id="headingFour" class="card-header bg-white shadow-sm border-0">
								<h6 class="mb-0 font-weight-bold">
									<a href="#" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour" class="d-block position-relative collapsed text-dark text-uppercase collapsible-link py-2">How much I get paid for each delivery?</a>
								</h6>
							</div>
							<div id="collapseFour" aria-labelledby="headingFour" data-parent="#accordionExample" class="collapse">
								<div class="card-body p-5">
									<p class="font-weight-light m-0">Your friendly Dostava App will show you your delivery fees. Your delivery fees start from $9.99 for each delivery.</p>
								</div>
							</div>
						</div>
						<div class="card">
							<div id="headingFive" class="card-header bg-white shadow-sm border-0">
								<h6 class="mb-0 font-weight-bold">
									<a href="#" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive" class="d-block position-relative collapsed text-dark text-uppercase collapsible-link py-2">Where do I pick up the groceries from?</a>
								</h6>
							</div>
							<div id="collapseFive" aria-labelledby="headingFive" data-parent="#accordionExample" class="collapse">
								<div class="card-body p-5">
									<p class="font-weight-light m-0">Your friendly Dostava app will send you address details of all your orders.</p>
									<p class="font-weight-light m-0">Your day to day grocery product pickups will be </p>
								</div>
							</div>
						</div>
						<div class="card">
							<div id="headingSix" class="card-header bg-white shadow-sm border-0">
								<h6 class="mb-0 font-weight-bold">
									<a href="#" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix" class="d-block position-relative collapsed text-dark text-uppercase collapsible-link py-2">When do I deliver the groceries?</a>
								</h6>
							</div>
							<div id="collapseSix" aria-labelledby="headingSix" data-parent="#accordionExample" class="collapse">
								<div class="card-body p-5">
									<p class="font-weight-light m-0">Your order pickup and Delivery both are for next day. you pick up the order and deliver it on the same day.</p>
									<p class="font-weight-light m-0">Plan your day ahead, how easy is that… we are here to look after you.</p>
								</div>
							</div>
						</div>
						<div class="card">
							<div id="headingSeven" class="card-header bg-white shadow-sm border-0">
								<h6 class="mb-0 font-weight-bold">
									<a href="#" data-toggle="collapse" data-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven" class="d-block position-relative collapsed text-dark text-uppercase collapsible-link py-2">How many hours I have before I can deliver the Groceries?</a>
								</h6>
							</div>
							<div id="collapseSeven" aria-labelledby="headingSeven" data-parent="#accordionExample" class="collapse">
								<div class="card-body p-5">
									<p class="font-weight-light m-0">Because you will get your Grocery Pickup list one day before, you have full day to pick up the order and delivery it on the same day as Pickup.</p>
								</div>
							</div>
						</div>
						<div class="card">
							<div id="headingEight" class="card-header bg-white shadow-sm border-0">
								<h6 class="mb-0 font-weight-bold">
									<a href="#" data-toggle="collapse" data-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight" class="d-block position-relative collapsed text-dark text-uppercase collapsible-link py-2">Do I need to install the Mobile application to work with Dostava?</a>
								</h6>
							</div>
							<div id="collapseEight" aria-labelledby="headingEight" data-parent="#accordionExample" class="collapse">
								<div class="card-body p-5">
									<p class="font-weight-light m-0">Yes, your friendly Dostava Mobile application will provide you </p>
								</div>
							</div>
						</div>
						<div class="card">
							<div id="headingNine" class="card-header bg-white shadow-sm border-0">
								<h6 class="mb-0 font-weight-bold">
									<a href="#" data-toggle="collapse" data-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine" class="d-block position-relative collapsed text-dark text-uppercase collapsible-link py-2">Do I need ABN number to work with Dostava?</a>
								</h6>
							</div>
							<div id="collapseNine" aria-labelledby="headingNine" data-parent="#accordionExample" class="collapse">
								<div class="card-body p-5">
									<p class="font-weight-light m-0">Yes, you require Australian Business Number (ABN) to work with Dostava.</p>
								</div>
							</div>
						</div>
						<div class="card">
							<div id="headingTen" class="card-header bg-white shadow-sm border-0">
								<h6 class="mb-0 font-weight-bold">
									<a href="#" data-toggle="collapse" data-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen" class="d-block position-relative collapsed text-dark text-uppercase collapsible-link py-2">Do I have to register for GST?</a>
								</h6>
							</div>
							<div id="collapseTen" aria-labelledby="headingTen" data-parent="#accordionExample" class="collapse">
								<div class="card-body p-5">
									<p class="font-weight-light m-0">Yes, you have to be GST registered to get paid.</p>
								</div>
							</div>
						</div>
						<div class="card">
							<div id="headingEleven" class="card-header bg-white shadow-sm border-0">
								<h6 class="mb-0 font-weight-bold">
									<a href="#" data-toggle="collapse" data-target="#collapseEleven" aria-expanded="false" aria-controls="collapseEleven" class="d-block position-relative collapsed text-dark text-uppercase collapsible-link py-2">How often I get paid for the work?</a>
								</h6>
							</div>
							<div id="collapseEleven" aria-labelledby="headingEleven" data-parent="#accordionExample" class="collapse">
								<div class="card-body p-5">
									<p class="font-weight-light m-0">You will get paid every……</p>
								</div>
							</div>
						</div>

							
							<div class="card">
								<div id="headingOne" class="card-header bg-white shadow-sm border-0">
									<h6 class="mb-0 font-weight-bold">
										<a href="#" data-toggle="collapse" data-target="#collapseOneFaq" aria-expanded="true" aria-controls="collapseOne" class="d-block position-relative text-dark text-uppercase collapsible-link py-2">Why should I choose Dostava?</a>
									</h6>
								</div>
								<div id="collapseOneFaq" aria-labelledby="headingOne" data-parent="#accordionExample" class="collapse">
									<div class="card-body p-5">
										<ul>
											<li>Dostava is your new online platform. Without spending big $$$ on an online platform, simply you make Dostava your new Online Mate and start selling.</li>
											<li>Dostava charges you only $9.90 per week and no other charge.But for a limited time only pay $0 for store registration and product listing worth $300. Register Now! </li>
											<li>Dostava is not an additional financial burden on you but its ADDITIONAL FINANCIAL Benefit. We are here to help you.</li>
										</ul>
									</div>
								</div>
							</div>
	
							
							<div class="card">
								<div id="headingTwo" class="card-header bg-white shadow-sm border-0">
									<h6 class="mb-0 font-weight-bold">
										<a href="#" data-toggle="collapse" data-target="#collapseTwoFaq" aria-expanded="false" aria-controls="collapseTwo" class="d-block position-relative collapsed text-dark text-uppercase collapsible-link py-2">What is my benefit for Choosing Dostava?</a>
									</h6>
								</div>
								<div id="collapseTwoFaq" aria-labelledby="headingTwo" data-parent="#accordionExample" class="collapse">
									<div class="card-body p-5">
										<p>Dostava aims to increase your Sales by not increasing your cost.</p>
										<p>You spend money in marketing, your shop running cost, employees and much more… with Dostava - Simply you receive the Order and make them ready for pickup. You can do it in your Free Time.</p>
										<p>You can utilize your Employees in their Free time and utilize the available manpower.</p>
										<p>Dostava Helps you;</p>
										<ul>
											<li>You can utilize your Employees in their Free time and utilize the available manpower.</li>
											<li>You don’t need to spend big money on developing online platform</li>
											<li>You don’t need to increase your expenses to increase your sales (Marketing spend, shop running cost, employees and etc)</li>
											<li>We send you list one day in advance, so keep it ready whenever you can</li>
											<li>Increase your sales but DON’t increase your Expenses</li>
											<li>And much more…</li>
										</ul>
									</div>
								</div>
							</div>
							<div class="card">
								<div id="headingThree" class="card-header bg-white shadow-sm border-0">
									<h6 class="mb-0 font-weight-bold">
										<a href="#" data-toggle="collapse" data-target="#collapseThreeFaq" aria-expanded="false" aria-controls="collapseThree" class="d-block position-relative collapsed text-dark text-uppercase collapsible-link py-2">Do I have to pay any registration fees or ongoing fees?</a>
									</h6>
								</div>
								<div id="collapseThreeFaq" aria-labelledby="headingThree" data-parent="#accordionExample" class="collapse">
									<div class="card-body p-5">
										<p>Normally, you only need to pay $9.99 per week platform usage fees BUT for a limited time period, we are offering FREE registration for SIX MONTHS. You will also be getting product listing of worth AUD $300/- absolutely FREE!</p>
									</div>
								</div>
							</div>
							<div class="card">
								<div id="headingFour" class="card-header bg-white shadow-sm border-0">
									<h6 class="mb-0 font-weight-bold">
										<a href="#" data-toggle="collapse" data-target="#collapseFourFaq" aria-expanded="false" aria-controls="collapseFour" class="d-block position-relative collapsed text-dark text-uppercase collapsible-link py-2">Do we have to be a BIG Business to join Dostava?</a>
									</h6>
								</div>
								<div id="collapseFourFaq" aria-labelledby="headingFour" data-parent="#accordionExample" class="collapse">
									<div class="card-body p-5">
										<p class="font-weight-light m-0">Dostava is like you business mate. We do not distinguish but we are here to help everyone.</p>
									</div>
								</div>
							</div>
							<div class="card">
								<div id="headingFive" class="card-header bg-white shadow-sm border-0">
									<h6 class="mb-0 font-weight-bold">
										<a href="#" data-toggle="collapse" data-target="#collapseFiveFaq" aria-expanded="false" aria-controls="collapseFive" class="d-block position-relative collapsed text-dark text-uppercase collapsible-link py-2">Do we need to hire deliver drivers?</a>
									</h6>
								</div>
								<div id="collapseFiveFaq" aria-labelledby="headingFive" data-parent="#accordionExample" class="collapse">
									<div class="card-body p-5">
										<p>Dostava takes away your headache and that is true, we organize delivery drivers.</p>
										<p>Simply all you require to do it Keep the Orders ready and rest leave it to us.</p>
									</div>
								</div>
							</div>
							<div class="card">
								<div id="headingSix" class="card-header bg-white shadow-sm border-0">
									<h6 class="mb-0 font-weight-bold">
										<a href="#" data-toggle="collapse" data-target="#collapseSixFaq" aria-expanded="false" aria-controls="collapseSix" class="d-block position-relative collapsed text-dark text-uppercase collapsible-link py-2">How many hours we have before we must keep the order ready?</a>
									</h6>
								</div>
								<div id="collapseSixFaq" aria-labelledby="headingSix" data-parent="#accordionExample" class="collapse">
									<div class="card-body p-5">
										<p>We will send you your order one day before, you can pack the orders ready whenever you have time during the day or at the end of the day.</p>
										<p>Our friendly delivery driver will pick up the order next day.</p>
									</div>
								</div>
							</div>
							<div class="card">
								<div id="headingSeven" class="card-header bg-white shadow-sm border-0">
									<h6 class="mb-0 font-weight-bold">
										<a href="#" data-toggle="collapse" data-target="#collapseSevenFaq" aria-expanded="false" aria-controls="collapseSeven" class="d-block position-relative collapsed text-dark text-uppercase collapsible-link py-2">Do we require extra staff for Dostava orders?</a>
									</h6>
								</div>
								<div id="collapseSevenFaq" aria-labelledby="headingSeven" data-parent="#accordionExample" class="collapse">
									<div class="card-body p-5">
										<p>Beauty of Dostava is that you do not need extra manpower.</p>
										<p>You can ask your team to pack the orders in their free time or at the end of the day because we will be picking them up next day.</p>
									</div>
								</div>
							</div>
							<div class="card">
								<div id="headingEight" class="card-header bg-white shadow-sm border-0">
									<h6 class="mb-0 font-weight-bold">
										<a href="#" data-toggle="collapse" data-target="#collapseEightFaq" aria-expanded="false" aria-controls="collapseEight" class="d-block position-relative collapsed text-dark text-uppercase collapsible-link py-2">How do I upload my products online?</a>
									</h6>
								</div>
								<div id="collapseEightFaq" aria-labelledby="headingEight" data-parent="#accordionExample" class="collapse">
									<div class="card-body p-5">
										<p>Our USER-Friendly online Portal & Our Expert Team can guide you in this process.</p>
										<p>We can take away your headache, speak to our team.</p>
									</div>
								</div>
							</div>
							<div class="card">
								<div id="headingNine" class="card-header bg-white shadow-sm border-0">
									<h6 class="mb-0 font-weight-bold">
										<a href="#" data-toggle="collapse" data-target="#collapseNineFaq" aria-expanded="false" aria-controls="collapseNine" class="d-block position-relative collapsed text-dark text-uppercase collapsible-link py-2">Do I need to download the Mobile application of Dostava?</a>
									</h6>
								</div>
								<div id="collapseNineFaq" aria-labelledby="headingNine" data-parent="#accordionExample" class="collapse">
									<div class="card-body p-5">
										<p>Yes, you are correct. You have to download the app and also your team member can download the app. You will receive the order on your MobileApp.</p>
									</div>
								</div>
							</div>
							<div class="card">
								<div id="headingTen" class="card-header bg-white shadow-sm border-0">
									<h6 class="mb-0 font-weight-bold">
										<a href="#" data-toggle="collapse" data-target="#collapseTenFaq" aria-expanded="false" aria-controls="collapseTen" class="d-block position-relative collapsed text-dark text-uppercase collapsible-link py-2">When we will get paid for our product?</a>
									</h6>
								</div>
								<div id="collapseTenFaq" aria-labelledby="headingTen" data-parent="#accordionExample" class="collapse">
									<div class="card-body p-5">
										<p>Initially you will get paid every week and once your online sales goes through the roof, we can pay you on daily basis.</p>
									</div>
								</div>
							</div>
							<div class="card">
								<div id="headingEleven" class="card-header bg-white shadow-sm border-0">
									<h6 class="mb-0 font-weight-bold">
										<a href="#" data-toggle="collapse" data-target="#collapseElevenFaq" aria-expanded="false" aria-controls="collapseEleven" class="d-block position-relative collapsed text-dark text-uppercase collapsible-link py-2">What if we do not have all the products available from the order?</a>
									</h6>
								</div>
								<div id="collapseElevenFaq" aria-labelledby="headingEleven" data-parent="#accordionExample" class="collapse">
									<div class="card-body p-5">
										<p>You can simply update the order from your friendly mobile app.</p>
										<p>Once you update the order, customer will get notification as well.</p>
										<p>You can also remove that product from your online platform anytime.</p>
									</div>
								</div>
							</div>
							<div class="card">
								<div id="headingTwelve" class="card-header bg-white shadow-sm border-0">
									<h6 class="mb-0 font-weight-bold">
										<a href="#" data-toggle="collapse" data-target="#collapseTwelveFaq" aria-expanded="false" aria-controls="collapseTwelve" class="d-block position-relative collapsed text-dark text-uppercase collapsible-link py-2">Can we change price of any product any time?</a>
									</h6>
								</div>
								<div id="collapseTwelveFaq" aria-labelledby="headingTwelve" data-parent="#accordionExample" class="collapse">
									<div class="card-body p-5">
										<p>Yes, for sure you can change the price of the product any time you prefer.</p>
									</div>
								</div>
							</div>
							<div class="card">
								<div id="headingThirteen" class="card-header bg-white shadow-sm border-0">
									<h6 class="mb-0 font-weight-bold">
										<a href="#" data-toggle="collapse" data-target="#collapseThirteenFaq" aria-expanded="false" aria-controls="collapseThirteen" class="d-block position-relative collapsed text-dark text-uppercase collapsible-link py-2">Do we have to sign up any contract with Dostava?</a>
									</h6>
								</div>
								<div id="collapseThirteenFaq" aria-labelledby="headingThirteen" data-parent="#accordionExample" class="collapse">
									<div class="card-body p-5">
										<p>………</p>
									</div>
								</div>
							</div>
							<div class="card">
								<div id="headingFourteen" class="card-header bg-white shadow-sm border-0">
									<h6 class="mb-0 font-weight-bold">
										<a href="#" data-toggle="collapse" data-target="#collapseFourteenFaq" aria-expanded="false" aria-controls="collapseFourteen" class="d-block position-relative collapsed text-dark text-uppercase collapsible-link py-2">Do we require ABN to work with Dostava?</a>
									</h6>
								</div>
								<div id="collapseFourteenFaq" aria-labelledby="headingFourteen" data-parent="#accordionExample" class="collapse">
									<div class="card-body p-5">
										<p>Yes you do require ABN to work with Dostava and also it has to be GST registered.</p>
									</div>
								</div>
							</div>
							<div class="card">
								<div id="headingFifteen" class="card-header bg-white shadow-sm border-0">
									<h6 class="mb-0 font-weight-bold">
										<a href="#" data-toggle="collapse" data-target="#collapseFifteenFaq" aria-expanded="false" aria-controls="collapseFifteen" class="d-block position-relative collapsed text-dark text-uppercase collapsible-link py-2">How GST works if our product is GST Free and we do not charge GST to the Customers?</a>
									</h6>
								</div>
								<div id="collapseFifteenFaq" aria-labelledby="headingFifteen" data-parent="#accordionExample" class="collapse">
									<div class="card-body p-5">
										<p>Your friendly mobile app is designed in such a way, you can select the GST on the product.</p>
										<p>Selling your product online will not make any changes to your GST on the Sales.</p>
									</div>
								</div>
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



  export default Faq;