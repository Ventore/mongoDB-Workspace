const assert = require('assert');

const User = require('../src/user');

describe('Deleting a user', (done) => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: 'Joe'});
    joe.save().then(() => done());
  });


  function assertDelete(operation, done) {
    operation
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  }

  it('model instance remove', (done) => {
    assertDelete(joe.remove(), done);
  });

  it('class method remove', (done) => {
    assertDelete(User.remove({ name: 'Joe' }), done);
  });

  it('class method findOneAndRemove', (done) => {
    assertDelete(User.findOneAndRemove({ name: 'Joe'}), done);
  });

  it('class method findByIdAndRemove', (done) => {
    assertDelete(User.findByIdAndRemove(joe._id), done);
  });
});
