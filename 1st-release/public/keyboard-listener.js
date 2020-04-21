    //Factory
    export default function createKeyBordListener(){
        const state = {
            observers: []
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
                playerId : 'player1',
                keyPressed
            }

            notifyAll(comand)
        }
        return {
            subscrive
        }
    }