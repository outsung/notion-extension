import { notionModelCreate } from "@/notions";

export const wordNotionModel = notionModelCreate({
  title: "word",
  databaseId: "99a3b579e98e48fbba870079644afa73",
  field: {
    영어: "title",
    한국어: "rich_text",
    틀린횟수: "rich_text",
    외움: "select",
  },
});
