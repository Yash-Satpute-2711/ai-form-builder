import { int } from "drizzle-orm/mysql-core";
import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const JsonForms = pgTable("JsonForms", {
  id: serial("id").primaryKey(),
  jsonfrom: text("jsonfrom").notNull(),
  theme: varchar("theme"),
  background: varchar("background"),
  // style: varchar("style"),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
});

export const userResponse = pgTable("userResponse", {
  id: serial("id").primaryKey(),
  jsonResponse: text("jsonResponse").notNull(),
  createdBy: varchar("createdBy").default("anonymous"),
  createdAt: varchar("createdAt").notNull(),
  formRef: integer("formRef").references(()=>JsonForms.id),
});
