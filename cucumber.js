module.exports = {
    default: {
      require: ["./tests/stepDefinitions/*.ts"],
      format: ["html:cucumber-report.html"],
      paths: ["./tests/features/*.feature"],
      requireModule: ["ts-node/register"],
      publishQuiet: true
    }
  };
  