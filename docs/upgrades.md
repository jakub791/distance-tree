# Upgrades

Useful functions for dealing with Upgrades and implementing their effects:

- hasUpgrade(layer, id): determine if the player has the upgrade
- upgradeEffect(layer, id): Returns the current effects of the upgrade, if any
- buyUpgrade(layer, id): Buys an upgrade directly (if affordable)

Upgrades are stored in the following format:

```js
upgrades: {
    11: {
        description: "Blah",
        cost: new Decimal(100),
        //etc
    },
    //etc
}
```

The upgrades object also can have these features:

- onPurchase(). **optional**, a function that will be called when you buy an upgrade on this layer.

- deactivated(). **optional**, A function that returns if this layer upgrades should be deactivated, if true `hasUpgrade(this.layer, id)` will return false and you won't be able to buy the upgrades on this layer.

Usually, upgrades should have an id where the first digit is the row and the second digit is the column.

Individual upgrades can have these features:

- title: Displayed at the top in a larger font. Can use basic HTML and vue.

- description: A description of the upgrade's effect. *You will also have to implement the effect where it is applied.*. Can use basic HTML and vue.

- effect(): **optional**. A function that calculates and returns the current values of any bonuses from the upgrade. Can return a value or an object containing multiple values.

- effectDisplay: **optional**. Text that displays the current effects of the upgrade with formatting. Can use basic HTML and vue.

- costDisplay: **OVERRIDE**. ovverrides the cost displayed (except the `cost: ` part). can use basic HTML and vue.

- fullDisplay: **OVERRIDE**. Overrides the other displays and descriptions, and lets you set the full text for the upgrade. Can use basic HTML and vue.

- cost: **sort of optional** A Decimal for the cost of the upgrade. By default, upgrades cost the main prestige currency for the layer.

- unlocked(): **optional**. A function returning a bool to determine if the upgrade is visible or not. Default is unlocked.

- onPurchase(): **optional**. **(overrides onPurchase() on tbe upgrades object)** This function will be called when the upgrade is purchased. Good for upgrades like "makes this layer act like it was unlocked first".

- style: **optional**. Applies CSS to this upgrade, in the form of an object where the keys are CSS attributes, and the values are the values for those attributes (both as strings).

- tooltip: **optional**. Adds a tooltip to this upgrade, appears when it is hovered over. Can use basic HTML and vue. Default is no tooltip. If this returns an empty value, that also disables the tooltip.

- layer: **assigned automagically**. It's the same value as the name of this layer, so you can do `player[this.layer].points` or similar.

- id: **assigned automagically**. It's the "key" which the upgrade was stored under, for convenient access. The upgrade in the example's id is 11.

If you want to do something more complicated like upgrades that cost different currency or two currencies, or have extra requirements, you can override the purchase system with these.

- canAfford(): **OVERRIDE**, a function determining if you are able to buy the upgrade. (If you also have a cost, it will check both the cost and this function)

- pay(): **OVERRIDE**, a function that reduces your currencies when you buy the upgrade



- branches: **optional**, This is primarially useful for upgrade trees. An array of upgrade ids. A line will appear from this upgrade to all of the upgrades in the list. Alternatively, an entry in the array can be a 2-element array consisting of the upgrade id and a color value. The color value can either be a string with a hex color code, or a number from 1-3 (theme-affected colors). A third element in the array optionally specifies line width.