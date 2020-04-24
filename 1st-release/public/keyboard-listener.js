    //Factory
    export default function createKeyBordListener(){
        const state = {
            observers: [],
            playerId: null
        }
        function registerPlayerId(playerId){
            state.playerId = playerId
        }

        function subscrive(observerFunction){
            state.observers.push(observerFunction)
        }

        function notifyAll(comand){
            console.log(`Notifyng ${state.observers.length} observers `)

            for(const observerFunction of state.observers){
                observerFunction(comand)
            }
        }

        document.addEventListener('keydown', handleKeydonw)

        function handleKeydonw(event){

            const keyPressed = event.key

            const comand = {
                type: 'move-player',
                playerId : state.playerId,
                keyPressed
            }

            notifyAll(comand)
        }
        return {
            subscrive,
            registerPlayerId
        }
    }