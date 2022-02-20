//modes
var modes = {
  11: {
    name: "absurd",
    tooltip: `ehehe... You will see`,
  },
}

//calculate mode name
function calcModeName(mode = tmp.selectedModes.join(", ")) {
  if (tmp.selectedModes.length === 0) return "none" //if no modes selected
  return mode //default
}



//calculate mode balancing
function calcModeBalance(mode = tmp.selectedModes.join(", ")) {
  if (tmp.selectedModes.length === 0) return "Balanced up to endgame" //if no modes selected
  if (mode === "absurd") return "Balanced up to endgame"
  return "unkown! procced at your own risk" //default
}
