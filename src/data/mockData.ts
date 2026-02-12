import type { Agent, ServiceOption, Customer } from '../types';

export const serviceOptions: ServiceOption[] = [
  {
    id: 'screen-replacement',
    label: '📱 Cambio de Pantalla',
    icon: '📱',
    questions: [
      {
        id: 'car-model',
        text: '¿Qué modelo de coche tienes?',
        type: 'text',
        field: 'carModel',
        required: true,
      },
      {
        id: 'car-year',
        text: '¿De qué año es tu vehículo?',
        type: 'number',
        field: 'carYear',
        required: true,
      },
      {
        id: 'screen-photo',
        text: 'Por favor, envía una foto de la pantalla actual',
        type: 'image',
        field: 'screenPhoto',
        required: true,
      },
    ],
  },
  {
    id: 'engine-repair',
    label: '🔧 Reparación de Motor',
    icon: '🔧',
    questions: [
      {
        id: 'engine-issue',
        text: '¿Qué problema presenta el motor?',
        type: 'text',
        field: 'engineIssue',
        required: true,
      },
      {
        id: 'car-brand',
        text: '¿Marca y modelo del vehículo?',
        type: 'text',
        field: 'carBrand',
        required: true,
      },
      {
        id: 'mileage',
        text: '¿Cuántos kilómetros tiene?',
        type: 'number',
        field: 'mileage',
        required: true,
      },
    ],
  },
  {
    id: 'brake-service',
    label: '🛑 Servicio de Frenos',
    icon: '🛑',
    questions: [
      {
        id: 'brake-issue',
        text: '¿Qué problema tienes con los frenos?',
        type: 'choice',
        field: 'brakeIssue',
        options: ['Ruido al frenar', 'Vibración', 'Freno suave', 'Luz de advertencia'],
        required: true,
      },
      {
        id: 'vehicle-type',
        text: '¿Tipo de vehículo?',
        type: 'text',
        field: 'vehicleType',
        required: true,
      },
    ],
  },
  {
    id: 'oil-change',
    label: '🛢️ Cambio de Aceite',
    icon: '🛢️',
    questions: [
      {
        id: 'oil-type',
        text: '¿Qué tipo de aceite prefieres?',
        type: 'choice',
        field: 'oilType',
        options: ['Sintético', 'Semi-sintético', 'Mineral'],
        required: true,
      },
      {
        id: 'last-change',
        text: '¿Cuándo fue tu último cambio de aceite?',
        type: 'text',
        field: 'lastChange',
        required: false,
      },
    ],
  },
  {
    id: 'air-conditioning',
    label: '❄️ Aire Acondicionado',
    icon: '❄️',
    questions: [
      {
        id: 'ac-issue',
        text: '¿Qué problema tiene el aire acondicionado?',
        type: 'choice',
        field: 'acIssue',
        options: ['No enfría', 'Ruido extraño', 'Mal olor', 'No enciende'],
        required: true,
      },
      {
        id: 'car-info',
        text: 'Marca y modelo del vehículo',
        type: 'text',
        field: 'carInfo',
        required: true,
      },
    ],
  },
  {
    id: 'electrical',
    label: '⚡ Sistema Eléctrico',
    icon: '⚡',
    questions: [
      {
        id: 'electrical-issue',
        text: '¿Qué problema eléctrico presenta?',
        type: 'text',
        field: 'electricalIssue',
        required: true,
      },
      {
        id: 'battery-age',
        text: '¿Cuánto tiempo tiene la batería?',
        type: 'text',
        field: 'batteryAge',
        required: false,
      },
    ],
  },
  {
    id: 'suspension',
    label: '🚗 Suspensión',
    icon: '🚗',
    questions: [
      {
        id: 'suspension-issue',
        text: '¿Qué problema tiene la suspensión?',
        type: 'text',
        field: 'suspensionIssue',
        required: true,
      },
      {
        id: 'noise-location',
        text: '¿Dónde escuchas el ruido?',
        type: 'choice',
        field: 'noiseLocation',
        options: ['Delantera izquierda', 'Delantera derecha', 'Trasera izquierda', 'Trasera derecha'],
        required: true,
      },
    ],
  },
  {
    id: 'tire-service',
    label: '🎯 Servicio de Neumáticos',
    icon: '🎯',
    questions: [
      {
        id: 'tire-service-type',
        text: '¿Qué servicio necesitas?',
        type: 'choice',
        field: 'tireServiceType',
        options: ['Cambio de neumáticos', 'Rotación', 'Balanceo', 'Alineación'],
        required: true,
      },
      {
        id: 'tire-size',
        text: '¿Conoces la medida de tus neumáticos?',
        type: 'text',
        field: 'tireSize',
        required: false,
      },
    ],
  },
  {
    id: 'general-maintenance',
    label: '🔍 Revisión General',
    icon: '🔍',
    questions: [
      {
        id: 'maintenance-type',
        text: '¿Qué tipo de revisión necesitas?',
        type: 'choice',
        field: 'maintenanceType',
        options: ['Revisión pre-ITV', 'Mantenimiento programado', 'Diagnóstico general'],
        required: true,
      },
      {
        id: 'vehicle-details',
        text: 'Marca, modelo y año del vehículo',
        type: 'text',
        field: 'vehicleDetails',
        required: true,
      },
    ],
  },
  {
    id: 'bodywork',
    label: '🎨 Chapa y Pintura',
    icon: '🎨',
    questions: [
      {
        id: 'damage-type',
        text: '¿Qué tipo de daño tiene?',
        type: 'choice',
        field: 'damageType',
        options: ['Rayón', 'Golpe', 'Abolladuras', 'Pintura desgastada'],
        required: true,
      },
      {
        id: 'damage-photo',
        text: 'Envía una foto del daño',
        type: 'image',
        field: 'damagePhoto',
        required: true,
      },
    ],
  },
];

