import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'phosphor-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Document } from '~/src/shared/types/ipc'
import { IPC } from '../../../../shared/constants/ipc'

export function CreatePage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutateAsync: createNewDocument, isLoading: isCreatingNewDocument } =
    useMutation(
      async () => {
        const response = await window.api.createDocument()
        return response.data
      },
      {
        onSuccess: (data) => {
          queryClient.setQueryData<Document[]>(
            [IPC.DOCUMENTS.FETCH_ALL],
            (documents) => {
              if (documents && documents?.length >= 0) {
                return [...documents, data]
              } else {
                return [data]
              }
            },
          )
          navigate(`/documents/${data.id}`)
        },
      },
    )

  useEffect(() => {
    function onNewDocument() {
      createNewDocument()
    }
    const unsubscribe = window.api.onNewDocumentRequest(onNewDocument)

    return () => {
      unsubscribe()
    }
  }, [createNewDocument])

  return (
    <button
      disabled={isCreatingNewDocument}
      className="flex w-[240px] px-5 items-center text-sm gap-2 absolute bottom-0 left-0 right-0 py-4 border-t border-rotion-600 hover:bg-rotion-700 disabled:opacity-60 duration-300"
      onClick={() => createNewDocument()}
    >
      <Plus className="h-4 w-4" />
      Novo documento
    </button>
  )
}
