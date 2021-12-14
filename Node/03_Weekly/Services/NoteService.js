class NoteService {
  constructor(knex) {
    this.knex = knex;
  }

  list(user) {
    console.log(user)
      return this.knex.select('id').from('users').where('username', user).then((data) => {
            if (data.length > 0) {
                return this.knex.select('*').from('notes')
                    .where('users_id', function() {
                        return this.select('id').from('users').where('username', user)
                    }).orderBy('id')
            } else {
                throw new Error('Cannot list notes to a non-existing user')
            }
        })
  }

  add(note, user) {
    return this.knex.select('id').from('users').where('username', user).then((data) => {
            if (data.length > 0) {
                return this.knex('notes').insert({
                    note: note,
                    users_id: function() {
                        this.select('id').from('users').where('username', user)
                    },
                    important: false
                }).then(() => this.list(user))
            } else {
                throw new Error('Cannot add notes to a non-existing user')
            }
        })
  }

  update(id, note, user) {
    return this.knex.select('id').from('users').where('username', user).then((data) => {
            if (data.length !== 0) {
                return this.list(user).then((data) => {
                    if (data[id] !== undefined) {
                        return this.knex('notes').where('id', data[id]['id']).update({ note: note })
                    } else throw new Error('Cannot update notes of an incorrect index')
                }).then(() => this.list(user))
            } else {
                throw new Error('Cannot update notes to a non-existing user')
            }
        })
  }
  remove(id, user) {
     return this.knex.select('id').from('users').where('username', user).then((data) => {
            if (data.length > 0) {
                return this.list(user).then((data) => {
                    if (data[id] !== undefined) {
                        return this.knex('notes').where('id', data[id]['id']).del()
                    } else throw new Error('Cannot remove notes of an incorrect index')
                }).then(() => this.list(user))

            } else {
                throw new Error('Cannot remove notes from a non-existing user')
            }
        })
    }
}

module.exports = NoteService;
