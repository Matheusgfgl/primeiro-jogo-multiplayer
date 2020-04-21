    //Factory
    export default function createGame()
    {

        const state = {
            players: {},
            fruits: {} ,
            screen : {
                width: 10,
                height: 10
            }  
        }

        function addPlayer(comand){   
            const playerId = comand.playerId
            const playerX = comand.playerX
            const playerY = comand.playerY

            state.players[playerId] = {
                x: playerX,
                y: playerY
            }
        }

        function removePlayer(comand){
            const playerId = comand.playerId
            delete state.players[playerId]
        }

            function addFruit(comand){   
            const fruitId = comand.fruitId
            const fruitX = comand.fruitX
            const fruitY = comand.fruitY

            state.fruits[fruitId] = {
                x: fruitX,
                y: fruitY
            }
        }
        
        function removeFruit(comand){
            const fruitId = comand.fruitId
            delete state.fruits[fruitId]
        }

        function movePlayer(comand)
        {

            console.log(`Moving ${comand.playerId} with ${comand.keyPressed}`)

            //Object literal
            const acceptedMoves = {
                ArrowDown(player){
                    console.log("Moving player down")
                        if(player.y + 1  < state.screen.height){
                        player.y += 1
                    }
                },
                    ArrowUp(player){
                    console.log("Moving player Up")
                    if(player.y -1  >= 0){
                        player.y -= 1
                    }
                },
                    ArrowLeft(player){
                    console.log("Moving player left")
                        if(keyPressed === 'ArrowLeft' && player.x - 1  >= 0 ){
                            player.x -= 1
                        }
                },
                    ArrowRight(player){
                    console.log("Moving player Right")
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
                console.log(`Cheking ${playerId} and ${fruitId}`)

                if(fruit.x === player.x && player.y === fruit.y){
                    console.log(`Collision between ${playerId} and ${fruitId}`)
                    removeFruit({fruitId: fruitId});
                }
            }
        }


        return {
            addPlayer,
            removePlayer,
            addFruit,
            removeFruit,
            movePlayer,
            state
        }
    }