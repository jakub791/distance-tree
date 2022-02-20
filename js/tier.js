addLayer("t", {
name: "tier",
symbol: "T", 
position: 0, 
branches: [],
startData() { return {
unlocked: true,
points: new Decimal(0),
best: new Decimal(0),
total: new Decimal(0),
resetTime: 0
}},
color: "#4BDC13",
requires: new Decimal(3),
resource: "tiers",
baseResource: "ranks",
baseAmount() {
return player.r.points
},
type: "static", 
base: 1.25, //multiplies currency cost
exponent: 1.05,
gainMult() { 
mult = new Decimal(1)
return mult
},
gainExp() { 
exp = new Decimal(1)
return exp
},
row: 2,
  prestigeButtonText: `
  Reset your journey and ranks, but
  <span v-if="player.t.points.eq(0)">triple acceleration and maximum velocity if you is at least rank 2</span>
  <span v-else-if="player.t.points.eq(1)">Increase acceleration by 25% for each rank up and maximum velocity by 50% for each tier up</span>
  <span v-else-if="player.t.points.eq(2)">Double acceleration</span>
  <span v-else-if="player.t.points.eq(5)">triple acceleration</span>
  <span v-else-if="tmp.t.canBuyMax && tmp.resetGain.gte(1)">tier up {{formatWhole(tmp.t.resetGain)}} times</span>
  <span v-else>tier up</span>
  <br><br>Req: {{formatWhole(tmp.t.nextAtDisp)}} ranks
  `,
hotkeys: [{
key: "t", 
description: "t: Tier up", 
onPress() {
if (canReset(this.layer)) doReset(this.layer)
},
unlocked() {
return player[this.layer].unlocked
},
}],
  tier2eff() {
    return {
      acc: Decimal.pow(1.25, player.r.points),
      vel: Decimal.pow(1.5, player.t.points)
    }
  },
layerShown: false,
roundUpCost: true,
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
