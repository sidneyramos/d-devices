import Link from 'next/link'

const Header = ({ pathname }) => (
  <header>
    <title>Cufflink</title>
    <h1 className="site-title">Cufflink</h1>
    <nav>
      <Link prefetch href='/'>
        <a className={pathname === '/' && 'is-active'}>
          Home
        </a>
      </Link>
      <Link prefetch href='/posts'>
        <a className={pathname === '/posts' && 'is-active'}>
          Posts
        </a>
      </Link>
    </nav>
    <style jsx>{`
      header {
        padding: 24px 32px;
        margin-bottom: 32px;
        text-align: center;
      }
      h1 {
        font-weight: 100;
      }
      nav {
        max-width: 650px;
        margin: 0 auto;
      }
      a {
        font-size: 18px;
        margin-right: 16px;
      }
      .is-active {
        font-weight: bold;
        text-decoration: underline;
      }
      .site-title {
        font-family: 'Playfair Display', serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 40px;
      }
    `}</style>
    <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
    <link href="https://fonts.googleapis.com/css?family=Libre+Franklin|Montserrat|Playfair+Display" rel="stylesheet" />
  </header>
)

export default Header
