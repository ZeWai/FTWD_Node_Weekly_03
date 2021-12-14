// Declare the function Auth Challenger that takes in one parameter, the users

const AuthChallenger = (users) => {
  // This will return True or False
  return async (username, password, callback) => {
    // This is the password and username that we receive when prompted by our HTML file.
    const knex = require("knex")({
      client: "postgresql",
      connection: {
        database: "test",
        user: "postgres",
        password: "password",
      },
    });
    try {
      let query = await knex
        .select("username")
        .from("users")
        .where("username", username)
        .where("password", password);
      console.log(query);
      if (query.length === 1) {
        return callback(null, true);
      } else {
        return callback(null, false);
      }
    } catch (err) {
      console.log(err);
      // Logic to see if we can match the username given to a username stored in our JSON file, and if the password matches
    };
  };
};
// This code exports the function we hae just defined.
module.exports = AuthChallenger;
