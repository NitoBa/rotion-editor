import { ElectronAPI } from '@electron-toolkit/preload'

type Api = {
  closeApp: () => void
  maximizeApp: () => void
  minimizeApp: () => void
  fetchDocuments: (params: any) => void
}
declare global {
  export interface Window {
    electron: ElectronAPI
    api: Api
  }
}
