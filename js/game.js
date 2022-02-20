var player;
var needCanvasUpdate = true;

//so game dosen't break
modInfo.initialStartPoints = new Decimal(0)
modInfo.pointsName = "points"

function getStartPoints() {
  return modInfo.initialStartPoints
}

function canGenPoints() {
  return false
}

function getPointGen() {
  return decimalZero
}

const backgroundStyle = {}


// Don't change this
const TMI_VERSION = {
	tmiNum: "0.1",
	tmiName: "the beggining"
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isTickerUnlocked(ticker) {
  return run(ticker.unlocked, ticker)
}

function updateNews(diff) {
  if (!options.news) {
    tmp.newsTicker.right = Number("-" + tmp.other.screenWidth)
    return
  }
 if (tmp.newsTicker.right > 20) tmp.newsTicker.timeout -= diff
  if (tmp.newsTicker.timeout <= 0) {
   newsTimeout = setTimeout(function() {
   let newTicker = random(0, tmp["info-tab"].newsTickers.length-1)
   tmp.newsTicker.current = tmp["info-tab"].newsTickers[newTicker].text
 },2000)
   tmp.newsTicker.timeout = 2
   tmp.newsTicker.current = ""
   tmp.newsTicker.right = -150
 }
  tmp.newsTicker.transition = diff
  tmp.newsTicker.right += 15 * diff
}

//select and unselect mode
function selectMode(mode) {
  mode = tmp["options-tab"].modes[mode]
  if (hasSelectedMode(mode.name)) {
    tmp.selectedModes.splice(tmp.selectedModes.indexOf(mode.name), 1)
    }
  else {
    tmp.selectedModes.push(mode.name)
  }
}

function getResetGain(layer, useType = null) {
	let type = useType
	if (!useType) { 
		type = tmp[layer].type
		if (tmp[layer].getResetGain || type === "custom") return run(layers[layer].getResetGain, layers[layer])
	} 
	
  if (tmp[layer].type === "none") return new Decimal(0)
	if (tmp[layer].gainExp.eq(0)) return new Decimal(0)
	if (type === "static") {
		if ((!tmp[layer].canBuyMax) || tmp[layer].baseAmount.lt(tmp[layer].requires)) return new Decimal(1)
		let gain = tmp[layer].baseAmount.div(tmp[layer].requires).div(tmp[layer].gainMult).max(1).log(tmp[layer].base).times(tmp[layer].gainExp).pow(Decimal.pow(tmp[layer].exponent, -1))
		gain = gain.times(tmp[layer].directMult)
		return gain.floor().sub(player[layer].points).add(1).max(1);
	} 
  
  if (type === "normal") {
		if (tmp[layer].baseAmount.lt(tmp[layer].requires)) return new Decimal(0)
		let gain = tmp[layer].baseAmount.div(tmp[layer].requires).pow(tmp[layer].exponent).times(tmp[layer].gainMult).pow(tmp[layer].gainExp)
		if (gain.gte(tmp[layer].softcap)) gain = gain.pow(tmp[layer].softcapPower).times(tmp[layer].softcap.pow(decimalOne.sub(tmp[layer].softcapPower)))
		gain = gain.times(tmp[layer].directMult)
		return gain.floor().max(0);
	} 
		return new Dwcimal(0)
}

function getNextAt(layer, canMax=false, useType = null) {
	let type = useType
	if (!useType) {
		type = tmp[layer].type
		if (layers[layer].getNextA) return layers[layer].getNextAt(canMax)
	  }
	if (tmp[layer].type === "none") return new Decimal(Infinity)

	if (tmp[layer].gainMult.lte(0)) return new Decimal(Infinity)
	if (tmp[layer].gainExp.lte(0)) return new Decimal(Infinity)

	if (type === "static") {
		if (!tmp[layer].canBuyMax) canMax = false
		let amt = player[layer].points.plus((canMax&&tmp[layer].baseAmount.gte(tmp[layer].nextAt))?tmp[layer].resetGain:0).div(tmp[layer].directMult)
		let extraCost = Decimal.pow(tmp[layer].base, amt.pow(tmp[layer].exponent).div(tmp[layer].gainExp)).times(tmp[layer].gainMult)
		let cost = extraCost.times(tmp[layer].requires).max(tmp[layer].requires)
		if (tmp[layer].roundUpCost) cost = cost.ceil()
		return cost;
	} 
    if (type === "normal") {
		let next = tmp[layer].resetGain.add(1).div(tmp[layer].directMult)
		if (next.gte(tmp[layer].softcap)) next = next.div(tmp[layer].softcap.pow(decimalOne.sub(tmp[layer].softcapPower))).pow(decimalOne.div(tmp[layer].softcapPower))
		next = next.root(tmp[layer].gainExp).div(tmp[layer].gainMult).root(tmp[layer].exponent).times(tmp[layer].requires).max(tmp[layer].requires)
		if (tmp[layer].roundUpCost) next = next.ceil()
		return next;
	} 
    if (type === "custom") return layers[layer].getNextAt(canMax)
		return decimalZero
	}

function softcap(value, cap, power = 0.5) {
	if (value.lte(cap)) return value
	else return value.pow(power).times(cap.pow(decimalOne.sub(power)))
}

// Return true if the layer should be highlighted. By default checks for upgrades only.
function shouldNotify(layer){
	for (let id in tmp[layer].upgrades){
		if (isPlainObject(layers[layer].upgrades[id])){
			if (canAffordUpgrade(layer, id) && !hasUpgrade(layer, id) && tmp[layer].upgrades[id].unlocked){
				return true
			}
		}
	}
	if (player[layer].activeChallenge && canCompleteChallenge(layer, player[layer].activeChallenge)) {
		return true
	}

	if (tmp[layer].shouldNotify)
		return true

	if (isPlainObject(tmp[layer].tabFormat)) {
		for (subtab in tmp[layer].tabFormat){
			if (subtabShouldNotify(layer, 'mainTabs', subtab)) {
				tmp[layer].trueGlowColor = tmp[layer].tabFormat[subtab].glowColor || defaultGlow

				return true
			}
		}
	}

	for (family in tmp[layer].microtabs) {
		for (subtab in tmp[layer].microtabs[family]){
			if (subtabShouldNotify(layer, family, subtab)) {
				tmp[layer].trueGlowColor = tmp[layer].microtabs[family][subtab].glowColor
				return true
			}
		}
	}
	 
	return false
	
}

function canReset(layer)
{	
	if (layers[layer].canReset !== undefined) return run(layers[layer].canReset, layers[layer])
	if (tmp[layer].type === "normal") return tmp[layer].baseAmount.gte(tmp[layer].requires)
	if (tmp[layer].type === "static") return tmp[layer].baseAmount.gte(tmp[layer].nextAt)  
  return false
}

function rowReset(row, layer) {
	for (let lr in ROW_LAYERS[row]){
		if (layers[lr].doReset) {
			if (!isNaN(row)) Vue.set(player[lr], "activeChallenge", null) // Exit challenges on any row reset on an equal or higher row
			run(layers[lr].doReset, layers[lr], layer)
		}
		else if(tmp[layer].row > tmp[lr].row && !isNaN(row)) layerDataReset(lr)
	}
}

function layerDataReset(layer, keep = []) {
	let storedData = {unlocked: player[layer].unlocked, forceTooltip: player[layer].forceTooltip, noRespecConfirm: player[layer].noRespecConfirm, prevTab:player[layer].prevTab} // Always keep these

	for (let thing in keep) {
		if (player[layer][keep[thing]] !== undefined)
			storedData[keep[thing]] = player[layer][keep[thing]]
	}

	Vue.set(player[layer], "buyables", getStartBuyables(layer))
	Vue.set(player[layer], "clickables", getStartClickables(layer))
	Vue.set(player[layer], "challenges", getStartChallenges(layer))
	Vue.set(player[layer], "grid", getStartGrid(layer))

	layOver(player[layer], getStartLayerData(layer))
	player[layer].upgrades = []
	player[layer].milestones = []
	player[layer].achievements = []

	for (let thing in storedData) {
		player[layer][thing] =storedData[thing]
	}
}



function addPoints(layer, gain) {
	player[layer].points = player[layer].points.add(gain).max(0)
	if (player[layer].best) player[layer].best = player[layer].best.max(player[layer].points)
	if (player[layer].total) player[layer].total = player[layer].total.add(gain)
  if (player[layer].bestOnReset) player[layer].bestOnReset = player[layer].bestOnReset.max(gain)                                                                        
}

function generatePoints(layer, diff) {
	addPoints(layer, tmp[layer].resetGain.times(diff))
}

function updateResets(layer) {
player[layer].resets = player[layer].resets.add(tmp[layer].resetsGainMult ? Decimal(1).times(tmp[layer].resetsGainMult):1)
}

function doReset(layer, force=false) {
	if (tmp[layer].type == "none") return
	let row = tmp[layer].row
	if (!force) {
		
		if (tmp[layer].canReset === false) return;
		
		if (tmp[layer].baseAmount.lt(tmp[layer].requires)) return
		let gain = tmp[layer].resetGain
		if (tmp[layer].type === "static") {
			if (tmp[layer].baseAmount.lt(tmp[layer].nextAt)) return
			gain = (tmp[layer].canBuyMax ? gain : 1)
		} 

    if (layers[layer].onPrestige) layers[layer].onPrestige(gain)
		
		addPoints(layer, gain)
    updateResets(layer)
		updateMilestones(layer)
		updateAchievements(layer)

		if (!player[layer].unlocked) {
			player[layer].unlocked = true;
			needCanvasUpdate = true;
		}
	
	}

	if (run(layers[layer].resetsNothing, layers[layer])) return
	tmp[layer].baseAmount = decimalZero // quick fix


	for (let layerResetting in layers) {
		if (row >= layers[layerResetting].row && (!force || layerResetting != layer)) completeChallenge(layerResetting)
	}

	player.points = (row == 0 ? decimalZero : getStartPoints())

	for (let x = row; x >= 0; x--) rowReset(x, layer)
	for (let r in OTHER_LAYERS){
		rowReset(r, layer)
	}

	player[layer].resetTime = 0

	updateTemp()
	updateTemp()
}

function resetRow(row) {
	if (prompt('Are you sure you want to reset this row? It is highly recommended that you wait until the end of your current run before doing this! Type "I WANT TO RESET THIS" to confirm')!="I WANT TO RESET THIS") return
	let pre_layers = ROW_LAYERS[row-1]
	let layers = ROW_LAYERS[row]
	let post_layers = ROW_LAYERS[row+1]
	rowReset(row+1, post_layers[0])
	doReset(pre_layers[0], true)
	for (let layer in layers) {
		player[layer].unlocked = false
		if (player[layer].unlockOrder) player[layer].unlockOrder = 0
	}
	player.points = getStartPoints()
	updateTemp();
	resizeCanvas();
}

function startChallenge(layer, x) {
	let enter = false
	if (!player[layer].unlocked || !tmp[layer].challenges[x].unlocked) return
	if (player[layer].activeChallenge == x) {
		completeChallenge(layer, x)
		Vue.set(player[layer], "activeChallenge", null)
		} 
    else {
		enter = true
	}	
	doReset(layer, true)
	if (enter) {
		Vue.set(player[layer], "activeChallenge", x)
		run(layers[layer].challenges[x].onEnter, layers[layer].challenges[x])
	}
	updateChallengeTemp(layer)
}

function canCompleteChallenge(layer, x) {
	if (x != player[layer].activeChallenge) return
	let challenge = tmp[layer].challenges[x]
	if (challenge.canComplete !== undefined) return challenge.canComplete
   return false
}

function completeChallenge(layer, x) {
	var x = player[layer].activeChallenge
	if (!x) return
	
	let completions = canCompleteChallenge(layer, x)
	if (!completions){
		Vue.set(player[layer], "activeChallenge", null)
		run(layers[layer].challenges[x].onExit, layers[layer].challenges[x])
		return
	}
	if (player[layer].challenges[x] < tmp[layer].challenges[x].completionLimit) {
		needCanvasUpdate = true
		player[layer].challenges[x] += completions
		player[layer].challenges[x] = Math.min(player[layer].challenges[x], tmp[layer].challenges[x].completionLimit)
		if (layers[layer].challenges[x].onComplete) run(layers[layer].challenges[x].onComplete, layers[layer].challenges[x])
	}
	Vue.set(player[layer], "activeChallenge", null)
	run(layers[layer].challenges[x].onExit, layers[layer].challenges[x])
	updateChallengeTemp(layer)
}

VERSION.withoutName = "v" + VERSION.num + (VERSION.pre ? " Pre-Release " + VERSION.pre : VERSION.pre ? " Beta " + VERSION.beta : "")
VERSION.withName = VERSION.withoutName + (VERSION.name ? ": " + VERSION.name : "")

function gameLoop(diff) {
	if (isEndgame() || tmp.gameEnded){
		tmp.gameEnded = true
		clearParticles()
	}

	if (isNaN(diff) || diff < 0) diff = 0
	if (tmp.gameEnded && !player.keepGoing) {
		diff = 0
		clearParticles()
	}

	diff = Math.min(diff, maxTickLength())
	addTime(diff)

	for (let x = 0; x <= maxRow; x++){
		for (let item in TREE_LAYERS[x]) {
			let layer = TREE_LAYERS[x][item]
			player[layer].resetTime += diff
			if (tmp[layer].passiveGeneration) generatePoints(layer, diff*tmp[layer].passiveGeneration);
			if (layers[layer].update) layers[layer].update(diff);
		}
	}

	for (let row in OTHER_LAYERS){
		for (let item in OTHER_LAYERS[row]) {
			let layer = OTHER_LAYERS[row][item]
			player[layer].resetTime += diff
			if (tmp[layer].passiveGeneration) generatePoints(layer, diff*tmp[layer].passiveGeneration);
			if (layers[layer].update) layers[layer].update(diff);
		}
	}	

	for (let x = maxRow; x >= 0; x--){
		for (let item in TREE_LAYERS[x]) {
			let layer = TREE_LAYERS[x][item]
			if (tmp[layer].autoPrestige && tmp[layer].canReset) doReset(layer);
			if (layers[layer].automate) layers[layer].automate();
			if (tmp[layer].autoUpgrade) autobuyUpgrades(layer)
		}
	}

	for (row in OTHER_LAYERS){
		for (item in OTHER_LAYERS[row]) {
			let layer = OTHER_LAYERS[row][item]
			if (tmp[layer].autoPrestige && tmp[layer].canReset) doReset(layer);
			if (layers[layer].automate) layers[layer].automate();
				player[layer].best = player[layer].best.max(player[layer].points)
        player[layer].bestOnReset = player[layer].bestOnReset.max(player[layer].points)
			if (tmp[layer].autoUpgrade) autobuyUpgrades(layer)
		}
	}

	for (let layer in layers){
		if (layers[layer].milestones) updateMilestones(layer);
		if (layers[layer].achievements) updateAchievements(layer)
	}
}

var ticking = false

var interval = setInterval(function() {
	if (player===undefined || tmp === undefined) return;
	if (ticking) return;
	if (tmp.gameEnded && !player.keepGoing) return;
	ticking = true
	let now = Date.now()
	let diff = (now - player.time) / 1e3
	let trueDiff = diff
	if (player.offTime !== undefined) {
		if (player.offTime.remain > modInfo.offlineLimit * 3600) player.offTime.remain = modInfo.offlineLimit * 3600
		if (player.offTime.remain > 0) {
			let offlineDiff = Math.max(player.offTime.remain / 10, diff)
			player.offTime.remain -= offlineDiff
			diff += offlineDiff
		}
		if (!options.offlineProd || player.offTime.remain <= 0) player.offTime = undefined
	}
	if (player.devSpeed !== undefined) diff *= player.devSpeed
	player.time = now
	if (needCanvasUpdate) { resizeCanvas();
		needCanvasUpdate = false;
	}
	tmp.scrolled = document.getElementById('treeTab') && document.getElementById('treeTab').scrollTop > 30
  updateNews(trueDiff)
	updateTemp();
	updateOomps(diff);
	updateWidth()
	updateTabFormats()
	gameLoop(diff)
	fixNaNs()
	adjustPopupTime(trueDiff)
	updateParticles(trueDiff)
  /*how to absurdify any game
step 1: locate the interval where most of the game runs
step 2: add */
if (inMode("absurd") && true) {
        const bufhiesibvfib = document.body.querySelectorAll("#app");
        for (const i in bufhiesibvfib)
    {if (bufhiesibvfib[i].style !== undefined) {
                let t = `rotate(${Math.random() * 360}deg) `;
                t += "skew(" + Math.random() * 75 + "deg) ";
                let scale = (Math.random() * 3) ** 2 / 9;
                if (scale<0.1) scale = 0.1;
                t += "scale(" + scale + ") ";
                bufhiesibvfib[i].style.transform = t;
            }}
    hotkeys={}
    }
/*inside the interval
step 3: publish or share the game link*/
	ticking = false
}, 50)

setInterval(function() {needCanvasUpdate = true}, 500)