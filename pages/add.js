import withData from '../lib/withData'
import App from '../components/App'
import DeviceForm from '../components/DeviceForm'

const AddDevice = withData(props => (
  <App pathname={props.url.pathname}>
    <DeviceForm />
  </App>
))

export default AddDevice
