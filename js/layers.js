addLayer("m", { //just read the docs...
    name: "main",
    symbol: "Main",
    color: "#4BDC13",
    type: "none",
	startData() {
		return {
      distance: new Decimal(0),
			velocity: new Decimal(0),
		}
	},
	tooltip: `you have {{formatDistance(player.m.distance)}} distance`,
  timeSpeed() {
    let speed = new Decimal(1)
    return speed
  },
  maxVel() {
    let maxVel = new Decimal(1)
    if (player.r.points.gte(1)) maxVel = maxVel.add(1)
    if (player.r.points.gte(2)) maxVel = maxVel.times(tmp.r.rank2eff)
    if (player.t.points.gte(1) && player.r.points.gte(2)) maxVel = maxVel.times(3)
    if (player.t.points.gte(2)) maxVel = maxVel.times(tmp.t.tier2eff.vel)
    if (player.r.points.gte(6)) maxVel = maxVel.times(10)
    maxVel = maxVel.times(tmp.ro.effect)
    return maxVel
  },
  acceleration() {
    let acc = new Decimal(0.1)
    if (player.r.points.gte(2)) acc = acc.times(tmp.r.rank2eff)
    if (player.t.points.gte(1) && player.r.points.gte(2)) acc = acc.times(3)
    if (player.t.points.gte(2)) acc = acc.times(tmp.t.tier2eff.acc)
    if (player.t.points.gte(2)) acc = acc.times(2)
    if (player.r.points.gte(6)) acc = acc.times(5)
    if (player.t.points.gte(5)) acc = acc.times(3)
    acc = acc.times(tmp.ro.effect)
    return acc
  },
  gain() {
    let distance = player.m.velocity.times(tmp.m.timeSpeed)
    let vel = tmp.m.acceleration.times(tmp.m.timeSpeed)
    return {
      distanceGain: distance,
      velGain: vel,
    }
  },
	update(diff) {
    player.m.distance = player.m.distance.add(tmp.m.gain.distanceGain.times(diff))
    player.m.velocity = player.m.velocity.add(tmp.m.gain.velGain.times(diff)).min(tmp.m.maxVel)
	},
  row: 0,
  position: 4,
 tabFormat: `
 <br><br>
  <div v-if="tmp.m.timeSpeed.neq(1)">Time Speed: {{format(tmp.m.timeSpeed)}}x</div>
  You have gone a total of {{formatDistance(player.m.distance)}}<br>({{formatDistance(tmp.m.gain.distanceGain)}}/s)
  <br>Your current velocity is {{formatDistance(player.m.velocity)}}<br>({{formatDistance(tmp.m.gain.velGain)}}/s)
  (Maximum velocity: {{formatDistance(tmp.m.maxVel)}}/s)
  <br>Your current Acceleration is {{formatDistance(tmp.m.acceleration)}}/s<sup>2</sup>
  <br><br><br><br><span style="margin-right: 10px">Rank {{formatWhole(player.r.points)}}</span><prestige-button :layer="'r'"></prestige-button>
  <br><br><br><span style="margin-right: 10px">Tier {{formatWhole(player.t.points)}}</span><prestige-button :layer="'t'"></prestige-button>
  <br><br<br><br><table class="table">
 `
})





