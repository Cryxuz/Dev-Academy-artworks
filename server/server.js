import * as Path from 'node:path/posix'
import * as URL from 'node:url'
import express from 'express'
import hbs from 'express-handlebars'
import art from './data/art.js'

const server = express()
export default server

// Middleware
server.engine(
  'hbs',
  hbs.engine({
    extname: 'hbs',
  })
)

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

server.set('view engine', 'hbs')
server.set('views', __dirname + '/views')
server.use(express.static(__dirname + '/public'))

// Routes

server.get('/', (req, res) => {
  const viewData = {
    title: 'Gallery',
    art,
  }
  console.log(viewData)
  res.render('home', viewData)
})

server.get('/artworks/:id', (req, res) => {
  const id = Number(req.params.id)
  const artwork = art.find((art) => art.id === id)

  const viewData = {
    art,
    ...artwork,
  }

  res.render('artworks', viewData)
})
