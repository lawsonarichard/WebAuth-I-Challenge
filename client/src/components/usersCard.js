import React from "react";
import { Link } from "react-router-dom";
import axiosWithAuth from "../../Utils/axiosWithAuth";

import {
  Col,
  Card,
  CardHeader,
  CardBody,
  Container,
  Button,
  Row
} from "shards-react";

export default function usersCard(props) {
  return (
    <Container className="card-container">
      <Card className="card">
        <CardBody className="card-body">
          <p>User: {props.users.username}</p>
        </CardBody>
      </Card>
    </Container>
  );
}
