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
});
