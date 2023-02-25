import { BrowserWindow, Menu, nativeImage, Tray } from 'electron'
import path from 'node:path'

export function createTray(mainWindow: BrowserWindow) {
  const isWindows = process.platform === 'win32'
  const pathIcon = isWindows
    ? path.resolve(__dirname, 'whiteTemplate/rotionTemplate.png')
    : path.resolve(__dirname, 'blackTemplate/rotionTemplate.png')

  const icon = nativeImage.createFromPath(pathIcon)
  const tray = new Tray(icon)

  const menu = Menu.buildFromTemplate([
    { label: 'Rotion', enabled: false },
    { type: 'separator' },
    {
      label: 'Criar novo documento',
      click: () => {
        mainWindow.webContents.send('new-document')
      },
    },
    { type: 'separator' },
    { label: 'Fechar', role: 'quit' },
  ])

  tray.setContextMenu(menu)
}
