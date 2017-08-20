// $(".tree-view").children('div.elem').children("a.header").child('div').child('img');

// var fs = require('fs'),
// 	path = require("path");

// var folderTree = {};

// function readDir(paths){
// 	fs.readdir(paths, function (err, files) {
// 	    if (err) {
// 	        throw err;
// 	    }
// 	    var folder = path.basename(paths).split(path.sep).pop();
// 	    console.log("Folder: ", folder);

// 	    folderTree.name = folder;
// 	    folderTree.children = [];
// 	    arr = {};

// 	    files.map(function (file) {
// 	        return path.join(paths, file);
// 	    }).filter(function (file) {
// 	        return fs.statSync(file).isFile();
// 	    }).forEach(function (file) {
// 	    	arr.name = path.basename(file);
// 	    	arr.children = [];
// 	    	folderTree.children.push(arr);
// 	        // console.log("%s (%s)", path.basename(file), path.extname(file));
// 	    });
// 	});
// }

// function showDir(paths){
// 	readDir(paths);
// }


window.onload = () => {
	const root = {
  		name: 'img',
  		children: [{
    		name: 'test.jpg',
    		children: [{
      			name: 'bar',
      			children: [{
        			name: 'bar',
        			children: []
      			}, {
        			name: 'baz',
        			children: []
      			}]
    		}, {
      			name: 'secret',
      			children: []
    		}]
  		}, {
    		name: 'baz',
    		children: []
  		}, {
    		name: 'secret',
    		children: []
  		}]
	};

    const button = document.createElement('button');
    
    button.innerText = 'click me';
    
    // button.addEventListener('click', event => {
    //   root.children.push({ name: 'foo', children: [] },
    //     { name: 'bar', children: [] });
    //   tree.loop.update({ root });
    // }, false);

    const tree = require('electron-tree-view')({
      root,
      	children: c => c.children,
      	label: c => c.name,
      	container: document.querySelector('.container')
    });

    // tree.on('selected', elem => {
    // 	elem.children.push({ name: 'foo', children: [] },
    //     	{ name: 'bar', children: [] });
    //   	tree.loop.update({ root });
    //   	console.log('selected', elem);
    // });

    tree.select(root.children[0].children[0]);
}