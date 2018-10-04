import { Component, Fragment } from 'react'
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
import * as filestack from 'filestack-js';

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
    $imageId: ID = "cjmt97ukuf0ry0993nb0x15uv"
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
        image: {
          connect: {
            id: $imageId
          }
        }
      }
    ) {
      deviceId
      deviceName
    }
  }
`;

const uploadImage = gql`
  mutation UploadImage(
    $filename: String!
    $handle: String!
  ){
    createAsset (
      data: {
        status: PUBLISHED,
        fileName: $filename,
        handle: $handle,
        mimeType: "image/jpeg"
      }
    ) {
      id
      url
      handle
    }
  }
`;

class CreateDevice extends Component {
  constructor(props) {
    super(props)

    this.state = {
      formDisabled: false,
    }
  }

  render() {
    // "apiKey": "AJOHJ7rYLSGO94Rs83uoFz"

    // https://www.filestackapi.com/api/store/S3?key=AJOHJ7rYLSGO94Rs83uoFz&path=/9b8d7803f3694b7a93a7978523b5c4a8-master/
    let input = {};

    const handleUploadImage = (gqlUploadImage) => {
        const client = filestack.init('AJOHJ7rYLSGO94Rs83uoFz');

        const resPromise = new Promise((resolve, reject) => {
          if (input['image'].files[0]) {
            client.upload(
              input['image'].files[0],
              {},
              {
                filename: `${input["deviceName"].value.toLowerCase().replace(" ", '-')}-${input["deviceId"].value}`,
                path: "/9b8d7803f3694b7a93a7978523b5c4a8-master/"
              },
              {})
              .then(res => {
                console.log('UPLOAD TO FILESTACK SUCCESS: ', res)
                gqlUploadImage({ variables: {
                  filename: res.filename,
                  handle: res.handle,
                } }).then((result) => {
                  console.log('LINK TO GRAPHCMS SUCCESS: ', result.data.createAsset.id);
                  resolve(result.data.createAsset.id);
                });
              })
              .catch(err => {
                console.log(err)
              });
          } else {
            resolve(null);
          }
        });

        return resPromise;
      }

    return (
      <Mutation mutation={addDevice}>
        {(addDevice, { addDeviceData }) => (
          <Mutation mutation={uploadImage}>
          {(uploadImage, { uploadImageData }) => (
            <Form
              onSubmit={e => {
                e.preventDefault();
                handleUploadImage(uploadImage)
                  .then((res) => {
                    console.log("Upload Image: ", res);
                    addDevice({ variables: {
                      deviceId: input["deviceId"].value,
                      deviceName: input["deviceName"].value,
                      os: input["os"].value,
                      systemAccount: input["systemAccount"].value,
                      passcode: input["passcode"].value,
                      location: input["location"].value,
                      notes: input["notes"].value,
                      categoryId: input["categoryId"].value,
                      imageId: res || "cjmt97ukuf0ry0993nb0x15uv"
                    } }).then((result) => {
                      console.log("Add Device: ", result);
                      input["deviceId"].value = "";
                      input["deviceName"].value = "";
                      input["os"].value = "";
                      input["systemAccount"].value = "";
                      input["passcode"].value = "";
                      input["location"].value = "";
                      input["notes"].value = "";
                      input["categoryId"].value = "";
                      input["image"].value = "";
                    });
                  });
              }}
            >
              {
                ["deviceId", "deviceName", "os", "systemAccount", "passcode", "location", "notes"].map((item) => {
                    const name = item.replace(/([a-z])([A-Z])/g, '$1 $2');
                    return (
                      <FormGroup>
                        <Label for={`${item}Input`}>{`${name[0].toUpperCase()}${name.slice(1)}`}</Label>
                        <Input
                          disabled={this.state.formDisabled}
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
                 disabled={this.state.formDisabled}
                 type="select"
                 name="categorySelect"
                 id="categorySelect"
                 innerRef={node => {
                   input["categoryId"] = node;
                 }}
                 >
                 {this.props.categories.map((item) => <option value={item.id}>{item.name}</option>)}
               </Input>
              </FormGroup>

              <FormGroup>
               <Label for="imageUpload">Image</Label>
               <Input
                 disabled={this.state.formDisabled}
                 type="file"
                 name="imageUpload"
                 id="imageUpload"
                 innerRef={node => {
                   input["image"] = node;
                 }}
                 />
              </FormGroup>
              <Button type="submit">Add Device</Button>
            </Form>
          )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default graphql(addDevice)(CreateDevice)
