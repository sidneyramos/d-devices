import Link from 'next/link'
import '../styles/Header.scss'

const Header = ({ pathname }) => (
  <header>
    <title>D.Devices</title>
    <h1 className="site-title">D<span class="d-dot" />Devices</h1>
    <nav>
      <a href='/'className={pathname === '/' && 'is-active'}>
        Home
      </a>
      <a href="/add" className={pathname === '/add' && 'is-active'}>
        Add Device
      </a>
      <a href='/category/add' className={pathname === '/add-category' && 'is-active'}>
        Add Category
      </a>
    </nav>
    <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
    <link href="https://fonts.googleapis.com/css?family=Libre+Franklin|Montserrat|Playfair+Display" rel="stylesheet" />
  </header>
)

export default Header
