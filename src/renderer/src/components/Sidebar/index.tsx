import * as Navigation from './Navigation'
import * as TrafficButtons from '../TrafficButtons'
import * as Collapsible from '@radix-ui/react-collapsible'
import clsx from 'clsx'
import { CaretDoubleLeft } from 'phosphor-react'
import { CreatePage } from './CreatePage'
import { Profile } from './Profile'
import { Search } from './Search'
import { useQuery } from '@tanstack/react-query'
import { fetchDocuments } from '../../services/fetchDocuments'
import { IPC } from '../../../../shared/constants/ipc'

export function Sidebar() {
  const isMacOS = process.platform === 'darwin'

  const { data, isLoading } = useQuery(
    [IPC.DOCUMENTS.FETCH_ALL],
    fetchDocuments,
  )

  return (
    <Collapsible.Content
      className="bg-rotion-800
    flex-shrink-0
    border-r
    border-rotion-600
    h-screen
    relative
    group
    data-[state=open]:animate-slideIn
    data-[state=closed]:animate-slideOut
    transition-all
    duration-300
    overflow-hidden"
    >
      <Collapsible.Trigger
        className={clsx(
          'absolute h-5 w-5 right-4 text-rotion-200 hover:text-rotion-50 inline-flex items-center justify-center duration-300',
          {
            'top-[1.125rem]': isMacOS,
            'top-6': !isMacOS,
          },
        )}
      >
        <CaretDoubleLeft className="h-4 w-4" />
      </Collapsible.Trigger>

      <TrafficButtons.Root className="mt-6 ml-4">
        <TrafficButtons.Close />
        <TrafficButtons.Minimize />
        <TrafficButtons.Maximize />
      </TrafficButtons.Root>

      <div
        className={clsx(
          'flex-1 flex flex-col gap-8 h-full w-[240px] group-data-[state=closed]:opacity-0 group-data-[state=open]:opacity-100 transition-opacity duration-200',
          {
            'pt-6': !isMacOS,
          },
        )}
      >
        <Profile />
        <Search />

        {isLoading && (
          <div className="flex h-full w-full items-center justify-center bg-rotion-600 px-3 animate-pulse rounded-lg" />
        )}
        {!isLoading && (
          <Navigation.Root>
            <Navigation.Section>
              <Navigation.SectionTitle>Workspace</Navigation.SectionTitle>
              <Navigation.SectionContent>
                {data?.map((document) => (
                  <Navigation.Link
                    key={document.id}
                    to={`/documents/${document.id}`}
                  >
                    {document.title}
                  </Navigation.Link>
                ))}
              </Navigation.SectionContent>
            </Navigation.Section>
          </Navigation.Root>
        )}

        <CreatePage />
      </div>
    </Collapsible.Content>
  )
}
