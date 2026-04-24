import type { Agent } from '../shared/types/agents.types';

interface Props {
  agents: Agent[];
  onAgentClick: (agent: Agent) => void;
}

function AgentsTable({ agents, onAgentClick }: Props) {
  return (
    <table className="data-table clickable">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {agents?.map((agent) => (
          <tr key={agent.id} onClick={() => onAgentClick(agent)}>
            <td>{agent.id}</td>
            <td>{agent.name}</td>
            <td>{agent.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AgentsTable;
