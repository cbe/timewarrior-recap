const { timewarriorRecap } = require("./timewarrior-recap.js");

describe("timewarriorRecap", () => {
  it("should return input", () => {
    expect(timewarriorRecap([])).toMatchObject({activities: []});
  });

  it("should return the tracked duration in minutes", () => {
    const input = [
      { start: "20230123T081500Z", end: "20230123T103000Z" }
    ];

    const {activities} = timewarriorRecap(input);
    expect(activities[0]).toMatchObject(
      { durationInMilliseconds: 8.1e+6 }
    );
  });

  it("should filter intervals that have no end datetime", () => {
    const input = [
      { start: "20230123T123500Z", end: undefined },
      { start: "20230123T123500Z" },
    ];

    const {activities} = timewarriorRecap(input);
    expect(activities).toHaveLength(0);
  });

  it("should merge intervals with the same tags", () => {
    const input = [
      { start: "20230123T081500Z", end: "20230123T103000Z", tags: ["tag1", "tag2"]  },
      { start: "20230123T123000Z", end: "20230123T140000Z", tags: ["tag2", "tag1"]  }
    ];

    const {activities} = timewarriorRecap(input);
    expect(activities).toHaveLength(1);
    expect(activities[0]).toMatchObject(
      { durationInMilliseconds: 1.35e+7, tags: ["tag1", "tag2"] }
    );
  });

  it("should provide a more readable duration", () => {
    const input = [
      { start: "20230123T081500Z", end: "20230123T103000Z" },
      { start: "20230123T123000Z", end: "20230123T140000Z" }
    ];

    const {activities} = timewarriorRecap(input);
    expect(activities).toHaveLength(1);
    expect(activities[0]).toMatchObject(
      { readableDuration: "3 hours 45 minutes" }
    );
  });

  it("should provide total duration", () => {
    const input = [
      { start: "20230123T081500Z", end: "20230123T103040Z", tags: ["tag1"] },
      { start: "20230123T123000Z", end: "20230123T140000Z", tags: ["tag2"] },
      { start: "20230123T140000Z", end: "20230123T153030Z", tags: ["tag1"] },
    ];

    const {summary} = timewarriorRecap(input);
    expect(summary).toMatchObject(
      { durationInMilliseconds: 1.897e+7, readableDuration: "5 hours 16 minutes" }
    );
  });
});
