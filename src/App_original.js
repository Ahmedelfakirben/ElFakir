import React, { useState, useEffect, useRef } from 'react';

// Componente de selección de idioma
const LanguageSelector = ({ onLanguageSelect }) => {
    const canvasRef = useRef(null);

    // Matrix effect para el fondo
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const charArray = chars.split('');
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#0F0';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center relative overflow-hidden">
            {/* Matrix Rain Background */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 z-0 pointer-events-none"
                style={{ opacity: 0.3 }}
            />
            
            {/* Language Selection Content */}
            <div className="relative z-10 text-center">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-green-300 mb-4 glitch-text animate-pulse">
                        SELECCIONAR IDIOMA
                    </h1>
                    <p className="text-green-500 text-lg">
                        Select Language / Sélectionner la langue
                    </p>
                </div>
                
                <div className="flex gap-6 justify-center mb-8">
                    <button
                        onClick={() => onLanguageSelect('es')}
                        className="px-8 py-4 bg-green-700 hover:bg-green-600 rounded-lg text-white font-bold text-xl transition-all duration-300 transform hover:scale-105 glow-button shadow-lg"
                    >
                        🇪🇸 ESPAÑOL
                    </button>
                    <button
                        onClick={() => onLanguageSelect('en')}
                        className="px-8 py-4 bg-green-700 hover:bg-green-600 rounded-lg text-white font-bold text-xl transition-all duration-300 transform hover:scale-105 glow-button shadow-lg"
                    >
                        🇬🇧 ENGLISH
                    </button>
                    <button
                        onClick={() => onLanguageSelect('fr')}
                        className="px-8 py-4 bg-green-700 hover:bg-green-600 rounded-lg text-white font-bold text-xl transition-all duration-300 transform hover:scale-105 glow-button shadow-lg"
                    >
                        🇫🇷 FRANÇAIS
                    </button>
                </div>
                
                <p className="text-green-600 text-sm">
                    Elige tu idioma preferido / Choose your preferred language / Choisissez votre langue préférée
                </p>
            </div>
            
            {/* Styles */}
            <style jsx>{`
                .glitch-text {
                    animation: glitch 2s infinite;
                }
                
                .glow-button {
                    box-shadow: 0 0 15px rgba(0, 255, 0, 0.3);
                    transition: box-shadow 0.3s ease;
                }
                
                .glow-button:hover {
                    box-shadow: 0 0 25px rgba(0, 255, 0, 0.6);
                }
                
                @keyframes glitch {
                    0%, 100% { transform: translateX(0); }
                    20% { transform: translateX(-2px); }
                    40% { transform: translateX(2px); }
                    60% { transform: translateX(-1px); }
                    80% { transform: translateX(1px); }
                }
            `}</style>
        </div>
    );
};

