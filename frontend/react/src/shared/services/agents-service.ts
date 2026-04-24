import type { Agent } from '../types/agents.types';
import type { AgentPoliciesResponse, PolicyStatus } from '../types/policies.types';

export async function getAllAgents(): Promise<Agent[]> {
  const res = await fetch('/agents');
  if (!res.ok) throw new Error('Failed to fetch agents');
  return res.json();
}

export interface GetAgentPoliciesParams {
  size: number;
  offset: number;
  sortBy?: 'endDate' | 'startDate' | 'premium' | 'policyNumber' | 'holderName' | 'type' | 'status';
  sort?: 'asc' | 'desc';
  status?: PolicyStatus | PolicyStatus[];
}

export async function getAgentPolicies(agentId: string, params: GetAgentPoliciesParams): Promise<AgentPoliciesResponse> {
  const { sortBy, sort, size, offset, status } = params
  const search = new URLSearchParams();
  search.set('size', String(size));
  search.set('offset', String(offset));
  if (sortBy) search.set('sortBy', sortBy);
  if (sort) search.set('sort', sort);
  if (status) {
    const statuses = Array.isArray(status) ? status : [status];
    statuses.forEach((s) => search.append('status', s));
  }

  const res = await fetch(`/agents/${agentId}/policies?${search.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch agent policies');
  return res.json();
}
