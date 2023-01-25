const { formatForLogging } = require("./format-for-logging.js");

describe("formatForLogging", () => {
  it("should format an array of objects", () => {
    const input = [
      { tags: ["foo", "bar"], readableDuration: "3 hours 20 minutes" },
      { tags: ["baz", "boom"], readableDuration: "5 minutes" },
    ];

    expect(formatForLogging(input)).toEqual(`
Tags      Duration
--------- ------------------
foo, bar  3 hours 20 minutes
baz, boom 5 minutes`);
  });
});
