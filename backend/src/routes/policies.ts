import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /policies — list all policies
router.get('/', async (req, res) => {
  try {
    const { status, type } = req.query;

    const where: any = {};
    if (status) where.status = status;
    if (type) where.type = type;

    const policies = await prisma.policy.findMany({ where });

    // Add agent name to each policy
    const results = [];
    for (const policy of policies) {
      const agent = await prisma.agent.findUnique({
        where: { id: policy.agentId }
      });
      results.push({
        ...policy,
        agentName: agent?.name || 'Unknown'
      });
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch policies' });
  }
});

// GET /policies/expiring — get policies expiring soon
router.get('/expiring', async (req, res) => {
  const now = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

  const policies = await prisma.policy.findMany({
    where: {
      status: 'active',
      endDate: {
        gte: now,
        lte: thirtyDaysFromNow
      }
    }
  });

  const results = [];
  for (const policy of policies) {
    const agent = await prisma.agent.findUnique({
      where: { id: policy.agentId }
    });
    results.push({
      ...policy,
      agentName: agent?.name || 'Unknown'
    });
  }

  res.json(results);
});

// GET /policies/:id — get single policy
router.get('/:id', async (req, res) => {
  const policy = await prisma.policy.findUniqueOrThrow({
    where: { id: Number(req.params.id) }
  });
  const agent = await prisma.agent.findUnique({
    where: { id: policy.agentId }
  });
  res.json({ ...policy, agentName: agent?.name || 'Unknown' });
});

// POST /policies — create new policy
router.post('/', async (req, res) => {
  try {
    const policy = await prisma.policy.create({
      data: req.body
    });
    res.status(201).json(policy);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
