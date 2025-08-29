import { IcedResponse, HotResponse, DrinkTypeEnum } from "@/shared/types";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const lsKey = `coffeeSetting`;

export const useFeedHook = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHot, setIsHot] = useState(true);
  const [items, setItems] = useState<IcedResponse[] | HotResponse[]>([]);

  useEffect(() => {
    const checkboxPrevState = localStorage?.getItem(lsKey);
    setIsHot(checkboxPrevState === "true");
    setIsLoading(false);
  }, []);

  const loadInitial = async () => {
    try {
      const { data } = await axios.get("/api/initial", {
        params: {
          type: isHot ? DrinkTypeEnum.HOT : DrinkTypeEnum.ICED,
        },
      });
      setItems([data]);
    } catch (error) {
      notify();
      console.error(error);
    }
  };

  const loadNext = async () => {
    try {
      const { data: nextItem } = await axios.get("/api/next", {
        params: {
          type: isHot ? DrinkTypeEnum.HOT : DrinkTypeEnum.ICED,
        },
      });

      setItems((items) => [...items, nextItem]);
    } catch (error) {
      notify();

      console.error(error);
    }
  };

  const notify = () =>
    toast.error(
      "Не удалось обработать запрос. Проверьте корректность ввода данных или повторите попытку позже.",
      {
        hideProgressBar: true,
        draggable: false,
      }
    );

  useEffect(() => {
    if (isLoading) return;
    loadInitial();
  }, [isHot, isLoading]);

  const updateCheckbox = (value: boolean) => {
    setIsHot(value);
    localStorage.setItem(lsKey, `${value}`);
  };
  return { isHot, items, setIsHot: updateCheckbox, loadNext, isLoading };
};
