const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geocode = require('./utilities/geocode')
const forecast = require('./utilities/forecast')

const app = express();
const port = process.env.PORT || 3000
// Set path to send html from
const Path = path.join(__dirname, '../public')
const template = path.join(__dirname, '../templates/views')
const partials = path.join(__dirname, '../templates/partials')
// console.log(Path)
// app.set('views', template)
app.set('view engine', 'hbs');
app.set('views', template);
hbs.registerPartials(partials);

app.use(express.static(Path))

app.get('', (req, res) => {
  res.render('index')
})

app.get('/weather', (req, res) => {
  if (req.query.address) {
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error })
      }
      forecast(latitude, longitude, (error, datain) => {
        if (error) {
          return res.send({ error })
        }
        res.send({
          temp: datain.temp,
          mintemp: datain.mintemp,
          maxtemp: datain.maxtemp,
          location,
          address: req.query.address,
          desc: datain.clouds,
          visual: datain.visual
        })
      })
    })

  }
  else {
    res.send({
      error: 'You must provide an address'
    });
  }
})

app.get('*', (req, res) => {
  res.render('error')
})
app.listen(port, () => {
  console.log("Server is up on port 3000")
})