import React, { useState, useEffect, useRef, useMemo } from 'react';

// Componente de selección de idioma - OPTIMIZADO PARA MÓVIL
const LanguageSelector = ({ onLanguageSelect }) => {
    const canvasRef = useRef(null);

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
        const fontSize = window.innerWidth < 768 ? 10 : 14; // Más pequeño en móvil
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
            <canvas
                ref={canvasRef}
                className="fixed inset-0 z-0 pointer-events-none"
                style={{ opacity: 0.3 }}
            />
            
            <div className="relative z-10 text-center px-4 w-full max-w-md">
                <div className="mb-8">
                    <h1 className="text-2xl md:text-4xl font-bold text-green-300 mb-4 glitch-text animate-pulse">
                        SELECCIONAR IDIOMA
                    </h1>
                    <p className="text-green-500 text-sm md:text-lg">
                        Select Language / Sélectionner la langue
                    </p>
                </div>
                
                <div className="flex flex-col gap-4 mb-8">
                    <button
                        onClick={() => onLanguageSelect('es')}
                        className="w-full px-6 py-4 bg-green-700 hover:bg-green-600 rounded-lg text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 glow-button shadow-lg touch-manipulation"
                    >
                        🇪🇸 ESPAÑOL
                    </button>
                    <button
                        onClick={() => onLanguageSelect('en')}
                        className="w-full px-6 py-4 bg-green-700 hover:bg-green-600 rounded-lg text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 glow-button shadow-lg touch-manipulation"
                    >
                        🇬🇧 ENGLISH
                    </button>
                    <button
                        onClick={() => onLanguageSelect('fr')}
                        className="w-full px-6 py-4 bg-green-700 hover:bg-green-600 rounded-lg text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 glow-button shadow-lg touch-manipulation"
                    >
                        🇫🇷 FRANÇAIS
                    </button>
                </div>
                
                <p className="text-green-600 text-xs md:text-sm">
                    Elige tu idioma preferido / Choose your preferred language / Choisissez votre langue préférée
                </p>
            </div>
            
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
                
                .touch-manipulation {
                    touch-action: manipulation;
                }
            `}</style>
        </div>
    );
};

const MatrixPortfolio = ({ selectedLanguage, onShowLanguageButton }) => {
    const [currentSection, setCurrentSection] = useState('home');
    const [command, setCommand] = useState('');
    const [terminalHistory, setTerminalHistory] = useState([]);
    const [showTerminal, setShowTerminal] = useState(false); // Oculto por defecto en móvil
    const [isLoading, setIsLoading] = useState(false);
    const [displayedContent, setDisplayedContent] = useState('');
    const [isContentTyping, setIsContentTyping] = useState(false);
    const [matrixPaused, setMatrixPaused] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState(selectedLanguage || 'es');
    const [isBuilding, setIsBuilding] = useState(true);
    const [buildingProgress, setBuildingProgress] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const canvasRef = useRef(null);
    const buildingCanvasRef = useRef(null);
    const inputRef = useRef(null);
    const terminalRef = useRef(null);
    const animationIdRef = useRef(null);
    const buildingAnimationRef = useRef(null);

    // Detectar si es móvil
    const isMobile = window.innerWidth < 768;

    // Contenido multiidioma - DEFINIDO ANTES DE SU USO
    const portfolioData = useMemo(() => ({
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

Navega usando el menú o escribe comandos como un hacker!
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
            // ... resto del contenido
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
                pauseButton: "Pausar",
                resumeButton: "Reanudar",
                loading: "CARGANDO...",
                terminal: "TERMINAL v3.0",
                menu: "MENÚ",
                closeMenu: "CERRAR",
                showTerminal: "TERMINAL",
                hideTerminal: "OCULTAR"
            }
        },
        en: {
            home: {
                title: "Ahmed El Fakir",
                subtitle: "IT Specialist",
                content: `Welcome to my portfolio...` // Contenido simplificado por espacio
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
                pauseButton: "Pause",
                resumeButton: "Resume",
                loading: "LOADING...",
                terminal: "TERMINAL v3.0",
                menu: "MENU",
                closeMenu: "CLOSE",
                showTerminal: "TERMINAL",
                hideTerminal: "HIDE"
            }
        },
        fr: {
            home: {
                title: "Ahmed El Fakir",
                subtitle: "Spécialiste IT",
                content: `Bienvenue dans mon portfolio...` // Contenido simplificado por espacio
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
                pauseButton: "Pause",
                resumeButton: "Reprendre",
                loading: "CHARGEMENT...",
                terminal: "TERMINAL v3.0",
                menu: "MENU",
                closeMenu: "FERMER",
                showTerminal: "TERMINAL",
                hideTerminal: "MASQUER"
            }
        }
    }), []);

    useEffect(() => {
        console.log('🔄 Iniciando construcción del portafolio');
        setCurrentLanguage(selectedLanguage || 'es');
        setIsBuilding(true);
        setBuildingProgress(0);
        
        // Ocultar botón de idioma durante la construcción
        if (onShowLanguageButton) {
            onShowLanguageButton(false);
        }
        
        // Iniciar la secuencia inmediatamente
        startBuildingSequence();
    }, [selectedLanguage, onShowLanguageButton]);
    
    // Controlar visibilidad del botón de idioma
    useEffect(() => {
        if (onShowLanguageButton) {
            onShowLanguageButton(!isBuilding);
        }
    }, [isBuilding, onShowLanguageButton]);
    
    // Efecto que se ejecuta cuando la construcción termina
    useEffect(() => {
        if (!isBuilding && selectedLanguage && currentData) {
            console.log('🎉 Construcción terminada - mostrando portafolio');
            
            // Asegurar que el contenido se muestre
            const content = currentData.home?.content || '';
            setDisplayedContent(content);
            setIsContentTyping(false);
            
            // Mostrar mensajes de bienvenida en terminal
            const welcomeMessages = {
                es: [
                    '',
                    'SISTEMA DE PORTAFOLIO ACTIVADO',
                    'Conexión ElFakir establecida',
                    'Protocolos de seguridad activados',
                    'Interfaz de red lista',
                    '',
                    'SISTEMA LISTO - Use navegación o comandos'
                ],
                en: [
                    '',
                    'PORTFOLIO SYSTEM ACTIVATED',
                    'ElFakir connection established',
                    'Security protocols activated',
                    'Network interface ready',
                    '',
                    'SYSTEM READY - Use navigation or commands'
                ],
                fr: [
                    '',
                    'SYSTÈME PORTFOLIO ACTIVÉ',
                    'Connexion ElFakir établie',
                    'Protocoles de sécurité activés',
                    'Interface réseau prête',
                    '',
                    'SYSTÈME PRÊT - Utilisez navigation ou commandes'
                ]
            };
            
            const welcomeMsg = welcomeMessages[currentLanguage] || welcomeMessages.es;
            setTerminalHistory(prev => [...prev, ...welcomeMsg]);
        }
    }, [isBuilding, selectedLanguage, currentLanguage, currentData]);

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
            progress += 25;
            setBuildingProgress(progress);
            
            if (messageIndex < messages.length) {
                setTerminalHistory(prev => [...prev, `> ${messages[messageIndex]}`]);
                messageIndex++;
            }
            
            if (progress >= 100) {
                clearInterval(interval);
                
                // Agregar mensaje de completado
                setTerminalHistory(prev => [...prev, '> SISTEMA AL 100%']);
                
                // Completar la secuencia después de 1 segundo
                setTimeout(() => {
                    setTerminalHistory(prev => [
                        ...prev, 
                        '> SISTEMA LISTO',
                        '> ACCEDIENDO AL PORTAFOLIO...'
                    ]);
                    
                    // Finalizar construcción después de otro segundo
                    setTimeout(() => {
                        setIsBuilding(false);
                        setBuildingProgress(0);
                        console.log('✅ Construcción completada, isBuilding:', false);
                    }, 1000);
                }, 1000);
            }
        }, 600); // Aumentado el intervalo para ser más estable
        
        // Fallback de seguridad - forzar finalización después de 8 segundos máximo
        setTimeout(() => {
            console.log('🔧 Fallback activado - finalizando construcción');
            setIsBuilding(false);
            setBuildingProgress(0);
        }, 8000);
    };

    // Building Effect - OPTIMIZADO PARA MÓVIL
    useEffect(() => {
        console.log('🎨 Building effect useEffect, isBuilding:', isBuilding);
        if (!isBuilding) {
            console.log('⏹️ Building effect detenido - isBuilding es false');
            return;
        }
        
        const canvas = buildingCanvasRef.current;
        if (!canvas) {
            console.log('❌ Canvas no encontrado para building effect');
            return;
        }
        
        console.log('🎬 Iniciando animación de construcción');

        const ctx = canvas.getContext('2d');
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>?/\\|~`!+=-.アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const charArray = chars.split('');
        const specialChars = ['█', '■', '●', '★', 'ERROR', 'CRASH', 'FAIL'];
        const codeWords = ['SYSTEM', 'ERROR', 'CRASH', 'FAIL', 'OVERLOAD', 'CRITICAL'];

        const fontSize = isMobile ? 8 : 12; // Más pequeño en móvil
        const baseColumns = Math.ceil(canvas.width / fontSize);
        let columns = isMobile ? Math.floor(baseColumns * 0.6) : baseColumns; // Menos columnas en móvil
        const drops = [];
        const speeds = [];
        const colors = [];
        const alphas = [];
        const specialTypes = [];

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
            
            if (buildingProgress >= 90 && !crashMode) {
                crashMode = true;
                if (!isMobile) {
                    columns = baseColumns * 1.5; // Menos intenso en móvil
                    initializeArrays(columns);
                }
            }
            
            const bgAlpha = crashMode ? 0.01 : 0.05;
            ctx.fillStyle = `rgba(0, 0, 0, ${bgAlpha})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const passes = crashMode && !isMobile ? 2 : 1; // Menos pases en móvil
            
            for (let pass = 0; pass < passes; pass++) {
                for (let i = 0; i < columns; i++) {
                    const x = (i * fontSize) + (pass * fontSize / 3);
                    
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
                        hue = 120;
                        saturation = 100;
                        lightness = 65 + Math.sin(time * 8 + i) * 25;
                    } else {
                        if (Math.random() > 0.7) {
                            hue = Math.random() > 0.5 ? 0 : 60;
                            saturation = 100;
                            lightness = 80 + Math.random() * 20;
                        } else {
                            hue = 120;
                            saturation = 100;
                            lightness = 70 + Math.sin(time * 15 + i) * 30;
                        }
                    }
                    
                    ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alphas[i]})`;
                    
                    const crashFontScale = crashMode && !isMobile ? 1 + Math.sin(time * 12 + i) * 0.5 : 1;
                    ctx.font = `${fontSize * crashFontScale}px monospace`;
                    
                    const charCount = crashMode && !isMobile ? 4 : 3; // Menos caracteres en móvil
                    
                    for (let j = 0; j < charCount; j++) {
                        let text;
                        
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
                            ctx.fillText(text, x, y);
                        }
                    }

                    const speedMultiplier = crashMode ? 
                        2 + Math.sin(time * 10 + i) * 1.5 : 
                        1 + (buildingProgress * 0.02);
                    
                    drops[i] += speeds[i] * speedMultiplier;

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

            buildingAnimationRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            console.log('🧽 Limpiando building effect');
            window.removeEventListener('resize', resizeCanvas);
            if (buildingAnimationRef.current) {
                cancelAnimationFrame(buildingAnimationRef.current);
            }
        };
    }, [isBuilding, buildingProgress, isMobile]);

    // Matrix Rain Effect - OPTIMIZADO PARA MÓVIL
    useEffect(() => {
        console.log('🜧 Matrix effect useEffect, isBuilding:', isBuilding);
        if (isBuilding) {
            console.log('⏸️ Matrix effect pausado - isBuilding es true');
            return;
        }
        
        console.log('🔄 Iniciando Matrix Rain Effect');
        const canvas = canvasRef.current;
        if (!canvas) {
            console.log('❌ Canvas no encontrado para matrix effect');
            return;
        }

        const ctx = canvas.getContext('2d');
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const charArray = chars.split('');

        const fontSize = isMobile ? 10 : 14;
        const columns = Math.ceil(canvas.width / fontSize);
        const drops = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const draw = () => {
            if (matrixPaused) {
                animationIdRef.current = requestAnimationFrame(draw);
                return;
            }

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

            animationIdRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            console.log('🧽 Limpiando Matrix effect');
            window.removeEventListener('resize', resizeCanvas);
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
        };
    }, [matrixPaused, isBuilding, isMobile]);

    // Contenido multiidioma
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

