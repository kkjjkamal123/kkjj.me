import { useRef, useEffect } from 'react'

export default function ParticleWave({ color = "rgba(255, 255, 255, 0.4)" }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    
    let particles = []
    let mouse = { x: -1000, y: -1000, radius: 150 }
    
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
        this.x = x
        this.y = y
        this.baseX = x
        this.baseY = y
        this.size = 2
      }
      
      draw() {
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }
      
      update() {
        let dx = mouse.x - this.x
        let dy = mouse.y - this.y
        let distance = Math.sqrt(dx * dx + dy * dy)
        let maxDist = mouse.radius
        let force = (maxDist - distance) / maxDist
        
        // Push particles away
        if (distance < maxDist) {
          let pushX = (dx / distance) * force * 15
          let pushY = (dy / distance) * force * 15
          this.x -= pushX
          this.y -= pushY
        } else {
          // Snap back to base position
          this.x -= (this.x - this.baseX) * 0.1
          this.y -= (this.y - this.baseY) * 0.1
        }
      }
    }

    function init() {
      particles = []
      const spacing = 18
      for (let y = spacing; y < canvas.height; y += spacing) {
        for (let x = spacing; x < canvas.width; x += spacing) {
          particles.push(new Particle(x, y))
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }
      // Connect nearby particles for a wave net effect
      connect()
      animationFrameId = requestAnimationFrame(animate)
    }
    
    function connect() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x
          let dy = particles[a].y - particles[b].y
          let dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < 22) {
            ctx.strokeStyle = color.replace(/[\d.]+\)$/g, '0.1)') // make lines transparent
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.stroke()
          }
        }
      }
    }

    setSize()
    animate()

    return () => {
      window.removeEventListener('resize', setSize)
      window.removeEventListener('mousemove', mouseMove)
      window.removeEventListener('mouseleave', mouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [color])

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        width: '100%', 
        height: '100%', 
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'auto',
        zIndex: 0
      }} 
    />
  )
}
