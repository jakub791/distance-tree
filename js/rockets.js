addLayer("ro", {
name: "rockets",
symbol: "R",
position: 0, 
branches: [],
startData() { return {
unlocked: false,
points: new Decimal(0),
best: new Decimal(0),
total: new Decimal(0),
resetTime: 0
}},  
  effect() {
    return player.ro.points.pow(0.75).max(1)
  },
color: "#c2c0c0" ,
requires: new Decimal(5e4),
resource: "rockets",
baseResource: "distance",
baseAmount() {
return player.m.distance
},
type: "normal",
exponent: 0.4,
gainMult() {
let mult = new Decimal(1)
return mult
},
gainExp() {
let exp = new Decimal(1)
return exp
},
  prestigeButtonText: `
  Reset for {{tmp.ro.resetGain}} rockets<br><br>
  Next at {{formatDistance(tmp.ro.nextAtDisp)}} distance
  `,
row: 3,
hotkeys: [{
key: "R", 
description: "R: Reset for rockets", 
onPress() {
if (canReset(this.layer)) doReset(this.layer)
},
unlocked() {
return player[this.layer].unlocked
},
}],
layerShown() {
return player.m.distance.gte(5e4) || player[this.layer].unlocked
},
passiveGeneration() {
return false
},
  tabFormat: `
  <br><br><prestige-button :layer="'ro'"></prestige-button>
  <br><br>You have {{formatDistance(player.m.distance)}} distance
  <br><br><br>You have {{formatWhole(player.ro.points)}} rockets, <br>multiplying acceleration and maximum velocity by {{format(tmp.ro.effect)}}
  `,
doReset(layer) {
if (!(layers[layer].row > this.row)) return
let keep = []
layerDataReset(this.layer, keep)
},
})
