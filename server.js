import express from 'express'
import next from 'next'

import main from './main.js'

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(express.json())

  server.post('/authorize', (req, res) => {
    const { token } = req.body
    let view

    try {
      view = main(token)
    } catch (e) {
      res.send(e.message)
    }

    res.send(view)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`Ready on Port: ${port}`)
  })
})
