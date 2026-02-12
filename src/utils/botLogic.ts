import type { Message, ConversationData, ServiceOption, Question } from '../types';
import { generateId } from './helpers';
import { serviceOptions } from '../data/mockData';

export class BotConversationManager {
  private conversationData: ConversationData;
  private currentService: ServiceOption | null = null;
  private currentQuestionIndex: number = 0;

  constructor(customerId: string) {
    this.conversationData = {
      customerId,
      collectedData: {},
      status: 'active',
      startedAt: new Date(),
      lastMessageAt: new Date(),
    };
  }

  /**
   * Get initial greeting message
   */
  getGreetingMessage(): Message {
    return {
      id: generateId(),
      type: 'text',
      content: '¡Hola! 👋 Bienvenido a nuestro servicio de asistencia automotriz.\n\n¿En qué podemos ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date(),
      read: false,
    };
  }

  /**
   * Get service menu message with buttons
   */
  getServiceMenuMessage(): Message {
    return {
      id: generateId(),
      type: 'button',
      content: 'Por favor, selecciona el servicio que necesitas:',
      sender: 'bot',
      timestamp: new Date(),
      buttons: serviceOptions.map(service => ({
        id: service.id,
        label: service.label,
        value: service.id,
      })),
      read: false,
    };
  }

  /**
   * Process service selection
   */
  selectService(serviceId: string): Message[] {
    const messages: Message[] = [];

    this.currentService = serviceOptions.find(s => s.id === serviceId) || null;

    if (!this.currentService) {
      return [
        {
          id: generateId(),
          type: 'text',
          content: 'Lo siento, no pude encontrar ese servicio. Por favor, intenta nuevamente.',
          sender: 'bot',
          timestamp: new Date(),
          read: false,
        },
      ];
    }

    this.conversationData.selectedService = serviceId;
    this.conversationData.collectedData.serviceName = this.currentService.label;
    this.currentQuestionIndex = 0;

    // Confirmation message
    messages.push({
      id: generateId(),
      type: 'text',
      content: `Perfecto, te ayudaré con: ${this.currentService.label}\n\nNecesito recopilar algunos datos para ayudarte mejor.`,
      sender: 'bot',
      timestamp: new Date(),
      read: false,
    });

    // First question
    const firstQuestion = this.getNextQuestion();
    if (firstQuestion) {
      messages.push(firstQuestion);
    }

    return messages;
  }

  /**
   * Get next question in the flow
   */
  getNextQuestion(): Message | null {
    if (!this.currentService || this.currentQuestionIndex >= this.currentService.questions.length) {
      return null;
    }

    const question = this.currentService.questions[this.currentQuestionIndex];

    if (question.type === 'choice' && question.options) {
      return {
        id: generateId(),
        type: 'button',
        content: question.text,
        sender: 'bot',
        timestamp: new Date(),
        buttons: question.options.map(option => ({
          id: generateId(),
          label: option,
          value: option,
        })),
        read: false,
      };
    }

    if (question.type === 'image') {
      return {
        id: generateId(),
        type: 'text',
        content: `${question.text}\n\n📎 Puedes hacer clic en el botón de adjuntar imagen.`,
        sender: 'bot',
        timestamp: new Date(),
        read: false,
      };
    }

    return {
      id: generateId(),
      type: 'text',
      content: question.text,
      sender: 'bot',
      timestamp: new Date(),
      read: false,
    };
  }

  /**
   * Process user answer
   */
  processAnswer(answer: string, isImage: boolean = false): Message[] {
    const messages: Message[] = [];

    if (!this.currentService) {
      return messages;
    }

    const currentQuestion = this.currentService.questions[this.currentQuestionIndex];

    // Save the answer
    if (isImage) {
      this.conversationData.collectedData[currentQuestion.field] = answer; // URL of image
    } else {
      this.conversationData.collectedData[currentQuestion.field] = answer;
    }

    // Acknowledgment message
    messages.push({
      id: generateId(),
      type: 'text',
      content: isImage ? '✅ Imagen recibida correctamente.' : '✅ Perfecto, gracias.',
      sender: 'bot',
      timestamp: new Date(),
      read: false,
    });

    this.currentQuestionIndex++;

    // Check if there are more questions
    if (this.currentQuestionIndex < this.currentService.questions.length) {
      const nextQuestion = this.getNextQuestion();
      if (nextQuestion) {
        messages.push(nextQuestion);
      }
    } else {
      // All questions answered, show summary
      const summaryMessages = this.getSummaryAndTransfer();
      messages.push(...summaryMessages);
    }

    return messages;
  }

  /**
   * Get summary and transfer to agent
   */
  getSummaryAndTransfer(): Message[] {
    const messages: Message[] = [];

    // Create summary
    let summary = '📋 *Resumen de tu solicitud:*\n\n';
    summary += `Servicio: ${this.conversationData.collectedData.serviceName}\n\n`;

    Object.entries(this.conversationData.collectedData).forEach(([key, value]) => {
      if (key !== 'serviceName') {
        const question = this.currentService?.questions.find(q => q.field === key);
        if (question) {
          summary += `• ${question.text}\n  → ${value}\n\n`;
        }
      }
    });

    messages.push({
      id: generateId(),
      type: 'text',
      content: summary,
      sender: 'bot',
      timestamp: new Date(),
      read: false,
    });

    // Transfer message
    messages.push({
      id: generateId(),
      type: 'system',
      content: '🔄 Conectando con un agente humano...',
      sender: 'system',
      timestamp: new Date(),
      read: false,
    });

    this.conversationData.status = 'transferring';

    return messages;
  }

  /**
   * Simulate agent joining
   */
  getAgentJoinedMessage(agentName: string): Message {
    this.conversationData.status = 'with_agent';
    this.conversationData.assignedAgent = agentName;

    return {
      id: generateId(),
      type: 'system',
      content: `✅ ${agentName} se ha unido a la conversación`,
      sender: 'system',
      timestamp: new Date(),
      read: false,
    };
  }

  /**
   * Get option to speak with agent directly
   */
  getDirectAgentOption(): Message {
    return {
      id: generateId(),
      type: 'button',
      content: '¿Prefieres hablar directamente con un agente?',
      sender: 'bot',
      timestamp: new Date(),
      buttons: [
        {
          id: 'continue-bot',
          label: 'Continuar con el asistente',
          value: 'continue',
        },
        {
          id: 'speak-agent',
          label: '👤 Hablar con un agente',
          value: 'agent',
        },
      ],
      read: false,
    };
  }

  /**
   * Process direct agent request
   */
  requestDirectAgent(): Message[] {
    this.conversationData.status = 'transferring';

    return [
      {
        id: generateId(),
        type: 'text',
        content: 'Entendido, te conectaré con un agente ahora mismo.',
        sender: 'bot',
        timestamp: new Date(),
        read: false,
      },
      {
        id: generateId(),
        type: 'system',
        content: '🔄 Buscando un agente disponible...',
        sender: 'system',
        timestamp: new Date(),
        read: false,
      },
    ];
  }

  /**
   * Get conversation data
   */
  getConversationData(): ConversationData {
    return this.conversationData;
  }

  /**
   * Check if conversation is complete
   */
  isComplete(): boolean {
    return this.conversationData.status === 'with_agent';
  }
}
