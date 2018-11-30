class Users {
  constructor() {
    this.users = [];
  }
  addUsers(userObj) {
    let { id, user, room } = userObj;
    let newUser = { id, user, room };
    this.users.push(newUser);
    return newUser;
  }

  usersList(room) {
    let users = this.users.filter(user => user.room === room);
    return users.map(user => user.user);
  }

  getUser(id) {
    return this.users.filter(user => user.id === id)[0];
  }

  removeUser(id) {
    let removeUser = this.getUser(id);
    if (removeUser) {
      this.users = this.users.filter(user => user.id !== id);
    }
    return removeUser;
  }
}

module.exports = { Users };