Navega usando el menú o escribe comandos como un hacker!
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
                pauseButton: "Pausar",
                resumeButton: "Reanudar",
                loading: "CARGANDO...",
                terminal: "TERMINAL v3.0",
                menu: "MENÚ",
                closeMenu: "CERRAR",
                showTerminal: "TERMINAL",
                hideTerminal: "OCULTAR"
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

Navigate using the menu or type commands like a hacker!
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
                pauseButton: "Pause",
                resumeButton: "Resume",
                loading: "LOADING...",
                terminal: "TERMINAL v3.0",
                menu: "MENU",
                closeMenu: "CLOSE",
                showTerminal: "TERMINAL",
                hideTerminal: "HIDE"
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

Naviguez avec le menu ou tapez des commandes comme un hacker!
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
                pauseButton: "Pause",
                resumeButton: "Reprendre",
                loading: "CHARGEMENT...",
                terminal: "TERMINAL v3.0",
                menu: "MENU",
                closeMenu: "FERMER",
                showTerminal: "TERMINAL",
                hideTerminal: "MASQUER"
            }
        }
    };

    // Usar useMemo para evitar problemas de inicialización
    const currentData = useMemo(() => {
        console.log('🔄 Recalculando currentData para idioma:', currentLanguage);
        return portfolioData[currentLanguage] || portfolioData.es;
    }, [currentLanguage, portfolioData]);
    
    const navigationItems = currentData?.navigationItems || [];
    
    // Verificación de seguridad - no renderizar hasta que currentData esté disponible
    if (!currentData) {
        console.log('⚠️ currentData no disponible aún, esperando...');
        return (
            <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
                    <div className="text-green-400">Inicializando sistema...</div>
                </div>
            </div>
        );
    }

    // Commands
    const commands = {
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
        }, 15); // Más rápido para móvil
    };

    const handleSectionChange = (sectionId) => {
        if (sectionId === currentSection) return;
        
        setIsMobileMenuOpen(false);
        setIsLoading(true);
        
        setTimeout(() => {
            setCurrentSection(sectionId);
            setIsLoading(false);
            
            const content = currentData?.[sectionId]?.content || '';
            if (content && sectionId !== 'home') {
                typeWriterContent(content);
            } else {
                setDisplayedContent(content);
                setIsContentTyping(false);
            }
        }, 800); // Más rápido para móvil
    };

    const toggleMatrixEffect = () => {
        setMatrixPaused(!matrixPaused);
    };

    // Efecto removido - la lógica de bienvenida ahora está en el efecto de finalización de construcción

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

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [terminalHistory]);

    return (
        <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col relative overflow-hidden">
            {/* Building Effect Canvas */}
            {isBuilding && (
                <>
                    <canvas
                        ref={buildingCanvasRef}
                        className="fixed inset-0 z-10 pointer-events-none"
                        style={{ opacity: 1 }}
                    />
                    {/* Botón de emergencia - solo visible si el proceso toma más de 6 segundos */}
                    <button
                        onClick={() => {
                            console.log('🊑 Botón de emergencia activado');
                            setIsBuilding(false);
                            setBuildingProgress(0);
                        }}
                        className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-red-700 hover:bg-red-600 border border-red-500 rounded-lg text-white text-sm font-mono transition-all duration-300 backdrop-blur-sm glow-button-small shadow-lg touch-manipulation"
                        style={{
                            opacity: buildingProgress > 50 ? 1 : 0,
                            transition: 'opacity 2s ease'
                        }}
                    >
                        FORCE EXIT
                    </button>
                </>
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

            {/* Top Navigation Bar - Mobile Only */}
            {!isBuilding && (
                <div className="md:hidden bg-black bg-opacity-90 backdrop-blur-sm border-b border-green-500 p-4 relative z-30 flex justify-between items-center">
                    <div className="text-green-300 font-bold text-lg">
                        AHMED EL FAKIR
                    </div>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="px-4 py-2 bg-green-700 hover:bg-green-600 rounded-lg text-white font-bold transition-all duration-300 glow-button touch-manipulation"
                    >
                        {isMobileMenuOpen ? (currentData?.ui?.closeMenu || 'CERRAR') : (currentData?.ui?.menu || 'MENÚ')}
                    </button>
                </div>
            )}

            {/* Mobile Menu Overlay */}
            {!isBuilding && isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-95 backdrop-blur-sm">
                    <div className="p-6 pt-20">
                        <nav className="space-y-4">
                            {navigationItems.map((item, index) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleSectionChange(item.id)}
                                    className={`w-full text-left p-4 rounded-lg transition-all duration-300 text-lg flex items-center space-x-3 touch-manipulation ${
                                        currentSection === item.id 
                                            ? 'bg-green-700 text-white shadow-lg glow-border' 
                                            : 'hover:bg-green-900 hover:text-green-300'
                                    }`}
                                    style={{
                                        animationDelay: `${index * 0.1}s`
                                    }}
                                >
                                    <span>{item.label}</span>
                                </button>
                            ))}
                        </nav>
                        
                        {/* Mobile Terminal Toggle */}
                        <div className="mt-8 pt-6 border-t border-green-600">
                            <button
                                onClick={() => {
                                    setShowTerminal(!showTerminal);
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full p-4 bg-green-800 hover:bg-green-700 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 glow-button touch-manipulation"
                            >
                                {showTerminal ? (currentData?.ui?.hideTerminal || 'OCULTAR') : (currentData?.ui?.showTerminal || 'TERMINAL')}
                            </button>
                        </div>

                        {/* Matrix Control */}
                        <div className="mt-4">
                            <button
                                onClick={() => {
                                    toggleMatrixEffect();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full p-4 bg-black border border-green-500 rounded-lg text-green-400 text-lg transition-all duration-300 glow-button touch-manipulation"
                            >
                                {matrixPaused ? (currentData?.ui?.resumeButton || 'REANUDAR') : (currentData?.ui?.pauseButton || 'PAUSAR')}
                            </button>
                        </div>

                        {/* Quick Contact - Mobile */}
                        <div className="mt-6 pt-6 border-t border-green-600">
                            <div className="grid grid-cols-2 gap-4">
                                <a 
                                    href="mailto:ahmed@elfakir.com" 
                                    className="p-3 bg-blue-700 hover:bg-blue-600 rounded-lg text-white text-center transition-all duration-300 touch-manipulation"
                                >
                                    📧 Email
                                </a>
                                <a 
                                    href="tel:+212656185848" 
                                    className="p-3 bg-green-700 hover:bg-green-600 rounded-lg text-white text-center transition-all duration-300 touch-manipulation"
                                >
                                    📱 WhatsApp
                                </a>
                            </div>
                        </div>

                        {/* Close Menu Button */}
                        <div className="mt-6">
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full p-4 bg-red-700 hover:bg-red-600 rounded-lg text-white text-lg transition-all duration-300 touch-manipulation"
                            >
                                {currentData?.ui?.closeMenu || 'CERRAR'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop Controls */}
            {!isBuilding && (
                <div className="hidden md:block">
                    <button
                        onClick={toggleMatrixEffect}
                        className="fixed top-4 right-4 z-50 px-4 py-2 bg-black bg-opacity-80 border border-green-500 rounded-lg text-green-400 text-sm font-mono hover:bg-green-900 hover:text-green-300 transition-all duration-300 backdrop-blur-sm glow-button-small shadow-lg"
                        title={matrixPaused ? (currentData?.ui?.resumeButton || 'Reanudar') : (currentData?.ui?.pauseButton || 'Pausar')}
                    >
                        {matrixPaused ? (currentData?.ui?.resumeButton || 'REANUDAR') : (currentData?.ui?.pauseButton || 'PAUSAR')}
                    </button>
                </div>
            )}

            {/* Main Layout */}
            {!isBuilding && (
                <div className="flex flex-1">
                    {/* Desktop Sidebar Navigation */}
                    <div className="hidden md:flex w-72 bg-black bg-opacity-80 backdrop-blur-sm border-r border-green-500 p-4 flex-col relative z-20 shadow-2xl">
                        <div className="mb-6 text-center">
                            <div className="relative">
                                <h1 className="text-green-300 text-xl font-bold glitch-text animate-pulse">
                                    AHMED EL FAKIR
                                </h1>
                                <div className="absolute inset-0 text-green-300 text-xl font-bold glitch-text opacity-50 transform translate-x-1">
                                    AHMED EL FAKIR
                                </div>
                            </div>
                            <p className="text-green-500 text-sm mt-2">
                                &gt; IT_SPECIALIST.exe
                            </p>
                            <div className="w-full bg-green-900 rounded-full h-1 mt-2">
                                <div className="bg-green-400 h-1 rounded-full animate-pulse" style={{width: '85%'}}></div>
                            </div>
                        </div>
                        
                        <nav className="flex-1">
                            <div className="space-y-3">
                                {navigationItems.map((item, index) => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleSectionChange(item.id)}
                                        className={`w-full text-left p-4 rounded-lg transition-all duration-300 text-sm relative group overflow-hidden flex items-center space-x-3 ${
                                            currentSection === item.id 
                                                ? 'bg-green-700 text-white shadow-lg transform scale-105 glow-border' 
                                                : 'hover:bg-green-900 hover:text-green-300 hover:transform hover:translate-x-2'
                                        }`}
                                        style={{
                                            animationDelay: `${index * 0.1}s`
                                        }}
                                    >
                                        <span className="relative z-10">{item.label}</span>
                                        {currentSection === item.id && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-800 opacity-50 animate-pulse"></div>
                                        )}
                                        <div className="absolute inset-0 bg-green-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                    </button>
                                ))}
                            </div>
                        </nav>

                        {/* System Status */}
                        <div className="mt-6 p-3 border border-green-600 rounded bg-gray-900 bg-opacity-50">
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
                                className="w-full p-3 bg-green-800 hover:bg-green-700 rounded-lg text-sm transition-all duration-300 transform hover:scale-105 glow-button"
                            >
                                {showTerminal ? (currentData?.ui?.hideTerminal || 'OCULTAR') : (currentData?.ui?.showTerminal || 'TERMINAL')}
                            </button>
                        </div>

                        {/* Quick Access Links */}
                        <div className="mt-4 text-xs text-green-600">
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

                    {/* Main Content Area */}
                    <div className="flex-1 flex flex-col relative z-10">
                        {/* Content Display */}
                        <div className="flex-1 p-4 md:p-6 overflow-y-auto flex items-center justify-center min-h-0 mobile-center">
                            <div className="max-w-5xl w-full text-center flex flex-col justify-center min-h-full py-4 mobile-container">
                                <div className="mb-4 md:mb-6">
                                    <h2 className="text-xl md:text-3xl font-bold text-green-300 mb-2 md:mb-3 glow-text">
                                        {currentData?.[currentSection]?.title || 'Cargando...'}
                                    </h2>
                                    {currentData?.[currentSection]?.subtitle && (
                                        <p className="text-green-500 text-base md:text-xl">
                                            {currentData[currentSection].subtitle}
                                        </p>
                                    )}
                                </div>
                                
                                <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-4 md:p-8 border border-green-600 shadow-2xl matrix-border relative overflow-hidden mx-auto w-full max-w-4xl">
                                    <div className="absolute inset-0 bg-gradient-to-br from-green-900 to-transparent opacity-10"></div>
                                    
                                    {isLoading ? (
                                        <div className="flex flex-col items-center justify-center py-12 md:py-20 min-h-[300px]">
                                            <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4">
                                            </div>
                                            <div className="text-green-400 text-base md:text-lg mb-2 text-center">{currentData?.ui?.loading || 'CARGANDO...'}</div>
                                            <div className="w-48 md:w-64 h-2 bg-green-900 rounded-full overflow-hidden">
                                                <div className="h-full bg-green-400 rounded-full animate-pulse" style={{width: '100%', animation: 'loadingBar 1.5s ease-in-out infinite'}}></div>
                                            </div>
                                            <div className="text-green-500 text-xs md:text-sm mt-3 opacity-75 text-center px-4">
                                {
                                    currentLanguage === 'es' ? 'Accediendo a la base de datos...' :
                                    currentLanguage === 'fr' ? 'Accès à la base de données...' :
                                    'Accessing database...'
                                }
                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center min-h-[300px] w-full mobile-content">
                                            <pre className={`whitespace-pre-wrap text-green-400 leading-relaxed relative z-10 text-shadow text-xs md:text-sm text-left w-full overflow-x-auto mobile-text ${
                                                isContentTyping ? 'typing-cursor' : ''
                                            }`}>
                                                {displayedContent}
                                                {isContentTyping && <span className="animate-pulse">█</span>}
                                            </pre>
                                        </div>
                                    )}
                                    
                                    <div className="absolute top-0 right-0 w-12 h-12 md:w-20 md:h-20 border-t-2 border-r-2 border-green-500 opacity-50"></div>
                                    <div className="absolute bottom-0 left-0 w-12 h-12 md:w-20 md:h-20 border-b-2 border-l-2 border-green-500 opacity-50"></div>
                                </div>

                                {/* Enhanced Quick Actions - Mobile Responsive */}
                                <div className="mt-4 md:mt-8 flex flex-wrap gap-2 md:gap-4 justify-center">
                                    <button
                                        onClick={() => handleSectionChange('contact')}
                                        className="px-3 py-2 md:px-6 md:py-3 bg-green-700 hover:bg-green-600 rounded-lg text-white text-xs md:text-sm transition-all duration-300 transform hover:scale-105 glow-button shadow-lg touch-manipulation"
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
                                        className="px-3 py-2 md:px-6 md:py-3 bg-blue-700 hover:bg-blue-600 rounded-lg text-white text-xs md:text-sm transition-all duration-300 transform hover:scale-105 glow-button shadow-lg touch-manipulation"
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
                                        className="px-3 py-2 md:px-6 md:py-3 bg-purple-700 hover:bg-purple-600 rounded-lg text-white text-xs md:text-sm transition-all duration-300 transform hover:scale-105 glow-button shadow-lg touch-manipulation"
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
                            <div className="h-48 md:h-80 border-t border-green-500 bg-black bg-opacity-80 backdrop-blur-sm p-2 md:p-4 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-green-900 to-transparent opacity-20"></div>
                                
                                <div className="mb-2 md:mb-3 text-green-300 text-xs md:text-sm relative z-10">
                                    <span className="hidden md:inline">{currentData?.ui?.terminal || 'TERMINAL v3.0'}</span>
                                    <span className="md:hidden">TERMINAL v3.0</span>
                                    <span className="float-right text-xs animate-pulse">REC</span>
                                </div>
                                
                                <div 
                                    ref={terminalRef}
                                    className="h-24 md:h-48 overflow-y-auto mb-2 md:mb-4 text-xs md:text-sm relative z-10 custom-scrollbar"
                                >
                                    {terminalHistory.map((line, index) => (
                                        <div key={index} className="text-green-400 fade-in-line" style={{animationDelay: `${index * 0.05}s`}}>
                                            {line}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center relative z-10">
                                    <span className="text-green-300 mr-2 glow-text text-xs md:text-sm">ahmed@ElFakir:~$</span>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={command}
                                        onChange={(e) => setCommand(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="flex-1 bg-transparent border-none outline-none text-green-400 caret-green-400 text-xs md:text-sm"
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
                                <div className="mt-2 md:mt-3 flex flex-wrap gap-1 md:gap-2 relative z-10">
                                    {['help', 'about', 'skills', 'contact', 'clear'].map((cmd, index) => (
                                        <button
                                            key={cmd}
                                            onClick={() => {
                                                setCommand(cmd);
                                                handleCommand(cmd);
                                                setCommand('');
                                            }}
                                            className="px-2 py-1 md:px-3 md:py-1 text-xs bg-green-800 hover:bg-green-700 rounded transition-all duration-200 transform hover:scale-105 glow-button-small touch-manipulation"
                                            style={{animationDelay: `${index * 0.1}s`}}
                                        >
                                            {cmd.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Custom Styles */}
            <style jsx>{`
                .glitch-text {
                    animation: glitch 2s infinite;
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

                .matrix-border {
                    position: relative;
                    border-image: linear-gradient(45deg, #0f0, transparent, #0f0) 1;
                }

                .text-shadow {
                    text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
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

                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(0, 255, 0, 0.7);
                }

                .fade-in-line {
                    animation: fadeInLine 0.5s ease-in-out forwards;
                    opacity: 0;
                }

                .typing-cursor {
                    position: relative;
                }

                .touch-manipulation {
                    touch-action: manipulation;
                }
                
                /* Mejoras para centrado en móviles */
                @media (max-width: 768px) {
                    .mobile-center {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                        width: 100%;
                        min-height: 100%;
                    }
                    
                    .mobile-content {
                        width: 100%;
                        max-width: 100%;
                        padding: 0.5rem;
                        box-sizing: border-box;
                        overflow-x: auto;
                        text-align: left;
                    }
                    
                    .mobile-text {
                        font-size: clamp(10px, 3vw, 14px);
                        line-height: 1.4;
                        word-break: break-word;
                        hyphens: auto;
                    }
                    
                    .mobile-container {
                        margin: 0;
                        padding: 1rem;
                        max-width: 100vw;
                        box-sizing: border-box;
                    }
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

                @keyframes fadeInLine {
                    from { opacity: 0; transform: translateX(-10px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </div>
    );
};

// Componente principal
const App = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [showPortfolio, setShowPortfolio] = useState(false);
    const [showLanguageSelector, setShowLanguageSelector] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showLanguageButton, setShowLanguageButton] = useState(false);

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
        if (window.showLoadingScreen) {
            window.showLoadingScreen(language);
        }
    };

    const handleBackToLanguageSelector = () => {
        setShowPortfolio(false);
        setSelectedLanguage(null);
        setIsLoading(false);
        setShowLanguageSelector(true);
        setShowLanguageButton(false);
    };

    if (!showLanguageSelector) {
        return null;
    }

    if (isLoading) {
        return null;
    }

    if (!showPortfolio || !selectedLanguage) {
        return <LanguageSelector onLanguageSelect={handleLanguageSelect} />;
    }

    return (
        <div>
            <MatrixPortfolio selectedLanguage={selectedLanguage} onShowLanguageButton={(show) => setShowLanguageButton(show)} />
            {showLanguageButton && (
                <button
                    onClick={handleBackToLanguageSelector}
                    className="fixed top-4 right-20 md:right-4 z-50 px-4 py-2 bg-black bg-opacity-80 border border-green-500 rounded-lg text-green-400 text-sm font-mono hover:bg-green-900 hover:text-green-300 transition-all duration-300 backdrop-blur-sm glow-button-small shadow-lg touch-manipulation"
                    title="Cambiar idioma / Change language / Changer de langue"
                >
                    Lang
                </button>
            )}
        </div>
    );
};

export default App;
