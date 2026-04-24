import { useEffect, useState } from 'react';
import AgentsTable from './components/AgentsTable';
import { getAllAgents } from './shared/services/agents-service';
import type { Agent } from './shared/types/agents.types';

function App() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllAgents().then(setAgents).catch(() => setError('Failed to load agents'));
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>Insurance Manager</h1>
      </header>
      <main className="main">
          {
            error ? <p>{error}</p> :
            <div>
              <h2>Choose an agent</h2>
              <AgentsTable agents={agents} />
            </div> 
          }
      </main>
    </div>
  );
}

export default App;
