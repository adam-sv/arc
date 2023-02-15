# ARC Cypress Tests

## Running Tests

Tests can be run via the Cypress console or the CLI. Videos will be automatically recorded and saved to `/arc/app/cypress/videos/`

Run cypress tests from console:
```
~/arc/app % yarn cypress:console
```

Run cypress init test to check things are working properly:
```
~/arc/app % yarn cypress:run:init
```

Run all tests from `/arc/app/cypress/integration/` in CLI:
```
~/arc/app % yarn cypress
```

## Writing Tests

All tests in `/arc/app/cypress/integration/` will be run on a regular basis.

Add a spec file (`/arc/app/cypress/integration/<YOUR_COMPONENT>.spec.ts`) that describes your tests. 

Check other test files in `/arc/app/cypress/integration/` and those in `/arc/app/cypress/examples` for inspiration.

## Adding Cypress to another project

To install cypress, simply `yarn add --dev cypress` or `npm install --save-dev cypress`.

To open the console on a fresh install, add the following script to package.json:
`"cypress:open": "cypress open"` and run it with `yarn cypress:open`