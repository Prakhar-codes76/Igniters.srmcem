/**
 * IGNITERS // Cosmic Particle & Constellation Canvas
 * High-performance ambient particle canvas with subtle Indian futuristic hues.
 */

(function () {
  'use strict';

  const canvas = document.getElementById('cosmic-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 120 };

  const PARTICLE_COUNT = Math.min(Math.floor(window.innerWidth / 16), 85);
  const COLORS = [
    'rgba(255, 153, 51, 0.55)',  // Saffron
    'rgba(240, 246, 252, 0.45)',  // Radiant Silver
    'rgba(56, 189, 248, 0.55)',  // Cyan / Blue
    'rgba(0, 245, 155, 0.55)'    // Emerald
  ];

  let shootingStars = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  class ShootingStar {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * (height / 2);
      this.len = Math.random() * 80 + 40;
      this.speed = Math.random() * 7 + 4;
      this.size = Math.random() * 1.5 + 0.8;
      this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2;
      this.opacity = Math.random() * 0.7 + 0.3;
      this.dead = false;
    }

    update() {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      this.opacity -= 0.012;
      if (this.opacity <= 0 || this.x > width || this.y > height) {
        this.dead = true;
      }
    }

    draw() {
      if (this.dead) return;
      ctx.save();
      const tailX = this.x - Math.cos(this.angle) * this.len;
      const tailY = this.y - Math.sin(this.angle) * this.len;
      const grad = ctx.createLinearGradient(tailX, tailY, this.x, this.y);
      grad.addColorStop(0, 'rgba(0, 245, 155, 0)');
      grad.addColorStop(0.5, `rgba(56, 189, 248, ${this.opacity * 0.6})`);
      grad.addColorStop(1, `rgba(255, 255, 255, ${this.opacity})`);
      
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = this.size;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00F59B';
      ctx.stroke();
      ctx.restore();
    }
  }

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(init = false) {
      this.x = Math.random() * width;
      this.y = init ? Math.random() * height : height + 10;
      this.size = Math.random() * 2.2 + 0.8;
      this.speedX = (Math.random() - 0.5) * 0.45;
      this.speedY = -(Math.random() * 0.45 + 0.15);
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.alpha = Math.random() * 0.6 + 0.2;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Mouse gentle interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          this.x -= (dx / distance) * force * 2;
          this.y -= (dy / distance) * force * 2;
        }
      }

      // Reset when offscreen
      if (this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
    shootingStars = [];
  }

  function connectParticles() {
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = 0.65;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Random shooting star spawner
    if (Math.random() < 0.015 && shootingStars.length < 3) {
      shootingStars.push(new ShootingStar());
    }

    for (let i = shootingStars.length - 1; i >= 0; i--) {
      shootingStars[i].update();
      shootingStars[i].draw();
      if (shootingStars[i].dead) {
        shootingStars.splice(i, 1);
      }
    }

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    connectParticles();
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  resize();
  initParticles();
  animate();
})();
