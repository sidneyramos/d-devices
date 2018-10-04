import Link from 'next/link'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import {
  Form,
  Button,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
  Row,
  Col
} from 'reactstrap'

const Filter = (props) => {
  const input = {};
  console.log(props.data.devices);
  console.log(props.client)
  return (
    <Form
      onChange={e => {
        e.preventDefault();
        console.log(`${e.target.name}: ${e.target.value}`);
      }}
    >
      <Row>
        <Col md={4}>
          <FormGroup>
           <Label for="categorySelect">Category</Label>
           <Input
             required
             type="select"
             name="categorySelect"
             id="categorySelect"
             innerRef={node => {
               input["category"] = node;
             }}
             >
              {
                //props.categories.map((category) => <option value={category.id}>{category.name}</option>)
              }
           </Input>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="locationSelect">Location</Label>
            <Input
            required
            type="select"
            name="locationSelect"
            id="locationSelect"
            innerRef={node => {
              input["location"] = node;
            }}
            >
            {
              //props.categories.map((category) => <option value={category.id}>{category.name}</option>)
            }
            </Input>
          </FormGroup>
        </Col>
      </Row>

    </Form>
  );

}

export const devices = gql`
  query getDevices {
    devices {
      id
      deviceId
      deviceName
      os
    	passcode
      location
      notes
      systemAccount
    	category {
        name
        slug
      }
      image {
        handle
      }
      bookingQueue {
        borrowerName
        expectedReturnDate
        notes
      }
    }
  }
`

// export default Filter
export default graphql(devices)(Filter)
