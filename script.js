/* ========================================= */
/* 1. SCROLL & NAVIGATION FIXES              */
/* ========================================= */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) { navbar.classList.add('hidden-top'); } 
    else { navbar.classList.remove('hidden-top'); }
});

function toggleMenu() { document.getElementById('navLinks').classList.toggle('active'); }

/* ========================================= */
/* 2. DYNAMIC CURSOR & BACKGROUND TRACKING   */
/* ========================================= */
const cursor = document.getElementById('custom-cursor');
const root = document.documentElement;
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let isMoving = false;

window.addEventListener('mousemove', (e) => {
    if(window.innerWidth > 900 || window.matchMedia("(pointer: fine)").matches) {
        mouseX = e.clientX; mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        
        if (!isMoving) {
            isMoving = true;
            requestAnimationFrame(() => {
                root.style.setProperty('--mouse-x', `${mouseX}px`);
                root.style.setProperty('--mouse-y', `${mouseY}px`);
                isMoving = false;
            });
        }

        /* Trailing Sparkles */
        if(Math.random() > 0.85) { 
            let s = document.createElement('div');
            s.className = 'sparkle';
            s.style.left = e.clientX + 'px'; s.style.top = e.clientY + 'px';
            s.style.setProperty('--tx', (Math.random() * 80 - 40) + 'px');
            s.style.setProperty('--ty', (Math.random() * 80 - 40) + 'px');
            document.body.appendChild(s);
            setTimeout(() => s.remove(), 700);
        }
    }
});

/* Interactive Elements Cursor State */
const interactables = document.querySelectorAll('a, .btn, .menu-btn, .tag, #chat-toggle-btn');
interactables.forEach(el => {
    el.addEventListener('mouseenter', () => { if(window.innerWidth > 900) cursor.style.transform = 'scale(1.5)'; });
    el.addEventListener('mouseleave', () => { if(window.innerWidth > 900) cursor.style.transform = 'scale(1)'; });
});

/* ========================================= */
/* 3. INDIVIDUAL ELEMENT 3D HOVER (TILT-FX)  */
/* ========================================= */
const tiltElements = document.querySelectorAll('.tilt-fx');

tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        if(window.innerWidth > 900) {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate tilt angle limits
            const rotateX = ((y - centerY) / centerY) * -10; 
            const rotateY = ((x - centerX) / centerX) * 10;
            
            // Apply scale pop and 3D rotation relative to the exact element hovered
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
        }
    });
    
    el.addEventListener('mouseleave', () => {
        if(window.innerWidth > 900) {
            // Restore normal transform
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        }
    });
});

/* ========================================= */
/* 4. LOCALIZED 3D GLASS CLICK PRESSURE      */
/* ========================================= */
let currentDent = null;
window.addEventListener('mousedown', (e) => {
    if(e.target.closest('#chat-widget, #chat-toggle-btn')) return;

    currentDent = document.createElement('div');
    currentDent.className = 'glass-dent';
    currentDent.style.left = e.clientX + 'px';
    currentDent.style.top = e.clientY + 'px';
    document.body.appendChild(currentDent);
    
    if(window.innerWidth > 900) cursor.style.transform = 'scale(0.8)';
    
    // Check if we clicked on an interactive 3D tilted element
    const interactive = e.target.closest('.tilt-fx');
    if(interactive && window.innerWidth > 900) {
        interactive.style.transform += ' scale3d(0.95, 0.95, 0.95)';
        interactive.dataset.pressed = "true";
    }
});

window.addEventListener('mouseup', () => {
    if(currentDent) {
        currentDent.style.opacity = '0';
        currentDent.style.transform = 'translate(-50%, -50%) scale(1.5)';
        let d = currentDent;
        setTimeout(() => d.remove(), 300);
        currentDent = null;
    }
    
    if(window.innerWidth > 900) cursor.style.transform = 'scale(1)';
    
    document.querySelectorAll('[data-pressed="true"]').forEach(el => {
        el.style.transform = el.style.transform.replace(' scale3d(0.95, 0.95, 0.95)', '');
        el.dataset.pressed = "false";
    });
});

/* ========================================= */
/* 5. AI CHATBOT SHOWCASE (NO API KEY)       */
/* ========================================= */
const chatToggleBtn = document.getElementById('chat-toggle-btn');
const chatWidget = document.getElementById('chat-widget');
const closeChatBtn = document.getElementById('close-chat');
const sendChatBtn = document.getElementById('send-chat');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

chatToggleBtn.addEventListener('click', () => { chatWidget.classList.add('active'); });
closeChatBtn.addEventListener('click', () => { chatWidget.classList.remove('active'); });

function sendDemoChat() {
    const userText = chatInput.value.trim();
    if(!userText) return;

    // Show user message
    const userDiv = document.createElement('div');
    userDiv.className = 'message user-message';
    userDiv.innerText = userText;
    chatMessages.appendChild(userDiv);
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Show "thinking" message
    const aiDiv = document.createElement('div');
    aiDiv.className = 'message ai-message';
    aiDiv.innerText = "Analyzing query...";
    chatMessages.appendChild(aiDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulated API response delay (Security Demo Mode)
    setTimeout(() => {
        aiDiv.innerText = "[DEMO MODE] Security protocols engaged. The live API connection is disabled for portfolio safety. To test my real capabilities, hire Saurabh! 😉";
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1500);
}

sendChatBtn.addEventListener('click', sendDemoChat);
chatInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') sendDemoChat(); });

/* ========================================= */
/* 6. CYBER CONSTELLATION INTERACTIVE BG     */
/* ========================================= */
const canvas = document.getElementById('network-bg');
const ctx = canvas.getContext('2d');
let particles = [];
const particleCount = window.innerWidth > 900 ? 80 : 30; // Fewer particles on mobile

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.size = Math.random() * 2 + 1;
        // Alternating cyan and purple nodes
        this.color = Math.random() > 0.5 ? 'rgba(0, 245, 255, ' : 'rgba(155, 92, 255, ';
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + '0.8)';
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color + '1)';
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateNetwork() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Disable heavy drawing on mobile to save battery
    if(window.innerWidth <= 600) return requestAnimationFrame(animateNetwork);
    
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    
    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - dist/1200})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
        
        // Connect to mouse
        const dxMouse = particles[i].x - mouseX;
        const dyMouse = particles[i].y - mouseY;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        if (distMouse < 180) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 245, 255, ${0.3 - distMouse/600})`;
            ctx.lineWidth = 1.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
        }
    }
    
    requestAnimationFrame(animateNetwork);
}
animateNetwork();

/* ========================================= */
/* 7. SCROLL REVEAL OBSERVER                 */
/* ========================================= */
const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){ entry.target.classList.add('show'); }
    });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el)=>observer.observe(el));
