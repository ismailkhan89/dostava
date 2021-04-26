import React from "react";
import {
  Container,
} from "reactstrap";
import Header from "./Header";
import Footer from "./Footer";

const NotFound = (props) => {

  return (
    <Container className="wrapper" fluid>
      <Header {...props} title={"404 | Page not found"} />
      <section id="how-it-works">
        <div className="how-it-works-heading">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2>
                  <strong> 404 | Page not found </strong>
                </h2>
                <hr />
              </div>
            </div>
          </div>
        </div>
        </section>
      <Footer />
    </Container>
  );
};

export default NotFound;
