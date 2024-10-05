import { PrismaClient } from "@prisma/client";

// @ts-expect-error: Import is not a TypeScript module
import { env } from "./env/server.mjs";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error", "warn"],
  });

if (typeof env.NODE_ENV !== "undefined" && env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
