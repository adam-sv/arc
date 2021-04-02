# @adam-sv/arc: Dropdown

## Notes

The Dropdown is a thin wrapper around the browser `<select>` element.

### onChange algorithm

In order to be more flexible than the browser built-in, and accept only `String | Number` as values, we accept IDropdownItems:
```
interface IDropdownItem {
  label: string | number,
  value: any,
}
```

The label is what we display in the <select>, but the IDropdownItem is what we pass back in the `onChange` handler.

However, browser `<option>` elements `value` field only accepts `String | Number`, so the two options were:
1. JSON.stringify arbitary values, JSON.parse them on the way out
2. Make a map between the index of the option and its `IDropdownItem`

The first option fails at checking equality on any object that has been put into and removed from the field, so option 2 is selected.

This means:
* each `<option>` renders `IDropdownItem.label` as its content
* each `<option>` has its `value` attribute set to its index in the `props.items` array
* when an option is clicked, we read that value, and call the function returned from `makeOnChangeHandler` with that index, and we call `props.onChange(props.items[index])`

### placeholder

Of course, the user could also tell us no value is selected.

In this case, we prepend a `placeholder` value as the first `<option>` child of our `<select>`. This placeholder option has its value set to -1, so if we see a value < 0 get passed thru, we know we should call `props.onChange` with no value

## MultiSelect usage

TODO: Add MultiSelect capability to the component
