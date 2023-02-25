import { ipcRenderer } from 'electron'
import { IPC } from '../../shared/constants/ipc'
import {
  FetchAllDocumentsResponse,
  FetchDocumentRequest,
  FetchDocumentResponse,
  CreateDocumentResponse,
  SaveDocumentRequest,
  DeleteDocumentRequest,
} from '~/src/shared/types/ipc'

export const DOCUMENTS_APIS = {
  fetchDocuments: async (): Promise<FetchAllDocumentsResponse> => {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FETCH_ALL)
  },

  fetchDocument: async (
    req: FetchDocumentRequest,
  ): Promise<FetchDocumentResponse> => {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FETCH, req)
  },

  createDocument: async (): Promise<CreateDocumentResponse> => {
    return ipcRenderer.invoke(IPC.DOCUMENTS.CREATE)
  },

  saveDocument: async (req: SaveDocumentRequest): Promise<void> => {
    return ipcRenderer.invoke(IPC.DOCUMENTS.SAVE, req)
  },

  deleteDocument: async (req: DeleteDocumentRequest): Promise<void> => {
    return ipcRenderer.invoke(IPC.DOCUMENTS.DELETE, req)
  },
}
