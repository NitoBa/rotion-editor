import { contextBridge, ipcRenderer } from 'electron'
import { DOCUMENTS_APIS } from './apis/documents'
import { WINDOW_APIS } from './apis/window'

declare global {
  export interface Window {
    api: typeof api
  }
}

// Custom APIs for renderer
const api = {
  ...DOCUMENTS_APIS,
  ...WINDOW_APIS,

  onNewDocumentRequest: (callback: () => void) => {
    ipcRenderer.on('new-document', callback)

    return () => {
      ipcRenderer.off('new-document', callback)
    }
  },
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.api = api
}
