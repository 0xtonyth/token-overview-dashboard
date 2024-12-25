"use client";

import { formatNumber } from "@/utils/formatNumber";

type Props = {
  title: string;
  symbol: string;
  value: string | number;
  optional?: string;
  helper?: string;
};

const StatCard = ({ title, symbol, value, optional, helper }: Props) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="group relative">
          <p className="text-[12px] font-semibold">{title}</p>
          {helper && (
            <div className="bg-primary_background pointer-events-none absolute bottom-full left-1/2 mb-1 w-40 -translate-x-1/2 transform rounded px-2 py-1 text-[10px] text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
              {helper}
            </div>
          )}
        </div>
        <p className="text-lg font-bold text-blue-300">
          {symbol}
          {formatNumber(Number(value)) ?? "-"}
          {optional}
        </p>
      </div>
    </>
  );
};

export default StatCard;
