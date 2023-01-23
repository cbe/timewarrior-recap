const { timewarriorRecap } = require("./timewarrior-recap.js");

describe("timewarriorRecap", () => {
  it("should return input", () => {
    expect(timewarriorRecap([])).toEqual([]);
  });
});
