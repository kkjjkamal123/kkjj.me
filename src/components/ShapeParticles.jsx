import { useRef, useEffect } from 'react'

export default function ShapeParticles({ text = "ENTITY", color = "#fbbf24" }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    
    let particles = []
    let mouse = { x: -1000, y: -1000, radius: 120 }
    
    const setSize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      init()
    }
    
    const mouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const mouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }
    
    window.addEventListener('resize', setSize)
    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('mouseleave', mouseLeave)

    class Particle {
      constructor(x, y) {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.destX = x
        this.destY = y
        this.size = Math.random() * 2 + 1
        this.color = color
        
        // Random drift speed
        this.vx = (Math.random() - 0.5) * 1.5
        this.vy = (Math.random() - 0.5) * 1.5
      }
      
      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }
      
      update() {
        let dx = mouse.x - this.destX
        let dy = mouse.y - this.destY
        let distanceToMouse = Math.sqrt(dx * dx + dy * dy)
        
        // If mouse is near the TARGET position, particles snap to it
        if (distanceToMouse < mouse.radius) {
          this.x += (this.destX - this.x) * 0.15
          this.y += (this.destY - this.y) * 0.15
        } else {
          // Otherwise they wander randomly
          this.x += this.vx
          this.y += this.vy
          
          if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx
          if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy
        }
      }
    }

    function init() {
      particles = []
      ctx.fillStyle = 'white'
      ctx.font = `900 ${Math.min(canvas.width / 4, 150)}px sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(text, canvas.width / 2, canvas.height / 2)
      
      const textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height)
      
      // Sample pixels
      for (let y = 0; y < textCoordinates.height; y += 4) {
        for (let x = 0; x < textCoordinates.width; x += 4) {
          if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
            particles.push(new Particle(x, y))
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw()
        particles[i].update()
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    setSize()
    animate()

    return () => {
      window.removeEventListener('resize', setSize)
      window.removeEventListener('mousemove', mouseMove)
      window.removeEventListener('mouseleave', mouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [text, color])

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        width: '100%', 
        height: '400px', 
        display: 'block',
        cursor: 'crosshair'
      }} 
    />
  )
}
