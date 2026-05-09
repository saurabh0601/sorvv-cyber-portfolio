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
/* 6. BACKGROUND AUTONOMOUS SNAKE GAME AI    */
/* ========================================= */
const canvas = document.getElementById('snake-bg');
const ctx = canvas.getContext('2d');

let cols, rows;
const gridSize = 25; 
let snake = [{x: 10, y: 10}];
let snakeLength = 5;
let virus = {x: 20, y: 20};
let dir = {x: 1, y: 0};

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / gridSize);
    rows = Math.floor(canvas.height / gridSize);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function spawnVirus() {
    virus = {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows)
    };
}
spawnVirus();

function updateSnake() {
    if(window.innerWidth <= 600) return; // Disable background snake logic on mobile to save battery
    
    let head = snake[0];

    // Cyber Worm Pathfinding AI
    let dx = virus.x - head.x;
    let dy = virus.y - head.y;

    // Decide whether to move horizontally or vertically based on distance to virus
    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0 && dir.x !== -1) dir = {x: 1, y: 0};
        else if (dx < 0 && dir.x !== 1) dir = {x: -1, y: 0};
        else if (dy > 0 && dir.y !== -1) dir = {x: 0, y: 1};
        else if (dy < 0 && dir.y !== 1) dir = {x: 0, y: -1};
    } else {
        if (dy > 0 && dir.y !== -1) dir = {x: 0, y: 1};
        else if (dy < 0 && dir.y !== 1) dir = {x: 0, y: -1};
        else if (dx > 0 && dir.x !== -1) dir = {x: 1, y: 0};
        else if (dx < 0 && dir.x !== 1) dir = {x: -1, y: 0};
    }

    let newX = head.x + dir.x;
    let newY = head.y + dir.y;

    // Seamless Wall Wrapping (Continuous cyber world)
    if (newX >= cols) newX = 0;
    if (newX < 0) newX = cols - 1;
    if (newY >= rows) newY = 0;
    if (newY < 0) newY = rows - 1;

    snake.unshift({x: newX, y: newY});

    // Check if snake ate the virus
    if (newX === virus.x && newY === virus.y) {
        snakeLength += 3; // Grow slightly longer
        spawnVirus();
        
        // Minor visual pop effect on the background when virus is eaten
        document.getElementById('snake-bg').style.opacity = '0.8';
        setTimeout(() => document.getElementById('snake-bg').style.opacity = '0.6', 150);
    }

    // Trim snake tail
    while (snake.length > snakeLength) {
        snake.pop();
    }
}

function drawSnakeGame() {
    if(window.innerWidth <= 600) return; // Skip drawing on mobile
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the Red Virus (Food)
    ctx.fillStyle = '#ff003c';
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#ff003c';
    ctx.beginPath();
    ctx.arc(virus.x * gridSize + gridSize/2, virus.y * gridSize + gridSize/2, gridSize/2 - 4, 0, Math.PI*2);
    ctx.fill();

    // Draw the Neon Cyan Snake
    ctx.fillStyle = '#00f5ff';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#00f5ff';
    
    for (let i = 0; i < snake.length; i++) {
        // Snake fades out near the tail
        ctx.globalAlpha = 1 - (i / snake.length);
        
        // Draw segment slightly smaller than grid for blocky look
        ctx.fillRect(snake[i].x * gridSize + 2, snake[i].y * gridSize + 2, gridSize - 4, gridSize - 4);
    }
    
    // Reset canvas drawing state
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
}

// Start Game Loop (runs every 100ms)
setInterval(() => {
    updateSnake();
    drawSnakeGame();
}, 100);

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