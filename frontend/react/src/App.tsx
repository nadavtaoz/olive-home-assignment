import { useEffect, useState } from 'react';
import { AgentsTable, PoliciesTable } from './components';
import { getAllAgents } from './shared/services/agents-service';
import { useGetPolicies } from './shared/hooks/useGetPolicies';
import type { Agent, PolicyStatus } from './shared/types';

const PAGE_SIZE = 20;
const INACTIVE_STATUSES: PolicyStatus[] = ['expired', 'cancelled'];

function App() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [agentsError, setAgentsError] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const active = useGetPolicies({
    agent: selectedAgent,
    status: 'active',
    pageSize: PAGE_SIZE,
  });

  const inactive = useGetPolicies({
    agent: selectedAgent,
    status: INACTIVE_STATUSES,
    pageSize: PAGE_SIZE,
  });

  useEffect(() => {
    getAllAgents().then(setAgents).catch(() => setAgentsError('Failed to load agents'));
  }, []);

  const error = agentsError || active.error || inactive.error;

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
              <AgentsTable agents={agents} onAgentClick={setSelectedAgent} />
              {selectedAgent && (
                <div>
                  <h2>Active Policies for {selectedAgent.name}</h2>
                  <PoliciesTable
                    key={`${selectedAgent.id}-active`}
                    policies={active.policies}
                    total={active.total}
                    offset={active.offset}
                    pageSize={PAGE_SIZE}
                    onPageChange={active.setOffset}
                  />
                  <h2>Non-Active Policies for {selectedAgent.name}</h2>
                  <PoliciesTable
                    key={`${selectedAgent.id}-inactive`}
                    policies={inactive.policies}
                    total={inactive.total}
                    offset={inactive.offset}
                    pageSize={PAGE_SIZE}
                    onPageChange={inactive.setOffset}
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
