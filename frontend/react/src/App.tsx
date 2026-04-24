import { useEffect, useState } from 'react';
import AgentsTable from './components/AgentsTable';
import PoliciesTable from './components/PoliciesTable';
import { getAllAgents, getAgentPolicies } from './shared/services/agents-service';
import type { Agent } from './shared/types/agents.types';
import type { Policy } from './shared/types/policies.types';

const PAGE_SIZE = 20;

function App() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    getAllAgents().then(setAgents).catch(() => setError('Failed to load agents'));
  }, []);

  useEffect(() => {
    if (!selectedAgent) return;
    getAgentPolicies(selectedAgent.id, {
      size: PAGE_SIZE,
      offset,
      sortBy: 'endDate',
      sort: 'asc',
    })
      .then((res) => {
        setPolicies(res.data);
        setTotal(res.total);
      })
      .catch(() => setError('Failed to load policies'));
  }, [selectedAgent, offset]);

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setOffset(0);
  };

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
              <AgentsTable agents={agents} onAgentClick={handleAgentClick} />
              {selectedAgent && (
                <div>
                  <h2>Policies for {selectedAgent.name}</h2>
                  <PoliciesTable
                    key={selectedAgent.id}
                    policies={policies}
                    total={total}
                    pageSize={PAGE_SIZE}
                    onPageChange={setOffset}
                  />
                </div>
              )}
            </div>
          }
      </main>
    </div>
  );
}

export default App;
