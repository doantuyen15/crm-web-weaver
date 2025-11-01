const { BrowserWindow } = require("electron");
const { join } = require("path");
const { autoUpdater } = require("electron-updater");
const remote = require("@electron/remote/main");
const config = require("./configElectron");

exports.createMainWindow = async () => {
	const window = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			devTools: config.isDev,
			contextIsolation: false,
			preload: __dirname + '/preload.js',
			enableremotemodule: true,
            webSecurity: false,
            allowRendererProcessReuse: true
		},
		icon: config.icon,
		title: config.appName,
		show: false
	});
    // window.maximize()
	// window.hide();
	window.setMenuBarVisibility(false);
	remote.enable(window.webContents);

	await window.loadURL(
		config.isDev
			? "http://localhost:3000"
			: `file://${join(__dirname, "..", "../build/index.html")}`,
	);

	window.on("close", (e) => {
		if (!config.isQuiting) {
			e.preventDefault();

			window.hide();
		}
	});

	return window;
};
