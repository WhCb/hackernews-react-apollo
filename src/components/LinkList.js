import React, { Component } from 'react'

// Utilities
//import { Query } from 'react-apollo'
import gql from 'graphql-tag'

// Custom Components
import Link from './Link'

// Variables
const FEED_QUERY = gql`
  {
      feed {
        links {
          id
          createdAt
          url
          description
        }
      }
    }
`

/*const linksToRender = [
  {
    id: '1',
    description: 'Prisma turns your database into a GraphQL API 😎',
    url: 'https://www.prismagraphql.com',
  },
  {
    id: '2',
    description: 'The best GraphQL client',
    url: 'https://www.apollographql.com/docs/react/',
  },
]*/

class LinkList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      links: []
    }
  }
  
  /**
   * 
   */
  async componentDidMount() {
    const response = await this.props.client.query({ query: FEED_QUERY })
    
    this.setState({
      links: response.data.feed.links
    })
  }

  /**
   * 
   */
  render() {
    const { links } = this.state

    return (
      <div>
        {links.map(link => <Link key={link.id} link={link} />)}
      </div>
    )

    // return (
    //   <Query query={FEED_QUERY}>
    //     {({ loading, error, data }) => {
    //       if (loading) return <div>Fetching</div>
    //       if (error) return <div>Error</div>
    
    //       const linksToRender = data.feed.links
    
    //       return (
    //         <div>
    //           {linksToRender.map(link => <Link key={link.id} link={link} />)}
    //         </div>
    //       )
    //     }}
    //   </Query>
    // )
  }
}

export default LinkList