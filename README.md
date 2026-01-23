# ARC

https://github.com/adam-sv/arc
[View Components on GitHub Pages](https://adam-sv.github.io/arc/)

ARC is a React component library, built on TypeScript, React, React-Router-DOM, and D3, offering a variety of input, layout, and visualization capabilities.

ARC is built with Vite.
- https://vitejs.dev/guide/

## Usage

Import ARC styles by importing the library
- this is more deterministic than having it import implicitly from a Component import

```ts
import '@adam-sv/arc';
```

## Environment

We have a few things you can configure in ARC with the environment variable:

- PUBLIC_URL
  - If you will serve the UI at some subpath like `/ui/`, use this prefix
  - This is relevant during GitHub/GitLab Pages for instance, where you are served at `/pages`
- USE_HASH_ROUTER
  - We allow this flag for when the routes get served behind a `/#/` block, meaning the server never sees this part of the path
  - This is relevant during GitHub/GitLab Pages for instance,

I think you have to prefix these with VITE\_, so in the `.env` file I have written:

- VITE_PUBLIC_URL: '/'
- VITE_USE_HASH_ROUTER:
  - <empty>

## Testing

Today, only `jest` testing exists for ARC - no Cypress. Transpilation via `ts-jest` / `ts-node`.

To test a component or logical piece, simply add a `jest` file `<test-name>.test.tsx` and write some tests. Find an example here: `src/lib/components/Accordion/accordion.test.tsx`.

Guidance:

- Always import from `@adam-sv/arc`, avoid relative paths
  - It can be really tempting to use the relative paths, especially as your test file probably sits right beside the file itself, but the library setup is intimately related to how the code runs.
  - Think of it as a preventative habit.
- No CSS exists - try to avoid testing behaviors that rely on the CSS styles.
  - It might be appropriate to use Cypress for these type of tests. We will set that up soon.
  - Consider `src/lib/components/InfoIcon/infoicon.test.tsx`
    - It wants to check if the tooltip is visible or not. The classnames are correct, BUT the `opacity: 0` style is never set since no CSS exists.
    - Therefore, the test should check if the class names are correct or not as a proxy for checking if the opacity is set.

### Testing Setup Notes

Jest has been set up, following the guidance of:

- https://dev.to/teyim/effortless-testing-setup-for-react-with-vite-typescript-jest-and-react-testing-library-1c48

Some challenges were in the way:

- TS configuration
  - import {} from '@adam-sv/arc';
- Mocking
  - Web Workers
  - DOMRect and other Web APIs
- Barrel Module Lifecycle issues
  - The utils double-barrel strategy seems to be involved. Consider `import { StringUtils } from '@adam-sv/arc';` - it imports from the barrel module which imports from elsewhere
  - Ok, so then if a test says `import { StringUtils } from '..';` instead of from '@adam-sv/arc', bad things happen
  - Advice: _import EVERYTHING from `'@adam-sv/arc'`_, do not use relative paths.

Files involved in solving these problems include:

- [Jest Config](./jest.config.js)
- [Jest Setup](./src/jest.setup.ts)
- Mocks
  - [Worker Mock](./src/test-helpers/workerMock.ts)
  - [DOMRect Mock](./src/test-helpers/DOMRectMock.ts)
- Tests that were updated

  - /src/lib/utils/tests/number.test.ts

    - Before: `import { NumberUtils } from '..';`
      - Result: `TypeError: Cannot read properties of undefined (reading 'capitalSnakeToCamelCase')` due to barrel module hell
    - After: `import { NumberUtils } from '@adam-sv/arc';`
      - Result: Works correctly, good barrel module resolution

## Icons

ARC includes several [Material Symbols Outlined icons](https://fonts.google.com/icons?icon.set=Material+Symbols+Outlined), using a custom font-family name (`ARC Material Symbols Outlined`) to avoid overrides from importing `Material Symbols Outlined` normally. The following variants are included:

| Property | Options                                                     |
| -------- | ----------------------------------------------------------- |
| weight   | lighter (wght: 200), light (wght: 300), default (wght: 400) |
| filled   | true (FILL: 1), default (FILL: 0)                           |

To use an icon, render it via `<MatIcon.IconName weight='lighter' filled />`.

For a complete list of available icons, see [MatIcon iconNameMap](src/lib/components/MatIcon/index.tsx).

### Additional icons or variations

If your app imports `Material Symbols Outlined`, check for any duplicates and remove those already provided by ARC (unless variants are different). If adding new icons with the same variants as ARC (`wght,FILL@200..400,0..1`), you may render them via `<MIcon name={icon_name} weight={weight} filled={true} />`.

```css
/* NOTE: variants (wght, FILL) and icon_names MUST be in alphabetical order.
  Click the import URL for debugging hints.
*/
@import 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@200..400,0..1&icon_names=bolt&display=block';
```

See the [Material Symbols documentation](https://fonts.google.com/icons) for details on customizing icon imports
