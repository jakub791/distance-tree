## Modes

Modes change the game in some way.<br> Player can enter a mode or even multiplie modes at once.

Useful functions for dealing with modes and implementing they're effects:
- inMode(modeName): determines if the player is in the given mode.
- hasSelectedMode(modeName): determines if the player has selected the given mode in the modes menu.

Modes are stored in the `modes` object [here](js/modes.js) using the format below (each mode is just another object there): 

```js
11: {
  name: "blah",
  tooltip: "I'm a tooltip!"
}
```
Usually each mode should have an id where the first digit is the row and the second digit is the column.

Individual modes can have these features: 
- name: String, this text appears on the mode button and functions like inMode also use it. can use basic HTML and Vue features.

- tooltip: This text appears when the mode button is hovered. Usually used to describe what the mode changes. Can use basic HTML and Vue.