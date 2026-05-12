/**
 * Agent Swarm — Landing Page Interactions
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ---- Intersection Observer for reveal animations ---- */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.card, .pattern-card, .feature-item, .timeline-item, .arch-layer').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        el.style.transitionDelay = Math.random() * 0.15 + 's';
        observer.observe(el);
    });

    /* ---- Smooth scroll for nav links ---- */
    document.querySelectorAll('.nav-links a[href^="#"], .btn[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ---- Glow follows mouse on hero ---- */
    const glow = document.getElementById('heroGlow');
    if (glow) {
        document.querySelector('.hero').addEventListener('mousemove', (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            glow.style.background = `radial-gradient(500px circle at ${x}% ${y}%, rgba(240,179,75,0.08), transparent 70%)`;
        });
    }

    /* ---- Particle background ---- */
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:-1;opacity:0.3';
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.3 + 0.1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(240, 179, 75, ${p.opacity})`;
            ctx.fill();
        });

        // Connect nearby particles
        particles.forEach((a, i) => {
            for (let j = i + 1; j < particles.length; j++) {
                const b = particles[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(240, 179, 75, ${0.04 * (1 - dist / 150)})`;
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(animate);
    }
    animate();

    /* ---- Console Easter Egg ---- */
    console.log('%c🐝 Agent Swarm', 'font-size: 2rem; font-weight: bold; color: #f0b34b;');
    console.log('%c去中心化 AI 协作平台', 'font-size: 1rem; color: #8b8fa3;');
    console.log('GitHub: https://github.com/yunduanjt/agent-swarm');
});
