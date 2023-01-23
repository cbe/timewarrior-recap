const { argv } = process;
const timewarriorReportArgument = argv.filter((_, index) => index >= 2);

console.log(timewarriorReportArgument);
