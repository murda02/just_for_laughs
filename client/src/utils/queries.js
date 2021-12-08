import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      jokes {
        _id
        jokeText
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      username
    }
      jokes {
        _id
        jokeText
      }
    }
`;