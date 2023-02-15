# ARC
[https://adam-sv.github.io/arc/](View Components on GitHub Pages)

ARC is a React component library, built on TypeScript, React, React-Router-DOM, and D3, offering a variety of input, layout, and visualization capabilities.

## Usage
### Inside Project ADAM at Acubed

Look for jobs on the ADAM team or at Acubed here: https://acubed.airbus.com/careers/ :)

### From npmjs.org

We have published ARC to the public NPM under the @adam-sv organization.

If you have configured a different registry, you can point the @adam-sv scope or the local folder's scope to public NPM via:

```bash
# Set local npm config
npm config set registry https://registry.npmjs.org/
# Set @adam-sv
npm config set @adam-sv:registry https://registry.npmjs.org/
```

### CSS

Include arc's CSS:
```typescript
import '@adam-sv/arc/dist/arc.css';
```

#### Theming

To generate a theme, use the `generateThemeVariableString` function provided. `generateThemeVariableString` will output a formatted string that can be copy-pasted into your own css file.

You can specify colors by passing an `IThemeProps` object (below). Any unspecifed colors
will default to our in-house colors.

Text colors are calculated automatically based on the color the text is displayed upon -
right now the only options are white and black, as per industry usability guidelines.

```
export interface IThemeProps {
  background?: string; // background color of the app
  surface?: string; // color of surfaces, such as panels
  border?: string; // color of borders found on UI components like buttons and forms
  light?: string; // light grey (same Hue and Saturation of medium, higher Brightness)
  medium?: string; // medium grey (doesn't need to be a pure grey, often tinted slightly blue)
  dark?: string; // dark grey (same Hue and Saturation of medium, lower Brightness)
  primary?: string; // main branding color (usually bold)
  secondary?: string; // secondary branding color (often a bit softer than primary)
  tertiary?: string; // branding color (usually an accent color, rarely used)
  danger?: string; // color of errors, delete buttons, etc. (red)
  warning?: string; // color of warning messages (orange)
  success?: string; // color of sucess messages, submit buttons, etc. (green)
}
```

### Using the theming in your component

If you are writing a component, you should make sure to use the theming variables instead of hard-coding colors.

For example, when making a border, instead of writing `border: 1px solid black`, write `border: 1px solid var(--border)`; then, when the theme switches, your component will automatically update.

### Scoping theme variable overrides

You may override theme variables on a scoped basis without affecting the overall theme you've generated.

Example: 
By default `--ArcInput-borderColor` is set to `--border-color`.

If only special ArcInput borders should be set to another css variable, you may scope your override to just the `.ArcInput.special` css class:

```
.ArcInput.special {
  --ArcInput-borderColor: var(--some-other-color-variable);
}
```


## Components & Types

Import components and types:
```typescript
import { Input } from '@adam-sv/arc';
import type { IInputProps } from '@adam-sv/arc';
```

## Installation
Install project from project root:
```
~/arc/ % yarn
```
