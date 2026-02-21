import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { categories } from "./data/categories";
import { products } from "./data/products";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({
  adapter,
  log: ["query", "info", "warn", "error"],
});

async function main() {
    try {
        // Usar skipDuplicates para evitar duplicados
        await prisma.category.createMany({
            data: categories,
            skipDuplicates: true
        })
        await prisma.product.createMany({
            data: products,
            skipDuplicates: true
        })
    } catch (error) {
        console.log(error)
    }
}

main()
    .then( async () => {
        await prisma.$disconnect()
    })
    .catch( async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
