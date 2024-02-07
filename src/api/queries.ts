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
