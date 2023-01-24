const { timewarriorRecap } = require("./timewarrior-recap.js");

describe("timewarriorRecap", () => {
  it("should return input", () => {
    expect(timewarriorRecap([])).toEqual([]);
  });

  it("should filter intervals that have no end datetime", () => {
    const input = [
      { id: 3, start: "20230123T081500Z", end: "20230123T103000Z" },
      { id: 2, start: "20230123T123500Z", end: undefined },
      { id: 1, start: "20230123T123500Z" },
    ];

    const result = timewarriorRecap(input);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject(
      { id: 3 }
    );
  });

  it("should return the tracked duration in minutes", () => {
    const input = [
      { id: 1, start: "20230123T081500Z", end: "20230123T103000Z" }
    ];

    const result = timewarriorRecap(input);
    expect(result[0]).toMatchObject(
      { id: 1, durationInMinutes: 135 }
    );
  });
});
