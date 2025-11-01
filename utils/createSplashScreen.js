const { BrowserWindow } = require("electron");
const { join } = require("path");
const { autoUpdater } = require("electron-updater");
const remote = require("@electron/remote/main");
const config = require("./configElectron");

exports.createSplashScreen = async () => {
	const window = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			contextIsolation: false,
			preload: __dirname + '/preload.js',
			enableremotemodule: true,
            webSecurity: false,
            allowRendererProcessReuse: true,
		},
		icon: config.icon,
		title: config.appName,
		width: 500,
		height: 200,
		frame: false,
		transparent: true
	});
	// window.loadFile('splash.html')
	
	await window.loadURL(
		config.isDev
			? "http://localhost:3000/#/splash"
			: `file://${join(__dirname, "..", "../build/index.html#splash")}`,
	);

	window.center()
	window.setClosable(true)
	window.once("ready-to-show", () => {
		window.show()
		setTimeout(() => {
			window.focus();
		}, 200);
	});

	window.on("close", (e) => {
		if (!config.isQuiting) {
			e.preventDefault();

			window.hide();
		}
	});

	return window;
};
