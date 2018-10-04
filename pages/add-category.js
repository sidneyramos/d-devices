import withData from '../lib/withData'
import App from '../components/App'
import CategoryForm from '../components/CategoryForm'

const AddCategory = withData(props => (
  <App pathname={props.url.pathname}>
    <CategoryForm />
  </App>
))

export default AddCategory
