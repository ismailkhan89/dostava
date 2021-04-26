import React , { useState} from "react";
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
    <Card className=" shadow">
         <FlashAlert message={messagealert} color={messagecolor} />
      <CardHeader className="bg-white border-0">
        <Row className="align-items-center">
          <Col xs="8">
            <h3 className="mb-0">{item.brand_name}</h3>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <Form>
          <Row>
            <Col lg="4" md="6" sm="12" xs="12">
              <div className="product-list store-item">
                <img className="img-fluid" src={item.img_url} alt=""></img>
              </div>
            </Col>{" "}
            <Col lg="4" md="6" sm="12" xs="12">
            <div className="product-list store-item">
                {item.brand_name}
                <h3>
                  <span>
                    <strong>{item.title}</strong>
                  </span>
                </h3>
                <p>Stock {item.stock}</p>
                <p>Package Weight : {item.package_weight}</p>
                {/* <Text numberOfLines={1}>{category.title}</Text> */}
                <p>
                  {/* {category.description} */}
                  <span>
                    <strong>{item.title}</strong>
                  </span>
                </p>

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
