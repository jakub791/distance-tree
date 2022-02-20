## Features

This is used to display progress to next unlock so players know when they unlock new things.

features are defined [here](js/features.js) like this (each feature is just another object there):
```js
{
  unlocked: false,
  progress() { return 0.1 },
  display: `test`
},
  {
    //etc
  }
```

Individual features can use these features: 

- unlocked(): A function that determines if this feature has been unlocked. The first non-unlocked feature is displayed.

- progress(): A function that returns a Decimal between 1 and 0 based on your progress to this feature.