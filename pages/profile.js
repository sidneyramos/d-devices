import withData from '../lib/withData'
import App from '../components/App'
import Profile from '../components/Profile'

const ProfilePage = withData(props => (
  <App pathname={props.url.pathname}>
    <Profile id={props.url.query.slug} />
  </App>
))

export default ProfilePage
