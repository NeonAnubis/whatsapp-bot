import { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, MoreVertical, Search } from 'lucide-react';
import type { Message } from '../types';
import { BotConversationManager } from '../utils/botLogic';
import { simulateTypingDelay, delay, generateId, simulateImageUpload } from '../utils/helpers';
import { getRandomAgent } from '../data/mockData';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [botManager] = useState(() => new BotConversationManager('demo-user'));
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const initialized = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initialize conversation
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initConversation = async () => {
      await delay(500);

      const greeting = botManager.getGreetingMessage();
      setMessages([greeting]);

      await delay(simulateTypingDelay(greeting.content.length));
      setIsTyping(true);

      await delay(1000);
      setIsTyping(false);

      const menu = botManager.getServiceMenuMessage();
      setMessages(prev => [...prev, menu]);

      // Add option to speak with agent
      await delay(800);
      const agentOption = botManager.getDirectAgentOption();
      setMessages(prev => [...prev, agentOption]);
    };

    initConversation();
  }, [botManager]);

  const addBotMessages = async (newMessages: Message[]) => {
    for (const msg of newMessages) {
      setIsTyping(true);
      await delay(simulateTypingDelay(msg.content.length));
      setIsTyping(false);

      setMessages(prev => [...prev, msg]);
      await delay(500);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: generateId(),
      type: 'text',
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      read: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    await delay(300);

    const botResponses = botManager.processAnswer(inputValue);
    await addBotMessages(botResponses);

    // Simulate agent joining after transfer
    if (botManager.getConversationData().status === 'transferring') {
      await delay(2000);
      const agent = getRandomAgent();
      const agentMessage = botManager.getAgentJoinedMessage(agent.name);
      setMessages(prev => [...prev, agentMessage]);

      await delay(1500);
      setIsTyping(true);
      await delay(1000);
      setIsTyping(false);

      const agentGreeting: Message = {
        id: generateId(),
        type: 'text',
        content: `Hola, soy ${agent.name}. He revisado tu solicitud y estoy aquí para ayudarte. ¿Hay algo más que necesites agregar?`,
        sender: 'agent',
        timestamp: new Date(),
        read: false,
      };
      setMessages(prev => [...prev, agentGreeting]);
    }
  };

  const handleButtonClick = async (value: string, buttonLabel: string) => {
    const userMessage: Message = {
      id: generateId(),
      type: 'text',
      content: buttonLabel,
      sender: 'user',
      timestamp: new Date(),
      read: true,
    };

    setMessages(prev => [...prev, userMessage]);

    await delay(500);

    // Check if it's service selection or agent option
    if (value === 'agent') {
      const responses = botManager.requestDirectAgent();
      await addBotMessages(responses);

      // Simulate agent joining
      await delay(2000);
      const agent = getRandomAgent();
      const agentMessage = botManager.getAgentJoinedMessage(agent.name);
      setMessages(prev => [...prev, agentMessage]);

      await delay(1500);
      setIsTyping(true);
      await delay(1000);
      setIsTyping(false);

      const agentGreeting: Message = {
        id: generateId(),
        type: 'text',
        content: `Hola, soy ${agent.name}. ¿En qué puedo ayudarte hoy?`,
        sender: 'agent',
        timestamp: new Date(),
        read: false,
      };
      setMessages(prev => [...prev, agentGreeting]);
    } else if (value === 'continue') {
      // Continue with bot
      setIsTyping(true);
      await delay(800);
      setIsTyping(false);

      const continueMessage: Message = {
        id: generateId(),
        type: 'text',
        content: 'Perfecto, continuemos. Por favor selecciona el servicio que necesitas del menú anterior.',
        sender: 'bot',
        timestamp: new Date(),
        read: false,
      };
      setMessages(prev => [...prev, continueMessage]);
    } else {
      // Service selection or question answer
      const botResponses = botManager.selectService(value).length > 0
        ? botManager.selectService(value)
        : botManager.processAnswer(value);

      await addBotMessages(botResponses);

      // Check for transfer
      if (botManager.getConversationData().status === 'transferring') {
        await delay(2000);
        const agent = getRandomAgent();
        const agentMessage = botManager.getAgentJoinedMessage(agent.name);
        setMessages(prev => [...prev, agentMessage]);

        await delay(1500);
        setIsTyping(true);
        await delay(1000);
        setIsTyping(false);

        const agentGreeting: Message = {
          id: generateId(),
          type: 'text',
          content: `Hola, soy ${agent.name}. He revisado tu solicitud y estoy aquí para ayudarte. ¿Hay algo más que quieras agregar?`,
          sender: 'agent',
          timestamp: new Date(),
          read: false,
        };
        setMessages(prev => [...prev, agentGreeting]);
      }
    }
  };

  const handleImageUpload = async () => {
    setIsUploading(true);

    try {
      const imageUrl = await simulateImageUpload();

      const userMessage: Message = {
        id: generateId(),
        type: 'image',
        content: 'Imagen adjunta',
        imageUrl: imageUrl,
        sender: 'user',
        timestamp: new Date(),
        read: true,
      };

      setMessages(prev => [...prev, userMessage]);

      await delay(500);

      const botResponses = botManager.processAnswer(imageUrl, true);
      await addBotMessages(botResponses);

      // Check for transfer
      if (botManager.getConversationData().status === 'transferring') {
        await delay(2000);
        const agent = getRandomAgent();
        const agentMessage = botManager.getAgentJoinedMessage(agent.name);
        setMessages(prev => [...prev, agentMessage]);

        await delay(1500);
        setIsTyping(true);
        await delay(1000);
        setIsTyping(false);

        const agentGreeting: Message = {
          id: generateId(),
          type: 'text',
          content: `Hola, soy ${agent.name}. He revisado tu solicitud y las imágenes. Estoy aquí para ayudarte.`,
          sender: 'agent',
          timestamp: new Date(),
          read: false,
        };
        setMessages(prev => [...prev, agentGreeting]);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-whatsapp-bg">
      {/* Header */}
      <div className="bg-whatsapp-panel border-b border-whatsapp-hover px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/150?img=25"
            alt="Support"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="text-white font-medium">Asistente Automotriz</h2>
            <p className="text-xs text-gray-400">En línea</p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-gray-400">
          <Search className="w-5 h-5 cursor-pointer hover:text-white transition" />
          <MoreVertical className="w-5 h-5 cursor-pointer hover:text-white transition" />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 bg-[#0b141a]">
        <div className="max-w-4xl mx-auto space-y-2">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              onButtonClick={handleButtonClick}
            />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-whatsapp-panel px-4 py-2">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <button
            onClick={handleImageUpload}
            disabled={isUploading}
            className={`p-2 rounded-full hover:bg-whatsapp-hover transition text-gray-400 hover:text-white ${
              isUploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title="Adjuntar imagen"
          >
            <Paperclip className="w-6 h-6" />
          </button>

          <div className="flex-1 bg-whatsapp-dark rounded-lg px-4 py-2 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe un mensaje"
              className="flex-1 bg-transparent text-white outline-none placeholder-gray-500"
              disabled={isUploading}
            />
          </div>

          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isUploading}
            className={`p-2 rounded-full transition ${
              inputValue.trim() && !isUploading
                ? 'bg-whatsapp-green hover:bg-whatsapp-green-dark text-white'
                : 'bg-whatsapp-hover text-gray-500 cursor-not-allowed'
            }`}
            title="Enviar mensaje"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
