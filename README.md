# 🚀 WhatsApp Bot Demo - Sistema Automatizado con Multi-Agente

Una demostración completamente funcional de un sistema de automatización para WhatsApp con embudo conversacional y panel multi-agente para atención al cliente.

![Demo Preview](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-blue)

## ✨ Características Principales

### 🤖 Embudo Automatizado (Bot)
- **Menú interactivo** con 10 opciones de servicio
- **Recopilación estructurada** de datos del cliente
- **Flujo conversacional** natural con botones y preguntas dinámicas
- **Validación de respuestas** y recopilación de imágenes
- **Transferencia inteligente** a agente humano con todo el contexto

### 👥 Panel Multi-Agente
- **Gestión de 5 agentes** simultáneos
- **Asignación automática** de conversaciones
- **Vista de conversaciones pendientes** por agente
- **Transferencia de casos** entre agentes
- **Estados en tiempo real** (online, ocupado, desconectado)
- **Estadísticas** de conversaciones activas y pendientes

### 💎 Experiencia de Usuario
- **Interfaz idéntica a WhatsApp Web**
- **Animaciones fluidas** y realistas
- **Indicadores de escritura** con delays naturales
- **Timestamps** y estados de lectura (checks azules)
- **Responsive design** para móvil y desktop
- **Scroll automático** en conversaciones

## 🛠️ Tecnologías Utilizadas

- **React 18** - Framework UI
- **TypeScript** - Type safety
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Styling
- **React Router** - Navegación
- **Lucide React** - Iconos
- **date-fns** - Manejo de fechas

## 📦 Instalación

```bash
# Clonar el repositorio (o extraer el ZIP)
cd whatsapp-demo

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

El proyecto estará disponible en: **http://localhost:5173/**

## 🎯 Uso del Demo

### 1️⃣ Página Principal
Al abrir el demo, verás dos opciones:

- **Vista Cliente**: Experimenta el embudo automatizado
- **Panel de Agentes**: Gestiona conversaciones como agente

### 2️⃣ Vista Cliente (Chat Bot)

1. El bot te saluda y presenta el menú de servicios
2. Selecciona un servicio (ej: "Cambio de Pantalla")
3. Responde las preguntas del bot
4. Sube imágenes cuando se soliciten (simulado)
5. El bot recopila todos los datos y te transfiere a un agente
6. **Opción directa**: En cualquier momento puedes hablar con un agente

**Ejemplo de Flujo**:
```
Bot: ¿En qué podemos ayudarte?
→ Seleccionas: "📱 Cambio de Pantalla"

Bot: ¿Qué modelo de coche tienes?
→ Escribes: "BMW X5"

Bot: ¿De qué año es tu vehículo?
→ Escribes: "2020"

Bot: Envía una foto de la pantalla
→ Adjuntas imagen (simulado)

