import React, { useState } from "react";
import {
  Form,
  FormInput,
  FormGroup,
  Button,
  Container,
  Row,
  Col
} from "shards-react";
import axios from "axios";
import { Link } from "react-router-dom";
const Login = () => {
  const [creds, setCreds] = useState({ username: "", password: "" });
  const handleChange = event => {
    setCreds({ ...creds, [event.target.name]: event.target.value });
  };
  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/login", creds)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.id);
      })
      .catch(err => console.log(err.response));
  };

  return (
    <Container className="login-container">
      <Row>
        <Col lg="6">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              PLEASE LOGIN
              <label htmlFor="#username">Username</label>
              <FormInput
                id="#username"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                value={creds.username}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="#password">Password</label>
              <FormInput
                type="password"
                id="#password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={creds.password}
              />
            </FormGroup>
            <Row className="login-btn">
              <Button block squared>
                Login
              </Button>
            </Row>

            <Row className="login-btn">
              <Button tag={Link} to="/users" block squared theme="secondary">
                Sign Up
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
