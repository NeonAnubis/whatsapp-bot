import { format, isToday, isYesterday } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Simulates realistic typing delay based on message length
 */
export const simulateTypingDelay = (messageLength: number): number => {
  const baseDelay = 800; // Base delay in ms
  const charDelay = 30; // Additional delay per character
  const randomVariation = Math.random() * 500; // Add some randomness

  return Math.min(baseDelay + (messageLength * charDelay) + randomVariation, 3000);
};

/**
 * Formats timestamp for WhatsApp-like display
 */
export const formatMessageTime = (date: Date): string => {
  return format(date, 'HH:mm', { locale: es });
};

/**
 * Formats date for conversation list
 */
export const formatConversationTime = (date: Date): string => {
  if (isToday(date)) {
    return format(date, 'HH:mm', { locale: es });
  }

  if (isYesterday(date)) {
    return 'Ayer';
  }

  return format(date, 'dd/MM/yyyy', { locale: es });
};

/**
 * Creates a delay promise
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Generates a unique ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Simulates reading a message with realistic delay
 */
export const simulateReadDelay = (): number => {
  return Math.random() * 1000 + 500; // 500-1500ms
};

/**
 * Truncates text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Formats phone number
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  // Format as +XX XXX XXX XXX
  if (cleaned.length >= 11) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  }

  return phone;
};

/**
 * Gets agent status color
 */
export const getStatusColor = (status: 'online' | 'offline' | 'busy'): string => {
  switch (status) {
    case 'online':
      return 'bg-green-500';
    case 'busy':
      return 'bg-yellow-500';
    case 'offline':
      return 'bg-gray-500';
    default:
      return 'bg-gray-500';
  }
};

/**
 * Gets status text in Spanish
 */
export const getStatusText = (status: 'online' | 'offline' | 'busy'): string => {
  switch (status) {
    case 'online':
      return 'En línea';
    case 'busy':
      return 'Ocupado';
    case 'offline':
      return 'Desconectado';
    default:
      return 'Desconocido';
  }
};

/**
 * Simulates image upload
 */
export const simulateImageUpload = async (): Promise<string> => {
  await delay(1500); // Simulate upload time
  // Return a random placeholder image
  return `https://picsum.photos/400/300?random=${Math.random()}`;
};

/**
 * Plays notification sound (simulated)
 */
export const playNotificationSound = (): void => {
  // In a real app, this would play an actual sound
  // For demo purposes, we'll just log it
  console.log('🔔 Notification sound played');
};
