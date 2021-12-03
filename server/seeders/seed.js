const db = require('../config/connection');
const { User, Joke } = require('../models');
const userSeeds = require('./userSeeds.json');
const jokeSeeds = require('./jokeSeeds.json');

db.once('open', async () => {
  try {
    await Joke.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < jokeSeeds.length; i++) {
      const { _id, jokeLikedBy } = await Joke.create(jokeSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: jokeLikedBy },
        {
          $addToSet: {
            jokes: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
