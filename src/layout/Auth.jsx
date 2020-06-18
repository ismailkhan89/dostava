import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container, Row } from "reactstrap";
import routes from '../routes.js';

class Auth extends React.Component {
  componentDidMount() {
    document.body.classList.add("bg-default");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }
  getRoutes = routes => {
    return routes.map((prop, keys) => {
        return (
          <Route
            path={prop.path}
            component={prop.component}
            key={keys}
          />
        );
    });
  };
  render() {
    console.log('routes',routes)
    console.log('(routes)',this.getRoutes(routes))
    return (
      <>
        <div className="main-content">
          <Container className="mt--8" fluid>
            <Row className="justify-content-center">
              <Switch>
                {this.getRoutes(routes)}
                </Switch>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default Auth;
