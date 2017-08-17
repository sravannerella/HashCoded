const {app, BrowserWindow} = require('electron'),
	path = require('path'),
	url = require('url');

function createWindow(){
	let window = new BrowserWindow({
		width: 1000,
		height: 800,
		minHeight: 500,
  		minWidth: 500,
		frame: false
	});

	window.webContents.openDevTools();

	window.loadURL(
		url.format({
			pathname: path.join(__dirname, 'views/index.html'),
			protocol: 'file:',
			slashes: true
		})
	);

	window.setMenu(null);
}

app.on('ready', createWindow);