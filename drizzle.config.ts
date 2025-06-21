import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: "./config/schema.tsx",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_8ckGzw0JZQrt@ep-broad-sunset-a5zzgbt7-pooler.us-east-2.aws.neon.tech/sdp?sslmode=require',
  },
  verbose: true,
  strict: true,
})