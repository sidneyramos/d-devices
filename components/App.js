import { Fragment } from 'react'
import 'bootstrap/scss/bootstrap.scss';
import Header from './Header'
import '../styles/App.scss'


const App = ({ children, pathname }) => (
  <Fragment>
    <Header pathname={pathname} />
    <main>
      {children}
    </main>
  </Fragment>
)

export default App
