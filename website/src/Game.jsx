import { useEffect, useRef } from 'react'
import './css/game.css'

function Game() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas size
    canvas.width = 320
    canvas.height = 180

    // Initialize game
    const initGame = async () => {
      try {
        // Import game modules dynamically
        const { default: GameManager } = await import('./js/game.js')
        const { default: WebSocketManager } = await import('./js/websocket/WebSocketManager.js')
        
        // Initialize game with canvas context
        const ctx = canvas.getContext('2d')
        new GameManager(ctx)
        new WebSocketManager()
      } catch (error) {
        console.error('Failed to initialize game:', error)
      }
    }

    initGame()
  }, [])

  return (
    <div className="game-container">
      <canvas 
        ref={canvasRef}
        id="game-canvas"
      />
    </div>
  )
}

export default Game