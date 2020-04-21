    
    export default function renderScreen(screen, game, requestAnimationFrame){
        const context = screen.getContext('2d')
        context.fillStyle = 'white'
        context.clearRect(0, 0, 10, 10)

        for(const playerID in game.state.players){
            const player = game.state.players[playerID]
            context.fillStyle = 'black'
            context.fillRect (player.x, player.y, 1, 1)
        }
        for(const fruitID in game.state.fruits){
            const fruit = game.state.fruits[fruitID]
            context.fillStyle = 'green'
            context.fillRect (fruit.x, fruit.y, 1, 1)
        }

        requestAnimationFrame(() => {
                renderScreen(screen, game, requestAnimationFrame)
        });
}