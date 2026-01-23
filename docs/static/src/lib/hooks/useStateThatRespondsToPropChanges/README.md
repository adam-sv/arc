# useStateThatRespondsToPropChanges

## Usage

Use when you wnat to initalize a componets state with a prop. When a state is initialized like
const [value, setter] = useState(props.someVal) it will be initialized but if the props value is changed the state will not
update.

This hook allows for initialization with props and also watches to see if the prop changes and if so it will
update the prop