Bot: Muestra resumen y transfiere a agente
→ Agente se une a la conversación
```

### 3️⃣ Panel de Agentes (Dashboard)

**Funcionalidades**:
- **Lista de agentes** con estados en tiempo real
- **Conversaciones asignadas** a cada agente
- **Búsqueda** de conversaciones por nombre/teléfono
- **Transferencia** de conversaciones entre agentes
- **Detalles del cliente** en panel lateral
- **Estadísticas** de conversaciones activas/pendientes

**Cómo usar**:
1. Selecciona un agente de la lista izquierda
2. Ve sus conversaciones asignadas
3. Haz clic en "Transferir" para cambiar de agente
4. Selecciona una conversación para ver detalles

## 📁 Estructura del Proyecto

```
whatsapp-demo/
├── src/
│   ├── components/
│   │   ├── Home.tsx              # Página principal
│   │   ├── ChatInterface.tsx     # Interfaz de chat (cliente)
│   │   ├── MessageBubble.tsx     # Componente de mensaje
│   │   ├── TypingIndicator.tsx   # Indicador de escritura
│   │   └── AgentDashboard.tsx    # Panel de agentes
│   ├── data/
│   │   └── mockData.ts           # Datos de prueba (servicios, agentes)
│   ├── types/
│   │   └── index.ts              # Definiciones TypeScript
│   ├── utils/
│   │   ├── helpers.ts            # Utilidades generales
│   │   └── botLogic.ts           # Lógica del bot conversacional
│   ├── App.tsx                   # Routing principal
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Estilos globales
├── tailwind.config.js            # Configuración Tailwind
├── vite.config.ts                # Configuración Vite
└── package.json
```

## 🎨 Personalización

### Modificar Servicios

Edita `src/data/mockData.ts` para cambiar los servicios del menú:

```typescript
export const serviceOptions: ServiceOption[] = [
  {
    id: 'tu-servicio',
    label: '🔧 Tu Servicio',
    icon: '🔧',
    questions: [
      {
        id: 'pregunta-1',
        text: '¿Tu pregunta aquí?',
        type: 'text', // 'text' | 'choice' | 'image' | 'number'
        field: 'nombreCampo',
        required: true,
      },
    ],
  },
];
```

### Modificar Agentes

En el mismo archivo, edita `mockAgents`:

```typescript
export const mockAgents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Tu Nombre',
    avatar: 'url-de-tu-avatar',
    status: 'online',
    activeConversations: 0,
    pendingConversations: [],
  },
];
```

### Cambiar Colores

Edita `tailwind.config.js`:

```javascript
colors: {
  whatsapp: {
    green: '#00a884',      // Color principal
    'green-dark': '#008069',
    // ... otros colores
  }
}
```

## 🚀 Build para Producción

```bash
# Crear build optimizado
npm run build

# Preview del build
npm run preview
```

Los archivos optimizados estarán en `/dist`

## 📊 Datos Demo

El proyecto incluye:
- ✅ **10 servicios** automotrices predefinidos
- ✅ **5 agentes** con diferentes estados
- ✅ **5 conversaciones** de ejemplo
- ✅ **Avatares** de Pravatar.cc
- ✅ **Imágenes** de Picsum para uploads simulados

## 🔄 Próximos Pasos para Producción

Para convertir este demo en un sistema real:

1. **WhatsApp API**
   - Integrar WhatsApp Business API oficial o Evolution API
   - Configurar webhooks para mensajes entrantes

2. **Backend**
   - Crear API REST (Node.js/Express, Python/FastAPI)
   - Base de datos (PostgreSQL/MongoDB)
   - Sistema de autenticación para agentes

3. **Features Adicionales**
   - WebSockets para actualización en tiempo real
   - Notificaciones push
   - Historial completo de conversaciones
   - Analytics y reportes
   - Integración con CRM

4. **Deployment**
   - Frontend: Vercel, Netlify
   - Backend: AWS, DigitalOcean
   - Base de datos: RDS, MongoDB Atlas

## 💡 Consejos

- **Reinicia el flujo**: Recarga la página para empezar de nuevo
- **Prueba ambas vistas**: Chat y Dashboard son independientes
- **Simulación realista**: Los delays están calibrados para sentirse naturales
- **Responsive**: Prueba en móvil para experiencia WhatsApp real

## 🐛 Solución de Problemas

**El servidor no inicia:**
```bash
# Reinstala dependencias
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Error de TypeScript:**
```bash
# Verifica que los tipos estén instalados
npm install -D @types/react @types/react-dom
```

**Estilos no cargan:**
```bash
# Regenera Tailwind
npx tailwindcss -o src/index.css
```

## 📄 Licencia

Este es un proyecto de demostración. Siéntete libre de usar, modificar y distribuir según tus necesidades.

## 👨‍💻 Autor

Demo creado para Oscar - Sistema de Automatización WhatsApp

---

**¿Preguntas o sugerencias?** Este demo es completamente funcional y listo para ser presentado a clientes. 🎉
