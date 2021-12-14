
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').del().then(()=>{
        return knex("users").insert([
        {username: 'admin', password: 'admin'},
        {username: 'user', password: 'password'}
      ])
      .then(()=>{
        return knex("notes").insert([
          {content:"testing admin", user_id: 1},
          {content:"testing users", user_id: 2}
        ])
      })
    });
    })
};
