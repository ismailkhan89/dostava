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





function PrivacyPolicy(props){ 
    return(
      
        <Container className="wrapper" fluid>
			<Helmet>
			<title>Privacy Policy |  Dostava </title>
			<meta name="description" content="At Dostava we strictly follow the privacy policy for customer, vendor, and drivers. Your contact Information is safe with us." />
		</Helmet>
      <Header  {...props} title={"Privacy Policy"} />
      <section id="how-it-works">
        <div class="how-it-works-heading">
                <div class="container">
                    <div class="row"> 
                        <div class="col-md-12">
                            <h2><strong> Privacy Policy </strong></h2>
                                <hr/>
                        </div>
                    </div> 
                </div>
            </div>
            <div class="how-it-work-content terms-condition">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<p>In order to provide our services to you, we collect personal information from you. This includes contact information as well as information about how you use our platform and services.</p>
						<p>We know that protecting your personal information is important. This Privacy Policy sets out our commitment to protecting the privacy of personal information provided to us, or otherwise collected by us, offline or online, including through our services, website and mobile application (<strong>Services</strong>). In this Privacy Policy <strong>we, us</strong> or <strong>our</strong> means Dostava Australia Pty Ltd ABN 52 640 411 098.</p>
						<h6>Personal information</h6>
						<p><strong>Personal information</strong>The types of personal information we may collect about you include:</p>
						<ul class="decimal">
						<li>your name;</li>
						<li>if you are a representative of a business using our Services, your job title, and business contact details including your work email address;</li>
						<li>your contact details, including email address, mailing address, street address and/or telephone number; </li>
						<li>your qualifications;</li>
						<li>if you are a driver using our Services, a copy of your driver’s licence;</li>		
						<li>if you are a driver using our Services, tracked location while you are performing the delivery services; </li>
						<li>your age and/or date of birth;</li>
						<li>your credit card or payment details (through our third party payment processor, Stripe);</li>							
						<li>your preferences and/or opinions;</li>							
						<li>information you provide to us through customer surveys;</li>
						<li>details of products and services we have provided to you and/or that you have enquired about, and our response to you;</li>	
						<li>your browser session and geo-location data, device and network information, statistics on page views and sessions, acquisition sources, search queries and/or browsing behaviour;</li>
						<li>information about your access and use of our Services, including through the use of Internet cookies, your communications with our online Services, the type of browser you are using, the type of operating system you are using and the domain name of your Internet service provider;</li>
						<li>additional personal information that you provide to us, directly or indirectly, through your use of our Services, associated applications, associated social media platforms and/or accounts from which you permit us to collect information; and</li>
						<li>any other personal information requested by us and/or provided by you or a third party.</li>
						</ul>
						<p>We may collect these types of personal information directly from you or from third parties.</p>
						<h6>Collection and use of personal information</h6>
						<p>We may collect, hold, use and disclose personal information for the following purposes:</p>
						<ul>
							<li>to enable you to access and use our Services, associated applications and associated social media platforms;</li>
							<li>to contact and communicate with you;</li>
							<li>for internal record keeping, administrative purposes, invoicing and billing purposes;</li>
							<li>for analytics, market research and business development, including to operate and improve our Services, associated applications and associated social media platforms;</li>
							<li>to run promotions, competitions and/or offer additional benefits to you; </li>
							<li>for advertising and marketing, including to send you promotional information about our products and services and information that we consider may be of interest to you;</li>
							<li>to comply with our legal obligations and resolve any disputes that we may have; and</li>
							<li>if you have applied for employment with us; to consider your employment application.</li>
						</ul>
						<h6>Disclosure of personal information to third parties</h6>
						<p>We may disclose personal information to:</p>
						<ul>
							<li>third party service providers for the purpose of enabling them to provide their services, including (without limitation) IT service providers, data storage, web-hosting and server providers, debt collectors, maintenance or problem-solving providers, marketing or advertising providers, professional advisors and payment systems operators;</li>
							<li>our employees, contractors and/or related entities;</li>
							<li>our existing or potential agents or business partners;</li>
							<li>sponsors or promoters of any promotions or competition we run;</li>
							<li>anyone to whom our business or assets (or any part of them) are, or may (in good faith) be, transferred;</li>
							<li>credit reporting agencies, courts, tribunals and regulatory authorities, in the event you fail to pay for goods or services we have provided to you;</li>
							<li>courts, tribunals, regulatory authorities and law enforcement officers, as required by law, in connection with any actual or prospective legal proceedings, or in order to establish, exercise or defend our legal rights; </li>
							<li>third parties, including agents or sub-contractors, who assist us in providing information, products, services or direct marketing to you. This may include parties located, or that store data, outside of Australia;</li>
							<li>third parties to collect and process data, such as Google Analytics.</li>
						</ul>
						<p>By providing us with personal information, you consent to the disclosure of your information outside of Australia and acknowledge that we are not required to ensure that overseas recipients handle that personal information in compliance with Australian Privacy law. You acknowledge that some overseas third parties may not be regulated by the Privacy Act and the Australian Privacy Principles in the Privacy Act and if any third party engages in any act or practice that contravenes the Australian Privacy Principles, it would not be accountable under the Privacy Act and you will not be able to seek redress under the Privacy Act.</p>
						<h6>How we treat personal information that is also sensitive information</h6>
						<p>Sensitive information is a sub-set of personal information that is given a higher level of protection under the Australian Privacy Principles. <strong>Sensitive information</strong> means information relating to your racial or ethnic origin, political opinions, religion, trade union or other professional associations or memberships, philosophical beliefs, sexual orientation, sexual practices or sex life, criminal records, health information or biometric information.</p>
						<p>We do not currently collect sensitive information and we will not collect sensitive information about you without first obtaining your consent.</p>
						<p>Provided you consent, your sensitive information would only be used and disclosed for purposes relating to the primary purpose for which the sensitive information was collected.</p>
						<p>Sensitive information may also be used or disclosed if required or authorised by law.</p>
						<h6>Your rights and controlling your personal information</h6>
						<p><strong>Your choice</strong>: Please read this Privacy Policy carefully. If you provide personal information to us, you understand we will collect, hold, use and disclose your personal information in accordance with this Privacy Policy. You do not have to provide personal information to us, however, if you do not, it may affect your use of our Services.</p>
						<p><strong>Information from third parties</strong>: If we receive personal information about you from a third party, we will protect it as set out in this Privacy Policy. If you are a third party providing personal information about somebody else, you represent and warrant that you have such person’s consent to provide the personal information to us.</p>
						<p><strong>Restrict and unsubscribe</strong>: To object to processing for direct marketing/unsubscribe from our email database or opt-out of communications (including marketing communications), please contact us using the details below or opt-out using the opt-out facilities provided in the communication.</p>
						<p><strong>Request for Deletion of Data</strong>: The user at any time may request deletion of data as per Australian law and regulations. The request must be made in writing to support@dostava.com.au and will be actioned within 28 business days. Alternatively, user can delete their account by pressing delete account in their app profile section.</p>
						<p><strong>Correction</strong>: If you believe that any information we hold about you is inaccurate, out of date, incomplete, irrelevant or misleading, please contact us using the details below. We will take reasonable steps to promptly correct any information found to be inaccurate, incomplete, misleading or out of date.</p>
						<p><strong>Complaints</strong>: If you wish to make a complaint, please contact us using the details below and provide us with full details of the complaint. We will promptly investigate your complaint and respond to you, in writing, setting out the outcome of our investigation and the steps we will take in response to your complaint. You also have the right to contact the relevant authority in the country in which you are based.</p>
						<h6>Storage and security</h6>
						<p>We are committed to ensuring that the personal information we collect is secure. In order to prevent unauthorised access or disclosure, we have put in place suitable physical, electronic and managerial procedures, to safeguard and secure personal information and protect it from misuse, interference, loss and unauthorised access, modification and disclosure.</p>
						<p>We cannot guarantee the security of any information that is transmitted to or by us over the Internet. The transmission and exchange of information is carried out at your own risk. Although we take measures to safeguard against unauthorised disclosures of information, we cannot assure you that the personal information we collect will not be disclosed in a manner that is inconsistent with this Privacy Policy.</p>
						<h6>Cookies and web beacons</h6>
						<p>We may use cookies on our online Services from time to time. Cookies are text files placed in your computer's browser to store your preferences. Cookies, by themselves, do not tell us your email address or other personally identifiable information. However, they do allow third parties, such as Google and Facebook, to cause our advertisements to appear on your social media and online media feeds as part of our retargeting campaigns. If and when you choose to provide our online Services with personal information, this information may be linked to the data stored in the cookie.</p>
						<p>You can block cookies by activating the setting on your browser that allows you to refuse the setting of all or some cookies. However, if you use your browser settings to block all cookies (including essential cookies) you may not be able to access all or parts of our online Services.</p>
						<p>We may use web beacons on our online Services from time to time. Web beacons (also known as Clear GIFs) are small pieces of code placed on a web page to monitor the visitor’s behaviour and collect data about the visitor’s viewing of a web page. For example, web beacons can be used to count the users who visit a web page or to deliver a cookie to the browser of a visitor viewing that page.</p>
						<p>We may use Google Analytics to collect and process data. To find out how Google uses data when you use third party websites or applications, please see www.google.com/policies/privacy/partners/ or any other URL Google may use from time to time.</p>
						<h6>Links to other websites</h6>
						<p>Our Services may contain links to other websites. We do not have any control over those websites and we are not responsible for the protection and privacy of any personal information which you provide whilst visiting those websites. Those websites are not governed by this Privacy Policy.</p>
						<h6>Amendments</h6>
						<p>We may, at any time and at our discretion, vary this Privacy Policy by publishing the amended Privacy Policy on our website. We recommend you check our website regularly to ensure you are aware of our current Privacy Policy.
						</p>
						<p><strong>For any questions or notices, please contact our Privacy Officer at:</strong></p>
						<p>Dostava Australia Pty Ltd ABN 52 640 411 098</p>
						<p>Email: support@dostava.com.au </p>
						<p>Last update: 22 June 2020</p>
						<p>&copy; LegalVision ILP Pty Ltd </p>
					</div>				
                </div>			
            </div>		
            </div>
            </section>
      <Footer />


    </Container>
     
      
    )


}



  export default PrivacyPolicy;