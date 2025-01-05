"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { formatNumber } from "@/utils/formatNumber";

const defaultNetwork = "/images/network/ethereum.png";

type Props = {
  token_pair_data: TokenPairData[];
};

const TokenPoolTable = ({ token_pair_data }: Props) => {
  const router = useRouter();
  return (
    <>
      <div className="overflow-y-hidden rounded-xl border-[1px] border-primary_foreground text-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-primary_foreground text-left text-sm font-semibold uppercase tracking-widest">
                <th className="px-5 py-5">POOL</th>
                <th className="px-5 py-5">LIQUIDITY</th>
                <th className="px-5 py-5">24H VOL</th>
                <th className="px-5 py-5">24H PRICE CHANGE</th>
                <th className="px-5 py-5">DEX</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {token_pair_data.map((token_pair, index) => (
                <tr
                  key={index}
                  className="cursor-pointer transition-all duration-200 hover:bg-primary_background hover:text-blue-300"
                  onClick={() =>
                    router.push(`/pools/ethereum/${token_pair.pair_address!}`)
                  }
                >
                  <td className="px-5 py-2 text-sm">
                    <p className="whitespace-no-wrap">
                      {token_pair.pair_label}
                    </p>
                  </td>
                  <td className="px-5 py-2 text-sm">
                    {token_pair.liquidity_usd ? (
                      <p className="whitespace-no-wrap">
                        ${formatNumber(token_pair.liquidity_usd! ?? "0")}
                      </p>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-5 py-2 text-sm">
                    {token_pair.volume_24h_usd ? (
                      <p className="whitespace-no-wrap">
                        ${formatNumber(token_pair.volume_24h_usd! ?? "0")}
                      </p>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-5 py-2 text-sm">
                    {token_pair.usd_price_24hr_usd_change ? (
                      <p className="whitespace-no-wrap">
                        $
                        {formatNumber(
                          token_pair.usd_price_24hr_usd_change! ?? "0"
                        )}
                      </p>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-5 py-2 text-sm">
                    <div className="flex items-center">
                      <div className="h-8 w-8 flex-shrink-0 rounded-full bg-white">
                        <Image
                          className="h-full w-full rounded-full"
                          src={token_pair.exchange_logo! ?? defaultNetwork}
                          alt={token_pair.exchange_name! ?? ""}
                          width={40}
                          height={40}
                          priority
                        />
                      </div>
                      <div className="ml-3">
                        <p className="whitespace-no-wrap">
                          {token_pair.exchange_name}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TokenPoolTable;
