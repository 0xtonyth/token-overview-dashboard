"use client";

import Image from "next/image";
import Link from "next/link";

import { useAccount } from "wagmi";

import { RiVerifiedBadgeLine as VerifiedBadge } from "react-icons/ri";
import {
  FaGlobe as Website,
  FaTelegram as Telegram,
  FaXTwitter as X,
  FaReddit as Reddit,
  FaDiscord as Discord,
} from "react-icons/fa6";

import { formatDecimal } from "@/utils/formatDecimal";
import { formatNumber } from "@/utils/formatNumber";

import Search from "@/components/common/search/search";
import TokenChartWidget from "@/components/dashboard/token-chart-widget";
import StatCard from "@/components/dashboard/stat-card";
import SecurityStatCard from "@/components/dashboard/security-stat-card";

import etherscanLogo from "/public/images/socials/etherscan.png";

type Props = {
  token_details: TokenDetails;
};

const TokenDashboard = ({ token_details }: Props) => {
  const { isConnected } = useAccount();

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
                    <Image
                      // className="dark:invert"
                      src={token_details.token_data?.logo!}
                      alt={token_details.token_data?.symbol!}
                      width={38}
                      height={38}
                      priority
                    />
                    <div className="flex flex-col">
                      <div className="flex flex-row items-center gap-1">
                        <h1 className="text-xl font-bold">
                          {token_details.token_data?.name}
                        </h1>
                        {token_details.token_data?.verified_contract ? (
                          <VerifiedBadge
                            className="text-blue-300"
                            size="1rem"
                          />
                        ) : null}
                      </div>
                      <div className="bg-primary_foreground flex max-w-[50%] items-center justify-center rounded-md p-[1px]">
                        <p className="text-xs font-medium">
                          {token_details.token_data?.symbol}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-primary_foreground flex items-center justify-center rounded-xl px-2">
                    <p className="text-lg font-semibold">
                      $
                      {formatDecimal(
                        Number(token_details.token_attributes?.price_usd)
                      )}
                    </p>
                  </div>
                </div>
                <div className="border-primary_foreground flex items-center justify-between rounded-lg border-[1px] px-3 py-2">
                  <div className="flex flex-row gap-2">
                    <Link
                      href={`https://etherscan.io/token/${token_details.token_data?.address!}`}
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
                    {token_details.token_data?.links?.website && (
                      <Link
                        className="text-white"
                        href={token_details.token_data?.links?.website!}
                        target="_blank"
                      >
                        <Website size="1rem" />
                      </Link>
                    )}
                    {token_details.token_data?.links?.twitter && (
                      <Link
                        className="text-white"
                        href={token_details.token_data?.links?.twitter!}
                        target="_blank"
                      >
                        <X size="1rem" />
                      </Link>
                    )}
                    {token_details.token_data?.links?.discord && (
                      <Link
                        className="text-[#5865F2]"
                        href={token_details.token_data?.links?.discord!}
                        target="_blank"
                      >
                        <Discord size="1rem" />
                      </Link>
                    )}
                    {token_details.token_data?.links?.telegram && (
                      <Link
                        className="text-[#0088CC]"
                        href={token_details.token_data?.links?.telegram!}
                        target="_blank"
                      >
                        <Telegram size={"1rem"} />
                      </Link>
                    )}
                    {token_details.token_data?.links?.reddit && (
                      <Link
                        className="text-[#FF5700]"
                        href={token_details.token_data?.links?.reddit!}
                        target="_blank"
                      >
                        <Reddit size="1rem" />
                      </Link>
                    )}
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
                    <p className="text-[10px] text-gray-200">SECURITY SCORE</p>
                    <div className="bg-primary_foreground rounded-lg px-3 py-1">
                      <p className="text-xs">
                        {token_details.token_data?.security_score} / 100
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col gap-5 text-white lg:flex-row">
                <div className="lg:w-1/3">
                  <div className="bg-secondary_background w-full rounded-xl p-3">
                    <h1 className="text-base font-bold">Token details</h1>
                    <div className="bg-primary_foreground mt-2 rounded-xl p-2">
                      <p className="text-[10px] font-semibold">TOKEN ADDRESS</p>
                      <p className="text-[10px] lg:text-[10px] xl:text-xs">
                        {token_details.token_data?.address?.toLocaleUpperCase()}
                      </p>
                    </div>
                    <div className="bg-primary_foreground mt-2 rounded-xl p-2">
                      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                        <StatCard
                          title={"MARKET CAP"}
                          symbol={"$"}
                          value={
                            token_details.token_attributes?.market_cap_usd!
                          }
                        />
                        <StatCard
                          title={"HOLDERS"}
                          symbol={""}
                          value={token_details.token_security?.holder_count!}
                        />
                        <StatCard
                          title={"TOTAL SUPPLY"}
                          symbol={"$"}
                          value={
                            token_details.token_data?.total_supply_formatted!
                          }
                        />
                        <StatCard
                          title={"FDV"}
                          symbol={"$"}
                          value={
                            token_details.token_data?.fully_diluted_valuation!
                          }
                        />
                        <StatCard
                          title={"LP SUPPLY"}
                          symbol={"$"}
                          value={token_details.token_security?.lp_total_supply!}
                        />
                        <StatCard
                          title={"24H VOL"}
                          symbol={"$"}
                          value={
                            token_details.token_attributes?.volume_usd?.h24!
                          }
                        />
                      </div>
                    </div>
                    <div className="bg-primary_foreground mt-2 rounded-xl p-2">
                      <div className="grid grid-cols-2 gap-4">
                        <StatCard
                          title={"BUY TAX"}
                          symbol={""}
                          value={token_details.token_security?.buy_tax!}
                        />
                        <StatCard
                          title={"SELL TAX"}
                          symbol={""}
                          value={token_details.token_security?.sell_tax!}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-secondary_background mt-3 w-full rounded-xl p-3">
                    <h1 className="text-base font-bold">
                      Token security details
                    </h1>
                    <div className="bg-primary_foreground mt-2 rounded-xl p-2">
                      <SecurityStatCard
                        title={"Is in DEX"}
                        value={
                          token_details.token_security?.is_in_dex
                            ? token_details.token_security?.is_in_dex
                            : ""
                        }
                      />
                      <SecurityStatCard
                        title={"Cannot buy"}
                        value={
                          token_details.token_security?.cannot_buy
                            ? token_details.token_security?.cannot_buy
                            : ""
                        }
                      />
                      <SecurityStatCard
                        title={"Cannot sell all"}
                        value={
                          token_details.token_security?.cannot_sell_all
                            ? token_details.token_security?.cannot_sell_all
                            : ""
                        }
                      />
                      <SecurityStatCard
                        title={"Is in trust list"}
                        value={
                          token_details.token_security?.trust_list
                            ? token_details.token_security?.trust_list
                            : ""
                        }
                      />
                      <SecurityStatCard
                        title={"Is honeypot"}
                        value={
                          token_details.token_security?.is_honeypot
                            ? token_details.token_security?.is_honeypot
                            : ""
                        }
                      />
                      <SecurityStatCard
                        title={"Is open source"}
                        value={
                          token_details.token_security?.is_open_source
                            ? token_details.token_security?.is_open_source
                            : ""
                        }
                      />
                      <SecurityStatCard
                        title={"Is proxy"}
                        value={
                          token_details.token_security?.is_proxy
                            ? token_details.token_security?.is_proxy
                            : ""
                        }
                      />
                      <SecurityStatCard
                        title={"Is blacklisted"}
                        value={
                          token_details.token_security?.is_blacklisted
                            ? token_details.token_security?.is_blacklisted
                            : ""
                        }
                      />
                      <SecurityStatCard
                        title={"Transfer pausable"}
                        value={
                          token_details.token_security?.transfer_pausable
                            ? token_details.token_security?.transfer_pausable
                            : ""
                        }
                      />
                      <SecurityStatCard
                        title={"Selfdestruct"}
                        value={
                          token_details.token_security?.selfdestruct
                            ? token_details.token_security?.selfdestruct
                            : ""
                        }
                      />
                      <SecurityStatCard
                        title={"Owner can change balance"}
                        value={
                          token_details.token_security?.owner_change_balance
                            ? token_details.token_security?.owner_change_balance
                            : ""
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="lg:w-2/3">
                  <div className="border-secondary_background bg-secondary_background h-[420px] overflow-hidden rounded-xl border-2">
                    <TokenChartWidget
                      // symbol={`ETHEREUM:${tokenDetails.symbol}USD`}
                      symbol={`${token_details.token_data?.symbol}`}
                      timeline={"D"}
                    />
                  </div>
                  <div className="bg-secondary_background mt-3 w-full rounded-xl p-3">
                    <h1 className="text-base font-bold">Token description</h1>
                    <div className="bg-primary_foreground mt-2 rounded-xl p-2">
                      <p className="text-xs">
                        {token_details.token_info?.description}
                      </p>
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

export default TokenDashboard;
