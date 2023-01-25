const streamlineTagsForLogging = (tags = []) => tags.join(", ");

exports.formatForLogging = (table) => {
  const tagLength = table.reduce((greatestLength, row) => {
    const tagLength = streamlineTagsForLogging(row.tags).length;

    return tagLength > greatestLength ? tagLength : greatestLength;
  }, "Tags".length);

  const tagHeading = "Tags".padEnd(tagLength);
  const heading = `${tagHeading} Duration`;
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
