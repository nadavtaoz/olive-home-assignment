export type PolicyType = 'life' | 'health' | 'pension' | 'savings';
export type PolicyStatus = 'active' | 'expired' | 'cancelled';

export interface Policy {
  id: number;
  policyNumber: string;
  holderName: string;
  insurerName: string;
  type: PolicyType;
  status: PolicyStatus;
  premium: number;
  startDate: string;
  endDate: string;
  agentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AgentPoliciesResponse {
  data: Policy[];
  total: number;
  size: number;
  offset: number;
}
