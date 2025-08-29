"use client";

import { ToastContainer } from "react-toastify";
import { useFeedHook } from "./hooks/useFeed";

import { Checkbox } from "./components/checkbox";
import { CoffeeCard } from "./components/coffee-card";
import { CardLoader } from "./components/card-loader";

export const Feed = () => {
  const { isHot, items, setIsHot, loadNext, isLoading } = useFeedHook();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full max-w-[1280px]">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">
        <Checkbox checked={isHot} onChange={setIsHot} label={"Hot/Iced"} />
      </h1>
      <div className="flex flex-nowrap gap-4 overflow-x-scroll">
        {items?.map((item, idx) => (
          <CoffeeCard key={idx} card={item} />
        ))}
        <CardLoader loadNext={loadNext} />
      </div>
    </div>
  );
};
