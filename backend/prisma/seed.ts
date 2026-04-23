import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function daysFromNow(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(0, 0, 0, 0);
  return date;
}

function daysAgo(days: number): Date {
  return daysFromNow(-days);
}

async function main() {
  await prisma.policy.deleteMany();
  await prisma.agent.deleteMany();

  const agents = await Promise.all([
    prisma.agent.create({
      data: { id: 'agent-1', name: 'Yael Cohen', email: 'yael@agency.co.il' },
    }),
    prisma.agent.create({
      data: { id: 'agent-2', name: 'Oren Levi', email: 'oren@agency.co.il' },
    }),
    prisma.agent.create({
      data: { id: 'agent-3', name: 'Dana Peretz', email: 'dana@agency.co.il' },
    }),
  ]);

  const policies = [
    // Active — expiring within 30 days (urgent)
    { policyNumber: 'POL-1001', holderName: 'Moshe Avraham',   insurerName: 'Migdal',  type: 'life',    status: 'active',    premium: 450,  startDate: daysAgo(350),  endDate: daysFromNow(7),   agentId: 'agent-1' },
    { policyNumber: 'POL-1002', holderName: 'Sarah Mizrahi',   insurerName: 'Harel',   type: 'health',  status: 'active',    premium: 320,  startDate: daysAgo(340),  endDate: daysFromNow(14),  agentId: 'agent-1' },
    { policyNumber: 'POL-1003', holderName: 'David Katz',      insurerName: 'Clal',    type: 'pension', status: 'active',    premium: 1800, startDate: daysAgo(700),  endDate: daysFromNow(22),  agentId: 'agent-2' },
    { policyNumber: 'POL-1004', holderName: 'Rivka Ben-David', insurerName: 'Phoenix', type: 'savings', status: 'active',    premium: 2500, startDate: daysAgo(360),  endDate: daysFromNow(28),  agentId: 'agent-3' },

    // Active — not expiring soon
    { policyNumber: 'POL-1005', holderName: 'Avi Goldstein',   insurerName: 'Menora',  type: 'life',    status: 'active',    premium: 600,  startDate: daysAgo(200),  endDate: daysFromNow(165), agentId: 'agent-1' },
    { policyNumber: 'POL-1006', holderName: 'Noa Shapira',     insurerName: 'Migdal',  type: 'health',  status: 'active',    premium: 280,  startDate: daysAgo(100),  endDate: daysFromNow(265), agentId: 'agent-2' },
    { policyNumber: 'POL-1007', holderName: 'Eitan Rosen',     insurerName: 'Harel',   type: 'pension', status: 'active',    premium: 2200, startDate: daysAgo(500),  endDate: daysFromNow(230), agentId: 'agent-2' },
    { policyNumber: 'POL-1008', holderName: 'Tamar Friedman',  insurerName: 'Clal',    type: 'savings', status: 'active',    premium: 1500, startDate: daysAgo(180),  endDate: daysFromNow(185), agentId: 'agent-3' },
    { policyNumber: 'POL-1009', holderName: 'Yossi Hadad',     insurerName: 'Phoenix', type: 'life',    status: 'active',    premium: 350,  startDate: daysAgo(90),   endDate: daysFromNow(275), agentId: 'agent-1' },
    { policyNumber: 'POL-1010', holderName: 'Michal Alon',     insurerName: 'Menora',  type: 'health',  status: 'active',    premium: 420,  startDate: daysAgo(150),  endDate: daysFromNow(215), agentId: 'agent-3' },
    { policyNumber: 'POL-1011', holderName: 'Ran Biton',       insurerName: 'Migdal',  type: 'pension', status: 'active',    premium: 3000, startDate: daysAgo(400),  endDate: daysFromNow(330), agentId: 'agent-2' },
    { policyNumber: 'POL-1012', holderName: 'Liora Dayan',     insurerName: 'Harel',   type: 'savings', status: 'active',    premium: 800,  startDate: daysAgo(60),   endDate: daysFromNow(305), agentId: 'agent-1' },

    // Expired
    { policyNumber: 'POL-1013', holderName: 'Gadi Stern',      insurerName: 'Clal',    type: 'life',    status: 'expired',   premium: 500,  startDate: daysAgo(730),  endDate: daysAgo(30),  agentId: 'agent-2' },
    { policyNumber: 'POL-1014', holderName: 'Shira Ohayon',    insurerName: 'Phoenix', type: 'health',  status: 'expired',   premium: 290,  startDate: daysAgo(500),  endDate: daysAgo(60),  agentId: 'agent-3' },
    { policyNumber: 'POL-1015', holderName: 'Amir Navon',      insurerName: 'Menora',  type: 'pension', status: 'expired',   premium: 1900, startDate: daysAgo(800),  endDate: daysAgo(90),  agentId: 'agent-1' },
    { policyNumber: 'POL-1016', holderName: 'Hila Zohar',      insurerName: 'Migdal',  type: 'savings', status: 'expired',   premium: 1100, startDate: daysAgo(600),  endDate: daysAgo(15),  agentId: 'agent-2' },
    { policyNumber: 'POL-1017', holderName: 'Ori Maman',       insurerName: 'Harel',   type: 'life',    status: 'expired',   premium: 700,  startDate: daysAgo(450),  endDate: daysAgo(45),  agentId: 'agent-3' },

    // Cancelled
    { policyNumber: 'POL-1018', holderName: 'Liat Barak',      insurerName: 'Clal',    type: 'health',  status: 'cancelled', premium: 350,  startDate: daysAgo(300),  endDate: daysAgo(100), agentId: 'agent-1' },
    { policyNumber: 'POL-1019', holderName: 'Tomer Golan',     insurerName: 'Phoenix', type: 'pension', status: 'cancelled', premium: 2800, startDate: daysAgo(400),  endDate: daysAgo(50),  agentId: 'agent-2' },
    { policyNumber: 'POL-1020', holderName: 'Maya Segal',      insurerName: 'Menora',  type: 'savings', status: 'cancelled', premium: 200,  startDate: daysAgo(150),  endDate: daysAgo(20),  agentId: 'agent-3' },
  ];

  for (const policy of policies) {
    await prisma.policy.create({ data: policy });
  }

  console.log(`Seeded ${agents.length} agents and ${policies.length} policies.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
