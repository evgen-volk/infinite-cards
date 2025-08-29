export enum DrinkTypeEnum {
  HOT = "hot",
  ICED = "iced",
}

export interface HotResponse {
  title: string;
  description: string;
  ingredients: string[];
  image: string;
  id: number;
}

export interface IcedResponse {
  title: string;
  description: string;
  ingredients: string[];
  image: string;
  id: number;
}
