import {
  RichTextItemResponse,
  SelectPropertyItemObjectResponse,
  QueryDatabaseResponse as Res,
} from "@notionhq/client/build/src/api-endpoints";

type SelectPropertyResponse = NonNullable<
  SelectPropertyItemObjectResponse["select"]
>;

type Results = Res["results"][number];
type PropertiesHelper<T> = T extends { properties: Record<string, infer A> }
  ? A
  : never;
type Properties = PropertiesHelper<Results>;

export type FieldTypeUnion =
  | "rich_text"
  | "title"
  | "select"
  | "multi_select"
  | "files";
export type FieldType<T extends FieldTypeUnion> = FieldTypeObject extends {
  [key in T]: any;
}
  ? FieldTypeObject[T] extends Properties
    ? FieldTypeObject[T]
    : never
  : never;

export type FieldTypeObject = {
  rich_text: {
    type: "rich_text";
    rich_text: Array<RichTextItemResponse>;
    id: string;
  };
  title: {
    type: "title";
    title: Array<RichTextItemResponse>;
    id: string;
  };
  select: {
    type: "select";
    select: SelectPropertyResponse;
    id: string;
  };
  multi_select: {
    type: "multi_select";
    multi_select: SelectPropertyResponse[];
    id: string;
  };
  files: {
    type: "files";
    files: Array<
      | {
          file: { url: string; expiry_time: string };
          name: string;
          type?: "file";
        }
      | { external: { url: string }; name: string; type?: "external" }
    >;
    id: string;
  };
};
