## News ticker

The text that moves from right to left. Every time one ticket passes a new ome is choosen (randomaly)

You define news ticker messages [here](js/newsTickers.js) like this (each one is just another object there):
```js
{
  text: `blah`,
  unlocked: true
}
```

individual news tickers can use these features:

- text: the news ticker text.

- unlocked(): A function that determines if this news ticker is unlocked (game will only choose from unlocked ones).

To render the news ticker text only once use `v-once` derective (you will also need to wrap the text into an html element). This is useful because stuff like `{{}Math.random()}` would change the number every tick. `