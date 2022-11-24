import { QueryClientProvider } from '@tanstack/react-query'
import { client } from './lib/react-query'
import { Routes } from './routes'

export function App() {
  return (
    <QueryClientProvider client={client}>
      <Routes />
    </QueryClientProvider>
  )
}
