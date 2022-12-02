import clsx from 'clsx'
import { Code, CaretDoubleRight, TrashSimple } from 'phosphor-react'
import * as Breadcrumbs from './Breadcrumbs'
import * as Collapsible from '@radix-ui/react-collapsible'
import * as TrafficButtons from '../TrafficButtons'

type Props = {
  isSidebarOpen: boolean
}

export function Header({ isSidebarOpen }: Props) {
  const isMacOS = process.platform === 'darwin'
  const isLinux = process.platform === 'linux'

  return (
    <div
      id="header"
      className={clsx(
        'border-b border-rotion-600 py-[1.125rem] px-6 flex items-center gap-4 leading-tight transition-all duration-250 region-drag',
        {
          'pl-24': !isSidebarOpen && isMacOS,
          'w-screen': !isSidebarOpen,
          'w-[calc(100vw-240px)]': isSidebarOpen,
        },
      )}
    >
      {!isSidebarOpen && !isLinux && (
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

      <>
        <Breadcrumbs.Root>
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
        </Breadcrumbs.Root>

        <div className="inline-flex region-no-drag">
          <button className="inline-flex items-center gap-1 text-rotion-100 text-sm hover:text-rotion-50 duration-300">
            <TrashSimple className="h-4 w-4" />
            Apagar
          </button>
        </div>
      </>
    </div>
  )
}
