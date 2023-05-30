# Bueller
## Automation Release Command Generator

This script generates a set of slack channel commands for the bi-weekly automation release runs. 

### Usage:

```node release.js test 2023.05.09```

This will create a file commands.txt in the same directory, containing the generated commands.

The script takes two command line arguments: an environment and a date. The environment should be one of test, alpha, beta, prod, or ca_prod. The date should be in the format YYYY.MONTH.DAY.

### Output:

The script generates two types of commands for each of the automation suites specified in the script:

    xena_test commands for the applications: 'tenure-api', 'byc-api', 'far-api', 'account-api', 'ids'.
    e2e_test commands for the applications: 'rpt', 'fs', 'far', 'rf', 'lm', 'account'.

Each command includes the source version, environment, release type, release name, and app name. If the environment is ca_prod, the --userNewEnvironment flag is also added.