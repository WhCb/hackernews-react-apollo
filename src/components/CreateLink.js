import React, { Component } from 'react'

// Routing Components
import { withRouter } from 'react-router'

// Utilities
import gql from 'graphql-tag'

// Variables
const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`

class CreateLink extends Component {
  constructor(props) {
    super(props)

    this.state = {
      description: '',
      url: '',  
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  /**
   * 
   */
  handleSubmit() {
    const { history } = this.props
    const { description, url } = this.state

    this.props.client.mutate({ mutation: POST_MUTATION, variables: { description, url } })
      .then(response => {
        console.log('res: ', response)
        history.push('/')
      })
      .catch(err => { console.log('err: ', err) })
    
  }

  render () {
    const { description, url } = this.state

    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            type="text"
            placeholder="A description for the link"
          />

          <input
            className="mb2"
            value={url}
            onChange={e => this.setState({ url: e.target.value })}
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}

export default withRouter(CreateLink)