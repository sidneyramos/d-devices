import gql from "graphql-tag";
import { Mutation, graphql } from "react-apollo";

const addBooking = gql`
  mutation CreateBooking($borrowerName: String!, $borrowerEmail: String!) {
    createBooking(
      data: {
        status: PUBLISHED
        borrowerName: $borrowerName
        borrowerEmail: $borrowerEmail
      }
    ) {
      id
      borrowerName
      borrowerEmail
    }
  }
`;

const BookingForm = () => {
  let borrowerNameInput, borrowerEmailInput;

  return (
    <Mutation mutation={addBooking}>
      {(addBooking, { data }) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              addBooking({ variables: {
                borrowerName: borrowerNameInput.value,
                borrowerEmail: borrowerEmailInput.value
              } });
              borrowerNameInput.value = "";
              borrowerEmailInput.value = "";

            }}
          >
            <input
              ref={node => {
                borrowerNameInput = node;
              }}
            />
            <input
              ref={node => {
                borrowerEmailInput = node;
              }}
            />
            <button type="submit">Add Booking</button>
          </form>
        </div>
      )}
    </Mutation>
  );
};

export default graphql(addBooking)(BookingForm)