const MatrixPortfolio = ({ selectedLanguage }) => {
    const [currentSection, setCurrentSection] = useState('home');
    const [command, setCommand] = useState('');
    const [terminalHistory, setTerminalHistory] = useState([]);
    const [showTerminal, setShowTerminal] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [displayedContent, setDisplayedContent] = useState('');
    const [isContentTyping, setIsContentTyping] = useState(false);
    const [matrixPaused, setMatrixPaused] = useState(false);
    const [showMatrixHint, setShowMatrixHint] = useState(true);
    const [currentLanguage, setCurrentLanguage] = useState(selectedLanguage || 'es');
    const [isBuilding, setIsBuilding] = useState(true); // New state for building effect
    const [buildingProgress, setBuildingProgress] = useState(0); // Progress of building effect
    const canvasRef = useRef(null);
    const buildingCanvasRef = useRef(null); // Canvas for building effect
    const inputRef = useRef(null);
    const terminalRef = useRef(null);
    const animationIdRef = useRef(null);
    const buildingAnimationRef = useRef(null);

    // Update language when selectedLanguage prop changes
    useEffect(() => {
        setCurrentLanguage(selectedLanguage || 'es');
        // Reset building state when language changes
        setIsBuilding(true);
        setBuildingProgress(0);
        
        // Start building sequence after a short delay
        setTimeout(() => {
            startBuildingSequence();
        }, 500);
    }, [selectedLanguage]);

    // Building sequence effect - SHORTENED WITH INTENSE CRASH
    const startBuildingSequence = () => {
        let progress = 0;
        const buildingMessages = {
            es: [
                'COMPILANDO INTERFAZ...',
                'CARGANDO SISTEMA...',
                'ACTIVANDO MATRIZ...',
                'FINALIZANDO...'
            ],
            en: [
                'COMPILING INTERFACE...',
                'LOADING SYSTEM...',
                'ACTIVATING MATRIX...',
                'FINALIZING...'
            ],
            fr: [
                'COMPILATION INTERFACE...',
                'CHARGEMENT SYSTÈME...',
                'ACTIVATION MATRICE...',
                'FINALISATION...'
            ]
        };
        
        const messages = buildingMessages[currentLanguage] || buildingMessages.es;
        let messageIndex = 0;
        
        const interval = setInterval(() => {
            progress += 25; // 4 steps = 25% each - MUCH FASTER
            setBuildingProgress(progress);
            
            // Add building messages to terminal history
            if (messageIndex < messages.length) {
                setTerminalHistory(prev => [...prev, `> ${messages[messageIndex]}`]);
                messageIndex++;
            }
            
            if (progress >= 100) {
                clearInterval(interval);
                
                // INTENSE CRASH SEQUENCE
                setTerminalHistory(prev => [...prev, '> SISTEMA AL 100%']);
                
                // Short pause before crash
                setTimeout(() => {
                    setTerminalHistory(prev => [...prev, '> CRITICAL_ERROR_DETECTED']);
                    setTerminalHistory(prev => [...prev, '> SYSTEM_OVERLOAD']);
                    setTerminalHistory(prev => [...prev, '> REBOOTING...']);
                    
                    // Final crash with flash
                    setTimeout(() => {
                        // Create the final green flash
                        const flashElement = document.createElement('div');
                        flashElement.style.position = 'fixed';
                        flashElement.style.top = '0';
                        flashElement.style.left = '0';
                        flashElement.style.width = '100vw';
                        flashElement.style.height = '100vh';
                        flashElement.style.backgroundColor = '#00FF00';
                        flashElement.style.zIndex = '9999';
                        flashElement.style.opacity = '0';
                        flashElement.style.transition = 'opacity 0.05s';
                        document.body.appendChild(flashElement);
                        
                        // Flash effect
                        setTimeout(() => {
                            flashElement.style.opacity = '0.8';
                        }, 10);
                        
                        setTimeout(() => {
                            flashElement.style.opacity = '0';
                        }, 80); // Very quick flash
                        
                        setTimeout(() => {
                            document.body.removeChild(flashElement);
                            setTerminalHistory(prev => [...prev, '> REBOOT_COMPLETE']);
                            setIsBuilding(false);
                            setBuildingProgress(0);
                        }, 150);
                        
                    }, 400); // Quick crash sequence
                }, 300); // Brief pause
            }
        }, 400); // Much faster - 400ms per step
    };

    // Matrix Building Effect - INTENSE CRASH VERSION
    useEffect(() => {
        if (!isBuilding) return;
        
        const canvas = buildingCanvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Enhanced character sets for dramatic effect
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>?/\\|~`!+=-.アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const charArray = chars.split('');
        const specialChars = ['█', '■', '●', '★', 'ERROR', 'CRASH', 'FAIL'];
        const codeWords = ['SYSTEM', 'ERROR', 'CRASH', 'FAIL', 'OVERLOAD', 'CRITICAL'];

        const fontSize = 12;
        const baseColumns = Math.ceil(canvas.width / fontSize);
        let columns = baseColumns;
        const drops = [];
        const speeds = [];
        const colors = [];
        const alphas = [];
        const specialTypes = [];

        // Initialize arrays
        const initializeArrays = (size) => {
            for (let i = drops.length; i < size; i++) {
                drops[i] = Math.random() * -150;
                speeds[i] = Math.random() * 3 + 1.5;
                colors[i] = Math.random() * 360;
                alphas[i] = 0.6 + Math.random() * 0.4;
                specialTypes[i] = Math.random() < 0.1 ? Math.floor(Math.random() * 3) : 0;
            }
        };

        initializeArrays(columns);

        let time = 0;
        let frameCount = 0;
        let crashMode = false;

        const draw = () => {
            time += 0.03;
            frameCount++;
            
            // CRASH MODE - Intense final phase
            if (buildingProgress >= 90 && !crashMode) {
                crashMode = true;
                // Double the density for crash
                columns = baseColumns * 2;
                initializeArrays(columns);
            }
            
            // Background clear - more intense during crash
            const bgAlpha = crashMode ? 0.01 : 0.05; // More trailing during crash
            ctx.fillStyle = `rgba(0, 0, 0, ${bgAlpha})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Multiple passes during crash
            const passes = crashMode ? 3 : 1;
            
            for (let pass = 0; pass < passes; pass++) {
                for (let i = 0; i < columns; i++) {
                    const x = (i * fontSize) + (pass * fontSize / 3);
                    
                    // Intense crash colors
                    let hue, saturation, lightness;
                    
                    if (buildingProgress < 25) {
                        hue = (colors[i] + time * 20) % 360;
                        saturation = 80;
                        lightness = 50 + Math.sin(time + i * 0.1) * 20;
                    } else if (buildingProgress < 50) {
                        hue = 180 + Math.sin(time + i * 0.1) * 30;
                        saturation = 85;
                        lightness = 55;
                    } else if (buildingProgress < 75) {
                        hue = 120 + Math.sin(time + i * 0.1) * 20;
                        saturation = 90;
                        lightness = 60;
                    } else if (buildingProgress < 90) {
                        // Pre-crash: Intensifying green
                        hue = 120;
                        saturation = 100;
                        lightness = 65 + Math.sin(time * 8 + i) * 25;
                    } else {
                        // CRASH MODE: Chaotic colors, heavy red/yellow flashes
                        if (Math.random() > 0.7) {
                            hue = Math.random() > 0.5 ? 0 : 60; // Red or yellow
                            saturation = 100;
                            lightness = 80 + Math.random() * 20;
                        } else {
                            hue = 120; // Matrix green
                            saturation = 100;
                            lightness = 70 + Math.sin(time * 15 + i) * 30;
                        }
                    }
                    
                    ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alphas[i]})`;
                    
                    // Dynamic font during crash
                    const crashFontScale = crashMode ? 1 + Math.sin(time * 12 + i) * 0.5 : 1;
                    ctx.font = `${fontSize * crashFontScale}px monospace`;
                    
                    // More characters during crash
                    const charCount = crashMode ? 6 : 3;
                    
                    for (let j = 0; j < charCount; j++) {
                        let text;
                        
                        // More error messages during crash
                        if (crashMode && Math.random() > 0.8) {
                            text = specialChars[Math.floor(Math.random() * specialChars.length)];
                        } else if (specialTypes[i] === 2 && j === 0) {
                            text = codeWords[Math.floor(Math.random() * codeWords.length)];
                        } else if (specialTypes[i] === 1 && Math.random() > 0.7) {
                            text = specialChars[Math.floor(Math.random() * specialChars.length)];
                        } else {
                            text = charArray[Math.floor(Math.random() * charArray.length)];
                        }
                        
                        const y = (drops[i] + j * 18) * fontSize;
                        
                        if (y > 0 && y < canvas.height + 50) {
                            let renderX = x;
                            
                            // Intense glitch during crash
                            if (crashMode && Math.random() > 0.6) {
                                renderX += (Math.random() - 0.5) * 20;
                                
                                // Random distortion effects
                                if (Math.random() > 0.9) {
                                    ctx.fillStyle = `hsla(${hue + 180}, 100%, 80%, 0.4)`;
                                    ctx.fillRect(renderX - 5, y - 10, 15, 20);
                                }
                            }
                            
                            // Main character
                            ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alphas[i]})`;
                            ctx.fillText(text, renderX, y);
                            
                            // Intense glow during crash
                            if (crashMode && Math.random() > 0.8) {
                                ctx.shadowColor = `hsl(${hue}, 100%, 90%)`;
                                ctx.shadowBlur = 10 + Math.sin(time * 8) * 5;
                                ctx.fillText(text, renderX, y);
                                ctx.shadowBlur = 0;
                            }
                        }
                    }

                    // Faster speeds during crash
                    const speedMultiplier = crashMode ? 
                        2 + Math.sin(time * 10 + i) * 1.5 : 
                        1 + (buildingProgress * 0.02);
                    
                    drops[i] += speeds[i] * speedMultiplier;

                    // Reset with new properties
                    if (drops[i] > (canvas.height / fontSize) + 10) {
                        drops[i] = -5 - Math.random() * 10;
                        if (Math.random() > 0.9) {
                            colors[i] = Math.random() * 360;
                            specialTypes[i] = crashMode ? 
                                Math.floor(Math.random() * 3) : 
                                (Math.random() < 0.1 ? Math.floor(Math.random() * 3) : 0);
                        }
                    }
                }
            }
            
            // Crash effects - screen distortions
            if (crashMode) {
                // Random screen artifacts
                if (Math.random() > 0.9) {
                    for (let i = 0; i < 5; i++) {
                        const x = Math.random() * canvas.width;
                        const y = Math.random() * canvas.height;
                        const w = Math.random() * 50 + 10;
                        const h = Math.random() * 20 + 5;
                        ctx.fillStyle = `hsla(${Math.random() * 360}, 100%, 70%, 0.3)`;
                        ctx.fillRect(x, y, w, h);
                    }
                }
                
                // Intense energy bursts
                if (frameCount % 10 === 0 && Math.random() > 0.5) {
                    const burstX = Math.random() * canvas.width;
                    const burstY = Math.random() * canvas.height;
                    const gradient = ctx.createRadialGradient(burstX, burstY, 0, burstX, burstY, 40);
                    gradient.addColorStop(0, 'hsla(120, 100%, 80%, 0.6)');
                    gradient.addColorStop(1, 'hsla(120, 100%, 80%, 0)');
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(burstX, burstY, 40, 0, Math.PI * 2);
                    ctx.fill();
                }
                
                // Screen shake effect (visual noise)
                if (Math.random() > 0.95) {
                    ctx.fillStyle = `rgba(${Math.random() * 255}, 255, ${Math.random() * 255}, 0.1)`;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }
            }

            buildingAnimationRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (buildingAnimationRef.current) {
                cancelAnimationFrame(buildingAnimationRef.current);
            }
        };
    }, [isBuilding, buildingProgress]);

    // Matrix Rain Effect (Portfolio Background)
    useEffect(() => {
        if (isBuilding) return; // Don't run if building effect is active
        
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Matrix characters
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const charArray = chars.split('');

        const fontSize = 14;
        const columns = Math.ceil(canvas.width / fontSize);
        const drops = [];

        // Initialize drops
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const draw = () => {
            if (matrixPaused) {
                animationIdRef.current = requestAnimationFrame(draw);
                return;
            }

            // Semi-transparent black background for trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0'; // Matrix green
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            animationIdRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
        };
    }, [matrixPaused, isBuilding]);

    // Multi-language content
    const portfolioData = {
        es: {
            home: {
                title: "Ahmed El Fakir",
                subtitle: "IT Specialist",
                content: `
╔══════════════════════════════════════════════════════════════════╗
║                 BIENVENIDO A MI PORTAFOLIO DIGITAL              ║
╚══════════════════════════════════════════════════════════════════╝

Especialista en IT con 3+ años de experiencia
Técnico en Soporte IT & Centro de Atención al Usuario (CAU)
Administración de infraestructuras Microsoft
Experiencia en Help Desk L1/L2 y gestión de incidencias

Tétouan, Marruecos
ahmed@elfakir.com
(+212) 656185848

═══════════════════════════════════════════════════════════════════

Navega usando el menú lateral o escribe comandos como un hacker!
Tip: Prueba escribiendo "whoami" o "skills"`
            },
            about: {
                title: "Sobre Mí",
                content: `
╔══════════════════════════════════════════════════════════════════╗
║                            PERFIL PROFESIONAL                   ║
╚══════════════════════════════════════════════════════════════════╝

AHMED EL FAKIR
IT Specialist

═══════════════════════════════════════════════════════════════════

RESUMEN PROFESIONAL:

Profesional de IT con más de 3 años de experiencia combinada en:

• Soporte técnico de Nivel 1 y 2
• Centro de Atención al Usuario (CAU)
• Operaciones SOC enfocadas en Firewalls
• Entornos Microsoft (AD, 365, Intune, Exchange)
• Monitorización de seguridad
• Automatización de procesos
• CRM y herramientas de contact center

═══════════════════════════════════════════════════════════════════

OBJETIVOS:
Garantizar la operatividad y eficiencia de sistemas IT, proporcionando
soporte excepcional y contribuyendo a la postura de seguridad 
organizacional a través de la mejora continua y automatización.`
            },
            experience: {
                title: "Experiencia Profesional",
                content: `
╔══════════════════════════════════════════════════════════════════╗
║                        HISTORIAL LABORAL                        ║
╚══════════════════════════════════════════════════════════════════╝

TRAYECTORIA PROFESIONAL
═══════════════════════════════════════════════════════════════════

🔹 TÉCNICO DE SOPORTE IT (2021 - PRESENTE)
   ├─ Centro de Atención al Usuario (CAU)
   ├─ Resolución de incidencias L1/L2
   ├─ Gestión de tickets y escalamiento
   └─ Soporte remoto y presencial

🔹 ESPECIALISTA SOC - FIREWALLS (2022 - PRESENTE)
   ├─ Monitorización de seguridad 24/7
   ├─ Análisis de eventos de seguridad
   ├─ Configuración y mantenimiento de firewalls
   └─ Respuesta a incidentes de seguridad

🔹 ADMINISTRADOR MICROSOFT (2021 - PRESENTE)
   ├─ Active Directory Administration
   ├─ Microsoft 365 & Exchange Online
   ├─ Intune Device Management
   └─ PowerShell Automation

═══════════════════════════════════════════════════════════════════

LOGROS DESTACADOS:
• Reducción del 40% en tiempo de resolución de tickets
• Implementación de procesos automatizados
• Mejora en la satisfacción del usuario final
• Optimización de políticas de seguridad`
            },
            skills: {
                title: "Habilidades Técnicas",
                content: `
╔══════════════════════════════════════════════════════════════════╗
║                          STACK TECNOLÓGICO                      ║
╚══════════════════════════════════════════════════════════════════╝

COMPETENCIAS TÉCNICAS
═══════════════════════════════════════════════════════════════════

🔧 SISTEMAS OPERATIVOS
   ├─ Windows Server 2016/2019/2022     [████████░░] 85%
   ├─ Windows 10/11 Enterprise          [██████████] 95%
   ├─ Linux (Ubuntu, CentOS)            [██████░░░░] 70%
   └─ VMware vSphere                     [████████░░] 80%

🔧 MICROSOFT ECOSYSTEM
   ├─ Active Directory                   [██████████] 90%
   ├─ Exchange Online/On-Premises       [████████░░] 85%
   ├─ Microsoft 365 Admin               [██████████] 95%
   ├─ Intune (MDM/MAM)                  [████████░░] 80%
   └─ PowerShell Scripting              [███████░░░] 75%

🔧 SEGURIDAD & REDES
   ├─ Firewall Management               [████████░░] 85%
   ├─ Network Monitoring                [███████░░░] 75%
   ├─ Incident Response                 [████████░░] 80%
   └─ Security Policies                 [███████░░░] 75%

🔧 HERRAMIENTAS & PLATAFORMAS
   ├─ ServiceNow / ITSM                 [████████░░] 80%
   ├─ CRM Systems                       [███████░░░] 70%
   ├─ Remote Support Tools              [██████████] 90%
   └─ Ticketing Systems                 [██████████] 95%

═══════════════════════════════════════════════════════════════════

CERTIFICACIONES & FORMACIÓN:
• Microsoft 365 Certified
• ITIL v4 Foundation
• CompTIA Security+ (En progreso)
• Cisco CCNA (Estudiando)`
            },
            projects: {
                title: "Proyectos Destacados",
                content: `
╔══════════════════════════════════════════════════════════════════╗
║                        PORTFOLIO DE PROYECTOS                   ║
╚══════════════════════════════════════════════════════════════════╝

PROYECTOS IMPLEMENTADOS
═══════════════════════════════════════════════════════════════════

🚀 AUTOMATIZACIÓN DE PROCESOS IT
   ├─ Tecnologías: PowerShell, Microsoft Graph API
   ├─ Objetivo: Automatizar tareas repetitivas del CAU
   ├─ Resultado: -60% tiempo en tareas administrativas
   └─ Estado: ✅ COMPLETADO

🚀 MIGRACIÓN A MICROSOFT 365
   ├─ Tecnologías: Exchange Online, SharePoint, Teams
   ├─ Objetivo: Migrar infraestructura on-premise a cloud
   ├─ Resultado: 150+ usuarios migrados exitosamente
   └─ Estado: ✅ COMPLETADO

🚀 IMPLEMENTACIÓN DE MDM CON INTUNE
   ├─ Tecnologías: Microsoft Intune, Azure AD
   ├─ Objetivo: Gestión centralizada de dispositivos
   ├─ Resultado: 200+ dispositivos bajo gestión
   └─ Estado: ✅ COMPLETADO

🚀 SISTEMA DE MONITORIZACIÓN SOC
   ├─ Tecnologías: SIEM, Firewall Logs, PowerBI
   ├─ Objetivo: Dashboard de seguridad en tiempo real
   ├─ Resultado: Detección temprana de amenazas
   └─ Estado: 🔄 EN MEJORA CONTINUA

🚀 OPTIMIZACIÓN DE HELP DESK
   ├─ Tecnologías: ServiceNow, Knowledge Base
   ├─ Objetivo: Mejorar tiempo de resolución
   ├─ Resultado: SLA cumplido en 95% de casos
   └─ Estado: ✅ COMPLETADO

═══════════════════════════════════════════════════════════════════

PRÓXIMOS PROYECTOS:
• Implementación de Zero Trust Architecture
• Automatización con Azure DevOps
• Upgrade a Windows Server 2025`
            },
            contact: {
                title: "Información de Contacto",
                content: `
╔══════════════════════════════════════════════════════════════════╗
║                        CANALES DE COMUNICACIÓN                  ║
╚══════════════════════════════════════════════════════════════════╝

CONTACTO PROFESIONAL
═══════════════════════════════════════════════════════════════════

📧 EMAIL PRINCIPAL
   ahmed@elfakir.com
   
📱 TELÉFONO/WHATSAPP
   (+212) 656185848
   
🌐 SITIO WEB
   https://www.elfakir.com
   
📍 UBICACIÓN
   Tétouan, Tanger-Tetouan-Al Hoceima
   Marruecos

═══════════════════════════════════════════════════════════════════

REDES PROFESIONALES
═══════════════════════════════════════════════════════════════════

💼 LINKEDIN
   linkedin.com/in/ahmed-elfakir
   
🐙 GITHUB
   github.com/ahmed-elfakir
   
🐦 TWITTER
   @ahmed_elfakir

═══════════════════════════════════════════════════════════════════

DISPONIBILIDAD
═══════════════════════════════════════════════════════════════════

⏰ HORARIO DE CONTACTO
   Lunes - Viernes: 09:00 - 18:00 (GMT+1)
   Sábados: 10:00 - 14:00 (GMT+1)
   
🚀 RESPUESTA
   Email: < 24 horas
   WhatsApp: < 4 horas
   
💡 CONSULTAS
   ✅ Consultoría IT
   ✅ Soporte técnico
   ✅ Proyectos colaborativos
   ✅ Oportunidades laborales

═══════════════════════════════════════════════════════════════════

¿Listo para conectar? ¡Enviame un mensaje!`
            },
            navigationItems: [
                { id: 'home', label: 'Inicio', cmd: 'home' },
                { id: 'about', label: 'Sobre Mí', cmd: 'about' },
                { id: 'experience', label: 'Experiencia', cmd: 'experience' },
                { id: 'skills', label: 'Habilidades', cmd: 'skills' },
                { id: 'projects', label: 'Proyectos', cmd: 'projects' },
                { id: 'contact', label: 'Contacto', cmd: 'contact' }
            ],
            ui: {
                matrixHint: "Puedes pausar el efecto Matrix",
                pauseButton: "Pausar Efecto",
                resumeButton: "Reanudar Efecto",
                loading: "CARGANDO DATOS...",
                terminal: "ELFAKIR TERMINAL v3.0 - Neural Interface Active"
            }
        },
        en: {
            home: {
                title: "Ahmed El Fakir",
                subtitle: "IT Specialist",
                content: `
╔══════════════════════════════════════════════════════════════════╗
║                   WELCOME TO MY DIGITAL PORTFOLIO               ║
╚══════════════════════════════════════════════════════════════════╝

IT Specialist with 3+ years of experience
IT Support Technician & Customer Service Center (CAU)
Microsoft Infrastructure Administration
Help Desk L1/L2 experience and incident management

Tétouan, Morocco
ahmed@elfakir.com
(+212) 656185848

═══════════════════════════════════════════════════════════════════

Navigate using the sidebar menu or type commands like a hacker!
Tip: Try typing "whoami" or "skills"`
            },
            about: {
                title: "About Me",
                content: `
╔══════════════════════════════════════════════════════════════════╗
║                           PROFESSIONAL PROFILE                  ║
╚══════════════════════════════════════════════════════════════════╝

AHMED EL FAKIR
IT Specialist

═══════════════════════════════════════════════════════════════════

PROFESSIONAL SUMMARY:

IT Professional with over 3 years of combined experience in:

• Level 1 and 2 Technical Support
• Customer Service Center (CAU)
• SOC Operations focused on Firewalls
• Microsoft Environments (AD, 365, Intune, Exchange)
• Security Monitoring
• Process Automation
• CRM and contact center tools

═══════════════════════════════════════════════════════════════════

OBJECTIVES:
Ensure IT systems operability and efficiency, providing exceptional
support and contributing to organizational security posture through
continuous improvement and automation.`
            },
            experience: {
                title: "Professional Experience",
                content: `
╔══════════════════════════════════════════════════════════════════╗
║                           WORK HISTORY                          ║
╚══════════════════════════════════════════════════════════════════╝

PROFESSIONAL JOURNEY
═══════════════════════════════════════════════════════════════════

🔹 IT SUPPORT TECHNICIAN (2021 - PRESENT)
   ├─ Customer Service Center (CAU)
   ├─ L1/L2 Incident Resolution
   ├─ Ticket Management & Escalation
   └─ Remote & On-site Support

🔹 SOC SPECIALIST - FIREWALLS (2022 - PRESENT)
   ├─ 24/7 Security Monitoring
   ├─ Security Event Analysis
   ├─ Firewall Configuration & Maintenance
   └─ Security Incident Response

🔹 MICROSOFT ADMINISTRATOR (2021 - PRESENT)
   ├─ Active Directory Administration
   ├─ Microsoft 365 & Exchange Online
   ├─ Intune Device Management
   └─ PowerShell Automation

═══════════════════════════════════════════════════════════════════

KEY ACHIEVEMENTS:
• 40% reduction in ticket resolution time
• Implementation of automated processes
• Improved end-user satisfaction
• Security policy optimization`
            },
            skills: {
                title: "Technical Skills",
                content: `
╔══════════════════════════════════════════════════════════════════╗
║                         TECHNOLOGY STACK                        ║
╚══════════════════════════════════════════════════════════════════╝

TECHNICAL COMPETENCIES
═══════════════════════════════════════════════════════════════════

🔧 OPERATING SYSTEMS
   ├─ Windows Server 2016/2019/2022     [████████░░] 85%
   ├─ Windows 10/11 Enterprise          [██████████] 95%
   ├─ Linux (Ubuntu, CentOS)            [██████░░░░] 70%
   └─ VMware vSphere                     [████████░░] 80%

🔧 MICROSOFT ECOSYSTEM
   ├─ Active Directory                   [██████████] 90%
   ├─ Exchange Online/On-Premises       [████████░░] 85%
   ├─ Microsoft 365 Admin               [██████████] 95%
   ├─ Intune (MDM/MAM)                  [████████░░] 80%
   └─ PowerShell Scripting              [███████░░░] 75%

🔧 SECURITY & NETWORKING
   ├─ Firewall Management               [████████░░] 85%
   ├─ Network Monitoring                [███████░░░] 75%
   ├─ Incident Response                 [████████░░] 80%
   └─ Security Policies                 [███████░░░] 75%

🔧 TOOLS & PLATFORMS
   ├─ ServiceNow / ITSM                 [████████░░] 80%
   ├─ CRM Systems                       [███████░░░] 70%
   ├─ Remote Support Tools              [██████████] 90%
   └─ Ticketing Systems                 [██████████] 95%

═══════════════════════════════════════════════════════════════════

CERTIFICATIONS & TRAINING:
• Microsoft 365 Certified
• ITIL v4 Foundation
• CompTIA Security+ (In Progress)
• Cisco CCNA (Studying)`
            },
            projects: {
                title: "Featured Projects",
                content: `
╔══════════════════════════════════════════════════════════════════╗
║                         PROJECT PORTFOLIO                       ║
╚══════════════════════════════════════════════════════════════════╝

IMPLEMENTED PROJECTS
═══════════════════════════════════════════════════════════════════

🚀 IT PROCESS AUTOMATION
   ├─ Technologies: PowerShell, Microsoft Graph API
   ├─ Objective: Automate repetitive CAU tasks
   ├─ Result: -60% time on administrative tasks
   └─ Status: ✅ COMPLETED

🚀 MICROSOFT 365 MIGRATION
   ├─ Technologies: Exchange Online, SharePoint, Teams
   ├─ Objective: Migrate on-premise infrastructure to cloud
   ├─ Result: 150+ users successfully migrated
   └─ Status: ✅ COMPLETED

🚀 MDM IMPLEMENTATION WITH INTUNE
   ├─ Technologies: Microsoft Intune, Azure AD
   ├─ Objective: Centralized device management
   ├─ Result: 200+ devices under management
   └─ Status: ✅ COMPLETED

🚀 SOC MONITORING SYSTEM
   ├─ Technologies: SIEM, Firewall Logs, PowerBI
   ├─ Objective: Real-time security dashboard
   ├─ Result: Early threat detection
   └─ Status: 🔄 CONTINUOUS IMPROVEMENT

🚀 HELP DESK OPTIMIZATION
   ├─ Technologies: ServiceNow, Knowledge Base
   ├─ Objective: Improve resolution time
   ├─ Result: SLA achieved in 95% of cases
   └─ Status: ✅ COMPLETED

═══════════════════════════════════════════════════════════════════

UPCOMING PROJECTS:
• Zero Trust Architecture Implementation
• Azure DevOps Automation
• Windows Server 2025 Upgrade`
            },
            contact: {
                title: "Contact Information",
                content: `
╔══════════════════════════════════════════════════════════════════╗
║                       COMMUNICATION CHANNELS                    ║
╚══════════════════════════════════════════════════════════════════╝

PROFESSIONAL CONTACT
═══════════════════════════════════════════════════════════════════

📧 PRIMARY EMAIL
   ahmed@elfakir.com
   
📱 PHONE/WHATSAPP
   (+212) 656185848
   
🌐 WEBSITE
   https://www.elfakir.com
   
📍 LOCATION
   Tétouan, Tanger-Tetouan-Al Hoceima
   Morocco

═══════════════════════════════════════════════════════════════════

PROFESSIONAL NETWORKS
═══════════════════════════════════════════════════════════════════

💼 LINKEDIN
   linkedin.com/in/ahmed-elfakir
   
🐙 GITHUB
   github.com/ahmed-elfakir
   
🐦 TWITTER
   @ahmed_elfakir

═══════════════════════════════════════════════════════════════════

AVAILABILITY
═══════════════════════════════════════════════════════════════════

⏰ CONTACT HOURS
   Monday - Friday: 09:00 - 18:00 (GMT+1)
   Saturday: 10:00 - 14:00 (GMT+1)
   
🚀 RESPONSE TIME
   Email: < 24 hours
   WhatsApp: < 4 hours
   
💡 INQUIRIES
   ✅ IT Consulting
   ✅ Technical Support
   ✅ Collaborative Projects
   ✅ Job Opportunities

═══════════════════════════════════════════════════════════════════

Ready to connect? Send me a message!`
            },
            navigationItems: [
                { id: 'home', label: 'Home', cmd: 'home' },
                { id: 'about', label: 'About Me', cmd: 'about' },
                { id: 'experience', label: 'Experience', cmd: 'experience' },
                { id: 'skills', label: 'Skills', cmd: 'skills' },
                { id: 'projects', label: 'Projects', cmd: 'projects' },
                { id: 'contact', label: 'Contact', cmd: 'contact' }
            ],
            ui: {
                matrixHint: "You can pause the Matrix effect",
                pauseButton: "Pause Effect",
                resumeButton: "Resume Effect",
                loading: "LOADING DATA...",
                terminal: "ELFAKIR TERMINAL v3.0 - Neural Interface Active"
            }
        },
        fr: {
            home: {
                title: "Ahmed El Fakir",
                subtitle: "Spécialiste IT",
                content: `
╔══════════════════════════════════════════════════════════════════╗
║                 BIENVENUE DANS MON PORTFOLIO NUMÉRIQUE          ║
╚══════════════════════════════════════════════════════════════════╝

Spécialiste IT avec 3+ années d'expérience
Technicien Support IT & Centre d'Attention Utilisateur (CAU)
Administration d'infrastructures Microsoft
Expérience Help Desk L1/L2 et gestion d'incidents

Tétouan, Maroc
ahmed@elfakir.com
(+212) 656185848

═══════════════════════════════════════════════════════════════════

Naviguez avec le menu latéral ou tapez des commandes comme un hacker!
Astuce: Essayez de taper "whoami" ou "skills"`
            },
            about: {
                title: "À Propos de Moi",
                content: `
╔══════════════════════════════════════════════════════════════════╗
║                         PROFIL PROFESSIONNEL                    ║
╚══════════════════════════════════════════════════════════════════╝

AHMED EL FAKIR
Spécialiste IT

═══════════════════════════════════════════════════════════════════

RÉSUMÉ PROFESSIONNEL:

Professionnel IT avec plus de 3 années d'expérience combinée dans:

• Support technique Niveau 1 et 2
• Centre d'Attention Utilisateur (CAU)
• Opérations SOC axées sur les Firewalls
• Environnements Microsoft (AD, 365, Intune, Exchange)
• Surveillance de sécurité
• Automatisation de processus
• CRM et outils de centre de contact

═══════════════════════════════════════════════════════════════════

OBJECTIFS:
Garantir l'opérabilité et l'efficacité des systèmes IT, en fournissant
un support exceptionnel et en contribuant à la posture de sécurité
organisationnelle grâce à l'amélioration continue et l'automatisation.`
            },
            experience: {
                title: "Expérience Professionnelle",
                content: `
╔══════════════════════════════════════════════════════════════════╗
║                        HISTORIQUE PROFESSIONNEL                 ║
╚══════════════════════════════════════════════════════════════════╝

PARCOURS PROFESSIONNEL
═══════════════════════════════════════════════════════════════════

🔹 TECHNICIEN SUPPORT IT (2021 - PRÉSENT)
   ├─ Centre d'Attention Utilisateur (CAU)
   ├─ Résolution d'incidents L1/L2
   ├─ Gestion de tickets et escalade
   └─ Support à distance et sur site

🔹 SPÉCIALISTE SOC - FIREWALLS (2022 - PRÉSENT)
   ├─ Surveillance de sécurité 24/7
   ├─ Analyse d'événements de sécurité
   ├─ Configuration et maintenance des firewalls
   └─ Réponse aux incidents de sécurité

🔹 ADMINISTRATEUR MICROSOFT (2021 - PRÉSENT)
   ├─ Administration Active Directory
   ├─ Microsoft 365 & Exchange Online
   ├─ Gestion des appareils Intune
   └─ Automatisation PowerShell

═══════════════════════════════════════════════════════════════════

RÉALISATIONS CLÉS:
• Réduction de 40% du temps de résolution des tickets
• Implémentation de processus automatisés
• Amélioration de la satisfaction utilisateur
• Optimisation des politiques de sécurité`
            },
            skills: {
                title: "Compétences Techniques",
                content: `
╔══════════════════════════════════════════════════════════════════╗
║                      STACK TECHNOLOGIQUE                         ║
╚══════════════════════════════════════════════════════════════════╝

COMPÉTENCES TECHNIQUES
═══════════════════════════════════════════════════════════════════

🔧 SYSTÈMES D'EXPLOITATION
   ├─ Windows Server 2016/2019/2022     [████████░░] 85%
   ├─ Windows 10/11 Enterprise          [██████████] 95%
   ├─ Linux (Ubuntu, CentOS)            [██████░░░░] 70%
   └─ VMware vSphere                     [████████░░] 80%

🔧 ÉCOSYSTÈME MICROSOFT
   ├─ Active Directory                   [██████████] 90%
   ├─ Exchange Online/On-Premises       [████████░░] 85%
   ├─ Microsoft 365 Admin               [██████████] 95%
   ├─ Intune (MDM/MAM)                  [████████░░] 80%
   └─ PowerShell Scripting              [███████░░░] 75%

🔧 SÉCURITÉ & RÉSEAUX
   ├─ Gestion de Firewalls               [████████░░] 85%
   ├─ Surveillance Réseau                [███████░░░] 75%
   ├─ Réponse aux Incidents             [████████░░] 80%
   └─ Politiques de Sécurité            [███████░░░] 75%

🔧 OUTILS & PLATEFORMES
   ├─ ServiceNow / ITSM                 [████████░░] 80%
   ├─ Systèmes CRM                      [███████░░░] 70%
   ├─ Outils de Support à Distance      [██████████] 90%
   └─ Systèmes de Ticketing             [██████████] 95%

═══════════════════════════════════════════════════════════════════

CERTIFICATIONS & FORMATION:
• Microsoft 365 Certifié
• ITIL v4 Foundation
• CompTIA Security+ (En cours)
• Cisco CCNA (En formation)`
            },
            projects: {
                title: "Projets Phares",
                content: `
╔══════════════════════════════════════════════════════════════════╗
║                       PORTFOLIO DE PROJETS                     ║
╚══════════════════════════════════════════════════════════════════╝

PROJETS IMPLÉMENTÉS
═══════════════════════════════════════════════════════════════════

🚀 AUTOMATISATION PROCESSUS IT
   ├─ Technologies: PowerShell, Microsoft Graph API
   ├─ Objectif: Automatiser les tâches répétitives du CAU
   ├─ Résultat: -60% temps sur les tâches administratives
   └─ Statut: ✅ TERMINÉ

🚀 MIGRATION MICROSOFT 365
   ├─ Technologies: Exchange Online, SharePoint, Teams
   ├─ Objectif: Migrer l'infrastructure on-premise vers cloud
   ├─ Résultat: 150+ utilisateurs migrés avec succès
   └─ Statut: ✅ TERMINÉ

🚀 IMPLÉMENTATION MDM AVEC INTUNE
   ├─ Technologies: Microsoft Intune, Azure AD
   ├─ Objectif: Gestion centralisée des appareils
   ├─ Résultat: 200+ appareils sous gestion
   └─ Statut: ✅ TERMINÉ

🚀 SYSTÈME DE SURVEILLANCE SOC
   ├─ Technologies: SIEM, Firewall Logs, PowerBI
   ├─ Objectif: Tableau de bord sécurité en temps réel
   ├─ Résultat: Détection précoce des menaces
   └─ Statut: 🔄 AMÉLIORATION CONTINUE

🚀 OPTIMISATION HELP DESK
   ├─ Technologies: ServiceNow, Base de connaissances
   ├─ Objectif: Améliorer le temps de résolution
   ├─ Résultat: SLA atteint dans 95% des cas
   └─ Statut: ✅ TERMINÉ

═══════════════════════════════════════════════════════════════════

PROCHAINS PROJETS:
• Implémentation Architecture Zero Trust
• Automatisation avec Azure DevOps
• Mise à niveau Windows Server 2025`
            },
            contact: {
                title: "Informations de Contact",
                content: `
╔══════════════════════════════════════════════════════════════════╗
║                      CANAUX DE COMMUNICATION                     ║
╚══════════════════════════════════════════════════════════════════╝

CONTACT PROFESSIONNEL
═══════════════════════════════════════════════════════════════════

📧 EMAIL PRINCIPAL
   ahmed@elfakir.com
   
📱 TÉLÉPHONE/WHATSAPP
   (+212) 656185848
   
🌐 SITE WEB
   https://www.elfakir.com
   
📍 LOCALISATION
   Tétouan, Tanger-Tetouan-Al Hoceima
   Maroc

═══════════════════════════════════════════════════════════════════

RÉSEAUX PROFESSIONNELS
═══════════════════════════════════════════════════════════════════

💼 LINKEDIN
   linkedin.com/in/ahmed-elfakir
   
🐙 GITHUB
   github.com/ahmed-elfakir
   
🐦 TWITTER
   @ahmed_elfakir

═══════════════════════════════════════════════════════════════════

DISPONIBILITÉ
═══════════════════════════════════════════════════════════════════

⏰ HEURES DE CONTACT
   Lundi - Vendredi: 09:00 - 18:00 (GMT+1)
   Samedi: 10:00 - 14:00 (GMT+1)
   
🚀 TEMPS DE RÉPONSE
   Email: < 24 heures
   WhatsApp: < 4 heures
   
💡 DEMANDES
   ✅ Conseil IT
   ✅ Support technique
   ✅ Projets collaboratifs
   ✅ Opportunités d'emploi

═══════════════════════════════════════════════════════════════════

Prêt à vous connecter? Envoyez-moi un message!`
            },
            navigationItems: [
                { id: 'home', label: 'Accueil', cmd: 'home' },
                { id: 'about', label: 'À Propos', cmd: 'about' },
                { id: 'experience', label: 'Expérience', cmd: 'experience' },
                { id: 'skills', label: 'Compétences', cmd: 'skills' },
                { id: 'projects', label: 'Projets', cmd: 'projects' },
                { id: 'contact', label: 'Contact', cmd: 'contact' }
            ],
            ui: {
                matrixHint: "Vous pouvez mettre en pause l'effet Matrix",
                pauseButton: "Suspendre l'Effet",
                resumeButton: "Reprendre l'Effet",
                loading: "CHARGEMENT DES DONNÉES...",
                terminal: "TERMINAL ELFAKIR v3.0 - Interface Neuronale Active"
            }
        }
    };

    // Get current language content
    const currentData = portfolioData[currentLanguage] || portfolioData.es;
    const navigationItems = currentData.navigationItems;

    // Comandos disponibles multiidioma
    const commands = {
        // Comandos universales
        home: () => handleSectionChange('home'),
        inicio: () => handleSectionChange('home'),
        accueil: () => handleSectionChange('home'),
        about: () => handleSectionChange('about'),
        whoami: () => handleSectionChange('about'),
        apropos: () => handleSectionChange('about'),
        experience: () => handleSectionChange('experience'),
        experiencia: () => handleSectionChange('experience'),
        work: () => handleSectionChange('experience'),
        skills: () => handleSectionChange('skills'),
        habilidades: () => handleSectionChange('skills'),
        competences: () => handleSectionChange('skills'),
        tech: () => handleSectionChange('skills'),
        projects: () => handleSectionChange('projects'),
        proyectos: () => handleSectionChange('projects'),
        projets: () => handleSectionChange('projects'),
        contact: () => handleSectionChange('contact'),
        contacto: () => handleSectionChange('contact'),
        help: () => showHelp(),
        aide: () => showHelp(),
        ayuda: () => showHelp(),
        clear: () => setTerminalHistory([]),
        cls: () => setTerminalHistory([]),
        ls: () => showDirectories(),
        dir: () => showDirectories(),
        exit: () => {
            const exitMessages = {
                es: '¡Gracias por visitar mi portafolio!',
                en: 'Thanks for visiting my portfolio!',
                fr: 'Merci d\'avoir visité mon portfolio!'
            };
            addToHistory(exitMessages[currentLanguage] || exitMessages.es);
        }
    };

    // Typing animation effect
    const typeWriter = (text, callback) => {
        setIsTyping(true);
        let index = 0;
        const timer = setInterval(() => {
            if (index < text.length) {
                setCommand(text.slice(0, index + 1));
                index++;
            } else {
                clearInterval(timer);
                setIsTyping(false);
                if (callback) callback();
            }
        }, 100);
    };

    // Content typewriter effect
    const typeWriterContent = (text) => {
        setIsContentTyping(true);
        setDisplayedContent('');
        let index = 0;
        const timer = setInterval(() => {
            if (index < text.length) {
                setDisplayedContent(text.slice(0, index + 1));
                index++;
            } else {
                clearInterval(timer);
                setIsContentTyping(false);
            }
        }, 20); // Velocidad más rápida para contenido
    };

    // Handle section change with loading and typewriter
    const handleSectionChange = (sectionId) => {
        if (sectionId === currentSection) return;
        
        setIsLoading(true);
        
        // Simular carga
        setTimeout(() => {
            setCurrentSection(sectionId);
            setIsLoading(false);
            
            // Iniciar efecto typewriter para el contenido
            const content = currentData[sectionId]?.content || '';
            if (content && sectionId !== 'home') {
                typeWriterContent(content);
            } else {
                setDisplayedContent(content);
                setIsContentTyping(false);
            }
        }, 1500); // 1.5 segundos de carga
    };

    // Matrix pause toggle function
    const toggleMatrixEffect = () => {
        setMatrixPaused(!matrixPaused);
    };

    // Hide matrix hint after 10 seconds and only after page is fully loaded
    useEffect(() => {
        // Wait for loading screens to finish (about 4 seconds) + 6 seconds visible
        const timer = setTimeout(() => {
            setShowMatrixHint(false);
        }, 10000); // 4s loading + 6s visible = 10s total
        return () => clearTimeout(timer);
    }, []);

    // Mensaje inicial multiidioma
    useEffect(() => {
        const welcomeMessages = {
            es: [
                'INICIALIZANDO SISTEMA DE PORTAFOLIO...',
                '100% COMPLETADO',
                '',
                'Conexión ElFakir establecida',
                'Protocolos de seguridad activados',
                'Interfaz de red lista',
                '',
                'SISTEMA LISTO - Use navegación o comandos'
            ],
            en: [
                'INITIALIZING PORTFOLIO SYSTEM...',
                '100% COMPLETE',
                '',
                'ElFakir connection established',
                'Security protocols activated',
                'Network interface ready',
                '',
                'SYSTEM READY - Use navigation or commands'
            ],
            fr: [
                'INITIALISATION SYSTÈME PORTFOLIO...',
                '100% TERMINÉ',
                '',
                'Connexion ElFakir établie',
                'Protocoles de sécurité activés',
                'Interface réseau prête',
                '',
                'SYSTÈME PRÊT - Utilisez navigation ou commandes'
            ]
        };
        
        const welcomeMsg = welcomeMessages[currentLanguage] || welcomeMessages.es;
        setTerminalHistory(welcomeMsg);
        // Inicializar contenido mostrado
        setDisplayedContent(currentData.home.content);
    }, [currentLanguage]);

    const addToHistory = (message) => {
        setTerminalHistory(prev => [...prev, message]);
    };

    const handleCommand = (cmd) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        
        addToHistory(`ahmed@ElFakir:~$ ${cmd}`);
        
        if (commands[trimmedCmd]) {
            commands[trimmedCmd]();
            const loadingMessages = {
                es: `Cargando ${trimmedCmd}...`,
                en: `Loading ${trimmedCmd}...`,
                fr: `Chargement ${trimmedCmd}...`
            };
            addToHistory(loadingMessages[currentLanguage] || loadingMessages.es);
        } else if (trimmedCmd) {
            const errorMessages = {
                es: [
                    `Comando '${trimmedCmd}' no encontrado`,
                    'Prueba: help | about | skills | contact'
                ],
                en: [
                    `Command '${trimmedCmd}' not found`,
                    'Try: help | about | skills | contact'
                ],
                fr: [
                    `Commande '${trimmedCmd}' introuvable`,
                    'Essayez: help | about | skills | contact'
                ]
            };
            
            const messages = errorMessages[currentLanguage] || errorMessages.es;
            messages.forEach(msg => addToHistory(msg));
        }
    };

    const showHelp = () => {
        const helpTexts = {
            es: [
                '╔════════════════════════════════════════╗',
                '║         INTERFAZ DE COMANDOS ELFAKIR  ║',
                '╚════════════════════════════════════════╝',
                '',
                'home/inicio   - Volver al hub principal',
                'about/whoami  - Archivo de datos personales', 
                'experience    - Registros de historial laboral',
                'skills/tech   - Capacidades técnicas',
                'projects      - Portfolio de desarrollo',
                'contact       - Canales de comunicación',
                'ls/dir        - Listar todos los directorios',
                'clear/cls     - Limpiar buffer del terminal',
                'help/ayuda    - Mostrar esta interfaz',
                'exit          - Secuencia de cierre'
            ],
            en: [
                '╔════════════════════════════════════════╗',
                '║         ELFAKIR COMMAND INTERFACE     ║',
                '╚════════════════════════════════════════╝',
                '',
                'home          - Return to main hub',
                'about/whoami  - Personal data file', 
                'experience    - Work history logs',
                'skills/tech   - Technical capabilities',
                'projects      - Development portfolio',
                'contact       - Communication channels',
                'ls/dir        - List all directories',
                'clear/cls     - Clear terminal buffer',
                'help          - Display this interface',
                'exit          - Logout sequence'
            ],
            fr: [
                '╔════════════════════════════════════════╗',
                '║       INTERFACE COMMANDES ELFAKIR     ║',
                '╚════════════════════════════════════════╝',
                '',
                'home/accueil  - Retour au hub principal',
                'about/whoami  - Fichier de données personnelles', 
                'experience    - Journaux d\'historique professionnel',
                'skills/tech   - Capacités techniques',
                'projects      - Portfolio de développement',
                'contact       - Canaux de communication',
                'ls/dir        - Lister tous les répertoires',
                'clear/cls     - Effacer le buffer du terminal',
                'help/aide     - Afficher cette interface',
                'exit          - Séquence de déconnexion'
            ]
        };
        
        const helpText = helpTexts[currentLanguage] || helpTexts.es;
        helpText.forEach(line => addToHistory(line));
    };

    const showDirectories = () => {
        const directoryHeaders = {
            es: 'DIRECTORIOS DISPONIBLES:',
            en: 'AVAILABLE DIRECTORIES:',
            fr: 'RÉPERTOIRES DISPONIBLES:'
        };
        
        addToHistory(directoryHeaders[currentLanguage] || directoryHeaders.es);
        navigationItems.forEach(item => {
            addToHistory(`   ${item.label}`);
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCommand(command);
            setCommand('');
        }
    };

    // Auto scroll terminal
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [terminalHistory]);

    return (
        <div className="min-h-screen bg-black text-green-400 font-mono flex relative overflow-hidden">
            {/* Matrix Pause Button */}
            <button
                onClick={toggleMatrixEffect}
                className="fixed top-4 right-4 z-50 px-4 py-2 bg-black bg-opacity-80 border border-green-500 rounded-lg text-green-400 text-sm font-mono hover:bg-green-900 hover:text-green-300 transition-all duration-300 backdrop-blur-sm glow-button-small shadow-lg"
                title={matrixPaused ? currentData.ui.resumeButton : currentData.ui.pauseButton}
            >
                {matrixPaused ? currentData.ui.resumeButton : currentData.ui.pauseButton}
            </button>

            {/* Matrix Effect Hint */}
            {showMatrixHint && (
                <div className="fixed top-16 right-4 z-40 px-3 py-2 bg-black bg-opacity-90 border border-green-500 rounded-lg text-green-400 text-xs font-mono backdrop-blur-sm shadow-lg animate-pulse">
                    {currentData.ui.matrixHint}
                </div>
            )}

            {/* Matrix Building Effect Canvas */}
            {isBuilding && (
                <canvas
                    ref={buildingCanvasRef}
                    className="fixed inset-0 z-10 pointer-events-none"
                    style={{ opacity: 1 }}
                />
            )}

            {/* Matrix Rain Background */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 z-0 pointer-events-none"
                style={{ 
                    opacity: isBuilding ? 0 : (matrixPaused ? 0.1 : 0.3),
                    transition: 'opacity 1s ease-in-out'
                }}
            />

            {/* Animated Grid Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            </div>

            {/* Sidebar Navigation - Responsive for mobile */}
            {!isBuilding && (
                <div className="w-72 lg:w-72 md:w-64 sm:w-full sm:h-auto lg:h-screen bg-black bg-opacity-80 backdrop-blur-sm border-r lg:border-r sm:border-b border-green-500 p-4 flex flex-col relative z-20 shadow-2xl sm:order-2 lg:order-1">
                    <div className="mb-6 text-center">
                        <div className="relative">
                            <h1 className="text-green-300 text-xl lg:text-xl md:text-lg sm:text-base font-bold glitch-text animate-pulse">
                                AHMED EL FAKIR
                            </h1>
                            <div className="absolute inset-0 text-green-300 text-xl lg:text-xl md:text-lg sm:text-base font-bold glitch-text opacity-50 transform translate-x-1">
                                AHMED EL FAKIR
                            </div>
                        </div>
                        <p className="text-green-500 text-sm lg:text-sm md:text-xs sm:text-xs mt-2">
                            &gt; IT_SPECIALIST.exe
                        </p>
                        <div className="w-full bg-green-900 rounded-full h-1 mt-2">
                            <div className="bg-green-400 h-1 rounded-full animate-pulse" style={{width: '85%'}}></div>
                        </div>
                    </div>
                    
                    <nav className="flex-1 sm:mb-4">
                        <div className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-2 lg:block lg:space-y-3">
                            {navigationItems.map((item, index) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleSectionChange(item.id)}
                                    className={`w-full text-left p-4 lg:p-4 md:p-3 sm:p-2 rounded-lg transition-all duration-300 text-sm lg:text-sm md:text-xs sm:text-xs relative group overflow-hidden ${
                                        currentSection === item.id 
                                            ? 'bg-green-700 text-white shadow-lg transform scale-105 glow-border' 
                                            : 'hover:bg-green-900 hover:text-green-300 hover:transform hover:translate-x-2 sm:hover:translate-x-0'
                                    }`}
                                    style={{
                                        animationDelay: `${index * 0.1}s`
                                    }}
                                >
                                    <div className="relative z-10">{item.label}</div>
                                    {currentSection === item.id && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-800 opacity-50 animate-pulse"></div>
                                    )}
                                    <div className="absolute inset-0 bg-green-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                </button>
                            ))}
                        </div>
                    </nav>

                    {/* System Status - Hide on small screens */}
                    <div className="mt-6 p-3 border border-green-600 rounded bg-gray-900 bg-opacity-50 hidden lg:block">
                        <div className="text-green-300 text-xs mb-2">SYSTEM STATUS:</div>
                        <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                                <span>CONNECTION:</span>
                                <span className="text-green-400 animate-pulse">ONLINE</span>
                            </div>
                            <div className="flex justify-between">
                                <span>SECURITY:</span>
                                <span className="text-green-400">SECURED</span>
                            </div>
                            <div className="flex justify-between">
                                <span>UPTIME:</span>
                                <span className="text-green-400">99.9%</span>
                            </div>
                        </div>
                    </div>

                    {/* Terminal Toggle */}
                    <div className="mt-4 pt-4 border-t border-green-600">
                        <button
                            onClick={() => setShowTerminal(!showTerminal)}
                            className="w-full p-3 lg:p-3 md:p-2 sm:p-2 bg-green-800 hover:bg-green-700 rounded-lg text-sm lg:text-sm md:text-xs sm:text-xs transition-all duration-300 transform hover:scale-105 glow-button"
                        >
                            {
                                showTerminal ? 
                                    (currentLanguage === 'es' ? 'OCULTAR TERMINAL' :
                                     currentLanguage === 'fr' ? 'MASQUER TERMINAL' :
                                     'HIDE TERMINAL') :
                                    (currentLanguage === 'es' ? 'MOSTRAR TERMINAL' :
                                     currentLanguage === 'fr' ? 'AFFICHER TERMINAL' :
                                     'SHOW TERMINAL')
                            }
                        </button>
                    </div>

                    {/* Quick Access Links - Simplified for mobile */}
                    <div className="mt-4 text-xs text-green-600 hidden lg:block">
                        <div className="space-y-2">
                            <a href="mailto:ahmed@elfakir.com" className="block hover:text-green-400 transition-colors duration-200 hover:translate-x-1 transform">
                                ahmed@elfakir.com
                            </a>
                            <a href="tel:+212656185848" className="block hover:text-green-400 transition-colors duration-200 hover:translate-x-1 transform">
                                (+212) 656185848
                            </a>
                            <a href="https://www.elfakir.com" target="_blank" rel="noopener noreferrer" className="block hover:text-green-400 transition-colors duration-200 hover:translate-x-1 transform">
                                elfakir.com
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Area - Responsive for mobile */}
            {!isBuilding && (
                <div className="flex-1 flex flex-col relative z-10 sm:order-1 lg:order-2">
                    {/* Content Display */}
                    <div className="flex-1 p-6 lg:p-6 md:p-4 sm:p-3 overflow-y-auto flex items-center justify-center">
                        <div className="max-w-5xl w-full text-center">
                            <div className="mb-6 lg:mb-6 md:mb-4 sm:mb-3">
                                <h2 className="text-3xl lg:text-3xl md:text-2xl sm:text-xl font-bold text-green-300 mb-3 lg:mb-3 md:mb-2 sm:mb-2 glow-text">
                                    {currentData[currentSection].title}
                                </h2>
                                {currentData[currentSection].subtitle && (
                                    <p className="text-green-500 text-xl lg:text-xl md:text-lg sm:text-base">
                                        {currentData[currentSection].subtitle}
                                    </p>
                                )}
                            </div>
                            
                            <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-8 lg:p-8 md:p-6 sm:p-4 border border-green-600 shadow-2xl matrix-border relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-green-900 to-transparent opacity-10"></div>
                                
                                {isLoading ? (
                                    <div className="flex flex-col items-center justify-center py-20 lg:py-20 md:py-16 sm:py-12">
                                        <div className="w-16 h-16 lg:w-16 lg:h-16 md:w-14 md:h-14 sm:w-12 sm:h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4">
                                        </div>
                                        <div className="text-green-400 text-lg lg:text-lg md:text-base sm:text-sm mb-2">{currentData.ui.loading}</div>
                                        <div className="w-64 lg:w-64 md:w-56 sm:w-48 h-2 bg-green-900 rounded-full overflow-hidden">
                                            <div className="h-full bg-green-400 rounded-full animate-pulse" style={{width: '100%', animation: 'loadingBar 1.5s ease-in-out infinite'}}></div>
                                        </div>
                                        <div className="text-green-500 text-sm lg:text-sm md:text-xs sm:text-xs mt-3 opacity-75">
                            {
                                currentLanguage === 'es' ? 'Accediendo a la base de datos...' :
                                currentLanguage === 'fr' ? 'Accès à la base de données...' :
                                'Accessing database...'
                            }
                        </div>
                                    </div>
                                ) : (
                                    <pre className={`whitespace-pre-wrap text-green-400 leading-relaxed relative z-10 text-shadow text-sm lg:text-sm md:text-xs sm:text-xs ${
                                        isContentTyping ? 'typing-cursor' : ''
                                    }`}>
                                        {displayedContent}
                                        {isContentTyping && <span className="animate-pulse">█</span>}
                                    </pre>
                                )}
                                
                                <div className="absolute top-0 right-0 w-20 h-20 lg:w-20 lg:h-20 md:w-16 md:h-16 sm:w-12 sm:h-12 border-t-2 border-r-2 border-green-500 opacity-50"></div>
                                <div className="absolute bottom-0 left-0 w-20 h-20 lg:w-20 lg:h-20 md:w-16 md:h-16 sm:w-12 sm:h-12 border-b-2 border-l-2 border-green-500 opacity-50"></div>
                            </div>

                            {/* Enhanced Quick Actions - Mobile Responsive */}
                            <div className="mt-8 lg:mt-8 md:mt-6 sm:mt-4 flex flex-wrap gap-4 lg:gap-4 md:gap-3 sm:gap-2 justify-center">
                                <button
                                    onClick={() => handleSectionChange('contact')}
                                    className="px-6 py-3 lg:px-6 lg:py-3 md:px-4 md:py-2 sm:px-3 sm:py-2 bg-green-700 hover:bg-green-600 rounded-lg text-white text-sm lg:text-sm md:text-xs sm:text-xs transition-all duration-300 transform hover:scale-105 glow-button shadow-lg"
                                    disabled={isLoading}
                                >
                                    {
                                        currentLanguage === 'es' ? 'CONTACTO.exe' :
                                        currentLanguage === 'fr' ? 'CONTACT.exe' :
                                        'CONTACT.exe'
                                    }
                                </button>
                                <button
                                    onClick={() => handleSectionChange('skills')}
                                    className="px-6 py-3 lg:px-6 lg:py-3 md:px-4 md:py-2 sm:px-3 sm:py-2 bg-blue-700 hover:bg-blue-600 rounded-lg text-white text-sm lg:text-sm md:text-xs sm:text-xs transition-all duration-300 transform hover:scale-105 glow-button shadow-lg"
                                    disabled={isLoading}
                                >
                                    {
                                        currentLanguage === 'es' ? 'SKILLS.dll' :
                                        currentLanguage === 'fr' ? 'COMPÉTENCES.dll' :
                                        'SKILLS.dll'
                                    }
                                </button>
                                <button
                                    onClick={() => handleSectionChange('projects')}
                                    className="px-6 py-3 lg:px-6 lg:py-3 md:px-4 md:py-2 sm:px-3 sm:py-2 bg-purple-700 hover:bg-purple-600 rounded-lg text-white text-sm lg:text-sm md:text-xs sm:text-xs transition-all duration-300 transform hover:scale-105 glow-button shadow-lg"
                                    disabled={isLoading}
                                >
                                    {
                                        currentLanguage === 'es' ? 'PROYECTOS.bat' :
                                        currentLanguage === 'fr' ? 'PROJETS.bat' :
                                        'PROJECTS.bat'
                                    }
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Terminal Section - Mobile Optimized */}
                    {showTerminal && (
                        <div className="h-80 lg:h-80 md:h-64 sm:h-48 border-t border-green-500 bg-black bg-opacity-80 backdrop-blur-sm p-4 lg:p-4 md:p-3 sm:p-2 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-green-900 to-transparent opacity-20"></div>
                            
                            <div className="mb-3 lg:mb-3 md:mb-2 sm:mb-1 text-green-300 text-sm lg:text-sm md:text-xs sm:text-xs relative z-10">
                                <span className="hidden lg:inline">{currentData.ui.terminal}</span>
                                <span className="lg:hidden">TERMINAL v3.0</span>
                                <span className="float-right text-xs animate-pulse">REC</span>
                            </div>
                            
                            <div 
                                ref={terminalRef}
                                className="h-48 lg:h-48 md:h-36 sm:h-24 overflow-y-auto mb-4 lg:mb-4 md:mb-3 sm:mb-2 text-sm lg:text-sm md:text-xs sm:text-xs relative z-10 custom-scrollbar"
                            >
                                {terminalHistory.map((line, index) => (
                                    <div key={index} className="text-green-400 fade-in-line" style={{animationDelay: `${index * 0.05}s`}}>
                                        {line}
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center relative z-10">
                                <span className="text-green-300 mr-2 glow-text text-sm lg:text-sm md:text-xs sm:text-xs">ahmed@ElFakir:~$</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={command}
                                    onChange={(e) => setCommand(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="flex-1 bg-transparent border-none outline-none text-green-400 caret-green-400 text-sm lg:text-sm md:text-xs sm:text-xs"
                                    placeholder={
                                        currentLanguage === 'es' ? 'Comando...' :
                                        currentLanguage === 'fr' ? 'Commande...' :
                                        'Command...'
                                    }
                                    autoComplete="off"
                                />
                                <span className="animate-pulse text-green-400 glow-text">█</span>
                            </div>

                            {/* Enhanced Command Shortcuts - Mobile Grid */}
                            <div className="mt-3 lg:mt-3 md:mt-2 sm:mt-1 flex flex-wrap gap-2 lg:gap-2 md:gap-1 sm:gap-1 relative z-10">
                                {['help', 'about', 'skills', 'experience', 'contact', 'clear'].map((cmd, index) => (
                                    <button
                                        key={cmd}
                                        onClick={() => {
                                            typeWriter(cmd, () => {
                                                handleCommand(cmd);
                                                setCommand('');
                                            });
                                        }}
                                        className="px-3 py-1 lg:px-3 lg:py-1 md:px-2 md:py-1 sm:px-2 sm:py-1 text-xs lg:text-xs md:text-xs sm:text-xs bg-green-800 hover:bg-green-700 rounded transition-all duration-200 transform hover:scale-105 glow-button-small"
                                        style={{animationDelay: `${index * 0.1}s`}}
                                    >
                                        {cmd.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Custom Styles */}
            <style jsx>{`
                .glitch-text {
                    animation: glitch 2s infinite;
                }

                .typing-animation {
                    overflow: hidden;
                    border-right: 2px solid #0f0;
                    animation: typing 3s steps(40, end), blink-caret 0.75s step-end infinite;
                }

                .glow-text {
                    text-shadow: 0 0 10px #0f0, 0 0 20px #0f0, 0 0 30px #0f0;
                }

                .glow-border {
                    box-shadow: 0 0 20px rgba(0, 255, 0, 0.5), inset 0 0 10px rgba(0, 255, 0, 0.2);
                }

                .glow-button {
                    box-shadow: 0 0 15px rgba(0, 255, 0, 0.3);
                    transition: box-shadow 0.3s ease;
                }

                .glow-button:hover {
                    box-shadow: 0 0 25px rgba(0, 255, 0, 0.6);
                }

                .glow-button-small {
                    box-shadow: 0 0 8px rgba(0, 255, 0, 0.3);
                }

                .glow-effect {
                    box-shadow: 0 0 15px rgba(0, 255, 0, 0.5), inset 0 0 15px rgba(0, 255, 0, 0.2);
                    animation: progressGlow 2s ease-in-out infinite alternate;
                }

                .matrix-border {
                    position: relative;
                    border-image: linear-gradient(45deg, #0f0, transparent, #0f0) 1;
                }

                .text-shadow {
                    text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
                }

                .bg-grid-pattern {
                    background-image: 
                        linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px);
                    background-size: 50px 50px;
                    animation: grid-move 20s linear infinite;
                }

                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }

                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(0, 255, 0, 0.1);
                }

                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(0, 255, 0, 0.5);
                    border-radius: 4px;
                }

                .fade-in-line {
                    animation: fadeInLine 0.5s ease-in-out forwards;
                    opacity: 0;
                }

                .typing-cursor {
                    position: relative;
                }

                .typing-cursor::after {
                    content: '';
                    animation: blink-caret 0.75s step-end infinite;
                }

                @keyframes loadingBar {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }

                @keyframes glitch {
                    0%, 100% { transform: translateX(0); }
                    20% { transform: translateX(-2px); }
                    40% { transform: translateX(2px); }
                    60% { transform: translateX(-1px); }
                    80% { transform: translateX(1px); }
                }

                @keyframes typing {
                    from { width: 0; }
                    to { width: 100%; }
                }

                @keyframes blink-caret {
                    from, to { border-color: transparent; }
                    50% { border-color: #0f0; }
                }

                @keyframes grid-move {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(50px, 50px); }
                }

                @keyframes fadeInLine {
                    from { opacity: 0; transform: translateX(-10px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                @keyframes progressGlow {
                    0% { box-shadow: 0 0 15px rgba(0, 255, 0, 0.5), inset 0 0 15px rgba(0, 255, 0, 0.2); }
                    100% { box-shadow: 0 0 25px rgba(0, 255, 0, 0.8), inset 0 0 25px rgba(0, 255, 0, 0.4); }
                }
            `}</style>
        </div>
    );
};

// Componente principal que maneja la secuencia: START → Selección de idiomas → LOADING → Portfolio
const App = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [showPortfolio, setShowPortfolio] = useState(false);
    const [showLanguageSelector, setShowLanguageSelector] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Escuchar el evento del botón START
    useEffect(() => {
        const handleShowLanguageSelection = () => {
            setShowLanguageSelector(true);
        };

        const handleShowPortfolio = () => {
            setIsLoading(false);
            setShowPortfolio(true);
        };

        window.addEventListener('showLanguageSelection', handleShowLanguageSelection);
        window.addEventListener('showPortfolio', handleShowPortfolio);
        
        return () => {
            window.removeEventListener('showLanguageSelection', handleShowLanguageSelection);
            window.removeEventListener('showPortfolio', handleShowPortfolio);
        };
    }, []);

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
        setIsLoading(true);
        // Trigger loading screen with selected language
        if (window.showLoadingScreen) {
            window.showLoadingScreen(language);
        }
    };

    const handleBackToLanguageSelector = () => {
        setShowPortfolio(false);
        setSelectedLanguage(null);
        setIsLoading(false);
        setShowLanguageSelector(true);
    };

    // Si no se ha activado aún, no mostrar nada (pantalla START visible)
    if (!showLanguageSelector) {
        return null;
    }

    // Si está cargando, no mostrar nada (pantalla LOADING visible)
    if (isLoading) {
        return null;
    }

    // Si no se ha seleccionado idioma o no se muestra el portafolio, mostrar selector
    if (!showPortfolio || !selectedLanguage) {
        return <LanguageSelector onLanguageSelect={handleLanguageSelect} />;
    }

    // Mostrar portafolio con el idioma seleccionado
    return (
        <div>
            {/* Botón para volver al selector de idiomas */}
            <button
                onClick={handleBackToLanguageSelector}
                className="fixed top-4 left-4 z-50 px-4 py-2 bg-black bg-opacity-80 border border-green-500 rounded-lg text-green-400 text-sm font-mono hover:bg-green-900 hover:text-green-300 transition-all duration-300 backdrop-blur-sm glow-button-small shadow-lg"
                title="Cambiar idioma / Change language / Changer de langue"
            >
                🌍
            </button>
            <MatrixPortfolio selectedLanguage={selectedLanguage} />
        </div>
    );
};

export default App;dLanguage, setSelectedLanguage] = useState(null);
    const [showPortfolio, setShowPortfolio] = useState(false);
    const [showLanguageSelector, setShowLanguageSelector] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Escuchar el evento del botón START
    useEffect(() => {
        const handleShowLanguageSelection = () => {
            setShowLanguageSelector(true);
        };

        const handleShowPortfolio = () => {
            setIsLoading(false);
            setShowPortfolio(true);
        };

        window.addEventListener('showLanguageSelection', handleShowLanguageSelection);
        window.addEventListener('showPortfolio', handleShowPortfolio);
        
        return () => {
            window.removeEventListener('showLanguageSelection', handleShowLanguageSelection);
            window.removeEventListener('showPortfolio', handleShowPortfolio);
        };
    }, []);

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
        setIsLoading(true);
        // Trigger loading screen with selected language
        if (window.showLoadingScreen) {
            window.showLoadingScreen(language);
        }
    };

    const handleBackToLanguageSelector = () => {
        setShowPortfolio(false);
        setSelectedLanguage(null);
        setIsLoading(false);
        setShowLanguageSelector(true);
    };

    // Si no se ha activado aún, no mostrar nada (pantalla START visible)
    if (!showLanguageSelector) {
        return null;
    }

    // Si está cargando, no mostrar nada (pantalla LOADING visible)
    if (isLoading) {
        return null;
    }

    // Si no se ha seleccionado idioma o no se muestra el portafolio, mostrar selector
    if (!showPortfolio || !selectedLanguage) {
        return <LanguageSelector onLanguageSelect={handleLanguageSelect} />;
    }

    // Mostrar portafolio con el idioma seleccionado
    return (
        <div>
            {/* Botón para volver al selector de idiomas */}
            <button
                onClick={handleBackToLanguageSelector}
                className="fixed top-16 right-4 z-50 px-4 py-2 bg-black bg-opacity-80 border border-green-500 rounded-lg text-green-400 text-sm font-mono hover:bg-green-900 hover:text-green-300 transition-all duration-300 backdrop-blur-sm glow-button-small shadow-lg"
                title="Cambiar idioma / Change language / Changer de langue"
            >
                🌍
            </button>
            <MatrixPortfolio selectedLanguage={selectedLanguage} />
        </div>
    );
};

export default App;
