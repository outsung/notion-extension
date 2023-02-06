import { ValueOf } from "@/types/common";
import {
  GetPageResponse,
  PageObjectResponse,
  QueryDatabaseParameters,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { FieldType, FieldTypeObject, FieldTypeUnion } from "./notion.type";
import { notionClient } from "./notionClient";

interface NotionModelCreateProps<K extends string> {
  title: string;
  databaseId: string;
  field: Record<K, FieldTypeUnion>;
}
export function notionModelCreate<
  F extends string,
  FN extends Record<F | "_id", string>
>(args: NotionModelCreateProps<F>): Model<F, FN> {
  return new Model<F, FN>(args);
}

function FieldTypeNormalizing(res: ValueOf<FieldTypeObject>) {
  try {
    const defineFieldTypeNormalizing = Object.keys(FieldTypeNormalizingObject);
    if (!defineFieldTypeNormalizing.includes(res.type)) {
      console.log("undefined FieldTypeNormalizing");
      return "";
    }

    return FieldTypeNormalizingObject[res.type](res as any);
  } catch (error) {
    console.log(error);
  }
}
const FieldTypeNormalizingObject = {
  rich_text: (res: FieldType<"rich_text">): string => {
    return res.rich_text.length ? res.rich_text[0].plain_text : "";
  },
  title: (res: FieldType<"title">): string => {
    return res.title.length ? res.title[0].plain_text : "";
  },
  select: (res: FieldType<"select">): string => {
    return res.select?.name || "";
  },
  multi_select: (res: FieldType<"multi_select">): string[] => {
    return res.multi_select.map((s) => s.name);
  },
  files: (res: FieldType<"files">): string[] => {
    return res.files.map((f) =>
      "external" in f ? f.external.url : f.file.url
    );
  },
};

class Model<F extends string, FN extends Record<F | "_id", string | string[]>> {
  private readonly title: string;
  private readonly databaseId: string;
  private readonly uniqueFiledName: null | string;
  private readonly field: { [key: string]: FieldTypeUnion };

  constructor({ title, databaseId, field }: NotionModelCreateProps<F>) {
    this.title = title;
    this.databaseId = databaseId;
    this.field = field;
    this.uniqueFiledName =
      Object.entries(field).find(([_, value]) => value === "title")?.[0] ??
      null;
  }

  private normalizingQueryResList(res: QueryDatabaseResponse) {
    if (!res.results.length || !("properties" in res.results[0])) return null;
    const rows = (
      res.results.filter(
        (result) => "properties" in result
      ) as PageObjectResponse[]
    ).map((result) => ({ properties: result.properties, _id: result.id }));

    return {
      rows: rows.map(({ _id, properties }) =>
        Object.keys(this.field).reduce<FN>(
          (results, filedName) => ({
            ...results,
            [filedName]: FieldTypeNormalizing(
              properties[filedName] as ValueOf<FieldTypeObject>
            ),
          }),
          { _id: res.results[0].id } as FN
        )
      ),
    };
  }

  private normalizingQueryRes(res: QueryDatabaseResponse) {
    if (!res.results.length || !("properties" in res.results[0])) return null;
    const properties = res.results[0].properties;

    return Object.keys(this.field).reduce<FN>(
      (results, filedName) => ({
        ...results,
        [filedName]: FieldTypeNormalizing(
          properties[filedName] as ValueOf<FieldTypeObject>
        ),
      }),
      { _id: res.results[0].id } as FN
    );
  }

  private normalizingPageRes(res: GetPageResponse) {
    if (!("properties" in res)) return null;
    const properties = res.properties;

    return Object.keys(this.field).reduce<FN>(
      (results, filedName) => ({
        ...results,
        [filedName]: FieldTypeNormalizing(
          properties[filedName] as ValueOf<FieldTypeObject>
        ),
      }),
      { _id: res.id } as FN
    );
  }

  public async get() {
    const res = await notionClient.databases.query({
      database_id: this.databaseId,
    });

    return this.normalizingQueryRes(res);
  }

  public async allGet() {
    const res = await notionClient.databases.query({
      database_id: this.databaseId,
      page_size: 100,
    });

    return this.normalizingQueryResList(res);
  }

  public async query(args: Omit<QueryDatabaseParameters, "database_id">) {
    const res = await notionClient.databases.query({
      database_id: this.databaseId,
      ...args,
    });
    return this.normalizingQueryRes(res);
  }

  public async findOneById(id: string) {
    try {
      const res = await notionClient.pages.retrieve({ page_id: id });

      return this.normalizingPageRes(res);
    } catch (error) {
      console.log({ error });
      return null;
    }
  }
  public async findOneByUniqueFiled(value: string) {
    if (!this.uniqueFiledName) return null;

    const res = await notionClient.databases.query({
      database_id: this.databaseId,
      filter: { property: this.uniqueFiledName, title: { equals: value } },
    });

    return this.normalizingQueryRes(res);
  }
}
