// prisma client to be used among all required instances of prisma clients
// - removes multiple instances of prisma client that owuld slow down application
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

module.exports = prisma;
