const clickGrid = function(layer, id) {
  if (!player[layer].unlocked) return
  if (tmp[layer].deactivated) return
  if (!gridRun(layer, "getCanClick", player[layer].grid[id], id)) return
  gridRun(layer, "onclick", player[layer].grid[id], id)
}