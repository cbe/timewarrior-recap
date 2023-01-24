const { timewarriorRecap } = require("./timewarrior-recap.js");

describe("timewarriorRecap", () => {
  it("should return input", () => {
    expect(timewarriorRecap([])).toEqual([]);
  });

  it("should return the tracked duration in minutes", () => {
    const input = [
      { start: "20230123T081500Z", end: "20230123T103000Z" }
    ];

    const result = timewarriorRecap(input);
    expect(result[0]).toMatchObject(
      { durationInMinutes: 135 }
    );
  });

  it("should filter intervals that have no end datetime", () => {
    const input = [
      { start: "20230123T123500Z", end: undefined },
      { start: "20230123T123500Z" },
    ];

    const result = timewarriorRecap(input);
    expect(result).toHaveLength(0);
  });

  it("should merge intervals with the same tags", () => {
    const input = [
      { start: "20230123T081500Z", end: "20230123T103000Z", tags: ["tag1", "tag2"]  },
      { start: "20230123T123000Z", end: "20230123T140000Z", tags: ["tag2", "tag1"]  }
    ];

    const result = timewarriorRecap(input);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject(
      { durationInMinutes: 225, tags: ["tag1", "tag2"] }
    );
  });

  it("should provide a more readable duration", () => {
    const input = [
      { start: "20230123T081500Z", end: "20230123T103000Z" },
      { start: "20230123T123000Z", end: "20230123T140000Z" }
    ];

    const result = timewarriorRecap(input);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject(
      { readableDuration: "3 hours 45 minutes" }
    );
  });
});
