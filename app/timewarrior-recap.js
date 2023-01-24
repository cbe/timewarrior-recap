const { parseISO, differenceInMinutes } = require("date-fns");

exports.timewarriorRecap = (input) =>
  input
    .filter((interval) => interval.end)
    .map((interval) => {
      const { start: startIso, end: endIso, tags: givenTags } = interval;
      const start = parseISO(startIso);
      const end = parseISO(endIso);
      const durationInMinutes = Math.abs(differenceInMinutes(start, end));

      return { durationInMinutes, tags: givenTags };
    });
