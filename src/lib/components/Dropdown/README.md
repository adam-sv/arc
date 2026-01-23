# @adam-sv/arc: Dropdown

## Notes

The Dropdown is a thin wrapper around the browser `<select>` element.

### onChange algorithm

In order to be more flexible than the browser built-in, and accept only `String | Number` as values, we accept IDropdownItems:

```
type DropdownValue =
  | number
  | string
  | Record<string, unknown>
  | Map<string | number, unknown>
  | boolean;

interface IDropdownItem<T = DropdownValue> {
  label: string | number,
  value: T,
}
```

The label is what we display in the <select>, but the IDropdownItem is what we pass back in the `onChange` handler.

However, browser `<option>` elements `value` field only accepts `String | Number`, so the two options were:

1. JSON.stringify arbitary values, JSON.parse them on the way out
2. Make a map between the index of the option and its `IDropdownItem`

The first option fails at checking equality on any object that has been put into and removed from the field, so option 2 is selected.

This means:

- each `<option>` renders `IDropdownItem.label` as its content
- each `<option>` has its `value` attribute set to its index in the `props.items` array
- when an option is clicked, we read that value, and call `props.onChange(props.items[index])` in `<select onChange={didChange}>`

### placeholder

Of course, the user could also tell us no value is selected.

In this case, users can pass along a `placeholder` value as the first `<option>` child of our `<select>`. This placeholder option has its value set to -1 and is disabled to prevent selection.

If no `placeholder` is provided and the `value` does not match any of the Dropdown items, the first item that is not disabled will be shown as selected.

> This behavior is different when used in a [Form](#usage-in-a-form) and will require explicit selection from a user.

### disabled

Disabling the

## MultiSelect usage

TODO: Add MultiSelect capability to the component

## Usage in a Form

If the `initialValue` is not provided, the Dropdown will render the placeholder option, indicating no selection has been made. If `componentProps.placeholder` is not provided, a default placeholder text of `Please make a selection` will be shown.

See [Dropdown renderer](/src/lib/components/Form/renderers/dropdown.tsx) to customize.

### Disabled

Adding `componentProps.disabled = true` will prevent it from being selectable in the UI, but it does **not** affect whether its value is submitted with a form.

```tsx
<Form
  layout={[
    {
      type: 'dropdown',
      id: 'favorite_animal',
      initialValue: undefined
      componentProps: {
        label: 'Favorite Animal',
        items: [{ label: 'puppy' }, { label: 'kitty' }],
        placeholder: undefined
      },
    },
  ]}
/>
```
