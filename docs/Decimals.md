## What are Decimals?

As you probably noticed, Decimals are used almost everywhere where numeric value is needed.<br>
Decimals are actually objects. And they use normal numbers. Decimal object has 3 properties: sign, layer, mag. They are all normal numbers. This is why break eternity can go up to 10^^1.79e308.

## creating a Decimal

Ok, but how do we create a Decimal object? Use the `new` keyword. You can create Decimal from number, string or Decimal. These are called DecimalSources. Examples: 
```js
new Decimal(10) //Decimal from number
new Decimal(-100) 
new Decimal(1.5e100)
new Decimal("1eee10") //Decimal from string
new Decimal("10^100")
new Decimal("10^^10")
new Decimal"(e^10)100") //1eeeeeeeeee100
```

## Math on Decimals

But how do we perform matematical tasks on Decimals when operators like `+`, `-` and `*` don't work? Decimals have many methods for this like `.add`, `sub`, `mul`. 
```js
let x = new Decimal(10)
x.add(5) //15
x.sub(5) //10
x.mul(10) //100
x.div(2) //5
x.pow(3) //1000
x.sub(5).mul(2) //10
x.pow(2).div(2) //50
```
As you can see These never modify the orginal Decimal object. All Decimal methods return a new object. Why? Because objects are passed by reference. For example:
```js
let person = {
  name: "John",
  nationality: "english"
}
let x = person
x.name = "Doe"
person.name //"Doe"
```
Now `person` and `x` are the same object. Any changes to x will also affect person. 

Ok, but what if you want to change the orginal Decimal? Very easy to do:
```js
let x = new Decimal(2)
x = x.add(2) //now x is 4
x = x.pow(2) //now x is 16
```

