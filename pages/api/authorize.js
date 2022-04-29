import main from 'main'

export default (req, res) => {
  if (req.method === 'GET') {
    const { token } = req.query
    let view

    try {
      view = main(token)
    } catch (e) {
      return res.status(200).json(e.message)
    }

    return res.status(200).json(view)
  }
}
