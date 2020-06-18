import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
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
    Button,
    // Link
} from "reactstrap";
class TestView extends Component {
  render() {
    return (
       <Container className="header-area" fluid>
            <FontAwesome
            className="super-crazy-colors"
            name="home"
            size="xl"
            // spin
            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
        </Container>
    )
  }
}

export default TestView