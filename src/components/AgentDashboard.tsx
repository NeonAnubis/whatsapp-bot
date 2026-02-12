import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  MessageSquare,
  Clock,
  ArrowRightLeft,
  Search,
  Filter,
  Bell,
  Settings,
  BarChart3,
  X,
  TrendingUp,
  Activity,
  UserCheck,
  Home,
} from 'lucide-react';
import type { Agent, Customer } from '../types';
import { mockAgents, mockCustomers } from '../data/mockData';
import {
  formatConversationTime,
  getStatusColor,
  getStatusText,
  truncateText,
} from '../utils/helpers';

const AgentDashboard = () => {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(agents[0]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showStatistics, setShowStatistics] = useState(false);
  const [showConversation, setShowConversation] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate status changes
      setAgents((prev) =>
        prev.map((agent) => ({
          ...agent,
          activeConversations: Math.max(
            0,
            agent.activeConversations + (Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0)
          ),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleTransferConversation = (customer: Customer, toAgent: Agent) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === customer.id
          ? { ...c, assignedAgent: toAgent.id }
          : c
      )
    );

    setAgents((prev) =>
      prev.map((a) => {
        if (a.id === toAgent.id) {
          return {
            ...a,
            pendingConversations: [...a.pendingConversations, customer.id],
            activeConversations: a.activeConversations + 1,
          };
        }
        if (a.id === customer.assignedAgent) {
          return {
            ...a,
            pendingConversations: a.pendingConversations.filter((id) => id !== customer.id),
            activeConversations: Math.max(0, a.activeConversations - 1),
          };
        }
        return a;
      })
    );
  };

  const filteredCustomers = selectedAgent
    ? customers.filter((c) => c.assignedAgent === selectedAgent.id)
    : customers;

  const searchedCustomers = searchTerm
    ? filteredCustomers.filter(
        (c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.phone.includes(searchTerm)
      )
    : filteredCustomers;

  return (
    <div className="flex h-screen bg-whatsapp-bg">
      {/* Sidebar - Agents List */}
      <div className="w-80 bg-whatsapp-panel border-r border-whatsapp-hover flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-whatsapp-hover">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-white text-xl font-semibold flex items-center gap-2">
              <Users className="w-6 h-6 text-whatsapp-green" />
              Panel de Agentes
            </h1>
            <div className="flex gap-2">
              <Link
                to="/"
                className="p-2 hover:bg-whatsapp-hover rounded-full transition"
                title="Volver al inicio"
              >
                <Home className="w-5 h-5 text-gray-400 hover:text-white" />
              </Link>
              <button className="p-2 hover:bg-whatsapp-hover rounded-full transition">
                <Bell className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-whatsapp-hover rounded-full transition">
                <Settings className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-whatsapp-dark rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="w-4 h-4 text-whatsapp-green" />
                <span className="text-xs text-gray-400">Activas</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {agents.reduce((sum, a) => sum + a.activeConversations, 0)}
              </p>
            </div>
            <div className="bg-whatsapp-dark rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-yellow-500" />
                <span className="text-xs text-gray-400">Pendientes</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {customers.filter((c) => c.unreadCount && c.unreadCount > 0).length}
              </p>
            </div>
          </div>
        </div>

        {/* Agents List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-2">
            <h2 className="text-gray-400 text-sm font-medium px-2 mb-2 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Agentes ({agents.filter((a) => a.status === 'online').length} en línea)
            </h2>
            {agents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                className={`w-full p-3 rounded-lg mb-1 transition-all ${
                  selectedAgent?.id === agent.id
                    ? 'bg-whatsapp-hover'
                    : 'hover:bg-whatsapp-dark'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={agent.avatar}
                      alt={agent.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-whatsapp-panel ${getStatusColor(
                        agent.status
                      )}`}
                    ></span>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-white font-medium text-sm">{agent.name}</h3>
                    <p className="text-xs text-gray-400">{getStatusText(agent.status)}</p>
                  </div>
                  <div className="text-right">
                    <div className="bg-whatsapp-green text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {agent.activeConversations}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Conversations */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-whatsapp-panel border-b border-whatsapp-hover p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-white text-lg font-semibold">
                {selectedAgent ? `Conversaciones de ${selectedAgent.name}` : 'Todas las conversaciones'}
              </h2>
              <p className="text-sm text-gray-400">
                {filteredCustomers.length} conversacion{filteredCustomers.length !== 1 ? 'es' : ''}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedAgent(null)}
                className="px-4 py-2 bg-whatsapp-dark hover:bg-whatsapp-hover text-white rounded-lg transition flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                {selectedAgent ? 'Ver Todos' : 'Filtros'}
              </button>
              <button
                onClick={() => setShowStatistics(true)}
                className="px-4 py-2 bg-whatsapp-green hover:bg-whatsapp-green-dark text-white rounded-lg transition flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Estadísticas
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-whatsapp-dark text-white pl-10 pr-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-whatsapp-green"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {searchedCustomers.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <MessageSquare className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-lg">No hay conversaciones</p>
              <p className="text-sm">Las nuevas conversaciones aparecerán aquí</p>
            </div>
          ) : (
            <div className="p-4 space-y-2">
              {searchedCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className={`bg-whatsapp-panel rounded-lg p-4 hover:bg-whatsapp-hover transition cursor-pointer ${
                    selectedCustomer?.id === customer.id ? 'ring-2 ring-whatsapp-green' : ''
                  }`}
                  onClick={() => setSelectedCustomer(customer)}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={customer.avatar}
                      alt={customer.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-white font-medium">{customer.name}</h3>
                        {customer.lastMessageTime && (
                          <span className="text-xs text-gray-400">
                            {formatConversationTime(customer.lastMessageTime)}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{customer.phone}</p>
                      {customer.lastMessage && (
                        <p className="text-sm text-gray-300">
                          {truncateText(customer.lastMessage, 60)}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          {customer.unreadCount && customer.unreadCount > 0 && (
                            <span className="bg-whatsapp-green text-white text-xs font-bold px-2 py-1 rounded-full">
                              {customer.unreadCount} nuevo{customer.unreadCount > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                        <div className="relative group">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="px-3 py-1 bg-whatsapp-dark hover:bg-whatsapp-hover text-white text-xs rounded-lg transition flex items-center gap-1"
                          >
                            <ArrowRightLeft className="w-3 h-3" />
                            Transferir
                          </button>
                          {/* Transfer dropdown */}
                          <div className="absolute right-0 top-full mt-1 w-48 bg-whatsapp-panel border border-whatsapp-hover rounded-lg shadow-xl hidden group-hover:block z-10">
                            <div className="p-2 border-b border-whatsapp-hover">
                              <p className="text-xs text-gray-400">Transferir a:</p>
                            </div>
                            {agents
                              .filter((a) => a.id !== customer.assignedAgent && a.status !== 'offline')
                              .map((agent) => (
                                <button
                                  key={agent.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleTransferConversation(customer, agent);
                                  }}
                                  className="w-full p-2 hover:bg-whatsapp-hover text-left transition flex items-center gap-2"
                                >
                                  <img
                                    src={agent.avatar}
                                    alt={agent.name}
                                    className="w-6 h-6 rounded-full"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm text-white truncate">{agent.name}</p>
                                    <p className="text-xs text-gray-400">
                                      {agent.activeConversations} activas
                                    </p>
                                  </div>
                                </button>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar - Customer Details (when selected) */}
      {selectedCustomer && (
        <div className="w-80 bg-whatsapp-panel border-l border-whatsapp-hover p-4 overflow-y-auto custom-scrollbar">
          <h3 className="text-white font-semibold mb-4">Detalles del Cliente</h3>
          <div className="space-y-4">
            <div className="text-center">
              <img
                src={selectedCustomer.avatar}
                alt={selectedCustomer.name}
                className="w-24 h-24 rounded-full mx-auto mb-3"
              />
              <h4 className="text-white text-lg font-medium">{selectedCustomer.name}</h4>
              <p className="text-gray-400 text-sm">{selectedCustomer.phone}</p>
            </div>

            <div className="bg-whatsapp-dark rounded-lg p-3">
              <h5 className="text-gray-400 text-xs mb-2">Agente Asignado</h5>
              {selectedCustomer.assignedAgent && (
                <div className="flex items-center gap-2">
                  <img
                    src={agents.find((a) => a.id === selectedCustomer.assignedAgent)?.avatar}
                    alt="Agent"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-white text-sm">
                    {agents.find((a) => a.id === selectedCustomer.assignedAgent)?.name}
                  </span>
                </div>
              )}
            </div>

            <div className="bg-whatsapp-dark rounded-lg p-3">
              <h5 className="text-gray-400 text-xs mb-2">Estado</h5>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-whatsapp-green rounded-full"></div>
                <span className="text-white text-sm">Conversación Activa</span>
              </div>
            </div>

            {selectedCustomer.lastMessage && (
              <div className="bg-whatsapp-dark rounded-lg p-3">
                <h5 className="text-gray-400 text-xs mb-2">Último Mensaje</h5>
                <p className="text-white text-sm">{selectedCustomer.lastMessage}</p>
                {selectedCustomer.lastMessageTime && (
                  <p className="text-gray-400 text-xs mt-1">
                    {formatConversationTime(selectedCustomer.lastMessageTime)}
                  </p>
                )}
              </div>
            )}

            <button
              onClick={() => setShowConversation(true)}
              className="w-full bg-whatsapp-green hover:bg-whatsapp-green-dark text-white py-2 rounded-lg transition"
            >
              Ver Conversación Completa
            </button>
          </div>
        </div>
      )}

      {/* Statistics Modal */}
      {showStatistics && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-whatsapp-panel rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar">
            {/* Modal Header */}
            <div className="sticky top-0 bg-whatsapp-panel border-b border-whatsapp-hover p-4 flex items-center justify-between">
              <h2 className="text-white text-xl font-semibold flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-whatsapp-green" />
                Estadísticas del Sistema
              </h2>
              <button
                onClick={() => setShowStatistics(false)}
                className="p-2 hover:bg-whatsapp-hover rounded-full transition"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-whatsapp-dark rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 bg-whatsapp-green/20 rounded-lg">
                      <MessageSquare className="w-6 h-6 text-whatsapp-green" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className="text-gray-400 text-sm mb-1">Total Conversaciones</h3>
                  <p className="text-3xl font-bold text-white">{customers.length}</p>
                  <p className="text-xs text-green-500 mt-2">+12% esta semana</p>
                </div>

                <div className="bg-whatsapp-dark rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <Activity className="w-6 h-6 text-blue-500" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                  </div>
                  <h3 className="text-gray-400 text-sm mb-1">Conversaciones Activas</h3>
                  <p className="text-3xl font-bold text-white">
                    {agents.reduce((sum, a) => sum + a.activeConversations, 0)}
                  </p>
                  <p className="text-xs text-blue-500 mt-2">En tiempo real</p>
                </div>

                <div className="bg-whatsapp-dark rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 bg-yellow-500/20 rounded-lg">
                      <Clock className="w-6 h-6 text-yellow-500" />
                    </div>
                    <Activity className="w-5 h-5 text-yellow-500" />
                  </div>
                  <h3 className="text-gray-400 text-sm mb-1">Tiempo Promedio</h3>
                  <p className="text-3xl font-bold text-white">4.2m</p>
                  <p className="text-xs text-yellow-500 mt-2">Respuesta</p>
                </div>
              </div>

              {/* Agent Performance */}
              <div className="bg-whatsapp-dark rounded-lg p-6">
                <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-whatsapp-green" />
                  Rendimiento por Agente
                </h3>
                <div className="space-y-3">
                  {agents.map((agent) => (
                    <div key={agent.id} className="flex items-center gap-4">
                      <img
                        src={agent.avatar}
                        alt={agent.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white text-sm font-medium">{agent.name}</span>
                          <span className="text-gray-400 text-xs">
                            {agent.activeConversations} activas
                          </span>
                        </div>
                        <div className="w-full bg-whatsapp-hover rounded-full h-2">
                          <div
                            className="bg-whatsapp-green rounded-full h-2 transition-all"
                            style={{
                              width: `${Math.min(
                                (agent.activeConversations / 5) * 100,
                                100
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          agent.status
                        ).replace('bg-', 'bg-') + ' bg-opacity-20 text-white'}`}
                      >
                        {getStatusText(agent.status)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Today's Activity */}
              <div className="bg-whatsapp-dark rounded-lg p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Actividad de Hoy</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-whatsapp-green">
                      {customers.filter((c) => c.unreadCount && c.unreadCount > 0).length}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Pendientes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-500">
                      {Math.floor(Math.random() * 20) + 30}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Resueltas</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-yellow-500">
                      {Math.floor(Math.random() * 10) + 5}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Transferidas</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-500">98%</p>
                    <p className="text-sm text-gray-400 mt-1">Satisfacción</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conversation View Modal */}
      {showConversation && selectedCustomer && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-whatsapp-panel rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-whatsapp-panel border-b border-whatsapp-hover p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedCustomer.avatar}
                  alt={selectedCustomer.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h2 className="text-white text-lg font-semibold">{selectedCustomer.name}</h2>
                  <p className="text-sm text-gray-400">{selectedCustomer.phone}</p>
                </div>
              </div>
              <button
                onClick={() => setShowConversation(false)}
                className="p-2 hover:bg-whatsapp-hover rounded-full transition"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Conversation Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-whatsapp-bg">
              <div className="space-y-4">
                {/* System message */}
                <div className="flex justify-center">
                  <div className="bg-whatsapp-hover/50 text-gray-300 px-4 py-2 rounded-lg text-sm">
                    Conversación iniciada - {selectedCustomer.lastMessageTime && formatConversationTime(selectedCustomer.lastMessageTime)}
                  </div>
                </div>

                {/* Bot greeting */}
                <div className="flex justify-start">
                  <div className="bg-whatsapp-msg-received text-white rounded-lg px-4 py-2 max-w-[70%]">
                    <p className="text-sm">¡Hola! Bienvenido a nuestro servicio de asistencia automotriz. ¿En qué podemos ayudarte?</p>
                    <span className="text-xs text-gray-400 mt-1 block">10:23</span>
                  </div>
                </div>

                {/* Customer response */}
                <div className="flex justify-end">
                  <div className="bg-whatsapp-msg-sent text-white rounded-lg px-4 py-2 max-w-[70%]">
                    <p className="text-sm">{selectedCustomer.lastMessage}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-xs text-gray-400">10:24</span>
                      <MessageSquare className="w-3 h-3 text-blue-400" />
                    </div>
                  </div>
                </div>

                {/* Agent response */}
                <div className="flex justify-start">
                  <div className="bg-whatsapp-msg-received text-white rounded-lg px-4 py-2 max-w-[70%]">
                    <div className="flex items-center gap-2 mb-1 pb-1 border-b border-whatsapp-hover">
                      <div className="w-6 h-6 bg-whatsapp-green rounded-full flex items-center justify-center text-xs">
                        👤
                      </div>
                      <span className="text-xs text-whatsapp-green-light font-medium">
                        {agents.find((a) => a.id === selectedCustomer.assignedAgent)?.name}
                      </span>
                    </div>
                    <p className="text-sm">
                      Perfecto, he revisado tu solicitud. Déjame ayudarte con eso.
                      Te haré algunas preguntas para procesar tu caso correctamente.
                    </p>
                    <span className="text-xs text-gray-400 mt-1 block">10:25</span>
                  </div>
                </div>

                {/* More messages */}
                <div className="flex justify-end">
                  <div className="bg-whatsapp-msg-sent text-white rounded-lg px-4 py-2 max-w-[70%]">
                    <p className="text-sm">Perfecto, estoy disponible</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-xs text-gray-400">10:26</span>
                      <MessageSquare className="w-3 h-3 text-blue-400" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="bg-whatsapp-hover/50 text-gray-300 px-4 py-2 rounded-lg text-sm">
                    Conversación activa
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with action buttons */}
            <div className="bg-whatsapp-panel border-t border-whatsapp-hover p-4 flex gap-2">
              <button
                onClick={() => {
                  // Export conversation as text file
                  const conversationText = `
Conversación con ${selectedCustomer.name}
Teléfono: ${selectedCustomer.phone}
Agente: ${agents.find((a) => a.id === selectedCustomer.assignedAgent)?.name}
Fecha: ${selectedCustomer.lastMessageTime ? formatConversationTime(selectedCustomer.lastMessageTime) : 'N/A'}

=== CONVERSACIÓN ===

[Bot] ¡Hola! Bienvenido a nuestro servicio de asistencia automotriz. ¿En qué podemos ayudarte?

[${selectedCustomer.name}] ${selectedCustomer.lastMessage}

[${agents.find((a) => a.id === selectedCustomer.assignedAgent)?.name}] Perfecto, he revisado tu solicitud. Déjame ayudarte con eso. Te haré algunas preguntas para procesar tu caso correctamente.

[${selectedCustomer.name}] Perfecto, estoy disponible

=== FIN DE CONVERSACIÓN ===
                  `.trim();

                  const blob = new Blob([conversationText], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `conversacion_${selectedCustomer.name.replace(/\s+/g, '_')}_${Date.now()}.txt`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);

                  // Show success notification
                  alert('✅ Conversación exportada exitosamente');
                }}
                className="flex-1 bg-whatsapp-dark hover:bg-whatsapp-hover text-white py-2 rounded-lg transition"
              >
                Exportar Conversación
              </button>
              <button
                onClick={() => {
                  setShowConversation(false);
                  // Simulate opening chat - in a real app, this would navigate to chat view
                  setTimeout(() => {
                    alert(`💬 Abriendo conversación con ${selectedCustomer.name}...\n\nEn producción, esto abriría la interfaz de chat para continuar la conversación.`);
                  }, 300);
                }}
                className="flex-1 bg-whatsapp-green hover:bg-whatsapp-green-dark text-white py-2 rounded-lg transition"
              >
                Continuar Conversación
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentDashboard;
