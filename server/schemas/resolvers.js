const { AuthenticationError } = require('apollo-server-express');
const { User, Joke } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('jokes');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('jokes');
    },
    jokes: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Joke.find(params).sort({ createdAt: -1 });
    },
    joke: async (parent, { jokeId }) => {
      return Joke.findOne({ _id: jokeId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('jokes');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addJoke: async (parent, args, context) => {
      if (context.user) {
        const joke = await Joke.create({
          jokeText: args.jokeText,
          jokeLikedBy: context.user.username,
        });

        // await User.findOneAndUpdate(
        //   { _id: context.user._id },
        //   { $addToSet: { jokes: joke._id } }
        // );

        return joke;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeJoke: async (parent, { jokeId }, context) => {
      if (context.user) {
        const joke = await Joke.findOneAndDelete({
          _id: jokeId,
          jokeLikedBy: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { jokes: joke._id } }
        );

        return joke;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
