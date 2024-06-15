// Prisma Orm Imports To Work With CockroachDb
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = prisma;
