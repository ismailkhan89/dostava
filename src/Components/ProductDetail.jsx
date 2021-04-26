import React, {useState} from "react";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Form,
  CardBody,
  Col,
  FormGroup,
  Input,
  Button,
  ListGroup,
  ListGroupItem,
  Badge,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownToggle,
  Modal,
} from "reactstrap";
import { onAddToCart } from "../utils/addtoCart";
import { getItemPrice } from "../utils/pricing";
import FlashAlert from "./FlashAlert";

export default function ProductDetail({ item, configuration }) {
    const [messagealert , setMessage ] = useState('')
  const [messagecolor , setMessagecolor ] = useState('')



  return item ? (
    <Card className="modal-product shadow">
      <FlashAlert message={messagealert} color={messagecolor} />
      <CardBody>
        <Form>
          <Row>
            <Col lg="4" md="6" sm="12" xs="12">
              <div className="product-list store-item">
                <img className="img-fluid" src={item.img_url} alt=""></img>
              </div>
            </Col>{" "}
            <Col lg="8" md="6" sm="12" xs="12">
            <div className="product-list store-item">
                <h2>{item.brand_name}</h2>
                <h3><strong>{item.title}</strong></h3>
                <p><strong>Description</strong>: {item.description}</p>
                <p><strong>Stock</strong> : {item.stock}</p>
                <p><strong>Package Weight</strong> : {item.package_weight}</p>
                <p className="price"> ${getItemPrice(item, configuration)}</p>

                <a className="add-to-cart" href="javascript:void" onClick={(e) => 
                          {onAddToCart(item)
                            setMessage('Added!')
                            setMessagecolor('success');
                            setTimeout(() => {
                            setMessage('')
                            setMessagecolor('')}, 3000)
                          }
                          
                          }>
                  Add to cart
                </a>
              </div>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  ) : (
    <div></div>
  );
}