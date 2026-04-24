import type { Agent } from '../shared/types/agents.types';

interface Props {
  agents: Agent[];
}

function AgentsTable({ agents }: Props) {
  return (
    <table className="agents-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {agents?.map((agent) => (
          <tr key={agent.id}>
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
