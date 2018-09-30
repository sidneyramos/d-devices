import Link from 'next/link'
import '../styles/Header.scss'

const Header = ({ pathname }) => (
  <header>
    <title>Sample</title>
    <h1 className="site-title">Sample</h1>
    <nav>
      <Link prefetch href='/'>
        <a className={pathname === '/' && 'is-active'}>
          Home
        </a>
      </Link>
      {/*<Link prefetch href='/posts'>
        <a className={pathname === '/posts' && 'is-active'}>
          Posts
        </a>
      </Link>*/}
    </nav>
    <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
    <link href="https://fonts.googleapis.com/css?family=Libre+Franklin|Montserrat|Playfair+Display" rel="stylesheet" />
  </header>
)

export default Header
