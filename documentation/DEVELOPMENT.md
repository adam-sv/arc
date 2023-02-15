# Development
We recommend you develop using our test app.

Instead of requiring lib as a dependecny, the test app employs a system-level symlink to link the `~/arc/lib/src` directly to `~/arc/app/src/lib`

This allows us to take advantage of hot-reloading across projects, within the confines of monorepo rules.

VSCode search results from `~/arc/lib/` have been disabled to prevent duplicate results.

To make it less confusing, avoid developing inside the `~/arc/lib/` directory.

To serve test app from project root:
```
~/arc/ % yarn start
```

> Note: If developing on windows, you will need to make your own symlink, as the one that is included in git is unix-based.

## Adding Dependencies

This project employs a monorepo architecture (workspaces) to manage dependencies across the lib and test app.
Using workspaces, we can ensure that both the app and lib are using the same version of libraries common between them.

To install a dependency, add the project from the project root with the -W option:
```
~/arc/ yarn add somepackage -W
```

Dependencies should only be installed to an individual workspace if they are only to be used in that one place. Due to symlinking lib/src into app/src, most dependencies of lib will also be required by app and should be installed in the project root.

## Building
To build lib dist from project root:
```
~/arc/ % yarn build
```

## Testing

ARC employs both integration testing (via Cypress) and unit testing via Jest

### Integration testing
// todo

### Unit testing
Unfortunately, because Jest will not properly follow symlinks, the lib must be tested separately from the demo app.

#### Unit testing the lib
To unit test the lib, that is, files in `/arc/lib/src` and, by symlink, `/arc/app/src/lib`:
```
~/arc/app/lib/ % yarn test
```
To add Jest tests to the lib testing suite, add .test.ts(x) files in /arc/lib/src/.

#### Unit testing the demo app

To unit test the demo app:
```
~/arc/app % yarn test
```
To add Jest tests to the demo app testing suite, add .test.ts(x) files in /arc/app/src/.

> Note: testing files in /arc/app/src/lib will be skipped when tests are ran from inside the demo app directory

