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
  mutation CreateBooking($deviceId: ID!, $borrowerName: String!, $borrowerEmail: String!, $borrowedDate: DateTime!, $expectedReturnDate: DateTime!) {
    createBooking(
      data: {
        status: PUBLISHED
        borrowerName: $borrowerName
        borrowerEmail: $borrowerEmail
        borrowedDate: $borrowedDate
        expectedReturnDate: $expectedReturnDate
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
  let borrowerNameInput, borrowerEmailInput, borrowedDateInput, expectedReturnDateInput;
  return (
    <Mutation mutation={addBooking}>
      {(addBooking, { data }) => (
        <Form
          onSubmit={e => {
            e.preventDefault();
            addBooking({ variables: {
              borrowerName: borrowerNameInput.value,
              borrowerEmail: borrowerEmailInput.value,
              borrowedDate: (new Date(borrowedDateInput.value)).toISOString(),
              expectedReturnDate: (new Date(expectedReturnDateInput.value)).toISOString(),
              deviceId: props.id
            } }).then((res) => {
              console.log(res);
            });
            borrowerNameInput.value = "";
            borrowerEmailInput.value = "";
            borrowedDateInput.value = "";
            expectedReturnDateInput.value = "";

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
          <FormGroup>
            <Label for="borrowedDateInput">Borrowed date:</Label>
            <Input
              type="date"
              name="borrowedDateInput"
              id="borrowedDateInput"
              innerRef={node => {
                borrowedDateInput = node;
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="expectedReturnDateInput">Expected return date:</Label>
            <Input
              type="date"
              name="expectedReturnDateInput"
              id="expectedReturnDateInput"
              innerRef={node => {
                expectedReturnDateInput = node;
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
