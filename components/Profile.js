import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Link from 'next/link'
import Markdown from 'react-markdown'

const UserContent = ({ data: { loading, error, userAccount } }) => {
  if (error) return <h1>Error loading post {JSON.stringify(error)}.</h1>
  if (!loading) {
    const connections = userAccount.connections.reduce((total, element) => {
      total.push(element.connectedUser);
      return total;
    }, []);
    const connectedTo = userAccount.connectedTo.reduce((total, element) => {
      total.push(element.owner);
      return total;
    }, []);
    const totalUserConnections = connections.concat(connectedTo);
    return (
      <article>
        <div className='author' key={userAccount.id}>
          <div className='info-header'>
            <img
              alt={userAccount.name}
              src={`https://media.graphcms.com/resize=w:100,h:100,fit:crop/${userAccount.avatar.handle}`}
            />
            <h1>{userAccount.name}</h1>
          </div>
          <p>{userAccount.biography}</p>
          <h3>Connections</h3>
          <ul className="connections-list">
            {totalUserConnections.map(user =>
              <li>
                <div>
                  <Link prefetch href={`/profile?slug=${user.id}`} as={`/profile/${user.id}`}>
                    <a>
                      <img
                      alt={user.name}
                      src={`https://media.graphcms.com/resize=w:100,h:100,fit:crop/${user.avatar.handle}`}
                      />
                    </a>
                  </Link>
                </div>
              </li>
            )}
          </ul>
        </div>
        <style jsx>{`
          .placeholder {
            height: 366px;
            background-color: #eee;
          }

          .connections-list {
            list-style: none;
            padding: 0;

            li {
              float: left;
              margin-right: 10px;
            }
          }
        `}</style>
      </article>
    )
  }
  return <h2>Loading user...</h2>
}

export const singleUser = gql`
  query singleUser($id: ID!) {
    userAccount (where: {
      id: $id
    }) {
      id
      name
      biography
      avatar {
        handle
      }
      connections {
        connectedUser {
          id
          name
          biography
          avatar {
            handle
          }
        }
      }
      connectedTo {
        owner {
          id
          name
          biography
          avatar {
            handle
          }
        }
      }
    }
  }
`

export default graphql(singleUser, {
  options: ({ id }) => ({ variables: { id } })
})(UserContent)
