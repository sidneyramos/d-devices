import { Component, Fragment } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import '../styles/Header.scss'

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { pathname } = this.props;

    console.log(pathname.replace(/([a-z])([A-Z])/g, '$1 $2'))

    return (
      <header>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
          <link href="https://fonts.googleapis.com/css?family=Libre+Franklin|Montserrat|Playfair+Display" rel="stylesheet" />
          <title>D.Devices</title>
        </Head>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand className="site-title" href="/">D<span class="d-dot" />Devices</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem
                className={pathname === '/' && 'is-active'}
              >
                <NavLink
                  href="/"
                >
                  Home
                </NavLink>
              </NavItem>
              <NavItem
                className={pathname === '/add-device' && 'is-active'} 
              >
                <NavLink 
                  href="/add-device"
                >
                    Add Device
                </NavLink>
              </NavItem>
              <NavItem
                className={pathname === '/add-device-type' && 'is-active'}
              >
                <NavLink 
                  href="/add-device-type"
                >
                    Add Device Type
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default Header
