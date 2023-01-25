const streamlineTagsForLogging = (tags = []) => tags.join(", ");

exports.formatForLogging = (table) => {
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
