import express from 'express'
import next from 'next'

import main from './main.mjs'

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(express.json())

  server.post('/authorize', (req, res) => {
    try {
      const { token } = req.body

      const view = main(token)

      res.send(view)
    } catch (e) {
      console.log(e)
    }
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`Ready on http://localhost:${port}`)
  })
})
