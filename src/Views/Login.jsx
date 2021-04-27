import React, { Component } from "react";
import Footer from "../Views/Footer.jsx";
import Header from "../Views/Header";
import FontAwesome from "react-fontawesome";
import "bootstrap/dist/css/bootstrap.css";
import "../App.css";
import "../Style.css";
import { Redirect } from "react-router-dom";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import {
  login,
  createUser,
  createUserWeb,
  forgotPassword,
} from "../apollo/server";
import { validateFunc } from "../constraints/constraints";

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
  Modal,
  Form,
  FormGroup,
  Input,
  // Link
} from "reactstrap";
import { Link, useRouteMatch, useParams, useHistory } from "react-router-dom";
import { validateEmail } from "../constraints/emailValidate";
const LOGIN = gql`
  ${login}
`;
const CREATE_USER = gql`
  ${createUserWeb}
`;

const FORGOT_PASSWORD = gql`
  ${forgotPassword}
`;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "default",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      emailError: null,
      passwordError: null,
      error: null,
      createEmail: "",
      createPassword: "",
      createEmailErr: "",
      createPasswordErr: "",
      firstNameError: "",
      lastNameErr: "",
      phoneErr: "",
      redirectToReferrer: localStorage.getItem("user-dostava") ? true : false,
      iconEye: "eye-slash",
      RegiconEye: "eye-slash",
      editModal: false,
      forgotEmail: "",
      forgotEmailError: false,
    };
  }

  onBlur = (event, field) => {
    this.setState({
      [field + "Error"]: !validateFunc({ [field]: this.state[field] }, field),
    });
    console.log(" ", this.state.emailError);
  };

  validate = () => {
    // let emailError = !validateFunc({ email: this.state.email }, "email")
    // let passwordError = !validateFunc({ password: this.state.password }, "password")
    // this.setState({ emailError, passwordError })
    // return emailError && passwordError
    this.setState({ emailError: "", passwordError: "" });
    let status = true;
    if (this.state.email === "") {
      this.setState({ emailError: "Email is Required" });
      status = false;
    } else if (validateEmail(this.state.email) !== undefined) {
      this.setState({ emailError: validateEmail(this.state.createEmail) });
      status = false;
    }
    if (this.state.password === "") {
      this.setState({ passwordError: "Password is Required" });
      status = false;
    }
    return status;
  };

  validateRegister = () => {
    this.setState({
      createEmailErr: "",
      createPasswordErr: "",
      firstNameError: "",
      lastNameErr: "",
      phoneErr: "",
    });
    let status = true;
    if (this.state.createEmail === "") {
      this.setState({ createEmailErr: "Email is Required" });
      status = false;
    } else if (validateEmail(this.state.createEmail) !== undefined) {
      this.setState({ createEmailErr: validateEmail(this.state.createEmail) });
      status = false;
    }
    if (this.state.createPassword === "") {
      this.setState({ createPasswordErr: "Password is Required" });
      status = false;
    }
    if (this.state.firstName === "") {
      this.setState({ firstNameError: "FirstName is Required" });
      status = false;
    }
    if (this.state.lastName === "") {
      this.setState({ lastNameErr: "LastName is Required" });
      status = false;
    }
    if (this.state.phone === "") {
      this.setState({ phoneErr: "Phone is Required" });
      status = false;
    }
    return status;
  };

  onChangeIcon = () => {
    if (this.state.iconEye === "eye") {
      this.setState({ iconEye: "eye-slash" });
    } else {
      this.setState({ iconEye: "eye" });
    }
  };

  CreateonChangeIcon = () => {
    if (this.state.RegiconEye === "eye") {
      this.setState({ RegiconEye: "eye-slash" });
    } else {
      this.setState({ RegiconEye: "eye" });
    }
  };

  toggleModal = () => {
    this.setState({
      editModal: !this.state.editModal,
    });
  };

  validateForgot = () => {
    // this.setState({})
    if (this.state.forgotEmail === "") {
      this.setState({
        forgotEmailError: true,
      });
      return false;
    }
    return true;
  };
  render() {
    console.log("asd>>>", this.props);
    console.log("inside HomePage");
    const MenuItems = ["About us", "Contact Us", "Gallery", "My Account"];
    const listItems = MenuItems.map((items, keys) => (
      <li key={keys}>{items}</li>
    ));
    const MainMenu = [
      "Meets",
      "Greens",
      "Snacks",
      "Cleaning",
      "Bakery",
      "and many more..",
    ];
    const MenuList = MainMenu.map((items, keys) => <li key={keys}>{items}</li>);

    let { from } = this.props.location.state || { from: { pathname: "/" } };
    // let { from } = { from: { pathname: "/" } };
    console.log("fromfrom", from);
    let { redirectToReferrer } = this.state;
    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <Container className="wrapper" fluid>
        <Header {...this.props} title="Login" />

        <Container className="breadcrumb-area" fluid>
          <Row>
            <Col lg="3"></Col>
            <Col lg="3" md="12" sm="12" xs="12" className="breadcrumb-section">
              <h3>Login</h3>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>

                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>

        <Container className="content-area" fluid>
          <Row>
            <Col lg="2"></Col>
            <Col lg="4" md="6" sm="6" xs="12">
              <div className="form-area">
                <h2>Login your Account</h2>
                <h3>
                  Login to your account to discovery all great features in this
                  item
                </h3>
                <form>
                  <div className="form-group">
                    {/* <input type="text" placeholder="Username"></input> */}
                    <input
                      value={this.state.email}
                      onChange={(event) => {
                        this.setState({
                          email: event.target.value,
                          emailError: "",
                        });
                      }}
                      onBlur={(event) => {
                        this.onBlur(event, "email");
                        this.state.email === "" &&
                          this.setState({ emailError: "Email is Required" });
                        this.state.email !== "" &&
                          this.setState({
                            emailError: validateEmail(this.state.email),
                          });
                        // if( this.state.email !== "" )
                        // { let result = validateEmail(this.state.email)
                        //   !result && this.setState({ emailError : "Invalid email"})}
                      }}
                      placeholder="Email"
                      type="email"
                    ></input>
                    <span className="register-err">
                      {this.state.emailError}
                    </span>
                  </div>
                  <div className="form-group">
                    <FontAwesome
                      style={{
                        position: "absolute",
                        right: "48px",
                        top: "230px",
                      }}
                      onClick={() => this.onChangeIcon()}
                      name={this.state.iconEye}
                      size={"sm"}
                    />
                    <input
                      value={this.state.password}
                      onChange={(event) => {
                        this.setState({
                          password: event.target.value,
                          passwordError: "",
                        });
                      }}
                      onBlur={(event) => {
                        this.onBlur(event, "password");
                        this.state.password === "" &&
                          this.setState({
                            passwordError: "Password is Required",
                          });
                      }}
                      placeholder="Password"
                      type={this.state.iconEye === "eye" ? "text" : "password"}
                    ></input>

                    <span className="register-err">
                      {this.state.passwordError}
                    </span>
                  </div>
                  <div className="form-group">
                    <label>{/* Keep me logged in */}</label>
                    <a href="javacript:;" onClick={() => this.toggleModal()}>
                      Forgot password?
                    </a>
                  </div>
                  <div className="text-center">
                    <Mutation
                      mutation={LOGIN}
                      onCompleted={(data) => {
                        console.log("LOGIN res", data);
                        localStorage.setItem(
                          "user-dostava",
                          JSON.stringify(data.login)
                        );
                        this.setState({
                          redirectToReferrer: true,
                          emailError: null,
                          passwordError: null,
                        });
                      }}
                      onError={(error) => {
                        console.log("Login Errorrrr :", error);
                        this.setState({
                          emailError: null,
                          passwordError: null,
                          error: error.graphQLErrors[0].message,
                        });
                      }}
                    >
                      {(login, { loading, error }) => {
                        return (
                          <>
                            <Button
                              className="my-4"
                              color="primary"
                              type="button"
                              onClick={() => {
                                console.log("onClick res");
                                this.setState({
                                  emailError: null,
                                  passwordError: null,
                                });
                                let user = {
                                  email: this.state.email,
                                  password: this.state.password,
                                  type: this.state.type,
                                };
                                if (this.validate())
                                  login({ variables: { ...user } });

                                // adminLogin(this.state.email, this.state.password)
                              }}
                            >
                              Login
                            </Button>
                            <br />
                            {!!error && (
                              <span style={{ color: "red" }}>
                                {error.graphQLErrors[0].message}
                              </span>
                            )}
                          </>
                        );
                      }}
                    </Mutation>
                  </div>
                  <div className="form-group">
                    {/* <input type="submit" value="Login" /> */}
                  </div>
                  <div
                    className="form-group or-login-with"
                    style={{ display: "none" }}
                  >
                    <p>
                      OR login with
                      <Link to="/about">
                        <FontAwesome name="facebook" />
                      </Link>
                      <Link to="/about">
                        <FontAwesome name="twitter" />
                      </Link>
                      <Link to="/about">
                        <FontAwesome name="google-plus" />
                      </Link>
                      <Link to="/about">
                        <FontAwesome name="instagram" />
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </Col>
            <Col lg="4" md="6" sm="6" xs="12">
              <div className="form-area register">
                <h2>Register Account Now</h2>
                <h3>
                  Register to your account to discovery all great features in
                  this item
                </h3>
                <form>
                  <div className="form-group half">
                    <input
                      value={this.state.createEmail}
                      onChange={(event) => {
                        this.setState({
                          createEmail: event.target.value.toLowerCase(),
                          createEmailErr: "",
                        });
                      }}
                      onBlur={(event) => {
                        // this.onBlur(event, 'email')
                        this.state.createEmail === "" &&
                          this.setState({ createEmailErr: "Email Required" });
                        this.state.createEmail !== "" &&
                          this.setState({
                            createEmailErr: validateEmail(
                              this.state.createEmail
                            ),
                          });
                      }}
                      placeholder="Email"
                      type="email"
                    ></input>
                    <span className="register-err">
                      {this.state.createEmailErr}
                    </span>
                  </div>
                  <div className="form-group half">
                    <input
                      value={this.state.createPassword}
                      onChange={(event) => {
                        this.setState({
                          createPassword: event.target.value,
                          createPasswordErr: "",
                        });
                      }}
                      onBlur={(event) => {
                        this.onBlur(event, "password");
                        this.state.createPassword === "" &&
                          this.setState({
                            createPasswordErr: "Password Required",
                          });
                      }}
                      placeholder="Create Password"
                      type={
                        this.state.RegiconEye === "eye" ? "text" : "password"
                      }
                    ></input>
                    <FontAwesome
                      style={{
                        position: "absolute",
                        right: "65px",
                        top: "158px",
                      }}
                      onClick={() => this.CreateonChangeIcon()}
                      name={this.state.RegiconEye}
                      size={"sm"}
                    />

                    <span className="register-err">
                      {this.state.createPasswordErr}
                    </span>
                  </div>
                  <div className="form-group half">
                    <input
                      value={this.state.firstName}
                      onChange={(event) => {
                        this.setState({
                          firstName: event.target.value,
                          firstNameError: "",
                        });
                      }}
                      onBlur={(event) => {
                        this.onBlur(event, "firstName");
                        this.state.firstName === "" &&
                          this.setState({
                            firstNameError: "FirstName Required",
                          });
                      }}
                      placeholder="First Name"
                      type="text"
                    ></input>
                    <span className="register-err">
                      {this.state.firstNameError}
                    </span>
                  </div>
                  <div className="form-group half">
                    <input
                      value={this.state.lastName}
                      onChange={(event) => {
                        this.setState({
                          lastName: event.target.value,
                          lastNameErr: "",
                        });
                      }}
                      onBlur={(event) => {
                        this.onBlur(event, "lastName");
                        this.state.lastName === "" &&
                          this.setState({ lastNameErr: "LastName Required" });
                      }}
                      placeholder="Last Name"
                      type="text"
                    ></input>
                    <span className="register-err">
                      {this.state.lastNameErr}
                    </span>
                  </div>

                  <div className="form-group half">
                    <input
                      value={this.state.phone}
                      onChange={(event) => {
                        if (event.target.value.length <= 11) {
                          this.setState({
                            phone: event.target.value,
                            phoneErr: "",
                          });
                        }
                      }}
                      onBlur={(event) => {
                        this.onBlur(event, "phone");
                        this.state.phone === "" &&
                          this.setState({ phoneErr: "Phone Required" });
                      }}
                      placeholder="Phone"
                      type="number"
                    ></input>
                    <span className="register-err">{this.state.phoneErr}</span>
                  </div>

                  <div className="form-group">
                    <label>
                      <input type="checkbox"></input>I accept the terms and
                      conditions, including the Privacy Policy
                    </label>
                  </div>
                  <div className="text-center">
                    <Mutation
                      mutation={CREATE_USER}
                      onCompleted={(data) => {
                        console.log("CREATE_USER res", data);
                        localStorage.setItem(
                          "user-dostava",
                          JSON.stringify(data.createUserWeb)
                        );
                        this.setState({
                          redirectToReferrer: true,
                          emailError: null,
                          passwordError: null,
                        });
                      }}
                      onError={(error) => {
                        this.setState({
                          emailError: null,
                          passwordError: null,
                          error: error.graphQLErrors[0].message,
                        });
                      }}
                    >
                      {(createUser, { loading, error }) => {
                        return (
                          <>
                            <Button
                              className="my-4"
                              color="primary"
                              type="button"
                              onClick={() => {
                                this.setState({
                                  emailError: null,
                                  passwordError: null,
                                });
                                let userInput = {
                                  phone: this.state.phone,
                                  email: this.state.createEmail,
                                  password: this.state.createPassword,
                                  type: this.state.type,
                                  name: this.state.firstName,
                                  last_name: this.state.lastName,
                                  picture: "",
                                };
                                let notificationToken = null;
                                if (this.validateRegister())
                                  createUser({
                                    variables: {
                                      ...userInput,
                                      notificationToken,
                                    },
                                  });

                                // adminLogin(this.state.email, this.state.password)
                              }}
                            >
                              Register
                            </Button>
                            <br />
                            {!!error && (
                              <span style={{ color: "red" }}>
                                {error.graphQLErrors[0].message}
                              </span>
                            )}
                          </>
                        );
                      }}
                    </Mutation>
                  </div>
                  <div
                    className="form-group or-login-with"
                    style={{ display: "none" }}
                  >
                    <p>
                      OR Register with
                      <Link to="/about">
                        <FontAwesome name="facebook" />
                      </Link>
                      <Link to="/about">
                        <FontAwesome name="twitter" />
                      </Link>
                      <Link to="/about">
                        <FontAwesome name="google-plus" />
                      </Link>
                      <Link to="/about">
                        <FontAwesome name="instagram" />
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </Col>
            <Col lg="2"></Col>
          </Row>
        </Container>

        <Modal
          className="modal-dialog-centered modal-forgot"
          size={"lg"}
          isOpen={this.state.editModal}
          toggle={() => {
            this.toggleModal();
            this.setState({
              forgotEmailError: false,
            });
          }}
        >
          {/* <OrderDetails row={OrderDetail} configuration={configuration}  /> */}
          {/* <ProductDetail item={ItemDetail} configuration={dataConfig}  /> */}

          <Card className="shadow">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <Col xs="12" style={{ margin: "10px" }}>
                  <h5>Forgot Password</h5>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Mutation
                mutation={FORGOT_PASSWORD}
                onCompleted={(data) => {
                  console.log("forgot res", data);
                }}
                onError={(error) => {
                  console.log("forgot Errorrrr :", error);
                }}
              >
                {(forgotPasswordUser, { loading, error, data }) => {
                  return (
                    <Form>
                      <Row>
                        <Col lg="8">
                          <Input
                            className="form-control-alternative forgot-email"
                            id="forgot-email"
                            type="text"
                            placeholder="Email"
                            onChange={(e) => {
                              this.setState({
                                forgotEmail: e.target.value,
                                forgotEmailError: false,
                              });
                            }}
                          />
                        </Col>

                        <Col lg="4">
                          {!loading ? (
                            <Button
                              className="form-control-alternative form-control"
                              color="primary"
                              type="button"
                              size={"sm"}
                              onClick={() => {
                                console.log("onClick res forgot");

                                if (this.validateForgot()) {
                                  forgotPasswordUser({
                                    variables: {
                                      email: this.state.forgotEmail,
                                    },
                                  });
                                }
                              }}
                            >
                              Submit
                            </Button>
                          ) : (
                            "Loading..."
                          )}
                          <br />
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          {data &&  (
                            <div className="form-group">
                              <span
                                style={{ color: "green", fontSize: "15px" }}
                              >
                                Please Check your email for further..
                              </span>
                            </div>
                          )}
                          {this.state.forgotEmailError && (
                            <div className="form-group">
                              <span style={{ color: "red", fontSize: "13px" }}>
                                Email Required
                              </span>
                            </div>
                          )}

                          {!!error && (
                            <span style={{ color: "red", fontSize: "13px" }}>
                              {error.graphQLErrors[0].message}
                            </span>
                          )}
                        </Col>
                      </Row>
                    </Form>
                  );
                }}
              </Mutation>
            </CardBody>
          </Card>
        </Modal>
        <Footer />
      </Container>
    );
  }
}

export default Login;
