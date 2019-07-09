import gql from "graphql-tag";
import { Mutation, graphql } from "react-apollo";
import {
  Form,
  Button,
  FormGroup,
  Label,
  Input,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import '../styles/BookingForm.scss'

const addBooking = gql`
  mutation CreateBooking($deviceId: ID!,
    $borrowerName: String!,
    $borrowerEmail: String!,
    $borrowedDate: DateTime!,
    $expectedReturnDate: DateTime!,
    $notes: String!
  ) {
    createBooking(
      data: {
        status: PUBLISHED
        borrowerName: $borrowerName
        borrowerEmail: $borrowerEmail
        borrowedDate: $borrowedDate
        expectedReturnDate: $expectedReturnDate
        notes: $notes
        device: {
          connect: {
            id: $deviceId
          }
        }
      }
    ) {
      borrowerName
      borrowerEmail
      expectedReturnDate
      notes
    }
  }
`;

const BookingForm = (props) => {
  let borrowerNameInput,
      borrowerEmailInput,
      borrowedDateInput,
      notesInput,
      expectedReturnDateInput;
  const { 
    toggleBookingModal,
    headerChildren
   } = props;
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
              notes: notesInput.value,
              deviceId: props.device.id
            } }).then((res) => {
              props.submitBooking(props.device.id, res.data.createBooking, props.device.category.slug);
            });
            borrowerNameInput.value = "";
            borrowerEmailInput.value = "";
            borrowedDateInput.value = "";
            expectedReturnDateInput.value = "";
            notesInput.value = "";
          }}
        >
          <ModalBody>
            {headerChildren}
            <FormGroup>
              <Label for="borrowerNameInput">Name:</Label>
              <Input
                required
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
                required
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
                required
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
                required
                type="date"
                name="expectedReturnDateInput"
                id="expectedReturnDateInput"
                innerRef={node => {
                  expectedReturnDateInput = node;
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="notesInput">Notes:</Label>
              <Input
                type="textarea"
                name="notesInput"
                id="notesInput"
                innerRef={node => {
                  notesInput = node;
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="success" type="submit">Add Booking</Button>
            <Button color="secondary" onClick={toggleBookingModal}>Cancel</Button>
          </ModalFooter>
        </Form>
      )}
    </Mutation>
  );
};

export default graphql(addBooking)(BookingForm)
