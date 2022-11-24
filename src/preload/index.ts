import { contextBridge, ipcRenderer } from 'electron'
import { ElectronAPI, electronAPI } from '@electron-toolkit/preload'

declare global {
  export interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}

// Custom APIs for renderer
const api = {
  fetchDocuments: (params: any) => {
    return ipcRenderer.send('fetch-documents', params)
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
