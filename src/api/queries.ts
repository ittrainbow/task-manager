import { gql } from '@apollo/client'

export const USERS_QUERY = gql`
  query {
    getUsers {
      users {
        name
        email
        _id
      }
    }
  }
`

export const TASKS_QUERY = gql`
  query {
    getTasks {
      tasks {
        assigned
        comments
        creator
        deadline
        description
        name
        status
        _id
        created
        updated
      }
    }
  }
`
