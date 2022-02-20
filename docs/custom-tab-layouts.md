# Custom tab layouts

Custom tab layouts can be used to do basically anything in a tab window, especially combined with the "style" layer feature. <br>There are 2 ways to do this using the `tabFormat` feature: 

- Make tabFormat a string. You can use basic HTML and Vue features there.

- Or make tabFormat an array of things, like this:

```js
tabFormat: [
  {name: "main-display"},
  {nane: "prestige-button"},
  {nane: "blank"},
  {name: "display-text",
        data() { return `I have {{format(player.points)}} pointy points!` },
        style: { "color": "red", "font-size": "32px"}},
  {name: "blank"},
  {name: "toggle", data: ["c", "beep"]},
  {name: "milestones"},
  {name: "blank"},
  {name: "blank"},
  {name: "upgrades"}
]
```

It is a list of components, where each item is an objec containing these properties properties:
- name: name of the component to display.
- data: **sometimes required**. Used for components like display-text that require data.
- layer: **optional**. To display stuff from other layer you can put it's id here. Defaults to current layer.
- style: **optional**. Applies a CSS style to component with a "CSS object", where the keys are CSS attributes and values are values for these attributes.

These are the existing components, but you can create more if you want:

- display-text: Displays some text. Data is the text to display. Can use basic HTML and vue

- display-image: Displays an image. Data is the url of the image.

- h-line, v-line: Display a horizontal or vertical divider line, respectively. Data **(optional)** sets the width or height, respectively. Defaults to full line.

- blank: Adds empty space. The default dimensions are 8px x 17px. Data **(optional)** is an object with 2 properties: width and height (in px). they set width and height, respectively. They default to default dimensions (8px x 17px).

- row: Display a list of components horizontally. Data is an array of components in the tab layout format.

- column: Display a list of components vertically. Data is an array of components in the tab layout format. This is useful to display columns within a row.

- main-display: The text that displays the main currency for the layer and its effects. Data **(optional)** is the amount of precision to use, allowing it to display non-whole numbers.

- resource-display: The text that displays the currency that this layer is based on, as well as the best, total, resets amount, best in one reset for this layer. Data **(optional)** is amount of precision to use, allowing it to display non-wholen numbers.

- prestige-button: The button to reset for a currency in this layer.

- text-input: A text input box. The argument is the name of the variable in player[layer] that the input is for, player[layer][argument]
    (Works with strings, numbers, and Decimals!)

- slider: Lets the user input a value with a slider. The argument a 3-element array: [name, min, max].
    The name is the name of the variable in player[layer] that the input  is for, and min and max are the limits of the slider.
    (Does not work for Decimal values)

- drop-down: Lets the user input a value with a dropdown menu. The argument a 2-element array: [name, options].
    The name is the name of the variable in player[layer] that the input is for, and options is an array of strings for options you can use.

- upgrades, milestones, challenges, achievements, buyables, clickables: Displays the layers upgrades/challenges/etc, as appropriate. Data **(optional)** is a  list of rows this component should include, if it doesn't have all of them.

- microtabs: Display a set of subtabs for an area. Data is the name of the set of microtabs in the "microtabs" feature.

- bar: Display a bar. Data is the id of the bar to display.

- infobox: Display an infobox. Data is the id of the infobox to display.

- tree: Displays a tree. Data is an array of arrays containing the names of the nodes in the tree (first by row, then by column)
    [See here for more information on tree layouts and nodes!](trees-and-tree-customization.md)

- upgrade-tree, buyable-tree, clickable-tree: Displays a tree of upgrades/buyables/clickables from this layer. Data is an array of arrays containing the ids of the upgrade/etc in the tree (first by row, then by column). A tree can only have one type of component in it.

- toggle: A toggle button that toggles a bool value. The data is array with 2 values that identifies the location in player of the bool to toggle, e.g. `[layer, id]`. 'layer' also affects the color of the toggle.

- grid: Displays the gridable grid for the layer. If you need more than one grid use grid from different layer. Data **(optional)** is the list of rows this component should include, if it doesn't have all of them.


The rest of the components are sub-components. They can be used just like other components, but are typically part of another component.

- upgrade, milestone, challenge, buyable, clickable, achievement, gridable: An individual upgrade, challenge, etc. Data is the id. This can be used if you want to have upgrades split up across multiple subtabs, for example.

- respec-button, master-button: The respec and master buttons for buyables and clickables, respectively.

- sell-one, sell-all: The "sell one" and "sell all" for buyables, respectively. Data is the id of the buyable.
