import { createHandler, Get } from "next-api-decorators";

import { wordNotionModel } from "@/models";

class WordHandler {
  @Get()
  public async getRandomWords() {
    const res = await wordNotionModel.allGet();
    console.log({ res });
    return res;
  }
}

export default createHandler(WordHandler);
