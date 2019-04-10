import express from 'express'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

const port = 3000
const app = express()

const isDevelopment = process.env.NODE_ENV === 'development'
const script = isDevelopment
  ? 'http://localhost:5000/hmr.js'
  : '/client/client.js'

const styles = isDevelopment
  ? '<link rel="stylesheet" href="/ssr/main.css">'
  : ''

const htmlData = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <title>React Ap</title>
    ${styles}
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script src="${script}"></script>
  </body>
</html>
`.trim()

const render = () => {
  const element = createElement(App)
  const html = renderToString(element)
  const result = htmlData.replace(
    '<div id="root"></div>',
    `<div id="root">${html}</div>`
  )
  return result
}

app.use(express.static('build'))

app.get('/', (_, res) => {
  res.send(render())
})

app.get('*', (_, res) => {
  res.send('Server!')
})

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
