import withData from '../lib/withData'
import App from '../components/App'
import UserList from '../components/UserList'

const IndexPage = withData(props => (
  <App pathname={props.url.pathname}>
    <UserList />
  </App>
))

export default IndexPage
