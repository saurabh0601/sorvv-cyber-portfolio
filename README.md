# 🛡️ Futuristic Cybersecurity Portfolio

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)]()
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)]()
[![Cybersecurity](https://img.shields.io/badge/Cybersecurity-SOC_Analyst-00f5ff?style=for-the-badge)]()

Welcome to the repository for my interactive, highly dynamic **Cybersecurity Portfolio**. Designed with a modern "neon-cyber" aesthetic, this portfolio doesn't just list my skills—it demonstrates my technical proficiency through complex front-end engineering, 3D physics simulations, and advanced DOM manipulation.

🔗 **[Live Demo: Click Here to View Portfolio](#)** *(Add your live hosted link here)*

---

## ✨ Cutting-Edge Features

This portfolio is built entirely with **Vanilla HTML, CSS, and JavaScript**—no heavy frameworks or external libraries. It features custom-built physics and animations:

* 🌌 **Cyber Constellation Network (Canvas AI):** A dynamic, interactive background particle network. Nodes float autonomously and shoot laser connections to nearby nodes and the user's cursor, simulating live network traffic.
* 🪟 **Premium 3D Glassmorphism:** Ultra-glossy UI elements featuring an "Apple-style" heavy frosted glass look, complete with dynamic light-sweep reflections on hover.
* 📐 **Advanced 3D Tilt Physics (.tilt-fx):** Hovering over cards, buttons, or images calculates the exact mouse coordinates to tilt the specific element in 3D space (`rotateX` / `rotateY`) for a holographic feel.
* 🔘 **Localized 3D Pressure Dent:** Clicking anywhere on the page generates a localized, deep "glass dent" (using heavy blur and inset shadows) precisely at the cursor's coordinates. Clicking interactive elements physically pushes them backward in Z-space.
* 🤖 **AI Chatbot Terminal (Showcase):** A sleek, floating AI assistant widget with typing animations and smooth state transitions (currently set to a secure Demo Mode).
* ✨ **Custom Neon Cursor & Sparkle Trails:** A custom SVG arrow cursor that scales on interactive elements and leaves a decaying trail of neon cyber-sparks.
* 📱 **Fully Responsive & Optimized:** Adapts perfectly to mobile devices. On touchscreens, heavy hardware-accelerated animations are gracefully degraded to preserve battery and prevent lag.

---

## 📂 File Structure

To ensure maximum performance and maintainability, the codebase is cleanly separated:

```text
📁 futuristic-cyber-portfolio/
│
├── 📄 index.html      # The core structure, layout, and UI elements.
├── 📄 style.css       # Advanced styling, glassmorphism, keyframe animations, and media queries.
├── 📄 script.js       # 3D math, canvas rendering, DOM listeners, and Chatbot logic.
└── 📁 assets/         
    └── 🖼️ profile.jpg # Profile image

🚀 Quick Setup & Installation
Since this project uses pure vanilla web technologies, no build steps, node modules, or package managers are required.

Clone the repository:

Bash
git clone [https://github.com/saurabh0601/futuristic-cyber-portfolio.git](https://github.com/saurabh0601/futuristic-cyber-portfolio.git)
Navigate to the directory:

Bash
cd futuristic-cyber-portfolio
Run the project:
Simply double-click the index.html file to open it in any modern web browser. Alternatively, use a local server extension like VS Code's "Live Server" for the best experience.

🛠️ Customization Guide
1. Activating the AI Chatbot (Connecting an API)
By default, the AI Chatbot is in "Demo Mode" to protect API keys. To make it fully functional:

Open script.js.

Locate the sendDemoChat() function.

Replace the simulated setTimeout response with an actual fetch() call to a backend serverless function (like Vercel or Netlify) that securely holds your OpenAI, Groq, or Gemini API key.

2. Adjusting Background Network Density
To change the number of floating nodes in the background based on performance needs:

Open script.js.

Find the variable: const particleCount = window.innerWidth > 900 ? 80 : 30;

Increase or decrease 80 (for desktop) or 30 (for mobile).

👨‍💻 About the Author
Saurabh Bhati
SOC Analyst • Network & System Engineer • Full Stack Developer

I am a cybersecurity professional specializing in SOC operations, network engineering, threat detection, and secure modern web development. Ranked among the Top 4% globally on TryHackMe.

LinkedIn: Saurabh Bhati Rajput

GitHub: @saurabh0601
