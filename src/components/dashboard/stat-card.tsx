"use client";

import { formatNumber } from "@/utils/formatNumber";

type Props = {
  title: string;
  symbol: string;
  value: string | number;
};

const StatCard = ({ title, symbol, value }: Props) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <p className="text-[12px] font-semibold">{title}</p>
        <p className="text-lg font-bold">
          {symbol}
          {formatNumber(Number(value))}
        </p>
      </div>
    </>
  );
};

export default StatCard;
