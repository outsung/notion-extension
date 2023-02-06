import { notionModelCreate } from "@/notions";

export const wordNotionModel = notionModelCreate({
  title: "word",
  databaseId: "3a6c9b0c5c2f4010996420a4412e94c7",
  field: {
    영어: "title",
    한국어: "rich_text",
    틀린횟수: "rich_text",
    외움: "select",
  },
});
