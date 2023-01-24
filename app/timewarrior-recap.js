exports.timewarriorRecap = (input) =>
  input
    .filter((interval) => interval.end);
