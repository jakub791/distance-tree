# Text interpolation

Put the text inside `{{ }}`. Vue will autonatically replace it with the real value. You can even use the ternary operator here.

## attributes binding

Unless you is making your own Vue component doing something like `:id="test"` or `v-bind:id="test"` won't work. Why? because it will threat `test` as variable, not text. To solve this simply put quotes around it.<br>
Same with can happen when binding style or class or any other attribute. For example: `:style="{color: red}"` won't work because `red` will be threated as a variable. Simply put quotes around it to solve the problem. You also need quotes around things that contain a `-`, like `font-size`. I hope this isn't complicated.

# Where you can create components?

You can create components in any .js file (but not inside layers).

# How to create components?

To create component just call `Vue.component(<componentName>, {<options> })`.
This is not a Vue tutorial but you can find a good one [here](https://vuejs.org/v2/guide/components.html).

# Props

Props work kinda like function parameters: you can specify different props values each time you use the component.

# Using components in other components

Just use the componet like a htnl tag and specify it's props like attributes.

# using components in tabFormat

**Note**: this dosen't apply if your tabFormat is a string.<br>tabFormat works like column component (array of components displayed in a column). Components used in tabFormat can only use **layer and data props** (layer is set automatically but you can change it).
