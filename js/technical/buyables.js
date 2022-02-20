const canBuyBuyable = function(layer, id) {
  if (tmp[layer].deactivated) return false
  if (!player[layer].unlocked) return false
  if (!tmp[layer].buyables[id].unlocked) return false
  if (!tmp[layer].buyables[id].canAfford) return false
  if (player[layer].buyables[id].gte(tmp[layer].buyables[id].purchaseLimit)) return false
  return true
}

const buyBuyable = function(layer, id) {
  if (!tmp[layer].buyables[id].canBuy) return
  if (tmp[layer].buyables[id].buyMax) buyMaxBuyable(layer, id) 
  else {
  run(layers[layer].buyables[id].buy, layers[layer].buyables[id])
  updateBuyableTemp(layer)
 }
}

const buyMaxBuyable = function(layer, id) {
  if (!tmp[layer].buyables[id].canBuy) return
  if (!run(layers[layer].buyables[id].canBuyMax, layers[layer].buyables[id])) return
  layers[layer].buyables[id].buyMax()
  updateBuyableTemp(layer)
}

const respecBuyables = function(layer) {
  if (!player[layer].unlocked) return
  if (tmp[layer].deactivated) return
  if (!tmp[layer].buyables.respec) return
  if (!player[layer].noRespecConfirm && !confirm(tmp[layer].buyables.respecMessage)) return
  layers[layer].buyables.respec()
  updateBuyableTemp(layer)
  document.activeElement.blur()
}