export const mockAgents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Carlos Méndez',
    avatar: 'https://i.pravatar.cc/150?img=12',
    status: 'online',
    activeConversations: 3,
    pendingConversations: ['conv-1', 'conv-2'],
  },
  {
    id: 'agent-2',
    name: 'María García',
    avatar: 'https://i.pravatar.cc/150?img=47',
    status: 'online',
    activeConversations: 2,
    pendingConversations: ['conv-3'],
  },
  {
    id: 'agent-3',
    name: 'Juan Rodríguez',
    avatar: 'https://i.pravatar.cc/150?img=33',
    status: 'busy',
    activeConversations: 4,
    pendingConversations: ['conv-4', 'conv-5'],
  },
  {
    id: 'agent-4',
    name: 'Ana López',
    avatar: 'https://i.pravatar.cc/150?img=44',
    status: 'online',
    activeConversations: 1,
    pendingConversations: [],
  },
  {
    id: 'agent-5',
    name: 'Pedro Sánchez',
    avatar: 'https://i.pravatar.cc/150?img=68',
    status: 'offline',
    activeConversations: 0,
    pendingConversations: [],
  },
];

export const mockCustomers: Customer[] = [
  {
    id: 'conv-1',
    name: 'Roberto Fernández',
    phone: '+34 612 345 678',
    avatar: 'https://i.pravatar.cc/150?img=11',
    lastMessage: 'Necesito cambiar la pantalla de mi BMW...',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
    unreadCount: 2,
    assignedAgent: 'agent-1',
  },
  {
    id: 'conv-2',
    name: 'Laura Martínez',
    phone: '+34 623 456 789',
    avatar: 'https://i.pravatar.cc/150?img=45',
    lastMessage: 'Mi aire acondicionado no enfría',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 15),
    unreadCount: 1,
    assignedAgent: 'agent-1',
  },
  {
    id: 'conv-3',
    name: 'David Gómez',
    phone: '+34 634 567 890',
    avatar: 'https://i.pravatar.cc/150?img=52',
    lastMessage: 'Necesito un cambio de aceite urgente',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
    unreadCount: 0,
    assignedAgent: 'agent-2',
  },
  {
    id: 'conv-4',
    name: 'Carmen Ruiz',
    phone: '+34 645 678 901',
    avatar: 'https://i.pravatar.cc/150?img=36',
    lastMessage: 'Los frenos hacen ruido',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 45),
    unreadCount: 3,
    assignedAgent: 'agent-3',
  },
  {
    id: 'conv-5',
    name: 'Miguel Torres',
    phone: '+34 656 789 012',
    avatar: 'https://i.pravatar.cc/150?img=60',
    lastMessage: 'Quiero agendar una revisión',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60),
    unreadCount: 0,
    assignedAgent: 'agent-3',
  },
];

export const getRandomAgent = (): Agent => {
  const availableAgents = mockAgents.filter(a => a.status === 'online');
  return availableAgents[Math.floor(Math.random() * availableAgents.length)] || mockAgents[0];
};
