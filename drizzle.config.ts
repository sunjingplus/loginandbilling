
export default {
  schema: "./db/schema.ts",
  out: './migrations',
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;

import { Config } from 'drizzle-kit';
