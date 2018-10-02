import { Fragment } from 'react'
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
  Alert
} from 'reactstrap';
import AddDevice from './AddDevice.js';

const categories = gql`
  query getCategories {
    categories {
      id
      name
      slug
    }
  }
`

const DeviceForm = (props) => {
  const {loading, error, categories} = props.data;
  if (error) return <h1>Error loading devices.</h1>

  if (!loading) {
    return (
      <Container>
        <AddDevice categories={categories}/>
      </Container>
    );
  }
  return (
    <Container>
      <h2>Loading form...</h2>
    </Container>
  );

};

export default graphql(categories)(DeviceForm)
