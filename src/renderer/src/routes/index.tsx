import { Route, Router } from 'electron-router-dom'
import { BlankPage } from '../pages/blank'
import { DocumentPage } from '../pages/document'
import { DefaultLayout } from '../pages/layouts/default'

export function Routes() {
  return (
    <Router
      main={
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<BlankPage />} />
          <Route path="/document" element={<DocumentPage />} />
        </Route>
      }
    />
  )
}
