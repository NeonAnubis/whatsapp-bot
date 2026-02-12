import { Link } from 'react-router-dom';
import { MessageSquare, Users, Zap, CheckCircle, ArrowRight } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Embudo Automatizado',
      description: 'Bot inteligente que recopila información antes de transferir a un agente',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Multi-Agente',
      description: 'Panel para gestionar múltiples agentes y asignar conversaciones',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Transferencia Inteligente',
      description: 'Transferencia automática con todo el contexto recopilado',
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Datos Estructurados',
      description: 'Recopilación organizada de información del cliente',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-whatsapp-bg via-whatsapp-dark to-whatsapp-panel flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-whatsapp-green p-4 rounded-3xl shadow-2xl">
              <MessageSquare className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            WhatsApp Bot
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Sistema de Automatización con Embudo y Soporte Multi-Agente
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-whatsapp-panel px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-300">Sistema Activo - Demo Funcional</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-whatsapp-panel p-6 rounded-xl hover:bg-whatsapp-hover transition-all duration-300 hover:scale-[1.02] animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-whatsapp-green/20 p-3 rounded-lg text-whatsapp-green">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Buttons */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Customer View */}
          <Link
            to="/chat"
            className="group bg-whatsapp-panel hover:bg-whatsapp-hover p-8 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border-2 border-transparent hover:border-whatsapp-green"
          >
            <div className="text-center">
              <div className="bg-whatsapp-green/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-10 h-10 text-whatsapp-green" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Vista Cliente</h2>
              <p className="text-gray-400 mb-4">
                Experimenta el embudo automatizado desde la perspectiva del cliente
              </p>
              <div className="flex items-center justify-center gap-2 text-whatsapp-green font-medium">
                Iniciar Chat
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Agent View */}
          <Link
            to="/dashboard"
            className="group bg-whatsapp-panel hover:bg-whatsapp-hover p-8 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border-2 border-transparent hover:border-whatsapp-green"
          >
            <div className="text-center">
              <div className="bg-whatsapp-green/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-10 h-10 text-whatsapp-green" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Panel de Agentes</h2>
              <p className="text-gray-400 mb-4">
                Gestiona conversaciones, asigna agentes y transfiere casos
              </p>
              <div className="flex items-center justify-center gap-2 text-whatsapp-green font-medium">
                Ver Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>

        {/* Info Banner */}
        <div className="mt-12 bg-whatsapp-green/10 border border-whatsapp-green/30 rounded-xl p-6 text-center">
          <p className="text-gray-300 text-sm leading-relaxed">
            💡 <span className="font-semibold">Nota:</span> Esta es una demostración completamente funcional con datos simulados.
            En producción, se conectaría a la API oficial de WhatsApp Business y a tu base de datos.
          </p>
        </div>

        
      </div>
    </div>
  );
};

export default Home;
