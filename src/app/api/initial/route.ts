import { NextRequest, NextResponse } from "next/server";
import packageJson from "../../../../package.json";
import { JsonFormatter, Logger } from "@/utils/logger";

import { getCached, getUrl } from "../helpers";
import { cache } from "@/utils/memory-cache";
import { DrinkTypeEnum } from "@/shared/types";

const servicesLogger = new Logger(
  {
    appName: `${packageJson.name}@${packageJson.version}`,
    loggerName: "InitialRouteLogger",
  },
  new JsonFormatter({ space: 0 })
);

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type") as DrinkTypeEnum | null;

  if (!type) {
    return new Response("Missing required parameters", { status: 400 });
  }

  const cachedValue = getCached(type);

  if (cachedValue) {
    servicesLogger.info("from cache");
    return NextResponse.json(cachedValue);
  }

  try {
    const { data } = await getUrl(type);
    if (!data.length) {
      throw new Error("No data.");
    }

    cache.set(type, data[0]);

    return NextResponse.json(data[0]);
  } catch (error) {
    servicesLogger.error(`Error fetching drinks of type ${type}: ${error}`);

    return new Response("Error fetching drinks", {
      status: 500,
    });
  }
}
