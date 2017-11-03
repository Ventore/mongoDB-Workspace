const assert = require('assert');

const User = require('../src/user');

describe('Updating a user', (done) => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: 'Joe', likes: 0 });
    joe.save().then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'John');
        done();
      });
  }

  it('model instance set and save', (done) => {
    joe.set('name', 'John');
    assertName(joe.save(), done);
  });

  it('model instance update', (done) => {
    assertName(joe.update({ name: 'John'}), done);
  });

  it('model class update', (done) => {
    assertName(User.update({ name: 'Joe' }, { name: 'John' }), done);
  });

  it('model class updateOne', (done) => {
    assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'John' }), done);
  });

  it('model class updateById', (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'John' }), done);
  });

  it('increment likes by 1', (done) => {
    User.update({ name: 'Joe' }, { $inc: { likes: 1 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.likes === 1);
        done();
      })
  });
});
