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
import classNames from 'classnames'
import '../styles/DeviceCard.scss'


const DeviceCard = ({ device, toggleModal, toggleBookingModal, category }) => {
  const { bookingQueue } = device;
  const currentBooking = device ? device.bookingQueue[0] : null;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];  
  const bookingReturnDate = (currentBooking && currentBooking.expectedReturnDate) ? new Date(currentBooking.expectedReturnDate) : null;
  const unavailableText = bookingReturnDate ? `Unavailable until ${bookingReturnDate.getDate()} ${months[bookingReturnDate.getMonth()]} ${bookingReturnDate.getFullYear()}` : `Unavailable - no return date specified. Contact admin for help.`;

  const handleClick = (e) => {
    if (e.target.name === 'booking-button') {
      e.preventDefault();
      e.stopPropagation();
    } else {
      toggleModal(device.deviceId, category.slug)
    }
  }

  return (
    <Card
      className="device-card"
      onClick={handleClick}
      >
      <div
        className="device-image"
        style={{
          backgroundImage: `url(${device.image ?
            `https://media.graphcms.com/resize=w:350,h:500,fit:crop/${device.image.handle}` :
            "https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97400&w=350&h=400"})`
        }}
      />
      <CardBody>
        <CardTitle>{device.deviceName}</CardTitle>
        <CardSubtitle>
          <Badge color="light">{device.os}</Badge>
          <Badge color="light">#{device.deviceId}</Badge>
          <Badge color="light">{device.location}</Badge>
        </CardSubtitle>
        {/*<CardText>
          <p>
            <strong>Device No: </strong>{device.deviceId}
          </p>
          <p>
            <strong>Location: </strong>{device.location}
          </p>
      </CardText>*/}
        <p className={classNames('status', {
          'available': !bookingQueue.length,
          'unavailable': bookingQueue.length
        })}>{bookingQueue.length ? unavailableText : "Available"}</p>
        <Button
          color={bookingQueue.length ? "info" : "success"}
          name="booking-button"
          onClick={() => toggleBookingModal(device.deviceId, category.slug)}
          className="booking-button"
        >
          {bookingQueue.length ? "Queue" : "Borrow"}
        </Button>
        {/* <Button onClick={() => toggleModal(device.deviceId, category.slug)}>Info</Button> */}
      </CardBody>
    </Card>
  );
}

export default DeviceCard
