import withData from '../lib/withData'
import App from '../components/App'
import DeviceForm from '../components/DeviceForm'

const IndexPage = withData(props => (
  <App pathname={props.url.pathname}>
    <DeviceForm />
  </App>
))

export default IndexPage
