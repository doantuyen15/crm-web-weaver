const { ipcRenderer } = require('electron');
function init() {
  window.ipcRenderer = ipcRenderer
}

init();