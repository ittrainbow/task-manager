import { gql } from '@apollo/client'

export const SIGNUP_MUTATION = gql`
  mutation ($name: String!, $email: String!, $password: String!) {
    userCreate(name: $name, email: $email, password: $password) {
      _id
      name
      email
      token
      error
    }
  }
`
export const LOGIN_MUTATION = gql`
  mutation ($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      _id
      name
      email
      token
      error
    }
  }
`

export const TOKEN_MUTATION = gql`
  mutation ($token: String!) {
    userAuth(token: $token) {
      _id
      name
      email
      token
      error
    }
  }
`
