import { z } from 'zod';

export const CreatePolicySchema = z.object({
  policyNumber: z.string().min(1),
  holderName: z.string().min(1),
  insurerName: z.string().min(1),
  type: z.enum(['life', 'health', 'pension', 'savings']),
  status: z.enum(['active', 'expired', 'cancelled']),
  premium: z.number().positive(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  agentId: z.string().min(1),
});