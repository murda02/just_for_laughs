import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_JOKE = gql`
  mutation addJoke($jokeText: String!) {
    addJoke(jokeText: $jokeText) {
      _id
      jokeText
    }
  }
`;

export const REMOVE_JOKE = gql`
mutation removeJoke($jokeId: ID!) {
  removeJoke(jokeId: $jokeId){
    _id
  }
}
`;
