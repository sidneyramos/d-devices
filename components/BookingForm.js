import gql from "graphql-tag";
import { Mutation, graphql } from "react-apollo";
import {
  Form,
  Button,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap'

const addBooking = gql`
  mutation CreateBooking($borrowerName: String!, $borrowerEmail: String!, $deviceId: ID!) {
    createBooking(
      data: {
        status: PUBLISHED
        borrowerName: $borrowerName
        borrowerEmail: $borrowerEmail
        device: {
          connect: {
            id: $deviceId
          }
        }
      }
    ) {
      id
      borrowerName
      borrowerEmail
    }
  }
`;

const BookingForm = (props) => {
  let borrowerNameInput, borrowerEmailInput;
  console.log(props);
  return (
    <Mutation mutation={addBooking}>
      {(addBooking, { data }) => (
        <Form
          onSubmit={e => {
            e.preventDefault();
            addBooking({ variables: {
              borrowerName: borrowerNameInput.value,
              borrowerEmail: borrowerEmailInput.value,
              deviceId: props.id
            } });
            borrowerNameInput.value = "";
            borrowerEmailInput.value = "";
          }}
        >
          {/*<input
            ref={node => {
              borrowerNameInput = node;
            }}
          />
          <input
            ref={node => {
              borrowerEmailInput = node;
            }}
          />*/}
          <FormGroup>
            <Label for="borrowerNameInput">Name:</Label>
            <Input
              type="text"
              name="borrowerNameInput"
              id="borrowerNameInput"
              innerRef={node => {
                borrowerNameInput = node;
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="borrowerEmailInput">Email:</Label>
            <Input
              type="text"
              name="borrowerEmailInput"
              id="borrowerEmailInput"
              innerRef={node => {
                borrowerEmailInput = node;
              }}
            />
          </FormGroup>
          <Button type="submit">Add Booking</Button>
        </Form>
      )}
    </Mutation>
  );
};

export default graphql(addBooking)(BookingForm)
