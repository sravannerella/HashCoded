const $ = require('jquery');
window.jQuery = $;
const {remote} = require('electron');
let win = remote.getCurrentWindow();

$(".minimize").click(function(){
	console.log("Minimize");
	win.minimize();
});

$(".maximize").click(function(){
	if(!win.isMaximized()){
		win.maximize();
	} else {
		win.unmaximize();
	}
	
});

$(".close").click(function(){
	win.close();
});