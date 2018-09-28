import { Fragment } from 'react'
import Link from 'next/link'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Slider from 'react-slick'
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion'

// import 'react-accessible-accordion/dist/minimal-example.css';

const DeviceList = ({ data: { loading, error, devices } }) => {
  if (error) return <h1>Error loading devices.</h1>
  if (!loading) {
    console.log(devices)
    return (
      <Fragment>
        {devices.map(device => 
          <div>
            <h1>
              {device.deviceId}
            </h1>
            <p>
              {device.deviceName}
            </p>
          </div>
        )}
      </Fragment>
    )
  }
  return <h2>Loading devices...</h2>
}

export const devices = gql`
  query getDevices {
    devices {
      deviceId
      deviceName
      os
    	passcode
    	chargerCableChecked
    	available
    	category
    	location
    }
  }
`

export default graphql(devices)(DeviceList)
