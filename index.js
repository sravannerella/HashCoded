const {app, BrowserWindow} = require('electron'),
	path = require('path'),
	url = require('url');

function createWindow(){
	let window = new BrowserWindow({
		width: 800,
		height: 800,
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
}

app.on('ready', createWindow);