import gql from "graphql-tag";
import { Mutation, graphql } from "react-apollo";
import {
  Form,
  Button,
  FormGroup,
  Label,
  Input,
  FormText,
  Container
} from 'reactstrap'

const addCategory = gql`
  mutation CreateCategory(
    $name: String!,
    $slug: String!
  ) {
    createCategory(
      data: {
        status: PUBLISHED
        name: $name
        slug: $slug
      }
    ) {
      id
    }
  }
`;

const CategoryForm = (props) => {
  let nameInput,
      slugInput;
  return (
    <Container className="category-form">
      <Mutation mutation={addCategory}>
        {(addCategory, { data }) => (
          <Form
            onSubmit={e => {
              e.preventDefault();
              addCategory({ variables: {
                name: nameInput.value,
                slug: slugInput.value || nameInput.value.toLowerCase().replace(" ", "-")
              } }).then((res) => {
                console.log(res);
              });
              nameInput.value = "";
              slugInput.value = "";
            }}
          >
            <FormGroup>
              <Label for="nameInput">Name</Label>
              <Input
                required
                type="text"
                name="nameInput"
                id="nameInput"
                innerRef={node => {
                  nameInput = node;
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="slugInput">Slug (<i>optional</i>)</Label>
              <Input
                type="text"
                name="slugInput"
                id="slugInput"
                innerRef={node => {
                  slugInput = node;
                }}
              />
            </FormGroup>
            <Button type="submit">Add Category</Button>
          </Form>
        )}
      </Mutation>
    </Container>
  );
};

export default graphql(addCategory)(CategoryForm)
