const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

const events = []

app.get('/events', (req, res) => {
  res.send(events)
})

app.post('/events', (req, res) => {
  const event = req.body

  events.push(event)

  axios.post('http://posts-clusterip-svc:4000/events',event)
  axios.post('http://comments-svc:4001/events', event)
  axios.post('http://query-svc:4002/events', event)
  axios.post('http://moderation-svc:4003/events', event)

  res.send({ status: 'OK' })
})

app.listen(4005, () => {
  console.log('Listening on 4005')
})
