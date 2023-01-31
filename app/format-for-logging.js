const streamlineTagsForLogging = (tags = []) => tags.join(", ");

const underlineString = (string) => `\x1b[4m${string}\x1b[0m`;

const USAGE = `
No filtered data found for given range and/or tag, please check if the following command returns anything:

    timew summary [<range>] [<tag>...]

Usage:

    timew [report] recap [<range>] [<tag>...]`;

exports.formatForLogging = ({activities, summary}) => {
  if (!activities.length) {
    return USAGE;
  }

  const {readableDuration: totalDuration} = summary;

  const tagColumnInitialLength = "Tags".length;
  const totalColumnInitialLength = "Total".length > totalDuration.length
    ? "Total".length
    : totalDuration.length;

  const tagColumnLength = activities.reduce((greatestLength, activity) => {
    const tagLength = streamlineTagsForLogging(activity.tags).length;

    return tagLength > greatestLength ? tagLength : greatestLength;
  }, tagColumnInitialLength);

  const totalColumnLength = activities.reduce((greatestLength, activity) => {
    const durationLength = activity.readableDuration.length;

    return durationLength > greatestLength ? durationLength : greatestLength;
  }, totalColumnInitialLength);

  const tagHeading = underlineString("Tags".padEnd(tagColumnLength));
  const durationHeading = underlineString("Total".padEnd(totalColumnLength));
  const headingLine = `${tagHeading} ${durationHeading}`;

  const activityLines = activities.map((activity) => {
    const tags = streamlineTagsForLogging(activity.tags).padEnd(tagColumnLength);

    return `${tags} ${activity.readableDuration}`;
  });
  // Ensure newline after each content line
  const content = activityLines.join(`
`);
  const totalDivider = `${"".padEnd(tagColumnLength)} ${underlineString("".padEnd(totalColumnLength))}`;
  const totalLine = `${"".padEnd(tagColumnLength)} ${summary.readableDuration.padEnd(totalColumnLength)}`;

  return `
${headingLine}
${content}
${totalDivider}
${totalLine}`;
};
