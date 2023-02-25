import { ipcRenderer } from 'electron'

export const WINDOW_APIS = {
  closeApp: () => {
    ipcRenderer.send('close-app')
  },
  maximizeApp: () => {
    ipcRenderer.send('maximize-app')
  },
  minimizeApp: () => {
    ipcRenderer.send('minimize-app')
  },
}
