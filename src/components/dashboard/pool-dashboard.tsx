"use client";

import Image from "next/image";
import Link from "next/link";

import { useAccount } from "wagmi";

import { FaGlobe as Website } from "react-icons/fa6";

import Search from "@/components/common/search/search";
import PoolChartWidget from "@/components/dashboard/pool-chart-widget";
import StatCard from "@/components/dashboard/stat-card";

import { formatNumber } from "@/utils/formatNumber";

import etherscanLogo from "/public/images/socials/etherscan.png";

const defaultNetwork = "/images/network/ethereum.png";
const defaultToken = "/images/network/ethereum.png";

type Props = {
  pool_details: PoolDetails;
};

const PoolDashboard = ({ pool_details }: Props) => {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <>
        <div className="-mt-14 flex min-h-screen flex-col items-center justify-center font-[family-name:var(--font-geist-mono)]">
          <h1 className="text-5xl font-extrabold">Error!</h1>
          <p className="text-center text-lg font-medium">
            Connect your wallet to view the pool overview dashboard and search
            tokens and pools by address.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-primary_background mb-5 flex min-h-screen w-full items-start justify-start font-[family-name:var(--font-geist-mono)] text-base text-white">
        <div className="relative w-full">
          <div className="px-10 md:px-16 2xl:px-64">
            <div className="flex flex-col gap-3">
              {isConnected ? (
                <Search />
              ) : (
                <>
                  <div className="rounded-xl bg-secondary px-3 py-2">
                    <p className="text-center text-sm font-bold">
                      Connect your wallet to search tokens and pools by address
                      to get its overview dashboard.
                    </p>
                  </div>
                </>
              )}
              <div className="bg-secondary_background flex flex-col gap-3 rounded-xl px-3 py-2">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row items-center gap-3">
                    <div className="flex flex-col gap-2 md:flex-row">
                      <div className="flex-shrink-0 rounded-full bg-white">
                        <Image
                          src={
                            pool_details.base_token_info?.image_url! ??
                            defaultToken
                          }
                          alt={pool_details.base_token_info?.symbol! ?? ""}
                          width={38}
                          height={38}
                          priority
                        />
                      </div>
                      <div className="flex-shrink-0 rounded-full bg-white">
                        <Image
                          src={
                            pool_details.quote_token_info?.image_url! ??
                            defaultToken
                          }
                          alt={pool_details.quote_token_info?.symbol! ?? ""}
                          width={38}
                          height={38}
                          priority
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-row items-center gap-1">
                        <h1 className="text-lg font-bold lg:text-xl">
                          {pool_details.pool_data?.attributes?.name! ?? ""}
                        </h1>
                      </div>
                      <div className="bg-primary_foreground flex max-w-[50%] items-center justify-center rounded-md p-[1px]">
                        <p className="text-xs font-medium text-blue-300">
                          {pool_details.pool_info?.pairLabel! ?? ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 md:flex-row">
                    <div className="bg-primary_foreground flex flex-col justify-center rounded-xl px-2">
                      <p className="text-[10px]">
                        {pool_details.base_token_info?.symbol! ?? ""}
                      </p>
                      <p className="text-lg font-semibold text-blue-300">
                        $
                        {formatNumber(
                          Number(
                            pool_details.pool_data?.attributes
                              ?.base_token_price_usd!
                          )
                        ) ?? ""}
                      </p>
                    </div>
                    <div className="bg-primary_foreground flex flex-col justify-center rounded-xl px-2">
                      <p className="text-[10px]">
                        {pool_details.quote_token_info?.symbol! ?? ""}
                      </p>
                      <p className="text-lg font-semibold text-blue-300">
                        $
                        {formatNumber(
                          Number(
                            pool_details.pool_data?.attributes
                              ?.quote_token_price_usd!
                          )
                        ) ?? ""}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-primary_foreground flex items-center justify-between rounded-lg border-[1px] px-3 py-2">
                  <div className="flex flex-row gap-2">
                    <Link
                      href={`https://etherscan.io/token/${pool_details.pool_info?.pairAddress!}`}
                      target="_blank"
                    >
                      <Image
                        className="h-4 w-4 rounded-full"
                        src={etherscanLogo}
                        alt={"Etherscan"}
                        width={32}
                        height={32}
                      />
                    </Link>
                    {pool_details.pool_info?.exchangeUrl && (
                      <Link
                        className="text-gray-400"
                        href={pool_details.pool_info?.exchangeUrl!}
                        target="_blank"
                      >
                        <Website size="1rem" />
                      </Link>
                    )}
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
                    <div className="bg-primary_foreground rounded-lg px-3 py-1">
                      <p className="text-xs">
                        {pool_details.pool_info?.exchange!}
                      </p>
                    </div>
                    <div className="flex-shrink-0 rounded-full bg-white">
                      <Image
                        src={
                          pool_details.pool_info?.exchangeLogo! ??
                          defaultNetwork
                        }
                        alt={pool_details.pool_info?.exchange! ?? ""}
                        width={24}
                        height={24}
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col gap-5 text-white lg:flex-row">
                <div className="lg:w-1/3">
                  <div className="bg-secondary_background h-full w-full rounded-xl p-3">
                    <h1 className="text-base font-bold">Pool details</h1>
                    <div className="bg-primary_foreground mt-2 rounded-xl p-2">
                      <p className="text-[10px] font-semibold">POOL ADDRESS</p>
                      <p className="text-[10px] text-blue-300 lg:text-[10px] xl:text-xs">
                        {pool_details.pool_info?.pairAddress!}
                      </p>
                    </div>
                    <div className="bg-primary_foreground mt-2 rounded-xl p-2">
                      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                        <StatCard
                          title={"MARKET CAP"}
                          symbol={"$"}
                          value={
                            pool_details.pool_data?.attributes
                              ?.market_cap_usd! ?? ""
                          }
                        />
                        <StatCard
                          title={"LIQUIDITY"}
                          symbol={"$"}
                          value={
                            pool_details.pool_info?.totalLiquidityUsd! ?? ""
                          }
                        />
                        <StatCard
                          title={"FDV"}
                          symbol={"$"}
                          value={pool_details.pool_data?.attributes?.fdv_usd!}
                        />
                        <StatCard
                          title={"24H VOL"}
                          symbol={"$"}
                          value={
                            pool_details.pool_data?.attributes?.volume_usd
                              ?.h24! ?? ""
                          }
                        />
                        <StatCard
                          title={"24H BUYS"}
                          symbol={""}
                          value={
                            pool_details.pool_data?.attributes?.transactions
                              ?.h24?.buys! ?? ""
                          }
                        />
                        <StatCard
                          title={"24H SELLS"}
                          symbol={""}
                          value={
                            pool_details.pool_data?.attributes?.transactions
                              ?.h24?.sells! ?? ""
                          }
                        />
                      </div>
                    </div>
                    <div className="bg-primary_foreground mt-2 rounded-xl p-2">
                      <div className="grid grid-cols-1 gap-4">
                        <StatCard
                          title={"24H PRICE CHANGE PERCENT"}
                          symbol={""}
                          value={
                            pool_details.pool_info?.pricePercentChange?.[
                              "24h"
                            ]! ?? ""
                          }
                          optional={"%"}
                        />
                        <StatCard
                          title={"24H LIQUIDITY CHANGE PERCENT"}
                          symbol={""}
                          value={
                            pool_details.pool_info?.liquidityPercentChange?.[
                              "24h"
                            ]! ?? ""
                          }
                          optional={"%"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-2/3">
                  <div className="border-secondary_background bg-secondary_background h-[420px] overflow-hidden rounded-xl border-2">
                    <PoolChartWidget
                      address={pool_details.pool_info?.pairAddress!}
                    />
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col gap-5 text-white lg:flex-row">
                <div className="lg:w-1/2">
                  <div className="bg-secondary_background w-full rounded-xl p-3">
                    <div className="flex flex-row justify-between">
                      <Link
                        href={`/tokens/ethereum/${pool_details.base_token_info?.address!}`}
                      >
                        <div className="flex flex-row items-center gap-3">
                          <div className="flex-shrink-0 rounded-full bg-white">
                            <Image
                              src={
                                pool_details.base_token_info?.image_url! ??
                                defaultToken
                              }
                              alt={pool_details.base_token_info?.symbol! ?? ""}
                              width={38}
                              height={38}
                              priority
                            />
                          </div>
                          <div className="flex flex-col">
                            <div className="flex flex-row items-center gap-1">
                              <h1 className="text-xl font-bold">
                                {pool_details.base_token_info?.name! ?? ""}
                              </h1>
                            </div>
                            <div className="bg-primary_foreground flex max-w-[50%] items-center justify-center rounded-md p-[1px]">
                              <p className="text-xs font-medium text-blue-300">
                                {pool_details.base_token_info?.symbol! ?? ""}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="bg-primary_foreground flex items-center justify-center rounded-xl px-2">
                        <p className="text-lg font-semibold text-blue-300">
                          $
                          {formatNumber(
                            Number(
                              pool_details.pool_data?.attributes
                                ?.base_token_price_usd!
                            )
                          ) ?? ""}
                        </p>
                      </div>
                    </div>
                    <div className="bg-primary_foreground mt-2 rounded-xl p-2">
                      <p className="text-xs font-semibold">TOKEN ADDRESS</p>
                      <p className="mt-2 text-xs text-blue-300">
                        {pool_details.base_token_info?.address!}
                      </p>
                    </div>
                    <div className="border-primary_foreground mt-2 rounded-xl border-[1px] p-2">
                      <div className="flex flex-row gap-2">
                        <Link
                          href={`https://etherscan.io/token/${pool_details.base_token_info?.address!}`}
                          target="_blank"
                        >
                          <Image
                            className="h-4 w-4 rounded-full"
                            src={etherscanLogo}
                            alt="Etherscan"
                            width={32}
                            height={32}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <div className="bg-secondary_background w-full rounded-xl p-3">
                    <div className="flex flex-row justify-between">
                      <Link
                        href={`/tokens/ethereum/${pool_details.quote_token_info?.address!}`}
                      >
                        <div className="flex flex-row items-center gap-3">
                          <div className="flex-shrink-0 rounded-full bg-white">
                            <Image
                              src={
                                pool_details.quote_token_info?.image_url! ??
                                defaultToken
                              }
                              alt={pool_details.quote_token_info?.symbol! ?? ""}
                              width={38}
                              height={38}
                              priority
                            />
                          </div>
                          <div className="flex flex-col">
                            <div className="flex flex-row items-center gap-1">
                              <h1 className="text-xl font-bold">
                                {pool_details.quote_token_info?.name! ?? ""}
                              </h1>
                            </div>
                            <div className="bg-primary_foreground flex max-w-[50%] items-center justify-center rounded-md p-[1px]">
                              <p className="text-xs font-medium text-blue-300">
                                {pool_details.quote_token_info?.symbol! ?? ""}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="bg-primary_foreground flex items-center justify-center rounded-xl px-2">
                        <p className="text-lg font-semibold text-blue-300">
                          $
                          {formatNumber(
                            Number(
                              pool_details.pool_data?.attributes
                                ?.quote_token_price_usd!
                            )
                          ) ?? ""}
                        </p>
                      </div>
                    </div>
                    <div className="bg-primary_foreground mt-2 rounded-xl p-2">
                      <p className="text-xs font-semibold">TOKEN ADDRESS</p>
                      <p className="mt-2 text-xs text-blue-300">
                        {pool_details.quote_token_info?.address!}
                      </p>
                    </div>
                    <div className="border-primary_foreground mt-2 rounded-xl border-[1px] p-2">
                      <div className="flex flex-row gap-2">
                        <Link
                          href={`https://etherscan.io/token/${pool_details.quote_token_info?.address!}`}
                          target="_blank"
                        >
                          <Image
                            className="h-4 w-4 rounded-full"
                            src={etherscanLogo}
                            alt="Etherscan"
                            width={32}
                            height={32}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PoolDashboard;
