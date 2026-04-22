// prisma client to be used among all required instances of prisma clients
// - removes multiple instances of prisma client that would slow down application
import { PrismaClient } from "../generated/prisma/index.js";
import { PrismaPg } from "@prisma/adapter-pg";

// Ensure DATABASE_URL is typed as a string
const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({
  connectionString,
});

// Export a typed Prisma client instance
export const prisma = new PrismaClient({ adapter });
