import { pgTable, serial, text, varchar, json } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const storyData = pgTable("storyData", {
	id: serial().primaryKey().notNull(),
	storySubject: text(),
	storyType: varchar(),
	ageGroup: varchar(),
	imageStyle: varchar(),
	output: json(),
	coverImage: varchar(),
	storyId: varchar(),
});
