const express = require('express')
const hbs = require('hbs')
const path = require('path')
const fs = require('fs')

const serverPort = process.env.PORT || 3001;

var app = express()

hbs.registerPartials(path.join(__dirname, '/views/partials'))
app.set('view engine', 'hbs')
// app.use(express.static(path.join(__dirname, '../my-react-project/build')))

app.use((req, res, next) => {
  const now = new Date().toString()
  const log = `${now}: ${req.method} ${req.url}`  
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log(err)
    }
  })
  console.log(log)
  next()
})

// app.use((req, res, next) => {res.render('maintenance.hbs')})

app.use(express.static(path.join(__dirname, 'public')))


hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())
hbs.registerHelper('screamIt', (text) => text.toUpperCase())

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'JS learning',
    welcomeMessage: 'Welcome to my first template',
    header: 'Test JS'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
  })
})

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects page',
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Service is unavailable!'
  })
})

app.listen(serverPort, () => {
  console.log("Server is up on port " + serverPort)
})