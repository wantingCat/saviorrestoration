const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.join(__dirname, 'dev.db');
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
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
