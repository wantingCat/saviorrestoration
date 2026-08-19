const { PrismaClient } = require('@prisma/client');
const { PrismaLibSQL } = require('@prisma/adapter-libsql');
const { createClient } = require('@libsql/client');
const bcrypt = require('bcryptjs');
const path = require('path');

const dbUrl = process.env.TURSO_DATABASE_URL || `file:${path.join(__dirname, 'dev.db')}`;
const authToken = process.env.TURSO_AUTH_TOKEN;

const client = createClient({
  url: dbUrl,
  ...(authToken ? { authToken } : {}),
});

const adapter = new PrismaLibSQL(client);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await prisma.admin.upsert({
    where: { email: 'admin@saviorrestoration.com' },
    update: {},
    create: {
      email: 'admin@saviorrestoration.com',
      password: hashedPassword,
      name: 'Admin',
    },
  });

  console.log('✓ Admin user created:');
  console.log('  Email: admin@saviorrestoration.com');
  console.log('  Password: admin123');

  // Create default site settings
  await prisma.siteSettings.upsert({
    where: { id: 'main' },
    update: {},
    create: {
      id: 'main',
      phone: '(437) 555-1234',
      email: 'info@saviorrestoration.com',
      address: 'Greater Toronto Area, Ontario',
      businessName: 'Savior Restoration',
      tagline: "When disaster strikes. We're already on the way.",
    },
  });

  console.log('✓ Default site settings created');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
