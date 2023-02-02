const {
  parseISO,
  differenceInMilliseconds,
  formatDuration,
  millisecondsToMinutes,
  minutesToHours
} = require("date-fns");

exports.timewarriorRecap = (input) => {
  const activities = convertInputToActivities(input);
  const durationInMilliseconds = activities.reduce((sum, current) =>
    sum = current.durationInMilliseconds
      ? sum + current.durationInMilliseconds
      : sum,
    0
  );

  const durationInMinutes = millisecondsToMinutes(durationInMilliseconds);
  const hours = minutesToHours(durationInMinutes);
  const minutes = durationInMinutes % 60;
  const readableDuration = formatDuration({ hours, minutes });

  return {
    activities,
    summary: {
      durationInMilliseconds,
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
    const durationInMilliseconds = Math.abs(differenceInMilliseconds(start, end));

    return { durationInMilliseconds, tags };
  })
  .reduce((accumulator, activity) => {
    const { tags, durationInMilliseconds } = activity;
    const streamlinedTags = streamlineTags(tags);

    const streamlinedTagIntervalIndex = accumulator.findIndex((interval) =>
      streamlineTags(interval.tags) === streamlinedTags
    );
    if (streamlinedTagIntervalIndex >= 0) {
      accumulator[streamlinedTagIntervalIndex].durationInMilliseconds =
        accumulator[streamlinedTagIntervalIndex].durationInMilliseconds + durationInMilliseconds;
    }
    else {
      accumulator.push(activity);
    }

    return accumulator;
  }, [])
  .map((activity) => {
    const { durationInMilliseconds, ...rest } = activity;
    const durationInMinutes = millisecondsToMinutes(durationInMilliseconds);
    const hours = minutesToHours(durationInMinutes);
    const minutes = durationInMinutes % 60;
    const readableDuration = formatDuration({ hours, minutes });

    return {
      ...rest,
      durationInMilliseconds,
      readableDuration
    };
  });
