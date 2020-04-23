import express from 'express'
import http from 'http'
import createGame from './game.js'
import socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('public'))

const game = createGame();

    console.log(game.state)

    sockets.on('connection', (socket) => {
        const playerId = socket.id
         console.log(`player connected on client with id ${playerId}`)

         game.addPlayer({playerId: playerId})
         console.log(game.state)

         socket.emit('setup', game.state)

         socket.on('disconnect', () => {
            game.removePlayer({playerId: playerId})
            console.log(`Player disconnected ${playerId}`)
            })
    })
    server.listen(3000, () => {
        console.log('>server listining on port: 3000')
})