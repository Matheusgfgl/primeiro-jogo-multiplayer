    //Factory
    export default function createGame()
    {

        const state = {
            players: {},
            fruits: {} ,
            screen : {
                width: 25,
                height: 25
            }  
        }

        const observers = []

        function start(){
            const frequency = 1000

            setInterval(addFruit, frequency)
        }

         function subscrive(observerFunction){
            observers.push(observerFunction)
        }

        function notifyAll(comand){
            for(const observerFunction of observers){
                observerFunction(comand)
            }
        }

        function setState(newState){
            Object.assign(state, newState)
        }
        
        function addPlayer(comand){   
            const playerId = comand.playerId
            const playerX = 'playerX' in comand ? comand.playerX : Math.floor(Math.random () * state.screen.width)
            const playerY =  'playerY' in comand ? comand.playerY : Math.floor(Math.random () * state.screen.height)
            const score = 0

            state.players[playerId] = {
                x: playerX,
                y: playerY,
                score
            }

            notifyAll({
                type: 'add-player',
                playerId: playerId,
                playerX: playerX,
                playerY: playerY,
                score
            })
        }

        function removePlayer(comand){
            const playerId = comand.playerId
            delete state.players[playerId]

              notifyAll({
                type: 'remove-player',
                playerId: playerId,
            })
        }

            function addFruit(comand){   
            const fruitId = comand ? comand.fruitId : Math.floor(Math.random () * 1000000)
            const fruitX = comand ? comand.fruitX : Math.floor(Math.random () * state.screen.width)
            const fruitY =  comand ? comand.fruitY : Math.floor(Math.random () * state.screen.height)

            state.fruits[fruitId] = {
                x: fruitX,
                y: fruitY
            }
            
            notifyAll({
                type: 'add-fruit',
                fruitId: fruitId,
                fruitX: fruitX,
                fruitY: fruitY

            })
        }
        
        function removeFruit(comand){
            const fruitId = comand.fruitId
            delete state.fruits[fruitId]

            notifyAll({
                type: 'remove-fruit',
                fruitId: fruitId
            })
        }

        function movePlayer(comand)
        {
            notifyAll(comand)

            //Object literal
            const acceptedMoves = {
                ArrowDown(player){
                        if(player.y + 1  < state.screen.height){
                        player.y += 1
                    }
                },
                    ArrowUp(player){
                    if(player.y -1  >= 0){
                        player.y -= 1
                    }
                },
                    ArrowLeft(player){
                        if(keyPressed === 'ArrowLeft' && player.x - 1  >= 0 ){
                            player.x -= 1
                        }
                },
                    ArrowRight(player){
                    if(player.x + 1  < state.screen.width){
                        player.x += 1
                    }
                }
            }

                const keyPressed = comand.keyPressed
                const playerId = comand.playerId
                const player = state.players[comand.playerId]
                const moveFunction = acceptedMoves[keyPressed]
                
                if(player && moveFunction){
                    moveFunction(player)
                    checkForFruitCollision(playerId)
                }    
        }
        
        function checkForFruitCollision(playerId){
            const player = state.players[playerId]

            for(const fruitId in state.fruits){
                const fruit = state.fruits[fruitId]

                if(fruit.x === player.x && player.y === fruit.y){
                    console.log(`Collision between ${playerId} and ${fruitId}`)
                    removeFruit({fruitId: fruitId});
                    player.score += 1
                }
            }
        }
        return {
            addPlayer,
            removePlayer,
            addFruit,
            removeFruit,
            movePlayer,
            state, 
            setState,
            subscrive,
            start
        }
    }