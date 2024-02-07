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

export const USER_UPDATE_MUTATION = gql`
  mutation ($_id: String!, $name: String!) {
    userUpdate(_id: $_id, name: $name) {
      name
      error
    }
  }
`

export const CREATE_TASK_MUTATION = gql`
  mutation ($assigned: String!, $creator: String!, $deadline: Float!, $description: String!, $name: String!) {
    taskCreate(assigned: $assigned, creator: $creator, deadline: $deadline, description: $description, name: $name) {
      assigned
      comments
      creator
      created
      deadline
      description
      name
      status
      updated
      _id
    }
  }
`

export const UPDATE_TASK_MUTATION = gql`
  mutation ($_id: String!, $assigned: String!, $comments: [String]!, $deadline: Float!, $status: String!) {
    taskUpdate(_id: $_id, assigned: $assigned, comments: $comments, deadline: $deadline, status: $status) {
      updated
      error
    }
  }
`

export const DELETE_TASK_MUTATION = gql`
  mutation ($_id: String!) {
    taskDelete(_id: $_id) {
      deleted
      error
    }
  }
`
