const expect = require("expect");

const { generateMessage } = require("./../../utils/message");

describe("generateMessage", () => {
  var msg = generateMessage("bbb", "Hello World!");
  it("Should generate correct message object", () => {
    expect(typeof msg).toBe("object");
  });
  it("Should have correct from to be bbb", () => {
    expect(msg.from).toBe("bbb");
  });
  it("Should have correct text be Hello World!", () => {
    expect(msg.text).toBe("Hello World!");
  });
  it("Should produce createdAt as a number", () => {
    expect(typeof msg.createdAt).toBe("number");
  });
});
