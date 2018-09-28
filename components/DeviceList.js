import { Component, Fragment } from 'react'
import Link from 'next/link'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Slider from 'react-slick'
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion'
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
import BookingForm from './BookingForm.js';
import '../styles/DeviceList.scss'


class DeviceList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false,
      bookingModal: false,
      modalDevice: null,
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.toggleBookingModal = this.toggleBookingModal.bind(this);

  }

  toggleModal(id, categorySlug) {
    const {categories} = this.props.data;
    let device;

    const category = categories.reduce((total,item) => {
      let res = total;
      if (item.slug === categorySlug) {
        res = item;
      }
      return res;
    }, null);

    if (category) {
      device = category.devices.reduce((total, item) => {
        let res = total;
        if (item.deviceId === id) {
          res = item;
        }
        return res;
      }, null);

    }

    this.setState({
      modal: !this.state.modal,
      bookingModal: false,
      modalDevice: device,
    });
  }

  toggleBookingModal(id, categorySlug) {
    const {categories} = this.props.data;
    let device;

    const category = categories.reduce((total,item) => {
      let res = total;
      if (item.slug === categorySlug) {
        res = item;
      }
      return res;
    }, null);

    if (category) {
      device = category.devices.reduce((total, item) => {
        let res = total;
        if (item.deviceId === id) {
          res = item;
        }
        return res;
      }, null);

    }
    this.setState({
      modal: false,
      bookingModal: !this.state.bookingModal,
      modalDevice: device ? device : this.state.modalDevice,
    });
  }

  render() {
    const {loading, error, categories} = this.props.data;
    if (error) return <h1>Error loading devices.</h1>
    if (!loading) {
      // console.log(categories)
      const {modalDevice} = this.state;
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const currentBooking = modalDevice ? modalDevice.bookingQueue[0] : null;
      const bookingReturnDate = (currentBooking && currentBooking.expectedReturnDate) ? new Date(currentBooking.expectedReturnDate) : null;
      return (
        <Fragment>
          <Container className="device-list">
            <Modal isOpen={this.state.bookingModal} toggle={this.toggleBookingModal} className="booking-modal">
              { modalDevice &&
                <Fragment>
                  <ModalHeader>Borrow {modalDevice.deviceName}</ModalHeader>
                  <ModalBody>
                    <BookingForm id={modalDevice.id} />
                  </ModalBody>
                </Fragment>
              }
            </Modal>
            <Modal isOpen={this.state.modal} toggle={this.toggleModal} className="info-modal">
              { modalDevice &&
                <Fragment>
                  <ModalHeader>{modalDevice.deviceName}</ModalHeader>
                  <ModalBody>
                    <p>
                      <Alert color="danger">Please do not update the OS of this device.</Alert>
                    </p>
                    {
                      currentBooking &&
                      <p>
                        <Alert color="warning">
                          <p><strong>Currently borrowed by: </strong>{currentBooking.borrowerName}</p>
                          {
                            bookingReturnDate ?
                            <p>{`Expect it to be available by ${bookingReturnDate.getDate()} ${months[bookingReturnDate.getMonth()]} ${bookingReturnDate.getFullYear()}`}</p> :
                            <p>No return date has been submitted. Contact Admin for help.</p>
                          }
                          {
                            currentBooking.notes &&
                            <p>
                            <strong>Notes: </strong>
                            {currentBooking.notes}
                            </p>
                          }
                        </Alert>
                      </p>
                    }
                    <p><strong>Device No:</strong> {modalDevice.deviceId}</p>
                    <p><strong>OS:</strong> {modalDevice.os}</p>
                    <p><strong>Passcode:</strong> {modalDevice.passcode}</p>
                    <p><strong>System Account:</strong> {modalDevice.systemAccount}</p>
                    <p>
                      <strong>Notes:</strong>
                      <span>
                        {modalDevice.notes}
                      </span>
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={() => this.toggleBookingModal(modalDevice.deviceId, modalDevice.category.name)}>Borrow</Button>
                    <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                  </ModalFooter>
                </Fragment>
                }
            </Modal>
            {categories.map((category) =>
              <Row>
                <Col md="12">
                  <h3>{category.name}</h3>
                </Col>
                {category.devices.map(device =>
                  <Col md="4" className="mb-4">
                    <Card>
                      <CardImg top width="100%" src={device.image ?
                        `https://media.graphcms.com/resize=w:350,h:500,fit:crop/${device.image.handle}` :
                        "https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97500&w=350&h=500"}
                        alt="Card image cap" />
                      <CardBody>
                        <CardTitle>{device.deviceName}</CardTitle>
                        <CardSubtitle>
                        {
                          device.bookingQueue.length ?
                          <Badge color="danger">Unavailable</Badge>
                          :
                          <Badge color="success">Available</Badge>
                        }

                        </CardSubtitle>
                        <CardText>
                          <p>
                            <strong>Device No: </strong>{device.deviceId}
                          </p>
                          <p>
                            <strong>Location: </strong>{device.location}
                          </p>
                        </CardText>
                        <Button
                          color={device.bookingQueue.length ? "info" : "success"}
                          onClick={() => this.toggleBookingModal(device.deviceId, category.slug)}
                        >
                          {device.bookingQueue.length ? "Queue" : "Borrow"}
                        </Button>
                        <Button onClick={() => this.toggleModal(device.deviceId, category.slug)}>Info</Button>
                      </CardBody>
                    </Card>
                  </Col>
                )}
              </Row>
            )}
          </Container>
        </Fragment>
      )
    }
    return <h2>Loading devices...</h2>
  }
}

export const categories = gql`
  query getCategories {
    categories {
      name
      slug
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
  }
`

export default graphql(categories)(DeviceList)
