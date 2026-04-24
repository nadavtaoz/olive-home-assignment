import { z } from 'zod';

export const AgentPoliciesQuerySchema = z.object({
  size: z.coerce.number().int().positive().default(20),
  offset: z.coerce.number().int().min(0).default(0),
  sortBy: z
    .enum(['endDate', 'startDate', 'premium', 'policyNumber', 'holderName', 'type', 'status'])
    .default('startDate'),
  sort: z.enum(['asc', 'desc']).default('asc'),
  status: z.enum(['active', 'expired', 'cancelled']).optional(),
  type: z.enum(['life', 'health', 'pension', 'savings']).optional(),
});