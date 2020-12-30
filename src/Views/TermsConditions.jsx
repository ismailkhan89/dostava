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






function TermsConditions(props){ 
    return(
      
        <Container className="wrapper" fluid>
            <Header  {...props} title={"Terms Of Use"} />
            <section id="how-it-works">
                <div class="how-it-works-heading">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <h2><strong> WEBSITE TERMS OF USE </strong></h2>
                                <hr/>
                            </div>
                        </div> 
                    </div>
                </div>
                <div class="how-it-work-content terms-condition">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <p>With Dostava, you can purchase products being sold in your local neighbourhood at the push of a button. Before you begin using Dostava, please read these terms and conditions.</p>						
                                <p>These terms and conditions <strong>(Terms)</strong> are entered into between Dostava Australia Pty Ltd ABN 52 640 411 098 (we, us or <strong>our</strong>) and you, together the <strong>Parties</strong> and each a <strong>Party</strong>. These Terms supplement and incorporate our privacy policy, website terms of use and guidelines and code of conduct posted on the Platform.</p>
                                <p>We provide a platform (<strong>Platform</strong>) where customers looking to purchase products (<strong>Customers</strong>) can purchase products from vendors (<strong>Vendors</strong>) and where delivery drivers can deliver products from Vendors to Customers (<strong>Drivers</strong>). The Platform is available at https://www.dostava.com.au/ and via other channels or addresses including our mobile applications.</p>
                                <p>In these Terms, you means (as applicable) (1) the person or entity registered with us as either a Customer or Vendor; or (2) the individual accessing or using the Platform.</p>
                                <p>If you are using the Platform on behalf of your employer or a business entity, <strong>you</strong>, in your individual capacity, represent and warrant that you are authorised to act on behalf of your employer or the business entity and to bind the entity and the entity’s personnel to these Terms.</p>
                                <h6>Acceptance</h6>						
                                <p>You accept these Terms by clicking a box <strong>(Submit Button)</strong> to confirm your acceptance.</p>		
                                <p>You must be 18 years old to use the Platform. </p>
                                <p>We may amend these Terms at any time, by providing written notice to you. By clicking “I accept” or continuing to use the Platform after the notice or 30 days after notification (whichever date is earlier), you agree to the amended terms. If you do not agree to the amendment, you may terminate these Terms in accordance with the Termination clause.</p>
                                <p>If you access or download our mobile application from (1) the Apple App Store, you agree to any Usage Rules set forth in the App Store Terms of Service or (2) the Google Play Store, you agree to the Android, Google Inc. Terms and Conditions including the Google Apps Terms of Service.</p>			
                                <p>We may use Google Maps/Earth mapping services, including Google Maps API(s). Your use of Google Maps/Earth is subject to the Google Maps/Google Earth Additional Terms of Service.</p>	
                                <h6>Platform summary</h6>						
                                <p>We provide the Platform to users (including hosting and maintaining the Platform), assist users to form contracts for the supply of goods and services, process payments between Customers, Vendors and Drivers and provide promotional opportunities for Vendors (together the <strong>Dostava Services</strong>). You understand and agree that we only make available the Platform and the Dostava Services. We are not party to any agreements entered into between Customers, Vendors and Drivers and we have no control over the conduct of Customers, Vendors or Drivers or any other users of the Platform.</p>
                                <p>A Vendor wanting to sell products creates an Account on the Platform and can post listings for each of the products they can sell, including a photograph, a description, and the price (<strong>Listing</strong>). Vendors must not list any illegal items. Vendors must keep pricing information up to date. When creating a Listing, Vendors can choose whether Orders are automatically confirmed, or whether Customers must make an Order Request to request items. The Listing will indicate whether Orders are automatically confirmed or whether an Order Request must be made. We will add our Service Fee on top of the Vendor’s price and this Listing Fee (defined below) will be the amount that a Customer pays for products. More information about payments is covered in the ‘Payments’ clause below.</p>
                                <p>A Customer wanting to buy products creates an Account on the Platform to view and browse Listings. Customers can search by product, or can view a Vendor’s entire online shop containing all of their Listings. Customers will be shown Listings from Vendors within their geographical area.</p>
                                <p>A Customer may add the products from Listings that they wish to purchase, to their cart.</p>
                                <p><span>Automatic confirmation</span>: If products in a Listing can automatically be purchased, the Customer can check out and an <strong>Order</strong> is created. By allowing automatic confirmation of Orders, Vendors confirm that they are legally entitled to and capable of supplying the products described in the Listing.</p>
                                <p><span>Manual confirmation: If Orders are not automatically confirmed</span>, when a Customer checks out, this creates a request to the respective Vendors. The request is an offer from the Customer to the Vendor to buy the product/s described in the Listing (<strong>Order Request</strong>). If any items in an Order Request are not available, Vendors are responsible for contacting Customers and arranging appropriate replacements. If Customers do not agree to replacements, those items will not be included in any Order and the Customer will not be charged the price for those products. If the Vendor accepts the Order Request it becomes an <strong>Order</strong>, and by accepting, the Vendor confirms that it is legally entitled to and capable of supplying the products described in the Order.</p>	
                                <p><span>Packaging and Delivery</span><br/>Vendors are responsible for packing the products selected in an Order, and if selling any freshly prepared food, perishable food, or fragile products, Vendors must provide the products with adequate wrapping and packaging.</p>	
                                <p>Vendors must use the Platform to indicate to a nearby Driver that the products are ready to be delivered. Drivers can accept requests by Vendors to pick up products from Vendors and deliver products to the address the Customer has specified. Delivery periods are set out on the Platform.</p>	
                                <p>Drivers must arrange for their own equipment, such as motorcycles or bicycles, and are responsible for the insurance, petrol and upkeep of such vehicles. While carrying out a delivery, Drivers must not open or otherwise tamper with any products, including by opening any packaging.</p>			
                                <p>Drivers will leave the products at the delivery location specified by a Customer. Title to, as well as risk of loss, damage or deterioration to, any products in an Order will pass to the Customer when the delivery is made.</p>
                                <p>All users must use the Platform to provide updates on the status of the Order so that the other users can see where the Order is up to. Users are encouraged to resolve any issues with Orders externally to the Platform but Users can use the Platform to notify us of any undelivered or incorrect Orders and we may assist to resolve the issue, in accordance with the Refunds and Cancellation Policy below.</p>
                                <h6>Promotional Opportunities </h6>
                                <p>As a Vendor you may also choose to purchase promotional opportunities, such as your Listings being displayed at the top of a search result (<strong>Promotional Opportunity</strong>). Promotional Opportunities are subject to the fees as set out in any Promotional Opportunity offer and displayed on the Platform or otherwise communicated to you. Payment for any Promotional Opportunity must be made in advance. We may, at our discretion, choose to give Vendors discrete Promotional Opportunities as part of their Membership. We do not make any representations, warranties or guarantees that any Promotional Opportunity will be fit for any particular purpose, will achieve any specified result, or will provide any benefit.</p>
                                <h6>Accounts</h6>
                                <p>You must register on the Platform and create an account (<strong>Account</strong>) to access the Platform’s features.</p>
                                <p>You may only have 1 Account as a Vendor, 1 Account as a Customer and/or 1 Account as a Driver on the Platform.</p>
                                <p>You must provide basic information when registering for an Account including your business name, ABN and GST information (if applicable), contact name and email address and you must choose a password.</p>
                                <p>If you are a Vendor or a Driver, we will review your request for an Account before approving the request and before allowing you to choose a password. We may request additional information, including your valid driver’s licence and insurance for Drivers, and details about your shop, products and listing details for Vendors. If you do not provide us with information we reasonably request, we may refuse to create an Account for you. If you provide us with any information which indicates you are not a fit and proper person to be provided with an Account, we may refuse to provide you with an Account, in our sole discretion.</p>
                                <p>Once you have registered an Account, your Account information will be used to create a profile which you may then curate.</p>
                                <p>You agree to provide accurate, current and complete information during the registration process and regularly update such information to keep it accurate, current and complete.</p>
                                <p>Your Account is personal and you must not transfer it to others, except with our written permission.</p>
                                <p>You are responsible for keeping your Account details and your password confidential and you will be liable for all activity on your Account, including purchases made using your Account details. You agree to immediately notify us of any unauthorised use of your Account.</p>
                                <p>We may make access to and use of certain parts of the Platform subject to conditions or requirements, including cancellation history, quality of the products and services and threshold of reviews.</p>
                                <p>When you create an Account as a Vendor, you must also select a membership (<strong>Membership</strong>). You may choose between weekly or monthly membership periods. Membership entitles Vendors to marketing opportunities, and the rest of the inclusions of Membership are set out on the Platform.</p>
                                <h6>Communication</h6>
                                <p>We may contact you via the Platform using in-Account notifications, or via off-Platform communication channels, such as email.</p>
                                <p>Customers, Vendors and Drivers can communicate privately using our private messaging service or offline using the listed contact details once an Order has been made. Customers, Vendors and Drivers must not use the contact details to organise the provision of the products and/or services off the Platform. You must not use the Platform to send unsolicited or indecent messages. </p>
                                <p>Payment</p>
                                <p>It is free for Customers and Drivers to register an Account on the Platform, or for other users to review content on the Platform, including Listings. Vendors can only create Listings when they have an active Membership.</p>
                                <p>As a Customer, you agree to pay the relevant fees set out in the Listing (<strong>Listing Fees</strong>) when an Order Request is accepted. Listing Fees include the Vendor’s price, the delivery fees (set out on the Platform), and our Service Fee.</p>
                                <p>In consideration for providing the Platform, we will charge the service fees as set out on the Platform (<strong>Service Fee</strong>). To the extent permitted by law, our Service Fee is non-refundable and includes the payment processing fee.</p>
                                <p>Upon receipt of the Listing Fees from the Customer, we will hold the Listing Fees on behalf of the Vendor and Driver until such time as they are paid to the Vendor and Driver, refunded to the Customer (if the Customer is entitled to a refund) or paid to us as our Service Fee. We will pay the Listing Fees to the Vendor and Driver on a weekly basis, minus our Service Fee (and, for Vendors, minus merchant services fee which is currently set at 2.00%, minus their Membership Fee if the Membership Fee is not paid within 72 hours after the Payment Date for that month), for all completed deliveries that have taken place that month.</p>
                                <p>If you are a Vendor or Driver, you appoint us as your limited payment collection agent solely for the purpose of accepting the Listing Fees from the relevant Customer. You agree that we will not be required to pay you any amount until we have received the Listing Fees from the relevant Customer, that we will deduct our Service Fee from any Listing Fees we receive and that we may grant refunds to Customers in accordance with these Terms.</p>
                                <p><span>Payment for Memberships</span><br/>As a Vendor you agree to pay the membership fee set out on the Platform (<strong>Membership Fee</strong>) to create Listings and use certain features on the Platform and benefit from your Membership. The Membership Fee will be charged in arrears on a monthly basis on the calendar day corresponding to when you created your Account (<strong>Payment Date</strong>). In some cases, your Payment Date may change, for example, if payment is unable to be processed or if your Membership began on a day not contained in a given month.</p>
                                <p>You must maintain sufficient funds in your account to cover the payment. If the Membership Fee is not paid within 72 hours after the Payment Date, the Membership Fee will be deducted from the Listing Fees paid to Vendors.</p>
                                <p>To the extent permitted by law, the Membership Fee is non-refundable and non-cancellable once paid or deducted.</p>
                                <p>Memberships automatically continue until cancelled in accordance with the cancellation clause below.</p>
                                <p>We may modify our Memberships and the Membership Fees from time to time. Any price changes will apply to you no earlier than 7 days following notice to you. The notice may be provided at any time via email or via notification to your Account. If you do not agree to the price change, you may cancel your Membership in accordance with the cancellation clause below.</p>
                                <p><span>Cancelling Memberships</span><br/>You may cancel your Membership at any time in the Account page section of your Account settings.</p>
                                <p>The cancellation will apply to the next week (for week to week Memberships), or the next month (for month to month Memberships) if you cancel your Membership at least 2 business days before the next Payment Date. </p>
                                <p>If you cancel your Membership less than 2 business days before the next Payment Date, you will be charged the Membership Fee on the next Payment Date and the cancellation will become effective for the following week or month as applicable.</p>
                                <p><span>General</span><br/>We may pre-authorise or charge your payment method for a nominal amount to verify the payment method.</p>
                                <p>We provide a number of payment methods on the Platform, including our third party payment processor, currently Stripe. By making payment through a third party payment processor, you accept the applicable terms and conditions.</p>
                                <p>We may from time to time issue promotional discount codes for the Platform. To claim the discount as a Customer, you must enter the promotional discount code at the time of submitting your Order Request through the Platform. The conditions of use relating to promotional discount codes will be specified on the Platform at the time they are issued.</p>
                                <p>In the absence of fraud or mistake, all payments made are final. If you make a payment by debit card or credit card, you warrant that the information you provide to us is true and complete, that you are authorised to use the debit card or credit card to make the payment, that your payment will be honoured by your card issuer, and that you will maintain sufficient funds in your account to cover the payment.</p>
                                <h6>Refunds and Cancellation Policy</h6>
                                <p>The cancellation, exchange or refund of any services ordered on this Platform is strictly a matter between the relevant Customer and Vendor, subject to the following clauses.</p>
                                <p>If a Customer and Vendor mutually agree to cancel or return (if already delivered) an Order and we are satisfied that the Listing Fees should be returned to the Customer, we will return the Listing Fees (after deducting our Service Fee) to the Customer, provided that the Listing Fees have not yet been paid to the Vendor and Driver.</p>
                                <p>For disputes between Customers and Vendors, we encourage Parties to attempt to resolve disputes (including claims for returns or refunds) with the other Party directly and in good faith, either on the Platform or through external communication methods. In the event that a dispute cannot be resolved through these means, the Parties may choose to resolve the dispute in any manner agreed between the Parties or otherwise in accordance with applicable laws.</p>
                                <h6>Reviews</h6>
                                <p>Customers may review their experience with Vendor and Drivers on the Platform, including the products and/or services (<strong>Review</strong>).</p>
                                <p>Reviews can be viewed by any user and will remain viewable until the relevant Account is removed or terminated.</p>
                                <p>You agree to provide true, fair and accurate information in your Review. If we consider that the Review is untrue, unfair, inaccurate, offensive or inappropriate, we may delete the Review or ban you from posting the Review. We do not undertake to review each Review. To the maximum extent permitted by law, we are not responsible for the content of any Reviews.</p>
                                <p>You may be prompted to write a Review about a Vendor or Driver shortly after you have engaged them through the Platform.</p>
                                <h6>Content</h6>
                                <p>We may allow you to (1) post, upload, publish, send or receive relevant content and information, including and Reviews (<strong>User Content</strong>) on or through our Platform; and/or (2) access and view User Content and the content and information we make available on the Platform (<strong>Dostava Content</strong> and together with User Content, <strong>Content</strong>).</p>
                                <p>Unless otherwise indicated, we own or license all rights, title and interest (including Intellectual Property Rights) in our Platform and all of the Content. Your use of our Platform and your use of and access to any Content does not grant or transfer to you any rights, title or interest in relation to our Platform or the Content.</p>
                                <p>You must not, without the prior written consent of ourselves or the owner of the Content (as applicable) or except as expressly permitted by these Terms, (1) copy or use, in whole or in part, any Content; (2) reproduce, reverse engineer, retransmit, distribute, disseminate, sell, publish, broadcast or circulate any Content to any third party; or (3) breach any Intellectual Property Rights connected with our Platform, including by altering or modifying any of the Content, causing any of the Content to be framed or embedded in another website, or creating derivative works from the Content.</p>
                                <p>Subject to your compliance with these Terms, we grant you a personal, non-exclusive, royalty-free, revocable, worldwide, non-transferable licence to download and use our Platform on your personal device(s) and access and view any Content, in accordance with these Terms.  All other uses are prohibited without our prior written consent.</p>
                                <p>You grant us a non-exclusive, perpetual, irrevocable, worldwide, royalty free, sublicensable and transferable right and licence to use, view, distribute, communicate, copy, store, modify and exploit in any manner the User Content to provide the Platform and promote the Platform in any media or promotional material.</p>
                                <p>You agree that you are solely responsible for all User Content that you make available on or through our Platform.  You represent and warrant that (1) you are either the sole and exclusive owner of all User Content or you have all rights, licences, consents and releases that are necessary to grant to us the rights in such User Content as contemplated by these Terms; and (2) neither the User Content nor the posting, uploading, publication, sending or receiving  of the User Content or our use of the User Content on, through or by means of our Platform will infringe, misappropriate or violate a third party’s Intellectual Property Rights, or rights of publicity or privacy, or result in the violation of any applicable law or regulation.</p>
                                <p>Despite anything to the contrary, to the maximum extent permitted by law, you agree to indemnify us and hold us harmless in respect of any Liability that we may suffer, incur or otherwise become liable for, arising from or in connection with the User Content you make available on or through the Platform, including as a result of an Intellectual Property Breach.</p>
                                <p>The Content is not comprehensive and is for general information purposes only.  It does not take into account your specific needs, objectives or circumstances, and is not advice.  While we use reasonable attempts to ensure the accuracy and completeness of the Content, to the extent permitted by law, we make no representation or warranty regarding the Content. The Content is subject to change without notice. We do not undertake to keep our Platform up-to-date and we are not liable if any Content is inaccurate or out-of-date.</p>
                                <h6>Warranties</h6>
                                <p>You represent, warrant and agree that:</p>
                                <ul class="lower-alpha">
                                    <li>you will not use our Platform, including the Content, in any way that competes with our business;</li>
                                    <li>there are no legal restrictions preventing you from entering into these Terms; </li>
                                    <li>all information and documentation that you provide to us in connection with these Terms is true, correct and complete;</li>
                                    <li>you have not relied on any representations or warranties made by us in relation to the Platform (including as to whether the Platform is or will be fit or suitable for your particular purposes), unless expressly stipulated in these Terms;</li>
                                    <li>you will be responsible for the use of any part of the Platform, and you must ensure that no person uses any part of the Platform: (1) to break any law or infringe any person’s rights (including Intellectual Property Rights) (2) to transmit, publish or communicate material that is defamatory, offensive, abusive, indecent, menacing or unwanted; or (3) in any way that damages, interferes with or interrupts the supply of the Platform;</li>
                                    <li>you will be courteous and polite in all of your dealings with any other user on the Platform; </li>
                                    <li>as a Customer, you will not use the Platform to order any products that are prohibited in your state or territory;</li>
                                    <li>as a Vendor, you are responsible for complying with all laws, rules and regulations which apply to providing the products in your Listings;</li>
                                    <li>as a Vendor or Driver, you will not offer any products or services that you do not intend to honour or cannot provide;</li>
                                    <li>as a Vendor, you have the appropriate licences to provide the products in your Listings;</li>
                                    <li>as a Driver, you are appropriately qualified, and have any required skills, knowledge or training to provide the delivery services; and</li>
                                    <li>where you are a Driver, you are solely responsible for determining which delivery jobs to accept, and the methods or processes of providing the delivery services. You are not our employee and are not entitled to any employment benefits. We do not set your work hours, your schedule or your location. We do not provide you with training or vehicles to provide your delivery services. You are responsible for any taxes payable on any fee you receive for your services.</li>
                                </ul>
                                <p>To the extent permitted by law, we do not make representations or warranties about our Platform including (without limitation) that:</p>
                                <ul class="lower-alpha">
                                    <li>the Platform, Listings and Content are complete, accurate, reliable, up-to-date and suitable for any particular purpose;</li>
                                    <li>access will be uninterrupted, error-free and free from viruses;</li>
                                    <li>it will be secure;</li>
                                    <li>products will be requested by Customers or that Customers will find products in Listings desirable;</li>
                                    <li>any products offered by Vendors are of a particular standard or quality or meet the Listing description.</li>
                                </ul>
                                <p>You read, use, and act on our Platform and the Content at your own risk.</p>
                                <h6>Australian Consumer Law </h6>
                                <p>Certain legislation, including the Australian Consumer Law (<strong>ACL</strong>) in the Competition and Consumer Act 2010 (Cth), and similar consumer protection laws and regulations, may confer you with rights, warranties, guarantees and remedies relating to the provision of the Platform by us to you which cannot be excluded, restricted or modified (<strong>Statutory Rights</strong>).</p>
                                <p>If the ACL applies to you as a consumer, nothing in these Terms excludes your Statutory Rights as a consumer under the ACL. You agree that our Liability for the Platform provided to an entity defined as a consumer under the ACL is governed solely by the ACL and these Terms.</p>
                                <p>Subject to your Statutory Rights, we exclude all express and implied warranties, and all material, work and services (including the Platform) are provided to you without warranties of any kind, either express or implied, whether in statute, at law or on any other basis.</p>
                                <p>As a Customer, the products and services provided by a Vendor may also confer on you certain rights under the ACL.</p>
                                <p>This clause will survive the termination or expiry of these Terms.</p>
                                <h6>Exclusions to liability</h6>
                                <p>Despite anything to the contrary, to the maximum extent permitted by law, we will not be liable for, and you waive and release us from and against, any Liability caused or contributed to by, arising from or connected with:</p>
                                <ul class="lower-alpha">
                                    <li>your or your personnel’s acts or omissions;</li>
                                    <li>any use or application of the Dostava Services by a person or entity other than you, or other than as reasonably contemplated by these Terms; </li>
                                    <li>any aspect of the interaction between Customers, Drivers and Vendors including the products offered by the Vendor or the services offered by the Driver (including any loss of or damage to the products while they are being delivered);</li>
                                    <li>any works, services, goods, materials or items which do not form part of the Dostava Services (as expressed in these Terms), or which have not been provided by us;</li>
                                    <li>any third parties or any goods and services provided by third parties, including customers, end users, suppliers, transportation or logistics providers or other subcontractors which the provision of the Platform may be contingent on, or impacted by;</li>
                                    <li>the Dostava Services being unavailable, or any delay in us providing the Dostava Services to you, for whatever reason; and/or</li>
                                    <li>any event outside of our reasonable control.</li>
                                </ul>
                                <p>This clause will survive the termination or expiry of these Terms.</p>
                                <h6>Limitations on liability</h6>
                                <p>Despite anything to the contrary, to the maximum extent permitted by law:</p>
                                <ul class="lower-alpha">
                                    <li>we will not be liable for Consequential Loss;</li>
                                    <li>our liability for any Liability under these Terms will be reduced proportionately to the extent the relevant Liability was caused or contributed to by your acts or omissions (or that of any of your personnel); and</li>
                                    <li>our aggregate liability for any Liability arising from or in connection with these Terms will be limited to us resupplying the Dostava Services to you or, in our sole discretion, to us repaying you the amount of the Service Fees paid by you to us in respect of the supply of the Dostava Services to which the Liability relates, or where there are no Service Fees paid, $50.</li>
                                </ul>
                                <p>This clause will survive the termination or expiry of these Terms.</p>
                                <h6>Termination</h6>
                                <p>Your Account and these Terms may be terminated by you at any time, using the ‘cancel Account’ functionality (or similar) in your in the Account page section of your Account settings.</p>
                                <p>We may terminate these Terms at any time by giving 7 days’ written notice to you (<strong>Termination for Convenience</strong>).</p>
                                <p>We may suspend your Account or terminate these Terms immediately upon written notice to you, if:</p>
                                <ul class="lower-alpha">
                                    <li>you (or any of your personnel) breach any provision of these Terms and that breach has not been remedied within 5 business days of being notified by us;</li>
                                    <li>as a Vendor or Driver you repeatedly receive negative reviews;</li>
                                    <li>there is any reason outside our control which has the effect of compromising our ability to provide the Dostava Services; or</li>
                                    <li>you are unable to pay your debts as they fall due.</li>
                                </ul>
                                <p>These Terms will terminate immediately upon written notice by you, if we:</p>
                                <ul class="lower-alpha">
                                    <li>are in breach of a material term of these Terms, and that breach has not been remedied within 10 business days of being notified by you; or</li>
                                    <li>are unable to pay our debts as they fall due.</li>
                                </ul>
                                <p>Upon expiry or termination of these Terms:</p>
                                <ul class="lower-alpha">
                                    <li>we will remove your access to the Platform;</li>
                                    <li>we will immediately cease providing the Dostava Services;</li>
                                    <li>we will cancel any existing Orders, and in the case of a Vendor or Driver breach, refund the relevant Customer and in the case of a Customer breach, we will not refund any amounts paid; and</li>
                                    <li>where we terminate the Terms for any reason other than a Termination for Convenience, you also agree to pay us our additional costs arising from, or in connection with, such termination.</li>
                                </ul>
                                <p>Termination of these Terms will not affect any rights or liabilities that a Party has accrued under it.</p>
                                <p>This clause will survive the termination or expiry of these Terms.</p>
                                <h6>Vendor and Driver insurance</h6>
                                <p>As a Vendor or Driver, we may request that you provide evidence of your insurance. Where we do so, we are not confirming that the insurance you have is sufficient or suitable for the products and/or services you choose to provide to Customers. If we do not ask you to provide evidence of insurance this does not indicate that we believe you do not require insurance. You acknowledge and agree it is your responsibility to make your own investigations and receive professional advice on the insurance you require.</p>
                                <h6>Notice regarding Apple</h6>
                                <p>To the extent that you are using or accessing our Platform on an iOS device, you further acknowledge and agree to the terms of this clause. You acknowledge that these Terms are between you and us only, not with Apple Inc. (Apple), and Apple is not responsible for the Platform and any content available on the Platform.</p>
                                <p>Apple has no obligation to furnish you with any maintenance and support services with respect to our Platform.</p>
                                <p>If our mobile application fails to conform to any applicable warranty, you may notify Apple and Apple will refund the purchase price of the mobile application to you. To the maximum extent permitted by applicable law, Apple will have no other warranty obligation whatsoever with respect to the mobile application and any other claims, losses, liabilities, damages, costs or expenses attributable to any failure to conform to any warranty will be our responsibility.</p>
                                <p>Apple is not responsible for addressing any claims by you or any third party relating to our mobile application or your use of our mobile application, including but not limited to (1) product liability claims; (2) any claim that our mobile application fails to conform to any applicable legal or regulatory requirement; and (3) claims arising under consumer protection or similar legislation.</p>
                                <p>Apple is not responsible for the investigation, defence, settlement and discharge of any third-party claim that our mobile application infringes that third party’s intellectual property rights. </p>
                                <p>You agree to comply with any applicable third-party terms when using our mobile application, including any Usage Rules set forth in the Apple App Store Agreement of Service.</p>
                                <p>Apple and Apple’s subsidiaries are third-party beneficiaries of these Terms, and upon your acceptance of these Terms, Apple will have the right (and will be deemed to have accepted the right) to enforce these Terms against you as a third-party beneficiary of these Terms.</p>
                                <p>You hereby represent and warrant that (1) you are not located in a country that is subject to a U.S. Government embargo, or that has been designated by the U.S. Government as a "terrorist supporting" country; and (2) you are not listed on any U.S. Government list of prohibited or restricted parties.</p>
                                <h6>General </h6>
                                <p><strong>Assignment</strong>: You must not assign or deal with the whole or any part of your rights or obligations under these Terms without our prior written consent.</p>
                                <p><strong>Disputes</strong>:  In relation to a dispute, controversy or claim arising from, or in connection with, these Terms (including any question regarding its existence, validity or termination) (<strong>Dispute</strong>) between a Customer and us, or a Vendor and us, a Party may not commence court proceedings relating to a Dispute without first meeting with a senior representative of the other Party to seek (in good faith) to resolve the Dispute. If the Parties cannot agree how to resolve the Dispute at that initial meeting, either Party may refer the matter to a mediator. If the Parties cannot agree on who the mediator should be, either Party may ask the Law Society of Western Australia to appoint a mediator. The mediator will decide the time, place and rules for mediation. The Parties agree to attend the mediation in good faith, to seek to resolve the Dispute. The costs of the mediation will be shared equally between the Parties. Nothing in this clause will operate to prevent a Party from seeking urgent injunctive or equitable relief from a court of appropriate jurisdiction.</p>
                                <p><strong>Force Majeure</strong>: We will not be liable for any delay or failure to perform our obligations under these Terms if such delay is due to any circumstance beyond our reasonable control.</p>
                                <p><strong>Governing law</strong>: These Terms governed by the laws of Western Australia.  Each Party irrevocably and unconditionally submits to the exclusive jurisdiction of the courts operating in Western Australia and any courts entitled to hear appeals from those courts and waives any right to object to proceedings being brought in those courts.</p>
                                <p><strong>Notices</strong>: Any notice given under these Terms must be in writing addressed to us at the address at the end of these Terms or to you at the address in your Account. Any notice may be sent by standard post or email, and will be deemed to have been served on the expiry of 48 hours in the case of post, or at the time of transmission in the case of transmission by email.</p>
                                <p><strong>Relationship of Parties</strong>: These Terms are not intended to create a partnership, joint venture, employment or agency relationship (except to the extent set out in the Payment clause as limited payment collection agent) between the Parties.</p>
                                <p><strong>Severance</strong>: If a provision of these Terms is held to be void, invalid, illegal or unenforceable, that provision is to be read down as narrowly as necessary to allow it to be valid or enforceable, failing which, that provision (or that part of that provision) will be severed from these Terms without affecting the validity or enforceability of the remainder of that provision or the other provisions in these Terms.</p>
                                <h6>Definitions </h6>
                                <p><strong>Consequential Loss</strong> includes any consequential loss, indirect loss, real or anticipated loss of profit, loss of benefit, loss of revenue, loss of business, loss of goodwill, loss of opportunity, loss of savings, loss of reputation, loss of use and/or loss or corruption of data, whether under statute, contract, equity, tort (including negligence), indemnity or otherwise.</p>
                                <p><strong>Intellectual Property</strong> means any domain names, know-how, inventions, processes, trade secrets or confidential information; or circuit layouts, software, computer programs, databases or source codes, including any application, or right to apply, for registration of, and any improvements, enhancements or modifications of, the foregoing.</p>
                                <p><strong>Intellectual Property Rights</strong> means for the duration of the rights in any part of the world, any industrial or intellectual property rights, whether registrable or not, including in respect of Intellectual Property.</p>
                                <p><strong>Intellectual Property Breach</strong> means any breach by you (or any of your Personnel) of any of our Intellectual Property Rights (or any breaches of third party rights including any Intellectual Property Rights of third parties).</p>
                                <p><strong>Liability</strong> means any expense, cost, liability, loss, damage, claim, notice, entitlement, investigation, demand, proceeding or judgment (whether under statute, contract, equity, tort (including negligence), indemnity or otherwise), howsoever arising, whether direct or indirect and/or whether present, unascertained, future or contingent and whether involving a third party or a party to these Terms or otherwise.</p>
                                <p><strong>For any questions or notices, please contact us at:</strong></p>
                                <p>Dostava Australia Pty Ltd ABN 52 640 411 098</p>
                                <p><strong>Email</strong>: <a href="mailto:support@dostava.com.au">support@dostava.com.au</a></p>
                                <p><strong>Last update</strong>: 16 July 2020</p>
                                <p>&copy; LegalVision ILP Pty Ltd</p>
                            </div>				
                        </div>			
                    </div>		
                </div>
            </section>
            <Footer />
        </Container>
     
      
    )


}



  export default TermsConditions;