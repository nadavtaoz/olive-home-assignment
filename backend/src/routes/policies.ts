import { Router } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import { CreatePolicySchema } from '../schemas/policies.schema';

const router = Router();
const prisma = new PrismaClient();

// GET /policies — list all policies
router.get('/', async (req, res) => {
  try {
    const { status, type } = req.query;

    const where: any = {};
    if (status) where.status = status;
    if (type) where.type = type;

    const policies = await prisma.policy.findMany({ where, include: { agent: true } });
    const results = policies.map(({ agent, ...policy }) => ({
      ...policy,
      agentName: agent?.name || 'Unknown'
    }));

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch policies' });
  }
});

// GET /policies/expiring — get policies expiring soon
router.get('/expiring', async (req, res) => {
  try {
    const now = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    const policies = await prisma.policy.findMany({
      where: {
        status: 'active',
        endDate: { gte: now, lte: thirtyDaysFromNow }
      },
      include: { agent: true }
    });

    const results = policies.map(({ agent, ...policy }) => ({
      ...policy,
      agentName: agent?.name || 'Unknown'
    }));

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch expiring policies' });
  }
});

// GET /policies/:id — get single policy
router.get('/:id', async (req, res) => {
  try {
    const { agent, ...policy } = await prisma.policy.findUniqueOrThrow({
      where: { id: Number(req.params.id) },
      include: { agent: true }
    });
    res.json({ ...policy, agentName: agent?.name || 'Unknown' });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ error: 'Policy not found' });
    }
    res.status(500).json({ error: 'Failed to fetch policy' });
  }
});

// POST /policies — create new policy
router.post('/', async (req, res) => {
  const parsed = CreatePolicySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues });
  }
  try {
    const policy = await prisma.policy.create({ data: parsed.data });
    res.status(201).json(policy);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
