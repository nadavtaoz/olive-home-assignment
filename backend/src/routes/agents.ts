import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { AgentPoliciesQuerySchema } from '../schemas';

const router = Router();
const prisma = new PrismaClient();

// GET /agents
router.get('/', async (_req, res) => {
  try {
    const agents = await prisma.agent.findMany();
    res.json(agents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch agents' });
  }
});

// GET /agents/:agentId/policies
router.get('/:agentId/policies', async (req, res) => {
  const parsed = AgentPoliciesQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues });
  }

  const { agentId } = req.params;
  const { size, offset, sortBy, sort, status, type } = parsed.data;

  const where: Record<string, unknown> = { agentId };
  if (status) where.status = status;
  if (type) where.type = type;

  try {
    const [policies, total] = await Promise.all([
      prisma.policy.findMany({ where, skip: offset, take: size, orderBy: { [sortBy]: sort } }),
      prisma.policy.count({ where }),
    ]);

    res.json({ data: policies, total, size, offset });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch agent policies' });
  }
});

export default router;
