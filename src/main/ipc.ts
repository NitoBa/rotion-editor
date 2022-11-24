import { BrowserWindow, ipcMain, app } from 'electron'
import { Keys } from '../utils/keys'

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

ipcMain.handle(Keys.fetchDocuments, () => {
  return [
    { id: '1', title: 'Ignite' },
    { id: '2', title: 'Explorer' },
    { id: '3', title: 'React native' },
    { id: '4', title: 'NodeJs' },
  ]
})
