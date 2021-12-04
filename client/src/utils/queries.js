import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

// export const QUERY_THOUGHTS = gql`
//   query getThoughts {
//     thoughts {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//     }
//   }
// `;

// export const QUERY_ADD_JOKE = gql`
//   query addJoke($jokeId: ID!) {
//     joke(jokeId: $jokeId) {
//       _id
//       jokeText
//     }
//   }
// `;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;
