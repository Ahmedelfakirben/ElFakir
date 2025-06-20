# 🚀 Ahmed El Fakir - Matrix Portfolio

Un portafolio interactivo estilo Matrix desarrollado en React, mostrando la experiencia profesional de Ahmed El Fakir como IT Professional & SOC Specialist.

## 🎯 Características

- **🌧️ Matrix Rain Effect** - Lluvia de código auténtica de fondo
- **💻 Terminal Interactiva** - Comandos funcionales estilo hacker
- **✨ Animaciones Avanzadas** - Efectos glitch, typing, glow y más
- **📱 Responsive Design** - Funciona perfectamente en todos los dispositivos
- **🎮 Doble Navegación** - Menú lateral + comandos de terminal
- **🔥 Efectos Visuales** - Gradientes, sombras y transiciones cinematográficas

## 🛠️ Tecnologías Utilizadas

- **React 18** - Framework principal
- **Tailwind CSS** - Estilos y animaciones
- **Canvas API** - Efecto Matrix Rain
- **CSS Animations** - Efectos visuales avanzados
- **Modern JavaScript** - ES6+ features

## 📋 Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [npm](https://www.npmjs.com/) (viene incluido con Node.js)

## 🚀 Instalación y Ejecución

### 1. Instalar dependencias
```bash
cd C:\Users\Admin\Desktop\elfakir
npm install
```

### 2. Ejecutar en modo desarrollo
```bash
npm start
```

El proyecto se abrirá automáticamente en: `http://localhost:3000`

### 3. Construir para producción
```bash
npm run build
```

## 🎮 Comandos de Terminal Disponibles

- `help` - Muestra todos los comandos disponibles
- `about` / `whoami` - Información personal
- `experience` / `work` - Experiencia profesional
- `skills` / `tech` - Habilidades técnicas
- `projects` - Proyectos destacados
- `contact` - Información de contacto
- `ls` - Lista directorios disponibles
- `clear` - Limpia la terminal
- `exit` - Mensaje de despedida

## 📁 Estructura del Proyecto

```
elfakir/
├── public/
│   └── index.html          # HTML principal
├── src/
│   ├── App.js             # Componente principal Matrix
│   └── index.js           # Punto de entrada React
├── package.json           # Dependencias y scripts
└── README.md             # Este archivo
```

## 🎨 Personalización

### Cambiar Colores Matrix
En `src/App.js`, modifica las variables CSS:
```css
:root {
    --matrix-green: #00ff00;
    --matrix-dark-green: #003300;
    --matrix-bg: #000000;
}
```

### Agregar Nuevas Secciones
1. Añade la nueva sección en `portfolioData`
2. Agrega el ítem en `navigationItems`
3. Incluye el comando en `commands`

### Modificar Efectos Matrix
Ajusta los parámetros en el useEffect del canvas:
- `fontSize` - Tamaño de caracteres
- `chars` - Caracteres que caen
- `drops[i]` - Velocidad de caída

## 🌐 Deployment

### GitHub Pages
```bash
npm install --save-dev gh-pages
npm run build
npx gh-pages -d build
```

### Netlify
1. Conecta tu repositorio
2. Build command: `npm run build`
3. Publish directory: `build`

### Vercel
```bash
npm install -g vercel
vercel --prod
```

## 🔧 Troubleshooting

### Error: Module not found
```bash
npm install
```

### Puerto 3000 ocupado
```bash
npm start -- --port 3001
```

### Build errors
```bash
npm run build --verbose
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔒 SEO y Performance

- ✅ Meta tags optimizados
- ✅ Open Graph configurado
- ✅ Favicon personalizado
- ✅ Google Fonts preload
- ✅ Loading screen optimizado

## 👨‍💻 Desarrollado por

**Ahmed El Fakir**
- 📧 Email: ahmed@elfakir.com
- 📱 Teléfono: (+212) 656185848
- 🌐 Web: https://www.elfakir.com
- 💼 LinkedIn: [Ahmed El Fakir](https://www.linkedin.com/in/el-fakir-ahmed-826b19244/)

## 📄 Licencia

MIT License - Ve el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- Inspirado en la película "The Matrix"
- Efectos visuales basados en tecnologías web modernas
- Diseño centrado en la experiencia de usuario

---

### 💡 Tip para Desarrolladores

Este proyecto demuestra técnicas avanzadas de:
- Canvas animations
- CSS-in-JS
- React Hooks avanzados
- Responsive design
- Performance optimization

¡Perfecto para mostrar habilidades de frontend development! 🚀
