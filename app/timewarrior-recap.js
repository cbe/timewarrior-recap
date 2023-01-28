const { parseISO, differenceInMinutes, formatDuration, minutesToHours } = require("date-fns");

const streamlineTags = (tags = []) => tags.sort().join(", ");

exports.timewarriorRecap = (input) =>
  input
    .filter((interval) => interval.end)
    .map((interval) => {
      const { start: startIso, end: endIso, tags } = interval;
      const start = parseISO(startIso);
      const end = parseISO(endIso);
      const durationInMinutes = Math.abs(differenceInMinutes(start, end));

      return { durationInMinutes, tags };
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
    }, [])
    .map((activity) => {
      const { durationInMinutes, ...rest } = activity;
      const hours = minutesToHours(durationInMinutes);
      const minutes = durationInMinutes % 60;
      const readableDuration = formatDuration({ hours, minutes });

      return {
        ...rest,
        durationInMinutes,
        readableDuration
      };
    });
