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

const addDevice = gql`
  mutation CreateDevice(
    $deviceId: Int!,
    $deviceName: String!,
    $os: String!,
    $systemAccount: String!,
    $passcode: String!,
    $location: String!,
    $notes: String!,
    $categoryId: ID!,
  ) {
    createDevice(
      data: {
        status: PUBLISHED
        deviceId: $deviceId
        deviceName: $deviceName,
        os: $os,
        systemAccount: $systemAccount,
        passcode: $passcode,
        location: $location,
        notes: $notes,
        category: {
          connect: {
            id: $categoryId
          }
        }
      }
    ) {
      deviceId
      deviceName
    }
  }
`;

const CreateDevice = (props) => {
  // "apiKey": "AJOHJ7rYLSGO94Rs83uoFz"

  // https://www.filestackapi.com/api/store/S3?key=AJOHJ7rYLSGO94Rs83uoFz&path=/9b8d7803f3694b7a93a7978523b5c4a8-master/
  let input = {};

  return (
    <Mutation mutation={addDevice}>
      {(addDevice, { data }) => (
        <Form
          onSubmit={e => {
            e.preventDefault();
            addDevice({ variables: {
              deviceId: input["deviceId"].value,
              deviceName: input["deviceName"].value,
              os: input["os"].value,
              systemAccount: input["systemAccount"].value,
              passcode: input["passcode"].value,
              location: input["location"].value,
              notes: input["notes"].value,
              categoryId: input["categoryId"].value
              // deviceId: props.device.id
            } }).then((res) => {
              // console.log(res);
              // props.submitBooking(props.device.id, res.data.createBooking, props.device.category.slug);
            });
            deviceIdInput.value = "";
            deviceNameInput.value = "";
            osInput.value = "";
            systemAccountInput.value = "";
            passcodeInput.value = "";
            locationInput.value = "";
            notesInput.value = "";
          }}
        >
          {
            ["deviceId", "deviceName", "os", "systemAccount", "passcode", "location", "notes"].map((item) => {
                const name = item.replace(/([a-z])([A-Z])/g, '$1 $2');
                return (
                  <FormGroup>
                    <Label for={`${item}Input`}>{`${name[0].toUpperCase()}${name.slice(1)}`}</Label>
                    <Input
                      required={!item === "notes"}
                      type={item === "deviceId" ? "number" : (item === "notes" ? "textarea" : "text")}
                      name={`${item}Input`}
                      id={`${item}Input`}
                      innerRef={node => {
                        input[item] = node;
                      }}
                    />
                  </FormGroup>
                );
              }
            )
          }
          <FormGroup>
           <Label for="categorySelect">Category</Label>
           <Input
             required
             type="select"
             name="select"
             id="categorySelect"
             innerRef={node => {
               input["categoryId"] = node;
             }}
             >
             {props.categories.map((item) => <option value={item.id}>{item.name}</option>)}
           </Input>
          </FormGroup>
          <Button type="submit">Add Booking</Button>
        </Form>
      )}
    </Mutation>
  );
};

export default graphql(addDevice)(CreateDevice)
