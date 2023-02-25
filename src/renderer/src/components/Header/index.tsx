import clsx from 'clsx'
import { CaretDoubleRight, TrashSimple } from 'phosphor-react'
import * as Collapsible from '@radix-ui/react-collapsible'
import * as TrafficButtons from '../TrafficButtons'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IPC } from '../../../../shared/constants/ipc'
import { Document } from '../../../../shared/types/ipc'

type Props = {
  isSidebarOpen: boolean
}

export function Header({ isSidebarOpen }: Props) {
  const queryClient = useQueryClient()
  const { id } = useParams<{ id: string }>()
  const navigation = useNavigate()

  const { mutateAsync: deleteDocument, isLoading } = useMutation(
    async () => {
      return await window.api.deleteDocument({ id: String(id) })
    },
    {
      onSuccess() {
        queryClient.setQueryData<Document[]>(
          [IPC.DOCUMENTS.FETCH_ALL],
          (documents) => documents?.filter((document) => document.id !== id),
        )
        navigation('/')
      },
    },
  )

  const isMacOS = process.platform === 'darwin'
  const hasOpenDocument = !!id

  return (
    <div
      id="header"
      className={clsx(
        'border-b h-14 border-rotion-600 py-[1.125rem] px-6 flex justify-between items-center gap-4 leading-tight transition-all duration-250 region-drag',
        {
          'pl-24': !isSidebarOpen && isMacOS,
          'w-screen': !isSidebarOpen,
          'w-[calc(100vw-240px)]': isSidebarOpen,
        },
      )}
    >
      <div className="flex items-center gap-4">
        {!isSidebarOpen && (
          <TrafficButtons.Root className="region-no-drag">
            <TrafficButtons.Close />
            <TrafficButtons.Minimize />
            <TrafficButtons.Maximize />
          </TrafficButtons.Root>
        )}
        <Collapsible.Trigger
          className={clsx(
            'h-5 w-5 text-rotion-200 hover:text-rotion-50 region-no-drag duration-300',
            {
              hidden: isSidebarOpen,
              block: !isSidebarOpen,
            },
          )}
        >
          <CaretDoubleRight className="h-4 w-4" />
        </Collapsible.Trigger>
      </div>

      <>
        {/* <Breadcrumbs.Root>
          <Breadcrumbs.Item>
            <Code weight="bold" className="h-4 w-4 text-pink-500" />
            Estrutura técnica
          </Breadcrumbs.Item>
          <Breadcrumbs.Separator />
          <Breadcrumbs.HiddenItems />
          <Breadcrumbs.Separator />
          <Breadcrumbs.Item>Back-end</Breadcrumbs.Item>
          <Breadcrumbs.Separator />
          <Breadcrumbs.Item isActive>Untitled</Breadcrumbs.Item>
        </Breadcrumbs.Root> */}

        {hasOpenDocument && (
          <div className="inline-flex region-no-drag">
            <button
              className="inline-flex items-center self-end gap-1 text-rotion-100 text-sm hover:text-rotion-50 duration-300 disabled:opacity-60"
              disabled={isLoading}
              onClick={() => deleteDocument()}
            >
              <TrashSimple className="h-4 w-4" />
              Apagar
            </button>
          </div>
        )}
      </>
    </div>
  )
}
