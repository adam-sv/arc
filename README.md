# ARC

ARC (ADAM React Components) is a React component library built with TypeScript. Typescript >= 3.8 is required to use the library as it has `export type { ... }` statements, introduced in ts3.8.

## Usage

### From https://registry.npmjs.org/

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

## Components & Types

Import components and types:
```typescript
import { Input } from '@adam-sv/arc';
import type { IInputProps } from '@adam-sv/arc';
```

## Developing

```
yarn install
yarn storybook
```

## TypeScript Conventions

We try to enforce a few conventions around the library.

### Explicit Naming

Any time you have a value in the TypeScript world, you can mouseover to see its type. Accordingly, good namings are critical. Names should be virtually unique across the application. 

For a motivating example, let's look at a specific portion of the `Form/types.ts#IFormField` type:

```typescript
export interface IFormField {
  // Optionalize removes the union of the two types: Optionalize<{ test: string }, { test: string }> = { test?: string }
  // We use it here to optionalize the change handlers of each component type we render, since we will supply those
  componentProps?: Optionalize<IInputProps, { onChange: IInputProps["onChange"] }>
    | Optionalize<IDropdownProps, { onChange: IDropdownProps["onChange"] }>
    | Optionalize<ITreeBrowserProps, { onChange: ITreeBrowserProps["onChange"] }>
    | IFormAccordionProps
    | IFormObjectListProps
    | { label: string };
}
```

Imagine instead of explicitly naming these types, the user instead named each component's props interface `IViewProps`. Then, this code is actually impossible to accomplish without assigning type aliases to each component's `IViewProps`.

There are many other situations where this type of explicit naming makes a consuming developer's type-seeking mouseover much more valuable. Use explicit & unique-where-possible type names.

### Component Folder Structure

Components usually have a folder structure similar to this:
```
MyComponent
|- index.tsx
|- style.css
|- types.ts
```

Maybe a `view.tsx` file appears sometimes, or a `types.ts` file is unneeded for super simple components. The two "strict" requirements are:

1. `index.tsx` file must export a component
2. `index.tsx` file must expose all types downstream developers will need.

This means our barrel module - `src/index.ts` - can ignore any unique choices made by a developer, just exporting the component and its exposed types from `index.tsx`.

_Note: "strict" in quotes because that file is not auto-generated, so deviating from this convention is fine_
### Avoiding `void` return type

When a callback of some variety is provided to a component, it is common to see return type `void` a la:
```typescript
// bad
export interface IComponentWithOnChangeProps {
  onChange: (e: ChangeEvent) => void;
}
```

This can be a bit restrictive in select circumstances, such as maybe some multi-used function etc.. Instead, we have opted to replace `void` with `unknown` when the return type is unused, which allows consuming developers to write functions in whatever method they wish without objections from subscribing to our explicit typings:

```typescript
// good
export interface IComponentWithOnChangeProps {
  onChange: (e: ChangeEvent) => unknown;
}
```

### any

We try to avoid `any` wherever possible. It is accepted only in the following circumstances:

1. We are using a generic but wish to not force the users to pass said generic. This allows users to opt in to strict typing on callbacks etc, while not forcing them to use the generics. Let's take an example:
```typescript
export interface IDatum<T = any> {
  id: ReactText;
  label: string;
  data: T;
}
```
By defining a default value of `T = any`, now a user could rapidly develop like so:
```typescript
function handleDatumDidChange(val: IDatum) {
  doSomething(val.id);                    // fully autocompletes
  doAnotherThing(val.data.someProperty);  // autocompletes val.data, doesnt know about someProperty
}
```
While also being able to subscribe to explicit typing:
```typescript
function handleDatumDidChange<IHasSomeProperty>(val: IDatum<IHasSomeProperty>) {
  doSomething(val.id);                    // fully autocompletes
  doAnotherThing(val.data.someProperty);  // fully autocompletes
}
```

2. When returning `Promise` types, where it's important to note that we're returning a Promise but its value is unimportant, declaring `Promise<any>` is fine. However, in general, it'll still be better to use the type or the `T = any`, `Promise<T>` trick.

3. When typing some kind of line wherein typing is extremely difficult, using `any` as a fallback can be nice to your consumers. This technique still gives semantic hints to what you intended, but allows the users to "do what works". Example:

```typescript
export interface IFancyComponentProps {
  fancyProp: SVGPathElement | SomeOtherSVGElement | any;
}
```

_Editor's Note: I ran into this case once in the `SegmentedImage`, but then I completely scrapped the approach I had taken. I suggest if you end up in this position, you consider if you should do the same._
