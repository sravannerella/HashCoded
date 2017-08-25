const dirTree = require('directory-tree');

function showDir(paths){
	const root = dirTree(paths);

	for (var i = 0; i < root.children.length; i++) {
		if(root.children[i].name === '.git'){
			console.log("Found");
			delete root.children[i];
		}
	}

	const tree = require('electron-tree-view')({
	  root,
	  container: document.querySelector('.fileContainer'),
	  children: function(c){
	  	if(c.type === 'file'){
	  		c.children = []
	  	}
	  	return c.children;
	  },
	  label: c => c.name
	});
}