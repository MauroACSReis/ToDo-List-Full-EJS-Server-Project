// require modules
const express = require('express')
const bodyParser = require('body-parser')
const date = require(__dirname + '/date.js')

// scope variables
const items = []
const workItems = []

// start express and setup bodyParser
const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

// GET 1
app.get('/', function (req, res) {
  const day = date.getDate()
  res.render('list', { listTitle: day, newListItems: items })
})

// GET 2
app.get('/work', function (req, res) {
  res.render('list', { listTitle: 'Work List', newListItems: workItems })
})

// GET 3
app.get('/about', function (req, res) {
  res.render('about')
})

// POST
app.post('/', function (req, res) {
  const item = req.body.newItem
  if (req.body.list === 'Work') {
    workItems.push(item)
    res.redirect('work')
  } else {
    items.push(item)
    res.redirect('/')
  }
})

// LISTEN to port
const port = 3000
app.listen(process.env.PORT || 3000, function () {
  console.log(`Server started at port ${port}.`)
}) // Heroku OR localhost:3000
