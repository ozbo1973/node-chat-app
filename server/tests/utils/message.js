const expect = require("expect");

const {
  generateMessage,
  generateLocationMessage
} = require("./../../utils/message");

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

describe("generateLocationMessage", () => {
  const from = "testAdmin";
  const lat = 41.2127;
  const lng = -111.9451;
  let msg = generateLocationMessage(from, lat, lng);
  it("Should be an object returned and created At to be number", () => {
    expect(typeof msg).toBe("object");
    expect(typeof msg.createdAt).toBe("number");
  });
  it("Should be the correct url value", () => {
    expect(msg.url).toBe(`http://maps.google.com?q=${lat},${lng}`);
  });
  it("Shoule provide the correct user", () => {
    expect(msg.from).toBe(from);
  });
});
