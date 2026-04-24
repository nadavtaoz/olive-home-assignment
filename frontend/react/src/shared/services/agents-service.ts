import type { Agent } from '../types/agents.types';

export async function getAllAgents(): Promise<Agent[]> {
  const res = await fetch('/agents');
  if (!res.ok) throw new Error('Failed to fetch agents');
  return res.json();
}
