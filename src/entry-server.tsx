import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'

export function render(_url: string) {
  const html = renderToString(
    <StrictMode>
      <div>hello world</div>
    </StrictMode>,
  )
  return { html }
}
