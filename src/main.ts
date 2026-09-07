import { createServer } from "./server";
import { env } from "./config/env";
import { printEnvironmentVariables } from "./util/env-printer";
import { prisma } from "./infraestructure/database/prisma";
import { logger } from "./infraestructure/logger/logger";

async function bootstrap() {
  const app = createServer();

  const port = env.port;

  try {
    await prisma.$connect();

    logger.info("✅ Prisma connected to PostgreSQL");

    const server = app.listen(port, () => {
      console.log(`🚀 ${env.appName} v${env.appVersion}`);
      console.log(`🌎 Environment: ${env.nodeEnv}`);
      console.log(`📡 Running on port ${port}`);

      if (env.showEnv) {
        printEnvironmentVariables();
      }
    });

    const shutdown = async () => {
      logger.info("🛑 Shutting down gracefully...");

      server.close(async () => {
        await prisma.$disconnect();
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    logger.error("❌ Database connection failed", error);

    await prisma.$disconnect();

    process.exit(1);
  }
}

bootstrap();
