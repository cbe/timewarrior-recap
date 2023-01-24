const { parseISO, differenceInMinutes } = require("date-fns");

exports.timewarriorRecap = (input) =>
  input
    .filter((interval) => interval.end)
    .map((interval) => {
      const { id, start: startIso, end: endIso } = interval;
      const start = parseISO(startIso);
      const end = parseISO(endIso);
      const durationInMinutes = Math.abs(differenceInMinutes(start, end));

      return { id, durationInMinutes };
    });
