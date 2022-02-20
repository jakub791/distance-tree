var layoutInfo = {
    startTab: "options-tab",
    startNavTab: "tree-tab",
	showTree: true,

    treeLayout: ""

    
}


// A "ghost" layer which offsets other layers in the tree
addNode("blank", {
    layerShown: "ghost",
}, 
)


addLayer("tree-tab", {
    tabFormat: [
      {name: "tree", data() {return [(layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS), true]}}],
    previousTab: "",
    leftTab: true,
})