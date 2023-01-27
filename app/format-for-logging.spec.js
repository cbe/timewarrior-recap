const { formatForLogging } = require("./format-for-logging.js");

describe("formatForLogging", () => {
  it("should format an array of objects", () => {
    const input = [
      { tags: ["foo", "bar"], readableDuration: "3 hours 20 minutes" },
      { tags: ["baz", "boom"], readableDuration: "5 minutes" },
    ];

    expect(formatForLogging(input)).toEqual(`
\x1b[4mTags     \x1b[0m \x1b[4mDuration          \x1b[0m
foo, bar  3 hours 20 minutes
baz, boom 5 minutes`);
  });

  it("should return a helpful message when timerange has no data", () => {
    const input = [];

    expect(formatForLogging(input)).toEqual(`
No filtered data found for given range and/or tag, please check if the following command returns anything:

    timew summary [<range>] [<tag>...]

Usage:

    timew [report] recap [<range>] [<tag>...]`);
  });
});
