import { contextBridge, ipcRenderer } from 'electron'
import { ElectronAPI, electronAPI } from '@electron-toolkit/preload'
import { Keys } from '../utils/keys'

declare global {
  export interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}

// Custom APIs for renderer
const api = {
  fetchDocuments: async (): Promise<{ id: string; title: string }[]> => {
    return ipcRenderer.invoke(Keys.fetchDocuments)
  },
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

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
