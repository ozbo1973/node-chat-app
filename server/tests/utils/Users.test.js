const expect = require("expect");
const { Users } = require("./../../utils/Users");

let users = new Users();
beforeEach(() => {
  users.users = [
    {
      id: "1",
      user: "jim",
      room: "Node"
    },
    {
      id: "2",
      user: "dave",
      room: "React"
    },
    {
      id: "3",
      user: "sue",
      room: "Node"
    }
  ];
});

describe("Users", () => {
  //addUser test
  it("should create a new user object", () => {
    const users = new Users();
    const user = {
      id: "123",
      user: "brady",
      room: "Football"
    };
    let userList = users.addUsers(user);

    expect(userList).toMatchObject(user);
  });

  //userList test
  it("should give array of users to Node room", () => {
    let list = users.usersList("Node");
    expect(list).toEqual(["jim", "sue"]);
  });
  it("should give array of users to React room", () => {
    let list = users.usersList("React");
    expect(list).toEqual(["dave"]);
  });

  //getUser test
  it("should find a user", () => {
    let foundUser = users.getUser("1");
    expect(foundUser.user).toBe("jim");
  });

  it("should not find a user", () => {
    let foundUser = users.getUser("25");
    expect(foundUser).toBeFalsy();
  });

  //removeUser test
  it("should remove a user", () => {
    let removedUser = users.removeUser("1");
    let list = users.usersList("Node");

    expect(list).toEqual(["sue"]);
    expect(removedUser.user).toBe("jim");
  });

  it("should not remove a user", () => {
    let removedUser = users.removeUser("25");
    let list = users.usersList("Node");

    expect(list).toEqual(["jim", "sue"]);
    expect(removedUser).toBeFalsy();
  });
});
