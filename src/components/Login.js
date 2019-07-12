import React, { Component } from 'react'

// Routing Components
import { withRouter } from 'react-router-dom'

// Utilities
import gql from 'graphql-tag'

// Variables
import { AUTH_TOKEN } from '../constants'

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token 
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      login: true, // switch between Login and SignUp
      email: '',
      password: '',
      name: '',
    }

    this._confirm = this._confirm.bind(this)
    this._handleOnSubmit = this._handleOnSubmit.bind(this)
  }

  /**
   * 
   */
  _handleOnSubmit () {
    const { client } = this.props
    const { login, email, password, name } = this.state

    const mutationQuery = login ? LOGIN_MUTATION : SIGNUP_MUTATION

    client.mutate({ mutation: mutationQuery, variables: { email, password, name } })
      .then(({ data }) => { this._confirm({ data }) })
      .catch(err => console.log(err))
  }

  /**
   * 
   * @param {*} param0 
   */
  async _confirm ({ data }) {
    const { history } = this.props
    const { login } = this.state

    const { token } = login ? data.login : data.signup

    this._saveUserData(token)
    history.push('/')
  }

  /**
   * 
   * @param {*} token 
   */
  _saveUserData (token) {
    localStorage.setItem(AUTH_TOKEN, token)
  }
  
  /**
   * 
   */
  render() {
    const { login, email, password, name } = this.state

    return (
      <div>
        <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>

        <div className="flex flex-column">

          {!login && (
            <input
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
              type="text"
              placeholder="Your name"
            />
          )}

          <input
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Your email address"
          />

          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Choose a safe password"
          />
        </div>

        <div className="flex mt3">
          
          <div className="pointer mr2 button" onClick={this._handleOnSubmit}>
            {login ? 'login' : 'create account'}
          </div>
          
          <div className="pointer button" onClick={() => this.setState({ login: !login })}>
            {login ? 'need to create an account?' : 'already have an account?'}
          </div>

        </div>
      </div>
    )
  }
}

export default withRouter(Login)