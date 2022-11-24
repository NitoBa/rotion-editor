import { BrowserWindow, ipcMain, app } from 'electron'

export function listenActionsOnTrafficButtons(mainWindow: BrowserWindow) {
  ipcMain.addListener('close-app', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  ipcMain.addListener('minimize-app', () => {
    mainWindow.minimize()
  })

  ipcMain.addListener('maximize-app', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
    } else {
      mainWindow.maximize()
    }
  })
}
