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

const UserInfo = ({ data: { loading, error, userAccounts } }) => {
  if (error) return <h1>Error loading author.</h1>
  if (!loading) {
    console.log(userAccounts)
    const settings = {
      dots: true,
      arrows: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: "60px",
    };
    return (
      <Fragment>
        <Slider {...settings} className="user-slider">
          {userAccounts.map(user => {
            const presentJob = user.jobs.reduce((total, element) => {
              let res = total;
              if (element.presentPosition) {
                res = element;
              }
              return res;
            }, null);

            console.log(presentJob);
            const pjStartDate = presentJob ? new Date(presentJob.startDate) : null;
            const pjLengthTotalMonth = pjStartDate ? Math.floor(Math.abs(new Date() - pjStartDate) / (1000 * 3600 * 24 * 30)) : null;
            const pjLengthYear = pjLengthTotalMonth ? Math.floor(pjLengthTotalMonth / 12) : null;
            const pjLengthMonths = pjLengthTotalMonth ? pjLengthTotalMonth % 12 : null;

            return (
              <div className='author' key={user.id}>
                <div className='info-header'>
                  <div className='banner'>
                    {
                      user.banner ?
                      <img
                      alt={user.title}
                      src={`https://media.graphcms.com/${user.banner.handle}`}
                      /> :
                      <img
                      alt={user.title}
                      src={`https://media.graphcms.com/lka2L6hyTiK4E54OkEgV`}
                      />
                    }
                  </div>
                  <div className="avatar">
                  {
                    user.avatar ?
                    <img
                    alt={user.name}
                    src={`https://media.graphcms.com/resize=w:100,h:100,fit:crop/${user.avatar.handle}`}
                    /> :
                    <img
                    alt={user.title}
                    src={`https://media.graphcms.com/resize=w:100,h:100,fit:crop/3dLR7IuUQxyIZzBec1A3`}
                    />
                  }
                  </div>
                  <div className="info-container">
                    <h1 className="name">{user.name}</h1>
                    {presentJob &&
                      <div className="present-job">
                        <div className="description">
                          <p className="position">
                          {presentJob.position}
                          </p>
                          <p className="company">
                          {presentJob.company}
                          </p>
                        </div>
                        <div className="date">
                          <p className="length">
                          {`${pjLengthYear} yr ${pjLengthMonths} mo`}
                          </p>
                        </div>
                      </div>
                    }
                    <div className="bio">
                      <p>
                        {user.biography}
                      </p>
                    </div>
                    <div className="experience">
                    <Accordion>
                      <AccordionItem>
                          <AccordionItemTitle>
                              <h3>Simple title</h3>
                          </AccordionItemTitle>
                          <AccordionItemBody>
                              <p>Body content</p>
                          </AccordionItemBody>
                      </AccordionItem>
                    </Accordion>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
        <style jsx>{`
          .author {
            margin-bottom: 10px;

            .info-header {
              position: relative;
              padding: 0 10px;

              .banner {
                height: 200px;
                overflow: hidden;
                position: relative;

                img {
                  height: auto;
                  width: 100%;
                  position: absolute;
                  top: 50%;
                  transform: translateY(-50%);
                }
              }

              .avatar {
                position: absolute;
                border-radius: 50%;
                overflow: hidden;
                margin-top: -60px;
                left: 35px;
                border: 5px solid white;

                img {
                  height: 120px;
                  width: auto;
                }
              }

              .info-container {
                padding: 35px;
                padding-top: 0.67em;
                font-family: 'Libre Franklin', sans-serif;
                background-color: white;
                height: 400px;

                & > div {
                  margin: 10px 0;
                  padding-bottom: 10px;
                  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                }

                .name {
                  font-family: 'Montserrat';
                  padding-left: 145px;
                  margin-top: 0;
                }

                .present-job {
                  float: left;
                  clear: both;
                  width: 100%;

                  p {
                    margin: 0;
                  }

                  .position {
                    color: rgba(0,0,0,0.6);
                  }

                  .company {
                    font-weight: 700;
                    font-size: 18px;
                  }

                  .description {
                    width: 70%;
                    float: left;
                  }

                  .date {
                    width: 30%;
                    float: left;
                    text-align: right;
                    padding-top: 24px;
                    letter-spacing: 0.4px;
                    color: rgba(0, 0, 0, 0.6);
                    font-family: 'Montserrat';
                    font-weight: 700;
                  }

                }

                .bio {
                  clear: both;

                  p {
                    margin: 0;
                    color: #606060;
                  }
                }
              }

            }
          }
        `}</style>
      </Fragment>
    )
  }
  return <h2>Loading author...</h2>
}

export const userAccounts = gql`
  query allUsers {
    userAccounts {
      id
      name
      biography
      avatar {
        handle
      }
      banner {
        handle
      }
      jobs {
        position
        company
        startDate
        endDate
        presentPosition
      }
      connections {
        connectedUser {
          name
        }
      }
      connectedTo {
        owner {
          name
        }
      }
    }
  }
`

export default graphql(userAccounts)(UserInfo)
