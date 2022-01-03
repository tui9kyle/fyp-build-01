// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
        },
    });

    // mainWindow.loadURL("http://localhost:3000");

    mainWindow.loadURL(`file://${__dirname}/build/index.html`);
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});
