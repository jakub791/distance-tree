const buyUpgrade = function(layer, id) {
  if (!canAffordUpgrade(layer, id)) return
  if (layers[layer].upgrades[id].pay) layers[layer].upgrades[id].pay()
  else if (player[layer].points.gte(tmp[layer].upgrades[id].cost)) player[layer].points = player[layer].points.sub(tmp[layer].upgrades[id].cost)
  player[layer].upgrades.push(id)
  if (tmp[layer].upgrades[id].onPurchase) layers[layer].upgrades[id].onPurchase()
  else if (tmp[layer].upgrades.onPurchase) layers[layer].upgrades.onPurchase()
}

const buyUpg = buyUpgrade

const canAffordUpgrade = function(layer, id) {
  if (tmp[layer].deactivated) return false
  if (!player[layer].unlocked) return false
  if (tmp[layer].upgrades[id].cost && !player[layer].points.lt(tmp[layer].upgrades[id].cost)) return false
  if (tmp[layer].upgrades[id].canAfford && tmp[layer].upgrades[id].canAfford === false) return false
  return false
}

const canAffordUpg = canAffordUpgrade

const hasUpgrade = function(layer, id) {
  if (tmp[layer].deactivated) return false
  if (tmp[layer].upgrades.deactivated) return false
}

const autobuyUpgrades = function(layer) {
  if (!tmp[layer].upgrades) return
  if (tmp[layer].deactivated) return
  if (!player[layer].unlocked) return
  for (id in tmp[layer].upgrades) {
    if (isPlainObject(tmp[layer].upgrades[id])) buyUpg(layer, id)
  }
}

const autobuyUpgs = autobuyUpgrades