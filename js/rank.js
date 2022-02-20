addLayer("r", {
name: "rank",
symbol: "R", 
position: 0, 
branches: [],
startData() { return {
unlocked: true,
points: new Decimal(0),
best: new Decimal(0),
total: new Decimal(0),
resetTime: 0
}},
effect() {
let eff = player[this.layer].points
return eff
},
effectDescription() {
return `stuff`
},
color: "#4BDC13",
requires: new Decimal(10),
resource: "ranks",
baseResource: "distance",
baseAmount() {
  return player.m.distance
},
type: "static", 
base: 2, //multiplies currency cost
exponent: 1.2,
gainMult() { 
let mult = new Decimal(1)
return mult
},
gainExp() { 
let exp = new Decimal(1)
return exp
},
row: 1,
prestigeButtonText: `
Reset your journey, but
<span v-if="player.r.points.eq(0)">increase maximum velocity by 1m/s</span>
<span v-else-if="player.r.points.eq(1)">increase acceleration and maximum velocity by 10% for each rank up</span>
<span v-else-if="player.r.points.eq(5)">multiply maximum velocity by 10 and acceleration by 5</span>
<span v-else-if="tmp.r.canBuyMax && tmp.r.resetGain.gte(1)">rank up {{formatWhole(tmp.r.resetGain)}} times</span>
<span v-else>rank up</span>
<br><br>Req: {{formatDistance(tmp.r.nextAtDisp)}} distance
`,
hotkeys: [{
key: "r", 
description: "r: Rank up.", 
onPress() {
if (canReset(this.layer)) doReset(this.layer)
},
unlocked() {
return player[this.layer].unlocked
},
}],
layerShown: false,
  rank2eff() {
    return Decimal.pow(1.1, player.r.points)
  },
autoPrestige() {
return false
},
canBuyMax() {
return false
},
resetsNothing() {
return false
},
doReset(layer) {
if (!(layers[layer].row > this.row)) return
let keep = []
layerDataReset(this.layer, keep)
},
})
