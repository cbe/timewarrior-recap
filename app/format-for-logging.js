const streamlineTagsForLogging = (tags = []) => tags.join(", ");

const underlineString = (string) => `\x1b[4m${string}\x1b[0m`;

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

  const tagHeading = underlineString("Tags".padEnd(tagLength));
  const durationHeading = underlineString("Duration".padEnd(durationLength));
  const heading = `${tagHeading} ${durationHeading}`;
  const tagDurationPairs = table.map((row) => {
    const tags = streamlineTagsForLogging(row.tags).padEnd(tagLength);

    return `${tags} ${row.readableDuration}`;
  });
  const content = tagDurationPairs.join(`
`);

  return `
${heading}
${content}`;
};
