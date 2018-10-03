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
import Loader from 'react-loader';

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
      <Loader loaded={false} lines={13} length={20} width={10} radius={20}
        corners={1} rotate={0} direction={1} color="#000" speed={1}
        trail={60} shadow={false} hwaccel={false} className="spinner"
        zIndex={2e9} left="50%" scale={1.00} />
    </Container>
  );

};

export default graphql(categories)(DeviceForm)
