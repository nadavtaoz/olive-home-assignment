import { z } from 'zod';

const PolicyStatusEnum = z.enum(['active', 'expired', 'cancelled']);

export const AgentPoliciesQuerySchema = z.object({
  size: z.coerce.number().int().positive().default(20),
  offset: z.coerce.number().int().min(0).default(0),
  sortBy: z
    .enum(['endDate', 'startDate', 'premium', 'policyNumber', 'holderName', 'type', 'status'])
    .default('startDate'),
  sort: z.enum(['asc', 'desc']).default('asc'),
  status: z.union([PolicyStatusEnum, z.array(PolicyStatusEnum)]).optional(),
  type: z.enum(['life', 'health', 'pension', 'savings']).optional(),
});