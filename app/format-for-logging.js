const streamlineTagsForLogging = (tags = []) => tags.join(", ");

const USAGE = `
No filtered data found for given range and/or tag, please check if the following command returns anything:

    timew summary [<range>] [<tag>...]

Usage:

    timew [report] recap [<range>] [<tag>...]`;

exports.formatForLogging = (table) => {
  if (!table.length) {
    return USAGE;
  }

  const tagLength = table.reduce((greatestLength, row) => {
    const tagLength = streamlineTagsForLogging(row.tags).length;

    return tagLength > greatestLength ? tagLength : greatestLength;
  }, "Tags".length);

  const durationLength = table.reduce((greatestLength, row) => {
    const durationLength = row.readableDuration.length;

    return durationLength > greatestLength ? durationLength : greatestLength;
  }, "Duration".length);

  const tagHeading = "Tags".padEnd(tagLength);
  const heading = `${tagHeading} Duration`;
  const underline = `${"-".repeat(tagLength)} ${"-".repeat(durationLength)}`
  const tagDurationPairs = table.map((row) => {
    const tags = streamlineTagsForLogging(row.tags).padEnd(tagLength);

    return `${tags} ${row.readableDuration}`;
  });
  const content = tagDurationPairs.join(`
`);

  return `
${heading}
${underline}
${content}`;
};
