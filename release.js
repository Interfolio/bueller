// Import required modules
const process = require('process');
const fs = require('fs');

// Get command line arguments
const environment = process.argv[2];
const date = process.argv[3];

// Check for arguments
if (!environment || !date) {
  console.log('Please provide an environment and a date in the format YYYY.MONTH.DAY');
  process.exit(1);
}

// Define app names and commands
const xenaApps = ['tenure-api', 'byc-api', 'far-api', 'account-api', 'ids'];
const e2eApps = ['rpt', 'fs', 'far', 'rf', 'lm', 'account'];

const xenaCommand = "/xena_test --sourceVersion develop --environment " + environment;
const e2eCommand = "/e2e_test --sourceVersion develop --environment " + environment;

// Check if the environment is 'ca_prod'
const newEnvironmentFlag = environment === 'ca_prod' ? ' --useNewEnvironment true' : '';

// Generate xena and e2e commands
let commandString = "";
xenaApps.forEach(app => {
  const releaseName = `--releaseType REL --releaseName "${environment.toUpperCase()} RELEASE ${date} | ${app.split('-')[0].toUpperCase()} - Xena"`;
  commandString += `${xenaCommand}${newEnvironmentFlag} ${releaseName} --app ${app}\n`;
});

e2eApps.forEach(app => {
  const releaseName = `--releaseType REL --releaseName "${environment.toUpperCase()} RELEASE ${date} | ${app.toUpperCase()} - E2E"`;
  commandString += `${e2eCommand} ${releaseName} --app ${app}\n`;
});

// Write to file
fs.writeFileSync("commands.txt", commandString);