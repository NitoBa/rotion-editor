import { ReactNode } from 'react'

type RootProps = {
  children: ReactNode
  className?: string
}

export function Root({ children, className }: RootProps) {
  return <div className={`flex gap-2 ${className}`}>{children}</div>
}
