const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    jokes: [Joke]!
  }

  type Joke {
    _id: ID
    jokeText: String
    jokeLikedBy: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    jokes(username: String): [Joke]
    joke(jokeId: ID!): Joke
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addJoke(jokeText: String!): Joke
    removeJoke(jokeId: ID!): Joke
  }
`;

module.exports = typeDefs;
