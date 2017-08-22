const {app, BrowserWindow, nativeImage} = require('electron'),
	path = require('path'),
	url = require('url');

let myIcon = nativeImage.createFromPath(path.join(__dirname, 'assets/icons/png/icon.png'));

function createWindow(){
	let window = new BrowserWindow({
		width: 1000,
		height: 800,
		minHeight: 500,
  		minWidth: 500,
  		icon: myIcon,
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