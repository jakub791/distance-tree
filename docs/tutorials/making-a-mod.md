# Making a Mod

This guide assumes you have already gone through the [getting started guide](getting-started.md). It will walk you through the basics of using TMT to create a mod. Let's get started!

## Setting up mod info

Open mod.js. This is where you define things that are for the mod in general as opposed to layer-specific. For now, modInfo, you can set the mod name and author name, and also the points name, which changes what the game calls your basic points (but they're still referred to as `player.points` in the code). **Be sure that you set a mod id as well**.

One suggestion: When you're testing your mod, you should turn off offline progress in the in-game settings, and don't leave the game running when you aren't using it. You could unintentionally balance your game with large timewalls caused by this extra time. 

## Making a layer

Now for the good stuff! Head into layers.js. There is a basic layer already there (although it has a few redundant things in it.) Let's see what it's doing...

The most important thing is on the first line, where it says `addLayer("p", {` . This is how you create a new layer. The "p" here becomes the layer id, which is used throughout TMT to refer to the layer. You can change the id if you want.

A layer is basically a big object with lots of different properties that you can set to create features. For fun customization, you can change a few things:
    - name: Your layer's name!
    - color: Sets the color of a lot of things for this layer. (Can be a hex code or the name of a color)
    - symbol: The text that appears on this layer's node.
    - resource: The name of this layer's main currency.

Reload the page to see your newly customized layer!
And that's the end of this tutorial for now.