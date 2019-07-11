import { Component } from 'react'
import Link from 'next/link'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import {
  Form,
  Button,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
  Row,
  Col
} from 'reactstrap'

class Filter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      categoryFilter: '',
      locationFilter: '',
      availabilityFilter: '',
    }
    this.filterByCategory = this.filterByCategory.bind(this);
    this.filterByLocation = this.filterByLocation.bind(this);

  }

  filterByCategory(categorySlug) {
    if (!categorySlug) {
      return this.props.categories;
    }

    const results = this.props.data.devices.reduce((total, item) => {
      const res = total;
      if (item.category.slug === categorySlug) {
        res.push(item);
      }
      return res;
    }, []);

    return ([{
      name: "Search Results",
      slug: "search-results",
      devices: results,
    }]);
  }

  filterByLocation(location) {
    if (!location) {
      return this.props.categories;
    }

    const results = this.props.data.devices.reduce((total, item) => {
      const res = total;
      if (item.location === location) {
        res.push(item);
      }
      return res;
    }, []);

    return ([{
      name: "Search Results",
      slug: "search-results",
      devices: results,
    }]);
  }

  filterAll() {
    const results = this.props.data.devices.reduce((total, item) => {
      const res = total;
      let isCategory = true;
      let isLocation = true;
      let isAvailable = true;

      if (this.state.locationFilter) {
        isLocation = this.state.locationFilter === item.location;
      }

      if (this.state.categoryFilter) {
        isCategory = this.state.categoryFilter === item.category.slug;
      }

      if (this.state.availabilityFilter) {
        // is = this.state.categoryFilter === item.category.slug;
        if (this.state.availabilityFilter === "available") {
          isAvailable = !item.bookingQueue.length
        } else if (this.state.availabilityFilter === "unavailable") {
          isAvailable = !!item.bookingQueue.length
        }
      }

      if (isCategory && isLocation && isAvailable) {
        res.push(item);
      }
      // console.log(isCategory)
      // console.log(isLocation)

      return res;
    }, []);

    // console.log(results);
    this.props.filterResults([{
      name: "Filter Results",
      slug: "filter-results",
      devices: results,
    }]);
  }

  render() {
    const {loading, error } = this.props.data;

    if (!loading && this.props.data.devices) {
      const locations = this.props.data.devices.reduce((total, item) => {
        let res = total;

        if (!res.includes(item.location)) {
          res.push(item.location);
        }

        return res;
      }, []);

      return (
        <Form
          onChange={e => {
            e.preventDefault();

            if (e.target.name === "categorySelect") {
              this.setState({
                categoryFilter: e.target.value,
              }, this.filterAll)
            } else if (e.target.name === "locationSelect") {
              this.setState({
                locationFilter: e.target.value,
              }, this.filterAll)
            } else if (e.target.name === "availabilitySelect") {
              this.setState({
                availabilityFilter: e.target.value,
              }, this.filterAll)
            }
          }}
        >
          <Container
            className="filter-list">
            <Row>
              <Col md={12}>
                <h2>Filter by</h2>
              </Col>
              <Col md={4}>
                <FormGroup>
                <Label for="categorySelect">Device Type</Label>
                <Input
                  type="select"
                  name="categorySelect"
                  id="categorySelect"
                  >
                    <option value="">All</option>
                    {
                      this.props.categories.map((category) => <option value={category.slug}>{category.name}</option>)
                    }
                </Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="locationSelect">Location</Label>
                  <Input
                  type="select"
                  name="locationSelect"
                  id="locationSelect"
                  >
                  <option value="">All</option>
                  {
                    locations.map((location) => <option value={location}>{location}</option>)
                  }
                  </Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="availabilitySelect">Availability</Label>
                  <Input
                  type="select"
                  name="availabilitySelect"
                  id="availabilitySelect"
                  >
                    <option value="">All</option>
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </Container>
        </Form>
      );
    }

    return null;

  }
}

export const devices = gql`
  query getDevices {
    devices {
      id
      deviceId
      deviceName
      os
    	passcode
      location
      notes
      systemAccount
    	category {
        name
        slug
      }
      image {
        handle
      }
      bookingQueue {
        borrowerName
        expectedReturnDate
        notes
      }
    }
  }
`

// export default Filter
export default graphql(devices)(Filter)
