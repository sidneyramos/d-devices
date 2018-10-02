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

const DeviceCard = ({ device, toggleModal, toggleBookingModal, category }) => (
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
        onClick={() => toggleBookingModal(device.deviceId, category.slug)}
      >
        {device.bookingQueue.length ? "Queue" : "Borrow"}
      </Button>
      <Button onClick={() => toggleModal(device.deviceId, category.slug)}>Info</Button>
    </CardBody>
  </Card>
)

export default DeviceCard
