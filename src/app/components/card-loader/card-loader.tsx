import { useEffect, useState } from "react";

interface IProps {
  loadNext: () => void;
}

const LOAD_NEXT_MS = 30000;

export const CardLoader: React.FC<IProps> = (props) => {
  const { loadNext } = props;
  const [count, setCount] = useState(LOAD_NEXT_MS / 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        return prevCount === 1 ? LOAD_NEXT_MS / 1000 : prevCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count === 1) loadNext();
  }, [count]);

  return (
    <div className="bg-amber-100 p-6 rounded-lg shadow-lg max-w-sm mx-auto border border-amber-200">
      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700 tracking-wide">
          Description
        </h2>
      </div>

      <div className="bg-gray-900 rounded-lg p-8 mb-4 flex items-center justify-center min-h-48">
        Next image after {count}
      </div>

      <div className="text-center mb-3">
        <h3 className="text-xl font-bold text-gray-800 tracking-wide">
          <button onClick={loadNext}>ADD</button>
        </h3>
      </div>
    </div>
  );
};
