'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import './store'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

let win

async function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 700,
    frame: false,
    backgroundColor: '#fff',
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      webSecurity: false,
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

// 最小化
ipcMain.on('minimize', e => {
  BrowserWindow.getFocusedWindow().minimize()
})
// 最大化
ipcMain.on('maximize', e => {
  const win = BrowserWindow.getFocusedWindow()
  if (win.isMaximized()) {
    win.restore()
  } else {
    win.maximize()
  }
})
// 关闭
ipcMain.on('close', () => {
  BrowserWindow.getFocusedWindow().hide()
  BrowserWindow.getFocusedWindow().close()
})
// 展示图片
ipcMain.on('showPic', e => {
  let win = new BrowserWindow({
    width: 750,
    height: 500,
    frame: false,
    // show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '#/picviewer')
  win.on('closed', () => {
    win = null
  })
  // win.center()
  // win.show()
})
// 视频
ipcMain.on('showVideo', e => {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    // show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '#/video')
  win.on('closed', () => {
    win = null
  })
})
// 搜索
ipcMain.on('showSearch', e => {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    // show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '#/search')
  win.on('closed', () => {
    win = null
  })
})