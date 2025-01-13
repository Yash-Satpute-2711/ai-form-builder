import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./configs/schema.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url:'postgresql://AI-From-Builder_owner:1reoPg0fjaQl@ep-polished-violet-a5di5iec.us-east-2.aws.neon.tech/AI-From-Builder?sslmode=require',
  },
});
