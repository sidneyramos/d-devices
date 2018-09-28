import withData from '../lib/withData'
import App from '../components/App'
import DeviceList from '../components/DeviceList'

const IndexPage = withData(props => (
  <App pathname={props.url.pathname}>
    <DeviceList />
  </App>
))

export default IndexPage
