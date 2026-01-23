# Material Symbols Outlined - MatIcon

The icons used by ARC are downloaded and hosted within the ARC project. When you use `MatIcon`, the required Material Symbols Outlined [font file](./font/font.woff2) is served directly from ARC's assets in [style.scss](./font/style.scss).

See [`iconNameMap`](./index.tsx#L4) for details on which icons are available and check out [examples library](https://adam-sv.gitlab-pages.adam-sv.com/arc/#/examples/maticon/default) to view all variations.

> **Note:** The downloaded font uses a custom CSS class name (`.ARC.material-symbols-outlined`) instead of the default (`.material-symbols-outlined`) to help prevent conflicts or unintended overrides if your application or other libraries also import Material Symbols fonts.

## Styling

`MatIcon` is styled with following properties:

| Name                    | Default           | Notes                                                                                        |
| ----------------------- | ----------------- | -------------------------------------------------------------------------------------------- |
| --MatIcon-size          | 1.5rem (24px)     | controls icon size                                                                           |
| weight                  | 400               | options - [200, 300, 400]                                                                    |
| color                   | var(--icon-color) |                                                                                              |
| font-variation-settings | 'FILL' 0          | options - ['FILL' 0, 'FILL' 1]                                                               |
| -webkit-text-stroke     | N/A               | See [TemporalInput](https://adam-sv.gitlab-pages.adam-sv.com/arc/#/examples/input/temporals) |
| -webkit-text-fill-color | N/A               |                                                                                              |

If you use `weight='light'`, it sets the weight to `300`. For an even lighter style, use `weight='lighter'` which sets the weight to `200`. Setting `filled={true}` or `filled` applies `'FILL' 1` for a filled icon style.

```jsx
<MatIcon.Clock weight='light' filled />
```

## Adding Icons

To add new icons to ARC library:

- Find `icon_name` from [Google's Icon Gallery](https://fonts.google.com/icons), ie `hardware`, and add in alpabetical order to the [@import line](./font/style.scss#L7) in `style.scss`

  ```css
  /* GOOD */
  @import 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@200..400,0..1&icon_names=accessibility_new,hardware&display=block';

  /* BAD - not in alphabetical order */
  @import 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@200..400,0..1&icon_names=hardware,acessibility_new&display=block';
  ```

  If the `icon_names` are not in alphabetical order, Google will tell you which icon is out of order

  ```
  icon names must be sorted alphabetically

  hardware,acessibility_new
          ^
  ```

- Follow the link to their stylesheet and download font file in `src` url:

  ```css
  @font-face {
    ...
    src: url(https://fonts.gstatic.com/icon/font?kit=kJEPBvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzBwG-RpA6RzaxHMPdY40KH8nGzv3fzfVJO1USv9luNrUTdtVuNreFPpMIr7OxmqxEvC-WHD_4&skey=b8dc2088854b122f&v=v266) /* <== Download this file */
      format('woff2');
  }
  ```

  > NOTE: We currently support weight and filled variations. Adding `optical size` and `grade` will affect the entire font package. Consider splitting into multiple font files if you want to load additional variants.

- Replace current [font file](./font/font.woff2) with new one
- Update `iconNameMap` in the [index file](./index.tsx#L4) with a user friendly name as key and added `icon_name`, ie `hardware`, as value

  ```tsx
  export const iconNameMap = {
    ...
    Hammer: 'hardware',
    ...
  }
  ```

- Use new icon via `<MatIcon.Hammer />`, voila!
