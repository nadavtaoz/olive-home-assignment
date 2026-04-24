import { useEffect, useState } from 'react';
import { getAgentPolicies } from '../services/agents-service';
import type { Agent, Policy, PolicyStatus } from '../types';

interface UseGetPoliciesOptions {
  agent: Agent | null;
  status: PolicyStatus | PolicyStatus[];
  pageSize: number;
}

export function useGetPolicies({ agent, status, pageSize }: UseGetPoliciesOptions) {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setOffset(0);
  }, [agent]);

  useEffect(() => {
    if (!agent) return;
    getAgentPolicies(agent.id, {
      size: pageSize,
      offset,
      sortBy: 'endDate',
      sort: 'asc',
      status,
    })
      .then((res) => {
        setPolicies(res.data);
        setTotal(res.total);
        setError(null);
      })
      .catch(() => setError('Failed to load policies'));
  }, [agent, offset, pageSize, status]);

  return { policies, total, offset, setOffset, error };
}
