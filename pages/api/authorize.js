import main from 'main'

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { token } = req.body
    let view

    try {
      view = main(token)
    } catch (e) {
      res.send(e.message)
    }

    res.send(view)
  }
}
