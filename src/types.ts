export type MessageType = 'text' | 'button' | 'image' | 'system';

export type Message = {
  id: string;
  type: MessageType;
  content: string;
  sender: 'bot' | 'user' | 'agent' | 'system';
  timestamp: Date;
  buttons?: Button[];
  imageUrl?: string;
  read?: boolean;
}

export type Button = {
  id: string;
  label: string;
  value: string;
}

export type ConversationData = {
  customerId: string;
  customerName?: string;
  selectedService?: string;
  collectedData: Record<string, any>;
  status: 'active' | 'waiting' | 'completed' | 'with_agent' | 'transferring';
  assignedAgent?: string;
  startedAt: Date;
  lastMessageAt: Date;
}

export type Agent = {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  activeConversations: number;
  pendingConversations: string[];
}

export type Customer = {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount?: number;
  assignedAgent?: string;
  conversationData?: ConversationData;
}

export type ServiceOption = {
  id: string;
  label: string;
  icon: string;
  questions: Question[];
}

export type Question = {
  id: string;
  text: string;
  type: 'text' | 'choice' | 'image' | 'number';
  field: string;
  options?: string[];
  required: boolean;
}

export type ConversationStep =
  | 'greeting'
  | 'menu'
  | 'collecting_data'
  | 'confirming'
  | 'transferring'
  | 'with_agent';
