const express = require('express')
const http = require('http')
const path = require('path')
const socketIO = require('socket.io')

const app = express()
var server = http.Server(app)
var io = socketIO(server, {
  pingTimeout: 60000,
})

app.set('port', 3000)
app.use('/static', express.static(__dirname + '/static'))

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, 'index.html'))
})

server.listen(3000, function () {
  console.log('Starting server on port 3000')
})

io.on('connection', function (socket) {
  console.log('player [' + socket.id + '] connected')
 
  socket.on('disconnect', function () {
    console.log('player [' + socket.id + '] disconnected')
  })
})