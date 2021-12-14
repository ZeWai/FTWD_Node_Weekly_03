class NoteService {
  constructor(knex) {
    this.knex = knex;
  }

  add(note, user) {
    let query = this.knex
      .select("id")
      .from("users")
      .where("users.username", user);
      console.log("678",query)
    if (query.length === 1) {
      return this.knex
        .insert({
          content: note,
          users_id: query[0].id,
        })
        .into("notes");
    } else {
      throw new Error(`Cannot add a note to a user that doesn't exist!`);
    }
  }

  list(user) {
    console.log(user)
    return this.knex.select('id').from('users').where('username',user).then((data)=>{
      if (data.length >0){
        return this.knex.select("*").from('notes')
        .ehere('users.id',function(){
          return this.select('id').from('users').where('username',user)
        }).orderBy('id');
            }else{
              throw new Error('Cannot list notes to a non-existing user')
            }
    })
  }
  update(id, note, user) {
    let query = this.knex
      .select("id")
      .from("users")
      .where("users.username", user);

    return query.then((rows) => {
      if (rows.length === 1) {
        return this.knex("notes").where("id", id).update({
          content: note,
        });
      } else {
        throw new Error(`Cannot update a note if the user doesn't exist!`);
      }
    });
  }
  remove(id, user) {
    let query = this.knex
      .select("id")
      .from("users")
      .where("users.username", user);

    return query.then((rows) => {
      if (rows.length === 1) {
        return this.knex("notes").where("id", id).del();
      } else {
        throw new Error(`Cannot remove a note when the user doesn't exist!`);
      }
    });
  }
}

module.exports = NoteService;
