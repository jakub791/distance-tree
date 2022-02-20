const clickClickable = function(layer, id) {
  if (tmp[layer].deactivated) return
  if (!player[layer].unlocked) return
  if (!tmp[layer].clickables[id].unlocked) return
  layers[layer].clickables[id].onclick()
  updateClickableTemp(layer)
}