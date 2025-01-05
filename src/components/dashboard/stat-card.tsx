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
        <p className="text-[12px] font-semibold lg:text-[10px] 2xl:text-[12px]">
          {title}
        </p>

        <div className="group relative">
          <p className="text-lg font-bold text-blue-300 lg:text-base 2xl:text-lg">
            {symbol}
            {formatNumber(Number(value)) ?? "0"}
            {optional}
          </p>
          {helper && (
            <div className="pointer-events-none absolute left-1/2 top-full mb-1 min-w-32 -translate-x-1/2 transform rounded bg-white px-2 text-center text-[11px] font-medium text-black opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
              {helper}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StatCard;
