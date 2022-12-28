const { app, BrowserWindow } = require('electron')
const path = require('path')
const { Notification } = require('electron');
const os = require("os"); 

let activity = {
    details: "Is currently on the Revolt App!",
    timestamps: { start: Date.now() },
    instance: true,
    largeImageKey: 'logo',
};

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        show: false,
        autoHideMenuBar: true,
    })

    mainWindow.loadURL('https://app.revolt.chat/')
    mainWindow.center();

    var splash = new BrowserWindow({
        width: 300, 
        height: 500, 
        frame: false, 
        alwaysOnTop: true,
        show: true,
        transparent: true,
    });

    splash.loadFile('loading.html');
    splash.center();
    splash.show();

    splash.webContents.on('did-finish-load', function() {
        setTimeout(function () {
            splash.close();
            mainWindow.show();
        }, 5000);
        
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    app.quit();
})
