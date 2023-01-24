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
    })
    .reduce((accumulator, currentValue) => {
      const { tags, durationInMinutes } = currentValue;
      const streamlinedTags = streamlineTags(tags);

      const streamlinedTagIntervalIndex = accumulator.findIndex((interval) =>
        streamlineTags(interval.tags) === streamlinedTags
      );
      if (streamlinedTagIntervalIndex >= 0) {
        accumulator[streamlinedTagIntervalIndex].durationInMinutes =
          accumulator[streamlinedTagIntervalIndex].durationInMinutes + durationInMinutes;
      }
      else {
        accumulator.push(currentValue);
      }

      return accumulator;
    }, []);
