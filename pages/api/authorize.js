import main from 'main'

export default (req, res) => {
  if (req.method === 'GET') {
    const { token, currentDay, currentTime } = req.query
    let view

    try {
      view = main(token, +currentDay, currentTime)
    } catch (e) {
      return res.status(200).json(e.message)
    }

    return res.status(200).json(view)
  }
}
