import { Link } from 'react-router-dom'

export function BlankPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center text-rotion-400">
      Selecione ou crie um documento
      <Link to="/document">Go to document</Link>
    </main>
  )
}
