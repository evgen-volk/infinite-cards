import { NextRequest, NextResponse } from "next/server";
import packageJson from "../../../../package.json";
import { JsonFormatter, Logger } from "@/utils/logger";
import { getCached, getUrl } from "../helpers";
import { cache } from "@/utils/memory-cache";
import { DrinkTypeEnum } from "@/shared/types";

const servicesLogger = new Logger(
  {
    appName: `${packageJson.name}@${packageJson.version}`,
    loggerName: "NextRouteLogger",
  },
  new JsonFormatter({ space: 0 })
);

let cursor = 1;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type") as DrinkTypeEnum | null;

  if (!type) {
    return new Response("Missing required parameters", { status: 400 });
  }

  try {
    /* мы получаем ограниченный набор данных из 5 записей.
    в реальном мире я бы использовал limit и offset.
    Здесь я делаю вызов для получения всех данных и смещаюсь по ним
    с помощью cursor. или можно было бы закэшировать весь ответ, но 
    показалось что это не нужно делать по условиям задачи.
    */

    const { data } = await getUrl(type);
    if (!data.length) {
      throw new Error("No data.");
    }

    if (cursor >= data.length) {
      cursor = 0;
    }

    cache.set(type, data[cursor]);

    cursor++;
    return NextResponse.json(data[cursor - 1]);
  } catch (error) {
    servicesLogger.error(`Error fetching drinks of type ${type}: ${error}`);

    return new Response("Error fetching drinks", {
      status: 500,
    });
  }
}
