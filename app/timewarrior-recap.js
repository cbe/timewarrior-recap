const {
  parseISO,
  differenceInMinutes,
  formatDuration,
  minutesToHours
} = require("date-fns");

exports.timewarriorRecap = (input) => {
  const activities = convertInputToActivities(input);
  const durationInMinutes = activities.reduce((sum, current) =>
    sum = current.durationInMinutes ? sum + current.durationInMinutes : sum,
    0
  );
  const hours = minutesToHours(durationInMinutes);
  const minutes = durationInMinutes % 60;
  const readableDuration = formatDuration({ hours, minutes })

  return {
    activities,
    summary: {
      durationInMinutes,
      readableDuration
    }
  };
};

const streamlineTags = (tags = []) => tags.sort().join(", ");

const convertInputToActivities = (input) => input
  .filter((interval) => interval.end)
  .map((interval) => {
    const { start: startIso, end: endIso, tags } = interval;
    const start = parseISO(startIso);
    const end = parseISO(endIso);
    const durationInMinutes = Math.abs(differenceInMinutes(start, end));

    return { durationInMinutes, tags };
  })
  .reduce((accumulator, activity) => {
    const { tags, durationInMinutes } = activity;
    const streamlinedTags = streamlineTags(tags);

    const streamlinedTagIntervalIndex = accumulator.findIndex((interval) =>
      streamlineTags(interval.tags) === streamlinedTags
    );
    if (streamlinedTagIntervalIndex >= 0) {
      accumulator[streamlinedTagIntervalIndex].durationInMinutes =
        accumulator[streamlinedTagIntervalIndex].durationInMinutes + durationInMinutes;
    }
    else {
      accumulator.push(activity);
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
