import { contextBridge } from 'electron'
import { ElectronAPI, electronAPI } from '@electron-toolkit/preload'
import { DOCUMENTS_APIS } from './apis/documents'
import { WINDOW_APIS } from './apis/window'

declare global {
  export interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}

// Custom APIs for renderer
const api = {
  ...DOCUMENTS_APIS,
  ...WINDOW_APIS,
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
