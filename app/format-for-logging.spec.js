const { formatForLogging } = require("./format-for-logging.js");

describe("formatForLogging", () => {
  it("should format an array of objects", () => {
    const input = {
      activities: [
        { tags: ["foo", "bar"], readableDuration: "7 hours 20 minutes" },
        { tags: ["baz", "boom"], readableDuration: "5 minutes" },
        { tags: ["boom", "bam"], readableDuration: "9 hours" },
      ],
      summary: {
        readableDuration: "16 hours 25 minutes",
      }
    };

    expect(formatForLogging(input)).toEqual(`
\x1b[4mTags     \x1b[0m \x1b[4mTotal              \x1b[0m
foo, bar  7 hours 20 minutes
baz, boom 5 minutes
boom, bam 9 hours
          \x1b[4m                   \x1b[0m
          16 hours 25 minutes`);
  });

  it("should return a helpful message when timerange has no data", () => {
    const input = {activities: []};

    expect(formatForLogging(input)).toEqual(`
No filtered data found for given range and/or tag, please check if the following command returns anything:

    timew summary [<range>] [<tag>...]

Usage:

    timew [report] recap [<range>] [<tag>...]`);
  });
});
