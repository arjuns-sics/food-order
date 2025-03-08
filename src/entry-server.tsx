import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import IndexLayout from './layouts/index-layout'

export function render(_url: string) {
  const html = renderToString(
    <StrictMode>
      {/* <IndexLayout /> */}
      <div>hello world</div>
    </StrictMode>,
  )
  return { html }
}
