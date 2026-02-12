import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ChatInterface from './components/ChatInterface';
import AgentDashboard from './components/AgentDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatInterface />} />
        <Route path="/dashboard" element={<AgentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
