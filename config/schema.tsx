import { sql } from "drizzle-orm";
import { integer, json, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const StoryData=pgTable('storyData',{
    id:serial('id').primaryKey(),
    storyId:varchar('storyId'),
    storySubject:text('storySubject'),
    storyType:varchar('storyType'),
    ageGroup:varchar('ageGroup'),
    imageStyle:varchar('imageStyle'),
    output:json('output'),
     imageBase64: text('imageBase64').default(sql`NULL`),
    userEmail:varchar('userEmail'),
    userName:varchar('userName')

})
export const Users=pgTable('users',{
    id:serial('id').primaryKey(),
    userName:varchar('userName'),
    userEmail:varchar('userEmail'),
    credit:integer('credits').default(3)
})