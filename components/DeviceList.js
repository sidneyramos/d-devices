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
import Loader from 'react-loader';
import BookingForm from './BookingForm.js';
import DeviceCard from './DeviceCard.js';
import Filter from './Filter.js';

import '../styles/DeviceList.scss'


class DeviceList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false,
      bookingModal: false,
      modalDevice: null,
      results: this.props.data.categories,
      bookingSuccess: false,
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.toggleBookingModal = this.toggleBookingModal.bind(this);
    this.getDevice = this.getDevice.bind(this);
    this.submitBooking = this.submitBooking.bind(this);
    this.filterResults = this.filterResults.bind(this);

  }

  getDevice(id, categorySlug) {
    const {results} = this.state;
    let device;

    const category = results.reduce((total,item) => {
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

    return device;
  }

  toggleModal(id, categorySlug) {
    this.setState({
      modal: !this.state.modal,
      bookingModal: false,
      modalDevice: this.getDevice(id, categorySlug),
    });
  }

  toggleBookingModal(id, categorySlug) {
    const device = this.getDevice(id, categorySlug);
    this.setState({
      modal: false,
      bookingModal: !this.state.bookingModal,
      modalDevice: device ? device : this.state.modalDevice,
    });
  }

  submitBooking(deviceId, booking, categorySlug) {
    this.setState((prevState) => {
      let res = [...prevState.results].map((category) => {
        let newCategory = {...category};
        if (newCategory.slug === categorySlug) {
          newCategory.devices = newCategory.devices.map((device) => {
            let newDevice = {...device};
            if (device.id === deviceId) {
              const bookingQueue = [...newDevice.bookingQueue];
              bookingQueue.push(booking);
              newDevice.bookingQueue = bookingQueue;
            }
            return newDevice;
          })
        }
        return newCategory;
      });

      return {
        results: res,
        bookingSuccess: true,
      };
    });

    setTimeout(() => {
      this.setState({
        bookingSuccess: false,
      })
    }, 4000);
  }

  filterResults(results) {
    this.setState({
      results: results,
    });
  }

  componentDidUpdate() {
    if (!this.state.results) {
      this.setState({
        results: this.props.data.categories,
      })
    }
  }

  render() {
    const {loading, error } = this.props.data;
    if (error) return <h1>Error loading devices.</h1>

    if (!loading && this.state.results ) {
      const { modalDevice, results } = this.state;
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
                  <BookingForm 
                    device={modalDevice} 
                    submitBooking={this.submitBooking}
                    toggleBookingModal={this.toggleBookingModal}
                    headerChildren={
                      <Fragment>
                        {this.state.bookingSuccess && <Alert color="success">Successfully submitted booking</Alert>}
                        {!!modalDevice.bookingQueue.length &&
                          <Alert color="warning">
                            <p><strong>Current booking queue: </strong></p>
                            {modalDevice.bookingQueue.map(item => {
                              const returnDate = item.expectedReturnDate ? new Date(item.expectedReturnDate) : null;
                              const bookingDate = returnDate ? `${returnDate.getDate()} ${months[returnDate.getMonth()]} ${returnDate.getFullYear()}` : null;
                              return (
                                <Fragment>
                                  <p>{item.borrowerEmail ? <a href={`mailto:${item.borrowerEmail}`}>{item.borrowerName}</a> : item.borrowerName}{bookingDate && ` - ${bookingDate}`}</p>
                                </Fragment>
                              );
                            })}
                          </Alert>
                        }
                      </Fragment>
                    }
                  />
                </Fragment>
              }
            </Modal>
            <Modal isOpen={this.state.modal} toggle={this.toggleModal} className="info-modal">
              { modalDevice &&
                <Fragment>
                  <ModalHeader>{modalDevice.deviceName}</ModalHeader>
                  <ModalBody>
                    <Alert color="danger">Please do not update the OS of this device.</Alert>
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
                    <Button color={modalDevice.bookingQueue.length ? "info" : "success"} onClick={() => this.toggleBookingModal(modalDevice.deviceId, modalDevice.category.slug)}>{modalDevice.bookingQueue.length ? "Queue" : "Borrow"}</Button>
                    <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                  </ModalFooter>
                </Fragment>
                }
            </Modal>
            <Filter categories={this.props.data.categories} filterResults={this.filterResults}/>
            {results && results.map((category) =>
              <Row>
                <Col md="12">
                  <h3 className="category-title">{category.name}</h3>
                </Col>
                {category.devices.map(device =>
                  <Col md="4" className="mb-4">
                    <DeviceCard
                      device={device}
                      toggleBookingModal={this.toggleBookingModal}
                      toggleModal={this.toggleModal}
                      category={category}
                    />
                  </Col>
                )}
                {
                  !category.devices.length &&
                  <Col md="12">
                    <p>Your search did not return any results.</p>
                  </Col>
                }

              </Row>
            )}
          </Container>
        </Fragment>
      )

      // return <h2>Sample</h2>
    }

    return (
      <Container>
      <Loader loaded={false} lines={13} length={20} width={10} radius={20}
        corners={1} rotate={0} direction={1} color="#000" speed={1}
        trail={60} shadow={false} hwaccel={false} className="spinner"
        zIndex={2e9} left="50%" scale={1.00} />
      </Container>
    );
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
          slug
        }
        image {
          handle
        }
        bookingQueue {
          borrowerName
          borrowerEmail
          expectedReturnDate
          notes
        }
      }
    }
  }
`

export default graphql(categories)(DeviceList)
