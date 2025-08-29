import { DrinkTypeEnum, HotResponse, IcedResponse } from "@/shared/types";
import axiosBase from "@/utils/axios";
import { InvalidDrinkTypeError } from "@/utils/errors";

const { HOT_URL, ICED_URL } = process.env;
import { cache } from "@/utils/memory-cache";

export const getUrl = async (type: DrinkTypeEnum) => {
  switch (type) {
    case DrinkTypeEnum.HOT:
      return axiosBase.get<HotResponse[]>(`${HOT_URL}`);
    case DrinkTypeEnum.ICED:
      return axiosBase.get<IcedResponse[]>(`${ICED_URL}`);
    default:
      throw new InvalidDrinkTypeError(type);
  }
};

export const getCached = (type: DrinkTypeEnum) => {
  switch (type) {
    case DrinkTypeEnum.HOT:
      return cache.get(DrinkTypeEnum.HOT);
    case DrinkTypeEnum.ICED:
      return cache.get(DrinkTypeEnum.ICED);
    default:
      throw new InvalidDrinkTypeError(type);
  }
};
