// import React, {Component, useState, useEffect } from "react";
import Footer from '../Views/Footer.jsx';
import Header from '../Views/Header';



import ReactDOM from 'react-dom';



import { server_url } from  "../config/config";


// import { Form, FormControl, Accordion, Card } from 'react-bootstrap';
// import Accordion from 'react-bootstrap/Accordion'

import {Link, useRouteMatch, useParams } from 'react-router-dom';




import React, {Component, useState, useEffect , useContext } from "react";
// import ReactDOM from 'react-dom';
import {
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
import { Form, FormControl ,Accordion,Card , useAccordionToggle  } from 'react-bootstrap';
 import AccordionContext from "react-bootstrap/AccordionContext";


import { Redirect , useHistory  } from "react-router-dom";

function Accord(props){ 

    function ContextAwareToggle({ children, eventKey, callback }) {
        const currentEventKey = useContext(AccordionContext);
        const decoratedOnClick = useAccordionToggle(
        eventKey,
        () => callback && callback(eventKey),
        );
    
        const isCurrentEventKey = currentEventKey === eventKey;
          
        return (
            <Card.Header onClick={decoratedOnClick} >
                <h6>{children}</h6>
                {isCurrentEventKey ?  <FontAwesome name="minus" ></FontAwesome> : <FontAwesome name="plus"></FontAwesome>}
        </Card.Header>
        );
    }

    return(
    
        



        <AccordionContext.Provider value={props.key}>
            <Accordion defaultActiveKey={"0"}>
                <Card>
               
                    <ContextAwareToggle eventKey={props.key}>{props.head}</ContextAwareToggle>
               
                <Accordion.Collapse eventKey={props.key}>
                    <Card.Body>
                        <p>{props.content}</p>
                        {props.content2 && <p> {props.content2}</p> }
                        {props.content3 && <p> {props.content3}</p> }
                        {props.content4 && <p> {props.content4}</p> }
                        {props.bullentpoints && <ul> {props.bullentpoints.map((d) => <li>{d.title}</li>)} </ul> }
                        </Card.Body>
                </Accordion.Collapse>
                </Card>
            </Accordion>
        </AccordionContext.Provider>

        

        
    ) 
}

export default Accord;