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

  const [activePolicies, setActivePolicies] = useState<Policy[]>([]);
  const [activeTotal, setActiveTotal] = useState(0);
  const [activeOffset, setActiveOffset] = useState(0);

  const [inactivePolicies, setInactivePolicies] = useState<Policy[]>([]);
  const [inactiveTotal, setInactiveTotal] = useState(0);
  const [inactiveOffset, setInactiveOffset] = useState(0);

  useEffect(() => {
    getAllAgents().then(setAgents).catch(() => setError('Failed to load agents'));
  }, []);

  useEffect(() => {
    if (!selectedAgent) return;
    getAgentPolicies(selectedAgent.id, {
      size: PAGE_SIZE,
      offset: activeOffset,
      sortBy: 'endDate',
      sort: 'asc',
      status: 'active',
    })
      .then((res) => {
        setActivePolicies(res.data);
        setActiveTotal(res.total);
      })
      .catch(() => setError('Failed to load active policies'));
  }, [selectedAgent, activeOffset]);

  useEffect(() => {
    if (!selectedAgent) return;
    getAgentPolicies(selectedAgent.id, {
      size: PAGE_SIZE,
      offset: inactiveOffset,
      sortBy: 'endDate',
      sort: 'asc',
      status: ['expired', 'cancelled'],
    })
      .then((res) => {
        setInactivePolicies(res.data);
        setInactiveTotal(res.total);
      })
      .catch(() => setError('Failed to load non-active policies'));
  }, [selectedAgent, inactiveOffset]);

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setActiveOffset(0);
    setInactiveOffset(0);
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
                  <h2>Active Policies for {selectedAgent.name}</h2>
                  <PoliciesTable
                    key={`${selectedAgent.id}-active`}
                    policies={activePolicies}
                    total={activeTotal}
                    pageSize={PAGE_SIZE}
                    onPageChange={setActiveOffset}
                  />
                  <h2>Non-Active Policies for {selectedAgent.name}</h2>
                  <PoliciesTable
                    key={`${selectedAgent.id}-inactive`}
                    policies={inactivePolicies}
                    total={inactiveTotal}
                    pageSize={PAGE_SIZE}
                    onPageChange={setInactiveOffset}
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
