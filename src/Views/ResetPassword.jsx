import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  UncontrolledAlert,
  Container,
  Row,
} from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { resetPassword } from "../apollo/server";
import { validateFunc } from "../constraints/constraints";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FontAwesome from "react-fontawesome";
const RESET_PASSWORD = gql`
  ${resetPassword}
`;

const ResetPassword = (props) => {

    React.useEffect(() => {
      let paramValue = props.location?.search.replace("?reset=", "") ?? ''
      if(paramValue === ''){
        props.history.push({
            pathname: '*',
        })
      }
      setToken(props.location?.search.replace("?reset=", "") ?? '')
    })


  const [token,setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onBlur = (event, field) => {
    if (field === "password")
      setPasswordError(!validateFunc({ password: password }, "password"));
    else if (field === "confirmPassword")
      setConfirmPasswordError(
        !validateFunc(
          { confirmPassword: confirmPassword, password: password },
          "confirmPassword"
        )
      );
  };
  const validate = () => {
    let ConfirmPasswordError = !validateFunc(
      { password: password, confirmPassword: confirmPassword },
      "confirmPassword"
    );
    let PasswordError = !validateFunc({ password: password }, "password");
    setPasswordError(PasswordError);
    setConfirmPasswordError(ConfirmPasswordError);
    return ConfirmPasswordError && PasswordError;
  };
  const onCompleted = (data) => {
    setConfirmPasswordError(null);
    setPasswordError(null);
    setSuccess("Password has been updated");
  };
  return (
    <Container className="wrapper" fluid>
      <Header {...props} title={"Reset Password"} />
      <section id="how-it-works">
        <div className="how-it-works-heading">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2>
                  <strong> Reset Password </strong>
                </h2>
                <hr />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-center py-5">
            <Col sm="6">
              <Card className="shadow border-0">
                {/* <CardHeader className="bg-transparent pb-5">
                  <div className="text-muted text-center mt-2 mb-3">
                    <small>Reset Password</small>
                  </div>
                </CardHeader> */}
                <CardBody className="px-lg-5 py-lg-5">
                  <Form role="form">
                    <FormGroup
                      className={
                        passwordError === null
                          ? ""
                          : passwordError
                          ? "has-success"
                          : "has-danger"
                      }
                    >
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                             <FontAwesome name={'lock'} size='lg' />
                            {/* <i className="ni ni-lock-circle-open" /> */}
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          value={password}
                          onChange={(event) => {
                            setPassword(event.target.value);
                          }}
                          onBlur={(event) => {
                            onBlur(event, "password");
                          }}
                          placeholder="Password"
                          type="password"
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup
                      className={
                        confirmPasswordError === null
                          ? ""
                          : confirmPasswordError
                          ? "has-success"
                          : "has-danger"
                      }
                    >
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                           <FontAwesome name={'lock'} size='lg' />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          value={confirmPassword}
                          onChange={(event) => {
                            setConfirmPassword(event.target.value);
                          }}
                          onBlur={(event) => {
                            onBlur(event, "confirmPassword");
                          }}
                          placeholder="Confirm Password"
                          type="password"
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="text-center">
                      <Mutation
                        mutation={RESET_PASSWORD}
                        onCompleted={onCompleted}
                        onError={(error) => {
                          setConfirmPasswordError(null);
                          setPasswordError(null);
                          setError(error.networkError.result.errors[0].message);
                        }}
                      >
                        {(resetPassword, { loading, error }) => {
                          return (
                            <Button
                              className="my-4"
                              color="primary"
                              type="button"
                              onClick={() => {
                                setConfirmPasswordError(null);
                                setPasswordError(null);
                                setError(null);
                                setSuccess(null);
                                // let params = new URLSearchParams(
                                //   props.location.search
                                // );
                                // if (validate() && params.get("reset")) {
                                if (validate()) {
                                  resetPassword({
                                    variables: {
                                      password: password,
                                    //   token: params.get("reset"),
                                      token: token,
                                    },
                                  });
                                }
                              }}
                            >
                              Reset
                            </Button>
                          );
                        }}
                      </Mutation>
                    </div>
                    {error && (
                      <UncontrolledAlert color="danger" fade={true}>
                        <span className="alert-inner--text">{error}</span>
                      </UncontrolledAlert>
                    )}
                    {success && (
                      <UncontrolledAlert color="success" fade={true}>
                        <span className="alert-inner--text">{success}</span>
                      </UncontrolledAlert>
                    )}
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </div>
        </div>
      </section>
      <Footer />
    </Container>
  );
};

export default ResetPassword;
