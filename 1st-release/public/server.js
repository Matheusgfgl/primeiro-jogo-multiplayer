import express from 'express'
import http from 'http'
import createGame from './game.js'
import socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('public'))

const game = createGame();
game.start()

    game.subscrive((comand) => {
        console.log(`Emiting ${comand.type}`)
        sockets.emit(comand.type, comand)
    })

    sockets.on('connection', (socket) => {
        const playerId = socket.id
         console.log(`player connected on client with id ${playerId}`)

         game.addPlayer({playerId: playerId})

         socket.emit('setup', game.state)

         socket.on('disconnect', () => {
            game.removePlayer({playerId: playerId})
            console.log(`Player disconnected ${playerId}`)

            })

         socket.on('move-player', (comand) => {
             comand.playerId = playerId
             comand.type = 'move-player'

            game.movePlayer(comand)
         
            })   
    })
    server.listen(3000, () => {
        console.log('>server listining on port: 3000')
})